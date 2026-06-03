import { assets } from "./assets";

export type NavLink = {
  href: string;
  label: string;
};

/** Desktop center cluster — competition + org pages */
export type HeaderNavLink = NavLink & {
  zone?: "compete" | "org";
};

export type Team = {
  name: string;
  slug: string;
  game: string;
  description: string;
  status: string;
  featured: boolean;
};

export type Person = {
  name: string;
  slug: string;
  role: string;
  group: string;
  descriptor: string;
  bio?: string;
  image?: string;
  realName?: string;
  specialties?: string[];
  rank?: string;
  tags?: string[];
  number?: number;
  socials?: { label: string; href: string }[];
  featured?: boolean;
};

export type Partner = {
  name: string;
  tier: string;
  href: string;
  description?: string;
  logo?: string;
  isOpenSlot?: boolean;
};

export type MerchItem = {
  name: string;
  category: string;
  description: string;
  accent: string;
  status: string;
  frontImage?: string;
  backImage?: string;
  featured?: boolean;
  externalUrl?: string;
  ctaLabel?: string;
};

export type ContactChannel = {
  label: string;
  value: string;
  href: string;
};

export type OrgSocialPlatform = "discord" | "youtube" | "x" | "twitch" | "instagram" | "tiktok";

export type OrgSocialChannel = {
  platform: OrgSocialPlatform;
  label: string;
  handle: string;
  href: string;
};

export type Milestone = {
  date: string;
  title: string;
  description: string;
};

export type OrgValue = {
  title: string;
  description: string;
  icon: string;
};

export const siteTagline = "Built for pressure, content, and the next stage of competition.";

export const aboutSummary =
  "RAD has been turning heads since 2023. We didn't wait for an invitation to the top; RAD cemented its place as the inaugural Marvel Rivals Ignite: Mid-Season World Champions and most recently secured the Season 6: EMEA PC title in March 2026. You've seen us do it before, get ready to see it again. Untamed, unstoppable, and never by the book. Welcome to the wild. #GoWild";

export const discordInviteUrl = "https://discord.com/invite/radgg";
export const discordServerId = "1363584103479513198";
export const discordWidgetUrl = `https://discord.com/widget?id=${discordServerId}&theme=dark`;
export const radShopUrl = process.env.NEXT_PUBLIC_RAD_SHOP_URL || undefined;
const merchItemStatus = radShopUrl ? "External checkout" : "Shop link pending";

export const headerCompeteLinks: HeaderNavLink[] = [
  { href: "/roster", label: "Team", zone: "compete" },
  { href: "/shop", label: "Shop", zone: "compete" },
  { href: "/content", label: "Content", zone: "compete" }
];

export const headerOrgLinks: HeaderNavLink[] = [
  { href: "/about", label: "About", zone: "org" },
  { href: "/partners", label: "Partners", zone: "org" },
  { href: "/contact", label: "Contact", zone: "org" }
];

export const headerNavLinks: HeaderNavLink[] = [...headerCompeteLinks, ...headerOrgLinks];

/** @deprecated Use headerNavLinks — kept for any legacy imports */
export const secondaryNavLinks: NavLink[] = headerOrgLinks;

/** @deprecated Use headerCompeteLinks — kept for any legacy imports */
export const primaryNavLinks: NavLink[] = [
  { href: "/", label: "Home" },
  ...headerCompeteLinks,
  { href: "/contact", label: "Community" }
];

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/roster", label: "Team" },
  { href: "/shop", label: "Shop" },
  { href: "/content", label: "Content" },
  { href: "/about", label: "About" },
  { href: "/staff", label: "Staff" },
  { href: "/partners", label: "Activations" },
  { href: "/contact", label: "Contact" }
];

export const teams: Team[] = [
  {
    name: "Marvel Rivals",
    slug: "marvel-rivals",
    game: "Marvel Rivals",
    description:
      "RAD's flagship roster and reigning Ignite: Mid-Season World Champions, now also holding the Season 6: EMEA PC title.",
    status: "World & Season 6 EMEA Champions",
    featured: true
  }
];

