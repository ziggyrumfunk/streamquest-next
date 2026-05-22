"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GHM_COOKIE, sign, getPassword } from "./session";

/**
 * Server actions for the Good Heavens marketing proposal access form.
 * The page itself imports `isUnlocked` from ./session directly.
 */
export async function signInAction(formData: FormData) {
  const pw = String(formData.get("password") ?? "");
  if (pw === getPassword()) {
    cookies().set(GHM_COOKIE, sign(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/GHmarketing",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    redirect("/GHmarketing");
  }
  redirect("/GHmarketing?err=1");
}

export async function signOutAction() {
  cookies().delete(GHM_COOKIE);
  redirect("/GHmarketing");
}
