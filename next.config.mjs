/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rbhzynpvmklxebqdznzz.supabase.co",
        pathname: "/storage/v1/object/public/streamquest/**",
      },
    ],
  },
  // Old Squarespace URLs will be redirected here in Phase 3.
  // async redirects() {
  //   return [
  //     { source: "/godbreakers", destination: "/quests/godbreakers", permanent: true },
  //     // ...
  //   ];
  // },
};

export default nextConfig;
