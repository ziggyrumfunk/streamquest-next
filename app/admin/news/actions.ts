"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { isAdmin } from "@/lib/auth";
import {
  createPost,
  updatePost,
  deletePost,
  type NewsFormat,
} from "@/lib/news";
import { uploadNewsImage } from "@/lib/blob";

function requireAdminOrRedirect() {
  if (!isAdmin()) redirect("/admin/login");
}

function pickFormat(value: FormDataEntryValue | null): NewsFormat {
  return value === "html" ? "html" : "markdown";
}

/** Create a new post. Cover image may be uploaded inline. */
export async function createPostAction(formData: FormData) {
  requireAdminOrRedirect();
  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim() || new Date().toISOString().slice(0, 10);
  const format = pickFormat(formData.get("format"));
  const body = String(formData.get("body") ?? "");
  let cover = String(formData.get("coverUrl") ?? "").trim() || undefined;

  if (!title) redirect("/admin/news/new?err=title");
  if (!body) redirect("/admin/news/new?err=body");

  // Optional file upload from the cover-image input
  const coverFile = formData.get("coverFile");
  if (coverFile instanceof File && coverFile.size > 0) {
    try {
      cover = await uploadNewsImage(coverFile);
    } catch (e) {
      redirect("/admin/news/new?err=blob");
    }
  }

  const post = await createPost({ title, date, cover, format, body });
  revalidatePath("/news");
  revalidatePath(`/news/${post.slug}`);
  redirect("/admin/news?ok=created");
}

export async function updatePostAction(formData: FormData) {
  requireAdminOrRedirect();
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) redirect("/admin/news");

  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const format = pickFormat(formData.get("format"));
  const body = String(formData.get("body") ?? "");
  const removeCover = formData.get("removeCover") === "1";
  let cover: string | null | undefined = undefined;

  if (removeCover) {
    cover = null;
  } else {
    const provided = String(formData.get("coverUrl") ?? "").trim();
    if (provided) cover = provided;
    const coverFile = formData.get("coverFile");
    if (coverFile instanceof File && coverFile.size > 0) {
      try {
        cover = await uploadNewsImage(coverFile);
      } catch {
        redirect(`/admin/news/${slug}/edit?err=blob`);
      }
    }
  }

  await updatePost(slug, { title, date, cover, format, body });
  revalidatePath("/news");
  revalidatePath(`/news/${slug}`);
  redirect("/admin/news?ok=updated");
}

export async function deletePostAction(formData: FormData) {
  requireAdminOrRedirect();
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) redirect("/admin/news");
  await deletePost(slug);
  revalidatePath("/news");
  redirect("/admin/news?ok=deleted");
}

/** Used by the inline image-upload helper inside the body editor. */
export async function uploadBodyImageAction(formData: FormData): Promise<{ url?: string; error?: string }> {
  if (!isAdmin()) return { error: "Not authorized" };
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "No file" };
  try {
    const url = await uploadNewsImage(file);
    return { url };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Upload failed" };
  }
}
