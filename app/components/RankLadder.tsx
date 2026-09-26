"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { QuestTier } from "@/data/quests";

/* ============================================================
   Payout tiers on a quest brief, drawn as a rank ladder.

   Each tier gets a hex medal in its metal (bronze, silver, gold).
   Medals grow and sit higher with every rank, standing on a light
   beam like a podium step, and a glowing track climbs through them
   from the first tier to the top one. The top tier wears a crown,
   with slow light rays behind its medal and a shine across its card.

   On scroll into view the track wipes in from the first medal to the
   top one and the medals pop in one by one. (A clip-path wipe, because
   a dash-based draw leaves gaps on the stretched SVG.) Content already
   on screen at load, and anyone with reduced motion switched on, simply
   sees the finished ladder.

   The track is an SVG stretched over the medal band: x in column
   units (200 per tier, so a medal's centre is 200i + 100), y in real
   pixels. The same numbers position the medals, so they always meet.
   ============================================================ */

type Metal = "bronze" | "silver" | "gold" | "base";

const metalOf = (name: string): Metal => {
  const n = name.toLowerCase();
  if (n.includes("gold")) return "gold";
  if (n.includes("silver")) return "silver";
  if (n.includes("bronze")) return "bronze";
  return "base";
};

/** Track colour at each medal, blended between them. */
const TRACK: Record<Metal, string> = {
  bronze: "#d98a4a",
  silver: "#d7e2ef",
  gold: "#f5c542",
  base: "#b2f048",
};

/** Height of the medal band above the cards, in px (wide screens). */
const BAND = 224;
/** The top tier's medal is 104px; each rank below is 16px smaller. */
const sizeOf = (i: number, n: number) => 104 - 16 * (n - 1 - i);
/** Distance from the band's bottom edge to the medal: each rank climbs 36px. */
const liftOf = (i: number) => 16 + 36 * i;

/** The pills under a tier card: the built-in flags, then any custom ones. */
const flagsOf = (t: QuestTier): string[] => [
  ...(t.sideQuestsRequired ? ["At least 1 side quest required"] : []),
  ...(t.freeCopy ? ["Free game copy included"] : []),
  ...(t.flags ?? []),
];

const STAR = "M12 2.4l2.83 6.13 6.7.72-5 4.53 1.41 6.6L12 17.02l-5.94 3.36 1.41-6.6-5-4.53 6.7-.72z";
const CROWN = "M2.5 19.5 1 6.5l6.2 5.2L12 3l4.8 8.7L23 6.5l-1.5 13z";

export default function RankLadder({ tiers }: { tiers: QuestTier[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [anim, setAnim] = useState<"wait" | "go" | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at load: show it finished, never flash it hidden.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;

    setAnim("wait");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnim("go");
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const n = tiers.length;
  const width = n * 200;
  const centreY = (i: number) => BAND - liftOf(i) - sizeOf(i, n) / 2;
  const points = tiers.map((_, i) => `${i * 200 + 100},${centreY(i)}`).join(" ");

  return (
    <div
      ref={ref}
      className="q-ranks-wrap"
      data-anim={anim}
      style={{ "--n": n, "--band": `${BAND}px` } as CSSProperties}
    >
      {n > 1 && (
        <svg
          className="q-rank-track"
          viewBox={`0 0 ${width} ${BAND}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="q-rank-track-grad" gradientUnits="userSpaceOnUse" x1="100" y1="0" x2={width - 100} y2="0">
              {tiers.map((t, i) => (
                <stop key={t.name + i} offset={i / (n - 1)} stopColor={TRACK[metalOf(t.name)]} />
              ))}
            </linearGradient>
          </defs>
          <polyline className="q-rank-track-base" points={points} />
          <polyline className="q-rank-track-line" points={points} stroke="url(#q-rank-track-grad)" />
        </svg>
      )}

      <ol className="q-ranks">
        {tiers.map((t, i) => {
          const metal = metalOf(t.name);
          const top = i === n - 1 && n > 1;
          return (
            <li
              key={t.name + i}
              className={`q-rank is-${metal}${top ? " is-top" : ""}`}
              style={{ "--i": i, "--size": `${sizeOf(i, n)}px`, "--lift": `${liftOf(i)}px` } as CSSProperties}
            >
              <div className="q-rank-band" aria-hidden="true">
                <span className="q-rank-beam" />
                <span className="q-rank-emblem">
                  {top && <span className="q-rank-rays" />}
                  <span className="q-rank-hex">
                    <svg className="q-rank-star" viewBox="0 0 24 24" focusable="false">
                      <path d={STAR} />
                    </svg>
                  </span>
                  {top && (
                    <svg className="q-rank-crown" viewBox="0 0 24 22" focusable="false">
                      <path d={CROWN} />
                    </svg>
                  )}
                </span>
              </div>

              <div className="q-rank-card">
                <div className="q-rank-name">{t.name}</div>
                <div className="q-rank-payout">{t.payout}</div>
                {t.rate && <div className="q-rank-rate">{t.rate}</div>}
                {t.rateNote && <p className="q-rank-note">{t.rateNote}</p>}
                <p className="q-rank-req">{t.requirement}</p>
                {flagsOf(t).length > 0 && (
                  <div className="q-rank-flags">
                    {flagsOf(t).map((f) => (
                      <span key={f}>{f}</span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
