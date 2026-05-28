"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ENDIX_KPI_COOKIE, sign, getPassword } from "./session";

export async function signInAction(formData: FormData) {
  const pw = String(formData.get("password") ?? "");
  if (pw === getPassword()) {
    cookies().set(ENDIX_KPI_COOKIE, sign(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/endix-kpi",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/endix-kpi");
  }
  redirect("/endix-kpi?err=1");
}

export async function signOutAction() {
  cookies().delete(ENDIX_KPI_COOKIE);
  redirect("/endix-kpi");
}
