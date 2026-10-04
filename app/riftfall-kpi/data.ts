// From the final RIFTFALL campaign KPI brief and the "RIFTFALL — Creator Completion List —
// September 2026" workbook (final tracker supplied by Murat, updated 4 Oct 2026).
// 20 completed creators: 19 on Twitch, 1 on Kick. Names follow the linked channel
// (the sheet spells Foythtv, Paschoalin and JempLFG differently).
// hoursNum is the reported RIFTFALL gameplay; viewerHours = hoursNum x avgViewers.
// MarianaAr32's 4h31 Kick stream lacks confirmed RIFTFALL attribution, so she stays in the
// roster, language mix and tier totals but not in the headline gameplay or viewer-hours.
// Deliberately not included: the workbook's KPI Summary tab (net receipts, payment fees,
// internal creator rewards, invoice reference) and its mixed-date, incomplete follower and
// ranking snapshots. J0SH's and Eryuyu's social cells are tracker placeholders, not posts.

export type RfTier = "Gold" | "Silver";

export type RfRow = {
  creator: string;
  /** Tracker identity, where it differs from the display name. */
  handle?: string;
  platform: "Twitch" | "Kick";
  language: string;
  tier: RfTier;
  avgViewers: number;
  peakViewers: number;
  hours: string;
  hoursNum: number;
  /** Estimated watch time; null when the stream is outside the headline totals. */
  viewerHours: number | null;
  /** Main quest proof: a VOD, or a tracker page where no direct VOD was supplied. */
  vod: string;
  vodLabel?: string;
  tracker: string;
  /** Rift Social posts outside Twitch, one URL each. */
  social: string[];
  wishlist: boolean;
  coop: boolean;
  note?: string;
};

/** Audience floor per tier, in average concurrent viewers. */
export const FLOOR: Record<RfTier, number> = { Gold: 50, Silver: 15 };

const h = (s: string) => {
  const [hrs, mins] = s.split("h").map(Number);
  return hrs + mins / 60;
};

const TT = "https://twitchtracker.com";
const VOD = "https://www.twitch.tv/videos";

type Input = Omit<RfRow, "hoursNum" | "viewerHours">;

