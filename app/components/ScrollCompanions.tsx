"use client";

import { useEffect, useRef } from "react";
import type { QuestCompanion } from "@/data/quests";

/* ============================================================
   Characters that keep the reader company down a brief.

   A pair sits in the bottom-right corner: one standing on the
   bottom edge, one floating beside it. They slide in once the
   hero has scrolled away and step aside before the footer. While
   you scroll they react to your speed (the floater lifts and
   leans, the stander sways) and settle again when you stop.

   They never take clicks, and they fade almost out of the way when
   the pointer comes near, so nothing underneath is ever blocked.
   Reduced motion: they still appear, but hold still.
   ============================================================ */

export default function ScrollCompanions({ items }: { items: QuestCompanion[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;

    // In view only between the hero and the footer.
    const hero = document.querySelector(".q-hero");
    const footer = document.querySelector("footer");
    let heroOn = true;
    let footerOn = false;
    const show = () => root.classList.toggle("is-on", !heroOn && !footerOn);
    // The hero counts as gone once its last third has left the screen.
    const heroIo = new IntersectionObserver(
      ([e]) => {
        heroOn = e.isIntersecting;
        show();
      },
      { rootMargin: "0px 0px -35% 0px" }
    );
    // The footer sends them off as soon as it peeks in at the bottom.
    const footerIo = new IntersectionObserver(([e]) => {
      footerOn = e.isIntersecting;
      show();
    });
    if (hero) heroIo.observe(hero);
    else heroOn = false;
    if (footer) footerIo.observe(footer);
    show();

    // Step aside when the pointer comes close.
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const near =
        e.clientX > r.left - 60 && e.clientX < r.right + 60 && e.clientY > r.top - 60 && e.clientY < r.bottom + 60;
      root.classList.toggle("is-shy", near);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let lastY = window.scrollY;
    let speed = 0;
    let lean = 0;

    // Eases the scroll speed into a lean and a lift, then stops once settled.
    const tick = () => {
      const y = window.scrollY;
      speed += (y - lastY - speed) * 0.2;
      lastY = y;
      lean += (Math.max(-14, Math.min(14, speed * 0.6)) - lean) * 0.12;
      root.style.setProperty("--lean", lean.toFixed(2));
      if (Math.abs(lean) > 0.02 || Math.abs(speed) > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        root.style.setProperty("--lean", "0");
        raf = 0;
      }
    };
    const onScroll = () => {
      if (!raf) {
        lastY = window.scrollY;
        raf = requestAnimationFrame(tick);
      }
    };
    if (!reduced) window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      heroIo.disconnect();
      footerIo.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="q-companions" aria-hidden="true">
      {items.map((it) => (
        <div key={it.src} className={`q-companion is-${it.kind}${it.glow ? " has-glow" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={it.src} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  );
}
