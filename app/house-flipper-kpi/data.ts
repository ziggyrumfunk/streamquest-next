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
  socialPost: boolean;
};

/**
 * Trial campaign — 10 creators ending with Paildry.
 * Source: client brief (Creator Performance Overview table).
 */
export const rows: HouseFlipperRow[] = [
  { creator: "UndoubtedlyLink", language: "English", tier: "Silver", followers: 2235, avgCcv: 30, peakViewers: 34, streamTime: "1h",    streamHours: 1.00, viewerHours: 30.0, socialPost: true },
  { creator: "Haouanubis",      language: "English", tier: "Silver", followers: 541,  avgCcv: 13, peakViewers: 20, streamTime: "1h 40", streamHours: 1.67, viewerHours: 21.7, socialPost: true },
  { creator: "bumquackza",      language: "English", tier: "Bronze", followers: 300,  avgCcv: 10, peakViewers: 14, streamTime: "6h 50", streamHours: 6.83, viewerHours: 68.3, socialPost: true },
  { creator: "Gladiator50n",    language: "English", tier: "Silver", followers: 2771, avgCcv: 27, peakViewers: 35, streamTime: "1h 35", streamHours: 1.58, viewerHours: 42.8, socialPost: true },
  { creator: "Silent_genius",   language: "French",  tier: "Silver", followers: 272,  avgCcv: 18, peakViewers: 25, streamTime: "2h 25", streamHours: 2.42, viewerHours: 43.5, socialPost: true },
  { creator: "Phenexa",         language: "English", tier: "Silver", followers: 3581, avgCcv: 20, peakViewers: 23, streamTime: "3h 01", streamHours: 3.02, viewerHours: 60.3, socialPost: true },
  { creator: "Labsy",           language: "French",  tier: "Silver", followers: 685,  avgCcv: 12, peakViewers: 15, streamTime: "3h 38", streamHours: 3.63, viewerHours: 43.6, socialPost: true },
  { creator: "Capsuhi",         language: "French",  tier: "Bronze", followers: 382,  avgCcv: 8,  peakViewers: 9,  streamTime: "3h 12", streamHours: 3.20, viewerHours: 25.6, socialPost: true },
  { creator: "BBrisita",        language: "Spanish", tier: "Bronze", followers: 2420, avgCcv: 6,  peakViewers: 6,  streamTime: "1h 45", streamHours: 1.75, viewerHours: 10.5, socialPost: true },
  { creator: "Paildry",         language: "German",  tier: "Silver", followers: 806,  avgCcv: 17, peakViewers: 21, streamTime: "2h 40", streamHours: 2.67, viewerHours: 45.3, socialPost: true },
];
