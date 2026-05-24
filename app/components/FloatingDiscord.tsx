"use client";

import { useEffect, useState } from "react";

const DISCORD_URL = "https://discord.gg/NhqfucYDXD";
const STORAGE_KEY = "sq_discord_dismissed";

/**
 * Floating Questy mascot + "Join Discord" pill in the bottom-right.
 * Dismissible — remembers in localStorage so it does not nag once closed.
 * Mount only on pages where it actually helps (home, FAQ, streamers).
 */
export default function FloatingDiscord() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Avoid hydration flash: show only after we've checked localStorage.
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const dismiss = () => {
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <aside className="floating-discord" role="complementary" aria-label="Join StreamQuest Discord">
      <button
        type="button"
        className="floating-discord-close"
        onClick={dismiss}
        aria-label="Dismiss Discord prompt"
      >
        ×
      </button>

      <a
        href={DISCORD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-discord-cta"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="floating-discord-mascot"
          src="/firebase-public/Questy New Folder/Questy Regular Size (4).webp"
          alt=""
          aria-hidden="true"
        />
        <span className="floating-discord-body">
          <span className="floating-discord-eyebrow">Join the community</span>
          <span className="floating-discord-title">Hop into our Discord</span>
        </span>
        <span className="floating-discord-go" aria-hidden="true">→</span>
      </a>
    </aside>
  );
}