function createXSocial(handle: string) {
  return {
    label: "X",
    href: `https://x.com/${handle.replace(/^@/, "")}`
  };
}

function createTwitchSocial(handle: string) {
  return {
    label: "Twitch",
    href: `https://www.twitch.tv/${handle}`
  };
}

export const players: Person[] = [
  {
    name: "ducky",
    slug: "ducky",
    role: "Tank / Vanguard",
    group: "Marvel Rivals",
    descriptor: "Anchor tank",
    bio: "The frontline foundation of RAD. Ducky absorbs pressure, creates space, and sets the tempo for every team fight.",
    specialties: ["Space Creation", "Shot Blocking", "Peel"],
    rank: "World Champion",
    tags: ["Starter", "Vanguard"],
    number: 1,
    socials: [createXSocial("ducky1one"), createTwitchSocial("ducky1mr")],
    featured: true
  },
  {
    name: "lugiagoat",
    slug: "lugiagoat",
    role: "Tank / Vanguard",
    group: "Marvel Rivals",
    descriptor: "Offtank diver",
    bio: "High-aggression off-tank who specializes in dive engagements and disrupting backlines.",
    specialties: ["Dive", "Disruption", "Flanking"],
    rank: "World Champion",
    tags: ["Starter", "Vanguard"],
    number: 2,
    socials: [createXSocial("lugiagoat")]
  },
  {
    name: "SmashNezz",
    slug: "smashnezz",
    role: "Duelist",
    group: "Marvel Rivals",
    descriptor: "Hitscan",
    bio: "Mechanical precision meets competitive instinct. SmashNezz's aim is the reason teams have to respect RAD's duelist line.",
    specialties: ["Hitscan", "First Picks", "Flick Aim"],
    rank: "World Champion",
    tags: ["Starter", "DPS"],
    number: 3,
    socials: [createXSocial("smashnezz"), createTwitchSocial("smashnezz")]
  },
  {
    name: "crazykitty",
    slug: "crazykitty",
    role: "Duelist",
    group: "Marvel Rivals",
    descriptor: "I be playing anything these days (flex)",
    bio: "The ultimate flex pick. Crazykitty adapts hero pools on the fly and forces opponents to guess wrong.",
    specialties: ["Flex", "Hero Pool", "Adaptation"],
    rank: "World Champion",
    tags: ["Starter", "DPS", "Flex"],
    number: 4,
    socials: [createXSocial("crazykitty333"), createTwitchSocial("crazykitty33")]
  },
  {
    name: "vertigo",
    slug: "vertigo",
    role: "Strategist",
    group: "Marvel Rivals",
    descriptor: "Healing my team a lot",
    bio: "Vertigo keeps the team alive through the most chaotic fights. Positioning, resource management, and clutch saves.",
    specialties: ["Healing", "Positioning", "Clutch Plays"],
    rank: "World Champion",
    tags: ["Starter", "Support"],
    number: 5,
    socials: [createXSocial("vertigomrv"), createTwitchSocial("vertigo__o")]
  },
  {
    name: "Mash",
    slug: "mash",
    role: "Strategist & Team Captain",
    group: "Marvel Rivals",
    descriptor: "For fun",
    bio: "The shotcaller and strategic backbone of RAD. Mash reads the game two steps ahead and leads the team through every meta shift.",
    specialties: ["Shot Calling", "Strategy", "Leadership"],
    rank: "World Champion",
    tags: ["Starter", "Support", "Captain"],
    number: 6,
    socials: [createXSocial("mashh_mrr"), createTwitchSocial("Mashhmr")]
  },
  {
    name: "Etsu",
    slug: "etsu",
    role: "Duelist (Sub)",
    group: "Marvel Rivals",
    descriptor: "French Flex",
    bio: "A versatile sub ready to slot in and perform. Etsu brings international-level mechanics and deep game knowledge.",
    specialties: ["Flex", "Projectile", "Off-meta Picks"],
    rank: "World Champion",
    tags: ["Substitute", "DPS"],
    number: 7,
    socials: [createXSocial("@etsuuu6"), createTwitchSocial("etsuuuuuuu")]
  }
];

