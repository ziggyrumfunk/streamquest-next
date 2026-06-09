"use client";

import { useMemo, useState } from "react";
import { rows, socialPlatformLabel, type HouseFlipperRow } from "./data";

type SortMode = "creator" | "viewerHours" | "streamHours" | "peak" | "followers" | "avgCcv";

export default function CreatorTable() {
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [langFilter, setLangFilter] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("viewerHours");

  const languages = useMemo(
    () => Array.from(new Set(rows.map((r) => r.language))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = rows.filter((r) => {
      const hay = `${r.creator} ${r.language} ${r.tier}`.toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (tierFilter && r.tier !== tierFilter) return false;
      if (langFilter && r.language !== langFilter) return false;
      return true;
    });
    const sorted = [...list];
    if (sortMode === "viewerHours") sorted.sort((a, b) => b.viewerHours - a.viewerHours);
    else if (sortMode === "streamHours") sorted.sort((a, b) => b.streamHours - a.streamHours);
    else if (sortMode === "peak") sorted.sort((a, b) => b.peakViewers - a.peakViewers);
    else if (sortMode === "followers") sorted.sort((a, b) => b.followers - a.followers);
    else if (sortMode === "avgCcv") sorted.sort((a, b) => b.avgCcv - a.avgCcv);
    else sorted.sort((a, b) => a.creator.localeCompare(b.creator));
    return sorted;
  }, [query, tierFilter, langFilter, sortMode]);

  return (
    <>
      <div className="hf-filters">
        <input
          type="text"
          placeholder="Search creator or language..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={tierFilter} onChange={(e) => setTierFilter(e.target.value)}>
          <option value="">All tiers</option>
          <option value="Silver">Silver</option>
          <option value="Bronze">Bronze</option>
        </select>
        <select value={langFilter} onChange={(e) => setLangFilter(e.target.value)}>
          <option value="">All languages</option>
          {languages.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <select value={sortMode} onChange={(e) => setSortMode(e.target.value as SortMode)}>
          <option value="viewerHours">Sort: Viewer-hours</option>
          <option value="streamHours">Sort: Stream time</option>
          <option value="avgCcv">Sort: Avg CCV</option>
          <option value="peak">Sort: Peak viewers</option>
          <option value="followers">Sort: Followers</option>
          <option value="creator">Sort: Creator A-Z</option>
        </select>
      </div>

      <div className="hf-table-wrap">
        <table className="hf-table">
          <thead>
            <tr>
              <th>Creator</th>
              <th>Language</th>
              <th>Tier</th>
              <th>Followers</th>
              <th>Avg CCV</th>
              <th>Peak</th>
              <th>Stream time</th>
              <th>Viewer-hrs</th>
              <th>VOD</th>
              <th>Stats</th>
              <th>Social</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => {
              const tierClass = r.tier === "Silver" ? "is-silver" : "is-bronze";
              return (
                <tr key={`${r.creator}-${i}`}>
                  <td><strong>{r.creator}</strong></td>
                  <td>{r.language}</td>
                  <td><span className={`hf-pill ${tierClass}`}>{r.tier}</span></td>
                  <td>{r.followers.toLocaleString()}</td>
                  <td>{r.avgCcv}</td>
                  <td>{r.peakViewers}</td>
                  <td>{r.streamTime}</td>
                  <td>{r.viewerHours.toFixed(1)}</td>
                  <td>
                    {r.vodUrl ? (
                      <a
                        className="hf-tiny-link"
                        href={r.vodUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        VOD
                      </a>
                    ) : (
                      <span className="hf-no">—</span>
                    )}
                  </td>
                  <td>
                    {r.twitchtrackerUrl ? (
                      <a
                        className="hf-tiny-link"
                        href={r.twitchtrackerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        stats
                      </a>
                    ) : (
                      <span className="hf-no">—</span>
                    )}
                  </td>
                  <td>
                    {r.socialUrl ? (
                      <a
                        className={`hf-tiny-link is-${r.socialPlatform}`}
                        href={r.socialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={socialPlatformLabel(r.socialPlatform)}
                      >
                        {r.socialPlatform === "x" && "X"}
                        {r.socialPlatform === "instagram" && "IG"}
                        {r.socialPlatform === "youtube" && "YT"}
                      </a>
                    ) : (
                      <span className="hf-no">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="hf-summary">
        Showing <strong>{filtered.length}</strong> of <strong>{rows.length}</strong> verified activations.
      </div>
    </>
  );
}
