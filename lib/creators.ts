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
];
