"use client";

import { useMemo, useState } from "react";
import { rows, floorMultiple, type RfRow } from "./data";

type SortMode = "viewerHours" | "creator" | "hours" | "peak" | "avg" | "floor";

/** Short platform label for a submitted post URL. */
function platform(url: string): string {
  if (/x\.com|twitter\.com/.test(url)) return "X";
  if (/tiktok\.com/.test(url)) return "TikTok";
  if (/instagram\.com/.test(url)) return "Instagram";
  if (/youtu\.?be/.test(url)) return "YouTube";
  if (/reddit\.com/.test(url)) return "Reddit";
  return "Post";
}

function Flag({ on }: { on: boolean }) {
  return on ? <span className="rf-yes">✓</span> : <span className="rf-no">—</span>;
}

export default function CreatorTable() {
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [langFilter, setLangFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("viewerHours");

  const languages = useMemo(
    () => Array.from(new Set(rows.map((r) => r.language).filter(Boolean))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = rows.filter((r: RfRow) => {
      const hay = `${r.creator} ${r.handle ?? ""} ${r.tier} ${r.language} ${r.platform}`.toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (tierFilter && r.tier !== tierFilter) return false;
      if (langFilter && r.language !== langFilter) return false;
      if (platformFilter && r.platform !== platformFilter) return false;
      return true;
    });
    const sorted = [...list];
    if (sortMode === "viewerHours") sorted.sort((a, b) => (b.viewerHours ?? -1) - (a.viewerHours ?? -1));
    else if (sortMode === "hours") sorted.sort((a, b) => b.hoursNum - a.hoursNum);
    else if (sortMode === "peak") sorted.sort((a, b) => b.peakViewers - a.peakViewers);
    else if (sortMode === "avg") sorted.sort((a, b) => b.avgViewers - a.avgViewers);
    else if (sortMode === "floor") sorted.sort((a, b) => floorMultiple(b) - floorMultiple(a));
    else sorted.sort((a, b) => a.creator.localeCompare(b.creator));
    return sorted;
  }, [query, tierFilter, langFilter, platformFilter, sortMode]);

  return (
    <>
      <div className="rf-filters">
        <input
          type="text"
          placeholder="Search creator, language..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search creators"
        />
        <select value={tierFilter} onChange={(e) => setTierFilter(e.target.value)} aria-label="Tier">
          <option value="">All tiers</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
        </select>
        <select value={langFilter} onChange={(e) => setLangFilter(e.target.value)} aria-label="Language">
          <option value="">All languages</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)} aria-label="Platform">
          <option value="">Twitch and Kick</option>
          <option value="Twitch">Twitch</option>
          <option value="Kick">Kick</option>
        </select>
        <select value={sortMode} onChange={(e) => setSortMode(e.target.value as SortMode)} aria-label="Sort">
          <option value="viewerHours">Sort: Viewer-hours</option>
          <option value="creator">Sort: Creator A-Z</option>
          <option value="hours">Sort: Gameplay time</option>
          <option value="peak">Sort: Peak viewers</option>
          <option value="avg">Sort: Average viewers</option>
          <option value="floor">Sort: Against tier floor</option>
        </select>
      </div>

      <div className="rf-table-wrap">
        <table className="rf-table">
          <thead>
            <tr>
              <th>Creator</th>
              <th>Tier</th>
              <th>Platform</th>
              <th>Language</th>
              <th>Avg</th>
              <th>Peak</th>
              <th>Gameplay</th>
              <th>Viewer-hrs</th>
              <th>Vs floor</th>
              <th>Main quest</th>
              <th>Social posts</th>
              <th>Wishlist</th>
              <th>Co-op</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={`${r.creator}-${i}`}>
                <td>
                  <strong>{r.creator}</strong>
                  {r.handle && <span className="rf-handle">{r.handle}</span>}
                </td>
                <td>
                  <span className={`rf-pill is-${r.tier.toLowerCase()}`}>{r.tier}</span>
                </td>
                <td>{r.platform}</td>
                <td>{r.language}</td>
                <td>{r.avgViewers}</td>
                <td>{r.peakViewers}</td>
                <td>{r.hours}</td>
                <td>{r.viewerHours !== null ? r.viewerHours.toFixed(1) : <span className="rf-no">Excluded</span>}</td>
                <td>{floorMultiple(r).toFixed(2)}×</td>
                <td>
                  <span className="rf-links">
                    <a className="rf-tiny-link" href={r.vod} target="_blank" rel="noopener noreferrer">
                      {r.vodLabel ?? "VOD"}
                    </a>
                    {r.tracker !== r.vod && (
                      <a className="rf-tiny-link" href={r.tracker} target="_blank" rel="noopener noreferrer">
                        Tracker
                      </a>
                    )}
                  </span>
                </td>
                <td>
                  {r.social.length === 0 ? (
                    <span className="rf-no">—</span>
                  ) : (
                    <span className="rf-links">
                      {r.social.map((u) => (
                        <a key={u} className="rf-tiny-link" href={u} target="_blank" rel="noopener noreferrer">
                          {platform(u)}
                        </a>
                      ))}
                    </span>
                  )}
                </td>
                <td>
                  <Flag on={r.wishlist} />
                </td>
                <td>
                  <Flag on={r.coop} />
                </td>
                <td className="rf-note-cell">{r.note ?? <span className="rf-no">—</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rf-summary">
        Showing <strong>{filtered.length}</strong> of <strong>{rows.length}</strong> completed
        activations.
      </div>
    </>
  );
}
