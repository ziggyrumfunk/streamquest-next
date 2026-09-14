// Generated from "Ground Zero Hero - Creator completion List" (August 20th game launch sheet),
// reconciled through 7 September 2026. 27 completed activations.
// viewerHours = hoursNum x avgViewers, rounded to one decimal.
// Corrections against Twitch on 14 Sep 2026: SOGAeon followers 1679 -> 26077 (workbook typo),
// Eyklor followers blank -> 606. Partner status added from the same check.
export type GzhRow = {
  creator: string;
  tier: "Gold" | "Silver" | "Bronze";
  /** Twitch Partner status, verified directly against Twitch on 14 Sep 2026. */
  partner: boolean;
  followers: number | null;
  topPct: number | null;
  langRank: number | null;
  language: string;
  avgViewers: number;
  peakViewers: number;
  hours: string;
  hoursNum: number;
  viewerHours: number;
  vod: string;
  /** Submitted social posts or clips, one URL each. */
  social: string[];
  wishlist: boolean;
  launchDay: boolean;
  /** Public view count where one was captured. */
  publicViews: number | null;
};

export const rows: GzhRow[] = [
  { creator: "Toky", tier: "Bronze", partner: true, followers: 25820, topPct: 3.25, langRank: 112949, language: "English", avgViewers: 9, peakViewers: 12, hours: "2h01", hoursNum: 2.017, viewerHours: 18.2, vod: "https://www.twitch.tv/videos/2851521083", social: ["https://x.com/ToKymonGrey/status/2090492754249806267"], wishlist: true, launchDay: true, publicViews: 739 },
  { creator: "Paildry", tier: "Silver", partner: false, followers: 934, topPct: 1.84, langRank: 8860, language: "German", avgViewers: 20, peakViewers: 22, hours: "2h19", hoursNum: 2.317, viewerHours: 46.3, vod: "https://www.twitch.tv/videos/2851542551", social: [], wishlist: true, launchDay: true, publicViews: null },
  { creator: "MarianaAr32", tier: "Silver", partner: false, followers: 3558, topPct: 0.93, langRank: 444, language: "Arabic", avgViewers: 26, peakViewers: 38, hours: "4h38", hoursNum: 4.633, viewerHours: 120.5, vod: "https://kick.com/marianaar32/videos/01a020ac-7ff8-7992-9af8-3948ebfc5899?t=11792", social: ["https://www.youtube.com/shorts/5GEkM3P_qkM", "https://www.tiktok.com/@marianaar32_/video/7676387931581336853", "https://www.instagram.com/reel/DcS2O6FI8jV/"], wishlist: true, launchDay: true, publicViews: null },
  { creator: "GirlWhoPlays", tier: "Silver", partner: false, followers: 4988, topPct: 0.62, langRank: 2620, language: "Spanish", avgViewers: 70, peakViewers: 86, hours: "2h35", hoursNum: 2.583, viewerHours: 180.8, vod: "https://www.twitch.tv/videos/2851945966?t=01h03m13s", social: [], wishlist: true, launchDay: true, publicViews: null },
  { creator: "fleapuff", tier: "Gold", partner: true, followers: 5294, topPct: 0.72, langRank: 23214, language: "English", avgViewers: 57, peakViewers: 65, hours: "2h15", hoursNum: 2.25, viewerHours: 128.3, vod: "https://www.twitch.tv/videos/2851724234", social: ["https://x.com/fleapuff/status/2090585180587065815"], wishlist: true, launchDay: true, publicViews: null },
  { creator: "SchrodingerKitten", tier: "Silver", partner: false, followers: 2626, topPct: 1.48, langRank: 5213, language: "French", avgViewers: 15, peakViewers: 18, hours: "2h30", hoursNum: 2.5, viewerHours: 37.5, vod: "https://www.twitch.tv/videos/2851566469?t=00h10m43s", social: [], wishlist: true, launchDay: true, publicViews: null },
  { creator: "UndoubtedlyLink", tier: "Silver", partner: false, followers: 2239, topPct: 1.52, langRank: 50901, language: "English", avgViewers: 18, peakViewers: 28, hours: "2h43", hoursNum: 2.717, viewerHours: 48.9, vod: "https://www.twitch.tv/videos/2851677597", social: ["https://x.com/UndoubtedlyLink/status/2090573269694828639"], wishlist: true, launchDay: true, publicViews: null },
  { creator: "Eryuyu", tier: "Silver", partner: false, followers: 5113, topPct: 1.19, langRank: 4988, language: "Spanish", avgViewers: 23, peakViewers: 35, hours: "2h59", hoursNum: 2.983, viewerHours: 68.6, vod: "https://www.twitch.tv/videos/2851663361", social: [], wishlist: true, launchDay: true, publicViews: null },
  { creator: "Foythtv", tier: "Silver", partner: true, followers: 10840, topPct: 0.12, langRank: 422, language: "Portuguese", avgViewers: 55, peakViewers: 73, hours: "2h04", hoursNum: 2.067, viewerHours: 113.7, vod: "https://www.twitch.tv/videos/2851624998", social: [], wishlist: true, launchDay: true, publicViews: null },
  { creator: "saremugames", tier: "Gold", partner: true, followers: 4177, topPct: 0.6, langRank: 19233, language: "English", avgViewers: 50, peakViewers: 65, hours: "3h50", hoursNum: 3.833, viewerHours: 191.7, vod: "https://www.twitch.tv/videos/2851414951", social: ["https://www.instagram.com/p/DcRmrewOQSr/"], wishlist: true, launchDay: true, publicViews: null },
  { creator: "ShockAndAwh", tier: "Bronze", partner: false, followers: 1055, topPct: 3.5, langRank: 121868, language: "English", avgViewers: 11, peakViewers: 12, hours: "2h24", hoursNum: 2.4, viewerHours: 26.4, vod: "https://www.twitch.tv/videos/2851656853", social: [], wishlist: true, launchDay: true, publicViews: null },
  { creator: "iowacountry21", tier: "Bronze", partner: false, followers: 325, topPct: 6.57, langRank: 233092, language: "English", avgViewers: 7, peakViewers: 8, hours: "3h34", hoursNum: 3.567, viewerHours: 25.0, vod: "https://www.twitch.tv/videos/2854353544", social: ["https://www.tiktok.com/@iacountry/video/7676633189615406366"], wishlist: true, launchDay: false, publicViews: null },
  { creator: "jemplfg", tier: "Silver", partner: false, followers: 668, topPct: 2.57, langRank: 88147, language: "English", avgViewers: 19, peakViewers: 27, hours: "2h36", hoursNum: 2.6, viewerHours: 49.4, vod: "https://www.twitch.tv/videos/2852716742", social: ["https://www.reddit.com/r/JempGames/comments/1vvyers/ground_zero_hero/"], wishlist: true, launchDay: true, publicViews: null },
  { creator: "Savage_Kai", tier: "Bronze", partner: false, followers: 1500, topPct: 1.98, langRank: 67113, language: "English", avgViewers: 11, peakViewers: 15, hours: "1h38", hoursNum: 1.633, viewerHours: 18.0, vod: "https://www.twitch.tv/videos/2852528295", social: [], wishlist: true, launchDay: true, publicViews: null },
  { creator: "NacaratTV", tier: "Bronze", partner: false, followers: 554, topPct: 3.34, langRank: 11763, language: "French", avgViewers: 16, peakViewers: 18, hours: "1h44", hoursNum: 1.733, viewerHours: 27.7, vod: "https://www.twitch.tv/videos/2853531358", social: [], wishlist: true, launchDay: false, publicViews: null },
  { creator: "J0SH", tier: "Gold", partner: true, followers: 3200, topPct: 0.29, langRank: 9016, language: "English", avgViewers: 112, peakViewers: 121, hours: "2h30", hoursNum: 2.5, viewerHours: 280.0, vod: "https://www.twitch.tv/videos/2852763452", social: ["https://www.youtube.com/shorts/CnsR5owtnwk"], wishlist: true, launchDay: true, publicViews: null },
  { creator: "Gladiator50n", tier: "Silver", partner: false, followers: 3100, topPct: 0.61, langRank: 19568, language: "English", avgViewers: 31, peakViewers: 35, hours: "2h18", hoursNum: 2.3, viewerHours: 71.3, vod: "https://www.twitch.tv/videos/2851805628", social: ["https://www.tiktok.com/@gladiator50n/video/7676811995802275085"], wishlist: true, launchDay: true, publicViews: null },
  { creator: "LunariValkyrie", tier: "Silver", partner: true, followers: 16200, topPct: 0.87, langRank: 28093, language: "English", avgViewers: 19, peakViewers: 24, hours: "2h20", hoursNum: 2.333, viewerHours: 44.3, vod: "https://www.twitch.tv/videos/2853058464?t=03h55m51s", social: ["https://www.tiktok.com/@lunarivalkyrie/video/7676790076088585486"], wishlist: true, launchDay: true, publicViews: null },
  { creator: "LordacrisPlays", tier: "Silver", partner: false, followers: 1300, topPct: 0.79, langRank: 25639, language: "English", avgViewers: 27, peakViewers: 33, hours: "3h55", hoursNum: 3.917, viewerHours: 105.8, vod: "https://www.twitch.tv/videos/2852571181?t=1h56m42s", social: [], wishlist: true, launchDay: true, publicViews: null },
  { creator: "EnguyTV", tier: "Silver", partner: false, followers: 1300, topPct: 3.41, langRank: 12072, language: "French", avgViewers: 19, peakViewers: 34, hours: "2h44", hoursNum: 2.733, viewerHours: 51.9, vod: "https://www.twitch.tv/videos/2852335365", social: ["https://www.tiktok.com/@enguyclip/video/7676629531893026081"], wishlist: true, launchDay: true, publicViews: null },
  { creator: "Adwuin", tier: "Silver", partner: false, followers: 4800, topPct: 1.26, langRank: 4489, language: "French", avgViewers: 15, peakViewers: 18, hours: "2h15", hoursNum: 2.25, viewerHours: 33.8, vod: "https://www.twitch.tv/videos/2852251833?t=4h8m13s", social: [], wishlist: true, launchDay: true, publicViews: null },
  { creator: "Eyklor", tier: "Silver", partner: false, followers: 606, topPct: 1.6, langRank: 5707, language: "French", avgViewers: 31, peakViewers: 54, hours: "2h05", hoursNum: 2.083, viewerHours: 64.6, vod: "https://www.twitch.tv/videos/2852320666", social: [], wishlist: true, launchDay: true, publicViews: null },
  { creator: "SadWrathProduction", tier: "Silver", partner: false, followers: 1400, topPct: 0.9, langRank: 3264, language: "French", avgViewers: 16, peakViewers: 23, hours: "2h15", hoursNum: 2.25, viewerHours: 36.0, vod: "https://www.twitch.tv/videos/2852193512", social: ["https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDcxNDk5NjQ2OTk5OTY0?story_media_id=3968652655408752579_60458416357&igsi=ZDAwNzU4OW5ieWI0"], wishlist: true, launchDay: true, publicViews: null },
  { creator: "Phenexa", tier: "Silver", partner: false, followers: 3600, topPct: 1.56, langRank: 52321, language: "English", avgViewers: 20, peakViewers: 29, hours: "3h15", hoursNum: 3.25, viewerHours: 65.0, vod: "https://www.twitch.tv/videos/2851676615?t=00h26m32s", social: [], wishlist: true, launchDay: true, publicViews: null },
  { creator: "SOGAeon", tier: "Gold", partner: true, followers: 26077, topPct: 0.13, langRank: 4164, language: "English", avgViewers: 138, peakViewers: 179, hours: "3h36", hoursNum: 3.6, viewerHours: 496.8, vod: "https://www.twitch.tv/videos/2858477009", social: ["https://x.com/SOGAeon/status/2093241859414098083"], wishlist: true, launchDay: false, publicViews: null },
  { creator: "UmbritaC", tier: "Silver", partner: false, followers: 2756, topPct: 2.91, langRank: 145, language: "Romanian", avgViewers: 17, peakViewers: 20, hours: "2h15", hoursNum: 2.25, viewerHours: 38.3, vod: "https://www.twitch.tv/videos/2851580466?t=1h6m15s", social: ["https://x.com/UmbritaC/status/2089625848252961086"], wishlist: true, launchDay: false, publicViews: 2200 },
  { creator: "azano__", tier: "Silver", partner: true, followers: 11909, topPct: 0.32, langRank: 1285, language: "French", avgViewers: 47, peakViewers: 62, hours: "2h35", hoursNum: 2.583, viewerHours: 121.4, vod: "https://www.twitch.tv/videos/2864105966?t=3h10m49s", social: [], wishlist: true, launchDay: false, publicViews: null },
];
