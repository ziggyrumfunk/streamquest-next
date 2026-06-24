"use server";

import { cookies, headers } from "next/headers";
import { rateLimit, clientKey } from "@/lib/rateLimit";
import { redirect } from "next/navigation";
import { GOOD_HEAVENS_KPI_COOKIE, sign, getPassword } from "./session";

export async function signInAction(formData: FormData) {
  const limit = rateLimit(clientKey(headers(), "/good-heavens-kpi"));
  if (!limit.ok) {
    redirect("/good-heavens-kpi?err=1");
  }
  const pw = String(formData.get("password") ?? "");
  if (pw === getPassword()) {
    cookies().set(GOOD_HEAVENS_KPI_COOKIE, sign(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/good-heavens-kpi",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/good-heavens-kpi");
  }
  redirect("/good-heavens-kpi?err=1");
}

export async function signOutAction() {
  cookies().delete(GOOD_HEAVENS_KPI_COOKIE);
  redirect("/good-heavens-kpi");
}
