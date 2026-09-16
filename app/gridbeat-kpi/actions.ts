"use server";

import { cookies, headers } from "next/headers";
import { rateLimit, clientKey } from "@/lib/rateLimit";
import { redirect } from "next/navigation";
import { GRIDBEAT_KPI_COOKIE, sign, getPassword } from "./session";

export async function signInAction(formData: FormData) {
  const limit = rateLimit(clientKey(headers(), "/gridbeat-kpi"));
  if (!limit.ok) {
    redirect("/gridbeat-kpi?err=1");
  }
  const pw = String(formData.get("password") ?? "");
  if (pw === getPassword()) {
    cookies().set(GRIDBEAT_KPI_COOKIE, sign(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/gridbeat-kpi",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/gridbeat-kpi");
  }
  redirect("/gridbeat-kpi?err=1");
}

export async function signOutAction() {
  cookies().delete(GRIDBEAT_KPI_COOKIE);
  redirect("/gridbeat-kpi");
}
