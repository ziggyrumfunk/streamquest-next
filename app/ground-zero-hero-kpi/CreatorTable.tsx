"use client";

import { useMemo, useState } from "react";
import { rows, type GzhRow } from "./data";

type SortMode = "viewerHours" | "creator" | "hours" | "peak" | "avg" | "followers";

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
  return on ? <span className="gzh-yes">✓</span> : <span className="gzh-no">—</span>;
}

export default function CreatorTable() {
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [langFilter, setLangFilter] = useState("");
  const [launchFilter, setLaunchFilter] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("viewerHours");

  const languages = useMemo(
    () => Array.from(new Set(rows.map((r) => r.language).filter(Boolean))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = rows.filter((r: GzhRow) => {
      const hay = `${r.creator} ${r.tier} ${r.language}`.toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (tierFilter && r.tier !== tierFilter) return false;
      if (langFilter && r.language !== langFilter) return false;
      if (launchFilter === "yes" && !r.launchDay) return false;
      if (launchFilter === "no" && r.launchDay) return false;
      return true;
    });
    const sorted = [...list];
    if (sortMode === "viewerHours") sorted.sort((a, b) => b.viewerHours - a.viewerHours);
    else if (sortMode === "hours") sorted.sort((a, b) => b.hoursNum - a.hoursNum);
    else if (sortMode === "peak") sorted.sort((a, b) => b.peakViewers - a.peakViewers);
    else if (sortMode === "avg") sorted.sort((a, b) => b.avgViewers - a.avgViewers);
    else if (sortMode === "followers") sorted.sort((a, b) => (b.followers ?? 0) - (a.followers ?? 0));
    else sorted.sort((a, b) => a.creator.localeCompare(b.creator));
    return sorted;
  }, [query, tierFilter, langFilter, launchFilter, sortMode]);

  return (
    <>
      <div className="gzh-filters">
        <input
          type="text"
          placeholder="Search creator, language..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={tierFilter} onChange={(e) => setTierFilter(e.target.value)}>
          <option value="">All tiers</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Bronze">Bronze</option>
        </select>
        <select value={langFilter} onChange={(e) => setLangFilter(e.target.value)}>
          <option value="">All languages</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <select value={launchFilter} onChange={(e) => setLaunchFilter(e.target.value)}>
          <option value="">Launch window: all</option>
          <option value="yes">Streamed in launch window</option>
          <option value="no">Streamed after launch window</option>
        </select>
        <select value={sortMode} onChange={(e) => setSortMode(e.target.value as SortMode)}>
          <option value="viewerHours">Sort: Viewer-hours</option>
          <option value="creator">Sort: Creator A-Z</option>
          <option value="hours">Sort: Hours streamed</option>
          <option value="peak">Sort: Peak viewers</option>
          <option value="avg">Sort: Average viewers</option>
          <option value="followers">Sort: Followers</option>
        </select>
      </div>

      <div className="gzh-table-wrap">
        <table className="gzh-table">
          <thead>
            <tr>
              <th>Creator</th>
              <th>Tier</th>
              <th>Followers</th>
              <th>Top %</th>
              <th>Lang rank</th>
              <th>Language</th>
              <th>Avg</th>
              <th>Peak</th>
              <th>Hours</th>
              <th>Viewer-hrs</th>
              <th>VOD</th>
              <th>Social posts</th>
              <th>Wishlist</th>
              <th>Launch</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={`${r.creator}-${i}`}>
                <td>
                  <strong>{r.creator}</strong>
                </td>
                <td>
                  <span className={`gzh-pill is-${r.tier.toLowerCase()}`}>{r.tier}</span>
                </td>
                <td>
                  {r.followers !== null ? r.followers.toLocaleString() : <span className="gzh-no">—</span>}
                </td>
                <td>{r.topPct !== null ? `${r.topPct}%` : <span className="gzh-no">—</span>}</td>
                <td>
                  {r.langRank !== null ? `#${r.langRank.toLocaleString()}` : <span className="gzh-no">—</span>}
                </td>
                <td>{r.language}</td>
                <td>{r.avgViewers}</td>
                <td>{r.peakViewers}</td>
                <td>{r.hours}</td>
                <td>{r.viewerHours.toFixed(1)}</td>
                <td>
                  <a className="gzh-tiny-link" href={r.vod} target="_blank" rel="noopener noreferrer">
                    VOD
                  </a>
                </td>
                <td>
                  {r.social.length === 0 ? (
                    <span className="gzh-no">—</span>
                  ) : (
                    <span className="gzh-links">
                      {r.social.map((u) => (
                        <a key={u} className="gzh-tiny-link" href={u} target="_blank" rel="noopener noreferrer">
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
                  <Flag on={r.launchDay} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="gzh-summary">
        Showing <strong>{filtered.length}</strong> of <strong>{rows.length}</strong> completed
        activations.
      </div>
    </>
  );
}
