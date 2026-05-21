"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import {
  setSessionCookie,
  clearSessionCookie,
  verifyPassword,
  isAdmin,
} from "@/lib/auth";
import { setQuestStatus } from "@/lib/questStatus";
import { getQuestBySlug, type QuestStatus } from "@/data/quests";

/** Sign-in form action. */
export async function signInAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    redirect("/admin/login?err=1");
  }
  setSessionCookie();
  redirect("/admin");
}

/** Sign-out (button in admin header). */
export async function signOutAction() {
  clearSessionCookie();
  redirect("/admin/login");
}

/** Toggle a single quest between "active" and "completed". */
export async function toggleQuestStatusAction(formData: FormData) {
  if (!isAdmin()) redirect("/admin/login");

  const slug = String(formData.get("slug") ?? "");
  const next = String(formData.get("next") ?? "") as QuestStatus;
  if (!slug || (next !== "active" && next !== "completed")) {
    redirect("/admin?err=invalid");
  }
  if (!getQuestBySlug(slug)) {
    redirect("/admin?err=missing");
  }

  const ok = await setQuestStatus(slug, next);
  if (!ok) {
    redirect("/admin?err=kv");
  }

  // Refresh anything that reads live status.
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/quests/${slug}`);

  redirect("/admin?ok=1");
}
