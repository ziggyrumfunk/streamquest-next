"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { MobileNavQuest } from "./MobileNav";

type Props = {
  primary: { href: string; label: string }[];
  activeQuests: MobileNavQuest[];
  pastQuests: MobileNavQuest[];
  onClose: () => void;
};

/**
 * The actual slide-in drawer. Code-split via React.lazy so its JS
 * never ships on initial page load — only fetched when the user
 * taps the burger.
 */
export default function MobileNavPanel({
  primary,
  activeQuests,
  pastQuests,
  onClose,
}: Props) {
  // Lock body scroll while open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Close on escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="mnav-overlay" role="dialog" aria-modal="true" aria-label="Mobile menu">
      <button
        type="button"
        aria-label="Close menu"
        className="mnav-scrim"
        onClick={onClose}
      />
      <div className="mnav-panel">
        <div className="mnav-head">
          <span className="mnav-eyebrow">Menu</span>
          <button
            type="button"
            onClick={onClose}
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
                <Link href={it.href} className="mnav-link" onClick={onClose}>
                  {it.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/faq" className="mnav-link" onClick={onClose}>
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/news" className="mnav-link" onClick={onClose}>
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
                  <Link href={q.href} className="mnav-quest" onClick={onClose}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={q.cover} alt={q.title} loading="lazy" />
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
                  <Link href={q.href} className="mnav-quest" onClick={onClose}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={q.cover} alt={q.title} loading="lazy" />
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
          onClick={onClose}
        >
          Creator Dashboard
        </a>
      </div>
    </div>
  );
}
