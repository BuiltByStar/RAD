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
  role: string;
  group: string;
  descriptor: string;
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

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/teams", label: "Teams" },
  { href: "/content", label: "Content" },
  { href: "/partners", label: "Partners" }
];

export const teams: Team[] = [
  {
    name: "Marvel Rivals",
    slug: "marvel-rivals",
    game: "Hero Shooter",
    description:
      "RAD's lead division built for fast, coordinated team fights and big-stage moments.",
    status: "Featured",
    featured: false
  },
  {
    name: "VALORANT",
    slug: "valorant",
    game: "Tactical FPS",
    description:
      "A tactical roster slotting into RAD's long-term competitive expansion plan.",
    status: "Recruiting",
    featured: true
  },
  {
    name: "Creator Division",
    slug: "creator-division",
    game: "Entertainment",
    description:
      "Community-first talent supporting the org through streams, clips, and brand campaigns.",
    status: "Growing",
    featured: false
  }
];

export const players: Person[] = [
  {
    name: "VEX",
    role: "Captain",
    group: "Marvel Rivals",
    descriptor: "Frontline caller built for tempo shifts and late-round control.",
    socials: [{ label: "X", href: "https://x.com/RADesport" }],
    featured: true
  },
  {
    name: "NYRA",
    role: "Flex",
    group: "Marvel Rivals",
    descriptor: "High-pressure utility play with reliable skirmish reads."
  },
  {
    name: "KOZA",
    role: "Duelist",
    group: "VALORANT",
    descriptor: "Aggressive entry profile ready for next-stage lineup reveals."
  },
  {
    name: "ARC",
    role: "Sentinel",
    group: "VALORANT",
    descriptor: "Anchor-focused defender with patient site control."
  },
  {
    name: "MALIX",
    role: "Content Talent",
    group: "Creator Division",
    descriptor: "Clip-driven creator helping turn match energy into community growth."
  },
  {
    name: "ONYX",
    role: "Sub / Reserve",
    group: "Open Slot",
    descriptor: "Placeholder slot designed to accept updated roster data later."
  }
];

export const staff: Person[] = [
  {
    name: "RAD Leadership",
    role: "Executive Team",
    group: "Operations",
    descriptor: "Sets the competitive, creative, and community direction for the org.",
    featured: true
  },
  {
    name: "Head Coach",
    role: "Performance",
    group: "Competitive",
    descriptor: "Owns prep, systems, and match-day structure for featured rosters."
  },
  {
    name: "Media Lead",
    role: "Creative",
    group: "Brand",
    descriptor: "Drives the visual identity, social output, and content presentation."
  },
  {
    name: "Community Manager",
    role: "Engagement",
    group: "Community",
    descriptor: "Runs Discord, fan touchpoints, and activation rollouts."
  }
];

export const partners: Partner[] = [
  {
    name: "GoWild",
    tier: "Activation Partner",
    href: "#",
    description:
      "Launch-phase brand partner used to show how sponsorship blocks and partner callouts will land."
  },
  {
    name: "Open for Sponsors",
    tier: "Now Booking",
    href: "/contact",
    description:
      "RAD is structured to onboard category partners, apparel sponsors, and campaign collaborators."
  }
];

export const stats = [
  { value: "03", label: "Competitive Divisions" },
  { value: "24/7", label: "Community Energy" },
  { value: "V1", label: "Launch Build Ready for Upgrades" }
];

export const contactChannels: ContactChannel[] = [
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
