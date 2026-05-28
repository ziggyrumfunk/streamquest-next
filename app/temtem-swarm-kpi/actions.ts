"use server";

import { cookies, headers } from "next/headers";
import { rateLimit, clientKey } from "@/lib/rateLimit";
import { redirect } from "next/navigation";
import { TEMTEM_KPI_COOKIE, sign, getPassword } from "./session";

/**
 * Server actions for the Temtem Swarm KPI report access form.
 * The page itself imports `isUnlocked` from ./session directly.
 */
export async function signInAction(formData: FormData) {
  const limit = rateLimit(clientKey(headers(), "/temtem-swarm-kpi"));
  if (!limit.ok) {
    redirect("/temtem-swarm-kpi?err=1");
  }
  const pw = String(formData.get("password") ?? "");
  if (pw === getPassword()) {
    cookies().set(TEMTEM_KPI_COOKIE, sign(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/temtem-swarm-kpi",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    redirect("/temtem-swarm-kpi");
  }
  redirect("/temtem-swarm-kpi?err=1");
}

export async function signOutAction() {
  cookies().delete(TEMTEM_KPI_COOKIE);
  redirect("/temtem-swarm-kpi");
}
