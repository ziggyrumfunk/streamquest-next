"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "li";
};

/**
 * Fades and slides children up when scrolled into view.
 *
 * IMPORTANT: starts VISIBLE so SSR/no-JS users see content immediately.
 * On mount, if the element is below the viewport, we briefly hide it
 * then trigger the fade-up animation as it scrolls in. Above-the-fold
 * content never flashes hidden, which fixes mobile FCP.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  // Default to visible so the very first paint shows real content.
  const [visible, setVisible] = useState(true);
  // Tracks whether we've decided to animate (only set client-side
  // after mount once we've measured the element's position).
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // If already on screen at mount time, just stay visible.
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.top < vh * 0.92) return; // already visible / above the fold

    // Otherwise, hide and animate in when scrolled to.
    setShouldAnimate(true);
    setVisible(false);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const TagAny = Tag as unknown as ElementType;
  const transition = shouldAnimate
    ? `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    : undefined;

  return (
    <TagAny
      ref={ref}
      className={className}
      style={
        shouldAnimate
          ? {
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition,
              willChange: "opacity, transform",
            }
          : undefined
      }
    >
      {children}
    </TagAny>
  );
}
