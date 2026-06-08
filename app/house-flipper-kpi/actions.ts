"use server";

import { cookies, headers } from "next/headers";
import { rateLimit, clientKey } from "@/lib/rateLimit";
import { redirect } from "next/navigation";
import { HOUSE_FLIPPER_KPI_COOKIE, sign, getPassword } from "./session";

export async function signInAction(formData: FormData) {
  const limit = rateLimit(clientKey(headers(), "/house-flipper-kpi"));
  if (!limit.ok) {
    redirect("/house-flipper-kpi?err=1");
  }
  const pw = String(formData.get("password") ?? "");
  if (pw === getPassword()) {
    cookies().set(HOUSE_FLIPPER_KPI_COOKIE, sign(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/house-flipper-kpi",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/house-flipper-kpi");
  }
  redirect("/house-flipper-kpi?err=1");
}

export async function signOutAction() {
  cookies().delete(HOUSE_FLIPPER_KPI_COOKIE);
  redirect("/house-flipper-kpi");
}