export const staff: Person[] = [
  {
    name: "AndrewDZNs",
    slug: "andrewdzns",
    role: "Graphic Designer",
    group: "Brand",
    descriptor: "Creating visuals and the branding for RAD.",
    bio: "The creative force behind RAD's visual identity. From logos to motion graphics, Andrew shapes how the world sees RAD.",
    tags: ["Design", "Creative"],
    number: 1,
    featured: true
  },
  {
    name: "Moises \"Jatsby\" Lara",
    slug: "jatsby",
    role: "Team Manager",
    group: "Operations",
    descriptor:
      "Responsible for roster coordination, team operations, and competitive support while helping shape the structure and professional standard of the organization.",
    bio: "Jatsby is the operational core of RAD — coordinating schedules, managing roster logistics, and ensuring the team runs like a well-oiled machine.",
    tags: ["Management", "Ops"],
    number: 2
  },
  {
    name: "Felix",
    slug: "felix",
    role: "Social Media Manager",
    group: "Brand",
    descriptor: "Puts out fire posts for the public, creates new ideas, and works on many projects for RAD.",
    bio: "Felix turns RAD's competitive energy into content that hits timelines. From real-time match updates to viral posts.",
    tags: ["Social", "Content"],
    number: 3
  },
  {
    name: "Prosper",
    slug: "prosper",
    role: "Analyst",
    group: "Competitive",
    descriptor: "Scouting, predictions, analytics, and assistant coaching.",
    bio: "RAD's analytical edge. Prosper breaks down opponent tendencies, tracks meta shifts, and gives the team a data-driven advantage.",
    tags: ["Analytics", "Scouting"],
    number: 4
  },
  {
    name: "Kcins1",
    slug: "kcins1",
    role: "Social Media Management",
    group: "Brand",
    descriptor: "Helps with socials and brings new ideas.",
    bio: "Supporting the social media push with fresh ideas and consistent content output.",
    tags: ["Social", "Content"],
    number: 5
  },
  {
    name: "Ashh",
    slug: "ashh",
    role: "Head Coach / Tank Sub",
    group: "Competitive",
    descriptor: "I use my brain more than my hands.",
    bio: "Ashh leads from the coaching seat — calling macro strategy, designing team compositions, and stepping in as a sub when the roster needs frontline depth.",
    tags: ["Coaching", "Tank"],
    number: 6
  }
];

export const partners: Partner[] = [
  { name: "Primary", tier: "Primary", href: "/contact", isOpenSlot: true },
  { name: "Primary", tier: "Primary", href: "/contact", isOpenSlot: true },
  { name: "Official", tier: "Official", href: "/contact", isOpenSlot: true },
  { name: "Official", tier: "Official", href: "/contact", isOpenSlot: true },
  { name: "Official", tier: "Official", href: "/contact", isOpenSlot: true },
  { name: "Official", tier: "Official", href: "/contact", isOpenSlot: true },
  { name: "Supporting", tier: "Supporting", href: "/contact", isOpenSlot: true },
  { name: "Supporting", tier: "Supporting", href: "/contact", isOpenSlot: true }
];

export const merchCollection = {
  title: "RAD Shop",
  eyebrow: "Merch",
  description: "Official RAD Esports gear and player-kit concepts built around the red, black, and white identity.",
  status: radShopUrl ? "External shop live" : "Shop link pending",
  conceptImage: assets.shop.jerseyFront,
  frontImage: assets.shop.jerseyFront,
  backImage: assets.shop.jerseyBack,
  spotlight: "Player kit",
  shopUrl: radShopUrl
};

