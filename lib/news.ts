/**
 * News posts CRUD over Vercel KV.
 *
 * Storage layout:
 *   key  NEWS_INDEX_KEY                  -> string[] of post slugs, newest first
 *   key  NEWS_POST_PREFIX + slug         -> NewsPost
 *
 * Posts are public; reads go through getPosts/getPost.
 * Writes are gated by the admin server actions (see app/admin/news/actions.ts).
 */

import { unstable_cache, revalidateTag } from "next/cache";
import { kvGet, kvSet } from "./kv";

export const NEWS_INDEX_KEY = "news:index";
export const NEWS_POST_PREFIX = "news:post:";
export const NEWS_TAG = "news";

export type NewsFormat = "markdown" | "html";

export type NewsPost = {
  slug: string;
  title: string;
  date: string;          // ISO YYYY-MM-DD
  cover?: string;        // optional cover image URL (Blob or external)
  format: NewsFormat;
  body: string;
  createdAt: number;     // ms epoch
  updatedAt: number;     // ms epoch
};

/* ---------------- internal helpers ---------------- */

async function readIndexUncached(): Promise<string[]> {
  return (await kvGet<string[]>(NEWS_INDEX_KEY)) ?? [];
}

const readIndexCached = unstable_cache(
  readIndexUncached,
  ["news-index"],
  { tags: [NEWS_TAG] }
);

async function readPostUncached(slug: string): Promise<NewsPost | null> {
  return await kvGet<NewsPost>(NEWS_POST_PREFIX + slug);
}

const readPostCached = unstable_cache(
  readPostUncached,
  ["news-post"],
  { tags: [NEWS_TAG] }
);

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "post";
}

/* ---------------- public reads ---------------- */

export async function getPostSlugs(): Promise<string[]> {
  return readIndexCached();
}

export async function getPost(slug: string): Promise<NewsPost | null> {
  return readPostCached(slug);
}

/** All posts, newest first. */
export async function getPosts(): Promise<NewsPost[]> {
  const slugs = await readIndexCached();
  const posts: NewsPost[] = [];
  for (const slug of slugs) {
    const p = await readPostCached(slug);
    if (p) posts.push(p);
  }
  return posts;
}

/* ---------------- admin writes ---------------- */

/** Create a new post. Generates a unique slug if title collides. */
export async function createPost(input: {
  title: string;
  date: string;
  cover?: string;
  format: NewsFormat;
  body: string;
}): Promise<NewsPost> {
  const now = Date.now();
  let base = slugify(input.title);
  let slug = base;
  let n = 2;
  // Uniqueness check directly against KV (uncached read)
  while ((await readPostUncached(slug)) !== null) {
    slug = `${base}-${n++}`;
  }
  const post: NewsPost = {
    slug,
    title: input.title.trim(),
    date: input.date,
    cover: input.cover || undefined,
    format: input.format,
    body: input.body,
    createdAt: now,
    updatedAt: now,
  };
  await kvSet(NEWS_POST_PREFIX + slug, post);

  const index = await readIndexUncached();
  // Newest first; if the slug somehow already exists, dedupe.
  const next = [slug, ...index.filter((s) => s !== slug)];
  await kvSet(NEWS_INDEX_KEY, next);

  revalidateTag(NEWS_TAG);
  return post;
}

export async function updatePost(
  slug: string,
  patch: { title?: string; date?: string; cover?: string | null; format?: NewsFormat; body?: string }
): Promise<NewsPost | null> {
  const current = await readPostUncached(slug);
  if (!current) return null;
  const next: NewsPost = {
    ...current,
    ...(patch.title !== undefined ? { title: patch.title.trim() } : {}),
    ...(patch.date !== undefined ? { date: patch.date } : {}),
    // null means "remove cover", undefined means "leave alone"
    ...(patch.cover === null ? { cover: undefined } : patch.cover !== undefined ? { cover: patch.cover } : {}),
    ...(patch.format !== undefined ? { format: patch.format } : {}),
    ...(patch.body !== undefined ? { body: patch.body } : {}),
    updatedAt: Date.now(),
  };
  await kvSet(NEWS_POST_PREFIX + slug, next);
  revalidateTag(NEWS_TAG);
  return next;
}

export async function deletePost(slug: string): Promise<boolean> {
  // KV "delete" via overwrite to null, then drop from index.
  // (@vercel/kv does have del; using kvSet keeps our wrapper minimal.)
  await kvSet(NEWS_POST_PREFIX + slug, null as unknown as NewsPost);
  const index = await readIndexUncached();
  const next = index.filter((s) => s !== slug);
  await kvSet(NEWS_INDEX_KEY, next);
  revalidateTag(NEWS_TAG);
  return true;
}
