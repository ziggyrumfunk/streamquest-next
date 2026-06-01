"use server";

import { cookies, headers } from "next/headers";
import { rateLimit, clientKey } from "@/lib/rateLimit";
import { redirect } from "next/navigation";
import { ASKA_KPI_COOKIE, sign, getPassword } from "./session";

export async function signInAction(formData: FormData) {
  const limit = rateLimit(clientKey(headers(), "/aska-kpi"));
  if (!limit.ok) {
    redirect("/aska-kpi?err=1");
  }
  const pw = String(formData.get("password") ?? "");
  if (pw === getPassword()) {
    cookies().set(ASKA_KPI_COOKIE, sign(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/aska-kpi",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/aska-kpi");
  }
  redirect("/aska-kpi?err=1");
}

export async function signOutAction() {
  cookies().delete(ASKA_KPI_COOKIE);
  redirect("/aska-kpi");
}