const input: Input[] = [
  { creator: "TheNoctis90", platform: "Twitch", language: "Spanish", tier: "Gold", avgViewers: 140, peakViewers: 239, hours: "2h16", vod: `${VOD}/2867974154`, tracker: `${TT}/thenoctis90/streams/318846936054`, social: [], wishlist: false, coop: false },
  { creator: "SOGAeon", platform: "Twitch", language: "English", tier: "Gold", avgViewers: 262, peakViewers: 287, hours: "2h00", vod: `${VOD}/2868725155`, tracker: `${TT}/sogaeon/streams/317408142583`, social: ["https://x.com/SOGAeon/status/2097352459043971552"], wishlist: true, coop: false },
  { creator: "LunariValkyrie", platform: "Twitch", language: "English", tier: "Silver", avgViewers: 20, peakViewers: 27, hours: "2h20", vod: `${VOD}/2867546860?t=02h02m23s`, tracker: `${TT}/lunarivalkyrie/streams/317401285111`, social: ["https://www.tiktok.com/@lunarivalkyrie/video/7682690424112237838"], wishlist: true, coop: true },
  { creator: "UndoubtedlyLink", platform: "Twitch", language: "English", tier: "Silver", avgViewers: 23, peakViewers: 25, hours: "2h03", vod: `${VOD}/2867047447`, tracker: `${TT}/undoubtedlylink/streams/318494159205`, social: [], wishlist: true, coop: true },
  { creator: "HaouAnubis", platform: "Twitch", language: "English", tier: "Gold", avgViewers: 50, peakViewers: 86, hours: "2h14", vod: `${VOD}/2867046894`, tracker: `${TT}/haouanubis/streams/317660636770`, social: [], wishlist: true, coop: true },
  { creator: "LordacrisPlays", platform: "Twitch", language: "English", tier: "Silver", avgViewers: 19, peakViewers: 23, hours: "2h20", vod: `${VOD}/2865894491?t=1h11m13s`, tracker: `${TT}/lordacrisplays/streams/317683682915`, social: [], wishlist: true, coop: false },
  {
    creator: "MarianaAr32",
    platform: "Kick",
    language: "Arabic",
    tier: "Gold",
    avgViewers: 23,
    peakViewers: 30,
    hours: "4h31",
    vod: "https://kick.com/marianaar32/videos/01a068f5-98a8-7480-9a03-8475862119cf?t=6823",
    vodLabel: "Kick VOD",
    tracker: "https://kicktracker.net/marianaar32/streams/01a068f5-98a8-7480-9a03-8475862119cf",
    social: [
      "https://www.instagram.com/reel/Dc3lQaSIIFx/",
      "https://www.tiktok.com/@marianaar32_/video/7681682811803274517",
      "https://www.youtube.com/shorts/72X-CW3oFSo",
    ],
    wishlist: true,
    coop: true,
    note: "Full-stream Kick submission without confirmed RIFTFALL attribution, so it is left out of the headline gameplay and viewer-hours.",
  },
  { creator: "SadWrathProduction", platform: "Twitch", language: "French", tier: "Silver", avgViewers: 25, peakViewers: 29, hours: "2h10", vod: `${VOD}/2879344471`, tracker: `${TT}/sadwrathproduction/streams/317811193443`, social: ["https://www.instagram.com/stories/sadswp/3991066023880843168/"], wishlist: true, coop: false, note: "Social proof was an Instagram story, which expires after a day." },
  { creator: "Maveco", platform: "Twitch", language: "Portuguese", tier: "Silver", avgViewers: 24, peakViewers: 28, hours: "2h30", vod: `${VOD}/2877326717?t=1h10m39s`, tracker: `${TT}/maveco/streams/318941472758`, social: [], wishlist: true, coop: true },
  { creator: "IgorBay0", platform: "Twitch", language: "Portuguese", tier: "Silver", avgViewers: 21, peakViewers: 23, hours: "2h05", vod: `${VOD}/2877394256`, tracker: `${TT}/igorbay0/streams/319000152309`, social: ["https://www.youtube.com/shorts/W67q-bhEe5k"], wishlist: true, coop: false },
  { creator: "Genkaku", platform: "Twitch", language: "Portuguese", tier: "Gold", avgViewers: 58, peakViewers: 62, hours: "2h07", vod: `${VOD}/2876118697?t=00h49m59s`, tracker: `${TT}/genkaku/streams/319059351028`, social: ["https://x.com/NWGamesBrasil/status/2100407764124065805"], wishlist: true, coop: false },
  { creator: "Shalalaka", platform: "Twitch", language: "Portuguese", tier: "Gold", avgViewers: 56, peakViewers: 61, hours: "2h25", vod: `${VOD}/2871752543?t=00h00m17s`, tracker: `${TT}/shalalaka/streams/319016517620`, social: ["https://www.tiktok.com/@shalalakacidade/video/7684642814164061460"], wishlist: true, coop: false },
  {
    creator: "GoKatGo",
    platform: "Twitch",
    language: "English",
    tier: "Silver",
    avgViewers: 15,
    peakViewers: 15,
    hours: "2h00",
    vod: `${VOD}/2871392751`,
    tracker: `${TT}/gokatgo`,
    social: ["https://www.instagram.com/reel/DdKqKFrK5Fr/"],
    wishlist: true,
    coop: true,
    note: "Profile-level tracker link, so the aggregate is reported as supplied.",
  },
  { creator: "Adwuin", platform: "Twitch", language: "French", tier: "Silver", avgViewers: 15, peakViewers: 19, hours: "2h15", vod: `${VOD}/2880797347?t=10h4m33s`, tracker: `${TT}/adwuin/streams/317792549730`, social: [], wishlist: true, coop: false },
  { creator: "Foythtv", platform: "Twitch", language: "Portuguese", tier: "Silver", avgViewers: 36, peakViewers: 50, hours: "2h15", vod: `${VOD}/2882083306`, tracker: `${TT}/foythtv/games/1759318410`, social: [], wishlist: true, coop: true },
  {
    creator: "Paschoalin",
    platform: "Twitch",
    language: "Portuguese",
    tier: "Silver",
    avgViewers: 17,
    peakViewers: 21,
    hours: "4h21",
    vod: `${VOD}/2882208191?t=00h23m34s`,
    tracker: `${TT}/paschoalin/streams/319045439221`,
    social: ["https://www.instagram.com/p/DducrX2R3eC/"],
    wishlist: true,
    coop: true,
    note: "Longest verified RIFTFALL session, categorised as RIFTFALL throughout on TwitchTracker.",
  },
  { creator: "JempLFG", platform: "Twitch", language: "English", tier: "Silver", avgViewers: 18, peakViewers: 24, hours: "2h13", vod: `${VOD}/2875283006`, tracker: `${TT}/jemplfg/games/1759318410`, social: ["https://www.reddit.com/r/JempGames/comments/1wqf53d/lets_support_riftfall/"], wishlist: true, coop: true },
  {
    creator: "LoupScar",
    platform: "Twitch",
    language: "English",
    tier: "Gold",
    avgViewers: 97,
    peakViewers: 118,
    hours: "2h00",
    vod: `${TT}/loupscar/streams/317870716516`,
    vodLabel: "Tracker",
    tracker: `${TT}/loupscar/streams/317870716516`,
    social: ["https://www.instagram.com/reels/Dd1lqXosceC/"],
    wishlist: true,
    coop: true,
    note: "Main quest submitted as a tracker entry rather than a direct VOD.",
  },
  { creator: "J0SH", handle: "J0sh4269", platform: "Twitch", language: "English", tier: "Gold", avgViewers: 69, peakViewers: 94, hours: "2h00", vod: `${VOD}/2887669243?t=02h36m23s`, tracker: `${TT}/j0sh/streams/320581860576`, social: [], wishlist: true, coop: false },
  { creator: "Eryuyu", platform: "Twitch", language: "Spanish", tier: "Silver", avgViewers: 26, peakViewers: 31, hours: "2h00", vod: `${VOD}/2888238977?t=01h56m59s`, tracker: `${TT}/eryuyu/games/1759318410`, social: [], wishlist: true, coop: true },
];

export const rows: RfRow[] = input.map((r) => {
  const hoursNum = h(r.hours);
  return {
    ...r,
    hoursNum,
    viewerHours: r.platform === "Twitch" ? Math.round(hoursNum * r.avgViewers * 10) / 10 : null,
  };
});

/** Average viewers as a multiple of the tier's audience floor. */
export const floorMultiple = (r: RfRow) => r.avgViewers / FLOOR[r.tier];
