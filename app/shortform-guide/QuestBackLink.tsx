"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useQuestContext } from "./useQuestContext";

/* A creator who came here from a quest brief gets a way back to it.
   Anyone else sees the fallback, or nothing. */
export default function QuestBackLink({
  className,
  fallback = null,
}: {
  className?: string;
  fallback?: ReactNode;
}) {
  const quest = useQuestContext();
  if (!quest) return <>{fallback}</>;
  return (
    <Link href={quest.href} className={className}>
      Back to the {quest.title} brief
    </Link>
  );
}
