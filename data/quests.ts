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
  /** Extra pills on the tier card, e.g. "All 3 side quests required". */
  flags?: string[];
};

/**
 * A key feature on the brief. A plain string is text only; the object form
 * adds a looping clip (`video`, mp4) with a `still` shown before it plays
 * and to anyone with reduced motion switched on.
 */
export type QuestFeature = string | { text: string; video?: string; still?: string };

/** A quote given its own section, with an optional drawing beside it. */
export type QuestQuote = {
  text: string;
  name: string;
  role?: string;
  image?: string;
  imageAlt?: string;
};

/**
 * Characters that keep the reader company once the hero is passed: a pair
 * in the bottom-right corner that leans and bobs as you scroll. `stand`
 * rests on the bottom edge, `float` hovers beside it (a ghost, say).
 */
export type QuestCompanion = { src: string; kind: "stand" | "float"; glow?: boolean };

export type QuestStatus = "active" | "completed";

/**
 * Named side quest for the rich active-quest cards. `objective` is the one
 * bold line saying what to do, `desc` the details, `proof` what to submit
 * (shown in its own strip), `tag` a short label such as "Required for Gold".
 */
export type SideQuestDetail = {
  name: string;
  desc: string;
  xp?: number;
  objective?: string;
  proof?: string;
  tag?: string;
};

/**
 * Videos driving the tabbed player on the brief.
 * `trailer` and `brief` are YouTube IDs. `briefVideo` is a self-hosted file
 * and takes precedence over `brief`. Set `briefPortrait` for 9:16 material
 * (a YouTube Short or a vertical upload) so the player renders phone-shaped
 * instead of pillarboxed in a 16:9 stage.
 */
export type QuestVideos = {
  trailer?: string;
  brief?: string;
  briefComingSoon?: boolean;
  briefVideo?: string;
  briefPoster?: string;
  briefPortrait?: boolean;
};

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
  /** Store marks, or any social platform so a tile can carry its own icon. */
  icon?: "steam" | "xbox" | "website" | "epic" | "gog" | QuestSocialType;
};

/** One rules paragraph with a header. */
export type QuestRuleBlock = { heading: string; body: string };

/** A How To Join step. Numbering is dropped per design system, only title + sub render. */
export type QuestStep = { title: string; sub: string };

/**
 * The main mission as a run of show for one stream, drawn as a bar split into
 * segments in order. `weight` is a segment's share of the bar (default 1).
 * `chips` split a segment into parts, such as three Ludeo links; a chip with
 * an `href` becomes a link. `end` labels the end of the bar, for example the
 * minimum stream time per tier.
 */
export type QuestMissionSegment = {
  label: string;
  sub: string;
  weight?: number;
  chips?: { label: string; href?: string }[];
};
export type QuestMainMission = {
  intro: string;
  segments: QuestMissionSegment[];
  end?: string;
  notes?: string[];
};

/** Generic key/value pair shown in the hero meta strip ("Duration · 2 weeks"). */
export type QuestHeroMetaItem = { label: string; value: string };

/**
 * One floating character in the interactive swarm band.
 * `x`/`y` are percentages inside the band, `size` is the rendered width in px
 * at desktop, and `depth` (0–1) drives parallax strength, scale and blur so
 * the layer reads as 3D. Higher depth = closer to the viewer = moves more.
 */
export type QuestSwarmItem = {
  src: string;
  alt?: string;
  x: number;
  y: number;
  size: number;
  depth: number;
  flip?: boolean;
};

/** Interactive character swarm band. Renders only when a quest supplies it. */
export type QuestSwarm = {
  eyebrow?: string;
  heading?: string;
  body?: string;
  hint?: string;
  items: QuestSwarmItem[];
};

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
  ogImage?: string;              // link preview image when shared (defaults to cover), e.g. titled key art
  description?: string;          // 2-3 sentence paragraph
  about?: string;                // longer "about the game" paragraph
  keyFeatures?: QuestFeature[];  // game-feature bullets shown on the brief, optionally with a clip
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
  storyAsideVideo?: string;             // looping clip; takes over from storyAside when set
  storyAsidePoster?: string;            // poster frame for storyAsideVideo
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
  swarm?: QuestSwarm;                   // interactive floating character band
  rulesContent?: QuestRuleBlock[];      // richer than `rules: string[]`
  rulesHeading?: string;                // overrides the rules heading ("Right of refusal, keys on Discord")
  mainMission?: QuestMainMission;       // run-of-show section for a main mission with several parts
  quote?: QuestQuote;                   // a quote in its own section, after the story
  companions?: QuestCompanion[];        // characters that scroll along in the corner
  howToJoin?: QuestStep[];              // optional override; defaults to standard six
  rating?: string;                      // "ESRB M (17+) / PEGI 16"
  slots?: number;
  /** Fully offline. No route is generated and it is hidden everywhere. */
  draft?: boolean;
  /**
   * Reachable at its own URL, but hidden from the homepage, header
   * dropdowns, library, related-quest grid and sitemap, and marked
   * noindex. For briefs shared by direct link only.
   */
  unlisted?: boolean;
  /**
   * The brief has its own hand-built route at app/quests/<slug>/page.tsx, so
   * the generic [slug] template must not generate it. Listings still link to
   * /quests/<slug> as usual.
   */
  customPage?: boolean;
  /**
   * The quest has a limited number of places. Gives it a row under "Limited
   * spots" in /admin, where the team keeps the "X of Y left" counter up to
   * date (see lib/questSpots.ts). The brief shows the counter only while a
   * value is saved there.
   */
  limitedSpots?: boolean;
  duration?: string;                    // "2 weeks"
};

/* ============================================================
   ACTIVE QUESTS — full detail, fully render on /quests/[slug]
   ============================================================ */

