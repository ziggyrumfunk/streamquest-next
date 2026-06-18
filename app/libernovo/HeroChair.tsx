"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   Hero chair with material switch + pointer parallax.
   Two finishes (Graphite / Glacier) cross-fade on swatch select.
   The chair drifts subtly toward the pointer for depth, and idles
   with a slow bob. Reduced-motion users get a static chair.
   ============================================================ */

type Finish = {
  key: string;
  label: string;
  src: string;
  // Lightweight CSS approximation of the fabric — the real textures are
  // ~2MB each and the chip renders at 26px, so a gradient is the right call.
  chip: string;
};

const FINISHES: Finish[] = [
  {
    key: "graphite",
    label: "Graphite",
    src: "/media/libernovo/chair-front-black.png",
    chip: "linear-gradient(135deg, #3a3f47 0%, #1b1e24 55%, #0c0e12 100%)",
  },
  {
    key: "glacier",
    label: "Glacier",
    src: "/media/libernovo/chair-front-white.webp",
    chip: "linear-gradient(135deg, #ffffff 0%, #e4e8ec 50%, #c2ccd4 100%)",
  },
];

export default function HeroChair() {
  const [finish, setFinish] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const chairRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = stageRef.current;
    const chair = chairRef.current;
    if (!stage || !chair) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = stage.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) / r.width;
        const y = (e.clientY - (r.top + r.height / 2)) / r.height;
        chair.style.setProperty("--px", `${x * 22}px`);
        chair.style.setProperty("--py", `${y * 16}px`);
        chair.style.setProperty("--rot", `${x * 4}deg`);
      });
    };
    const reset = () => {
      chair.style.setProperty("--px", "0px");
      chair.style.setProperty("--py", "0px");
      chair.style.setProperty("--rot", "0deg");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", reset);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={stageRef} className="lib-hero-stage">
      <div className="lib-hero-glow" aria-hidden="true" />
      <div ref={chairRef} className="lib-hero-chair">
        {FINISHES.map((f, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={f.key}
            src={f.src}
            alt={i === finish ? `LiberNovo Omni Pro ergonomic chair in ${f.label}` : ""}
            aria-hidden={i === finish ? undefined : true}
            className={`lib-hero-chair-img${i === finish ? " is-on" : ""}`}
            // First finish is above the fold — load it eagerly.
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      <div className="lib-hero-value" aria-hidden="true">
        <span className="lib-hero-value-num">~€1,200</span>
        <span className="lib-hero-value-label">retail value</span>
      </div>

      <div className="lib-hero-swatches" role="group" aria-label="Chair finish">
        {FINISHES.map((f, i) => (
          <button
            key={f.key}
            type="button"
            className={`lib-swatch${i === finish ? " is-on" : ""}`}
            aria-pressed={i === finish}
            onClick={() => setFinish(i)}
          >
            <span
              className="lib-swatch-chip"
              style={{ background: f.chip }}
            />
            <span className="lib-swatch-label">{f.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
