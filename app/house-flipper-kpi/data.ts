export type SocialPlatform = "x" | "instagram" | "youtube" | "";

export type HouseFlipperRow = {
  creator: string;
  language: "English" | "French" | "Spanish" | "German";
  tier: "Silver" | "Bronze";
  followers: number;
  avgCcv: number;
  peakViewers: number;
  streamTime: string;
  streamHours: number;       // numeric for sorting
  viewerHours: number;
  // Links
  vodUrl: string;            // Twitch VOD
  twitchtrackerUrl: string;  // Twitchtracker stats
  socialUrl: string;         // Social post (X / Instagram / YouTube)
  socialPlatform: SocialPlatform;
};

/**
 * Trial campaign — 10 creators ending with Paildry.
 * VOD + social links pulled directly from the WinterUpdate sheet.
 */
export const rows: HouseFlipperRow[] = [
  {
    creator: "UndoubtedlyLink", language: "English", tier: "Silver",
    followers: 2235, avgCcv: 30, peakViewers: 34,
    streamTime: "1h", streamHours: 1.00, viewerHours: 30.0,
    vodUrl: "https://www.twitch.tv/videos/2788697324?t=0h0m1s",
    twitchtrackerUrl: "https://twitchtracker.com/undoubtedlylink/games/607318022",
    socialUrl: "https://x.com/UndoubtedlyLink/status/2062647078585606304",
    socialPlatform: "x",
  },
  {
    creator: "Haouanubis", language: "English", tier: "Silver",
    followers: 541, avgCcv: 13, peakViewers: 20,
    streamTime: "1h 40", streamHours: 1.67, viewerHours: 21.7,
    vodUrl: "https://www.twitch.tv/videos/2789651010?t=0h0m1s",
    twitchtrackerUrl: "https://twitchtracker.com/haouanubis/streams/316923965284",
    socialUrl: "https://www.instagram.com/p/DZK-9lnPcaX/",
    socialPlatform: "instagram",
  },
  {
    creator: "bumquackza", language: "English", tier: "Bronze",
    followers: 300, avgCcv: 10, peakViewers: 14,
    streamTime: "6h 50", streamHours: 6.83, viewerHours: 68.3,
    vodUrl: "https://www.twitch.tv/videos/2789341205?t=0h0m1s",
    twitchtrackerUrl: "https://twitchtracker.com/bumquackza/games/607318022",
    socialUrl: "https://www.youtube.com/watch?v=Hy0BR3UohwU",
    socialPlatform: "youtube",
  },
  {
    creator: "Gladiator50n", language: "English", tier: "Silver",
    followers: 2771, avgCcv: 27, peakViewers: 35,
    streamTime: "1h 35", streamHours: 1.58, viewerHours: 42.8,
    vodUrl: "https://www.twitch.tv/videos/2789096781",
    twitchtrackerUrl: "https://twitchtracker.com/gladiator50n/streams/318969489760",
    socialUrl: "https://x.com/Gladiator50n/status/2062937934194422166",
    socialPlatform: "x",
  },
  {
    creator: "Silent_genius", language: "French", tier: "Silver",
    followers: 272, avgCcv: 18, peakViewers: 25,
    streamTime: "2h 25", streamHours: 2.42, viewerHours: 43.5,
    vodUrl: "https://www.twitch.tv/videos/2788566942?t=0h0m1s",
    twitchtrackerUrl: "https://twitchtracker.com/silent_genius/games/607318022",
    socialUrl: "",
    socialPlatform: "",
  },
  {
    creator: "Phenexa", language: "English", tier: "Silver",
    followers: 3581, avgCcv: 20, peakViewers: 23,
    streamTime: "3h 01", streamHours: 3.02, viewerHours: 60.3,
    vodUrl: "https://www.twitch.tv/videos/2789426262?t=0h0m1s",
    twitchtrackerUrl: "https://twitchtracker.com/phenexa/streams/317370040295",
    socialUrl: "https://x.com/OfficialPhenexa/status/2062974049920196781",
    socialPlatform: "x",
  },
  {
    creator: "Labsy", language: "French", tier: "Silver",
    followers: 685, avgCcv: 12, peakViewers: 15,
    streamTime: "3h 38", streamHours: 3.63, viewerHours: 43.6,
    vodUrl: "https://www.twitch.tv/videos/2789183109?t=0h0m1s",
    twitchtrackerUrl: "https://twitchtracker.com/labsy/streams/316936938339",
    socialUrl: "https://x.com/Labsytv/status/2062581976029073514",
    socialPlatform: "x",
  },
  {
    creator: "Capsuhi", language: "French", tier: "Bronze",
    followers: 382, avgCcv: 8, peakViewers: 9,
    streamTime: "3h 12", streamHours: 3.20, viewerHours: 25.6,
    vodUrl: "https://www.twitch.tv/videos/2789235050?t=0h0m1s",
    twitchtrackerUrl: "https://twitchtracker.com/capsuhi/streams/316937568227",
    socialUrl: "https://x.com/Capsuhi/status/2062903358403268987",
    socialPlatform: "x",
  },
  {
    creator: "BBrisita", language: "Spanish", tier: "Bronze",
    followers: 2420, avgCcv: 6, peakViewers: 6,
    streamTime: "1h 45", streamHours: 1.75, viewerHours: 10.5,
    vodUrl: "https://www.twitch.tv/videos/2789458117?t=0h0m1s",
    twitchtrackerUrl: "https://twitchtracker.com/bbrisita/games/607318022",
    socialUrl: "https://x.com/xBBrisita/status/2062984860013138090",
    socialPlatform: "x",
  },
  {
    creator: "Paildry", language: "German", tier: "Silver",
    followers: 806, avgCcv: 17, peakViewers: 21,
    streamTime: "2h 40", streamHours: 2.67, viewerHours: 45.3,
    vodUrl: "https://www.twitch.tv/videos/2789314922?t=0h0m1s",
    twitchtrackerUrl: "https://twitchtracker.com/paildry/games/607318022",
    socialUrl: "https://x.com/ZiniADC__/status/2062928428450435178",
    socialPlatform: "x",
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
    default:          return "—";
  }
}
