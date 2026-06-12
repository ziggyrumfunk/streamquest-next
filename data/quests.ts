/**
 * StreamQuest — single source of truth for every quest.
 *
 * Adding a new quest? Just append an entry below.
 * Flipping active → completed? Change `status`.
 *
 * The homepage active-cards + library grid AND the header's
 * Active/Past dropdowns both read from this file.
 */

export type QuestTier = {
  name: string;                  // "Bronze", "Silver"
  payout: string;                // headline "€10"
  rate?: string;                 // "€10 / hr"
  rateNote?: string;             // "€20 total (2 × €10)"
  requirement: string;           // "Stream 1 hour, 5 CCV"
  sideQuestsRequired?: boolean;
  freeCopy?: boolean;
};

export type QuestStatus = "active" | "completed";

/** Named side quest with description, optional XP value for rich active-quest cards. */
export type SideQuestDetail = { name: string; desc: string; xp?: number };

/** Two YouTube IDs that drive the tabbed video player on the brief. */
export type QuestVideos = { trailer?: string; brief?: string; briefComingSoon?: boolean };

/** One TL;DR card. `stat` is the big number ("€10", "50", "5d"). */
export type QuestTldrItem = { stat: string; label: string; sub?: string };

/** Social icon platform handled by the icon mapper in the brief. */
export type QuestSocialType =
  | "instagram" | "tiktok" | "youtube" | "discord"
  | "x" | "website" | "bluesky" | "twitch" | "twitter";

export type QuestSocialLink = { type: QuestSocialType; href: string };

/** A grouped brand card (StreamQuest, REPLACED, Thunderful) with its social handles. */
export type QuestAccount = { name: string; hint: string; links: QuestSocialLink[] };

/** A storefront / press / press-hub link with icon. */
export type QuestStoreLink = {
  name: string;
  sub: string;
  href: string;
  icon?: "steam" | "xbox" | "website" | "epic" | "gog";
};

/** One rules paragraph with a header. */
export type QuestRuleBlock = { heading: string; body: string };

/** A How To Join step. Numbering is dropped per design system, only title + sub render. */
export type QuestStep = { title: string; sub: string };

/** Generic key/value pair shown in the hero meta strip ("Duration · 2 weeks"). */
export type QuestHeroMetaItem = { label: string; value: string };

export type Quest = {
  slug: string;                  // URL: /quests/[slug]
  title: string;
  status: QuestStatus;
  studio: string;                // e.g. "Thunderful × Sad Cat Studios"
  studioLogo?: string;
  tagline: string;               // 1 line pitch for cards
  category?: string;             // genre tag
  cover: string;                 // landscape hero image
  portrait?: string;             // 3:4 library-grid image (defaults to cover)
  logo?: string;                 // optional game logo (transparent PNG) for hero-card overlay
  description?: string;          // 2-3 sentence paragraph
  about?: string;                // longer "about the game" paragraph
  keyFeatures?: string[];        // game-feature bullets shown on the brief
  tiers?: QuestTier[];
  /** Simple side quests for completed/legacy quests. */
  sideQuests?: string[];
  /** Named side quest cards for active quests (Social Agent, Completionist, etc). */
  sideQuestDetails?: SideQuestDetail[];
  rules?: string[];
  freeCopy?: boolean;
  links?: {
    steam?: string;
    trailer?: string;
    official?: string;
    twitch?: string;
    wishlist?: string;
  };
  dates?: { start?: string; end?: string };

  /* ---- Rich active-quest content (all optional, sections render when present) ---- */
  videos?: QuestVideos;
  heroMeta?: QuestHeroMetaItem[];
  tldr?: QuestTldrItem[];
  tldrFootnotes?: string[];
  screenshots?: string[];               // horizontal screenshot strip
  storyParagraphs?: string[];           // multi-paragraph story block
  storyPull?: string;                   // pull-quote string
  storyAside?: string;                  // image URL for split-layout aside
  storyAsideCaption?: string;
  shortDescription?: string;            // longer "short description" paragraph
  sideQuestIntro?: string;              // intro paragraph for side quest section
  sideQuestOutro?: string;              // optional outro after side quest grid
  trackedWishlistUrl?: string;
  trackedWishlistNote?: string;
  gallery?: { wide?: string; thumbs: string[] };
  officialAccounts?: QuestAccount[];
  storeLinks?: QuestStoreLink[];
  platforms?: string[];
  rulesContent?: QuestRuleBlock[];      // richer than `rules: string[]`
  howToJoin?: QuestStep[];              // optional override; defaults to standard six
  rating?: string;                      // "ESRB M (17+) / PEGI 16"
  slots?: number;
  duration?: string;                    // "2 weeks"
};

/* ============================================================
   ACTIVE QUESTS — full detail, fully render on /quests/[slug]
   ============================================================ */

