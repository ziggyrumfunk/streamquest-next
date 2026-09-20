"use client";

import { useEffect, useState } from "react";

/* Slim apply bar for the brief. Slides in once the hero has scrolled
   out of view, and steps aside again when the closing call to action or
   the site footer is on screen, so the same button is never shown twice
   and the footer is never covered. `note` carries the live spots count
   when one is set in /admin. */
export default function ApplyBar({ href, note }: { href: string; note?: string | null }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".lq-hero");
    const final = document.querySelector(".lq-final-wrap");
    const footer = document.querySelector("footer");
    if (!hero || !final || !("IntersectionObserver" in window)) return;

    const visible = new Map<Element, boolean>([[hero, true]]);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) visible.set(e.target, e.isIntersecting);
      const hidden = visible.get(hero) || visible.get(final) || (footer ? visible.get(footer) : false);
      setShow(!hidden);
    });
    io.observe(hero);
    io.observe(final);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`lq-applybar${show ? " is-on" : ""}`} aria-hidden={!show}>
      <div className="lq-applybar-inner">
        <div className="lq-applybar-text">
          <strong>Ludeo short-form mission</strong>
          <span>
            €25 to €100 guaranteed, up to €250 with performance
            {note ? ` · ${note}` : ""}
          </span>
        </div>
        <a href={href} className="btn btn-primary" tabIndex={show ? 0 : -1}>
          Apply for the quest
        </a>
      </div>
    </div>
  );
}
