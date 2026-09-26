"use client";

import { useEffect, useRef } from "react";

/**
 * A short looping clip for a key feature card. Nothing downloads until the
 * card comes near the screen (preload="none"), it plays only while visible,
 * and with reduced motion switched on it never plays: the still poster stays.
 */
export default function FeatureLoop({ video, still }: { video: string; still?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "120px 0px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="q-feature-media"
      src={video}
      poster={still}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}
