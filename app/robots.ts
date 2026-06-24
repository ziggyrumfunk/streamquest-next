import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://streamquest.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/GHmarketing",
          "/pitch",
          "/temtem-swarm-kpi",
          "/endix-kpi",
          "/aska-kpi",
          "/house-flipper-kpi",
          "/good-heavens-kpi",
        ],
      },
    ],
    sitemap: `${SITE}/sitema