"use client";

import { useMemo, useState } from "react";
import { rows, socialPlatformLabel, socialPlatformBadge, type GoodHeavensRow } from "./data";

type SortMode = "avgViewers" | "peak" | "streamHours" | "followers" | "ranking" | "creator";

export default function CreatorTable() {
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [langFilter, setLangFilter] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("avgViewers");

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
    if (sortMode === "avgViewers") sorted.sort((a, b) => b.avgViewers - a.avgViewers);
    else if (sortMode === "peak") sorted.sort((a, b) => b.peakViewers - a.peakViewers);
    else if (sortMode === "streamHours") sorted.sort((a, b) => b.streamHours - a.streamHours);
    else if (sortMode === "followers") sorted.sort((a, b) => b.followers - a.followers);
    else if (sortMode === "ranking") sorted.sort((a, b) => a.topPct - b.topPct);
    else sorted.sort((a, b) => a.creator.localeCompare(b.creator));
    return sorted;
  }, [query, tierFilter, langFilter, sortMode]);

  const fmtPct = (p: number) => `${(p * 100).toFixed(2)}%`;

  return (
    <>
      <div className="gh-filters">
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
          <option value="avgViewers">Sort: Avg viewers</option>
          <option value="peak">Sort: Peak viewers</option>
          <option value="streamHours">Sort: Stream time</option>
          <option value="followers">Sort: Followers</option>
          <option value="ranking">Sort: Twitch ranking</option>
          <option value="creator">Sort: Creator A-Z</option>
        </select>
      </div>

      <div className="gh-table-wrap">
        <table className="gh-table">
          <thead>
            <tr>
              <th>Creator</th>
              <th>Language</th>
              <th>Tier</th>
              <th>Followers</th>
              <th>Twitch top</th>
              <th>Avg</th>
              <th>Peak</th>
              <th>Stream time</th>
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
                  <td>
                    <strong>{r.creator}</strong>
                    {r.partner && <span className="gh-partner" title="Twitch Partner">Partner</span>}
                  </td>
                  <td>{r.language}</td>
                  <td><span className={`gh-pill ${tierClass}`}>{r.tier}</span></td>
                  <td>{r.followers.toLocaleString()}</td>
                  <td>{fmtPct(r.topPct)}</td>
                  <td>{r.avgViewers}</td>
                  <td>{r.peakViewers}</td>
                  <td>{r.streamTime}</td>
                  <td>
                    {r.vodUrl ? (
                      <a className="gh-tiny-link" href={r.vodUrl} target="_blank" rel="noopener noreferrer">
                        VOD
                      </a>
                    ) : (
                      <span className="gh-no">—</span>
                    )}
                  </td>
                  <td>
                    {r.twitchtrackerUrl ? (
                      <a className="gh-tiny-link" href={r.twitchtrackerUrl} target="_blank" rel="noopener noreferrer">
                        stats
                      </a>
                    ) : (
                      <span className="gh-no">—</span>
                    )}
                  </td>
                  <td>
                    {r.socialUrl ? (
                      <a
                        className={`gh-tiny-link is-${r.socialPlatform}`}
                        href={r.socialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={socialPlatformLabel(r.socialPlatform)}
                      >
                        {socialPlatformBadge(r.socialPlatform)}
                      </a>
                    ) : (
                      <span className="gh-no">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="gh-summary">
        Showing <strong>{filtered.length}</strong> of <strong>{rows.length}</strong> completed activations.
      </div>
    </>
  );
}
