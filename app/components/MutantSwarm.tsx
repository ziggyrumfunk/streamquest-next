"use client";

import { useEffect, useRef } from "react";
import type { QuestSwarmItem } from "@/data/quests";

/* ============================================================
   MutantSwarm — an interactive depth-layered character band.

   Three motions combine on every frame, all through one transform
   so the browser only ever composites:

   1. Parallax — as the band scrolls through the viewport each
      character drifts vertically, scaled by its `depth`.
   2. Repulsion — characters flee the pointer. Closer to the cursor
      means a harder push, so moving through the band scatters the
      horde the way the game does.
   3. Idle drift — a slow per-character bob so the layer never
      feels frozen when the pointer is away.

   Positions are lerped toward their targets each frame, which keeps
   the scatter springy instead of snapping. Falls back to a static
   arrangement under prefers-reduced-motion.
   ============================================================ */

type Props = { items: QuestSwarmItem[] };

/** How far the pointer reaches, in px. */
const REPEL_RADIUS = 340;
/**
 * Maximum push at the pointer. Characters settle short of this: as one is
 * pushed away the distance grows and the force falls off, so the layer finds
 * its own equilibrium instead of pinning to the maximum.
 */
const REPEL_STRENGTH = 190;
/** Per-frame easing toward the target position. */
const EASE = 0.12;

type Node = {
  el: HTMLElement;
  depth: number;
  /** current + target offsets, in px */
  cx: number;
  cy: number;
  tx: number;
  ty: number;
  /** idle bob seed so characters do not move in lockstep */
  phase: number;
  amp: number;
};

export default function MutantSwarm({ items }: Props) {
  const bandRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const band = bandRef.current;
    const layer = layerRef.current;
    if (!band || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes: Node[] = Array.from(
      layer.querySelectorAll<HTMLElement>("[data-swarm-item]")
    ).map((el, i) => ({
      el,
      depth: Number(el.dataset.depth ?? 0.5),
      cx: 0,
      cy: 0,
      tx: 0,
      ty: 0,
      phase: (i * 2.399) % (Math.PI * 2),
      amp: 4 + Number(el.dataset.depth ?? 0.5) * 8,
    }));
    if (!nodes.length) return;

    // Pointer is tracked in viewport space; null means "not over the band".
    let pointer: { x: number; y: number } | null = null;
    let scrollP = 0; // -1 .. 1 progress of the band through the viewport
    let raf = 0;
    let running = false;
    let onScreen = false;

    const readScroll = () => {
      const r = band.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the band centre sits at the viewport centre.
      scrollP = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      scrollP = Math.max(-1, Math.min(1, scrollP));
    };

    const frame = (t: number) => {
      const time = t / 1000;
      let moving = false;

      for (const n of nodes) {
        // Parallax: deeper characters travel further.
        const parallax = scrollP * 46 * n.depth;
        // Idle bob.
        const bob = Math.sin(time * 0.6 + n.phase) * n.amp;

        let px = 0;
        let py = 0;
        if (pointer) {
          const r = n.el.getBoundingClientRect();
          const dx = r.left + r.width / 2 - pointer.x;
          const dy = r.top + r.height / 2 - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPEL_RADIUS && dist > 0.001) {
            // Falls off smoothly to zero at the edge of the radius.
            const force = (1 - dist / REPEL_RADIUS) ** 2 * REPEL_STRENGTH;
            // Lighter characters (lower depth) get shoved further.
            const mass = 0.6 + n.depth * 0.8;
            px = (dx / dist) * force / mass;
            py = (dy / dist) * force / mass;
          }
        }

        n.tx = px;
        n.ty = py + parallax + bob;

        n.cx += (n.tx - n.cx) * EASE;
        n.cy += (n.ty - n.cy) * EASE;

        if (Math.abs(n.tx - n.cx) > 0.05 || Math.abs(n.ty - n.cy) > 0.05) {
          moving = true;
        }

        const rot = (n.cx / 13) * (0.5 + n.depth);
        n.el.style.transform = `translate3d(${n.cx.toFixed(2)}px, ${n.cy.toFixed(
          2
        )}px, 0) rotate(${rot.toFixed(2)}deg)`;
      }

      // Idle bob never settles, so keep animating while the band is on screen.
      if (moving || onScreen) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    // Only animate while the band is actually visible.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) {
          readScroll();
          start();
        }
      },
      { rootMargin: "120px 0px" }
    );
    io.observe(band);

    const onScroll = () => {
      readScroll();
      if (onScreen) start();
    };
    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      if (onScreen) start();
    };
    const onLeave = () => {
      pointer = null;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    band.addEventListener("pointermove", onMove, { passive: true });
    band.addEventListener("pointerleave", onLeave);

    readScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      band.removeEventListener("pointermove", onMove);
      band.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="q-swarm-band" ref={bandRef}>
      <div className="q-swarm-layer" ref={layerRef} aria-hidden="true">
        {items.map((it, i) => (
          <div
            key={`${it.src}-${i}`}
            data-swarm-item=""
            data-depth={it.depth}
            className="q-swarm-item"
            style={{
              left: `${it.x}%`,
              top: `${it.y}%`,
              width: it.size,
              // Depth drives scale, haze and stacking so the band reads 3D.
              opacity: 0.5 + it.depth * 0.5,
              filter: `blur(${((1 - it.depth) * 1.7).toFixed(2)}px)`,
              zIndex: Math.round(it.depth * 10),
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={it.src}
              alt=""
              loading="lazy"
              style={it.flip ? { transform: "scaleX(-1)" } : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
