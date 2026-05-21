"use client";

import { useState } from "react";

type Props = {
  trailer?: string;
  brief?: string;
};

/**
 * Tabbed YouTube player used inside the active quest brief.
 * Renders only one iframe at a time so we don't autoplay two streams.
 * Tabs collapse to a single video if only one ID is supplied.
 */
export default function QuestVideoTabs({ trailer, brief }: Props) {
  const tabs = [
    trailer ? { id: "trailer", label: "Official Trailer", youtube: trailer } : null,
    brief ? { id: "brief", label: "Mission Brief Video", youtube: brief } : null,
  ].filter(Boolean) as { id: string; label: string; youtube: string }[];

  const [active, setActive] = useState(tabs[0]?.id ?? "");

  if (tabs.length === 0) return null;

  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div className="q-video">
      {tabs.length > 1 && (
        <div className="q-video-tabs" role="tablist" aria-label="Video selection">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={t.id === active}
              className={`q-video-tab${t.id === active ? " is-active" : ""}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      <div className="q-video-stage" key={current.youtube}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${current.youtube}?rel=0&modestbranding=1`}
          title={current.label}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
