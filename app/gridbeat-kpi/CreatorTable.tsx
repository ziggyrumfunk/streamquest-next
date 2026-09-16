"use client";

import { useMemo, useState } from "react";
import { rows, type GbRow } from "./data";

type SortMode = "viewerHours" | "avgViewers" | "peakViewers" | "followers" | "topPct" | "hoursNum" | "creator";
type SupportFilter =
  | ""
  | "both"
  | "demo"
  | "launch"
  | "signal"
  | "link"
  | "support"
  | "bonus"
  | "large"
  | "top1";

/** Short platform label for a proof URL. */
function platform(url: string): string {
  if (/instagram\.com/.test(url)) return "Instagram";
  if (/tiktok\.com/.test(url)) return "TikTok";
  if (/x\.com|twitter\.com/.test(url)) return "X";
  if (/youtu\.?be/.test(url)) return "YouTube";
  if (/bsky\.app/.test(url)) return "Bluesky";
  if (/twitch\.tv/.test(url)) return "Twitch";
  return "Post";
}

function fmtHours(h: number): string {
  const m = Math.round(h * 60);
  return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m`;
}

function Chip({ href, label, kind }: { href: string; label: string; kind?: "vod" | "tracker" }) {
  return (
    <a
      className={`gb-chip${kind ? ` is-${kind}` : ""}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}

