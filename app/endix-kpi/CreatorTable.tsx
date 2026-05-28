"use client";

import { useMemo, useState } from "react";
import { rows, type EndixRow } from "./data";

type SortMode = "order" | "viewerHours" | "hours" | "peak";

function isUrl(v: string) {
  return typeof v === "string" && v.startsWith("http");
}

function Proof({ value }: { value: string }) {
  if (!value) return <span className="endix-no">—</span>;
  if (isUrl(value))
    return (
      <a
        className="endix-tiny-link"
        href={value}
        target="_blank"
        rel="noopener noreferrer"
      >
        link
      </a>
    );
  return <span className="endix-yes">✓</span>;
}

export default function CreatorTable() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [langFilter, setLangFilter] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("order");

  const languages = useMemo(
    () =>
      Array.from(new Set(rows.map((r) => r.language).filter(Boolean))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = rows.filter((r) => {
      const hay = `${r.creator} ${r.status} ${r.tier} ${r.language} ${r.langRank}`.toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (statusFilter && !r.status.toLowerCase().includes(statusFilter.toLowerCase()))
        return false;
      if (langFilter && r.language !== langFilter) return false;
      if (tierFilter && r.tier !== tierFilter) return false;
      return true;
    });
    const sorted = [...list];
    if (sortMode === "viewerHours")
      sorted.sort((a, b) => b.viewerHours - a.viewerHours);
    else if (sortMode === "hours") sorted.sort((a, b) => b.hoursNum - a.hoursNum);
    else if (sortMode === "peak")
      sorted.sort((a, b) => (b.peakViewers ?? 0) - (a.peakViewers ?? 0));
    return sorted;
  }, [query, statusFilter, langFilter, tierFilter, sortMode]);

  const completed = filtered.filter((r) => r.statusClass === "completed").length;

  return (
    <>
      <div className="endix-filters">
        <input
          type="text"
          placeholder="Search creator, status, language..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          <option value="Completed">Completed</option>
          <option value="Approved">Approved · non-submission</option>
          <option value="Applied">Applied · campaign full</option>
        </select>
        <select value={langFilter} onChange={(e) => setLangFilter(e.target.value)}>
          <option value="">All languages</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <select value={tierFilter} onChange={(e) => setTierFilter(e.target.value)}>
          <option value="">All tiers</option>
          <option value="Silver">Silver</option>
          <option value="Bronze">Bronze</option>
        </select>
        <select
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value as SortMode)}
        >
          <option value="order">Sort: List order</option>
          <option value="viewerHours">Sort: Viewer-hours</option>
          <option value="hours">Sort: Hours streamed</option>
          <option value="peak">Sort: Peak viewers</option>
        </select>
      </div>

      <div className="endix-table-wrap">
        <table className="endix-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Creator</th>
              <th>Status</th>
              <th>Tier</th>
              <th>Top %</th>
              <th>Followers</th>
              <th>Avg CCV</th>
              <th>Lang rank</th>
              <th>Avg</th>
              <th>Peak</th>
              <th>Hours</th>
              <th>Viewer-hrs</th>
              <th>Booth</th>
              <th>EXPO clip</th>
              <th>Wishlist</th>
              <th>VOD</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const sClass =
                r.statusClass === "completed"
                  ? "endix-row-done"
                  : r.statusClass === "missing"
                  ? "endix-row-miss"
                  : "endix-row-late";
              const tierClass = r.tier === "Silver" ? "is-silver" : r.tier === "Bronze" ? "is-bronze" : "";
              return (
                <tr key={`${r.order}-${r.creator}`} className={sClass}>
                  <td>{r.order}</td>
                  <td>
                    <strong>{r.creator}</strong>
                  </td>
                  <td>
                    <span
                      className={`endix-status endix-status-${r.statusClass}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td>{r.tier ? <span className={`endix-pill ${tierClass}`}>{r.tier}</span> : <span className="endix-no">—</span>}</td>
                  <td>{r.topPct || <span className="endix-no">—</span>}</td>
                  <td>
                    {r.followers !== null ? r.followers.toLocaleString() : <span className="endix-no">—</span>}
                  </td>
                  <td>{r.avgCCV ?? <span className="endix-no">—</span>}</td>
                  <td>{r.langRank || <span className="endix-no">—</span>}</td>
                  <td>{r.avgViewers ?? <span className="endix-no">—</span>}</td>
                  <td>{r.peakViewers ?? <span className="endix-no">—</span>}</td>
                  <td>{r.hours || <span className="endix-no">—</span>}</td>
                  <td>
                    {r.viewerHours > 0 ? r.viewerHours.toFixed(1) : <span className="endix-no">—</span>}
                  </td>
                  <td>
                    <Proof value={r.photobooth} />
                  </td>
                  <td>
                    <Proof value={r.expoClip} />
                  </td>
                  <td>
                    <Proof value={r.wishlist} />
                  </td>
                  <td>
                    {r.vod ? (
                      isUrl(r.vod) ? (
                        <a
                          className="endix-tiny-link"
                          href={r.vod}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          VOD
                        </a>
                      ) : (
                        <span className="endix-no">{r.vod}</span>
                      )
                    ) : (
                      <span className="endix-no">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="endix-summary">
        Showing <strong>{filtered.length}</strong> of <strong>{rows.length}</strong>{" "}
        named rows · <strong>{completed}</strong> completed in current filter.
      </div>
    </>
  );
}
