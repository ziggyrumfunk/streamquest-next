"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { rateLimit, clientKey } from "@/lib/rateLimit";
import { ABX_COOKIE, ABX_PATH, sign, passwordMatches } from "./session";

/**
 * Server actions for the Abstraction proposal access form.
 * The page itself imports `isUnlocked` from ./session directly.
 */
export async function signInAction(formData: FormData) {
  const limit = rateLimit(clientKey(headers(), ABX_PATH));
  if (!limit.ok) {
    redirect(`${ABX_PATH}?err=1`);
  }
  const pw = String(formData.get("password") ?? "");
  if (passwordMatches(pw)) {
    cookies().set(ABX_COOKIE, sign(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: ABX_PATH,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    redirect(ABX_PATH);
  }
  redirect(`${ABX_PATH}?err=1`);
}

export async function signOutAction() {
  // Expire it on the same path it was set on, or the browser keeps it.
  cookies().set(ABX_COOKIE, "", { path: ABX_PATH, maxAge: 0 });
  redirect(ABX_PATH);
}
