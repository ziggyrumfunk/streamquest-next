import type { MetadataRoute } from "next";
import { quests } from "@/data/quests";
import { getPostSlugs, getPost } from "@/lib/news";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://streamquest.io";

/**
 * Sitemap: fully static. No KV / Blob lookups so Google never times out.
 * News posts can be added back later via a separate /news/sitemap.xml.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,                                lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE}/streamers`,                       lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE}/brands`,                          lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE}/case-studies`,                    lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/case-studies/planet-of-lana-2`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/case-studies/replaced`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/quests-guide`,                    lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/testimonials`,                    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/faq`,                             lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/news`,                            lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE}/privacy-policy`,                  lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE}/terms-and-conditions`,            lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];

  const questRoutes: MetadataRoute.Sitemap = quests.map((q) => ({
    url: `${SITE}/quests/${q.slug}`,
    lastModified: now,
    changeFrequency: q.status === "active" ? "weekly" : "monthly",
    priority: q.status === "active" ? 0.85 : 0.5,
  }));

  // News posts are fetched best-effort. If KV is unavailable we just
  // skip them rather than failing the whole sitemap.
  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getPostSlugs();
    const posts = await Promise.all(slugs.map((s) => getPost(s).catch(() => null)));
    newsRoutes = posts
      .filter((p): p is NonNullable<typeof p> => !!p)
      .map((p) => ({
        url: `${SITE}/news/${p.slug}`,
        lastModified: p.date ? new Date(p.date) : now,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      }));
  } catch {
    newsRoutes = [];
  }

  return [...staticRoutes, ...questRoutes, ...newsRoutes];
}
