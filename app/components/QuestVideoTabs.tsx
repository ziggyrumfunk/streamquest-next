"use client";

import { useState } from "react";

type Props = {
  trailer?: string;
  brief?: string;
  briefComingSoon?: boolean;
  briefVideo?: string;
  briefPoster?: string;
  briefPortrait?: boolean;
};

type Tab = {
  id: string;
  label: string;
  youtube?: string;
  /** Self-hosted file, used instead of a YouTube embed. */
  file?: string;
  poster?: string;
  portrait?: boolean;
  placeholder?: boolean;
};

/**
 * Tabbed video player used inside the active quest brief.
 * Renders only one player at a time so we don't autoplay two streams.
 * Tabs collapse to a single video if only one source is supplied.
 *
 * The Mission Brief tab resolves in priority order: a self-hosted
 * `briefVideo`, then a YouTube `brief` ID, then a "coming soon" card when
 * `briefComingSoon` is set.
 */
export default function QuestVideoTabs({
  trailer,
  brief,
  briefComingSoon,
  briefVideo,
  briefPoster,
  briefPortrait,
}: Props) {
  const tabs: Tab[] = [
    trailer ? { id: "trailer", label: "Official Trailer", youtube: trailer } : null,
    briefVideo
      ? {
          id: "brief",
          label: "Mission Brief Video",
          file: briefVideo,
          poster: briefPoster,
          portrait: briefPortrait,
        }
      : brief
      ? { id: "brief", label: "Mission Brief Video", youtube: brief }
      : briefComingSoon
      ? { id: "brief", label: "Mission Brief Video", placeholder: true }
      : null,
  ].filter(Boolean) as Tab[];

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
              {t.placeholder && <span className="q-video-soon-pill">Soon</span>}
            </button>
          ))}
        </div>
      )}

      <div
        className={`q-video-stage${current.portrait ? " is-portrait" : ""}`}
        key={current.id}
      >
        {current.file ? (
          <video
            className="q-video-file"
            controls
            playsInline
            preload="metadata"
            poster={current.poster}
          >
            <source src={current.file} type="video/mp4" />
          </video>
        ) : current.placeholder ? (
          <div className="q-video-soon">
            <div className="q-video-soon-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <path d="m10 9 5 3-5 3z" fill="currentColor" />
              </svg>
            </div>
            <div className="q-video-soon-body">
              <span className="q-video-soon-eyebrow">Mission Brief Video</span>
              <h3>Coming soon.</h3>
              <p>
                The full mission brief video drops shortly. In the meantime,
                watch the trailer and read the brief below for everything you
                need to apply and stream.
              </p>
            </div>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${current.youtube}?rel=0&modestbranding=1`}
            title={current.label}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
