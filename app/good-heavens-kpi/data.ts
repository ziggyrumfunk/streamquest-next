export type SocialPlatform = "x" | "instagram" | "youtube" | "tiktok" | "";

export type GoodHeavensRow = {
  creator: string;
  language: "English" | "French" | "Portuguese" | "Spanish" | "German" | "Romanian" | "Arabic";
  tier: "Silver" | "Bronze";
  followers: number;
  topPct: number;            // TwitchTracker global ranking, as a fraction (0.0132 = top 1.32%)
  rank: string;              // Stream-language rank, e.g. "#40,465"
  avgViewers: number;        // campaign average viewers during the stream
  peakViewers: number;
  streamTime: string;        // display string, e.g. "2h02"
  streamHours: number;       // numeric for sorting
  spend: number;             // EUR paid to the creator (0 = Bronze overperformance above the paid cap)
  partner: boolean;          // Twitch Partner status
  // Links
  vodUrl: string;            // Twitch VOD
  twitchtrackerUrl: string;  // TwitchTracker stats
  socialUrl: string;         // Outside-Twitch social post
  socialPlatform: SocialPlatform;
};

/**
 * Good Heavens! creator campaign — 29 completed creators.
 * Source: "Good Heavens - Creator List - updated.xlsx" (WinterUpdate sheet).
 * One tracked creator (Game_Matter_) did not complete and is excluded.
 */