export const quests: Quest[] = [
  {
    slug: "alphanomos",
    title: "Alpha Nomos",
    status: "active",
    studio: "RibCage Games",
    tagline: "Rhythm-based action roguelite. Hack, slash, and feel the beat.",
    category: "Rhythm action roguelite",
    cover: "/media/alpha-nomos/key%20art%20horizontal.webp",
    portrait: "/media/alpha-nomos/key%20art%20vertical.jpg",
    description:
      "Paid creator campaign for the Alpha Nomos demo by RibCage Games. Play live on Twitch, show the rhythm combat, and help more players discover and wishlist Alpha Nomos on Steam.",
    about:
      "Alpha Nomos is a rhythm-based action roguelite where music is part of the fight. Play as Cello, a brave jester exploring a broken world ravaged by music, and help her gang escape a cute but dangerous world filled with murderous puppets, strange characters, and beat-driven combat. Fight to the rhythm. Build your run. Escape the puppet-filled chaos.",
    keyFeatures: [
      "Rhythm-based combat where the action follows the beat. Easy for viewers to read on stream.",
      "Roguelite progression with musical upgrades and build variety per run.",
      "Cello and her gang versus a world of murderous puppets. Strong character + tone hooks.",
      "Cute but dangerous world driven by music. High clip potential for first reactions.",
      "Free Steam demo. The campaign is built around demo discovery and wishlists.",
    ],
    tiers: [
      {
        name: "Bronze",
        payout: "EUR 10",
        requirement: "Stream Alpha Nomos for at least 1 hour at 5+ average CCV",
      },
      {
        name: "Silver",
        payout: "EUR 20",
        rate: "EUR 10 / hr",
        rateNote: "EUR 20 total (2 x EUR 10), at least 1 side quest required",
        requirement: "Stream Alpha Nomos for at least 2 hours at 15+ average CCV. Silver tier must be unlocked for your account.",
        sideQuestsRequired: true,
      },
    ],
    sideQuestDetails: [
      {
        name: "Beat Goes Viral",
        xp: 50,
        desc: "Post a short-form clip from your Alpha Nomos stream on TikTok, YouTube Shorts, Instagram Reels, or X. Strong clip ideas: a clean rhythm combo, a funny mistake while missing the beat, a strong first reaction, a musical upgrade moment, or a quick explanation of the hook. Tag Alpha Nomos, RibCage Games, and StreamQuest.",
      },
      {
        name: "Wishlist Maestro",
        xp: 50,
        desc: "Actively encourage viewers to wishlist Alpha Nomos on Steam using your tracked link. Pin the link in chat, set a chat command, show the Steam page on stream, and remind viewers after strong gameplay moments. Proof: screenshot, post link, or VOD timestamp.",
      },
    ],
    rules: [
      "Stream Alpha Nomos live on Twitch using the correct category. Save your VOD.",
      "Use your tracked Steam link during the stream.",
      "Silver requires at least 1 side quest. Silver without a side quest is treated as Bronze if Bronze stream length is met.",
      "Extra stream time does not add to payout for Bronze or Silver.",
      "No faked engagement, viewers, or proof. No old or unrelated content. No asking viewers to leave Steam reviews in exchange for rewards.",
    ],
    links: {
      steam:
        "https://store.steampowered.com/app/2529960/Alpha_Nomos/?utm_source=StreamQuest&utm_medium=mission_brief&utm_campaign=AlphaNomos&utm_content=wishlist_cta",
      official: "https://ribcage.games/",
      twitch: "https://www.twitch.tv/directory/category/alpha-nomos",
    },

    /* -------- Rich brief content -------- */
    duration: "Campaign window",
    rating: "TBA",
    platforms: ["PC (Steam)"],

    videos: {
      trailer: "7Lv0I9-ytdc",
      briefComingSoon: true,
    },

    heroMeta: [
      { label: "Applications", value: "Creator Dashboard" },
      { label: "Selection", value: "Curated" },
      { label: "Game access", value: "Free demo on Steam" },
      { label: "Focus", value: "Wishlists" },
    ],

    tldr: [
      { stat: "EUR 10", label: "Bronze tier", sub: "1h stream, 5 CCV" },
      { stat: "EUR 20", label: "Silver tier", sub: "2h, 15 CCV, side quest required, Silver unlock required" },
      { stat: "50 XP", label: "Side Quest", sub: "Short-form clip from your stream" },
      { stat: "50 XP", label: "Side Quest", sub: "Wishlist push during stream" },
    ],
    tldrFootnotes: [
      "Approved creators play the Alpha Nomos demo live on Twitch and submit their VOD through the StreamQuest dashboard.",
      "The campaign is built around the free Steam demo. No game copy is provided.",
      "Mission brief video is coming soon. Trailer is up. Use the trailer plus the brief below to get the angle.",
    ],

    screenshots: [
      "/media/alpha-nomos/screenshot%20(1).jpg",
      "/media/alpha-nomos/screenshot%20(2).jpg",
      "/media/alpha-nomos/screenshot%20(3).jpg",
      "/media/alpha-nomos/screenshot%20(4).jpg",
    ],

    storyParagraphs: [
      "StreamQuest is teaming up with RibCage Games for a paid creator campaign around the Alpha Nomos demo. Hack, slash, and feel the beat as you help Cello and her gang escape a murderous puppet-filled world driven by music.",
      "Alpha Nomos has a clear visual and gameplay hook for Twitch: the action follows the beat. That makes it easy for viewers to understand what is happening, react to your timing, and follow the chaos when things go wrong. Good stream moments include learning the rhythm combat, hitting clean beat-based combos, missing the timing and recovering, finding musical upgrades, reacting to the puppet enemies, testing different roguelite builds, and showing how the world reacts to the music.",
      "This mission is focused on demo discovery and Steam wishlists. Help viewers understand what Alpha Nomos is, why the rhythm combat is fun, and where they can wishlist or try the game.",
    ],
    storyPull:
      "If this looks fun, wishlist Alpha Nomos through my link. Fight to the rhythm. Build your run. Escape the puppet-filled chaos.",
    storyAside: "/media/alpha-nomos/screenshot%20(2).jpg",
    storyAsideCaption: "Beat-driven combat in the demo",
    shortDescription:
      "Alpha Nomos is a rhythm-based action roguelite by RibCage Games. Play as Cello, a brave jester exploring a broken world ravaged by music, with a gang of friends and a world full of murderous puppets. Fight to the beat, build your roguelite run, and escape the chaos. A great fit for creators whose audiences enjoy rhythm games, action roguelites, music, comedy, and short-form clip-friendly gameplay.",

    sideQuestIntro:
      "Each side quest is self-contained and worth 50 XP. Beat Goes Viral takes a strong stream moment off Twitch into a short-form clip. Wishlist Maestro keeps the tracked Steam link active and visible during the stream.",
    sideQuestOutro:
      "The best runs lean into clips. Stream the rhythm hook on Twitch, then post the cleanest 30 seconds where your viewers naturally hear the beat.",

    trackedWishlistUrl:
      "https://store.steampowered.com/app/2529960/Alpha_Nomos/?utm_source=StreamQuest&utm_medium=wishlist&utm_campaign=AlphaNomos&utm_content=tracked",
    trackedWishlistNote:
      "Use this for side quest proof and on-stream CTAs so we can measure impact. If you receive a unique link in Discord, prefer that one.",

    gallery: {
      wide: "/media/alpha-nomos/screenshot%20(1).jpg",
      thumbs: [
        "/media/alpha-nomos/screenshot%20(2).jpg",
        "/media/alpha-nomos/screenshot%20(3).jpg",
        "/media/alpha-nomos/screenshot%20(4).jpg",
      ],
    },

    officialAccounts: [
      {
        name: "StreamQuest",
        hint: "Tag @StreamQuest on clip and wishlist posts",
        links: [
          { type: "instagram", href: "https://www.instagram.com/streamquest.io/" },
          { type: "tiktok", href: "https://www.tiktok.com/@streamquest.io" },
          { type: "youtube", href: "https://www.youtube.com/@StreamQuest_io" },
          { type: "discord", href: "https://discord.gg/NhqfucYDXD" },
        ],
      },
      {
        name: "Alpha Nomos",
        hint: "Tag Alpha Nomos and join the official Discord for updates and support.",
        links: [
          { type: "website", href: "https://store.steampowered.com/app/2529960/Alpha_Nomos/" },
          { type: "discord", href: "https://discord.com/invite/KFUdHV7YP8" },
        ],
      },
      {
        name: "RibCage Games",
        hint: "Developer and publisher of Alpha Nomos.",
        links: [
          { type: "website", href: "https://ribcage.games/" },
        ],
      },
    ],

    storeLinks: [
      {
        name: "Steam",
        sub: "Wishlist on Steam",
        href: "https://store.steampowered.com/app/2529960/Alpha_Nomos/?utm_source=StreamQuest&utm_medium=mission_brief&utm_campaign=AlphaNomos&utm_content=storefront",
        icon: "steam",
      },
      {
        name: "RibCage Games",
        sub: "ribcage.games",
        href: "https://ribcage.games/",
        icon: "website",
      },
      {
        name: "Discord",
        sub: "Alpha Nomos community",
        href: "https://discord.com/invite/KFUdHV7YP8",
        icon: "website",
      },
    ],

    rulesContent: [
      {
        heading: "Goals",
        body: "We coordinate creators in the same window so Alpha Nomos shows up across Twitch, short-form clips, and wishlist numbers. Real visibility, real storefront movement.",
      },
      {
        heading: "Selection",
        body: "This campaign is curated. Streamers are reviewed and approved based on fit, quality, audience, and recent stream activity. Applying does not guarantee approval. If you are stuck on Pending, join StreamQuest Discord. Coordination happens there.",
      },
      {
        heading: "Wishlist link",
        body: "The tracked wishlist link is one of the most important parts of this campaign. Mention it on stream, pin it in chat, and include it in your social side quests. A unique link is provided after approval.",
      },
      {
        heading: "Authenticity",
        body: "Stream Alpha Nomos honestly. React to the rhythm, miss the beat, recover, try different builds. Real reactions read better on stream and turn into the best clips.",
      },
    ],

    howToJoin: [
      { title: "Apply", sub: "In the Creator Dashboard" },
      { title: "Wait for selection", sub: "Curated campaign, approval is not guaranteed" },
      { title: "Join Discord", sub: "Required for the tracked Steam link and support" },
      { title: "Stream the demo", sub: "Bronze or Silver, with side quests for Silver" },
      { title: "Submit", sub: "VOD plus side-quest proof in the dashboard" },
      { title: "Get paid", sub: "After verification" },
    ],
  },
  {
    slug: "goodheavens",
    title: "Good Heavens!",
    status: "active",
    studio: "Nowhere Studios x RocketRide Games",
    tagline: "Chaotic co-op crafting RPG demo. Curated launch-window wishlist push.",
    category: "Co-op crafting RPG",
    cover: "/firebase-public/GoodHeavensRPG/library_hero (3840x1240).webp",
    portrait: "/firebase-public/GoodHeavensRPG/library_capsule (600x900).webp",
    logo: "/firebase-public/GoodHeavensRPG/library_logo_transparent (890x720).webp",
    description:
      "Curated paid creator campaign around the Good Heavens! demo. Play the demo live on Twitch, show off the funniest and craziest moments, and push viewers to wishlist the game with your tracked link.",
    about:
      "Good Heavens! is a chaotic co-op crafting RPG where survival is optional, the world is weird, and the NPCs are completely unhinged. Strongest creator angles: funny NPCs, weird factions, chaotic dialogue, co-op moments with friends, the colorful Adventure Time inspired world, base building, crafting, classes, and RPG progression, plus those big what-the-hell-is-happening clip moments.",
    keyFeatures: [
      "Funny NPCs, weird factions, and chaotic dialogue. Easy clip material with no setup needed.",
      "Co-op for up to 8 players. The crazier the lobby, the better the stream.",
      "Adventure Time inspired colorful world. Reads great on stream and in thumbnails.",
      "Base building, crafting, classes, and RPG progression. Survival is relaxed, not a punishment loop.",
      "Big what-the-hell moments built into the design. Side quests reward leaning into the chaos.",
    ],
    tiers: [
      {
        name: "Bronze",
        payout: "EUR 10",
        requirement: "Stream Good Heavens! for at least 1 hour at 5+ average CCV",
              },
      {
        name: "Silver",
        payout: "EUR 20",
        rate: "EUR 10 / hr",
        rateNote: "EUR 20 total (2 x EUR 10), at least 1 side quest required",
        requirement: "Stream Good Heavens! for at least 2 hours at 15+ average CCV. Silver tier must be unlocked for your account.",
        sideQuestsRequired: true,
              },
    ],
    sideQuestDetails: [
      {
        name: "Clip Outside Twitch",
        xp: 50,
        desc: "Post a clip outside of Twitch. Reels, Shorts, TikToks, or X posts all count. Instagram Stories do not. Tag @goodheavensrpg and @streamquest with the exact handle for each platform.",
      },
      {
        name: "Unique Wishlist Link Push",
        xp: 50,
        desc: "Share or actively promote your unique tracked wishlist link during stream and in your posts. Screenshot or link as proof.",
      },
      {
        name: "Bring A Friend",
        xp: 50,
        desc: "Play the Good Heavens! demo in co-op with up to 8 friends. Submit a lobby screenshot or VOD timestamp as proof.",
      },
      {
        name: "Mountain King Slayer",
        xp: 50,
        desc: "Slay the Mountain King. Submit a screenshot of the kill as proof. The cleanest clip-moment side quest in the demo.",
      },
      {
        name: "Join The Discord",
        xp: 50,
        desc: "Join the official Good Heavens! Discord. Submit a screenshot showing you joined.",
      },
    ],
    rules: [
      "Stream Good Heavens! live on Twitch using the correct category. Save your VOD.",
      "Mention your unique tracked wishlist link clearly during the stream.",
      "Silver requires at least 1 side quest. Silver without a side quest is treated as Bronze if the Bronze stream length is met.",
      "Extra stream time does not add to payout for Bronze or Silver.",
      "Authentic streams only. You should clearly explain why viewers should wishlist the game.",
    ],
        links: {
      steam:
        "https://store.steampowered.com/app/1617120/Good_Heavens/?utm_source=StreamQuest&utm_medium=mission_brief&utm_campaign=GoodHeavens&utm_content=wishlist_cta",
      official: "https://www.goodheavensrpg.com",
      twitch: "https://www.twitch.tv/directory/category/good-heavens",
    },

    /* -------- Rich brief content -------- */
    duration: "Launch window",
    slots: 50,
    rating: "PEGI 12 (est.)",
    platforms: ["PC (Steam)"],

    videos: {
      trailer: "lXPPZyEKGtM",
      brief: "lXPPZyEKGtM",
    },

    heroMeta: [
      { label: "Applications", value: "Creator Dashboard" },
      { label: "Selection", value: "Curated" },
      { label: "Slots", value: "Curated, limited" },
      { label: "Game access", value: "Free demo on Steam" },
    ],

    tldr: [
      { stat: "EUR 10", label: "Bronze tier", sub: "1h stream, 5 CCV" },
      { stat: "EUR 20", label: "Silver tier", sub: "2h, EUR 10/h, 15 CCV, side quest required, Silver unlock required" },
      { stat: "Curated", label: "Creator selection", sub: "Reviewed and approved for fit and quality" },
      { stat: "5 days", label: "Payout turnaround", sub: "After VOD verification via Twitch setup" },
    ],
    tldrFootnotes: [
      "Free demo access for all approved creators.",
      "Silver requires at least 1 side quest or the run counts as Bronze.",
      "Push your unique tracked wishlist link on stream so we can measure community impact.",
    ],

    screenshots: [
      "/firebase-public/GoodHeavensRPG/gameplay (1).webp",
      "/firebase-public/GoodHeavensRPG/gameplay (2).webp",
      "/firebase-public/GoodHeavensRPG/gameplay (3).webp",
      "/firebase-public/GoodHeavensRPG/Scholar City.webp",
      "/firebase-public/GoodHeavensRPG/War City 4.webp",
    ],

    storyParagraphs: [
      "StreamQuest is teaming up with Nowhere Studios and RocketRide Games for a paid creator campaign around the Good Heavens! demo. This is a curated campaign, not first come first served. Streamers are reviewed and approved based on fit, quality, audience, and campaign needs.",
      "Your main goal is simple: play the demo live, show off the funniest and craziest moments, and push viewers to wishlist the game with your tracked link.",
      "Good Heavens! is a chaotic co-op crafting RPG where survival is optional, the world is weird, and the NPCs are completely unhinged. It is built for funny clips, co-op chaos, and that Adventure Time inspired colorful look that reads great on stream and on thumbnails.",
    ],
    storyPull:
      "If this looks fun, wishlist Good Heavens! through my link. Keep the CTA that simple. Authentic streams plus a clear wishlist ask is what this campaign is built around.",
    storyAside: "/firebase-public/GoodHeavensRPG/gameplay (4).webp",
    storyAsideCaption: "Co-op chaos in the demo",
    shortDescription:
      "Good Heavens! is a chaotic co-op crafting RPG where survival is optional, the world is weird, and the NPCs are completely unhinged. Funny NPCs, weird factions, big clip moments, base building, crafting, classes, RPG progression, and an Adventure Time inspired colorful world that pops on stream. A great fit for creators whose audiences enjoy co-op, crafting, survival adjacent games, comedy streams, and weird wholesome chaos.",

    sideQuestIntro:
      "Each side quest is self-contained. Clip Outside Twitch needs actual feed posts (Reels, Shorts, TikToks, or X), not Stories. Bring A Friend rewards co-op. Mountain King Slayer is the cleanest clip-moment side quest in the demo. Use your tracked wishlist link wherever it fits.",
    sideQuestOutro:
      "The best runs do not stop at Twitch. Push the demo on social too and use your tracked wishlist link when asking for wishlists.",

    trackedWishlistUrl:
      "https://store.steampowered.com/app/1617120/Good_Heavens/?utm_source=StreamQuest&utm_medium=wishlist&utm_campaign=GoodHeavens&utm_content=tracked",
    trackedWishlistNote:
      "Use this for side quest proof and on-stream CTAs so we can measure impact. If you receive a unique link in Discord, prefer that one.",

    gallery: {
      wide: "/firebase-public/GoodHeavensRPG/gameplay (5).webp",
      thumbs: [
        "/firebase-public/GoodHeavensRPG/gameplay (6).webp",
        "/firebase-public/GoodHeavensRPG/gameplay (7).webp",
        "/firebase-public/GoodHeavensRPG/Base 4.webp",
        "/firebase-public/GoodHeavensRPG/Dungeon 2.webp",
      ],
    },

    officialAccounts: [
      {
        name: "StreamQuest",
        hint: "Tag @StreamQuest on clip and wishlist posts",
        links: [
          { type: "instagram", href: "https://www.instagram.com/streamquest.io/" },
          { type: "tiktok", href: "https://www.tiktok.com/@streamquest.io" },
          { type: "youtube", href: "https://www.youtube.com/@StreamQuest_io" },
          { type: "discord", href: "https://discord.gg/NhqfucYDXD" },
        ],
      },
      {
        name: "Good Heavens!",
        hint: "Tag @goodheavensrpg on Instagram and X. Join the official Discord for the Join The Discord side quest.",
        links: [
          { type: "website", href: "https://www.goodheavensrpg.com" },
          { type: "discord", href: "https://discord.gg/HQgAgWQXmm" },
          { type: "instagram", href: "https://www.instagram.com/goodheavensrpg/" },
          { type: "x", href: "https://x.com/goodheavensrpg" },
          { type: "tiktok", href: "https://www.tiktok.com/@good.heavens64" },
        ],
      },
      {
        name: "Studios",
        hint: "Nowhere Studios (developer) and RocketRide Games (publisher).",
        links: [
          { type: "website", href: "https://www.nowherestudios.com" },
          { type: "website", href: "https://www.rocketridegames.com" },
        ],
      },
    ],

    storeLinks: [
      {
        name: "Steam",
        sub: "Wishlist on Steam",
        href: "https://store.steampowered.com/app/1617120/Good_Heavens/?utm_source=StreamQuest&utm_medium=mission_brief&utm_campaign=GoodHeavens&utm_content=storefront",
        icon: "steam",
      },
      {
        name: "Official site",
        sub: "goodheavensrpg.com",
        href: "https://www.goodheavensrpg.com",
        icon: "website",
      },
      {
        name: "Discord",
        sub: "Official community",
        href: "https://discord.gg/HQgAgWQXmm",
        icon: "website",
      },
    ],

    rulesContent: [
      {
        heading: "Goals",
        body: "We coordinate many small creators in the same window so Good Heavens! shows up across Twitch, social feeds, and wishlist numbers. Real visibility, real storefront movement.",
      },
      {
        heading: "Selection",
        body: "This campaign is curated. Streamers are reviewed and approved based on fit, quality, audience, and campaign needs. Applying does not guarantee approval. If you are stuck on Pending, join Discord. Coordination happens there.",
      },
      {
        heading: "Wishlist link",
        body: "The tracked wishlist link is one of the most important parts of this campaign. Mention it on stream and include it in your social side quests. A unique link is provided in Discord after approval.",
      },
      {
        heading: "Authenticity",
        body: "Your stream must be authentic. Play the demo your way, react to the weird stuff, and clearly explain why viewers should wishlist the game.",
      },
    ],

    howToJoin: [
      { title: "Apply", sub: "In the Creator Dashboard" },
      { title: "Wait for selection", sub: "Curated campaign, approval is not guaranteed" },
      { title: "Join Discord", sub: "Required for the tracked wishlist link and support" },
      { title: "Stream the demo", sub: "Bronze or Silver, with side quests for Silver" },
      { title: "Submit", sub: "VOD plus side-quest proof in the dashboard" },
      { title: "Get paid", sub: "Within 5 business days of verification" },
    ],
  },
  {
    slug: "replaced",
    title: "REPLACED",
    status: "active",
    studio: "Thunderful × Sad Cat Studios",
    tagline: "Cinematic 2.5D cyberpunk action-platformer launch window.",
    category: "Cyberpunk action platformer",
    cover: "/firebase-public/Replaced/sq-replaced-keyart-landscape-2400.webp",
    portrait: "/firebase-public/Replaced/sq-replaced-keyart-portrait-1080.webp",
    description:
      "Paid creator campaign for the launch of REPLACED, a cinematic 2.5D cyberpunk action platformer by Thunderful and Sad Cat Studios. Built for Twitch creators who love standout indie games and want to help drive visibility during a major release moment.",
    about:
      "If your content leans into atmospheric games, narrative experiences, cyberpunk worlds, or visually striking action titles, this is a very strong fit.",
    keyFeatures: [
      "Phoenix-City: corruption, outlaws, and nuclear scars. A strong visual read for thumbnails.",
      "R.E.A.C.H. is an AI trapped in a human body. Moral sci-fi stakes and mystery that carry a whole stream.",
      "Free-flow melee and ranged combat, readable for viewers and great for clips.",
      "Hand-crafted 2.5D art and a moody synth-driven soundtrack that sells tone instantly.",
    ],
    tiers: [
      {
        name: "Bronze",
        payout: "€10",
        requirement: "Stream REPLACED for at least 1 hour in your counted session",
        freeCopy: true,
      },
      {
        name: "Silver",
        payout: "€10",
        rate: "€10 / hr",
        rateNote: "€20 total (2 × €10), at least 1 side quest required",
        requirement: "Stream REPLACED for at least 2 hours counted toward this tier",
        sideQuestsRequired: true,
        freeCopy: true,
      },
    ],
    sideQuestDetails: [
      {
        name: "Social Agent",
        xp: 50,
        desc: "Post a clip or share your tracked wishlist link on social. Tag @REPLACED and @StreamQuest with the exact handles for each platform. Prefer your tracked link in the caption.",
      },
      {
        name: "Completionist",
        xp: 100,
        desc: "Finish the game. Submit a screenshot of credits or the end-state screen. Keep titles VOD-friendly with no big spoilers.",
      },
      {
        name: "Growing Together",
        xp: 50,
        desc: "Follow at least 1 official StreamQuest, 1 REPLACED, and 1 Thunderful account. Submit screenshots showing each follow.",
      },
    ],
    rules: [
      "Use the REPLACED Twitch category and keep gameplay clearly visible.",
      "Complete at least 1 side quest and submit your VOD plus proof.",
      "Silver with zero side quests is treated as Bronze if Bronze stream length is met.",
      "Extra stream time does not add to payout for Bronze or Silver.",
    ],
    freeCopy: true,
    links: {
      steam: "https://store.steampowered.com/app/1663850/REPLACED/?utm_source=StreamQuest&utm_medium=mission_brief&utm_campaign=REPLACED&utm_content=wishlist_cta",
      official: "https://streamquest.io/replaced",
    },

    /* -------- Rich brief content -------- */
    duration: "2 weeks",
    slots: 50,
    rating: "ESRB M (17+) / PEGI 16",
    platforms: ["PC (Steam)", "Xbox Series X|S", "Xbox Game Pass", "PC (Epic)", "PC (GOG)"],

    videos: {
      trailer: "YheMqHoeHVc",
      brief: "pYxgYoaJL9M",
    },

    heroMeta: [
      { label: "Applications", value: "Creator Dashboard" },
      { label: "Duration", value: "2 weeks" },
      { label: "Slots", value: "50 creators" },
      { label: "Free copy", value: "Both tiers" },
    ],

    tldr: [
      { stat: "€10", label: "Bronze tier", sub: "1h stream, 5 CCV, 300 followers" },
      { stat: "€20", label: "Silver tier", sub: "2h, €10/h, 15 CCV, 500 followers" },
      { stat: "50", label: "Creator slots", sub: "Curated, not first come first served" },
      { stat: "5 days", label: "Payout turnaround", sub: "After VOD verification via Twitch setup" },
    ],
    tldrFootnotes: [
      "Free game copy included for all approved creators.",
      "Complete at least 1 side quest or the run does not count toward payout.",
      "Use your tracked wishlist link on stream so we can measure community impact.",
    ],

    screenshots: [
      "https://thunderfulgames.com/wp-content/uploads/2025/08/REPLACED_SadCatStudios_Screenshots-Thumbnails_Screenshot1.png",
      "https://thunderfulgames.com/wp-content/uploads/2025/08/REPLACED_SadCatStudios_Screenshots-Thumbnails_Screenshot2-1.png",
      "https://thunderfulgames.com/wp-content/uploads/2025/08/REPLACED_SadCatStudios_Screenshots-Thumbnails_Screenshot5NoUI-1.png",
      "https://thunderfulgames.com/wp-content/uploads/2025/08/REPLACED_SadCatStudios_Screenshots-ThumbnailsScreenshot4NoCar-scaled.png",
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1663850/433973ec3838085b46d3b3fe898811bd9d662a0d/ss_433973ec3838085b46d3b3fe898811bd9d662a0d.1920x1080.jpg",
    ],

    storyParagraphs: [
      "StreamQuest is teaming up with Thunderful and Sad Cat Studios for a paid creator campaign around the launch of REPLACED. This campaign is built for Twitch creators who enjoy standout indie games and want to help drive visibility during a major release moment.",
      "If your content leans into atmospheric games, narrative experiences, cyberpunk worlds, or visually striking action titles, this is a very strong fit.",
      "REPLACED is a cinematic 2.5D action platformer and cyberpunk thriller where you play as R.E.A.C.H., an AI trapped in a human body in an alternate 1980s America scarred by nuclear catastrophe. Set in Phoenix-City, one of Phoenix Corporation's corrupt strongholds, the game blends exploration, platforming, fluid combat, and a slow-burning mystery around identity, control, and the truth behind your creation. The retro-futuristic world is brought to life with handcrafted pixel art, modern visual effects, and a moody synth-driven atmosphere.",
    ],
    storyPull:
      "Your quest: make REPLACED impossible to ignore. Sell the tone, keep combat readable on camera, and drive wishlists with your tracked link.",
    storyAside:
      "https://thunderfulgames.com/wp-content/uploads/2025/08/REPLACED_SadCatStudios_Screenshots-Thumbnails_Screenshot2-1.png",
    storyAsideCaption: "R.E.A.C.H. in Phoenix-City",
    shortDescription:
      "REPLACED is a cinematic 2.5D action platformer wrapped in a cyberpunk thriller, where you step into the role of R.E.A.C.H., an AI trapped against its will in a human body. Set in an alternate 1980s America devastated by nuclear disaster, the game takes you through the corrupt streets of Phoenix-City as you uncover the hidden agenda behind Phoenix Corporation and the reason for your own existence. With fluid movement, fast responsive combat, cinematic exploration, and striking pixel art enhanced by modern visual effects, REPLACED is a strong fit for creators whose audiences enjoy atmospheric indies, dystopian worlds, and story-driven action.",

    sideQuestIntro:
      "Each quest is self-contained. Social Agent needs tags plus a clip or wishlist share. Growing Together needs follows plus screenshots. Use your tracked wishlist link wherever it fits.",
    sideQuestOutro:
      "The best runs do not stop at Twitch. Push the game on social too and use the StreamQuest UTM link when asking for wishlists.",

    trackedWishlistUrl:
      "https://store.steampowered.com/app/1663850/REPLACED/?utm_source=StreamQuest&utm_medium=wishlist&utm_campaign=REPLACED&utm_content=tracked",
    trackedWishlistNote:
      "Use this for side quest proof and on-stream CTAs so we can measure impact. If you receive a unique link in Discord, prefer that one.",

    gallery: {
      wide: "/firebase-public/Replaced/sq-replaced-screenshot-01.webp",
      thumbs: [
        "/firebase-public/Replaced/sq-replaced-screenshot-02.webp",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1663850/433973ec3838085b46d3b3fe898811bd9d662a0d/ss_433973ec3838085b46d3b3fe898811bd9d662a0d.1920x1080.jpg",
        "https://thunderfulgames.com/wp-content/uploads/2025/08/REPLACED_SadCatStudios_Screenshots-ThumbnailsScreenshot4NoCar-scaled.png",
        "https://thunderfulgames.com/wp-content/uploads/2025/08/REPLACED_SadCatStudios_Screenshots-Thumbnails_Screenshot1.png",
      ],
    },

    officialAccounts: [
      {
        name: "StreamQuest",
        hint: "Tag @StreamQuest, clip and wishlist posts",
        links: [
          { type: "instagram", href: "https://www.instagram.com/streamquest.io/" },
          { type: "tiktok", href: "https://www.tiktok.com/@streamquest.io" },
          { type: "youtube", href: "https://www.youtube.com/@StreamQuest_io" },
          { type: "discord", href: "https://discord.gg/NhqfucYDXD" },
        ],
      },
      {
        name: "REPLACED",
        hint: "Official game and studio accounts for tags and follows",
        links: [
          { type: "website", href: "https://playreplaced.com" },
          { type: "instagram", href: "https://www.instagram.com/replaced_game/" },
          { type: "x", href: "https://x.com/REPLACEDGame" },
          { type: "youtube", href: "https://www.youtube.com/@sadcatstudios" },
          { type: "tiktok", href: "https://www.tiktok.com/@replacedgame" },
        ],
      },
      {
        name: "Thunderful",
        hint: "Publisher socials for follows and cross-platform tagging",
        links: [
          { type: "website", href: "https://thunderfulgames.com" },
          { type: "instagram", href: "https://www.instagram.com/thunderfulgames/" },
          { type: "x", href: "https://twitter.com/thunderfulgames" },
          { type: "youtube", href: "https://www.youtube.com/c/thunderful" },
          { type: "tiktok", href: "https://www.tiktok.com/@thunderfulgames?lang=en" },
          { type: "bluesky", href: "https://bsky.app/profile/thunderfulgames.bsky.social" },
        ],
      },
    ],

    storeLinks: [
      {
        name: "Steam",
        sub: "Store page",
        href: "https://store.steampowered.com/app/1663850/REPLACED/?utm_source=StreamQuest&utm_medium=mission_brief&utm_campaign=REPLACED&utm_content=storefront",
        icon: "steam",
      },
      {
        name: "Xbox Store",
        sub: "xbox.com",
        href: "https://www.xbox.com/Search?q=REPLACED&utm_source=StreamQuest&utm_medium=mission_brief&utm_campaign=REPLACED&utm_content=xbox_store",
        icon: "xbox",
      },
      {
        name: "Official site",
        sub: "playreplaced.com",
        href: "https://playreplaced.com/?utm_source=StreamQuest&utm_medium=mission_brief&utm_campaign=REPLACED&utm_content=website",
        icon: "website",
      },
      {
        name: "Press hub",
        sub: "playreplaced.com",
        href: "https://playreplaced.com",
        icon: "website",
      },
      {
        name: "Screenshots",
        sub: "High-res on Steam",
        href: "https://store.steampowered.com/app/1663850/REPLACED/",
        icon: "steam",
      },
    ],

    rulesContent: [
      {
        heading: "Goals",
        body: "We coordinate many small creators in the same window so REPLACED shows up across Twitch and social feeds. Real visibility, real storefront movement.",
      },
      {
        heading: "Selection",
        body: "Not first come, first served. We optimize for a diverse creator pool across content fit, audience, region, and quality. StreamQuest may refuse any application. If you are stuck on Pending, join Discord. Keys and coordination happen there.",
      },
      {
        heading: "Keys",
        body: "Keys ship after approval via Discord. YouTube-first creators, ping us in Discord for setup help.",
      },
      {
        heading: "Rating",
        body: "REPLACED is ESRB M (17+) and PEGI 16. Set stream labels and chat rules accordingly.",
      },
    ],

    howToJoin: [
      { title: "Apply", sub: "In the Creator Dashboard" },
      { title: "Join Discord", sub: "Required for keys" },
      { title: "Receive your key", sub: "Sent after approval" },
      { title: "Stream", sub: "Bronze or Silver plus at least 1 side quest" },
      { title: "Submit", sub: "VOD plus proof" },
      { title: "Get paid", sub: "After verification" },
    ],
  },

  {
    slug: "endix",
    title: "Endix May Showcase",
    status: "active",
    studio: "Endix Expo",
    tagline: "Special StreamQuest event quest inside the Endix virtual expo.",
    category: "Event quest · virtual expo",
    cover: "/firebase-public/Endix May 2026/e7e3c12f2128bcfcc74f3f6b7cfb6e7a911a1ec3.webp",
    portrait: "/firebase-public/Endix May 2026/e7e3c12f2128bcfcc74f3f6b7cfb6e7a911a1ec3.webp",
    logo: "/firebase-public/Logos Partner/Endix.webp",
    description:
      "This is a special event quest, not a default game quest. Your mission is to guide your audience through Endix, visit the required areas, highlight the participating games, and drive wishlists through the campaign link.",
    about:
      "Treat Endix like walking through a convention with your community, not loading into a random multiplayer lobby. Explain what Endix is, invite viewers to join for free, visit the required areas, highlight games and booths, and make natural wishlist callouts using the provided link.",
    keyFeatures: [
      "Virtual expo space full of booths, mini-games, and live activations to walk through with chat.",
      "THQ Nordic Island, Dave the Diver Activation, Frozen District, Alienware Climb Trial, and two booth floors to explore.",
      "Wishlist driven main goal that fits naturally into commentary and overlays.",
      "Free for viewers to download and join, making it easy to invite chat to follow along.",
      "Streamable on first contact since the showcase format does most of the storytelling for you.",
    ],
    tiers: [
      {
        name: "Bronze",
        payout: "€10",
        requirement: "Complete the Endix route with at least 1 hour of stream coverage and valid proof. Bronze rank required.",
        freeCopy: false,
      },
      {
        name: "Silver",
        payout: "€20",
        rate: "€10 / hr",
        rateNote: "€20 total · Silver rank required",
        requirement: "Complete the Endix route with at least 2 hours of stream coverage and valid proof. Silver rank required.",
        sideQuestsRequired: false,
        freeCopy: false,
      },
    ],
    sideQuestDetails: [
      {
        name: "StreamQuest Booth Photo",
        xp: 50,
        desc: "Take a screenshot in front of the StreamQuest booth inside Endix and submit it with your proof.",
      },
      {
        name: "Wishlist Signal",
        xp: 50,
        desc: "Make a social post explaining that Endix is free to join and include the wishlist or sale page link.",
      },
      {
        name: "Expo Clip",
        xp: 50,
        desc: "Share a clip showing a booth, mini-game, giveaway, community moment, or wishlist callout.",
      },
    ],
    rules: [
      "Stream in the Endix Twitch category and add Endix to your stream title.",
      "Use the wishlist link on stream via chatbot, panels, or commands and call it out naturally.",
      "Visit all 6 required areas: THQ Nordic Island, Dave the Diver Activation, Frozen District, First Floor, Second Floor, Alienware Climb Trial.",
      "Publish 1 social post with the campaign link, hashtag Endix, and tag @Endix_Expo where possible.",
      "Submit a VOD plus the Twitch stream summary printscreen with Unique Viewers visible. No Excel sheet for this quest.",
      "Bronze and Silver rewards are based on your unlocked StreamQuest rank. You cannot manually choose Silver if your rank has not unlocked it.",
      "No double dipping: creators already activated for this Endix beat outside StreamQuest are not eligible.",
    ],
    freeCopy: false,
    links: {
      steam: "https://store.steampowered.com/app/4356840/Endix/",
      official: "https://streamquest.io/endix",
    },

    duration: "Event window",
    slots: 50,
    platforms: ["PC (Steam)", "PC (Epic Games Store)"],

    heroMeta: [
      { label: "Applications", value: "Creator Dashboard" },
      { label: "Slots", value: "Max 50 creators" },
      { label: "Main goal", value: "Wishlists" },
      { label: "Proof", value: "Area screenshots required" },
    ],

    tldr: [
      { stat: "€10", label: "Bronze tier", sub: "1h stream, Bronze rank required" },
      { stat: "€20", label: "Silver tier", sub: "2h stream at €10/h, Silver rank required" },
      { stat: "50", label: "Creator slots", sub: "Curated, not first come first served" },
      { stat: "6", label: "Required areas", sub: "Visit all 6 inside Endix" },
    ],
    tldrFootnotes: [
      "Special event quest, not a default game quest.",
      "Main goal is wishlists for participating games.",
      "Submit a Twitch stream summary printscreen with Unique Viewers visible. No Excel sheet for this quest.",
    ],

    screenshots: [
      "/firebase-public/Endix May 2026/2025-11-30_21h3min3s_2560x1440.webp",
      "/firebase-public/Endix May 2026/505 Games outside.webp",
      "/firebase-public/Endix May 2026/Gothic.webp",
      "/firebase-public/Endix May 2026/Sea of Rifts.webp",
      "/firebase-public/Endix May 2026/Akatori.webp",
      "/firebase-public/Endix May 2026/Alpha Nomos.webp",
    ],

    storyParagraphs: [
      "Endix is a special StreamQuest event quest built around the May beat of the virtual expo. Selected creators stream the showcase, walk viewers through the required areas, and push wishlists for the participating games using the campaign link.",
      "Your main mission is to make Endix understandable and exciting for your viewers. Treat it like walking through a convention with your community, not loading into a random multiplayer lobby. Explain what Endix is, invite viewers to join for free, visit the required areas, highlight games and booths, and make natural wishlist callouts.",
      "The win condition is simple. Make viewers care enough to open the Endix sale page and wishlist participating titles.",
    ],
    storyPull:
      "Your quest: turn Endix into an event your viewers want to walk through with you, not background noise behind your facecam.",
    storyAside:
      "/firebase-public/Endix May 2026/2025-11-30_21h3min3s_2560x1440.webp",
    storyAsideCaption: "Expo Center, explore together with viewers",
    shortDescription:
      "Endix is a virtual game expo platform. The StreamQuest May Showcase quest pays Bronze and Silver creators to walk their community through the event, visit six required areas, and drive wishlists for participating games via the campaign link.",

    sideQuestIntro:
      "Each side quest is +50 XP, self contained, and stackable. Submit proof screenshots alongside your main VOD.",
    sideQuestOutro:
      "Side quests boost your run but the main mission and proof submission still drive your reward tier.",

    trackedWishlistUrl:
      "https://store.steampowered.com/app/4356840/Endix/?utm_source=StreamQuest&utm_medium=wishlist&utm_campaign=Endix_May2026&utm_content=tracked",
    trackedWishlistNote:
      "Use this for on-stream callouts and in your social proof post. If StreamQuest gives you a per-creator link in Discord, prefer that one.",

    gallery: {
      wide: "/firebase-public/Endix May 2026/2025-11-30_21h3min3s_2560x1440.webp",
      thumbs: [
        "/firebase-public/Endix May 2026/505 Games outside.webp",
        "/firebase-public/Endix May 2026/Akatori.webp",
        "/firebase-public/Endix May 2026/Alpha Nomos.webp",
        "/firebase-public/Endix May 2026/Gothic.webp",
        "/firebase-public/Endix May 2026/Sea of Rifts.webp",
        "/firebase-public/Endix May 2026/Hela.webp",
        "/firebase-public/Endix May 2026/Inferius.webp",
        "/firebase-public/Endix May 2026/Mexican Ninja.webp",
      ],
    },

    officialAccounts: [
      {
        name: "StreamQuest",
        hint: "Tag @StreamQuest, clip and wishlist posts",
        links: [
          { type: "instagram", href: "https://www.instagram.com/streamquest.io/" },
          { type: "tiktok", href: "https://www.tiktok.com/@streamquest.io" },
          { type: "youtube", href: "https://www.youtube.com/@StreamQuest_io" },
          { type: "discord", href: "https://discord.gg/NhqfucYDXD" },
        ],
      },
      {
        name: "Endix",
        hint: "Tag @Endix_Expo on social, use hashtag Endix",
        links: [
          { type: "website", href: "https://endix.app" },
          { type: "x", href: "https://x.com/Endix_Expo" },
        ],
      },
    ],

    storeLinks: [
      {
        name: "Steam",
        sub: "Download Endix",
        href: "https://store.steampowered.com/app/4356840/Endix/",
        icon: "steam",
      },
      {
        name: "Epic Games Store",
        sub: "Download Endix",
        href: "https://store.epicgames.com/en-US/p/endix-9f1da1",
        icon: "epic",
      },
      {
        name: "Twitch category",
        sub: "twitch.tv/directory/category/endix",
        href: "https://www.twitch.tv/directory/category/endix",
        icon: "website",
      },
    ],

    rulesContent: [
      {
        heading: "Selection",
        body: "Curated, max 50 creators, not first come first served. StreamQuest selects for fit, quality, region and language spread, rank access, and whether the creator can actually help make the event visible.",
      },
      {
        heading: "Rank gating",
        body: "Your reward tier is based on your unlocked StreamQuest rank. Bronze and Silver are not a manual choice. Apply at the rank you currently hold.",
      },
      {
        heading: "Required route",
        body: "Visit all 6 required areas inside Endix: THQ Nordic Island plus 5 games, Dave the Diver Activation, Frozen District, First Floor with 6 booths, Second Floor with 6 booths, and the Alienware Climb Trial. Capture a recognizable screenshot for each.",
      },
      {
        heading: "Proof",
        body: "Submit your Twitch VOD, the Twitch stream summary printscreen with Unique Viewers visible, screenshots for each required area, your social post URL with hashtag Endix and tag @Endix_Expo, and proof that the wishlist link was on stream (chatbot, command, panel, or VOD timestamp).",
      },
      {
        heading: "Settings tips",
        body: "Mute all voice chat via Escape, Settings, Audio, Voice Chat Output Volume zero. Hide other players or name tags via Escape, Settings, General if the event gets crowded. Press E near QR codes so viewers can scan them on stream.",
      },
      {
        heading: "No double dipping",
        body: "Creators already activated for this Endix beat outside StreamQuest are not eligible for this StreamQuest quest.",
      },
    ],

    howToJoin: [
      { title: "Apply", sub: "In the Creator Dashboard" },
      { title: "Wait for selection", sub: "Curated list, max 50 creators" },
      { title: "Join Discord", sub: "Selected creators are briefed and supported there" },
      { title: "Download Endix", sub: "Steam or Epic Games Store" },
      { title: "Stream the route", sub: "Endix category plus all 6 required areas" },
      { title: "Submit proof", sub: "VOD, area screenshots, social URL, stream summary" },
    ],
  },

  {
    slug: "aska",
    title: "ASKA",
    status: "active",
    studio: "Sand Sailor Studio × Thunderful",
    tagline: "Hearth & Honey update push. Steam Medieval Fest discount window.",
    category: "Viking village builder · survival",
    cover: "/firebase-public/Game Cover Art/aska key art.webp",
    description:
      "Paid Twitch creator campaign built around ASKA's Early Access journey, the new Hearth & Honey update, and a 20% Steam Medieval Fest discount. By Sand Sailor Studio × Thunderful.",
    about:
      "ASKA is a Viking village builder with survival mechanics, ranged combat, base building, and a clan of villagers you grow from a frozen shore into a beating settlement.",
    keyFeatures: [
      "Track down Wild Beehives, build Bee Houses, and turn Honey into Mead in the new Brewery for a full Hearth & Honey production line.",
      "Upgrade the Tavern House to Tier 3 so villagers can drink mead and your settlement gains real personality.",
      "Use the new Settlement Storage Statistics to manage resources while hunters head into the mines to hunt crawlers.",
      "Lead a living village where AI villagers have roles, schedules, and needs that decide if your tribe thrives or collapses.",
      "Play solo or run co-op with up to 4 friends to build a Viking settlement from scratch.",
    ],
    tiers: [
      {
        name: "Bronze",
        payout: "€10",
        requirement: "Stream ASKA for at least 1 hour in your counted session",
        freeCopy: true,
      },
      {
        name: "Silver",
        payout: "€10",
        rate: "€10 / hr",
        rateNote: "€20 total (2 × €10) · ≥1 side quest required",
        requirement: "Stream ASKA for at least 2 hours · ≥1 side quest required",
        sideQuestsRequired: true,
        freeCopy: true,
      },
    ],
    sideQuestDetails: [
      {
        name: "Mead Hall Rising",
        desc: "Upgrade your Tavern House to Tier 3 in-game and submit a screenshot as proof. It is the cleanest way to show off Hearth & Honey and the new village happiness loop.",
      },
      {
        name: "Raise the Horn",
        desc: "Share the 20% Steam Medieval Fest discount on your socials using your unique StreamQuest tracked link, and tag the official accounts where it fits.",
      },
      {
        name: "Skald's Highlight",
        desc: "Post a clip of you playing ASKA with friends that highlights any of the new features, like beekeeping, brewing mead, tavern life, or crawler hunting.",
      },
    ],
    rules: [
      "Use the ASKA Twitch category.",
      "Gameplay must be clearly visible (no facecam-only).",
      "Silver requires at least one side quest completed.",
    ],
    freeCopy: true,
    links: {
      steam: "https://store.steampowered.com/app/1898300/ASKA/?utm_source=SQ&utm_medium=social&utm_campaign=aska_medieval_fest&utm_content=discount_share",
      official: "https://streamquest.io/aska",
    },
  },

  {
    slug: "temtem",
    title: "Temtem: Swarm",
    status: "active",
    studio: "Crema",
    tagline: "Full-release launch quest built for co-op visibility and storefront traffic.",
    category: "Co-op survivor",
    cover: "/firebase-public/Game Cover Art/Crema_Temtem_Swarm_KeyArt (1) (1).webp",
    description:
      "Paid creator campaign supporting the full release of Temtem: Swarm by Crema. Co-op survivor energy, indie launch framing that feels community-led.",
    about:
      "Temtem: Swarm is a chaotic co-op survivor where you battle endless waves of Tems with up to three friends. Stack abilities, evolve your team, and survive bullet-heaven stages full of bosses.",
    keyFeatures: [
      "Battle Tem swarms solo or with up to three friends online, sharing resources and combining builds for co-op chaos.",
      "Fight mini-bosses and stage bosses, including iconic Temtem, across hand-crafted bullet-heaven stages.",
      "Trigger Ultimates on every Tem and unlock new Traits as you collect more creatures and master different playstyles.",
      "Earn XP, level up your Tems, and push toward final evolutions for stronger and longer survivor-like runs.",
      "Use Ghost Mode to keep supporting fallen teammates in co-op until they can revive and rejoin the fight.",
    ],
    tiers: [
      {
        name: "Bronze",
        payout: "€10",
        requirement: "Stream 1 hour, 5 CCV",
        freeCopy: true,
      },
      {
        name: "Silver",
        payout: "€25",
        requirement: "Stream 2 hours, 15 CCV",
        sideQuestsRequired: true,
        freeCopy: true,
      },
    ],
    sideQuestDetails: [
      {
        name: "Temtem Up",
        desc: "Squad up with a friend or another creator and finish at least one full co-op run together on stream.",
      },
      {
        name: "Swarm Signal",
        desc: "Post a clip from your Temtem Swarm stream on socials and tag #Crema plus #StreamQuest.",
      },
      {
        name: "Wishlist Spreader",
        desc: "Share the tracked StreamQuest wishlist link on socials or during your stream to push launch traffic to Steam.",
      },
    ],
    freeCopy: true,
    links: {
      steam: "https://store.steampowered.com/app/2510960/Temtem_Swarm/?utm_source=streamquest",
      official: "https://streamquest.io/quest-temtem",
    },
  },

  {
    slug: "gridbeat",
    title: "GRIDbeat",
    status: "active",
    studio: "Amber Studios",
    tagline: "Demo-to-launch quest focused on awareness and wishlist lift.",
    category: "Rhythm action",
    cover: "/firebase-public/Game Cover Art/gridbeat key art.webp",
    description:
      "Rhythm-heavy activation built for demo visibility, launch-day repetition, and social-friendly creator output. Streamers captured live moments that translated directly into wishlists.",
    about:
      "GRIDbeat is a top-down rhythm action game where every move, attack, and dodge happens on the beat. Navigate cyber labyrinths, dodge security traps, and break Cyber.Mind bosses with timing and pattern reading.",
    keyFeatures: [
      "Movement, combat, and interaction all happen on the beat, so timing is everything and rhythm equals survival.",
      "Navigate top-down cyber labyrinths packed with hidden paths, security traps, firewalls, and system hazards.",
      "Unlock evolving abilities and power-ups that let you adapt your rhythm and survive harder encounters.",
      "Face corrupted AI constructs and Cyber.Mind bosses built around pattern recognition and tight timing.",
      "Recovery moments, boss patterns, and flashy encounters make it built for clips and live chat reactions.",
    ],
    tiers: [
      { name: "Bronze", payout: "€10", requirement: "Stream 1 hour, 5 CCV", freeCopy: true },
      { name: "Silver", payout: "€25", requirement: "Stream 2 hours, 15 CCV", sideQuestsRequired: true, freeCopy: true },
    ],
    sideQuestDetails: [
      {
        name: "Link Sync",
        desc: "Get a friend to download and play GRIDbeat with you, then submit image proof of their session.",
      },
      {
        name: "Signal Boost",
        desc: "Share a GRIDbeat clip on social media outside of Twitch and submit the link in your VOD form.",
      },
      {
        name: "Launch Sequence",
        desc: "Support the launch by streaming on March 26. If you already streamed the demo and return for the full game, you can unlock a free key.",
      },
    ],
    freeCopy: true,
    links: {
      steam: "https://store.steampowered.com/app/3243370/GRIDbeat/?utm_source=streamquest",
      official: "https://streamquest.io/quest-gridbeat",
    },
  },

  {
    slug: "astroburn",
    title: "Astro Burn",
    status: "active",
    studio: "Pixel Doors × Beyond The Pixels",
    tagline: "Score-chasing bullet-hell cute-em-up. Physical-copy prize for top score.",
    category: "Bullet-hell co-op",
    cover: "/media/astroburn/Vertical Capsule.webp",
    description:
      "Score-chasing bullet-hell cute-em-up with co-op chaos and giant adorable bosses. By Pixel Doors × Beyond The Pixels. Physical copy prize for the highest score.",
    about:
      "Astro Burn is a 16-bit arcade tribute starring Astro the space cat and robot sidekick AL. Stack weapons, trigger Catnip specials, and chase the leaderboard across surreal stages with screen-filling bosses.",
    keyFeatures: [
      "A bright, chaotic retro-inspired cute-em-up that is instantly readable on stream and perfect for fast clip moments.",
      "Play as Astro the space cat with robot sidekick AL, a duo full of personality that sells the game at first glance.",
      "Stack multiple weapons, fire them all at once, and trigger anime-style Catnip specials for big chat wake-up moments.",
      "Chase a high-score leaderboard with mastery loops. A physical copy of the game goes to the top score during the campaign.",
      "Face giant screen-filling bosses and surreal enemies in a 16-bit arcade tribute built for solo or co-op runs.",
    ],
    tiers: [
      { name: "Bronze", payout: "€10", requirement: "Stream 1 hour, 5 CCV", freeCopy: true },
      { name: "Silver", payout: "€10", rate: "€10 / hr", rateNote: "€20 total (2 × €10)", requirement: "Stream 2+ hours", sideQuestsRequired: true, freeCopy: true },
    ],
    sideQuestDetails: [
      {
        name: "Meowments of Mayhem",
        desc: "Share a clip from your Astro Burn stream outside Twitch on X, YouTube, Instagram, or TikTok, and tag the official accounts. One strong moment is enough to give the campaign a second life.",
      },
      {
        name: "Wishlist Spreader",
        desc: "Share your StreamQuest tracked Astro Burn wishlist link on stream, in your creator surfaces, or in social posts so wishlists land through the campaign URL.",
      },
      {
        name: "Highest High Score",
        desc: "Submit your best Astro Burn score screenshot via Discord. The creator with the highest score during the campaign wins a physical copy of the game.",
      },
    ],
    freeCopy: true,
    links: {
      steam: "https://store.steampowered.com/app/3810660/Astro_Burn/?utm_source=SQ&utm_medium=wishlist&utm_campaign=AstroBurn&utm_content=tracked",
      official: "https://streamquest.io/astroburn",
    },
  },

  /* ============================================================
     COMPLETED QUESTS — minimum-viable data, page still renders.
     Flesh out later from squarespace-baseline/pages/*.html
     ============================================================ */

  {
    slug: "planetoflana2",
    title: "Planet of Lana 2",
    status: "completed",
    studio: "Thunderful × Sand Sailor Studio",
    tagline: "Cinematic indie storytelling. Wishlist-focused launch campaign.",
    category: "Cinematic adventure",
    cover: "/firebase-public/Game Cover Art/planet of lana 2 key art.webp",
    description: "Paid Twitch launch campaign for Planet of Lana II in partnership with Thunderful. Bronze and Silver streaming tiers with side quests to drive Steam wishlists during the launch window.",
    about: "Cinematic, story-rich indie adventure. Built for creators who lean into atmospheric, narrative-driven games and want to support indie launches at scale.",
  },
  {
    slug: "ascendant",
    title: "Ascendant",
    status: "completed",
    studio: "Wildcard Alliance",
    tagline: "Multiplayer arena push for early-access visibility.",
    category: "PvP arena",
    cover: "/firebase-public/Game Cover Art/ascendant key art.webp",
    description: "Demo activation campaign for Ascendant during PvP Fest. 50-slot Bronze and Silver creator activation across a one-week February window on Steam.",
    about: "Continuation of earlier playtests and closed creator sessions. The official Ascendant StreamQuest quest brought the project to a wider creator audience during PvP Fest.",
  },
  {
    slug: "godbreakers",
    title: "Godbreakers",
    status: "completed",
    studio: "Thunderful × Misty Whale",
    tagline: "Demo update push for Steam Next Fest. Co-op action with side quests.",
    category: "Co-op action",
    cover: "/firebase-public/Game Cover Art/godbreakers key art.webp",
    description: "Follow-up Godbreakers campaign timed to a major demo update for Steam Next Fest. New biomes, enemies, Tangles modifiers, and cosmetics. Creators came back from the first run and pushed it again.",
    about: "Co-op action with structured side quests. The first Godbreakers quest ran long, co-op sessions went wild, and the feedback was clear — everyone wanted more. This was the sequel quest.",
  },
  {
    slug: "taxichaos2",
    title: "Taxi Chaos 2",
    status: "completed",
    studio: "Focuspoint Studios × Current Games",
    tagline: "Steam Next Fest demo with exclusive creator early access.",
    category: "Arcade racing",
    cover: "/firebase-public/Game Cover Art/taxi chaos 2 key art.webp",
    description: "Steam Next Fest demo activation for Taxi Chaos 2 with Focuspoint Studios. Exclusive creator early access weekend before the public demo dropped — one-hour arcade taxi joyrides on stream.",
    about: "Choose a vehicle type — Heavy, Sport, or Drift — race through vibrant city streets, drift around corners, and deliver passengers on time. Pure arcade-style chaos, themed around the original Taxi Chaos returning in a wild new form.",
  },
  {
    slug: "drilldelve",
    title: "Drill and Delve",
    status: "completed",
    studio: "Goose Byte",
    tagline: "Demo discovery push around procedurally generated mining runs.",
    category: "Mining exploration",
    cover: "/firebase-public/Game Cover Art/drill and delve key art.webp",
    description: "Demo discovery push for Drill and Delve — a mining and exploration game set deep underground. Procedurally generated runs and competitive leaderboards drove the streamer-friendly loop.",
    about: "You play as a miner in the far future, working for a mega-mining corporation. A normal day on the job goes wrong, leaving you trapped inside a vast, crumbling mine. The only way out is to dig.",
  },
  {
    slug: "signal",
    title: "Signal",
    status: "completed",
    studio: "Goose Byte",
    tagline: "Open-world survival activation timed to a Kickstarter push.",
    category: "Open-world survival",
    cover: "/firebase-public/Game Cover Art/signal key art.webp",
    description: "Goose Byte's atmospheric open-world survival game The Signal stepped into a Kickstarter campaign alongside this StreamQuest activation. Creators became part of the launch push.",
    about: "Stranded on Sirenis. The Signal is an ambitious indie open-world survival project that Goose Byte self-funded for years before bringing it to community-backed development.",
  },
  {
    slug: "wildcard",
    title: "Wildcard",
    status: "completed",
    studio: "The Wildcard Alliance",
    tagline: "Two-week Early Access launch for a 2v2 card-action game.",
    category: "Card battler",
    cover: "/firebase-public/Game Cover Art/wildcard key art.webp",
    description: "Early Access launch campaign for Wildcard — a 2v2 free-to-play collectible card action game where deckbuilding meets real-time arena combat. Two-week activation in October across 50 creator slots.",
    about: "Choose your Champion, summon your allies, and battle your way to victory while streaming. Bronze tier €10 flat; Silver tier €15 per hour, paid on verified gameplay.",
  },
  {
    slug: "orbyss",
    title: "Orbyss",
    status: "completed",
    studio: "Misty Whale Studio",
    tagline: "Indie puzzle spotlight. Logic and light converge.",
    category: "Indie puzzle",
    cover: "/firebase-public/Game Cover Art/orbyss key art.webp",
    description: "Indie puzzle game spotlight in partnership with Misty Whale Studio. Logic and light converge in a mesmerizing puzzle format reimagined around rhythm, precision, and visual flow.",
    about: "Developed by a small French studio led by Yannick Audéoud. Orbyss takes the classic puzzle format and reshapes it into an experience of rhythm and pure visual flow.",
  },
  {
    slug: "tableflip",
    title: "TableFlip Simulator",
    status: "completed",
    studio: "Misty Whale Studio",
    tagline: "Viral-friendly clip campaign. Streamable on first contact.",
    category: "Physics sandbox",
    cover: "/firebase-public/Game Cover Art/tableflip key art.webp",
    description: "Two-week Bronze and Silver campaign for Table Flip Simulator. 50-slot creator activation across a February to March 2026 window on Steam.",
    about: "Physics-powered chaos therapy. De-stress by destroying everyday life situations without real-world consequences. Viral clip-friendly out of the box.",
  },
  {
    slug: "cyberclutch",
    title: "CyberClutch",
    status: "completed",
    studio: "1 Minus 1",
    tagline: "Competitive PvP playtest activation with full launch run.",
    category: "Competitive PvP",
    cover: "/firebase-public/Game Cover Art/cyberclutch key art.webp",
    description: "Competitive PvP activation for CyberClutch by 1 Minus 1. Creators stress-tested the gameplay loop, server stability, and content during the live activation window.",
    about: "Boutique-managed campaign with hands-on creator support throughout launch. Quoted by Sarah Newton (Operations Manager at 1 Minus 1) as a campaign where the streamers genuinely enjoyed themselves and it came through in the content.",
  },
];

/* ============================================================
   HELPERS — used by homepage, header, quest template, etc.
   ============================================================ */

export const activeQuests = quests.filter((q) => q.status === "active");
export const completedQuests = quests.filter((q) => q.status === "completed");

export const getQuestBySlug = (slug: string): Quest | undefined =>
  quests.find((q) => q.slug === slug);

export const allQuestSlugs = (): string[] => quests.map((q) => q.slug);
