"use client";

import { useMemo, useState } from "react";
import { rows, type AskaRow } from "./data";

type SortMode = "creator" | "viewerHours" | "hours" | "peak" | "followers";

function isUrl(v: string): boolean {
  return typeof v === "string" && v.startsWith("http");
}

function ProofCell({ value }: { value: string }) {
  if (!value) return <span className="aska-no">—</span>;
  if (isUrl(value))
    return (
      <a
        className="aska-tiny-link"
        href={value}
        target="_blank"
        rel="noopener noreferrer"
      >
        link
      </a>
    );
  return <span className="aska-yes">✓</span>;
}

export default function CreatorTable() {
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [langFilter, setLangFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("creator");

  const languages = useMemo(
    () =>
      Array.from(new Set(rows.map((r) => r.language).filter(Boolean))).sort(),
    []
  );

  const platforms = useMemo(
    () =>
      Array.from(
        new Set(
          rows
            .flatMap((r) =>
              r.raisePlatforms.split(",").map((s) => s.trim())
            )
            .filter(Boolean)
        )
      ).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = rows.filter((r) => {
      const hay = `${r.creator} ${r.tier} ${r.language} ${r.langRank} ${r.raisePlatforms}`.toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (tierFilter && r.tier !== tierFilter) return false;
      if (langFilter && r.language !== langFilter) return false;
      if (platformFilter && !r.raisePlatforms.includes(platformFilter))
        return false;
      return true;
    });
    const sorted = [...list];
    if (sortMode === "viewerHours")
      sorted.sort((a, b) => b.viewerHours - a.viewerHours);
    else if (sortMode === "hours") sorted.sort((a, b) => b.hoursNum - a.hoursNum);
    else if (sortMode === "peak") sorted.sort((a, b) => b.peakViewers - a.peakViewers);
    else if (sortMode === "followers")
      sorted.sort((a, b) => (b.followers ?? 0) - (a.followers ?? 0));
    else sorted.sort((a, b) => a.creator.localeCompare(b.creator));
    return sorted;
  }, [query, tierFilter, langFilter, platformFilter, sortMode]);

  return (
    <>
      <div className="aska-filters">
        <input
          type="text"
          placeholder="Search creator, language, platform..."
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
        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
        >
          <option value="">All raise platforms</option>
          {platforms.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value as SortMode)}
        >
          <option value="creator">Sort: Creator A-Z</option>
          <option value="viewerHours">Sort: Viewer-hours</option>
          <option value="hours">Sort: Hours streamed</option>
          <option value="peak">Sort: Peak viewers</option>
          <option value="followers">Sort: Followers</option>
        </select>
      </div>

      <div className="aska-table-wrap">
        <table className="aska-table">
          <thead>
            <tr>
              <th>Creator</th>
              <th>Tier</th>
              <th>Followers</th>
              <th>Top %</th>
              <th>Lang rank</th>
              <th>Avg CCV</th>
              <th>Peak</th>
              <th>Hours</th>
              <th>Viewer-hrs</th>
              <th>Raise platform</th>
              <th>VOD</th>
              <th>Raise</th>
              <th>Skald</th>
              <th>Mead Hall</th>
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
                    <span className={`aska-pill ${tierClass}`}>{r.tier}</span>
                  </td>
                  <td>
                    {r.followers !== null ? (
                      r.followers.toLocaleString()
                    ) : (
                      <span className="aska-no">—</span>
                    )}
                  </td>
                  <td>
                    {r.topPct !== null ? `${r.topPct}%` : <span className="aska-no">—</span>}
                  </td>
                  <td>{r.langRank || <span className="aska-no">—</span>}</td>
                  <td>{r.avgViewers}</td>
                  <td>{r.peakViewers}</td>
                  <td>{r.hours}</td>
                  <td>{r.viewerHours.toFixed(1)}</td>
                  <td>{r.raisePlatforms || <span className="aska-no">—</span>}</td>
                  <td>
                    {isUrl(r.mainQuest) ? (
                      <a
                        className="aska-tiny-link"
                        href={r.mainQuest}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        VOD
                      </a>
                    ) : (
                      <span className="aska-no">—</span>
                    )}
                  </td>
                  <td>
                    <ProofCell value={r.raiseTheHorn} />
                  </td>
                  <td>
                    <ProofCell value={r.skaldHighlight} />
                  </td>
                  <td>
                    {r.meadHallRising ? (
                      <span className="aska-yes">✓</span>
                    ) : (
                      <span className="aska-no">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="aska-summary">
        Showing <strong>{filtered.length}</strong> of <strong>{rows.length}</strong>{" "}
        verified activations.
      </div>
    </>
  );
}
