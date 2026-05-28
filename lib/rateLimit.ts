/**
 * Tiny in-memory rate limiter for password-gated server actions.
 *
 * Strategy: per-key sliding window. Keys are typically "<route>:<ip>".
 * Suitable for low-volume admin / client-report logins. Resets on cold
 * boot, which on Vercel means roughly per deployment + per idle window.
 * Good enough to slow a brute-force attempt to a crawl without adding
 * a Redis dependency.
 */

type Entry = { hits: number[]; blockedUntil: number };

const store = new Map<string, Entry>();

export type RateLimitOptions = {
  /** How many attempts allowed in the window. Default: 10. */
  max?: number;
  /** Window length in ms. Default: 60_000 (1 minute). */
  windowMs?: number;
  /** Block duration in ms after the window is exceeded. Default: 5 * 60_000. */
  blockMs?: number;
};

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterMs: number;
};

export function rateLimit(key: string, opts: RateLimitOptions = {}): RateLimitResult {
  const max = opts.max ?? 10;
  const windowMs = opts.windowMs ?? 60_000;
  const blockMs = opts.blockMs ?? 5 * 60_000;
  const now = Date.now();

  let entry = store.get(key);
  if (!entry) {
    entry = { hits: [], blockedUntil: 0 };
    store.set(key, entry);
  }

  if (entry.blockedUntil > now) {
    return { ok: false, remaining: 0, retryAfterMs: entry.blockedUntil - now };
  }

  // Drop hits older than the window.
  entry.hits = entry.hits.filter((t) => now - t < windowMs);

  if (entry.hits.length >= max) {
    entry.blockedUntil = now + blockMs;
    return { ok: false, remaining: 0, retryAfterMs: blockMs };
  }

  entry.hits.push(now);
  return { ok: true, remaining: max - entry.hits.length, retryAfterMs: 0 };
}

/**
 * Best-effort client identifier from the Next.js headers object. Falls back
 * to a fixed "unknown" string so the limiter still throttles in aggregate.
 */
export function clientKey(headers: Headers, route: string): string {
  const forwarded =
    headers.get("x-forwarded-for") ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "";
  const ip = forwarded.split(",")[0].trim() || "unknown";
  return `${route}:${ip}`;
}
