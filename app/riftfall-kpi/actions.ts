"use server";

import { cookies, headers } from "next/headers";
import { rateLimit, clientKey } from "@/lib/rateLimit";
import { redirect } from "next/navigation";
import { RF_KPI_COOKIE, sign, getPassword } from "./session";

export async function signInAction(formData: FormData) {
  const limit = rateLimit(clientKey(headers(), "/riftfall-kpi"));
  if (!limit.ok) {
    redirect("/riftfall-kpi?err=1");
  }
  const pw = String(formData.get("password") ?? "");
  if (pw === getPassword()) {
    cookies().set(RF_KPI_COOKIE, sign(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/riftfall-kpi",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/riftfall-kpi");
  }
  redirect("/riftfall-kpi?err=1");
}

export async function signOutAction() {
  // Expire it on the same path it was set on, or the browser keeps it.
  cookies().set(RF_KPI_COOKIE, "", { path: "/riftfall-kpi", maxAge: 0 });
  redirect("/riftfall-kpi");
}
