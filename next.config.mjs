/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rbhzynpvmklxebqdznzz.supabase.co",
        pathname: "/storage/v1/object/public/streamquest/**",
      },
    ],
  },
  async redirects() {
    return [
      // Friendly short URL for the Good Heavens! quest brief.
      { source: "/GOODHEAVENS",   destination: "/quests/goodheavens", permanent: true },
      { source: "/goodheavens",   destination: "/quests/goodheavens", permanent: true },
      { source: "/Goodheavens",   destination: "/quests/goodheavens", permanent: true },
      { source: "/GoodHeavens",   destination: "/quests/goodheavens", permanent: true },
      { source: "/good-heavens",  destination: "/quests/goodheavens", permanent: true },

      // Friendly short URL for the Alpha Nomos quest brief.
      { source: "/alphanomos",   destination: "/quests/alphanomos", permanent: true },
      { source: "/ALPHANOMOS",   destination: "/quests/alphanomos", permanent: true },
      { source: "/AlphaNomos",   destination: "/quests/alphanomos", permanent: true },
      { source: "/Alphanomos",   destination: "/quests/alphanomos", permanent: true },
      { source: "/alpha-nomos",  destination: "/quests/alphanomos", permanent: true },

      // Friendly short URL for the Ground Zero Hero quest brief.
      { source: "/gzh",              destination: "/quests/groundzerohero", permanent: true },
      { source: "/GZH",              destination: "/quests/groundzerohero", permanent: true },
      { source: "/Gzh",              destination: "/quests/groundzerohero", permanent: true },
      { source: "/groundzerohero",   destination: "/quests/groundzerohero", permanent: true },
      { source: "/GROUNDZEROHERO",   destination: "/quests/groundzerohero", permanent: true },
      { source: "/GroundZeroHero",   destination: "/quests/groundzerohero", permanent: true },
      { source: "/ground-zero-hero", destination: "/quests/groundzerohero", permanent: true },

      // RIFTFALL short URLs. Disabled while the brief is unpublished so the
      // links 404 outright instead of redirecting into a missing page.
      // Restore alongside removing `draft: true` in data/quests.ts.
      // { source: "/riftfall",  destination: "/quests/riftfall", permanent: true },
      // { source: "/RIFTFALL",  destination: "/quests/riftfall", permanent: true },
      // { source: "/Riftfall",  destination: "/quests/riftfall", permanent: true },
      // { source: "/rift-fall", destination: "/quests/riftfall", permanent: true },
    ];
  },
};

export default nextConfig;