export const merchItems: MerchItem[] = [
  {
    name: "RAD Player Jersey",
    category: "Jerseys",
    description: "Black and red match jersey with front RAD wordmark, wolf-mark patterning, and custom gamer-tag back.",
    accent: "Front + back proof",
    status: merchItemStatus,
    frontImage: assets.shop.jerseyFront,
    backImage: assets.shop.jerseyBack,
    featured: true,
    externalUrl: radShopUrl,
    ctaLabel: "Shop external"
  },
  {
    name: "Light Pro SS Tee",
    category: "Light Gear",
    description: "White short-sleeve performance tee with a centered red RAD mark.",
    accent: "Short sleeve",
    status: merchItemStatus,
    frontImage: assets.shop.lightSsTshirt,
    externalUrl: radShopUrl,
    ctaLabel: "Shop external"
  },
  {
    name: "Dark Pro SS Tee",
    category: "Dark Gear",
    description: "Black short-sleeve performance tee with a centered red RAD mark.",
    accent: "Short sleeve",
    status: merchItemStatus,
    frontImage: assets.shop.darkSsTshirt,
    externalUrl: radShopUrl,
    ctaLabel: "Shop external"
  },
  {
    name: "Light Pro LS Tee",
    category: "Light Gear",
    description: "White long-sleeve performance tee for a cleaner supporter-kit look.",
    accent: "Long sleeve",
    status: merchItemStatus,
    frontImage: assets.shop.lightLsTshirt,
    externalUrl: radShopUrl,
    ctaLabel: "Shop external"
  },
  {
    name: "Dark Pro LS Tee",
    category: "Dark Gear",
    description: "Black long-sleeve performance tee with the red RAD mark on the chest.",
    accent: "Long sleeve",
    status: merchItemStatus,
    frontImage: assets.shop.darkLsTshirt,
    externalUrl: radShopUrl,
    ctaLabel: "Shop external"
  },
  {
    name: "Light Pro Sweatshirt",
    category: "Light Gear",
    description: "White crewneck sweatshirt with the red RAD mark and a clean arena-ready profile.",
    accent: "Crewneck",
    status: merchItemStatus,
    frontImage: assets.shop.lightSweatshirt,
    externalUrl: radShopUrl,
    ctaLabel: "Shop external"
  },
  {
    name: "Dark Pro Sweatshirt",
    category: "Dark Gear",
    description: "Black crewneck sweatshirt with a red RAD mark and heavyweight visual presence.",
    accent: "Crewneck",
    status: merchItemStatus,
    frontImage: assets.shop.darkSweatshirt,
    externalUrl: radShopUrl,
    ctaLabel: "Shop external"
  },
  {
    name: "Light Pro Hoodie",
    category: "Light Gear",
    description: "White hoodie with front pouch, tonal drawcords, and the red RAD mark.",
    accent: "Hoodie",
    status: merchItemStatus,
    frontImage: assets.shop.lightHoodie,
    externalUrl: radShopUrl,
    ctaLabel: "Shop external"
  },
  {
    name: "Dark Pro Hoodie",
    category: "Dark Gear",
    description: "Black hoodie with tonal drawcords and a red RAD mark built for colder match days.",
    accent: "Hoodie",
    status: merchItemStatus,
    frontImage: assets.shop.darkHoodie,
    externalUrl: radShopUrl,
    ctaLabel: "Shop external"
  },
  {
    name: "Light Women's SS Tee",
    category: "Women",
    description: "White women's triblend short-sleeve tee with the red RAD mark.",
    accent: "Women's fit",
    status: merchItemStatus,
    frontImage: assets.shop.lightWomensSsTriblend,
    externalUrl: radShopUrl,
    ctaLabel: "Shop external"
  },
  {
    name: "Dark Women's SS Tee",
    category: "Women",
    description: "Black women's triblend short-sleeve tee with the red RAD mark.",
    accent: "Women's fit",
    status: merchItemStatus,
    frontImage: assets.shop.darkWomensSsTriblend,
    externalUrl: radShopUrl,
    ctaLabel: "Shop external"
  }
];

