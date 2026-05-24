import type { MetadataRoute } from "next";
import { quests } from "@/data/quests";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://streamquest.io";

/**
 * Sitemap: fully static. No KV / Blob lookups so Google never times out.
 * News posts can be added back later via a separate /news/sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,                       lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE}/streamers`,              lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE}/brands`,                 lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE}/quests-guide`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/testimonials`,           lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/faq`,                    lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/news`,                   lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE}/privacy-policy`,         lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE}/terms-and-conditions`,   lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];

  const questRoutes: MetadataRoute.Sitemap = quests.map((q) => ({
    url: `${SITE}/quests/${q.slug}`,
    lastModified: now,
    changeFrequency: q.status === "active" ? "weekly" : "monthly",
    priority: q.status === "active" ? 0.85 : 0.5,
  }));

  return [...staticRoutes, ...questRoutes];
}
