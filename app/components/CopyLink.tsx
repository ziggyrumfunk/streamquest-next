"use client";

import { useState } from "react";

type Props = {
  url: string;
  chipLabel?: string;
  note?: string;
};

/**
 * Tracked-link block with a copy-to-clipboard button.
 * Used on the active quest brief for the wishlist UTM link.
 * Falls back to execCommand on browsers without navigator.clipboard.
 */
export default function CopyLink({ url, chipLabel = "Tracking active", note }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.cssText = "position:absolute;left:-9999px;top:-9999px;";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* swallow; user can still click through */
    }
  };

  return (
    <div className="q-tracked">
      <div className="q-tracked-head">
        <div>
          <div className="q-tracked-title">Tracked wishlist link</div>
          {note && <p className="q-tracked-note">{note}</p>}
        </div>
        <span className="q-tracked-chip">
          <span className="q-tracked-chip-dot" aria-hidden="true" />
          {chipLabel}
        </span>
      </div>
      <div className="q-tracked-row">
        <a
          className="q-tracked-url"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            // let normal click open Steam; copy on a separate button
          }}
        >
          {url}
        </a>
        <button type="button" className="q-tracked-copy" onClick={copy}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="q-tracked-tip">
        Tip: mention wishlists once early and once before you wrap. Keep it natural.
      </p>
    </div>
  );
}
