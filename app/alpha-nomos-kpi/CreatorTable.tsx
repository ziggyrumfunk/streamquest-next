"use client";

import { useMemo, useState } from "react";
import { rows, type NomosRow } from "./data";

type SortMode = "creator" | "viewerHours" | "hours" | "peak" | "followers";

function isUrl(v: string): boolean {
  return typeof v === "string" && v.startsWith("http");
}

/** Proof cell: link when a URL was submitted, a check when proof exists, dash otherwise. */
function ProofCell({ value, label }: { value: string; label: string }) {
  if (!value) return <span className="nomos-no">—</span>;
  if (isUrl(value))
    return (
      <a className="nomos-tiny-link" href={value} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  return <span className="nomos-yes">✓</span>;
}

export default function CreatorTable() {
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [langFilter, setLangFilter] = useState("");
  const [partnerFilter, setPartnerFilter] = useState("");
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
      if (partnerFilter === "partner" && !r.partner) return false;
      if (partnerFilter === "non" && r.partner) return false;
      return true;
    });
    const sorted = [...list];
    if (sortMode === "viewerHours") sorted.sort((a, b) => b.viewerHours - a.viewerHours);
    else if (sortMode === "hours") sorted.sort((a, b) => b.hoursNum - a.hoursNum);
    else if (sortMode === "peak") sorted.sort((a, b) => b.peakViewers - a.peakViewers);
    else if (sortMode === "followers") sorted.sort((a, b) => (b.followers ?? 0) - (a.followers ?? 0));
    else sorted.sort((a, b) => a.creator.localeCompare(b.creator));
    return sorted;
  }, [query, tierFilter, langFilter, partnerFilter, sortMode]);

  return (
    <>
      <div className="nomos-filters">
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
        <select value={partnerFilter} onChange={(e) => setPartnerFilter(e.target.value)}>
          <option value="">All creators</option>
          <option value="partner">Twitch Partners</option>
          <option value="non">Non-partners</option>
        </select>
        <select value={sortMode} onChange={(e) => setSortMode(e.target.value as SortMode)}>
          <option value="viewerHours">Sort: Viewer-hours</option>
          <option value="creator">Sort: Creator A-Z</option>
          <option value="hours">Sort: Hours streamed</option>
          <option value="peak">Sort: Peak viewers</option>
          <option value="followers">Sort: Followers</option>
        </select>
      </div>

      <div className="nomos-table-wrap">
        <table className="nomos-table">
          <thead>
            <tr>
              <th>Creator</th>
              <th>Tier</th>
              <th>Status</th>
              <th>Followers</th>
              <th>Top %</th>
              <th>Lang rank</th>
              <th>Language</th>
              <th>Avg</th>
              <th>Peak</th>
              <th>Hours</th>
              <th>Viewer-hrs</th>
              <th>VOD</th>
              <th>Clip / social</th>
              <th>Wishlist</th>
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
                    <span className={`nomos-pill ${tierClass}`}>{r.tier}</span>
                  </td>
                  <td>
                    {r.partner ? (
                      <span className="nomos-partner-tag">Partner</span>
                    ) : (
                      <span className="nomos-no">—</span>
                    )}
                  </td>
                  <td>
                    {r.followers !== null ? (
                      r.followers.toLocaleString()
                    ) : (
                      <span className="nomos-no">—</span>
                    )}
                  </td>
                  <td>{r.topPct !== null ? `${r.topPct}%` : <span className="nomos-no">—</span>}</td>
                  <td>
                    {r.langRank !== null ? (
                      `#${r.langRank.toLocaleString()}`
                    ) : (
                      <span className="nomos-no">—</span>
                    )}
                  </td>
                  <td>{r.language || <span className="nomos-no">—</span>}</td>
                  <td>{r.avgViewers}</td>
                  <td>{r.peakViewers}</td>
                  <td>{r.hours}</td>
                  <td>{r.viewerHours.toFixed(1)}</td>
                  <td>
                    {isUrl(r.vod) ? (
                      <a className="nomos-tiny-link" href={r.vod} target="_blank" rel="noopener noreferrer">
                        VOD
                      </a>
                    ) : (
                      <span className="nomos-no">—</span>
                    )}
                  </td>
                  <td>
                    <ProofCell value={r.beatViral} label="clip" />
                  </td>
                  <td>
                    <ProofCell value={r.wishlist} label="link" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="nomos-summary">
        Showing <strong>{filtered.length}</strong> of <strong>{rows.length}</strong> verified
        activations.
      </div>
    </>
  );
}
