"use client";

import type { ReactNode } from "react";
import { OPEN_EVENT } from "./TierCheckWidget";

/* A "Check your tier" button. Opens the floating tier checker in place when
   the page has one. It is a real link underneath, so without JavaScript, or
   on a page with no widget, it simply goes to the checker on the guide. */
export default function OpenTierCheck({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (!window.__sqTierWidget || e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        window.dispatchEvent(new CustomEvent(OPEN_EVENT));
      }}
    >
      {children}
    </a>
  );
}
