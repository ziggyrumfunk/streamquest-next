"use client";

import { useEffect, useRef } from "react";

type Tile = {
  src: string;
  className: string; // position class set via CSS (e.g. "p1", "p2"...)
  depth?: number;    // 0.0 = stationary, 1.0 = follows cursor strongly
  priority?: boolean;
};

type Props = {
  tiles: Tile[];
  className?: string;
  /** Max pixels of cursor-driven parallax shift. */
  intensity?: number;
  /** Class applied to each tile wrapper. Defaults to "rd-tile". */
  tileClass?: string;
};

/**
 * A field of floating game-art tiles that drift toward the cursor.
 * Pure CSS rotations + float animations stay intact; this only sets
 * --mx / --my CSS vars that the .rd-tile transform reads.
 */
export default function PolaroidField({
  tiles,
  className,
  intensity = 36,
  tileClass = "rd-tile",
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Disable on touch — no useful cursor to track.
    if (window.matchMedia("(hover: none)").matches) return;

    const tileEls = Array.from(wrap.querySelectorAll<HTMLElement>(`.${tileClass}`));

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;

    const tick = () => {
      // Smooth lerp toward target so the field has gentle inertia.
      // Higher value = snappier follow (less lag).
      curX += (targetX - curX) * 0.14;
      curY += (targetY - curY) * 0.14;

      for (const el of tileEls) {
        const d = Number(el.dataset.depth) || 0.4;
        el.style.setProperty("--mx", `${curX * d}px`);
        el.style.setProperty("--my", `${curY * d}px`);
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      // Normalize cursor to viewport range -0.5..0.5 then scale.
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetX = nx * intensity * 2;
      targetY = ny * intensity * 2;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [intensity, tileClass]);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      {tiles.map((t, i) => (
        <div
          key={`${t.src}-${i}`}
          className={`${tileClass} ${t.className}`}
          data-depth={t.depth ?? 0.5}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={t.src}
            alt=""
            loading={t.priority ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}
