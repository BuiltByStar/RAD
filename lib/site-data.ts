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

export const siteTagline = "Built for pressure, content, and the next stage of competition.";

export const aboutSummary =
  "RAD has been turning heads since the beginning. We didn't wait for an invitation to the top; RAD cemented its place as the inaugural Marvel Rivals Ignite: Mid-Season World Champions and most recently added the EMEA Regional Champions title. You've seen us do it before, get ready to see it again. Untamed, unstoppable, and never by the book. Welcome to the wild. #GoWild";

export const discordInviteUrl = "https://discord.com/invite/radgg";
export const discordServerId = "1363584103479513198";
export const discordWidgetUrl = `https://discord.com/widget?id=${discordServerId}&theme=dark`;

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/teams", label: "Teams" },
  { href: "/roster", label: "Roster" },
  { href: "/staff", label: "Staff" },
  { href: "/content", label: "Content" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" }
];

export const teams: Team[] = [
  {
    name: "Marvel Rivals",
    slug: "marvel-rivals",
    game: "Marvel Rivals",
    description:
      "RAD's flagship roster and reigning Ignite: Mid-Season World Champions, now also holding the EMEA Regional Champions title.",
    status: "World & EMEA Champions",
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
    role: "Tank / Vanguard",
    group: "Marvel Rivals",
    descriptor: "Anchor tank",
    socials: [createXSocial("ducky1one"), createTwitchSocial("ducky1mr")],
    featured: true
  },
  {
    name: "lugiagoat",
    role: "Tank / Vanguard",
    group: "Marvel Rivals",
    descriptor: "Offtank diver",
    socials: [createXSocial("lugiagoat")]
  },
  {
    name: "SmashNezz",
    role: "Duelist",
    group: "Marvel Rivals",
    descriptor: "Hitscan",
    socials: [createXSocial("smashnezz"), createTwitchSocial("smashnezz")]
  },
  {
    name: "crazykitty",
    role: "Duelist",
    group: "Marvel Rivals",
    descriptor: "I be playing anything these days (flex)",
    socials: [createXSocial("crazykitty333"), createTwitchSocial("crazykitty33")]
  },
  {
    name: "vertigo",
    role: "Strategist",
    group: "Marvel Rivals",
    descriptor: "Healing my team a lot",
    socials: [createXSocial("vertigomrv"), createTwitchSocial("vertigo__o")]
  },
  {
    name: "Mash",
    role: "Strategist & Team Captain",
    group: "Marvel Rivals",
    descriptor: "For fun",
    socials: [createXSocial("mashh_mrr"), createTwitchSocial("Mashhmr")]
  },
  {
    name: "Etsu",
    role: "Duelist (Sub)",
    group: "Marvel Rivals",
    descriptor: "French Flex",
    socials: [createXSocial("@etsuuu6"), createTwitchSocial("etsuuuuuuu")]
  }
];

export const staff: Person[] = [
  {
    name: "AndrewDZNs",
    role: "Graphic Designer",
    group: "Brand",
    descriptor: "Creating visuals and the branding for RAD.",
    featured: true
  },
  {
    name: "Moises “Jatsby” Lara",
    role: "Team Manager",
    group: "Operations",
    descriptor:
      "Responsible for roster coordination, team operations, and competitive support while helping shape the structure and professional standard of the organization."
  },
  {
    name: "Felix",
    role: "Social Media Manager",
    group: "Brand",
    descriptor: "Puts out fire posts for the public, creates new ideas, and works on many projects for RAD."
  },
  {
    name: "Prosper",
    role: "Analyst",
    group: "Competitive",
    descriptor: "Scouting, predictions, analytics, and assistant coaching."
  },
  {
    name: "Kcins1",
    role: "Social Media Management",
    group: "Brand",
    descriptor: "Helps with socials and brings new ideas."
  },
  {
    name: "Ashh",
    role: "Head Coach / Tank Sub",
    group: "Competitive",
    descriptor: "I use my brain more than my hands."
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
  { value: "01", label: "World Championship" },
  { value: "01", label: "EMEA Regional Title" },
  { value: "07", label: "Marvel Rivals Players" }
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
