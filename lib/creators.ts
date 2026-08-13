// ─── Content Creators Config (Twitch Integration) ──────────────────────────

export type ContentCreator = {
  id: string;
  name: string;
  twitchLogin: string;
  role?: string;
};

export const contentCreators: ContentCreator[] = [
  { id: "cr-1", name: "ducky", twitchLogin: "ducky1mr", role: "Tank / Vanguard" },
  { id: "cr-2", name: "SmashNezz", twitchLogin: "smashnezz", role: "Duelist" },
  { id: "cr-3", name: "crazykitty", twitchLogin: "crazykitty33", role: "Duelist" },
  { id: "cr-4", name: "vertigo", twitchLogin: "vertigo__o", role: "Strategist" },
  { id: "cr-5", name: "Mash", twitchLogin: "Mashhmr", role: "Strategist & Captain" },
  { id: "cr-6", name: "Etsu", twitchLogin: "etsuuuuuuu", role: "Duelist (Sub)" },
  { id: "cr-7", name: "lugiagoat", twitchLogin: "lugiagoat", role: "Tank / Vanguard" },
  { id: "cr-8", name: "Denis", twitchLogin: "rad_denis", role: "Creator" },
  { id: "cr-9", name: "TeamCaptain", twitchLogin: "teamcaptain001", role: "Creator" },
  { id: "cr-10", name: "Kikyuu", twitchLogin: "kikyuu", role: "Creator" }
];
