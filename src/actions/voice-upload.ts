"use server";

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "..";
import { cache } from "react";
import { uploadedVoice } from "@/db/schema";
import { eq } from "drizzle-orm";
import { VoiceUploadResponse, UserVoicesResponse } from "@/types/tts";

const s3Client = new S3Client({
  region: process.env.AWS_REGION ?? "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadVoice = cache(
  async (formData: FormData): Promise<VoiceUploadResponse> => {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session?.user?.id) {
        return { success: false, error: "Unauthorized" };
      }

      if (
        !process.env.AWS_ACCESS_KEY_ID ||
        !process.env.AWS_SECRET_ACCESS_KEY ||
        !process.env.AWS_S3_BUCKET_NAME
      ) {
        return { success: false, error: "AWS S3 configuration is missing" };
      }
      const file = formData.get("file") as File;
      if (!file) {
        return { success: false, error: "No file provided" };
      }

      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        return { success: false, error: "File size exceeds 10MB limit" };
      }

      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const fileName = `voices/${session.user.id}/${Date.now()}.${fileExtension}`;
      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: fileName,
          Body: Buffer.from(await file.arrayBuffer()),
          ContentType: file.type,
        }),
      );
      const signedUrl = await getSignedUrl(
        s3Client,
        new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: fileName,
        }),
        { expiresIn: 3600 * 24 * 7 }, // 1 week
      );

      const uploadedFile = await db
        .insert(uploadedVoice)
        .values({
          id: `voice-${Date.now()}`,
          name: file.name,
          s3Key: fileName,
          url: signedUrl,
          userId: session.user.id,
        })
        .returning();
      return {
        success: true,
        id: uploadedFile[0].id,
        audioUrl: signedUrl,
        s3Key: fileName,
      };
    } catch (error) {
      return { success: false, error: "Failed to upload voice" };
    }
  },
);

export const getUserVoices = cache(async (): Promise<UserVoicesResponse> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }
    const voices = await db
      .select()
      .from(uploadedVoice)
      .where(eq(uploadedVoice.userId, session.user.id));

    if (!voices || voices.length === 0) {
      return { success: false, error: "No voices found" };
    }
    return { success: true, voices };
  } catch (error) {
    return { success: false, error: "Failed to fetch voices" };
  }
});
