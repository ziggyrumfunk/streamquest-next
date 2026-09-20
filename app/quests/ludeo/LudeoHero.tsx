"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { LOGO_VIEWBOX, MARK_PATH, WORD_PATHS } from "./logoPaths";

/* ============================================================
   Hero for the Ludeo brief: a blurred collage of Ludeo game art
   with the Ludeo logo on top, and the whole thing reacts to the
   pointer. The collage drifts against the cursor, the logo tilts
   in 3D toward it, the pentagon mark turns, and a yellow glow
   follows behind. Clicking the logo gives it a short pulse.

   One rAF loop eases everything toward the pointer target, so no
   transform is ever driven from two places. Pulse lives on an inner
   wrapper for the same reason. Reduced motion: nothing moves.
   ============================================================ */

const EASE = 0.08;

export default function LudeoHero({ children }: { children: ReactNode }) {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLButtonElement>(null);
  const markRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const t0 = performance.now();
    let last = t0;

    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };

    const tick = (now: number) => {
      // Time-based easing, so the feel is the same at 60 Hz, 120 Hz or when
      // the browser throttles frames.
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const k = 1 - Math.pow(1 - EASE, dt * 60);
      x += (tx - x) * k;
      y += (ty - y) * k;
      const t = (now - t0) / 1000;
      const bob = Math.sin(t * 1.1) * 4;

      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${(-x * 24).toFixed(2)}px, ${(-y * 16).toFixed(2)}px, 0) scale(1.1)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${(x * 130).toFixed(1)}px, ${(y * 80).toFixed(1)}px, 0)`;
      }
      if (logoRef.current) {
        logoRef.current.style.transform =
          `perspective(900px) rotateY(${(x * 13).toFixed(2)}deg) rotateX(${(-y * 10).toFixed(2)}deg) ` +
          `translate3d(${(x * 10).toFixed(2)}px, ${(y * 6 + bob).toFixed(2)}px, 0)`;
      }
      if (markRef.current) {
        markRef.current.style.transform = `rotate(${(x * 16 + Math.sin(t * 0.8) * 2.5).toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const pulse = () => {
    const el = logoRef.current;
    if (!el) return;
    el.classList.remove("is-pulse");
    // Force a reflow so the animation restarts on rapid clicks.
    void el.offsetWidth;
    el.classList.add("is-pulse");
  };

  return (
    <section className="lq-hero" ref={heroRef}>
      <div className="lq-hero-bg" ref={bgRef} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/ludeo/quest/collage-blur.webp" alt="" fetchPriority="high" />
      </div>
      <div className="lq-hero-veil" aria-hidden="true" />
      <div className="lq-hero-glow" ref={glowRef} aria-hidden="true" />

      <div className="rd-shell lq-hero-inner">
        <button
          type="button"
          className="lq-logo"
          ref={logoRef}
          onClick={pulse}
          onAnimationEnd={(e) => e.currentTarget.classList.remove("is-pulse")}
          aria-label="Ludeo"
        >
          <span className="lq-logo-inner">
            <svg viewBox={LOGO_VIEWBOX} role="img" aria-hidden="true" focusable="false">
              <g ref={markRef} className="lq-logo-mark">
                <path d={MARK_PATH} fill="#FFBA00" />
              </g>
              {WORD_PATHS.map((d, i) => (
                <path key={i} d={d} fill="#FFFFFF" />
              ))}
            </svg>
          </span>
        </button>
        {children}
      </div>
    </section>
  );
}
