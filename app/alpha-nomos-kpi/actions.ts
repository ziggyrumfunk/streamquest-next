"use server";

import { cookies, headers } from "next/headers";
import { rateLimit, clientKey } from "@/lib/rateLimit";
import { redirect } from "next/navigation";
import { NOMOS_KPI_COOKIE, sign, getPassword } from "./session";

export async function signInAction(formData: FormData) {
  const limit = rateLimit(clientKey(headers(), "/alpha-nomos-kpi"));
  if (!limit.ok) {
    redirect("/alpha-nomos-kpi?err=1");
  }
  const pw = String(formData.get("password") ?? "");
  if (pw === getPassword()) {
    cookies().set(NOMOS_KPI_COOKIE, sign(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/alpha-nomos-kpi",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/alpha-nomos-kpi");
  }
  redirect("/alpha-nomos-kpi?err=1");
}

export async function signOutAction() {
  cookies().delete(NOMOS_KPI_COOKIE);
  redirect("/alpha-nomos-kpi");
}
