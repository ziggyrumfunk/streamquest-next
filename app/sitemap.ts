import type { MetadataRoute } from "next";
import { quests } from "@/data/quests";
import { getPosts } from "@/lib/news";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://streamquest.io";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    postRoutes = posts.map((p) => ({
      url: `${SITE}/news/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : (p.date ? new Date(p.date) : now),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // Blob may be unavailable at build time; fall through with no post entries.
  }

  return [...staticRoutes, ...questRoutes, ...postRoutes];
}
