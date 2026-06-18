"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   Scroll-driven recline sequence.
   A tall wrapper holds a sticky 100vh stage. As the user scrolls
   through the wrapper, the chair cross-fades through its recline
   frames (15 -> 160 degrees) and the matching caption activates.
   Falls back to a static stacked grid when JS is off or the user
   prefers reduced motion.
   ============================================================ */

type Frame = {
  src: string;
  deg: string;
  title: string;
  body: string;
};

const FRAMES: Frame[] = [
  {
    src: "/media/libernovo/recline-15.webp",
    deg: "15°",
    title: "Locked in",
    body: "Dynamic synchronized support tracks your spine as you lean into the game. No lever fiddling between rounds.",
  },
  {
    src: "/media/libernovo/recline-115.webp",
    deg: "115°",
    title: "Ease back",
    body: "The backrest follows you the moment you settle between matches, holding the angle without a fight.",
  },
  {
    src: "/media/libernovo/recline-125.webp",
    deg: "125°",
    title: "Decompress",
    body: "OmniStretch decompression opens up the lower back on the fly, mid-session, without breaking your setup.",
  },
  {
    src: "/media/libernovo/recline-135.webp",
    deg: "135°",
    title: "Cool down",
    body: "Active ventilation keeps you comfortable through the long stuff, the marathons, the late nights on camera.",
  },
  {
    src: "/media/libernovo/recline-160.webp",
    deg: "160°",
    title: "Full recline",
    body: "160° for the breaks, the watch-parties, and the just-one-more-game that turns into three.",
  },
];

export default function ReclineScroll() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const node = wrapRef.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const vh = window.innerHeight;
        // Scrollable distance is wrapper height minus one sticky viewport.
        const total = rect.height - vh;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        const idx = Math.min(
          FRAMES.length - 1,
          Math.floor(p * FRAMES.length)
        );
        setActive(idx);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Static fallback: a simple frame strip, no scroll hijack.
  if (!enabled) {
    return (
      <div className="lib-recline-static">
        {FRAMES.map((f) => (
          <figure key={f.deg} className="lib-recline-static-cell">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.src} alt={`LiberNovo Omni Pro reclined to ${f.deg}`} loading="lazy" />
            <figcaption>
              <span className="lib-recline-deg">{f.deg}</span>
              <strong>{f.title}</strong>
              <span>{f.body}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="lib-recline-wrap">
      <div className="lib-recline-stage">
        <div className="lib-recline-stagegrid rd-shell">
          <div className="lib-recline-imgcol">
            <div className="lib-recline-imgstack">
              {FRAMES.map((f, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={f.deg}
                  src={f.src}
                  alt={i === active ? `LiberNovo Omni Pro reclined to ${f.deg}` : ""}
                  aria-hidden={i === active ? undefined : true}
                  className={`lib-recline-frame${i === active ? " is-on" : ""}`}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ))}
              <div className="lib-recline-degbadge" aria-hidden="true">
                {FRAMES[active].deg}
              </div>
            </div>
          </div>

          <div className="lib-recline-textcol">
            <span className="rd-section-tag">The chair, in motion</span>
            <div className="lib-recline-captions">
              {FRAMES.map((f, i) => (
                <div
                  key={f.deg}
                  className={`lib-recline-caption${i === active ? " is-on" : ""}`}
                  aria-hidden={i === active ? undefined : true}
                >
                  <h3>
                    <span className="lib-recline-caption-deg">{f.deg}</span>
                    {f.title}
                  </h3>
                  <p>{f.body}</p>
                </div>
              ))}
            </div>
            <div className="lib-recline-progress" aria-hidden="true">
              {FRAMES.map((f, i) => (
                <span
                  key={f.deg}
                  className={`lib-recline-tick${i <= active ? " is-on" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue — bounces while at the start of the sequence, fades once moving. */}
        <div
          className={`lib-recline-cue${active > 0 ? " is-done" : ""}`}
          aria-hidden="true"
        >
          <span className="lib-recline-cue-label">Scroll to recline</span>
          <span className="lib-recline-cue-mouse">
            <span className="lib-recline-cue-dot" />
          </span>
          <span className="lib-recline-cue-chevs">
            <span />
            <span />
          </span>
        </div>
      </div>
    </div>
  );
}
