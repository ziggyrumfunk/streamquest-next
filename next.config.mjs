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
    ];
  },
};

export default nextConfig;
