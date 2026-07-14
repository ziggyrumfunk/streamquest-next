/**
 * FAQ data — extracted from media assets/Pages/faq.html and grouped
 * into 5 categories per audience for easier scanning.
 *
 * Answers are written as arrays of "segments" so we can render
 * paragraphs, bullet lists, and side-notes cleanly without
 * resorting to dangerouslySetInnerHTML.
 */

export type Segment =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; text: string };

export type FaqItem = { q: string; a: Segment[] };
export type FaqCategory = { title: string; items: FaqItem[] };

/* ============================================================
   STREAMERS — 30 questions, 5 categories
   ============================================================ */
export const streamerFaqs: FaqCategory[] = [
  {
    title: "General",
    items: [
      {
        q: "What is StreamQuest?",
        a: [{ type: "p", text: "StreamQuest is a quest-based platform where Twitch creators join paid campaigns for indie and AA games. You log in with Twitch, apply for quests, stream the game during the campaign window, submit your VOD, and get paid after verification." }],
      },
      {
        q: "Who is StreamQuest for?",
        a: [{ type: "p", text: "StreamQuest is built for small and mid-sized creators with authentic communities, especially variety streamers who like discovering new games." }],
      },
      {
        q: "How do I join StreamQuest?",
        a: [{ type: "p", text: "Log in using Twitch authentication, then apply for quests in your creator dashboard. Joining Discord is recommended for faster support and campaign updates." }],
      },
      {
        q: "Do you accept creators worldwide? Any region limits?",
        a: [{ type: "p", text: "Yes, StreamQuest is global. We aim for fair regional representation so no single region dominates creator slots, and tier payouts are equal worldwide." }],
      },
    ],
  },
  {
    title: "Eligibility",
    items: [
      {
        q: "Minimum requirements to apply for quests",
        a: [
          { type: "p", text: "Typical baseline requirements:" },
          { type: "ul", items: ["300+ followers", "6+ month old Twitch account", "Twitch Affiliate status (exceptions possible)", "5+ recent average concurrent viewers (CCV) (exceptions possible)"] },
          { type: "note", text: "Exceptions can be made if you clearly have an active, authentic community." },
        ],
      },
      {
        q: "Do I need a webcam or mic? Are VTubers allowed?",
        a: [{ type: "p", text: "A mic is required. A webcam is a strong bonus but not mandatory. VTubers are welcome. No-cam streamers with an active community are welcome as well." }],
      },
    ],
  },
  {
    title: "Quests & tiers",
    items: [
      {
        q: "What are Main Quests and Side Quests?",
        a: [
          { type: "p", text: "Main Quest is mandatory (streaming requirement + correct category + submission). Side Quests are optional extras used for bonus XP and sometimes eligibility upgrades depending on the tier." },
          { type: "p", text: "Common side quests include: survey, social share, posting a clip, playing with a friend, or an in-game objective." },
        ],
      },
      {
        q: "How many hours do I need to stream?",
        a: [
          { type: "p", text: "Each mission brief defines the exact requirements and maximum payable hour caps. A common baseline is:" },
          { type: "ul", items: ["Bronze: minimum 1 hour", "Silver: usually 2 hours (sometimes up to 3 depending on the quest)", "Gold: 2 hours of Twitch streaming, plus 1 UGC video outside Twitch"] },
          { type: "p", text: "Only verified gameplay time counts." },
        ],
      },
      {
        q: "What tiers exist and how do I unlock Silver?",
        a: [
          { type: "p", text: "Current tiers are Bronze, Silver, and Gold." },
          { type: "p", text: "Silver unlocks at Level 10 which equals 450 XP. Silver often requires at least one side quest completion depending on the campaign." },
        ],
      },
      {
        q: "What is the Gold tier?",
        a: [
          { type: "p", text: "Gold quests are English-only and reserved for stronger creators. To qualify you need 50+ average viewers and 1,500+ followers." },
          { type: "p", text: "The quest is 2 hours of Twitch streaming, plus 1 UGC video posted outside Twitch." },
          { type: "p", text: "Gold pays €25 per hour for 2 hours, so €50 in total." },
        ],
      },
      {
        q: "Where do I see my XP and level?",
        a: [{ type: "p", text: "Your dashboard shows your account level and XP progress bar. Completing quests and side quests increases XP and levels." }],
      },
      {
        q: "Can I do more than one quest at a time?",
        a: [{ type: "p", text: "Typically, you can participate in one approved quest at a time. After your submission is approved, you can apply for another. Exceptions can be made for tight deadlines." }],
      },
      {
        q: "Can I rerun the game after the quest?",
        a: [{ type: "p", text: "Yes. We only pay for the first verified quest completion, but if you like the game you can keep streaming it and we appreciate it." }],
      },
      {
        q: "What quest statuses exist in the dashboard?",
        a: [{ type: "p", text: "Status labels include: Request approval, Pending, Approved, Submitted, Verified, Rejected. Revisions are supported so you can update and resubmit where applicable." }],
      },
    ],
  },
  {
    title: "Streaming, verification & VOD",
    items: [
      {
        q: "How are streams verified?",
        a: [
          { type: "p", text: "We verify the gameplay portion of your stream. Verification includes manual VOD review plus tool-assisted checks to confirm correct category, gameplay time, and compliance with quest requirements." },
          { type: "p", text: "Nice-to-have: include timestamps and/or a TwitchTracker link in your submission to speed up review." },
        ],
      },
      {
        q: "What counts as verified gameplay time?",
        a: [{ type: "p", text: "Verified time is the part of your stream where the game is actively played and showcased. If your stream includes other segments, only the relevant gameplay portion counts." }],
      },
      {
        q: "Do I need the correct Twitch game category set?",
        a: [{ type: "p", text: "Yes. The game category must be set correctly for verification, and the game should be the primary content during the verified time window." }],
      },
      {
        q: "Does Just Chatting time count?",
        a: [{ type: "p", text: "No. Verification focuses on gameplay time. Intros are fine, but the verified hours are based on actual gameplay and showcasing the game." }],
      },
      {
        q: "Pre-stream checklist for creators",
        a: [
          { type: "ul", items: ["Read the mission brief and quest guide", "Set the correct game category", "Enable branded content disclosure as required", "Make sure VOD saving is enabled"] },
        ],
      },
      {
        q: "Pre-submission checklist",
        a: [
          { type: "p", text: "The submission form requires the mandatory links before you can submit. Before submitting, double-check:" },
          { type: "ul", items: ["Your VOD link is correct", "You add any side quest proof you completed", "You optionally include timestamps or a TwitchTracker link to speed review"] },
          { type: "p", text: "You can also submit and revise later if you complete side quests afterwards (within a reasonable timeframe and campaign context)." },
        ],
      },
      {
        q: "Do I need to keep my VOD public? For how long?",
        a: [{ type: "p", text: "Yes. VODs must remain public for 2 weeks after completion so they can be reviewed." }],
      },
      {
        q: "What if my VOD is muted or removed?",
        a: [{ type: "p", text: "We prefer VOD-safe streams. If something happens, provide proof (screenshots, DMCA notice) and contact the team in Discord so we can review options case-by-case." }],
      },
    ],
  },
  {
    title: "Rules, payments & support",
    items: [
      {
        q: "Do I need to disclose sponsorship or paid promotion?",
        a: [{ type: "p", text: "Yes. Follow Twitch TOS and enable branded content disclosure for paid activations as required in each mission brief." }],
      },
      {
        q: "What are the most common reasons a quest is rejected?",
        a: [
          { type: "ul", items: ["Not meeting minimum gameplay hours", "Not actively playing (pause screen, idle, doing other content)", "Missing required quest elements", "Brand safety violations on stricter campaigns", "Breaking Twitch TOS"] },
        ],
      },
      {
        q: "Can I revise and resubmit if rejected? When is it a failed quest?",
        a: [{ type: "p", text: "If rejected due to incompletion or correctable issues, you can revise and resubmit. If rejected due to Twitch TOS, quality issues, or something that cannot be fixed in time, it can be treated as a failed quest and the slot may be opened for someone else if time remains." }],
      },
      {
        q: "Do you have music rules?",
        a: [{ type: "p", text: "Follow Twitch TOS. DMCA-safe music is recommended." }],
      },
      {
        q: "How do payouts work? Do you need my bank details?",
        a: [
          { type: "p", text: "We do not require your bank details for standard payouts. Payments are sent through your existing Twitch donation setup (Streamlabs, StreamElements, or other global donation providers on your Twitch panels)." },
          { type: "note", text: "Payouts are processed within 5 business days after verification." },
        ],
      },
      {
        q: "Can I get paid via PayPal instead?",
        a: [{ type: "p", text: "Yes, as an alternative option. After your quest is verified, you can send a PayPal invoice to contact@streamquest.io. Include your Twitch username, date of completion, quest title, and StreamQuest in the invoice description." }],
      },
      {
        q: "Do you collect personal data?",
        a: [{ type: "p", text: "We minimize data processing and only handle what is needed to run quests and verify submissions. We do not collect bank details for standard payouts." }],
      },
      {
        q: "Late submissions and late streams policy",
        a: [{ type: "p", text: "Late handling is scenario-based and quest-by-quest. If the campaign is still open and reporting is not finalized, we can often accept late submissions within a fair timeframe. Late streams may be accepted a few days after the end date if there is a valid reason and the campaign is still open. Always check Discord updates for the specific campaign rules." }],
      },
      {
        q: "Where do I get support?",
        a: [{ type: "p", text: "Discord is the main hub for support, updates, and campaign clarifications. You can also reach us on Instagram, TikTok, YouTube, and by email." }],
      },
    ],
  },
];

