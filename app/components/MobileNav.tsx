"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export type MobileNavQuest = {
  href: string;
  title: string;
  studio: string;
  cover: string;
};

type Props = {
  primary: { href: string; label: string }[];
  activeQuests: MobileNavQuest[];
  pastQuests: MobileNavQuest[];
};

export default function MobileNav({ primary, activeQuests, pastQuests }: Props) {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="mnav-burger"
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="mnav-overlay" role="dialog" aria-modal="true" aria-label="Mobile menu">
          <button
            type="button"
            aria-label="Close menu"
            className="mnav-scrim"
            onClick={() => setOpen(false)}
          />

          <div className="mnav-panel">
            <div className="mnav-head">
              <span className="mnav-eyebrow">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="mnav-close"
              >
                X
              </button>
            </div>

            <nav aria-label="Mobile primary">
              <ul className="mnav-list">
                {primary.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="mnav-link" onClick={() => setOpen(false)}>
                      {it.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/faq" className="mnav-link" onClick={() => setOpen(false)}>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="mnav-link" onClick={() => setOpen(false)}>
                    News
                  </Link>
                </li>
              </ul>
            </nav>

            {activeQuests.length > 0 && (
              <section className="mnav-section">
                <div className="mnav-section-head">
                  <span className="mnav-section-eyebrow mnav-section-eyebrow--active">
                    <span className="mnav-pulse" aria-hidden="true" />
                    Active quests
                  </span>
                </div>
                <ul className="mnav-quest-list">
                  {activeQuests.map((q) => (
                    <li key={q.href}>
                      <Link href={q.href} className="mnav-quest" onClick={() => setOpen(false)}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={q.cover} alt="" loading="lazy" />
                        <span className="mnav-quest-meta">
                          <span className="mnav-quest-title">{q.title}</span>
                          <span className="mnav-quest-studio">{q.studio}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {pastQuests.length > 0 && (
              <section className="mnav-section">
                <div className="mnav-section-head">
                  <span className="mnav-section-eyebrow">Past quests</span>
                </div>
                <ul className="mnav-quest-list">
                  {pastQuests.slice(0, 8).map((q) => (
                    <li key={q.href}>
                      <Link href={q.href} className="mnav-quest" onClick={() => setOpen(false)}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={q.cover} alt="" loading="lazy" />
                        <span className="mnav-quest-meta">
                          <span className="mnav-quest-title">{q.title}</span>
                          <span className="mnav-quest-studio">{q.studio}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <a
              href="https://app.streamquest.io"
              rel="noopener"
              className="mnav-cta"
              onClick={() => setOpen(false)}
            >
              Creator Dashboard
            </a>
          </div>
        </div>
      )}
    </>
  );
}