export const rows: GoodHeavensRow[] = [
  {
    creator: "UndoubtedlyLink", language: "English", tier: "Silver",
    followers: 2246, topPct: 0.0132, rank: "#40,465",
    avgViewers: 30, peakViewers: 35, streamTime: "2h02", streamHours: 2.03, spend: 50, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2799073977",
    twitchtrackerUrl: "https://twitchtracker.com/undoubtedlylink/streams/317639833061",
    socialUrl: "https://x.com/UndoubtedlyLink/status/2067375221531677126", socialPlatform: "x",
  },
  {
    creator: "Phenexa", language: "English", tier: "Silver",
    followers: 3583, topPct: 0.0142, rank: "#43,594",
    avgViewers: 23, peakViewers: 28, streamTime: "3h10", streamHours: 3.17, spend: 50, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2798224091?t=00h41m13s",
    twitchtrackerUrl: "https://twitchtracker.com/phenexa/streams/317629190501",
    socialUrl: "https://youtube.com/shorts/fWHSCLsa1Kw", socialPlatform: "youtube",
  },
  {
    creator: "Foyhtv", language: "Portuguese", tier: "Silver",
    followers: 9961, topPct: 0.0025, rank: "#894",
    avgViewers: 65, peakViewers: 88, streamTime: "4h10", streamHours: 4.17, spend: 50, partner: true,
    vodUrl: "https://www.twitch.tv/videos/2797344825",
    twitchtrackerUrl: "https://twitchtracker.com/foythtv/games/418679792",
    socialUrl: "", socialPlatform: "",
  },
  {
    creator: "SOGAeon", language: "English", tier: "Silver",
    followers: 25608, topPct: 0.0017, rank: "#4,753",
    avgViewers: 172, peakViewers: 180, streamTime: "1h", streamHours: 1.0, spend: 50, partner: true,
    vodUrl: "https://www.twitch.tv/videos/2798570341?t=6h13m30s",
    twitchtrackerUrl: "https://twitchtracker.com/sogaeon/streams/317404686424",
    socialUrl: "", socialPlatform: "",
  },
  {
    creator: "fleapuff", language: "English", tier: "Silver",
    followers: 5262, topPct: 0.0046, rank: "#13,122",
    avgViewers: 75, peakViewers: 83, streamTime: "2h15", streamHours: 2.25, spend: 50, partner: true,
    vodUrl: "https://www.twitch.tv/videos/2799844551",
    twitchtrackerUrl: "https://twitchtracker.com/fleapuff/games/418679792",
    socialUrl: "https://www.youtube.com/shorts/IkSaczS9Oos", socialPlatform: "youtube",
  },
  {
    creator: "SchrodingerKitten", language: "French", tier: "Silver",
    followers: 2561, topPct: 0.0159, rank: "#5,362",
    avgViewers: 17, peakViewers: 23, streamTime: "2h33", streamHours: 2.55, spend: 50, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2798145883?t=00h09m46s",
    twitchtrackerUrl: "https://twitchtracker.com/schrodingerkitten/games/418679792",
    socialUrl: "", socialPlatform: "",
  },
  {
    creator: "Eryuyu", language: "Spanish", tier: "Silver",
    followers: 5096, topPct: 0.0138, rank: "#5,416",
    avgViewers: 22, peakViewers: 27, streamTime: "3h", streamHours: 3.0, spend: 50, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2798200982",
    twitchtrackerUrl: "https://twitchtracker.com/eryuyu/games/418679792",
    socialUrl: "https://www.youtube.com/live/R4PvdWtpKlg", socialPlatform: "youtube",
  },
  {
    creator: "Velko_live", language: "English", tier: "Silver",
    followers: 1090, topPct: 0.0223, rank: "#70,020",
    avgViewers: 15, peakViewers: 15, streamTime: "3h", streamHours: 3.0, spend: 50, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2801905717",
    twitchtrackerUrl: "https://twitchtracker.com/velko_live/streams/317665658725",
    socialUrl: "https://x.com/VelizarPetrov2/status/2068659429646483951", socialPlatform: "x",
  },
  {
    creator: "Adwuin", language: "French", tier: "Silver",
    followers: 4750, topPct: 0.0197, rank: "#6,644",
    avgViewers: 17, peakViewers: 19, streamTime: "2h05", streamHours: 2.08, spend: 50, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2798730560",
    twitchtrackerUrl: "https://twitchtracker.com/adwuin/games/418679792",
    socialUrl: "https://youtube.com/shorts/BjRisTzGi4Q", socialPlatform: "youtube",
  },
  {
    creator: "Drowsbicycle", language: "English", tier: "Bronze",
    followers: 959, topPct: 0.0214, rank: "#67,140",
    avgViewers: 5, peakViewers: 5, streamTime: "1h04", streamHours: 1.07, spend: 20, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2800162421",
    twitchtrackerUrl: "https://twitchtracker.com/drowsybicycle/streams/319854799705",
    socialUrl: "", socialPlatform: "",
  },
  {
    creator: "Labsy", language: "French", tier: "Bronze",
    followers: 682, topPct: 0.0455, rank: "#15,574",
    avgViewers: 7, peakViewers: 7, streamTime: "1h30", streamHours: 1.5, spend: 20, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2801118569",
    twitchtrackerUrl: "https://twitchtracker.com/labsy/streams/317060489955",
    socialUrl: "", socialPlatform: "",
  },
  {
    creator: "Gladiator50n", language: "English", tier: "Silver",
    followers: 2811, topPct: 0.0093, rank: "#27,861",
    avgViewers: 23, peakViewers: 38, streamTime: "2h26", streamHours: 2.43, spend: 50, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2801117891",
    twitchtrackerUrl: "https://twitchtracker.com/gladiator50n/streams/319046560094",
    socialUrl: "https://www.tiktok.com/@gladiator50n/video/7653434460091714830", socialPlatform: "tiktok",
  },
  {
    creator: "UmbritaC", language: "Romanian", tier: "Silver",
    followers: 2765, topPct: 0.0263, rank: "#112",
    avgViewers: 20, peakViewers: 25, streamTime: "2h05", streamHours: 2.08, spend: 50, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2801092400?t=0h0m1s",
    twitchtrackerUrl: "https://twitchtracker.com/umbritac/streams/317519585383",
    socialUrl: "", socialPlatform: "",
  },
  {
    creator: "LordacrisPlays", language: "English", tier: "Silver",
    followers: 1085, topPct: 0.0092, rank: "#27,576",
    avgViewers: 20, peakViewers: 24, streamTime: "2h20", streamHours: 2.33, spend: 50, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2797421309?t=1h3m58s",
    twitchtrackerUrl: "https://twitchtracker.com/lordacrisplays/streams/315674950482",
    socialUrl: "", socialPlatform: "",
  },
  {
    creator: "Shalalaka", language: "Portuguese", tier: "Silver",
    followers: 14141, topPct: 0.0044, rank: "#1,588",
    avgViewers: 44, peakViewers: 47, streamTime: "2h10", streamHours: 2.17, spend: 50, partner: true,
    vodUrl: "https://www.twitch.tv/videos/2797243164?t=05h37m37s",
    twitchtrackerUrl: "https://twitchtracker.com/shalalaka/streams/318144270582",
    socialUrl: "", socialPlatform: "",
  },
  {
    creator: "Paschoalin", language: "Portuguese", tier: "Silver",
    followers: 4830, topPct: 0.0141, rank: "#5,068",
    avgViewers: 17, peakViewers: 27, streamTime: "4h15", streamHours: 4.25, spend: 50, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2797528747?t=00h39m38s",
    twitchtrackerUrl: "https://twitchtracker.com/paschoalin/streams/318218676085",
    socialUrl: "https://www.instagram.com/p/DZqH7F9RLUE/", socialPlatform: "instagram",
  },
  {
    creator: "InuYashaEdwina", language: "English", tier: "Bronze",
    followers: 1353, topPct: 0.0272, rank: "#86,576",
    avgViewers: 10, peakViewers: 13, streamTime: "3h10", streamHours: 3.17, spend: 20, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2797504892",
    twitchtrackerUrl: "https://twitchtracker.com/inuyashaedwina/streams/319962358619",
    socialUrl: "https://www.instagram.com/reels/DZp6L9DgGkI/", socialPlatform: "instagram",
  },
  {
    creator: "ziniadc_", language: "English", tier: "Bronze",
    followers: 2129, topPct: 0.0731, rank: "#239,993",
    avgViewers: 7, peakViewers: 9, streamTime: "2h28", streamHours: 2.47, spend: 20, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2800533848",
    twitchtrackerUrl: "https://twitchtracker.com/ziniadc_/streams/317513592295",
    socialUrl: "https://www.instagram.com/p/DZx_JviERe9/", socialPlatform: "instagram",
  },
  {
    creator: "Silent_Genius", language: "French", tier: "Silver",
    followers: 275, topPct: 0.0327, rank: "#11,077",
    avgViewers: 10, peakViewers: 20, streamTime: "3h", streamHours: 3.0, spend: 50, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2797393103",
    twitchtrackerUrl: "https://twitchtracker.com/silent_genius/streams/317006127332",
    socialUrl: "", socialPlatform: "",
  },
  {
    creator: "SadWrathProduction", language: "French", tier: "Silver",
    followers: 1402, topPct: 0.0077, rank: "#2,690",
    avgViewers: 28, peakViewers: 36, streamTime: "2h15", streamHours: 2.25, spend: 50, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2798729367",
    twitchtrackerUrl: "https://twitchtracker.com/sadwrathproduction/games/418679792",
    socialUrl: "https://www.instagram.com/reel/DZsGxxCsmoi/", socialPlatform: "instagram",
  },
  {
    creator: "beacan_", language: "English", tier: "Bronze",
    followers: 763, topPct: 0.0414, rank: "#134,371",
    avgViewers: 12, peakViewers: 14, streamTime: "1h36", streamHours: 1.6, spend: 20, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2797320955",
    twitchtrackerUrl: "https://twitchtracker.com/beacan_/streams/316232198613",
    socialUrl: "", socialPlatform: "",
  },
  {
    creator: "Teecups", language: "English", tier: "Bronze",
    followers: 1543, topPct: 0.0186, rank: "#57,953",
    avgViewers: 9, peakViewers: 11, streamTime: "2h", streamHours: 2.0, spend: 0, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2797808400",
    twitchtrackerUrl: "https://twitchtracker.com/teecups/streams/318137996503",
    socialUrl: "", socialPlatform: "",
  },
  {
    creator: "Teteia", language: "Portuguese", tier: "Silver",
    followers: 76084, topPct: 0.0017, rank: "#601",
    avgViewers: 170, peakViewers: 225, streamTime: "2h30", streamHours: 2.5, spend: 50, partner: true,
    vodUrl: "https://www.twitch.tv/videos/2799545176?t=02h30m25s",
    twitchtrackerUrl: "https://twitchtracker.com/teteia/streams/318239008629",
    socialUrl: "", socialPlatform: "",
  },
  {
    creator: "LunariValkyrie", language: "English", tier: "Silver",
    followers: 16207, topPct: 0.0067, rank: "#19,660",
    avgViewers: 17, peakViewers: 20, streamTime: "2h30", streamHours: 2.5, spend: 50, partner: true,
    vodUrl: "https://www.twitch.tv/videos/2800921739?t=14h45m36s",
    twitchtrackerUrl: "https://twitchtracker.com/lunarivalkyrie/streams/318183822167",
    socialUrl: "https://www.tiktok.com/@lunarivalkyrie/video/7653577528921099533", socialPlatform: "tiktok",
  },
  {
    creator: "ShrillGoblin", language: "English", tier: "Bronze",
    followers: 1166, topPct: 0.0288, rank: "#91,739",
    avgViewers: 10, peakViewers: 12, streamTime: "2h33", streamHours: 2.55, spend: 0, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2800071541",
    twitchtrackerUrl: "https://twitchtracker.com/shrillgoblin/streams/319160542560",
    socialUrl: "https://x.com/Skye_McCloud/status/2067769143462375794", socialPlatform: "x",
  },
  {
    creator: "MEGthe1andOnly", language: "English", tier: "Silver",
    followers: 4305, topPct: 0.0444, rank: "#144,551",
    avgViewers: 15, peakViewers: 29, streamTime: "4h03", streamHours: 4.05, spend: 50, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2799924094",
    twitchtrackerUrl: "https://twitchtracker.com/megthe1andonly/streams/319157062624",
    socialUrl: "https://www.instagram.com/reel/DZwCjAJtEpg/", socialPlatform: "instagram",
  },
  {
    creator: "MarianaAr32", language: "Arabic", tier: "Silver",
    followers: 3550, topPct: 0.0048, rank: "#218",
    avgViewers: 79, peakViewers: 99, streamTime: "1h", streamHours: 1.0, spend: 50, partner: true,
    vodUrl: "https://www.twitch.tv/videos/2802196669?t=2h10m32s",
    twitchtrackerUrl: "https://twitchtracker.com/benouxalis/streams/317053857124",
    socialUrl: "https://www.instagram.com/reel/DZ3bLv1juLc/", socialPlatform: "instagram",
  },
  {
    creator: "Paildry", language: "German", tier: "Silver",
    followers: 802, topPct: 0.0199, rank: "#8,733",
    avgViewers: 20, peakViewers: 24, streamTime: "2h06", streamHours: 2.1, spend: 50, partner: false,
    vodUrl: "https://www.twitch.tv/videos/2802788528",
    twitchtrackerUrl: "https://twitchtracker.com/paildry/streams/317760592486",
    socialUrl: "https://x.com/Paildry/status/2069129710974493112", socialPlatform: "x",
  },
  {
    creator: "Genkaku", language: "Portuguese", tier: "Silver",
    followers: 36306, topPct: 0.0053, rank: "#1,968",
    avgViewers: 399, peakViewers: 540, streamTime: "3h09", streamHours: 3.15, spend: 50, partner: true,
    vodUrl: "https://www.twitch.tv/videos/2762403097?t=0h54m43s",
    twitchtrackerUrl: "https://twitchtracker.com/genkaku/streams/317867377013",
    socialUrl: "", socialPlatform: "",
  },
];

/** Extract numeric Twitch video ID from a /videos/12345 URL. */
export function twitchVideoId(url: string): string | null {
  const m = url.match(/twitch\.tv\/videos\/(\d+)/);
  return m ? m[1] : null;
}

/** Pretty label for a social platform pill. */
export function socialPlatformLabel(p: SocialPlatform): string {
  switch (p) {
    case "x":         return "X / Twitter";
    case "instagram": return "Instagram";
    case "youtube":   return "YouTube";
    case "tiktok":    return "TikTok";
    default:          return "—";
  }
}

/** Short badge text for a social platform. */
export function socialPlatformBadge(p: SocialPlatform): string {
  switch (p) {
    case "x":         return "X";
    case "instagram": return "IG";
    case "youtube":   return "YT";
    case "tiktok":    return "TT";
    default:          return "—";
  }
}