/* ============================================================
   STUDIOS — 18 questions, 5 categories
   ============================================================ */
export const studioFaqs: FaqCategory[] = [
  {
    title: "General",
    items: [
      {
        q: "What is StreamQuest for studios and publishers?",
        a: [{ type: "p", text: "StreamQuest runs paid Twitch creator activations for indie and AA games with end-to-end support: mission briefs, creator communication, approvals, key or demo coordination, verification, payouts, and KPI reporting." }],
      },
    ],
  },
  {
    title: "Getting started",
    items: [
      {
        q: "What assets do you need from a studio?",
        a: [{ type: "p", text: "Minimum viable assets: logo and cover art (capsule). More assets help improve mission briefs and creator enablement. Useful assets include trailers, screenshots, press kit, Steam/demo links, keys if needed, social links, embargo notes, and messaging framing." }],
      },
      {
        q: "What is included in a StreamQuest mission brief?",
        a: [{ type: "p", text: "Mission briefs include a game overview, the campaign mission, a TLDR of quest info, creator rewards, requirements, tier details, side quests, max payable hour caps, and key links and assets." }],
      },
      {
        q: "Do you offer broader marketing services beyond Twitch activations?",
        a: [{ type: "p", text: "Yes, optionally. StreamQuest can support broader marketing such as Steam storefront optimization, social media content for TikTok/Instagram/X, and paid ads (Reddit, Meta, Google). PR support can be discussed case-by-case." }],
      },
    ],
  },
  {
    title: "Campaign types & customization",
    items: [
      {
        q: "What events and campaign types do you support?",
        a: [{ type: "p", text: "We support Steam Next Fest and festival timing, plus demos, playtests, launches, patches, discount windows, and server activations." }],
      },
      {
        q: "Do you run demo campaigns or full game key campaigns?",
        a: [{ type: "p", text: "Both. It depends on the state of your build: QA testing, playable demo, full build, major patch, discount window, and more." }],
      },
      {
        q: "Can studios require specific CTAs?",
        a: [{ type: "p", text: "Yes, pre-agreed. CTAs are typically implemented as side quests (wishlist, demo download, survey, social post, clip). Side quests can award bonus XP." }],
      },
      {
        q: "Do you control creator opinions or messaging?",
        a: [{ type: "p", text: "No. StreamQuest prioritizes authenticity. Creators have freedom of opinion as long as they follow Twitch TOS, meet the main quest requirements, and respect any agreed brand safety rules." }],
      },
      {
        q: "Embargo and timed beat support",
        a: [{ type: "p", text: "Yes. We manually approve creators and distribute keys. Keys are not distributed prior to the agreed timing. Streams outside approved timing do not count as quest completions." }],
      },
    ],
  },
  {
    title: "Cost, timing & process",
    items: [
      {
        q: "Minimum campaign size and how billing works",
        a: [
          { type: "p", text: "Minimum campaign availability is typically 50 creator slots. Actual spend is based on completed activations and reconciled at the end." },
          { type: "p", text: "Campaigns are pre-estimated and prepaid, then reconciled based on actual filled slots and tiers completed. If discrepancy is more than 10%, unused budget is refunded or the remainder is invoiced." },
        ],
      },
      {
        q: "Typical campaign length and launch speed",
        a: [{ type: "p", text: "Typical activation window is 2 weeks. Sometimes 1 week for festivals or playtests. We can launch fast in urgent cases, but 2 to 3 business days is recommended. A 10 to 14 day lead time enables the strongest setup and social push." }],
      },
      {
        q: "Mid-campaign updates and communication",
        a: [{ type: "p", text: "We keep active contact throughout the campaign with day-to-day updates in a private Discord group chat. We share creators going live, noteworthy moments, and ongoing progress. KPI reporting is delivered shortly after the campaign ends." }],
      },
    ],
  },
  {
    title: "Brand safety, reporting & data",
    items: [
      {
        q: "Brand safety and exclusions",
        a: [{ type: "p", text: "Yes. Studios can request exclusions such as family-friendly only, no profanity, and content category restrictions. For stricter requirements, we apply tighter creator approvals and oversight." }],
      },
      {
        q: "Do you offer whitelists or blacklists of creators?",
        a: [{ type: "p", text: "Yes, case-by-case. We evaluate requests and implement them when feasible." }],
      },
      {
        q: "What is included in the KPI report?",
        a: [
          { type: "p", text: "Reporting is transparent and designed to benchmark performance. Common KPI elements include:" },
          { type: "ul", items: ["Total viewer hours (hours watched)", "Cost per viewer hour and cost efficiency", "Creator list with followers, average CCV, and performance summaries", "Tier completed and side quests completed per creator", "Top performing streams and highlights", "Language and geo distribution", "Key takeaways and noteworthy mentions"] },
        ],
      },
      {
        q: "Can you track wishlists or clicks?",
        a: [{ type: "p", text: "Wishlist tracking can be supported through unique UTM links provided to StreamQuest, discussed and agreed during campaign setup." }],
      },
      {
        q: "What if servers or matchmaking are unstable?",
        a: [{ type: "p", text: "Handled case-by-case with transparent communication. If creators cannot play due to downtime, we align with the publisher and adjust expectations." }],
      },
      {
        q: "Do you store personal data?",
        a: [{ type: "p", text: "We minimize data processing and only handle what is needed to run quests and verify submissions. We do not collect bank details for standard payouts." }],
      },
    ],
  },
];
