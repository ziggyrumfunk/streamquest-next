"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "sq_splash_seen";
const FILL_MS = 1300;     // progress bar takes ~1.3s to fill
const FADE_MS = 380;      // splash fades out over .38s after the bar fills

/**
 * Full-screen intro splash with Questy + a lime progress bar.
 * Shows once per browser session (sessionStorage flag).
 * Mounted in the root layout so it covers everything on first paint.
 *
 * Hidden by default until JS mounts to avoid SSR-flash on subsequent navigations.
 */
export default function LoadingSplash() {
  // "hidden" | "showing" | "fading" - drives the visible state
  const [phase, setPhase] = useState<"hidden" | "showing" | "fading">("hidden");

  useEffect(() => {
    // Reduced-motion users skip the splash entirely.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch { /* sessionStorage blocked, still show */ }

    // Lock scroll while the splash is up.
    document.documentElement.style.overflow = "hidden";
    setPhase("showing");

    const fadeTimer = setTimeout(() => setPhase("fading"), FILL_MS);
    const doneTimer = setTimeout(() => {
      setPhase("hidden");
      document.documentElement.style.overflow = "";
      try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
    }, FILL_MS + FADE_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`splash${phase === "fading" ? " is-fading" : ""}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="splash-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="splash-mascot"
          src="/firebase-public/Questy New Folder/Questy Regular Size (3).webp"
          alt=""
          width={260}
          height={260}
        />
        <div className="splash-brand">STREAMQUEST</div>
        <div className="splash-bar" role="progressbar" aria-label="Loading">
          <span className="splash-bar-fill" />
        </div>
        <div className="splash-label">Loading quests</div>
      </div>
    </div>
  );
}
