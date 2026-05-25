"use client";

/**
 * Floating right-side jump nav for /GHmarketing.
 * - Smooth scrolls to section anchors
 * - Highlights the section currently in view via IntersectionObserver
 * - Stays out of the way: small dots on desktop, collapses on narrow screens
 */

import { useEffect, useState, type MouseEvent } from "react";

const SECTIONS: ReadonlyArray<{ id: string; label: string }> = [
  { id: "objective",   label: "Objective" },
  { id: "strategy",    label: "Strategy" },
  { id: "pr",          label: "PR scope" },
  { id: "learnings",   label: "Learnings" },
  { id: "package-1",   label: "Package 1" },
  { id: "package-2",   label: "Package 2" },
  { id: "recommended", label: "Recommended" },
  { id: "timeline",    label: "Timeline" },
  { id: "trailer",     label: "Trailer" },
  { id: "pricing",     label: "Pricing" },
  { id: "routes",      label: "Three routes" },
  { id: "final",       label: "Final" },
];

export default function SidePanelNav() {
  const [active, setActive] = useState<string>("objective");

  useEffect(() => {
    const headerOffset = 120;
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is currently intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      {
        rootMargin: `-${headerOffset}px 0px -55% 0px`,
        threshold: 0,
      }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const jump = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActive(id);
  };

  return (
    <nav className="ghm-sidenav" aria-label="Jump to section">
      <ul>
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id} className={isActive ? "is-active" : ""}>
              <a href={`#${id}`} onClick={(e) => jump(e, id)}>
                <span className="ghm-sidenav-dot" aria-hidden="true" />
                <span className="ghm-sidenav-label">{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