export const stats = [
  { value: "2023", label: "Founded" },
  { value: "01", label: "World Title" },
  { value: "01", label: "EMEA Title" }
];

export const contactChannels: ContactChannel[] = [
  {
    label: "Discord",
    value: "discord.com/invite/radgg",
    href: discordInviteUrl
  },
  {
    label: "Email",
    value: "Radrocketow@gmail.com",
    href: "mailto:Radrocketow@gmail.com"
  },
  {
    label: "YouTube",
    value: "youtube.com/@RadEsport",
    href: "https://www.youtube.com/@RadEsport"
  },
  {
    label: "X",
    value: "x.com/RADesport",
    href: "https://x.com/RADesport"
  }
];

const orgSocialPlatformByLabel: Record<string, OrgSocialPlatform> = {
  Discord: "discord",
  YouTube: "youtube",
  X: "x",
  Twitch: "twitch",
  Instagram: "instagram",
  TikTok: "tiktok"
};

/** Org-facing social links (excludes email). Sourced from contactChannels. */
export const orgSocialChannels: OrgSocialChannel[] = contactChannels
  .filter((channel) => channel.href.startsWith("http"))
  .flatMap((channel) => {
    const platform = orgSocialPlatformByLabel[channel.label];
    if (!platform) return [];

    return [
      {
        platform,
        label: channel.label,
        handle: channel.value,
        href: channel.href
      }
    ];
  });

// ─── Organization Timeline ───────────────────────────────────────────────────

export const orgTimeline: Milestone[] = [
  {
    date: "Sept 2023",
    title: "RAD Founded",
    description: "RAD Esports established with a mission to compete at the highest level."
  },
  {
    date: "Dec 2024",
    title: "Marvel Rivals Entry",
    description: "Officially entered the Marvel Rivals competitive scene with a world-class roster."
  },
  {
    date: "Aug 2025",
    title: "Ignite World Champions",
    description: "RAD became the inaugural Marvel Rivals Ignite: Mid-Season World Champions."
  },
  {
    date: "March 2026",
    title: "EMEA Regional Champions",
    description: "Won the Marvel Rivals Championship Season 6: EMEA PC title, solidifying dominance across Europe."
  },
  {
    date: "2026",
    title: "Activation Pipeline Opens",
    description: "RAD formalized its public-facing activations and partnership structure, preparing the org for brand campaigns without padding the site with fake sponsor inventory."
  }
];

export const igniteSchedule = [
  { stage: "Preseason EMEA", dates: "March - April" },
  { stage: "Stage 1 EMEA", dates: "May - June" },
  { stage: "Mid-Season Qualifiers", dates: "July" },
  { stage: "Mid-Season Finals", dates: "August" },
  { stage: "Stage 2", dates: "September – October" },
  { stage: "Grand Finals", dates: "November - December" }
];

// ─── Organization Values / Pillars ────────────────────────────────────────────

export const orgValues: OrgValue[] = [
  {
    title: "Competition First",
    description: "Every decision starts with winning. We build rosters, systems, and culture around performance at the highest level.",
    icon: "⚔️"
  },
  {
    title: "Untamed Energy",
    description: "RAD doesn't play it safe. We bring raw intensity, bold branding, and an identity that refuses to blend in.",
    icon: "🔥"
  },
  {
    title: "Community Driven",
    description: "Our fans aren't spectators — they're part of the team. Community shapes content, culture, and competitive momentum.",
    icon: "🤝"
  },
  {
    title: "Scale Ready",
    description: "From day one, RAD has been built to grow. Multi-title expansion, brand partnerships, and content infrastructure are ready to go.",
    icon: "📈"
  }
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getPersonBySlug(slug: string): Person | undefined {
  return [...players, ...staff].find((p) => p.slug === slug);
}

export function getAllPersonSlugs(): string[] {
  return [...players, ...staff].map((p) => p.slug);
}
