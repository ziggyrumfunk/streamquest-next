"use client";

import { useState } from "react";
import { rows, type GbRow } from "./data";

/* ============================================================
   Tabbed "Top creator highlights" block. Six metric views, each
   with a top-5 list and the phase/support breakdown, plus a
   campaign-support view with two featured creators and the most
   complete support stacks. Mirrors the source report's panels.
   ============================================================ */

type MetricKey = "viewerHours" | "avgViewers" | "peakViewers" | "hoursNum" | "followers" | "topPct";
type TabKey = MetricKey | "support";

const done = rows.filter((r) => r.status === "Done");

function fmtHours(h: number): string {
  const m = Math.round(h * 60);
  return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m`;
}
function fmt(n: number): string {
  return n.toLocaleString("en-US");
}
function platform(url: string): string {
  if (/instagram\.com/.test(url)) return "Instagram";
  if (/tiktok\.com/.test(url)) return "TikTok";
  if (/x\.com|twitter\.com/.test(url)) return "X";
  if (/youtu\.?be/.test(url)) return "YouTube";
  if (/bsky\.app/.test(url)) return "Bluesky";
  return "Post";
}

const metrics: Record<
  MetricKey,
  { tab: string; title: string; sort: (a: GbRow, b: GbRow) => number; metric: (r: GbRow) => string; sub: (r: GbRow) => string }
> = {
  viewerHours: {
    tab: "Viewer-hours",
    title: "Top 5 by viewer-hours",
    sort: (a, b) => b.viewerHours - a.viewerHours,
    metric: (r) => `${r.viewerHours.toFixed(1)} vh`,
    sub: (r) => `${fmt(r.avgViewers)} avg viewers`,
  },
  avgViewers: {
    tab: "Avg viewers",
    title: "Top 5 by average viewers",
    sort: (a, b) => b.avgViewers - a.avgViewers,
    metric: (r) => `${fmt(r.avgViewers)} avg`,
    sub: (r) => `${fmt(r.peakViewers)} peak`,
  },
  peakViewers: {
    tab: "Peak viewers",
    title: "Top 5 by peak viewers",
    sort: (a, b) => b.peakViewers - a.peakViewers,
    metric: (r) => `${fmt(r.peakViewers)} peak`,
    sub: (r) => `${fmt(r.avgViewers)} avg`,
  },
  hoursNum: {
    tab: "Stream time",
    title: "Top 5 by stream time",
    sort: (a, b) => b.hoursNum - a.hoursNum,
    metric: (r) => fmtHours(r.hoursNum),
    sub: (r) => `${r.viewerHours.toFixed(1)} viewer-hours`,
  },
  followers: {
    tab: "Followers",
    title: "Top 5 by followers",
    sort: (a, b) => b.followers - a.followers,
    metric: (r) => `${fmt(r.followers)} followers`,
    sub: (r) => (r.topPct !== null ? `Top ${r.topPct.toFixed(2)}%` : "Rank not logged"),
  },
  topPct: {
    tab: "Twitch rank",
    title: "Top 5 by Twitch rank",
    sort: (a, b) => (a.topPct ?? 999) - (b.topPct ?? 999),
    metric: (r) => (r.topPct !== null ? `Top ${r.topPct.toFixed(2)}%` : "n/a"),
    sub: (r) => `${fmt(r.followers)} followers`,
  },
};

const coverage = [
  { label: "Both phases logged", note: "Demo and launch week on the same creator row", value: rows.filter((r) => r.didDemo && r.didLaunch).length },
  { label: "Demo week logged", note: "Accepted creator rows", value: rows.filter((r) => r.didDemo).length },
  { label: "Launch week logged", note: "Accepted creator rows", value: rows.filter((r) => r.didLaunch).length },
  { label: "Signal boosts logged", note: "Public social proof attached", value: rows.filter((r) => r.hasSignalBoost).length },
  { label: "Wishlist or link sync", note: "Store support proof logged", value: rows.filter((r) => r.hasLinkSync).length },
  { label: "Launch-day support", note: "Accepted creator rows", value: rows.filter((r) => r.hasLaunchSupport).length },
];
const coverageMax = Math.max(...coverage.map((c) => c.value), 1);

const topSupport = [...done]
  .sort(
    (a, b) =>
      Number(b.didDemo && b.didLaunch) - Number(a.didDemo && a.didLaunch) ||
      b.socialTouchpoints - a.socialTouchpoints ||
      b.avgViewers - a.avgViewers
  )
  .slice(0, 5);

function initials(name: string): string {
  return name
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function FeaturedCard({ r, badge, note }: { r: GbRow; badge: string; note: string }) {
  const links: { href: string; label: string; desc: string }[] = [];
  if (r.signalBoost) links.push({ href: r.signalBoost, label: `${platform(r.signalBoost)} post`, desc: "Campaign support proof" });
  if (r.demoVod) links.push({ href: r.demoVod, label: "Demo week VOD", desc: "Phase coverage proof" });
  if (r.launchVod) links.push({ href: r.launchVod, label: "Launch week VOD", desc: "Phase coverage proof" });
  if (r.bonusPosts[0]) links.push({ href: r.bonusPosts[0], label: `${platform(r.bonusPosts[0])} bonus`, desc: "Extra social proof" });
  if (r.tracker) links.push({ href: r.tracker, label: "Tracker page", desc: "Channel tracking" });
  return (
    <article className="gb-featured">
      <div className="gb-featured-head">
        <div className="gb-featured-id">
          <span className="gb-avatar">{initials(r.creator)}</span>
          <div>
            <h3>{r.creator}</h3>
            <span>{r.language} · {r.tier}</span>
          </div>
        </div>
        <div className="gb-tags">
          <span className="gb-tag is-ok">{r.didDemo && r.didLaunch ? "Both weeks" : r.didLaunch ? "Launch week" : "Demo week"}</span>
          <span className="gb-tag">{badge}</span>
        </div>
      </div>
      <p>{note}</p>
      <div className="gb-strip">
        <div><span>Followers</span><strong>{fmt(r.followers)}</strong></div>
        <div><span>Avg viewers</span><strong>{fmt(r.avgViewers)}</strong></div>
        <div><span>Peak</span><strong>{fmt(r.peakViewers)}</strong></div>
        <div><span>Viewer-hours</span><strong>{r.viewerHours.toFixed(1)}</strong></div>
      </div>
      <div className="gb-proofs">
        {links.slice(0, 4).map((l) => (
          <a key={l.href} className="gb-proof" href={l.href} target="_blank" rel="noopener noreferrer">
            <span>
              <strong>{l.label}</strong>
              <small>{l.desc}</small>
            </span>
            <em>Open →</em>
          </a>
        ))}
      </div>
    </article>
  );
}

export default function TopFive() {
  const [tab, setTab] = useState<TabKey>("viewerHours");
  const tabs: { key: TabKey; label: string }[] = [
    ...(Object.keys(metrics) as MetricKey[]).map((k) => ({ key: k, label: metrics[k].tab })),
    { key: "support", label: "Campaign support" },
  ];
  const gshiba = done.find((r) => r.creator === "Gshiba");
  const und = done.find((r) => /undoubtedly/i.test(r.creator));

  return (
    <>
      <div className="gb-tabs" role="tablist" aria-label="Highlight view">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            className={`gb-tab${tab === t.key ? " is-active" : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab !== "support" ? (
        <div className="gb-panel">
          <div className="gb-rank-card">
            <h3>{metrics[tab].title}</h3>
            <span className="gb-sub">Completed creators only</span>
            {[...done]
              .sort(metrics[tab].sort)
              .slice(0, 5)
              .map((r, i) => (
                <div key={r.creator} className="gb-rank-row">
                  <span className="gb-rank-num">#{i + 1}</span>
                  <div className="gb-rank-who">
                    <strong>{r.creator}</strong>
                    <span>{r.language} · {fmtHours(r.hoursNum)}</span>
                  </div>
                  <div className="gb-rank-val">
                    <b>{metrics[tab].metric(r)}</b>
                    <span>{metrics[tab].sub(r)}</span>
                  </div>
                </div>
              ))}
          </div>
          <div className="gb-rank-card gb-coverage">
            <h3>Phase split and support actions</h3>
            <span className="gb-sub">Across all 48 accepted creator rows</span>
            {coverage.map((c) => (
              <div key={c.label} className="gb-bar">
                <div className="gb-bar-head">
                  <span>
                    {c.label} <small>({c.note})</small>
                  </span>
                  <strong>{c.value}</strong>
                </div>
                <div className="gb-bar-track">
                  <div className="gb-bar-fill" style={{ width: `${((c.value / coverageMax) * 100).toFixed(1)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="gb-panel gb-panel-support">
          {gshiba && (
            <FeaturedCard
              r={gshiba}
              badge="Standout social proof"
              note="One of the campaign's highest live performers, paired with a public TikTok post that pushed visibility outside Twitch."
            />
          )}
          {und && (
            <FeaturedCard
              r={und}
              badge="Both phases and wishlist support"
              note="The behaviour this campaign wanted most, in one row: demo week stream, launch week stream, public support post, logged link sync and launch-day support."
            />
          )}
          <div className="gb-rank-card">
            <h3>Most complete support stack</h3>
            <span className="gb-sub">Both-week coverage, then signal boost, link sync and launch support</span>
            {topSupport.map((r, i) => (
              <div key={r.creator} className="gb-rank-row">
                <span className="gb-rank-num">#{i + 1}</span>
                <div className="gb-rank-who">
                  <strong>{r.creator}</strong>
                  <span>{r.language} · {fmt(r.avgViewers)} avg viewers</span>
                </div>
                <div className="gb-rank-val">
                  <b>{r.socialTouchpoints} touchpoints</b>
                  <span>{r.didDemo && r.didLaunch ? "Both weeks" : "Single phase"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
