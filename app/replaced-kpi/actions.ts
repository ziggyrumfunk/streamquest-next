"use server";

import { cookies, headers } from "next/headers";
import { rateLimit, clientKey } from "@/lib/rateLimit";
import { redirect } from "next/navigation";
import { REPLACED_KPI_COOKIE, sign, getPassword } from "./session";

export async function signInAction(formData: FormData) {
  const limit = rateLimit(clientKey(headers(), "/replaced-kpi"));
  if (!limit.ok) {
    redirect("/replaced-kpi?err=1");
  }
  const pw = String(formData.get("password") ?? "");
  if (pw === getPassword()) {
    cookies().set(REPLACED_KPI_COOKIE, sign(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/replaced-kpi",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/replaced-kpi");
  }
  redirect("/replaced-kpi?err=1");
}

export async function signOutAction() {
  cookies().delete(REPLACED_KPI_COOKIE);
  redirect("/replaced-kpi");
}
