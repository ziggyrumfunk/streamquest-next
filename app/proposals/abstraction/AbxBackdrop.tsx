"use client";

import { useEffect, useRef } from "react";

/**
 * Blurred, darkened gameplay loop behind the hero and the lock screen, cut
 * from Abstraction's own homepage reel (blur and darkening are baked into the
 * file). Plays only while on screen; with reduced motion switched on it never
 * starts, so the still poster stays.
 */
export default function AbxBackdrop({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) {
      v.play().catch(() => {});
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="abx-backdrop"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
