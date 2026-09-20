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
import { setQuestSpots, isValidSpots } from "@/lib/questSpots";
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

/**
 * Save or remove a quest's "X of Y spots left" counter. The form has two
 * submit buttons; the one that was pressed arrives as `intent`.
 */
export async function setQuestSpotsAction(formData: FormData) {
  if (!isAdmin()) redirect("/admin/login");

  const slug = String(formData.get("slug") ?? "");
  const intent = String(formData.get("intent") ?? "save");
  if (!getQuestBySlug(slug)?.limitedSpots) {
    redirect("/admin?err=missing");
  }

  let ok: boolean;
  if (intent === "clear") {
    ok = await setQuestSpots(slug, null);
  } else {
    // Digits only. A blank "left" must never be read as 0, or a half-filled
    // form would tell creators every spot is gone.
    const digits = (name: string) => {
      const raw = String(formData.get(name) ?? "").trim();
      return /^\d{1,5}$/.test(raw) ? Number(raw) : NaN;
    };
    const total = digits("total");
    const left = digits("left");
    if (!isValidSpots(total, left)) {
      redirect("/admin?err=spots");
    }
    ok = await setQuestSpots(slug, { total, left });
  }
  if (!ok) {
    redirect("/admin?err=kv");
  }

  revalidatePath("/admin");
  revalidatePath(`/quests/${slug}`);

  redirect(intent === "clear" ? "/admin?ok=spots-hidden" : "/admin?ok=spots");
}
