"use client";

import { useMemo, useState } from "react";
import { submissions, type Submission } from "./data";

type SortMode = "creator" | "viewerHours" | "hours" | "peak";

function proofLinkCount(row: Submission): number {
  let count = 0;
  if (row.vod) count++;
  if (row.socialLink) count++;
  if (row.twitchtracker && row.twitchtracker.startsWith("http")) count++;
  if (row.signalProofLink) count++;
  if (row.bonusSocial) count++;
  return count;
}

function fmtPct(value: number | null): string {
  if (value === null || value === undefined) return "—";
  return String(value);
}

export default function SubmissionTable() {
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState("");
  const [language, setLanguage] = useState("");
  const [quest, setQuest] = useState("");
  const [hours, setHours] = useState("");
  const [proof, setProof] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("creator");

  const languages = useMemo(
    () =>
      Array.from(new Set(submissions.map((s) => s.language).filter(Boolean))).sort(
        (a, b) => a.localeCompare(b)
      ),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = submissions.filter((row) => {
      const hay = [
        row.creator,
        row.tier,
        row.language,
        row.rankLang,
        row.key,
        row.vod,
        row.socialLink,
        row.twitchtracker,
      ]
        .join(" ")
        .toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (tier && row.tier.toLowerCase() !== tier.toLowerCase()) return false;
      if (language && row.language !== language) return false;
      if (hours === "10" && row.hoursNum < 10) return false;
      if (hours === "20" && row.hoursNum < 20) return false;
      if (quest === "any" && row.sidequests < 1) return false;
      if (quest === "two" && row.sidequests < 2) return false;
      if (quest === "signal" && row.swarmSignal !== "Yes") return false;
      if (quest === "team" && row.temteam !== "Yes") return false;
      if (quest === "wishlist" && row.wishlist !== "Yes") return false;
      if (proof === "proof" && proofLinkCount(row) < 1) return false;
      if (
        proof === "nodetail" &&
        (row.approvedItems ||
          row.streamSummaryFile ||
          row.temteamProofFile ||
          row.wishlistProofFile)
      )
        return false;
      return true;
    });

    const sorted = [...rows];
    if (sortMode === "viewerHours") sorted.sort((a, b) => b.viewerHours - a.viewerHours);
    else if (sortMode === "hours") sorted.sort((a, b) => b.hoursNum - a.hoursNum);
    else if (sortMode === "peak") sorted.sort((a, b) => b.peakViewers - a.peakViewers);
    else sorted.sort((a, b) => a.creator.localeCompare(b.creator));
    return sorted;
  }, [query, tier, language, quest, hours, proof, sortMode]);

  const visibleLinks = filtered.reduce((sum, row) => sum + proofLinkCount(row), 0);

  return (
    <>
      <div className="tem-filters">
        <input
          type="text"
          placeholder="Search creator, language, key, rank, or link"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={tier} onChange={(e) => setTier(e.target.value)}>
          <option value="">All tiers</option>
          <option value="Silver">Silver</option>
          <option value="Bronze">Bronze</option>
        </select>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">All languages</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <select value={quest} onChange={(e) => setQuest(e.target.value)}>
          <option value="">All quest states</option>
          <option value="any">At least 1 quest mechanic</option>
          <option value="two">2+ quest mechanics</option>
          <option value="signal">Swarm Signal</option>
          <option value="team">TemTeam Up</option>
          <option value="wishlist">Wishlist Spreader</option>
        </select>
        <select value={hours} onChange={(e) => setHours(e.target.value)}>
          <option value="">All hour ranges</option>
          <option value="10">10h+ only</option>
          <option value="20">20h+ only</option>
        </select>
        <select value={proof} onChange={(e) => setProof(e.target.value)}>
          <option value="">All submission states</option>
          <option value="proof">Has social/proof links</option>
          <option value="nodetail">Missing raw submission detail</option>
        </select>
        <select value={sortMode} onChange={(e) => setSortMode(e.target.value as SortMode)}>
          <option value="creator">Sort: Creator A-Z</option>
          <option value="viewerHours">Sort: Viewer-hours</option>
          <option value="hours">Sort: Hours streamed</option>
          <option value="peak">Sort: Peak viewers</option>
        </select>
      </div>

      <div className="tem-table-wrap">
        <table className="tem-table">
          <thead>
            <tr>
              <th>Creator</th>
              <th>Tier</th>
              <th>Payment</th>
              <th>Key</th>
              <th>Top %</th>
              <th>Followers</th>
              <th>Avg CCV All</th>
              <th>Rank / Language</th>
              <th>Avg</th>
              <th>Peak</th>
              <th>Hours</th>
              <th>Viewer-Hours</th>
              <th>Signal</th>
              <th>TemTeam</th>
              <th>Wishlist</th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => {
              const links: { href: string; label: string }[] = [];
              if (row.vod) links.push({ href: row.vod, label: "VOD" });
              if (row.socialLink) links.push({ href: row.socialLink, label: "Post" });
              if (row.signalProofLink && row.signalProofLink !== row.socialLink)
                links.push({ href: row.signalProofLink, label: "Signal" });
              if (row.bonusSocial) links.push({ href: row.bonusSocial, label: "Bonus" });
              if (row.twitchtracker && row.twitchtracker.startsWith("http"))
                links.push({ href: row.twitchtracker, label: "Tracker" });

              const tierClass = row.tier.toLowerCase().includes("silver")
                ? "is-silver"
                : "is-bronze";

              return (
                <tr key={`${row.creator}-${row.key}`}>
                  <td>
                    <strong>{row.creator}</strong>
                  </td>
                  <td>
                    <span className={`tem-pill ${tierClass}`}>{row.tier}</span>
                  </td>
                  <td>
                    <span className="tem-pill is-done">{row.payment || "Done"}</span>
                  </td>
                  <td>{row.key || ""}</td>
                  <td>{fmtPct(row.topPct)}</td>
                  <td>
                    {row.followers
                      ? row.followers.toLocaleString()
                      : <span className="tem-no">—</span>}
                  </td>
                  <td>{row.avgCCVAll ?? <span className="tem-no">—</span>}</td>
                  <td>{row.rankLang || row.language || ""}</td>
                  <td>{row.avgViewers}</td>
                  <td>{row.peakViewers}</td>
                  <td>{row.hours}</td>
                  <td>{row.viewerHours.toFixed(1)}</td>
                  <td>
                    <span className={row.swarmSignal === "Yes" ? "tem-yes" : "tem-no"}>
                      {row.swarmSignal}
                    </span>
                  </td>
                  <td>
                    <span className={row.temteam === "Yes" ? "tem-yes" : "tem-no"}>
                      {row.temteam}
                    </span>
                  </td>
                  <td>
                    <span className={row.wishlist === "Yes" ? "tem-yes" : "tem-no"}>
                      {row.wishlist}
                    </span>
                  </td>
                  <td>
                    {links.length ? (
                      <div className="tem-link-stack">
                        {links.map((l, i) => (
                          <a
                            key={`${l.href}-${i}`}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tem-tiny-link"
                          >
                            {l.label}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <span className="tem-no">No links</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="tem-summary">
        Showing <strong>{filtered.length}</strong> of{" "}
        <strong>{submissions.length}</strong> creators ·{" "}
        <strong>{visibleLinks}</strong> visible proof links.
      </div>
    </>
  );
}
