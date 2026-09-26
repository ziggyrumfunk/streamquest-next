"use client";

import { useState } from "react";

const PAGES = [
  { id: "portfolio", label: "Portfolio", url: "https://www.rumfunk.nl/gallery/2025-07-22-rumfunk-portfolio" },
  { id: "gallery", label: "All shoots", url: "https://www.rumfunk.nl/gallery" },
  { id: "clients", label: "Clients", url: "https://www.rumfunk.nl/clients" },
];

/**
 * rumfunk.nl, live inside a browser frame, as proof of Ziggy's shoots and
 * social media work. It opens on the portfolio shoot (a full-bleed photo
 * straight away) and never on the homepage, because the homepage leads with
 * Rumfunk's hospitality pricing.
 */
export default function RumfunkFrame() {
  const [active, setActive] = useState(PAGES[0]);

  return (
    <div className="abx-browser">
      <div className="abx-browser-bar">
        <span className="abx-browser-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <div className="abx-browser-tabs" role="tablist" aria-label="Rumfunk pages">
          {PAGES.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={p.id === active.id}
              className={`abx-browser-tab${p.id === active.id ? " is-active" : ""}`}
              onClick={() => setActive(p)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <span className="abx-browser-url">{active.url.replace("https://www.", "")}</span>
        <a className="abx-browser-open" href={active.url} target="_blank" rel="noopener noreferrer">
          Open <span aria-hidden="true">↗</span>
        </a>
      </div>
      <iframe
        key={active.id}
        className="abx-browser-view"
        src={active.url}
        title={`Rumfunk ${active.label}`}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-downloads"
      />
    </div>
  );
}
