"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import TierChecker from "./TierChecker";

/* ============================================================
   Floating "Check your tier" widget.

   A Questy pill in the bottom-right corner, in the family of the
   floating Discord pill. It opens the tier checker in a panel on
   top of the page, so a creator can find out where they land
   without leaving the brief they are reading. On a phone the panel
   is a bottom sheet.

   The pill stays out of the way while any `hideWhenVisible` element
   is on screen (the hero, the footer, or the full-size checker on
   the guide). An open panel is never closed by scrolling.

   Any "Check your tier" button on the page can open it through
   <OpenTierCheck>, which fires the OPEN_EVENT below.

   Sits above a sticky bottom bar when the page sets --tcw-lift.
   ============================================================ */

export const OPEN_EVENT = "sq:tier-check:open";

declare global {
  interface Window {
    /** Set while a TierCheckWidget is mounted, so openers know a panel exists. */
    __sqTierWidget?: boolean;
  }
}

type Props = {
  questSlug?: string;
  fromUrl?: boolean;
  guideHref?: string;
  /** CSS selectors. While any of them is on screen the pill steps aside. */
  hideWhenVisible?: string[];
};

const QUESTY = "/firebase-public/Questy%20New%20Folder/Questy%20Regular%20Size%20(3).webp";

export default function TierCheckWidget({ questSlug, fromUrl, guideHref, hideWhenVisible = [] }: Props) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);
  const selectorKey = hideWhenVisible.join("|");

  const openPanel = useCallback(() => {
    returnFocusTo.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setOpen(false);
    // Back to whatever opened it; the pill if that element is gone.
    const target = returnFocusTo.current;
    requestAnimationFrame(() => (target && document.contains(target) ? target : pillRef.current)?.focus());
  }, []);

  // Let page buttons open the panel.
  useEffect(() => {
    window.__sqTierWidget = true;
    window.addEventListener(OPEN_EVENT, openPanel);
    return () => {
      window.__sqTierWidget = false;
      window.removeEventListener(OPEN_EVENT, openPanel);
    };
  }, [openPanel]);

  // Step aside while the hero, footer or full checker is on screen.
  useEffect(() => {
    const targets = selectorKey
      ? selectorKey.split("|").flatMap((s) => Array.from(document.querySelectorAll(s)))
      : [];
    if (targets.length === 0 || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const visible = new Map<Element, boolean>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) visible.set(e.target, e.isIntersecting);
      setShown(!Array.from(visible.values()).some(Boolean));
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [selectorKey]);

  // Focus the panel on open, Escape to close.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closePanel]);

  const pillOn = shown && !open;

  return (
    <div className={`tcw${open ? " is-open" : ""}`}>
      <button
        ref={pillRef}
        type="button"
        className={`tcw-pill${pillOn ? " is-on" : ""}`}
        aria-expanded={open}
        aria-controls="tcw-panel"
        tabIndex={pillOn ? 0 : -1}
        aria-hidden={!pillOn}
        onClick={openPanel}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="tcw-pill-questy" src={QUESTY} alt="" />
        <span className="tcw-pill-body">
          <span className="tcw-pill-eyebrow">Two numbers, ten seconds</span>
          <span className="tcw-pill-title">Check your tier</span>
        </span>
      </button>

      {open && (
        <>
          <div className="tcw-backdrop" onClick={closePanel} aria-hidden="true" />
          <div
            id="tcw-panel"
            ref={panelRef}
            className="tcw-panel"
            role="dialog"
            aria-label="Tier checker"
            tabIndex={-1}
          >
            <div className="tcw-head">
              <strong>Check your tier</strong>
              <button type="button" className="tcw-close" onClick={closePanel} aria-label="Close tier checker">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <TierChecker variant="compact" questSlug={questSlug} fromUrl={fromUrl} guideHref={guideHref} />
          </div>
        </>
      )}
    </div>
  );
}
