export type NavLink = {
  href: string;
  label: string;
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
  description: string;
};

export type ContactChannel = {
  label: string;
  value: string;
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

export const primaryNavLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/roster", label: "Roster" },
  { href: "/content", label: "Content" }
];

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/roster", label: "Roster" },
  { href: "/staff", label: "Staff" },
  { href: "/content", label: "Content" },
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
  {
    name: "Open for Activations",
    tier: "Now Booking",
    href: "/contact",
    description:
      "RAD is currently opening the door for activation partners who want launch-era visibility and long-term brand alignment."
  },
  {
    name: "Category Sponsors",
    tier: "Growth Ready",
    href: "/contact",
    description:
      "Apparel, peripherals, energy, and campaign partners can plug into a structure designed for competitive storytelling and media rollout."
  },
  {
    name: "Content Campaigns",
    tier: "Available",
    href: "/contact",
    description:
      "RAD can support launch announcements, creator-facing campaigns, community activations, and branded competitive content."
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
