"use client";

import { useMemo, useState } from "react";
import { rows, type ReplacedRow } from "./data";

type SortMode =
  | "creator"
  | "viewerHours"
  | "hours"
  | "avg"
  | "peak"
  | "followers"
  | "topPct";

/** A usable link: real URL and not one the source truncated with an ellipsis. */
function isUrl(v: string): boolean {
  return typeof v === "string" && v.startsWith("http") && !v.includes("...");
}

export default function CreatorTable() {
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [langFilter, setLangFilter] = useState("");
  const [questFilter, setQuestFilter] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("viewerHours");

  const languages = useMemo(
    () => Array.from(new Set(rows.map((r) => r.language).filter(Boolean))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = rows.filter((r) => {
      const hay = `${r.creator} ${r.tier} ${r.language}`.toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (tierFilter && r.tier !== tierFilter) return false;
      if (langFilter && r.language !== langFilter) return false;
      if (questFilter === "social" && !r.social) return false;
      if (questFilter === "growing" && !r.growing) return false;
      if (questFilter === "completionist" && !r.completionist) return false;
      return true;
    });
    const sorted = [...list];
    if (sortMode === "viewerHours") sorted.sort((a, b) => b.viewerHours - a.viewerHours);
    else if (sortMode === "hours") sorted.sort((a, b) => b.hoursNum - a.hoursNum);
    else if (sortMode === "avg") sorted.sort((a, b) => b.avgViewers - a.avgViewers);
    else if (sortMode === "peak") sorted.sort((a, b) => b.peakViewers - a.peakViewers);
    else if (sortMode === "followers") sorted.sort((a, b) => (b.followers ?? 0) - (a.followers ?? 0));
    else if (sortMode === "topPct") sorted.sort((a, b) => (a.topPct ?? 99) - (b.topPct ?? 99));
    else sorted.sort((a, b) => a.creator.localeCompare(b.creator));
    return sorted;
  }, [query, tierFilter, langFilter, questFilter, sortMode]);

  return (
    <>
      <div className="replaced-filters">
        <input
          type="text"
          placeholder="Search creator, language..."
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
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <select value={questFilter} onChange={(e) => setQuestFilter(e.target.value)}>
          <option value="">All quests</option>
          <option value="social">Has social post</option>
          <option value="growing">Growing Together</option>
          <option value="completionist">Completionist</option>
        </select>
        <select value={sortMode} onChange={(e) => setSortMode(e.target.value as SortMode)}>
          <option value="viewerHours">Sort: Viewer-hours</option>
          <option value="hours">Sort: Stream time</option>
          <option value="avg">Sort: Avg CCV</option>
          <option value="peak">Sort: Peak viewers</option>
          <option value="followers">Sort: Followers</option>
          <option value="topPct">Sort: Twitch Top %</option>
          <option value="creator">Sort: Creator A-Z</option>
        </select>
      </div>

      <div className="replaced-table-wrap">
        <table className="replaced-table">
          <thead>
            <tr>
              <th>Creator</th>
              <th>Tier</th>
              <th>Language</th>
              <th>Top %</th>
              <th>Followers</th>
              <th>All-time</th>
              <th>Avg</th>
              <th>Peak</th>
              <th>Hours</th>
              <th>Viewer-hrs</th>
              <th>Social</th>
              <th>Growing</th>
              <th>Comp</th>
              <th>VOD</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => {
              const tierClass = r.tier === "Silver" ? "is-silver" : "is-bronze";
              return (
                <tr key={`${r.creator}-${i}`}>
                  <td>
                    <strong>{r.creator}</strong>
                  </td>
                  <td>
                    <span className={`replaced-pill ${tierClass}`}>{r.tier}</span>
                  </td>
                  <td>{r.language || <span className="replaced-no">—</span>}</td>
                  <td>{r.topPct !== null ? `${r.topPct}%` : <span className="replaced-no">—</span>}</td>
                  <td>
                    {r.followers !== null ? (
                      r.followers.toLocaleString()
                    ) : (
                      <span className="replaced-no">—</span>
                    )}
                  </td>
                  <td>{r.allTimeAvg !== null ? r.allTimeAvg : <span className="replaced-no">—</span>}</td>
                  <td>{r.avgViewers}</td>
                  <td>{r.peakViewers}</td>
                  <td>{r.hours}</td>
                  <td>{r.viewerHours.toFixed(1)}</td>
                  <td>
                    {isUrl(r.social) ? (
                      <a className="replaced-tiny-link" href={r.social} target="_blank" rel="noopener noreferrer">
                        {r.socialDomain || "post"}
                      </a>
                    ) : r.social ? (
                      <span className="replaced-yes">✓</span>
                    ) : (
                      <span className="replaced-no">—</span>
                    )}
                  </td>
                  <td>
                    {r.growing ? <span className="replaced-yes">✓</span> : <span className="replaced-no">—</span>}
                  </td>
                  <td>
                    {r.completionist ? (
                      <span className="replaced-yes">✓</span>
                    ) : (
                      <span className="replaced-no">—</span>
                    )}
                  </td>
                  <td>
                    {isUrl(r.vod) ? (
                      <a className="replaced-tiny-link" href={r.vod} target="_blank" rel="noopener noreferrer">
                        VOD
                      </a>
                    ) : (
                      <span className="replaced-no">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="replaced-summary">
        Showing <strong>{filtered.length}</strong> of <strong>{rows.length}</strong> logged
        creators.
      </div>
    </>
  );
}
