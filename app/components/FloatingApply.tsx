"use client";

import { useEffect, useState } from "react";

type Accent = "lime" | "purple";

type Props = {
  /** Show widget after the user has scrolled this many pixels (defaults to ~82% of first viewport). */
  showAfter?: number;
  /** Hide widget when within this many pixels of the bottom of the page. */
  hideBeforeBottom?: number;
  /** Top line of the message. */
  line1?: string;
  /** Second line (small, fades on narrow screens). */
  line2?: string;
  /** Button text. */
  ctaText?: string;
  /** Button href. */
  ctaHref?: string;
  /** Button color class — "btn-primary" (lime) or "btn-twitch" (purple). */
  ctaClass?: string;
  /** Container glow/border accent color. */
  accent?: Accent;
  /** Optional override for the avatar/mascot image. */
  mascot?: string;
};

/**
 * Floating side "apply" pill. Default copy is creator-facing.
 * Pass custom props for other audiences (studios, brands, partners).
 */
export default function FloatingApply({
  showAfter,
  hideBeforeBottom = 700,
  line1 = "Ready to start a quest?",
  line2 = "Apply on Discord in under 2 minutes",
  ctaText = "Apply →",
  ctaHref = "https://discord.gg/NhqfucYDXD",
  ctaClass = "btn-primary",
  accent = "lime",
  mascot = "/firebase-public/Questy New Folder/Questy Small Size (1).webp",
}: Props = {}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const computeShowAfter = () => showAfter ?? Math.round(window.innerHeight * 0.82);

    const onScroll = () => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight;
      const vh = window.innerHeight;
      const distanceFromBottom = docH - (y + vh);
      setVisible(y > computeShowAfter() && distanceFromBottom > hideBeforeBottom);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [showAfter, hideBeforeBottom]);

  return (
    <div
      className={`floating-apply ${accent === "purple" ? "purple-accent" : ""} ${visible ? "visible" : ""}`}
      role="region"
      aria-label={ctaText}
      aria-hidden={!visible}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="floating-apply-mascot"
        src={mascot}
        alt=""
        aria-hidden="true"
      />
      <div className="floating-apply-text">
        <div className="floating-apply-line1">{line1}</div>
        {line2 && <div className="floating-apply-line2">{line2}</div>}
      </div>
      <a
        href={ctaHref}
        className={`btn ${ctaClass} floating-apply-cta`}
        rel="noopener"
        tabIndex={visible ? 0 : -1}
      >
        {ctaText}
      </a>
    </div>
  );
}
