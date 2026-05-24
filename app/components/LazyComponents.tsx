"use client";

import dynamic from "next/dynamic";

/**
 * Below-the-fold or non-critical client components, dynamically imported
 * with ssr: false so their JS doesn't ship in the initial bundle.
 * Each one is fetched only when React renders the placeholder.
 */

export const LazySteamGrowthCounter = dynamic(
  () => import("./SteamGrowthCounter"),
  { ssr: false, loading: () => <div style={{ minHeight: 320 }} aria-hidden /> }
);

export const LazyPolaroidField = dynamic(
  () => import("./PolaroidField"),
  { ssr: false, loading: () => null }
);
