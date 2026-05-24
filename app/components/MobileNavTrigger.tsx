"use client";

import { useState, lazy, Suspense } from "react";
import type { MobileNavQuest } from "./MobileNav";

// Lazy-load the drawer panel — its JS only ships once the user clicks the burger.
const MobileNavPanel = lazy(() => import("./MobileNavPanel"));

type Props = {
  primary: { href: string; label: string }[];
  activeQuests: MobileNavQuest[];
  pastQuests: MobileNavQuest[];
};

/**
 * Just the burger button. Renders zero drawer JS until clicked.
 * On click, the drawer panel module is fetched on-demand.
 */
export default function MobileNavTrigger({ primary, activeQuests, pastQuests }: Props) {
  const [open, setOpen] = useState(false);

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
        <Suspense fallback={null}>
          <MobileNavPanel
            primary={primary}
            activeQuests={activeQuests}
            pastQuests={pastQuests}
            onClose={() => setOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
}