export default function CreatorTable() {
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState("");
  const [tier, setTier] = useState("");
  const [status, setStatus] = useState("");
  const [support, setSupport] = useState<SupportFilter>("");
  const [sortMode, setSortMode] = useState<SortMode>("viewerHours");

  const languages = useMemo(
    () => Array.from(new Set(rows.map((r) => r.language).filter(Boolean))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = rows.filter((r: GbRow) => {
      const hay = `${r.creator} ${r.language} ${r.tier} ${r.status}`.toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (lang && r.language !== lang) return false;
      if (tier && r.tier !== tier) return false;
      if (status && r.status !== status) return false;
      if (support === "both" && !(r.didDemo && r.didLaunch)) return false;
      if (support === "demo" && !r.didDemo) return false;
      if (support === "launch" && !r.didLaunch) return false;
      if (support === "signal" && !r.hasSignalBoost) return false;
      if (support === "link" && !r.hasLinkSync) return false;
      if (support === "support" && !r.hasLaunchSupport) return false;
      if (support === "bonus" && r.bonusPosts.length === 0) return false;
      if (support === "large" && !r.largeProfile) return false;
      if (support === "top1" && (r.topPct ?? 999) > 1) return false;
      return true;
    });
    const sorted = [...list];
    if (sortMode === "creator") sorted.sort((a, b) => a.creator.localeCompare(b.creator));
    else if (sortMode === "topPct") sorted.sort((a, b) => (a.topPct ?? 999) - (b.topPct ?? 999));
    else sorted.sort((a, b) => (b[sortMode] as number) - (a[sortMode] as number));
    return sorted;
  }, [query, lang, tier, status, support, sortMode]);

  const visibleDone = filtered.filter((r) => r.status === "Done");
  const visibleVh = visibleDone.reduce((s, r) => s + r.viewerHours, 0);
  const visibleHours = visibleDone.reduce((s, r) => s + r.hoursNum, 0);

  return (
    <>
      <div className="gb-filters">
        <input
          type="text"
          placeholder="Search creator, language..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="">All languages</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <select value={tier} onChange={(e) => setTier(e.target.value)}>
          <option value="">All tiers</option>
          <option value="Silver">Silver</option>
          <option value="Bronze">Bronze</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="Done">Done</option>
          <option value="Open">Open</option>
        </select>
        <select value={support} onChange={(e) => setSupport(e.target.value as SupportFilter)}>
          <option value="">Support: all rows</option>
          <option value="both">Demo and launch week</option>
          <option value="demo">Has demo week stream</option>
          <option value="launch">Has launch week stream</option>
          <option value="signal">Has signal boost</option>
          <option value="link">Has link sync proof</option>
          <option value="support">Has launch-day support</option>
          <option value="bonus">Has bonus post</option>
          <option value="large">10K+ followers</option>
          <option value="top1">Top 1% creators</option>
        </select>
        <select value={sortMode} onChange={(e) => setSortMode(e.target.value as SortMode)}>
          <option value="viewerHours">Sort: Viewer-hours</option>
          <option value="avgViewers">Sort: Average viewers</option>
          <option value="peakViewers">Sort: Peak viewers</option>
          <option value="followers">Sort: Followers</option>
          <option value="topPct">Sort: Best Twitch rank</option>
          <option value="hoursNum">Sort: Hours streamed</option>
          <option value="creator">Sort: Creator A-Z</option>
        </select>
      </div>

      <div className="gb-visible">
        <span>
          Visible creators <strong>{filtered.length}</strong>
        </span>
        <span>
          Visible viewer-hours{" "}
          <strong>{visibleVh.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</strong>
        </span>
        <span>
          Visible stream time <strong>{fmtHours(visibleHours)}</strong>
        </span>
      </div>

      <div className="gb-table-wrap">
        <table className="gb-table">
          <thead>
            <tr>
              <th>Creator</th>
              <th>Channel quality</th>
              <th>Live performance</th>
              <th>Phase coverage</th>
              <th>Campaign support</th>
              <th>Proof links</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const noSupport =
                !r.hasSignalBoost && !r.hasLinkSync && !r.hasLaunchSupport && r.bonusPosts.length === 0;
              return (
                <tr key={r.creator} className={r.status === "Open" ? "is-open" : ""}>
                  <td>
                    <strong className="gb-name">{r.creator}</strong>
                    <div className="gb-tags">
                      <span className={`gb-tag ${r.status === "Done" ? "is-ok" : "is-warn"}`}>{r.status}</span>
                      <span className={`gb-tag is-${r.tier.toLowerCase()}`}>{r.tier}</span>
                      {r.topPct !== null && <span className="gb-tag">Top {r.topPct.toFixed(2)}%</span>}
                      <span className="gb-tag">{r.followers.toLocaleString()} followers</span>
                    </div>
                  </td>
                  <td>
                    <span className="gb-num">{r.histAvg.toFixed(1)}</span>
                    <span className="gb-num-sub">Historic avg viewers</span>
                    <div className="gb-tags">
                      {r.largeProfile && <span className="gb-tag is-ok">10K+ followers</span>}
                      {(r.topPct ?? 999) <= 1 && <span className="gb-tag is-ok">Top 1%</span>}
                      <span className="gb-tag">{r.language}</span>
                      {r.langRank !== null && <span className="gb-tag">#{r.langRank.toLocaleString()} in language</span>}
                    </div>
                  </td>
                  <td>
                    <span className="gb-num">{r.avgViewers}</span>
                    <span className="gb-num-sub">Average viewers</span>
                    <div className="gb-tags">
                      <span className="gb-tag">{r.peakViewers} peak</span>
                      <span className="gb-tag">{r.viewerHours.toFixed(1)} viewer-hours</span>
                      <span className="gb-tag">{fmtHours(r.hoursNum)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="gb-tags">
                      {r.didDemo ? <span className="gb-tag is-ok">Demo week</span> : <span className="gb-tag">No demo log</span>}
                      {r.didLaunch ? <span className="gb-tag is-ok">Launch week</span> : <span className="gb-tag">No launch log</span>}
                    </div>
                  </td>
                  <td>
                    <div className="gb-tags">
                      {r.hasSignalBoost && <span className="gb-tag is-ok">Signal boost</span>}
                      {r.hasLinkSync && <span className="gb-tag is-ok">Link sync</span>}
                      {r.hasLaunchSupport && <span className="gb-tag is-ok">Launch support</span>}
                      {r.bonusPosts.length > 0 && <span className="gb-tag is-ok">Bonus post</span>}
                      {noSupport && <span className="gb-tag">No support proof logged</span>}
                    </div>
                  </td>
                  <td>
                    <div className="gb-links">
                      {r.demoVod && <Chip href={r.demoVod} label="Demo VOD" kind="vod" />}
                      {r.launchVod && <Chip href={r.launchVod} label="Launch VOD" kind="vod" />}
                      {r.signalBoost && <Chip href={r.signalBoost} label={`${platform(r.signalBoost)} post`} />}
                      {r.linkSyncProofs.map((u, i) => (
                        <Chip key={u} href={u} label={i === 0 ? "Link sync proof" : "Link sync extra"} />
                      ))}
                      {r.launchSupportProofs.map((u, i) => (
                        <Chip key={u} href={u} label={i === 0 ? "Launch support proof" : "Support extra"} />
                      ))}
                      {r.bonusPosts.map((u, i) => (
                        <Chip key={u} href={u} label={i === 0 ? `${platform(u)} bonus` : "Bonus extra"} />
                      ))}
                      {r.tracker && <Chip href={r.tracker} label="Tracker" kind="tracker" />}
                      {!r.demoVod && !r.launchVod && !r.signalBoost && r.linkSyncProofs.length === 0 && r.launchSupportProofs.length === 0 && r.bonusPosts.length === 0 && !r.tracker && (
                        <span className="gb-no">No links logged</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="gb-summary">
        Showing <strong>{filtered.length}</strong> of <strong>{rows.length}</strong> accepted creator rows.
        Totals above count the rows marked Done.
      </div>
    </>
  );
}
