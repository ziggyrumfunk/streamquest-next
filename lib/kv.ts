/**
 * Thin wrapper around @vercel/kv so the rest of the codebase doesn't
 * import the SDK directly. Keeps the door open to swap providers later.
 *
 * Requires KV_REST_API_URL and KV_REST_API_TOKEN env vars
 * (auto-populated when you link a Vercel KV store to the project).
 */

import { kv } from "@vercel/kv";

/** Read a single key. Returns null if missing or KV is unreachable. */
export async function kvGet<T>(key: string): Promise<T | null> {
  try {
    const v = await kv.get<T>(key);
    return v ?? null;
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[kv] get failed for", key, e);
    }
    return null;
  }
}

/** Write a key. Returns true on success, false if KV is unreachable. */
export async function kvSet<T>(key: string, value: T): Promise<boolean> {
  try {
    await kv.set(key, value);
    return true;
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[kv] set failed for", key, e);
    }
    return false;
  }
}
