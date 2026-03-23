"use server";

import { cache } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "..";
import { user, audioProject } from "@/db/schema";
import { eq } from "drizzle-orm";
import { GenerateSpeechData, GenerateSpeechResponse } from "@/types/tts";

const S3_BUCKET_URL = process.env.AWS_S3_BUCKET_URL;

/**
 * Server-side memoized function using React's `cache`.
 *
 * `cache` deduplicates concurrent calls with identical arguments and
 * memoizes results in-memory for the lifetime of the server process.
 * It is NOT a persistent or distributed cache — use an external store
 * (Redis, Memcached, etc.) if you need cross-process caching, TTLs,
 * or eviction policies.
 */
export const generateSpeech = cache(
  async (data: GenerateSpeechData): Promise<GenerateSpeechResponse> => {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session?.user?.id) {
        return { success: false, error: "Unauthorized" };
      }

      if (!data.text || !data.language) {
        return { success: false, error: "Missing required parameters" };
      }

      const creditsNeeded = Math.max(1, Math.ceil(data.text.length / 100)); // Example: 1 credit per 100 characters

      const userExists = await db
        .select()
        .from(user)
        .where(eq(user.id, session.user.id))
        .limit(1);

      if (!userExists || userExists.length === 0) {
        return { success: false, error: "User not found" };
      }

      const userCredits = await getUserCredits();

      if (userCredits.credits < creditsNeeded) {
        return { success: false, error: "Insufficient credits" };
      }

      // Normalize incoming fields from client (support both camelCase and snake_case)
      const voiceKeyFromInput =
        data.s3Key ??
        (data as any).s3_key ??
        (data as any).voiceS3Key ??
        (data as any).voice_s3_key ??
        null;
      const cfgWeightFromInput =
        data.cfgWeight ?? (data as any).cfg_weight ?? 0.5;
      const exaggerationFromInput =
        data.exaggeration ?? (data as any).exaggeration ?? 0.5;

      const payload: Record<string, unknown> = {
        text: data.text,
        language: data.language,
        exaggeration: exaggerationFromInput,
        cfg_weight: cfgWeightFromInput,
      };
      if (voiceKeyFromInput) payload.voice_s3_key = voiceKeyFromInput;

      console.log("Sending Modal TTS payload:", JSON.stringify(payload));

      const payloadWithoutVoice = {
        text: data.text,
        language: data.language,
        exaggeration: exaggerationFromInput,
        cfg_weight: cfgWeightFromInput,
      };

      let resp = await fetch(process.env.MODAL_API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Modal-Key": process.env.MODAL_API_KEY!,
          "Modal-Secret": process.env.MODAL_API_SECRET!,
        },
        body: JSON.stringify(payload),
      });

      console.log("Modal response object (first attempt):", resp);

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error("Modal TTS error body (first attempt):", errorText);
        // Try fallback without the voice sample
        console.log("Retrying Modal TTS without voice sample...");
        resp = await fetch(process.env.MODAL_API_URL!, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Modal-Key": process.env.MODAL_API_KEY!,
            "Modal-Secret": process.env.MODAL_API_SECRET!,
          },
          body: JSON.stringify(payloadWithoutVoice),
        });

        console.log("Modal response object (fallback):", resp);

        if (!resp.ok) {
          const errorText2 = await resp.text();
          console.error("Modal TTS error body (fallback):", errorText2);
          return { success: false, error: `TTS API error: ${errorText2}` };
        }
      }

      const resultJson = await resp.json();
      console.log("Modal TTS JSON:", JSON.stringify(resultJson));

      // Normalize possible response key variants from the TTS service
      const s3KeyFromResp =
        resultJson?.s3Key ??
        resultJson?.s3_key ??
        resultJson?.s3_Key ??
        resultJson?.s3key ??
        null;

      console.log("Normalized s3 key from Modal:", s3KeyFromResp);

      if (!s3KeyFromResp) {
        console.error("Unexpected TTS response (no s3 key):", resultJson);
        return { success: false, error: "TTS service returned no s3 key" };
      }

      const audioUrl = `${S3_BUCKET_URL}/${s3KeyFromResp}`;

      await db
        .update(user)
        .set({ credits: userCredits.credits - creditsNeeded })
        .where(eq(user.id, session.user.id));

      const project = await db
        .insert(audioProject)
        .values({
          id: `project-${Date.now()}`,
          name: `Project ${Date.now()}`,
          text: data.text,
          audioUrl,
          s3Key: s3KeyFromResp,
          language: data.language,
          voiceS3Key: voiceKeyFromInput ?? "",
          exaggeration: exaggerationFromInput,
          cfgWeight: cfgWeightFromInput,
          userId: session.user.id,
        })
        .returning();

      return {
        success: true,
        s3Key: s3KeyFromResp,
        audioUrl,
        projectId: project[0].id,
      } as GenerateSpeechResponse;
    } catch (error) {
      console.error("Error in generateSpeech:", error);
      const message = error instanceof Error ? error.message : String(error);
      return { success: false, error: message ?? "Internal Server Error" };
    }
  },
);

export const getUserAudioProjects = cache(async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized", projects: [] };
    }

    const projects = await db
      .select()
      .from(audioProject)
      .where(eq(audioProject.userId, session.user.id))
      .orderBy(audioProject.createdAt);

    if (!projects) {
      return { success: false, error: "No projects found", projects: [] };
    }
    return { success: true, projects };
  } catch (error) {
    console.error("Error fetching user audio projects:", error);
    return { success: false, error: "Internal Server Error" };
  }
});

export const deleteAudioProject = cache(async (projectId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const project = await db
      .select()
      .from(audioProject)
      .where(eq(audioProject.id, projectId))
      .limit(1);

    if (!project || project.length === 0) {
      return { success: false, error: "Project not found" };
    }

    if (project[0].userId !== session.user.id) {
      return { success: false, error: "Unauthorized" };
    }

    await db.delete(audioProject).where(eq(audioProject.id, projectId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting audio project:", error);
    return { success: false, error: "Internal Server Error" };
  }
});

export const getUserCredits = cache(async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized", credits: 0 };
    }

    const userExists = await db
      .select()
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    if (!userExists || userExists.length === 0) {
      return { success: false, error: "User not found", credits: 0 };
    }
    return { success: true, credits: userExists[0].credits };
  } catch (error) {
    return { success: false, error: "Internal Server Error", credits: 0 };
  }
});
