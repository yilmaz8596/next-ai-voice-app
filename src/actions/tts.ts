"use server";

import { cache } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "..";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

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