const allQuests: Quest[] = [
  {
    slug: "dancing-with-ghosts",
    title: "Dancing with Ghosts",
    status: "active",
    // Shared by direct link until the campaign page is greenlit and the
    // campaign dates and the three Ludeo links are in. Delete this line to
    // list it on the homepage, in the header and in the sitemap.
    unlisted: true,
    studio: "HumaNature Studios",
    tagline: "A gentle ghost story set in a Thai river village, from the creator of ToeJam & Earl.",
    category: "Cozy narrative life-sim",
    // Art from HumaNature's Early Access press kit (media assets/Dancing With
    // Ghosts - Early Access Press Kit): the key art without a title as the
    // cover, the wordmark as the homepage card overlay, the titled key art for
    // link previews. The kit's Bang Pa-In comparison photos are marked
    // unpublished and press-first, and its behind-the-scenes photos are of
    // Greg Johnson's family, so neither is used here.
    cover: "/media/dancing-with-ghosts/cover.webp",
    logo: "/media/dancing-with-ghosts/logo.webp",
    portrait: "/media/dancing-with-ghosts/portrait.webp",
    ogImage: "/media/dancing-with-ghosts/key-art-titled.webp",
    description:
      "Paid Twitch campaign for Dancing with Ghosts, the new game from ToeJam & Earl creator Greg Johnson. Play three Ludeo moments live, then the free Steam demo, and bring your chat along to a Thai river village.",
    // Clips are the press kit GIFs (05 GIFs) as small mp4 loops, with the
    // first frame as the still.
    keyFeatures: [
      {
        text: "Let chat choose Mai's words. Every conversation gives you two ways to answer, and there are no wrong picks.",
        video: "/media/dancing-with-ghosts/features/dialogue-b.mp4",
        still: "/media/dancing-with-ghosts/features/dialogue-b-still.webp",
      },
      {
        text: "Thai dance is a real rhythm game, with proper timing and several difficulties. Let chat pick one and cheer you through the song.",
        video: "/media/dancing-with-ghosts/features/dance-2.mp4",
        still: "/media/dancing-with-ghosts/features/dance-2-still.webp",
      },
      {
        text: "Play as both girls. As Pim you drift into villagers' thoughts and hear what they quietly wish for, then bring it back to Mai so she can help.",
        video: "/media/dancing-with-ghosts/features/fishing.mp4",
        still: "/media/dancing-with-ghosts/features/fishing-still.webp",
      },
      {
        text: "Small, calm minigames to talk over: rolling roti, making som tum, fishing, ferrying neighbors down the river, scooter deliveries.",
        video: "/media/dancing-with-ghosts/features/cooking-1.mp4",
        still: "/media/dancing-with-ghosts/features/cooking-1-still.webp",
      },
      {
        text: "Funny first, with real feeling underneath. Let the jokes land and give the quieter scenes a moment of room.",
        video: "/media/dancing-with-ghosts/features/journal.mp4",
        still: "/media/dancing-with-ghosts/features/journal-still.webp",
      },
      {
        text: "A village with real roots, drawn by Thai artists. Expect questions from chat about the food, the dance and the traditions.",
        video: "/media/dancing-with-ghosts/features/riverboat-1.mp4",
        still: "/media/dancing-with-ghosts/features/riverboat-1-still.webp",
      },
    ],
    tiers: [
      {
        name: "Bronze",
        payout: "€10",
        rate: "5+ average CCV",
        requirement:
          "The main mission in one stream of at least 1 hour: all three Ludeo moments, then the Steam demo, at 5 or more average concurrent viewers.",
      },
      {
        name: "Silver",
        payout: "€20",
        rate: "15+ average CCV",
        rateNote: "StreamQuest Silver tier unlocked",
        requirement:
          "The main mission in one stream of at least 2 hours, plus one side quest, at 15 or more average concurrent viewers.",
        sideQuestsRequired: true,
      },
      {
        name: "Gold",
        payout: "€50",
        rate: "50+ average CCV",
        rateNote: "StreamQuest Gold tier unlocked",
        requirement:
          "The main mission in one stream of at least 2 hours, plus all three side quests, at 50 or more average concurrent viewers.",
        flags: ["All 3 side quests required", "T1 regions only"],
      },
    ],
    sideQuestDetails: [
      {
        name: "A Moment Worth Sharing",
        objective: "Post a short clip from your stream on your own social channel.",
        desc: "A funny Pim exchange, an act of kindness, a dance attempt or a genuine reaction: something that gives people a reason to meet Mai and Pim. Avoid major story spoilers. Mention Dancing with Ghosts and tag @dancingwithghostsgame on Instagram or TikTok, or @DancingWithGhostsGame on YouTube.",
        proof: "The public URL of your post.",
      },
      {
        name: "Invite Chat to the Village",
        objective: "Put the tracked Steam wishlist link on your channel and give the game a shoutout.",
        desc: "Add the link from your accepted Quest to your Twitch panel, stream description or a chat command. Then mention the game naturally on stream and invite interested viewers to wishlist it. There is no minimum number of wishlists.",
        proof: "A screenshot of the link placement and a VOD timestamp for your shoutout.",
      },
      {
        name: "Take the Dance Floor",
        objective: "Play one full Thai dance song in the Steam demo.",
        desc: "Let chat help choose the difficulty, give it a proper go and tell them how it went. If chat is quiet, pick the difficulty yourself. You do not need a perfect score. It has to be in the demo, on top of any dance moment you played through Ludeo.",
        proof: "A VOD timestamp showing the full song and your invitation to chat.",
      },
    ],
    links: {
      steam: "https://store.steampowered.com/app/1352700/Dancing_with_Ghosts/",
      official: "https://dancingwithghosts.com",
      trailer: "https://www.youtube.com/watch?v=TSVLU0TPmck",
    },
    // Campaign dates come from the Quest settings and are not set yet, so no
    // `dates` here. Early Access itself is public: 8 October 2026 on Steam.
    platforms: ["PC (Steam)"],

    videos: {
      trailer: "TSVLU0TPmck",
      briefComingSoon: true,
    },

    heroMeta: [
      { label: "Early Access", value: "8 October 2026 on Steam" },
      { label: "Main mission", value: "3 Ludeo moments, then the Steam demo" },
      { label: "Tiers", value: "Bronze 5+, Silver 15+, Gold 50+ average CCV" },
      { label: "Stream time", value: "1 hour Bronze, 2 hours Silver and Gold" },
    ],

    tldr: [
      { stat: "€10", label: "Bronze", sub: "Main mission, 1 hour, 5+ average CCV" },
      { stat: "€20", label: "Silver", sub: "Main mission plus 1 side quest, 2 hours, 15+ CCV" },
      { stat: "€50", label: "Gold", sub: "Main mission plus all 3 side quests, 2 hours, 50+ CCV, T1 regions only" },
      { stat: "3", label: "Ludeo moments", sub: "Played live, then the Steam demo, in the same stream" },
    ],
    tldrFootnotes: [
      "Limited, curated slots: applying does not guarantee a place. Your tier, dates, links and exact requirements arrive with your approval.",
      "Silver and Gold also need the matching StreamQuest tier unlocked on your account. Bigger creator without that tier yet? Contact the mods in the StreamQuest Discord.",
      "Content note: the story deals with grief and loss, including a brief, non-graphic reference to suicide. Give your viewers a short heads-up. Nobody needs to share personal experiences.",
    ],

    mainMission: {
      intro: "One stream, in this order: the three Ludeo moments, then the Steam demo. Both parts are required for Bronze, Silver and Gold.",
      end: "1 hour Bronze · 2 hours Silver and Gold",
      segments: [
        {
          label: "Intro",
          sub: "Tell chat what Dancing with Ghosts is, and that Ludeo lets them play moments from it in a desktop browser.",
          weight: 1.3,
        },
        {
          label: "Three Ludeo moments",
          sub: "Play all three live and react. Share each link in chat so viewers on desktop can try it too. Opening a page alone does not count.",
          weight: 2.2,
          chips: [{ label: "Ludeo 1" }, { label: "Ludeo 2" }, { label: "Ludeo 3" }],
        },
        {
          label: "Steam demo",
          sub: "Follow Mai and Pim's story, explore the village and show how helping neighbors earns the karma that brings Pim's memories back.",
          weight: 2.6,
        },
      ],
      notes: [
        "Play the three Ludeo moments from the links above. Keep each link exactly as it is, tracking included. Viewers playing along is a bonus, not a requirement.",
        "Only active campaign gameplay counts toward the time. Breaks, starting-soon screens and other games do not.",
        "The Ludeo moments belong to the main mission, not to the side quests. If a link fails, tell us in Discord before you play something else instead.",
      ],
    },

    screenshots: [
      "/media/dancing-with-ghosts/screenshot-riverside-village-life.webp",
      "/media/dancing-with-ghosts/screenshot-cooking-minigame.webp",
      "/media/dancing-with-ghosts/screenshot-sacred-tree-mai-and-pim.webp",
      "/media/dancing-with-ghosts/screenshot-pim-dialogue-closeup.webp",
      "/media/dancing-with-ghosts/screenshot-scooter-minigame.webp",
      "/media/dancing-with-ghosts/screenshot-night-dock-scene.webp",
      "/media/dancing-with-ghosts/screenshot-floating-market.webp",
    ],

    storyParagraphs: [
      "Meet Mai, a grieving girl, and Pim, a little ghost who has lost her memories but none of her joy. Explore a Thai river village, help your neighbors, cook, dance and earn the good karma that brings Pim's memories back.",
      "Created by Greg Johnson, the designer behind ToeJam & Earl, Dancing with Ghosts draws on his experience of loss and his family's connection to Thailand. It is a warm, often funny story about friendship and finding your way back to happiness.",
      "We are looking for hosts who enjoy stories and bring their community along: creators who follow the dialogue, react honestly and give chat a say. You do not need to be a dedicated cozy creator.",
    ],
    storyAside: "/media/dancing-with-ghosts/story-mai-and-pim.webp",
    storyAsideCaption: "Mai and Pim",
    // Greg Johnson, quoted from the press kit's "In Greg's own words", beside
    // the sketchbook drawing of Mai and Pim dancing (07 Other Art).
    quote: {
      text: "At times I felt like I wanted this game to feel like a reassuring hug for people who need it... For everyone else, I hope they just enjoy a sweet funny ghost story and some great mini-games.",
      name: "Greg Johnson",
      role: "Creator of Dancing with Ghosts and ToeJam & Earl",
      image: "/media/dancing-with-ghosts/sketch-ray-of-sun.webp",
      imageAlt: "Sketchbook drawing of Mai and Pim dancing hand in hand: You're a ray of sun",
    },
    // Pim floats beside Mai in the corner as the page scrolls (07 Other Art).
    companions: [
      { src: "/media/dancing-with-ghosts/char-pim.webp", kind: "float", glow: true },
      { src: "/media/dancing-with-ghosts/char-mai.webp", kind: "stand" },
    ],
    shortDescription:
      "Dancing with Ghosts is a cozy narrative life-sim from HumaNature Studios, written by Greg Johnson of ToeJam & Earl. A gentle ghost story about learning to live after loss, with a Thai dance rhythm game and small cultural minigames along the way. Early Access on Steam from 8 October 2026, and the free demo is out now.",

    sideQuestIntro:
      "Silver needs one side quest, Gold needs all three. The Ludeo moments belong to the main mission, so they do not count here.",

    gallery: {
      wide: "/media/dancing-with-ghosts/screenshot-waterfront-wide.webp",
      thumbs: [
        "/media/dancing-with-ghosts/screenshot-rhythm-dance-perfect-2.webp",
        "/media/dancing-with-ghosts/screenshot-home-interior-mai-and-pim.webp",
        "/media/dancing-with-ghosts/screenshot-village-night-panorama.webp",
        "/media/dancing-with-ghosts/screenshot-journal-blessing-page.webp",
        "/media/dancing-with-ghosts/screenshot-mai-dialogue-closeup-2.webp",
        "/media/dancing-with-ghosts/screenshot-mai-and-pim-playful.webp",
      ],
    },

    officialAccounts: [
      {
        name: "StreamQuest",
        hint: "Campaign links, access and support, all on Discord.",
        links: [
          { type: "discord", href: "https://discord.gg/NhqfucYDXD" },
          { type: "instagram", href: "https://www.instagram.com/streamquest.io/" },
          { type: "tiktok", href: "https://www.tiktok.com/@streamquest.io" },
          { type: "youtube", href: "https://www.youtube.com/@StreamQuest_io" },
        ],
      },
      {
        name: "Dancing with Ghosts",
        hint: "The game's official accounts. Tag @dancingwithghostsgame in your clip for A Moment Worth Sharing.",
        links: [
          { type: "instagram", href: "https://www.instagram.com/dancingwithghostsgame/" },
          { type: "tiktok", href: "https://www.tiktok.com/@dancingwithghostsgame" },
          { type: "youtube", href: "https://www.youtube.com/@DancingWithGhostsGame" },
          { type: "discord", href: "https://discord.gg/XqKmx7qj4F" },
          { type: "website", href: "https://dancingwithghosts.com" },
        ],
      },
    ],

    storeLinks: [
      {
        name: "Steam",
        sub: "Dancing with Ghosts, Early Access from 8 October",
        href: "https://store.steampowered.com/app/1352700/Dancing_with_Ghosts/",
        icon: "steam",
      },
      {
        name: "Free demo",
        sub: "Dancing with Ghosts Demo on Steam, play it now",
        href: "https://store.steampowered.com/app/3986240/Dancing_with_Ghosts_Demo/",
        icon: "steam",
      },
      {
        name: "Gameplay trailer",
        sub: "Official, on the game's YouTube",
        href: "https://www.youtube.com/watch?v=9v_y8bGCqmM",
        icon: "youtube",
      },
    ],

    rulesHeading: "Right of refusal, support on Discord",
    rulesContent: [
      {
        heading: "Who we approve",
        body: "Engaged hosts who enjoy stories and bring their community along: story, cozy, adventure and variety creators who follow the dialogue, react naturally, give emotional scenes room to land and handle grief with care while enjoying the humor. Enjoyed Venba, Spiritfarer or A Space for the Unbound? Say so in your application. We look at recent broadcasts and community fit alongside your tier, not follower count alone. Silent gameplay, routinely skipping dialogue or using sensitive scenes for shock content are poor fits.",
      },
      {
        heading: "Viewers and tiers",
        body: "Your tier follows your recent average concurrent viewers (CCV) across your last streams: Bronze from 5, Silver from 15, Gold from 50. Silver and Gold also need the matching StreamQuest tier unlocked on your account, the rank you build up by completing quests. If you are a bigger creator and do not have that tier unlocked yet, get in touch with the mods in the StreamQuest Discord before you apply. Gold is for T1 regions only: the European Union, the United States, Canada, the United Kingdom, Norway, Switzerland, Iceland, Australia and New Zealand.",
      },
      {
        heading: "Before you go live",
        body: "Wait for approval, then check your accepted Quest for the dates, links, duration and tier requirements. Test all three Ludeo links on desktop and install the Steam demo before you stream. Use the required sponsorship disclosure, and give viewers the short content heads-up about grief and loss.",
      },
      {
        heading: "Proof",
        body: "Submit your Twitch VOD in the Creator Dashboard with timestamps for Ludeo 1, Ludeo 2, Ludeo 3 and the Steam demo segment, showing at least 1 hour of active campaign gameplay for Bronze or 2 hours for Silver and Gold. Include proof that you shared the three links in chat, plus the proof for each side quest. Keep your VOD available until it is verified.",
      },
    ],

    howToJoin: [
      { title: "Apply", sub: "In the Creator Dashboard, with your channel, a recent VOD and why the game suits your community" },
      { title: "Wait for approval", sub: "Curated. Check your tier, dates and links once accepted" },
      { title: "Join Discord", sub: "Campaign links and support live there" },
      { title: "Test first", sub: "Try the three Ludeo links on desktop and install the Steam demo" },
      { title: "Go live", sub: "Three Ludeo moments, then the demo, in one stream" },
      { title: "Submit", sub: "VOD with timestamps and side quest proof, paid after verification" },
    ],
  },
  {
    slug: "pixelwasher",
    title: "Pixel Washer",
    status: "active",
    studio: "Acclaim x Valadria",
    tagline: "Blast the grime off a pixel-art town as a pig with a power washer.",
    category: "Cozy cleaning sim",
    // No logo or press kit was supplied, so the art comes from Acclaim's public
    // press kit (playacclaim.com/pixel-washer-presskit) and Steam: the diorama
    // photo without a title as the cover, Steam's transparent library logo as
    // the homepage card overlay. The launch key art (sent later, logo painted
    // in, no clean version) leads the gallery and is the link preview. It is
    // also the release date trailer's YouTube thumbnail, which is why it stays
    // out of the hero: the trailer sits right under it.
    cover: "/media/pixelwasher/cover.webp",
    logo: "/media/pixelwasher/logo.webp",
    portrait: "/media/pixelwasher/portrait.webp",
    ogImage: "/media/pixelwasher/key-art-launch.webp",
    description:
      "Paid creator campaign for the Early Access launch of Pixel Washer, published by Acclaim. The campaign starts on launch day, 15 October 2026, and runs for two weeks: stream it live on Twitch, show off the wash, reveal and upgrade loop, and send interested viewers to Steam.",
    about:
      "In Pixel Washer you play Pigxel, a plucky pig with a powerful power washer, cleaning up a messy town: from hosing down pixel-art masterpieces in a filthy museum to turning a muddy pigsty into a shimmering pixelated paradise. Satisfying spray-and-play gameplay, clever mini-games and light business-sim upgrades as you take on ever dirtier jobs.",
    keyFeatures: [
      "Give it time to build. The opening teaches the cleaning loop, and later jobs add more to think about: tougher grime, water-efficient routes and puzzles hidden under the dirt.",
      "Make the transformation visible. Show the mess before you start, then give the clean result a moment on screen.",
      "Show what an upgrade changes. More pressure, a wider spray or a longer reach: compare it on the next job so chat sees the difference.",
      "Puzzles chat can solve with you. Murat's demo highlight was the memory level, where washing uncovers face-down cards and your chat gets to play along.",
      "Watch your footsteps and your water. An efficient clear, or accidentally tracking dirt across the floor you just cleaned, makes a good shared challenge.",
      "Clips that explain themselves. A perfect sweep, a last dirty corner or a sudden puzzle realisation works without a long explanation.",
    ],
    tiers: [
      {
        name: "Bronze",
        payout: "€10",
        rate: "5+ average CCV",
        requirement:
          "Complete the main mission: stream Pixel Washer on Twitch during your approved campaign window, for the gameplay duration and requirements shown in your accepted Quest, at 5 or more average concurrent viewers.",
      },
      {
        name: "Silver",
        payout: "€20",
        rate: "15+ average CCV",
        rateNote: "StreamQuest Silver tier unlocked",
        requirement:
          "The main mission plus at least one side quest, at 15 or more average concurrent viewers, with the StreamQuest Silver tier unlocked on your account.",
        sideQuestsRequired: true,
      },
      {
        name: "Gold",
        payout: "€50",
        rate: "50+ average CCV",
        rateNote: "StreamQuest Gold tier unlocked",
        requirement:
          "The main mission plus at least three side quests, including A Clean Clip, at 50 or more average concurrent viewers, with the StreamQuest Gold tier unlocked on your account. Gold places are limited and individually selected.",
      },
    ],
    sideQuestDetails: [
      {
        name: "Put It on Your Washlist",
        xp: 25,
        objective: "Put the tracked Steam link on your channel and give Pixel Washer a mention on stream.",
        desc: "Add the link to your Twitch panel, stream description or a chat command, and show interested viewers where to find the game. Before launch, invite them to wishlist it; once it is out, let them know it is available. The free demo is an easy way for viewers to try it themselves.",
        proof: "A screenshot of the link placement and a VOD timestamp for your mention.",
      },
      {
        name: "A Clean Clip",
        xp: 25,
        tag: "Required for Gold",
        objective: "Post a short clip from your Pixel Washer stream on your own social channel.",
        desc: "A satisfying before and after, an upgrade that makes a huge difference, a puzzle discovery, or the moment you accidentally make a fresh mess of your clean floor. Mention Pixel Washer, tag the Valadria and Acclaim accounts listed on this page, and keep the post public. Strong clips may be reposted with creator credit; that choice is up to the team.",
        proof: "The public post link.",
      },
      {
        name: "First on the Scene, First to Clean",
        xp: 25,
        objective: "Do your required stream during the launch-priority dates shown in your Quest.",
        desc: "Discover the game together with your community while it is fresh on Steam. Follow the confirmed embargo time before streaming or posting footage from your launch access: receiving a key early does not mean you can publish early.",
        proof: "VOD link, stream date and timestamps showing the qualifying gameplay.",
      },
      {
        name: "One More Puddle",
        xp: 25,
        objective: "Stream one extra hour of active Pixel Washer gameplay beyond your main Quest's required duration.",
        desc: "Not ready to put the hose down? Tackle more levels, upgrade your washer and give your community another round of satisfying clean-ups. Breaks, starting-soon screens and unrelated content do not count. This completes a side quest within your tier reward; it is not a separate hourly payment.",
        proof: "VOD link and timestamps showing your total qualifying gameplay time, including the extra hour.",
      },
    ],
    links: {
      steam: "https://store.steampowered.com/app/2572060/Pixel_Washer/?utm_source=StreamQuest&utm_medium=creator&utm_campaign=PixelWasher",
      official: "https://playacclaim.com/pixel-washer/",
      trailer: "https://www.youtube.com/watch?v=Opd1dNK9O7w",
    },
    // Starts on launch day and runs for two weeks. The submission deadline is not set yet.
    dates: { start: "2026-10-15" },

    /* -------- Rich brief content -------- */
    duration: "2 weeks",
    platforms: ["PC (Steam)"],

    videos: {
      trailer: "Opd1dNK9O7w",
      briefComingSoon: true,
    },

    heroMeta: [
      { label: "Campaign", value: "Starts 15 October 2026, runs 2 weeks" },
      { label: "Launch", value: "Steam Early Access, 15 October" },
      { label: "Tiers", value: "Bronze 5+, Silver 15+, Gold 50+ average CCV" },
      { label: "Free demo", value: "On Steam now" },
    ],

    tldr: [
      { stat: "€10", label: "Bronze", sub: "Main mission, 5+ average CCV" },
      { stat: "€20", label: "Silver", sub: "Main mission plus 1 side quest, 15+ CCV" },
      { stat: "€50", label: "Gold", sub: "Main mission plus 3 side quests with the clip, 50+ CCV" },
      { stat: "15 Oct", label: "Campaign start", sub: "Runs for two weeks from launch day" },
    ],
    tldrFootnotes: [
      "Limited, curated slots: applying does not guarantee a place. Your tier, exact requirements and access instructions arrive with your approval.",
      "Silver and Gold also need the matching StreamQuest tier unlocked on your account. If you are a bigger creator and do not have that tier yet, get in touch with the mods in the StreamQuest Discord.",
      "Want to get on our radar? Try the free demo and send Murat a short DM on Discord about why it suits your channel. It helps us assess fit, but it does not guarantee a slot, and demo play is not a paid completion.",
      "Side quests count toward Silver and Gold and earn 25 XP each. They carry no separate payment.",
    ],

    screenshots: [
      "/media/pixelwasher/screenshot-train.webp",
      "/media/pixelwasher/screenshot-cards.webp",
      "/media/pixelwasher/screenshot-lighthouse.webp",
      "/media/pixelwasher/screenshot-museum.webp",
      "/media/pixelwasher/screenshot-foodtruck.webp",
      "/media/pixelwasher/screenshot-boss.webp",
      "/media/pixelwasher/screenshot-monster.webp",
    ],

    storyParagraphs: [
      "Don't you just hate dirty pixels? Good news: now you can wash them. StreamQuest and Acclaim are recruiting Twitch creators for a paid two-week campaign that starts on Pixel Washer's launch day on Steam, 15 October 2026.",
      "You are Pigxel, a little pig with a power washer and a surprisingly long to-do list. Mud puddles, fossils, filthy houses: something always needs a rinse. Clear the grime, earn coins and upgrade your washer. Then try not to undo all that work by tracking dirt through the area you just cleaned.",
      "It starts with the satisfaction of a spotless surface. Keep going and you will find trickier clean-up jobs, water-efficient routes and puzzles, including a memory game hidden under the dirt. Give it time to get going. You might finish a level and start looking at your own driveway like an unfinished side quest.",
    ],
    storyPull:
      "If watching the grime come off was as satisfying for you as it was for me, Pixel Washer is on Steam. The link is in my panel.",
    storyAsideVideo: "/media/pixelwasher/fossil-loop.mp4",
    storyAsidePoster: "/media/pixelwasher/fossil-loop-poster.webp",
    storyAsideCaption: "A fossil under the grime",
    shortDescription:
      "Pixel Washer is a cozy pixel-art cleaning game from Valadria, published by Acclaim. It launches in Early Access on Steam on 15 October 2026, with a free demo available now and full Steam Deck support. A strong fit for creators whose audiences enjoy cozy games, satisfying before-and-after moments, and puzzles that chat can solve with you.",

    sideQuestIntro:
      "Four side quests, each worth 25 StreamQuest XP. Bronze needs none, Silver needs at least one and Gold needs at least three, including A Clean Clip.",
    sideQuestOutro:
      "Side quests count toward your tier and earn XP. They carry no separate payment, and the extra hour in One More Puddle is not an hourly rate.",

    trackedWishlistUrl: "https://store.steampowered.com/app/2572060/Pixel_Washer/?utm_source=StreamQuest&utm_medium=creator&utm_campaign=PixelWasher",
    trackedWishlistNote:
      "This is the shared campaign link. It identifies the Pixel Washer campaign, not individual creators, so it is not a personal referral link. Use the tracked link supplied in your accepted Quest, in your panel, description or chat command, and keep its tracking parameters intact.",

    gallery: {
      wide: "/media/pixelwasher/screenshot-billboard.webp",
      thumbs: [
        "/media/pixelwasher/key-art-launch.webp",
        "/media/pixelwasher/screenshot-cards.webp",
        "/media/pixelwasher/screenshot-train.webp",
        "/media/pixelwasher/screenshot-museum.webp",
        "/media/pixelwasher/screenshot-lighthouse.webp",
        "/media/pixelwasher/screenshot-boss.webp",
        "/media/pixelwasher/screenshot-foodtruck.webp",
        "/media/pixelwasher/screenshot-town.webp",
      ],
    },

    officialAccounts: [
      {
        name: "StreamQuest",
        hint: "Campaign access, embargo instructions and support, all on Discord.",
        links: [
          { type: "discord", href: "https://discord.gg/NhqfucYDXD" },
          { type: "instagram", href: "https://www.instagram.com/streamquest.io/" },
          { type: "tiktok", href: "https://www.tiktok.com/@streamquest.io" },
          { type: "youtube", href: "https://www.youtube.com/@StreamQuest_io" },
        ],
      },
      {
        name: "Valadria",
        hint: "Developer of Pixel Washer. Their Discord is the game's community server. Tag @richtaur on your Clean Clip.",
        links: [
          { type: "x", href: "https://x.com/richtaur" },
          { type: "tiktok", href: "https://www.tiktok.com/@richtaur" },
          { type: "instagram", href: "https://www.instagram.com/richtaur/" },
          { type: "bluesky", href: "https://bsky.app/profile/richtaur.bsky.social" },
          { type: "youtube", href: "https://www.youtube.com/@Valadria" },
          { type: "discord", href: "https://discord.com/invite/ZmSNkuPDfu" },
        ],
      },
      {
        name: "Acclaim",
        hint: "Publisher of Pixel Washer. Tag @PlayAcclaim on your Clean Clip.",
        links: [
          { type: "x", href: "https://x.com/PlayAcclaim" },
          { type: "tiktok", href: "https://www.tiktok.com/@playacclaim" },
          { type: "youtube", href: "https://www.youtube.com/@PlayAcclaim" },
          { type: "twitch", href: "https://www.twitch.tv/playacclaim" },
          { type: "website", href: "https://playacclaim.com/pixel-washer/" },
        ],
      },
    ],

    storeLinks: [
      {
        name: "Steam",
        sub: "Pixel Washer, campaign link",
        href: "https://store.steampowered.com/app/2572060/Pixel_Washer/?utm_source=StreamQuest&utm_medium=creator&utm_campaign=PixelWasher",
        icon: "steam",
      },
      {
        name: "Free demo",
        sub: "Pixel Washer Demo on Steam, play it now",
        href: "https://store.steampowered.com/app/3145410/Pixel_Washer_Demo/",
        icon: "steam",
      },
      {
        name: "Press kit",
        sub: "Logos, key art, screenshots and GIFs from Acclaim",
        href: "https://playacclaim.com/pixel-washer-presskit/",
        icon: "website",
      },
      {
        name: "Gameplay trailer",
        sub: "Official, on Acclaim's YouTube",
        href: "https://www.youtube.com/watch?v=Ejk1-glNxi0",
        icon: "youtube",
      },
    ],

    rulesContent: [
      {
        heading: "Curated, limited slots",
        body: "This campaign has limited, curated slots. Applying does not guarantee a place. Selected creators receive their tier, exact requirements and access instructions in the Creator Dashboard before accepting. Gold places are limited and individually selected, and your approval confirms your tier and qualifying gameplay duration.",
      },
      {
        heading: "Viewers and tiers",
        body: "Your tier follows your recent average concurrent viewers (CCV) across your last streams: Bronze from 5, Silver from 15, Gold from 50. Silver and Gold also need the matching StreamQuest tier unlocked on your account, the rank you build up by completing quests. If you are a bigger creator and do not have that tier unlocked yet, get in touch with the mods in the StreamQuest Discord before you apply.",
      },
      {
        heading: "Get on our radar",
        body: "Try the free demo and send Murat a short DM on the StreamQuest Discord explaining why Pixel Washer suits your channel: what you enjoyed, what your community would respond to, or what you would do with it on stream. Demo playtime and anything you share help us assess fit and earn priority consideration. They do not guarantee a slot, and playing the demo before approval is not a paid Quest completion.",
      },
      {
        heading: "Launch timing and embargo",
        body: "The campaign starts on launch day, 15 October 2026, and runs for two weeks. Launch-day availability is a priority when selecting creators. Your accepted Quest specifies the eligible game build and dates, and early demo play does not count toward this launch campaign. Follow the confirmed embargo time before streaming or posting footage from your launch access.",
      },
      {
        heading: "Access and keys",
        body: "The free demo is available now. Full-game key delivery details will be shared with approved creators once confirmed. We coordinate access, embargo instructions and submissions in the StreamQuest Discord, so confirm your channel and Discord handle there so we can reach you.",
      },
      {
        heading: "Disclosure and the tracked link",
        body: "Use the required sponsorship disclosure. Add the tracked Steam link supplied in your accepted Quest, keep its tracking parameters intact, and do not shorten it or swap it for a plain store link.",
      },
      {
        heading: "Proof",
        body: "Submit your Twitch VOD, stream date and proof for each completed side quest through the Creator Dashboard by the deadline shown in your Quest. Add timestamps so we can find your gameplay and side-quest moments. Only active Pixel Washer gameplay counts toward the required duration. Keep your VOD and required social posts accessible for verification. Need help with your submission? Our Discord DMs are open.",
      },
    ],

    howToJoin: [
      { title: "Apply", sub: "For the Pixel Washer Quest in the Creator Dashboard" },
      { title: "Wait for approval", sub: "Curated. Read your tier, dates and requirements once accepted" },
      { title: "Join Discord", sub: "Confirm your channel and handle so we can reach you" },
      { title: "Stream the launch", sub: "From 15 October, inside the two-week window" },
      { title: "Submit", sub: "VOD, stream date, timestamps and side quest proof" },
      { title: "Get paid", sub: "After verification" },
    ],
  },
  {
    slug: "meadgard",
    title: "Meadgard",
    status: "active",
    studio: "Oddiko",
    tagline: "Run a Viking tavern with your crew. Hunt, cook, brew, and survive the rush.",
    category: "Co-op adventure",
    // Key art without the painted title, plus the logo as its own layer: the
    // homepage card darkens the cover and centres `logo` on it, so a titled
    // cover would print the name twice there. The titled art is in the gallery.
    cover: "/media/meadgard/cover-plain.webp",
    logo: "/media/meadgard/logo.webp",
    portrait: "/media/meadgard/key-art-vertical.webp",
    description:
      "Paid creator campaign for the Meadgard demo by Oddiko. Stream the demo live on Twitch between 7 and 26 October 2026, run the tavern with your crew, and send interested viewers to the Steam wishlist.",
    about:
      "Meadgard is a chaotic co-op tavern adventure for 1 to 4 players. Battle mythological creatures by day, serve rowdy tavern customers by night, and hunt, cook, brew and fight your way to the grandest feast Valhalla has ever seen. Coming to PC on Steam.",
    keyFeatures: [
      "Chaotic co-op for 1 to 4 players. Work together to run the tavern, or scream at each other while everything catches fire.",
      "Hunt monsters for ingredients. Fight mythical creatures and drag your hard-earned supplies back home before nightfall.",
      "Run a Viking tavern under pressure. Cook meals, pour mead, entertain guests, and survive increasingly demanding customers.",
      "Face the Norse gods themselves. Impress legendary visitors or suffer the consequences of divine disappointment.",
      "Upgrade Valhalla. Customise your tavern and unlock new weapons, shops, cosmetics, crops and recipes.",
      "A Norse mythology adventure with heart. Bizarre creatures, eccentric villagers, and gods with surprisingly personal problems.",
    ],
    tiers: [
      {
        name: "Bronze",
        payout: "€10",
        rate: "5+ average CCV",
        requirement:
          "Complete the main mission: stream the Meadgard demo on Twitch during the campaign window, for the gameplay duration and requirements shown in your accepted Quest, at 5 or more average concurrent viewers.",
      },
      {
        name: "Silver",
        payout: "€20",
        rate: "15+ average CCV",
        rateNote: "StreamQuest Silver tier unlocked",
        requirement:
          "The main mission plus at least one side quest, at 15 or more average concurrent viewers, with the StreamQuest Silver tier unlocked on your account.",
        sideQuestsRequired: true,
      },
      {
        name: "Gold",
        payout: "€50",
        rate: "50+ average CCV",
        rateNote: "StreamQuest Gold tier unlocked",
        requirement:
          "The main mission plus at least three side quests, at 50 or more average concurrent viewers, with the StreamQuest Gold tier unlocked on your account.",
      },
    ],
    sideQuestDetails: [
      {
        name: "Assemble the Longtable",
        objective: "Play Meadgard on stream with a friend or your co-op crew.",
        desc: "Bring them along with the bonus keys supplied through Discord and show how you work together to run the tavern.",
        proof: "VOD link and timestamps showing co-op gameplay. Include teammate handles where you can; friends do not need a Twitch channel.",
      },
      {
        name: "Raise a Mug for Meadgard",
        objective: "Put the tracked Steam wishlist link on your channel and give Meadgard a shoutout on stream.",
        desc: "Place the link in your Twitch panel, stream description or a chat command, and let interested viewers know where they can wishlist the game.",
        proof: "A screenshot of the link placement and a VOD timestamp for your mention.",
      },
      {
        name: "Tavern Tale",
        objective: "Post a short clip from your Meadgard stream on your own social channel.",
        desc: "A funny co-op moment, a mistake, a recovery or a highlight. Mention Meadgard and tag the official account: on Instagram you can invite @oddikogames as a Reel collaborator, on TikTok tag @meadgard, on Bluesky tag @oddikogames.bsky.social. That gives the team the chance to share your clip and shout out your channel, though collaboration acceptance and reposting are up to them.",
        proof: "The public post link.",
      },
      {
        name: "Keep the Fires Burning",
        objective: "Stream one extra hour of active Meadgard gameplay beyond your main Quest's required duration.",
        desc: "Keep playing, explore more of the demo and give your community more time with the game. Breaks, starting-soon screens and unrelated content do not count as gameplay time. This completes a side quest within your tier reward; it is not a separate hourly payment.",
        proof: "VOD link and timestamps showing your total qualifying gameplay time, including the extra hour.",
      },
    ],
    links: {
      steam: "https://store.steampowered.com/app/2433560/Meadgard/?utm_source=streamquest&utm_medium=creator&utm_campaign=meadgard_demo_2026",
      official: "https://www.oddiko.com/",
      trailer: "https://www.youtube.com/watch?v=aTUeoWEy69g",
    },
    dates: { start: "2026-10-07", end: "2026-10-26" },

    /* -------- Rich brief content -------- */
    duration: "Oct 7 to 26, 2026",
    platforms: ["PC (Steam)"],

    videos: {
      trailer: "aTUeoWEy69g",
      briefComingSoon: true,
    },

    heroMeta: [
      { label: "Campaign window", value: "7 to 26 October 2026" },
      { label: "Tiers", value: "Bronze 5+, Silver 15+, Gold 50+ average CCV" },
      { label: "Game access", value: "Demo key via Discord" },
      { label: "Co-op", value: "1 to 4 players, bonus keys for friends" },
    ],

    tldr: [
      { stat: "€10", label: "Bronze", sub: "Main mission, 5+ average CCV" },
      { stat: "€20", label: "Silver", sub: "Main mission plus 1 side quest, 15+ CCV" },
      { stat: "€50", label: "Gold", sub: "Main mission plus 3 side quests, 50+ CCV" },
      { stat: "4", label: "Side quests", sub: "Co-op, the wishlist link, a clip, an extra hour" },
    ],
    tldrFootnotes: [
      "Curated activation: applying does not confirm a place. Your tier, exact requirements, access instructions and tracked link arrive with your approval.",
      "Silver and Gold also need the matching StreamQuest tier unlocked on your account. If you are a bigger creator and do not have that tier yet, get in touch with the mods in the StreamQuest Discord.",
      "Your Meadgard access key and bonus keys for friends come through the StreamQuest Discord.",
      "Side quests count toward Silver and Gold. They carry no separate payment.",
    ],

    screenshots: [
      "/media/meadgard/screenshot-tavern-1.webp",
      "/media/meadgard/screenshot-explore.webp",
      "/media/meadgard/screenshot-farm.webp",
      "/media/meadgard/screenshot-troll-cave.webp",
      "/media/meadgard/screenshot-brokkr.webp",
      "/media/meadgard/screenshot-mimer.webp",
    ],

    /* Villagers, a flock of sheep and tavern fare drifting down both margins.
       The press kit's chicken and duck files are sprite sheets (eight birds in
       a grid), which read as a texture rather than a character, so they stay out. */
    swarm: {
      items: [
        { src: "/media/meadgard/art/brokkr.webp", alt: "Brokkr the blacksmith", x: 77, y: 7, size: 230, depth: 0.72 },
        { src: "/media/meadgard/art/tankard.webp", alt: "Tankard of mead", x: 79, y: 22, size: 130, depth: 0.5 },
        { src: "/media/meadgard/art/eitra.webp", alt: "Eitra the witch", x: 3, y: 16, size: 210, depth: 0.7 },
        { src: "/media/meadgard/art/platter.webp", alt: "Viking platter", x: 78, y: 36, size: 150, depth: 0.45 },
        { src: "/media/meadgard/art/sheep.webp", alt: "Sheep", x: 4, y: 42, size: 190, depth: 0.6 },
        { src: "/media/meadgard/art/ernst.webp", alt: "Ernst the carpenter", x: 77, y: 50, size: 220, depth: 0.75, flip: true },
        { src: "/media/meadgard/art/honey.webp", alt: "Jar of honey", x: 5, y: 57, size: 120, depth: 0.45 },
        { src: "/media/meadgard/art/fryingpan.webp", alt: "Frying pan", x: 3, y: 70, size: 140, depth: 0.5 },
        { src: "/media/meadgard/art/mushroom.webp", alt: "Fly agaric mushroom", x: 78, y: 68, size: 125, depth: 0.42 },
        { src: "/media/meadgard/art/perch.webp", alt: "Perch", x: 4, y: 84, size: 150, depth: 0.58, flip: true },
      ],
    },

    storyParagraphs: [
      "Raise the longtable. StreamQuest and Oddiko are running a curated paid campaign around the Meadgard demo, and we are looking for creators who can carry a co-op tavern stream: hunting for ingredients by day, cooking, brewing and serving a rowdy crowd by night, and keeping their crew laughing while everything catches fire.",
      "Your job is to make the gameplay the focus. Bring friends in with the bonus keys, react naturally, pull chat into the calls, and turn the mistakes and recoveries into the moments people clip. The demo has plenty to explore, so keep playing, try new recipes and let the chaos build.",
      "Your honest opinion stays yours. We want an entertaining tavern stream, not an ad read. The requirements are strict so that every verified completion is measured the same way.",
    ],
    storyPull:
      "If running a Viking tavern with your friends sounds like your kind of chaos, wishlist Meadgard through my link.",
    storyAsideVideo: "/media/meadgard/tavern-loop.mp4",
    storyAsidePoster: "/media/meadgard/tavern-loop-poster.webp",
    storyAsideCaption: "Dinner rush in the tavern",
    shortDescription:
      "Meadgard is a chaotic co-op tavern adventure for 1 to 4 players from Oddiko, coming to PC on Steam. A strong fit for creators whose audiences enjoy co-op chaos, cosy management games, cooking sims, and Norse mythology with a sense of humour.",

    sideQuestIntro:
      "Four side quests on this campaign. Bronze needs none, Silver needs at least one and Gold needs at least three. Each comes with the proof you submit alongside your VOD.",
    sideQuestOutro:
      "Side quests count toward your tier. They do not carry a separate payment, and the extra hour in Keep the Fires Burning is not an hourly rate.",

    trackedWishlistUrl:
      "https://store.steampowered.com/app/2433560/Meadgard/?utm_source=streamquest&utm_medium=creator&utm_campaign=meadgard_demo_2026",
    trackedWishlistNote:
      "This is the shared campaign link. It identifies the Meadgard campaign, not individual creators, so it is not a personal referral link. Use the tracked link provided in your Quest exactly as given, in your panel, description, chat command or social post, and keep all tracking parameters intact.",

    gallery: {
      wide: "/media/meadgard/odin.webp",
      thumbs: [
        "/media/meadgard/key-art-titled.webp",
        "/media/meadgard/key-art-variant.webp",
        "/media/meadgard/screenshot-tavern-1.webp",
        "/media/meadgard/screenshot-troll-cave.webp",
        "/media/meadgard/screenshot-explore.webp",
        "/media/meadgard/screenshot-farm.webp",
        "/media/meadgard/screenshot-brokkr.webp",
        "/media/meadgard/screenshot-mimer.webp",
      ],
    },

    officialAccounts: [
      {
        name: "StreamQuest",
        hint: "Keys, bonus keys for friends and campaign support, all on Discord.",
        links: [
          { type: "discord", href: "https://discord.gg/NhqfucYDXD" },
          { type: "instagram", href: "https://www.instagram.com/streamquest.io/" },
          { type: "tiktok", href: "https://www.tiktok.com/@streamquest.io" },
          { type: "youtube", href: "https://www.youtube.com/@StreamQuest_io" },
        ],
      },
      {
        name: "Meadgard",
        hint: "Tag @meadgard on TikTok for your Tavern Tale clip.",
        links: [
          { type: "tiktok", href: "https://www.tiktok.com/@meadgard" },
          { type: "website", href: "https://store.steampowered.com/app/2433560/Meadgard/" },
        ],
      },
      {
        name: "Oddiko",
        hint: "Developer of Meadgard. Invite @oddikogames as a Reel collaborator, tag @oddikogames.bsky.social on Bluesky.",
        links: [
          { type: "instagram", href: "https://www.instagram.com/oddikogames/" },
          { type: "bluesky", href: "https://bsky.app/profile/oddikogames.bsky.social" },
          { type: "youtube", href: "https://www.youtube.com/@OddikoGames" },
          { type: "website", href: "https://www.oddiko.com/" },
        ],
      },
    ],

    storeLinks: [
      {
        name: "Steam",
        sub: "Wishlist Meadgard, campaign link",
        href: "https://store.steampowered.com/app/2433560/Meadgard/?utm_source=streamquest&utm_medium=creator&utm_campaign=meadgard_demo_2026",
        icon: "steam",
      },
      {
        name: "Press kit",
        sub: "Key art, screenshots, logos and B-roll on Google Drive",
        href: "https://drive.google.com/drive/folders/1AAuWONte45Co-Xcs6n2biI4aZnbydeiE",
        icon: "website",
      },
      {
        name: "Oddiko",
        sub: "oddiko.com",
        href: "https://www.oddiko.com/",
        icon: "website",
      },
      {
        name: "Demo announcement trailer",
        sub: "The MIX Summer Showcase 2026",
        href: "https://www.youtube.com/watch?v=aTUeoWEy69g",
        icon: "youtube",
      },
      {
        name: "Meadgard on TikTok",
        sub: "@meadgard",
        href: "https://www.tiktok.com/@meadgard",
        icon: "tiktok",
      },
    ],

    rulesContent: [
      {
        heading: "Curated, not first come first served",
        body: "This is a curated creator activation. Completing an application does not confirm a place. Selected creators receive their individual tier, exact requirements, access instructions and tracked link in the Creator Dashboard before accepting. Wait for approval before you plan a stream.",
      },
      {
        heading: "Viewers and tiers",
        body: "Your tier follows your recent average concurrent viewers (CCV) across your last streams: Bronze from 5, Silver from 15, Gold from 50. Silver and Gold also need the matching StreamQuest tier unlocked on your account, the rank you build up by completing quests. If you are a bigger creator and do not have that tier unlocked yet, get in touch with the mods in the StreamQuest Discord before you apply.",
      },
      {
        heading: "Keys come through Discord",
        body: "Approved creators receive their Meadgard access key through the StreamQuest Discord, plus bonus keys so you can play with your friends. Join before you go live. The Discord is also where campaign support happens.",
      },
      {
        heading: "Embargo",
        body: "Follow the embargo instructions supplied with your access. Early access does not permit early streaming or posting. Qualifying streams happen inside the campaign window, 7 to 26 October 2026.",
      },
      {
        heading: "The main mission",
        body: "Stream the Meadgard demo on Twitch during the campaign window, meeting the gameplay duration and requirements shown in your accepted Quest. Show your community the game: hunt for ingredients, cook, brew, serve and deal with the tavern's co-op chaos. Keep your commentary natural and make the experience your own.",
      },
      {
        heading: "Disclosure and the tracked link",
        body: "Use the required sponsorship disclosure. Use the tracked Steam link provided in your Quest and keep all tracking parameters intact. Do not shorten it or swap it for a plain store link.",
      },
      {
        heading: "Proof",
        body: "Submit your Twitch VOD, stream date and proof for each completed side quest through the Creator Dashboard by the deadline shown in your Quest. Keep your VOD and any required social posts accessible for verification.",
      },
    ],

    howToJoin: [
      { title: "Apply", sub: "For the Meadgard Quest in the Creator Dashboard" },
      { title: "Wait for approval", sub: "Curated. Check your tier and requirements once accepted" },
      { title: "Join Discord", sub: "Your access key and bonus keys for friends arrive there" },
      { title: "Stream the demo", sub: "7 to 26 October, with the tracked link and disclosure" },
      { title: "Submit", sub: "VOD, stream date and side quest proof, before the deadline" },
      { title: "Get paid", sub: "After verification" },
    ],
  },
  {
    slug: "ludeo",
    customPage: true,
    limitedSpots: true,
    title: "Ludeo",
    status: "active",
    studio: "Ludeo",
    tagline: "Paid short-form mission. Show the moment, explain Ludeo, invite players in.",
    category: "Short-form",
    // Plain collage plus a separate logo layer, like Ground Zero Hero: the
    // homepage card darkens the cover and centres `logo` on it. A cover with
    // the logo baked in would print the name twice there. (The baked version,
    // cover.webp, is still the page's social share image.)
    cover: "/media/ludeo/quest/cover-plain.webp",
    logo: "/media/ludeo/ludeo-logo-color.svg",
    portrait: "/media/ludeo/quest/portrait.webp",
    // End date not announced yet. The brief shows the start from its own
    // CAMPAIGN_START constant (app/quests/ludeo/page.tsx); keep the two in step.
    dates: { start: "2026-09-25" },
    videos: { brief: "oL77d6mEJxU", briefPortrait: true },
    description:
      "Paid short-form creator mission for Ludeo. Make one edited vertical video, 45 seconds or longer, that introduces Ludeo, shows a few Playables and invites your audience into the Ludeo Discord. Post it on TikTok, Instagram Reels and YouTube Shorts and get paid on your best-performing post. Guaranteed base plus performance rewards, up to EUR 250.",
    about:
      "Ludeo turns memorable gameplay moments into experiences people can play directly from their desktop browser. Instead of only watching a clip, someone opens the Ludeo link and jumps into that playable moment themselves.",
  },
  {
    slug: "riftfall",
    title: "RIFTFALL",
    status: "active",
    studio: "GameEra Studios",
    tagline: "Fast, brutal retro FPS. Two hours in the rift, on the free demo.",
    category: "Retro FPS",
    cover: "/media/riftfall/key-art-horizontal.webp",
    portrait: "/media/riftfall/key-art-vertical.webp",
    description:
      "Paid creator campaign for the free RIFTFALL demo by GameEra Studios. Stream two hours of the public Steam demo live on Twitch, show the speed and the secrets, and send interested viewers to the demo and wishlist.",
    about:
      "RIFTFALL is a fast, brutal single-player retro FPS built around speed, heavy weapons, secrets, permanent upgrades, squad support, and arena-style encounters. The full game has a 20-level campaign, five weapons with alternate fire modes, 60+ enemy types, four AI marine squadmates, and puzzle-driven bosses. The free public Steam demo covers five levels and is built for repeat runs, so there is plenty to dig into across a two-hour stream.",
    keyFeatures: [
      "Fast, aggressive retro FPS combat. Movement and speed read instantly on stream.",
      "Five weapons with alternate fire modes, plus permanent upgrades between runs.",
      "Secrets, alternate routes, and hidden areas that reward exploring on camera.",
      "Four AI marine squadmates that create tactical and chaotic moments in a fight.",
      "60+ enemy types and arena-style encounters built for close calls and clutch escapes.",
      "Free public demo on Steam. No key needed, and your viewers can play it immediately.",
    ],
    tiers: [
      {
        name: "Silver",
        payout: "EUR 20",
        requirement:
          "Stream 2 hours of the RIFTFALL demo with active spoken commentary, at 15 to 49 recent average viewers.",
      },
      {
        name: "Gold",
        payout: "EUR 50",
        requirement:
          "Stream 2 hours of the RIFTFALL demo with active spoken commentary, at 50+ recent average viewers.",
      },
    ],
    sideQuestDetails: [
      {
        name: "Rift Social",
        xp: 50,
        desc: "Share a clip of your best commentary or an epic moment on your social channels outside Twitch. Instagram, X, and YouTube all count. Use #riftfall, tag the official RIFTFALL and StreamQuest handles supplied with your approval, and keep the post public so we can validate it. It has to be your own gameplay or commentary: a trailer repost does not count.",
      },
      {
        name: "Co-op Companion",
        xp: 50,
        desc: "RIFTFALL has an online co-op mode, and it is a lot more fun with someone else in the rift with you. Pull a friend in and stream a run together. Covering each other, splitting up to hunt secrets, and the moment a clean plan turns into total chaos all make for great stream moments and even better clips. Flag the co-op segment with a timestamp in your submission.",
      },
      {
        name: "Wishlist Supporter",
        xp: 50,
        desc: "Share the tracked wishlist link during your stream or in a social post and help RIFTFALL climb the Steam charts. Pin it in chat, drop it in a panel, put it in your post description, or all three. Wishlists are what move the needle for a game before launch, so this one genuinely helps the studio.",
      },
    ],
    rules: [
      "Wait for written approval before you go live. This campaign is curated and applying does not secure a slot.",
      "Install the free public RIFTFALL demo on Steam and test your capture, microphone, game audio, and chat setup first.",
      "Launch the demo and press P twice before you go live to remove the one-hour demo limit. Confirm it is gone before starting.",
      "Stream at least 2 hours of actual demo gameplay with active spoken commentary, in the Twitch category supplied with your approval.",
      "Disclose the paid activation through Twitch's paid-promotion tools and with a clear verbal or written disclosure.",
      "Use the exact tracked link supplied with your approval. Do not shorten it, replace it, or strip its tracking.",
      "Give at least one clear verbal call to action inviting viewers to try the free demo and wishlist RIFTFALL.",
      "Keep a public VOD available and submit it through the creator dashboard before the deadline.",
      "Your stream may be reused for promotional purposes. RIFTFALL will always credit your name and channel when they do, so it doubles as cross-promotion for you.",
      "Steam reviews are never required, rewarded, gated, or incentivised, and never affect payment or approval.",
    ],
    links: {
      steam: "https://store.steampowered.com/app/4965490/RIFTFALL/",
      official: "https://game-era.com",
      twitch: "https://www.twitch.tv/directory/category/riftfall",
    },
    dates: { start: "2026-09-07", end: "2026-09-20" },

    /* -------- Rich brief content -------- */
    duration: "Sep 7 to 20, 2026",
    slots: 25,
    rating: "TBA",
    platforms: ["PC (Steam)"],

    videos: {
      trailer: "vDXw2ehaQGA",
      briefComingSoon: true,
    },

    heroMeta: [
      { label: "Campaign window", value: "Sep 7 to 20, 2026" },
      { label: "Tiers", value: "Silver and Gold" },
      { label: "Game access", value: "Free public demo" },
      { label: "Required stream", value: "2 hours" },
    ],

    tldr: [
      { stat: "EUR 20", label: "Silver tier", sub: "2h stream, 15 to 49 average viewers" },
      { stat: "EUR 50", label: "Gold tier", sub: "2h stream, 50+ average viewers" },
      { stat: "50 XP", label: "Side quests", sub: "Three to choose from, XP only" },
      { stat: "25", label: "Slots", sub: "Curated, applying is not a slot" },
    ],
    tldrFootnotes: [
      "No key needed. The campaign runs on the free public RIFTFALL demo on Steam.",
      "Press P twice before you go live to remove the one-hour demo limit.",
      "Silver and Gold only for this campaign. There is no Bronze tier, and every stream must be in English.",
    ],

    screenshots: [
      "/media/riftfall/screenshot-1.webp",
      "/media/riftfall/screenshot-6.webp",
      "/media/riftfall/screenshot-2.webp",
      "/media/riftfall/screenshot-7.webp",
      "/media/riftfall/screenshot-3.webp",
      "/media/riftfall/screenshot-8.webp",
      "/media/riftfall/screenshot-4.webp",
      "/media/riftfall/screenshot-9.webp",
      "/media/riftfall/screenshot-5.webp",
    ],

    /* Promo key art drifting down both margins, behind the content. */
    swarm: {
      items: [
        { src: "/media/riftfall/art/promo-1.webp", x: 76, y: 8, size: 236, depth: 0.75 },
        { src: "/media/riftfall/art/promo-2.webp", x: 4, y: 17, size: 224, depth: 0.62 },
        { src: "/media/riftfall/art/promo-3.webp", x: 78, y: 27, size: 212, depth: 0.55 },
        { src: "/media/riftfall/art/promo-4.webp", x: 3, y: 37, size: 232, depth: 0.7 },
        { src: "/media/riftfall/art/promo-5.webp", x: 77, y: 47, size: 220, depth: 0.5 },
        { src: "/media/riftfall/art/promo-6.webp", x: 4, y: 58, size: 228, depth: 0.66 },
        { src: "/media/riftfall/art/promo-7.webp", x: 78, y: 69, size: 208, depth: 0.45 },
        { src: "/media/riftfall/art/promo-8.webp", x: 3, y: 80, size: 226, depth: 0.6 },
      ],
    },

    storyParagraphs: [
      "Enter the rift. StreamQuest and GameEra Studios are running a curated paid campaign around the free public RIFTFALL demo, and we are looking for creators who can carry two hours of fast, loud, single-player FPS with real commentary.",
      "Your job is to make the gameplay the focus. React naturally, explain your decisions, pull chat into route and loadout calls, and turn the close calls and discoveries into the moments people clip. The demo is built for repeat runs, so replaying levels, hunting secrets, testing alternate fire modes, and trying different squad tactics all count toward your two hours.",
      "Your honest opinion stays yours. We want an entertaining gameplay stream, not a two-hour ad read. The requirements are strict so that every verified completion is measured the same way.",
    ],
    storyPull:
      "If RIFTFALL looks like your kind of retro FPS, try the free demo and wishlist it through my link.",
    storyAside: "/media/riftfall/promo.webp",
    storyAsideCaption: "Squad up and clear the rift",
    shortDescription:
      "RIFTFALL is a fast, brutal single-player retro FPS from GameEra Studios, with a free public Steam demo covering five levels. A strong fit for creators whose audiences enjoy boomer shooters, movement shooters, speed, secrets, builds, and challenge runs.",

    sideQuestIntro:
      "There are three optional side quests on this campaign, each worth 50 StreamQuest XP. Rift Social takes a clip off Twitch and onto your socials. Co-op Companion brings a friend into the rift with you. Wishlist Supporter pushes the tracked link a bit harder. None of them carry a separate payment, and none are required to complete the paid main quest.",
    sideQuestOutro:
      "Everything else on this campaign is the main quest. Two hours, live commentary, the tracked link, and a verbal nudge toward the free demo and the wishlist.",

    trackedWishlistUrl: "https://store.steampowered.com/app/4965490/RIFTFALL/",
    trackedWishlistNote:
      "The tracked campaign link is supplied with your approval. Use that exact link on stream and in any side quest post, and do not strip its tracking parameters. The link above is the plain Steam page for reference only.",

    gallery: {
      wide: "/media/riftfall/demo-live.webp",
      thumbs: [
        "/media/riftfall/loading-1.webp",
        "/media/riftfall/loading-2.webp",
        "/media/riftfall/loading-3.webp",
        "/media/riftfall/loading-4.webp",
        "/media/riftfall/screenshot-6.webp",
        "/media/riftfall/screenshot-7.webp",
        "/media/riftfall/screenshot-8.webp",
        "/media/riftfall/screenshot-9.webp",
      ],
    },

    officialAccounts: [
      {
        name: "StreamQuest",
        hint: "Tag @StreamQuest on your Rift Social clip",
        links: [
          { type: "instagram", href: "https://www.instagram.com/streamquest.io/" },
          { type: "tiktok", href: "https://www.tiktok.com/@streamquest.io" },
          { type: "youtube", href: "https://www.youtube.com/@StreamQuest_io" },
          { type: "discord", href: "https://discord.gg/NhqfucYDXD" },
        ],
      },
      {
        name: "RIFTFALL",
        hint: "Steam page, free demo, and wishlist.",
        links: [
          { type: "website", href: "https://store.steampowered.com/app/4965490/RIFTFALL/" },
        ],
      },
      {
        name: "GameEra Studios",
        hint: "Developer of RIFTFALL. Official handles are supplied with your approval.",
        links: [
          { type: "website", href: "https://game-era.com" },
          { type: "youtube", href: "https://www.youtube.com/@NukeThemAllGame/videos" },
        ],
      },
    ],

    storeLinks: [
      {
        name: "Steam",
        sub: "Free demo and wishlist",
        href: "https://store.steampowered.com/app/4965490/RIFTFALL/",
        icon: "steam",
      },
      {
        name: "GameEra Studios",
        sub: "game-era.com",
        href: "https://game-era.com",
        icon: "website",
      },
      {
        name: "Creator assets",
        sub: "Trailers, key art, and promo art",
        href: "https://drive.google.com/drive/folders/1xqbJ5s4rLvcoehWdvSh-yhadTEmm0Ts9",
        icon: "website",
      },
      {
        name: "10 minute gameplay",
        sub: "See the demo in action",
        href: "https://youtu.be/18oBPXqJPWs",
        icon: "website",
      },
    ],

    rulesContent: [
      {
        heading: "Curated and capped",
        body: "This campaign is Silver and Gold only. There is no Bronze tier. A maximum of 25 verified paid activations are available and one approved creator fills one slot. This is an English-only quest: every qualifying stream must be delivered in English, so a stream in another language will not be validated. Applying does not guarantee approval.",
      },
      {
        heading: "The two hour requirement",
        body: "At least two hours of actual RIFTFALL demo gameplay with active spoken commentary, and the game stays the main content for that whole period. The demo covers five levels, so replay levels, hunt secrets and alternate routes, try different weapons and alternate fire, experiment with your AI squadmates, and let chat pick routes or challenges. Do not switch to another game during the qualifying two hours.",
      },
      {
        heading: "Remove the demo time limit",
        body: "The public demo has a one-hour limit by default. Launch the demo and press P twice before you go live to remove it, and confirm the limit is gone before you start the qualifying broadcast. Test this in advance, not on stream.",
      },
      {
        heading: "What will not qualify",
        body: "Less than two hours of qualifying gameplay. Trailer-only coverage, passive testing, long inactivity, or gameplay without spoken commentary. Overlay-only, short-form-only, or social-only content in place of the Twitch stream. The wrong category, an unapproved build, or any non-PC version. A missing disclosure, missing verbal call to action, or failure to use the supplied tracked link. A private, deleted, or otherwise inaccessible VOD that cannot be validated.",
      },
      {
        heading: "AI disclosure",
        body: "The official Steam page currently carries an AI-generated content disclosure. Read it before you apply. This campaign is intended for creators who are comfortable covering the game fairly on its own merits. You do not need to endorse or defend any technology, your honest gameplay opinion stays your own, and you should not make claims about the game's development process that are not supported by the official Steam page.",
      },
      {
        heading: "Proof and verification",
        body: "Submit the public VOD or public mirror URL, the qualifying stream date, duration, and category through the creator dashboard. Provide screenshots or timestamps if we ask for proof of the paid-promotion disclosure, the tracked link placement, the verbal call to action, or the pre-stream setup. Evidence must stay public and accessible long enough for us to validate it.",
      },
      {
        heading: "Your content, and where it may appear",
        body: "You keep ownership of everything you make. Your stream may be reused for promotional purposes on the RIFTFALL Steam page and official channels, and RIFTFALL will always mention your name and channel when it is, so the reuse works as cross-promotion for you. The full licence terms are in the StreamQuest Terms and Conditions. If you are not comfortable with your stream being featured this way, this is not the right campaign for you.",
      },
    ],

    howToJoin: [
      { title: "Apply", sub: "In the Creator Dashboard, Silver or Gold only" },
      { title: "Wait for written approval", sub: "Curated, and a slot is not secured by applying" },
      { title: "Set up and test", sub: "Install the free demo and press P twice to lift the limit" },
      { title: "Stream two hours", sub: "Live commentary, correct category, tracked link, verbal CTA" },
      { title: "Submit", sub: "Public VOD plus any side quest proof, before the deadline" },
      { title: "Get paid", sub: "After verification" },
    ],
  },
  {
    slug: "groundzerohero",
    title: "Ground Zero Hero",
    status: "active",
    studio: "Acclaim x Rowan Edmondson",
    tagline: "Bullet-heaven roguelite. Kill mutants, absorb them, become the problem.",
    category: "Bullet-heaven roguelite",
    cover: "/media/ground-zero-hero/key-art-horizontal.webp",
    portrait: "/media/ground-zero-hero/key-art-vertical.webp",
    logo: "/media/ground-zero-hero/logo.webp",
    description:
      "Paid creator campaign for the Ground Zero Hero launch with Acclaim. Stream the mutant-absorbing bullet-heaven roguelite live on Twitch during the August launch window and help players discover and wishlist it on Steam.",
    about:
      "The apocalypse has a new problem: you. In Ground Zero Hero you fight mutant hordes, absorb their radioactive remains, and mutate into something increasingly powerful and increasingly ridiculous with every run. It is a fast, chaotic bullet-heaven roguelite built for clutch escapes, broken builds, unexpected mutations, and highly shareable stream moments.",
    keyFeatures: [
      "Screen-filling mutant hordes and bullet-heaven chaos. Reads instantly on stream.",
      "Absorb radioactive remains and mutate mid-run. Your character visibly changes as you get stronger.",
      "Stacking upgrades, superpowers, and mutation choices that turn a normal run completely broken.",
      "Auto-aim means you focus on movement, dodging, and loot. Controller recommended, keyboard and mouse supported.",
      "Fast runs with clutch escapes and last-second saves. Strong clip potential for short-form.",
    ],
    tiers: [
      {
        name: "Bronze",
        payout: "EUR 10",
        requirement:
          "Stream Ground Zero Hero for 1 completed hour at 5+ average viewers, with at least 300 Twitch followers. No XP required.",
        freeCopy: true,
      },
      {
        name: "Silver",
        payout: "EUR 20",
        rate: "EUR 10 / hr",
        rateNote: "EUR 20 total (2 x EUR 10). Only completed full hours count.",
        requirement:
          "Stream up to 2 completed hours at 15+ average viewers. Requires 450 XP to unlock Silver, at least 1 side quest, and the wishlist push.",
        sideQuestsRequired: true,
        freeCopy: true,
      },
      {
        name: "Gold",
        payout: "EUR 50",
        rateNote: "2 curated invitation-only slots",
        requirement:
          "Stream 2 completed hours at 50+ average viewers, with 500+ followers on the social account used for the required post. Invitation only, and requires at least 2 side quests including the social clip and wishlist push.",
        sideQuestsRequired: true,
        freeCopy: true,
      },
    ],
    sideQuestDetails: [
      {
        name: "Social Mutation Report",
        xp: 50,
        desc: "Create and publish an original Ground Zero Hero clip or UGC post on one of your active social channels. Use footage from your own activation, clearly identify the game, tag the official Acclaim and Ground Zero Hero accounts with the campaign-supplied handles, and keep it native to the platform. The post must stay publicly accessible for validation. Optional for Bronze and Silver unless stated in your approval, mandatory for Gold.",
      },
      {
        name: "Wishlist Transmission",
        xp: 50,
        desc: "Share the campaign's tracked Steam link and encourage interested viewers to wishlist Ground Zero Hero. Acceptable placements include a Twitch panel, a timed or manual chat message, the stream description, or a relevant social post. Keep the link visible and mention it naturally rather than interrupting gameplay. Optional for Bronze, mandatory for Silver and Gold.",
      },
      {
        name: "Launch Window Deployment",
        xp: 50,
        desc: "Complete your qualifying stream on August 20 or August 21, 2026, so participating creators support the game during one concentrated launch window. Optional for all tiers unless your approval says otherwise, but launch-window participation is strongly preferred.",
      },
    ],
    rules: [
      "Stream Ground Zero Hero live on Twitch in the correct category. Save your VOD.",
      "Use the tracked Steam link during the stream and keep its tracking parameters intact.",
      "Only completed full hours qualify for the Silver hourly reward. Partial half-hours do not count as an extra paid hour.",
      "Gold is invitation-only from the application pool. Two curated slots.",
      "Use the platform's paid-promotion tools and a clear sponsorship disclosure, such as #ad, where required.",
      "No faked engagement, viewers, or proof. No old or unrelated content. A Steam review is never required, never rewarded, and never part of the paid mission.",
    ],
    links: {
      steam:
        "https://store.steampowered.com/app/2570580/Ground_Zero_Hero/?utm_source=StreamQuest&utm_campaign=Ground00&utm_medium=creator",
      official: "https://playacclaim.com/ground-zero-hero",
      twitch: "https://www.twitch.tv/directory/category/ground-zero-hero",
    },
    dates: { start: "2026-08-20", end: "2026-09-03" },

    /* -------- Rich brief content -------- */
    duration: "Launch window",
    slots: 2,
    rating: "TBA",
    platforms: ["PC (Steam)", "macOS"],

    videos: {
      trailer: "_sPF4ocBBWY",
      briefVideo: "/media/ground-zero-hero/mission-brief.mp4",
      briefPoster: "/media/ground-zero-hero/mission-brief-poster.webp",
      briefPortrait: true,
    },

    heroMeta: [
      { label: "Applications open", value: "August 1, 2026" },
      { label: "Launch day", value: "August 20, 2026" },
      { label: "Selection", value: "Curated" },
      { label: "Game access", value: "Full Steam key" },
    ],

    tldr: [
      { stat: "EUR 10", label: "Bronze tier", sub: "1h stream, 5 average viewers, 300 followers" },
      { stat: "EUR 20", label: "Silver tier", sub: "2h, 15 average viewers, 450 XP, 1 side quest" },
      { stat: "EUR 50", label: "Gold tier", sub: "2h, 50 average viewers, 2 invite-only slots" },
      { stat: "EUR 50", label: "Favorite Stream", sub: "Acclaim bonus plus a social feature" },
    ],
    tldrFootnotes: [
      "Every approved creator, including Bronze, receives a full Steam key for Ground Zero Hero.",
      "Priority stream dates are August 20 and 21, 2026. Final submission deadline is September 3, 2026.",
      "Applications open August 1 and approvals are announced August 16. Join the StreamQuest Discord for keys, Gold invitations, and giveaway applications.",
    ],

    screenshots: [
      "/media/ground-zero-hero/screenshot-1.webp",
      "/media/ground-zero-hero/screenshot-2.webp",
      "/media/ground-zero-hero/screenshot-3.webp",
      "/media/ground-zero-hero/screenshot-4.webp",
      "/media/ground-zero-hero/screenshot-5.webp",
    ],

    storyParagraphs: [
      "StreamQuest and Acclaim are recruiting a limited, curated group of Twitch creators to support the Ground Zero Hero launch. This campaign is not first come, first served. Creators are selected on campaign fit and the slots available.",
      "Your mission is to stream Ground Zero Hero on Twitch and show your audience the core loop: fight, absorb, upgrade, mutate, and survive. Build the stream around your own reactions, build choices, close calls, and the moments where a normal run turns completely broken. Encourage interested viewers to visit the tracked Steam page and wishlist the game.",
      "The goal is not to turn your broadcast into a continuous advertisement. Play the game, have fun with it, and bring in the game and the wishlist link naturally when the stream gives you an opening.",
    ],
    storyPull:
      "Go into the blast zone, make something entertaining, and have fun becoming the problem.",
    storyAside: "/media/ground-zero-hero/chaos-poster.webp",
    storyAsideVideo: "/media/ground-zero-hero/chaos.mp4",
    storyAsidePoster: "/media/ground-zero-hero/chaos-poster.webp",
    storyAsideCaption: "Absorb, mutate, repeat",
    shortDescription:
      "Ground Zero Hero is a fast, chaotic bullet-heaven roguelite from Acclaim and developer Rowan Edmondson. Kill mutants, absorb their remains, and mutate into something stronger every run while stacking power combinations and surviving the hordes. A great fit for creators whose audiences enjoy roguelites, bullet heavens, post-apocalyptic humour, and clip-friendly chaos.",

    /* Ambient art: characters drift down both margins of the whole brief
       rather than sitting in one block. Kept to the edges and low opacity
       so they dress the page without fighting the copy. */
    swarm: {
      items: [
        { src: "/media/ground-zero-hero/characters/hero.webp", x: 77, y: 7, size: 200, depth: 0.9 },
        { src: "/media/ground-zero-hero/characters/croc.webp", x: 5, y: 14, size: 172, depth: 0.75 },
        { src: "/media/ground-zero-hero/characters/flyboss.webp", x: 79, y: 21, size: 162, depth: 0.7, flip: true },
        { src: "/media/ground-zero-hero/characters/skeleton.webp", x: 6, y: 29, size: 132, depth: 0.6 },
        { src: "/media/ground-zero-hero/characters/yeti.webp", x: 80, y: 36, size: 150, depth: 0.65 },
        { src: "/media/ground-zero-hero/characters/bear.webp", x: 5, y: 44, size: 158, depth: 0.7, flip: true },
        { src: "/media/ground-zero-hero/characters/alien.webp", x: 81, y: 51, size: 140, depth: 0.55 },
        { src: "/media/ground-zero-hero/characters/slug.webp", x: 6, y: 59, size: 146, depth: 0.6 },
        { src: "/media/ground-zero-hero/characters/snail.webp", x: 81, y: 67, size: 132, depth: 0.5 },
        { src: "/media/ground-zero-hero/characters/chicken.webp", x: 6, y: 75, size: 122, depth: 0.45 },
        { src: "/media/ground-zero-hero/characters/bloaty.webp", x: 82, y: 83, size: 126, depth: 0.5, flip: true },
        { src: "/media/ground-zero-hero/characters/pinata.webp", x: 7, y: 91, size: 112, depth: 0.4 },
      ],
    },

    sideQuestIntro:
      "Each completed side quest awards 50 StreamQuest XP. Social Mutation Report takes your best moment off Twitch as original UGC. Wishlist Transmission keeps the tracked Steam link visible. Launch Window Deployment lines your stream up with the August 20 to 21 launch push.",
    sideQuestOutro:
      "Acclaim will also pick one standout creator for Acclaim's Favorite Stream: a EUR 50 bonus plus exposure through Acclaim's official channels. Completed side quests, a strong social post, memorable gameplay, facecam, and an entertaining post-apocalyptic costume or stream theme all improve your chances. The costume is encouraged, not mandatory.",

    trackedWishlistUrl:
      "https://store.steampowered.com/app/2570580/Ground_Zero_Hero/?utm_source=StreamQuest&utm_campaign=Ground00&utm_medium=creator",
    trackedWishlistNote:
      "Use this campaign link whenever a tracked Steam or wishlist link is required. Do not replace or remove its tracking parameters when completing the Wishlist Transmission side quest.",

    gallery: {
      wide: "/media/ground-zero-hero/screenshot-1.webp",
      thumbs: [
        "/media/ground-zero-hero/screenshot-2.webp",
        "/media/ground-zero-hero/screenshot-3.webp",
        "/media/ground-zero-hero/screenshot-4.webp",
        "/media/ground-zero-hero/screenshot-5.webp",
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
        name: "Ground Zero Hero",
        hint: "Tag the game on your social side quest post.",
        links: [
          { type: "x", href: "https://x.com/GZH_game" },
          { type: "website", href: "https://playacclaim.com/ground-zero-hero" },
          { type: "discord", href: "https://discord.com/invite/Nk6nR769HG" },
        ],
      },
      {
        name: "Acclaim",
        hint: "Publisher of Ground Zero Hero. Tag Acclaim on your UGC post.",
        links: [
          { type: "website", href: "https://playacclaim.com/" },
          { type: "twitch", href: "https://www.twitch.tv/playacclaim" },
        ],
      },
    ],

    storeLinks: [
      {
        name: "Steam",
        sub: "Wishlist on Steam",
        href: "https://store.steampowered.com/app/2570580/Ground_Zero_Hero/?utm_source=StreamQuest&utm_campaign=Ground00&utm_medium=creator",
        icon: "steam",
      },
      {
        name: "Acclaim",
        sub: "playacclaim.com",
        href: "https://playacclaim.com/ground-zero-hero",
        icon: "website",
      },
      {
        name: "Discord",
        sub: "Ground Zero Hero community",
        href: "https://discord.com/invite/Nk6nR769HG",
        icon: "website",
      },
    ],

    rulesContent: [
      {
        heading: "Limited and curated selection",
        body: "Applications do not guarantee approval. Selection is based on creator fit, content quality, community fit, campaign timing, and the available budget and slots. English-language streams receive priority. Creators with active social channels and a strong idea for an original Ground Zero Hero post or clip receive additional consideration. Gold has only two curated, invitation-only slots and those creators are contacted through the StreamQuest Discord.",
      },
      {
        heading: "Launch window",
        body: "Streaming on August 20 or August 21 is strongly encouraged so participating creators support the game during one concentrated launch window. It also completes the Launch Window Deployment side quest. The final submission deadline is September 3, 2026.",
      },
      {
        heading: "What to showcase",
        body: "Focus on what creates good live reactions: screen-filling mutant hordes, absorbing radioactive remains, upgrades and mutation choices, visible changes to your build, close calls and last-second escapes, and how quickly a normal run becomes completely broken. If you finish the available content early, start another run or try different mutations.",
      },
      {
        heading: "Recommended setup",
        body: "Controller is recommended for the smoothest experience, and keyboard and mouse are supported. Auto-aim lets you concentrate on movement, dodging, upgrades, and loot. Test the game, capture settings, microphone, and audio before going live. Facecam is preferred if you want to be considered for Acclaim's Favorite Stream, but it is not a Bronze or Silver requirement.",
      },
      {
        heading: "Creator giveaways",
        body: "StreamQuest and Acclaim may select roughly three to four participating creators to host additional community giveaways, with keys expected to cover PC, Nintendo, and Xbox. These are separate from the standard creator reward. Share your Twitch and social channels in the designated StreamQuest Discord thread to be considered. Giveaway applications are curated and are not first come, first served.",
      },
      {
        heading: "Submission",
        body: "Submit through the StreamQuest creator panel by September 3, 2026, with your VOD link, qualifying stream date and duration, public URLs for each social post, proof of the tracked wishlist placement, and the side quests you are claiming. Evidence must stay accessible long enough for StreamQuest to validate it.",
      },
    ],

    howToJoin: [
      { title: "Apply", sub: "In the Creator Dashboard from August 1" },
      { title: "Join Discord", sub: "Required for keys, Gold invitations, and giveaway applications" },
      { title: "Wait for approvals", sub: "Announced August 16, curated and not guaranteed" },
      { title: "Stream the launch", sub: "August 20 or 21 preferred, Bronze, Silver, or Gold" },
      { title: "Submit", sub: "VOD plus side-quest proof by September 3" },
      { title: "Get paid", sub: "After verification" },
    ],
  },
  {
    slug: "alphanomos",
    title: "Alpha Nomos",
    status: "completed",
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
      brief: "wxiTe5m-DRQ",
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
      "Trailer and mission brief video are both live above. Read the brief below for everything you need to apply.",
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
    status: "completed",
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
      brief: "nlm8utGiExg",
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
      { stat: "€10", label: "Bronze tier", sub: "1h stream, 5 average viewers, 300 followers" },
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

/**
 * Quests that have a page. Drafts are fully offline, so they are the only
 * thing excluded here. Used for routing and slug lookup.
 */
export const routableQuests: Quest[] = allQuests.filter((q) => !q.draft);

/**
 * Listed quests. This is what every browsable surface reads from: the
 * homepage, header dropdowns, library grid, related-quest grid and the
 * sitemap. Unlisted quests still have a working URL, they just are not
 * advertised anywhere.
 */
export const quests: Quest[] = routableQuests.filter((q) => !q.unlisted);

export const activeQuests = quests.filter((q) => q.status === "active");
export const completedQuests = quests.filter((q) => q.status === "completed");

export const getQuestBySlug = (slug: string): Quest | undefined =>
  routableQuests.find((q) => q.slug === slug);

export const allQuestSlugs = (): string[] =>
  routableQuests.filter((q) => !q.customPage).map((q) => q.slug);
