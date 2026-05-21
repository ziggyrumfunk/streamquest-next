"use client";

import { useEffect, useRef } from "react";

const LANDSCAPE_CLIPS = [
  "/media/clips/landscape-01.mp4",
  "/media/clips/landscape-02.mp4",
  "/media/clips/landscape-03.mp4",
  "/media/clips/landscape-04.mp4",
  "/media/clips/landscape-05.mp4",
  "/media/clips/landscape-06.mp4",
  "/media/clips/landscape-07.mp4",
  "/media/clips/landscape-08.mp4",
  "/media/clips/landscape-09.mp4",
  "/media/clips/landscape-10.mp4",
  "/media/clips/landscape-11.mp4",
  "/media/clips/landscape-12.mp4",
];

const PORTRAIT_CLIPS = [
  "/media/clips/portrait-01.mp4",
  "/media/clips/portrait-02.mp4",
  "/media/clips/portrait-03.mp4",
  "/media/clips/portrait-04.mp4",
  "/media/clips/portrait-05.mp4",
  "/media/clips/portrait-06.mp4",
  "/media/clips/portrait-07.mp4",
  "/media/clips/portrait-08.mp4",
  "/media/clips/portrait-09.mp4",
];

type Props = {
  /** How many landscape + portrait clips to show. Defaults to 4 + 5. */
  landscapeCount?: number;
  portraitCount?: number;
  /** Override default title/copy if you want this section to read differently on each page. */
  eyebrow?: string;
  title?: React.ReactNode;
  sub?: string;
};

/**
 * "Live from creators" section — landscape rail + portrait wall.
 * Clips autoplay+loop only when they scroll into view (saves bandwidth and CPU).
 * Sound is stripped at encode time so muted is just a fallback.
 */
export default function CreatorClips({
  landscapeCount = 4,
  portraitCount = 5,
  eyebrow = "Live from creators",
  title,
  sub = "Clips pulled straight from StreamQuest paid creator streams. Real audiences, real reactions, real games.",
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Pause videos that are off-screen so we don't burn CPU and bandwidth.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const videos = Array.from(root.querySelectorAll<HTMLVideoElement>("video"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0.2 }
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  const landscapes = LANDSCAPE_CLIPS.slice(0, landscapeCount);
  const portraits = PORTRAIT_CLIPS.slice(0, portraitCount);

  return (
    <section className="creator-clips" ref={rootRef}>
      <div className="rd-shell">
        <header className="creator-clips-head">
          <span className="rd-section-tag">
            <span className="pulse" />
            {eyebrow}
          </span>
          <h2>{title ?? <>Real moments from <span className="grad">our creator pool</span>.</>}</h2>
          <p>{sub}</p>
        </header>

        {landscapes.length > 0 && (
          <div className="creator-clips-row creator-clips-row-landscape">
            {landscapes.map((src, i) => (
              <div key={src} className={`creator-clip is-landscape pos-${i + 1}`}>
                <video
                  src={src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        )}

        {portraits.length > 0 && (
          <div className="creator-clips-row creator-clips-row-portrait">
            {portraits.map((src, i) => (
              <div key={src} className={`creator-clip is-portrait pos-${i + 1}`}>
                <video
                  src={src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
