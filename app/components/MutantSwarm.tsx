"use client";

import { useEffect, useRef } from "react";
import type { QuestSwarmItem } from "@/data/quests";

/* ============================================================
   MutantSwarm — ambient character layer for the whole brief.

   Characters drift down the page behind the content rather than
   sitting in one block, so the art dresses the entire brief. The
   layer is pointer-events:none and sits at z-index 0, but the
   pointer listener is on `window`, so the horde still scatters as
   your cursor passes over them even though they are behind the text.

   Three motions combine into one transform per frame:
     1. Parallax  — drift keyed to how far the character is from the
                    viewport centre, scaled by depth.
     2. Repulsion — flee the pointer, falling off over REPEL_RADIUS.
     3. Idle bob  — slow per-character float so nothing sits frozen.

   Screen positions are derived from cached page offsets rather than
   getBoundingClientRect() each frame: it avoids per-frame layout
   reads and stops the transform feeding back into its own input.
   ============================================================ */

type Props = { items: QuestSwarmItem[] };

const REPEL_RADIUS = 300;
const REPEL_STRENGTH = 170;
const EASE = 0.12;
/** Parallax travel as a fraction of the distance from viewport centre. */
const PARALLAX = 0.075;

type Node = {
  el: HTMLElement;
  depth: number;
  /** cached page-space geometry, refreshed on resize */
  baseX: number;
  baseY: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
  phase: number;
  amp: number;
};

export default function MutantSwarm({ items }: Props) {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(
      layer.querySelectorAll<HTMLElement>("[data-swarm-item]")
    );
    if (!els.length) return;

    const nodes: Node[] = els.map((el, i) => ({
      el,
      depth: Number(el.dataset.depth ?? 0.5),
      baseX: 0,
      baseY: 0,
      w: 0,
      h: 0,
      cx: 0,
      cy: 0,
      phase: (i * 2.399) % (Math.PI * 2),
      amp: 3 + Number(el.dataset.depth ?? 0.5) * 7,
    }));

    /** Cache page-space geometry with transforms momentarily cleared. */
    const measure = () => {
      for (const n of nodes) {
        const prev = n.el.style.transform;
        n.el.style.transform = "none";
        const r = n.el.getBoundingClientRect();
        n.baseX = r.left + window.scrollX;
        n.baseY = r.top + window.scrollY;
        n.w = r.width;
        n.h = r.height;
        n.el.style.transform = prev;
      }
    };

    let pointer: { x: number; y: number } | null = null;
    let raf = 0;
    let running = false;

    const frame = (t: number) => {
      const time = t / 1000;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const viewCentre = scrollY + vh / 2;
      let moving = false;

      for (const n of nodes) {
        const centreY = n.baseY + n.h / 2;
        // Only animate what is anywhere near the viewport.
        if (Math.abs(centreY - viewCentre) > vh * 1.4) continue;

        const parallax = -(centreY - viewCentre) * PARALLAX * n.depth;
        const bob = Math.sin(time * 0.6 + n.phase) * n.amp;

        let px = 0;
        let py = 0;
        if (pointer) {
          // Derive screen position from cached geometry + current offset.
          const sx = n.baseX + n.cx + n.w / 2;
          const sy = n.baseY - scrollY + n.cy + n.h / 2;
          const dx = sx - pointer.x;
          const dy = sy - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPEL_RADIUS && dist > 0.001) {
            const force = (1 - dist / REPEL_RADIUS) ** 2 * REPEL_STRENGTH;
            const mass = 0.6 + n.depth * 0.8;
            px = ((dx / dist) * force) / mass;
            py = ((dy / dist) * force) / mass;
          }
        }

        const tx = px;
        const ty = py + parallax + bob;

        n.cx += (tx - n.cx) * EASE;
        n.cy += (ty - n.cy) * EASE;

        if (Math.abs(tx - n.cx) > 0.05 || Math.abs(ty - n.cy) > 0.05) moving = true;

        const rot = (n.cx / 13) * (0.5 + n.depth);
        n.el.style.transform = `translate3d(${n.cx.toFixed(2)}px, ${n.cy.toFixed(
          2
        )}px, 0) rotate(${rot.toFixed(2)}deg)`;
      }

      // The idle bob never settles, so keep going while the tab is visible.
      if (moving || !document.hidden) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      start();
    };
    const onResize = () => {
      measure();
      start();
    };
    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        running = false;
      } else {
        start();
      }
    };

    measure();
    start();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="q-swarm-ambient" ref={layerRef} aria-hidden="true">
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
            // Depth drives haze so the layer reads as distance. Kept well
            // under the content so body copy stays legible on top of it.
            opacity: 0.34 + it.depth * 0.34,
            filter: `blur(${((1 - it.depth) * 1.8).toFixed(2)}px)`,
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
  );
}
