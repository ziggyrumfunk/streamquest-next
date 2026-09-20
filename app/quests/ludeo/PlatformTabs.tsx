"use client";

import { useState } from "react";

/* Per-platform qualification gates, mission specifics and the analytics
   creators are asked to send at Day 7 and Day 30. One tab per platform. */

type Row = { tier: "Bronze" | "Silver" | "Gold"; audience: string; views: string; likeRate: string; comments: string };

type Platform = {
  key: string;
  label: string;
  audienceLabel: string;
  viewsLabel: string;
  rows: Row[];
  note: string;
  format: string;
  mission: string;
  extra?: string;
  analytics: string;
  example?: { lines: string[]; result: string; verdict: string };
};

const platforms: Platform[] = [
  {
    key: "tiktok",
    label: "TikTok",
    audienceLabel: "Followers",
    viewsLabel: "Median views",
    rows: [
      { tier: "Bronze", audience: "500+", views: "500 to 5,000", likeRate: "3.0%+", comments: "3+" },
      { tier: "Silver", audience: "2,000+", views: "5,001 to 20,000", likeRate: "3.0%+", comments: "8+" },
      { tier: "Gold", audience: "5,000+", views: "20,001+", likeRate: "2.5%+", comments: "15+" },
    ],
    note: "All four gates count together. Passing on views alone does not set your tier.",
    format: "Vertical 9:16, normally 20 to 45 seconds",
    mission:
      "Your TikTok must introduce Ludeo, feature 2 to 3 approved Playables, explain the playable-moment concept, mention desktop availability, include the Discord call to action and clearly disclose the sponsorship.",
    analytics: "Views, likes, comments, shares, watch time, retention and audience geography.",
    example: {
      lines: ["8,500 views", "420 likes", "12 genuine commenters"],
      result: "420 ÷ 8,500 = 4.94% like rate",
      verdict: "That comfortably passes the Silver engagement requirement.",
    },
  },
  {
    key: "reels",
    label: "Instagram Reels",
    audienceLabel: "Followers",
    viewsLabel: "Median Reel views",
    rows: [
      { tier: "Bronze", audience: "500+", views: "500 to 5,000", likeRate: "2.5%+", comments: "2+" },
      { tier: "Silver", audience: "1,500+", views: "5,001 to 20,000", likeRate: "2.25%+", comments: "5+" },
      { tier: "Gold", audience: "5,000+", views: "20,001+", likeRate: "2.0%+", comments: "10+" },
    ],
    note: "Reels often reach people who do not follow the account, so follower count alone is not enough to qualify. We care much more about whether your videos consistently reach viewers, and whether those viewers actually react to the content.",
    format: "Vertical 9:16, normally 20 to 45 seconds",
    mission:
      "Your Reel must introduce Ludeo, feature 2 to 3 approved Playables, explain how playable gaming moments work, mention desktop availability, include the Discord call to action and clearly disclose the paid promotion.",
    analytics: "Views, accounts reached, likes, comments, shares, saves, watch time, retention and audience geography.",
  },
  {
    key: "shorts",
    label: "YouTube Shorts",
    audienceLabel: "Subscribers",
    viewsLabel: "Median Short views",
    rows: [
      { tier: "Bronze", audience: "250+", views: "500 to 5,000", likeRate: "2.0%+", comments: "1+" },
      { tier: "Silver", audience: "750+", views: "5,001 to 20,000", likeRate: "2.0%+", comments: "2+" },
      { tier: "Gold", audience: "2,000+", views: "20,001+", likeRate: "2.0%+", comments: "5+" },
    ],
    note: "YouTube Shorts naturally receives fewer comments per view than TikTok and Instagram Reels, so the comment requirement is intentionally lower. A creator will not be penalised simply because normal interaction behaviour differs between platforms.",
    format: "Vertical short-form video, normally 20 to 45 seconds",
    mission:
      "Your Short must introduce Ludeo, feature 2 to 3 approved Playables, explain that viewers can play those moments themselves, mention desktop availability, direct viewers toward the Ludeo Discord and clearly disclose the sponsorship.",
    extra:
      "Do not rely on a URL inside the Shorts description as your only Discord call to action. StreamQuest will provide the approved link route.",
    analytics:
      "Views, likes, comments, shares, average view duration, audience retention, viewed versus swiped-away metrics and audience geography.",
  },
];

export default function PlatformTabs() {
  const [active, setActive] = useState(platforms[0].key);
  const p = platforms.find((x) => x.key === active) ?? platforms[0];

  return (
    <div className="lq-platforms">
      <div className="lq-tabs" role="tablist" aria-label="Platform">
        {platforms.map((x) => (
          <button
            key={x.key}
            type="button"
            role="tab"
            aria-selected={x.key === active}
            className={`lq-tab${x.key === active ? " is-active" : ""}`}
            onClick={() => setActive(x.key)}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="lq-panel" key={p.key}>
        <h3 className="lq-panel-title">{p.label} creator tiers</h3>
        <div className="lq-table-wrap">
          <table className="lq-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>{p.audienceLabel}</th>
                <th>{p.viewsLabel}</th>
                <th>Median like rate</th>
                <th>Genuine comments</th>
              </tr>
            </thead>
            <tbody>
              {p.rows.map((r) => (
                <tr key={r.tier}>
                  <td>
                    <span className={`lq-tier is-${r.tier.toLowerCase()}`}>{r.tier}</span>
                  </td>
                  <td>{r.audience}</td>
                  <td className="is-num">{r.views}</td>
                  <td>{r.likeRate}</td>
                  <td>{r.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="lq-panel-note">{p.note}</p>

        {p.example && (
          <div className="lq-example">
            <span className="lq-example-tag">Example</span>
            <p>If your recent TikToks normally receive:</p>
            <ul>
              {p.example.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <p className="lq-example-result">{p.example.result}</p>
            <p>{p.example.verdict}</p>
          </div>
        )}

        <div className="lq-panel-grid">
          <div className="lq-panel-box">
            <span className="lq-box-tag">{p.label} mission</span>
            <p className="lq-box-format">{p.format}</p>
            <p>{p.mission}</p>
            {p.extra && <p className="lq-box-extra">{p.extra}</p>}
          </div>
          <div className="lq-panel-box">
            <span className="lq-box-tag">Analytics to send</span>
            <p className="lq-box-format">Around Day 7 and Day 30</p>
            <p>{p.analytics}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
