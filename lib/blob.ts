/**
 * Vercel Blob helpers for image uploads from the admin news editor.
 *
 * Requires BLOB_READ_WRITE_TOKEN env var, which is auto-set when you
 * create a Blob store in Vercel and connect it to the project.
 */

import { put } from "@vercel/blob";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

/**
 * Uploads a single image File to Vercel Blob under `news/`.
 * Returns the public URL on success, or throws with a friendly message.
 */
export async function uploadNewsImage(file: File): Promise<string> {
  if (!file || !file.size) {
    throw new Error("No file provided.");
  }
  if (!ALLOWED.has(file.type)) {
    throw new Error(`Unsupported image type: ${file.type}. Use JPG, PNG, WebP, GIF, or SVG.`);
  }
  if (file.size > MAX_BYTES) {
    throw new Error(`File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max 8 MB.`);
  }
  // Random suffix avoids collisions when uploading multiple images with the same name.
  const ts = Date.now().toString(36);
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 80);
  const key = `news/${ts}-${safeName}`;

  const blob = await put(key, file, {
    access: "public",
    contentType: file.type,
    addRandomSuffix: false,
  });
  return blob.url;
}
