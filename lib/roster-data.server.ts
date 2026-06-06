import { hasSupabaseBrowserEnv } from "./env";
import { readLocalDashboardData } from "./local-admin-store";
import { players as fallbackPlayers, type Person, type PersonSocial } from "./site-data";
import { createSupabaseServerClient } from "./supabase/server";

type RosterRow = {
  id: string;
  display_order: number;
  handle: string;
  slug: string | null;
  real_name: string | null;
  player_role: string;
  roster_header: string;
  region: string | null;
  bio: string | null;
  image_url: string | null;
  x_url: string | null;
  twitch_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  discord_url: string | null;
  tiktok_url: string | null;
  featured: boolean;
  role_order: string;
  descriptor: string | null;
  specialties: string[] | null;
  tags: string[] | null;
  rank: string | null;
  jersey_number: number | null;
};

export type RosterPlayer = Person & {
  id: string;
  displayOrder: number;
};

function mapSocials(row: RosterRow): Person["socials"] {
  const socials: PersonSocial[] = [];
  if (row.x_url) socials.push({ label: "X", href: row.x_url, platform: "x" });
  if (row.twitch_url) socials.push({ label: "Twitch", href: row.twitch_url, platform: "twitch" });
  if (row.instagram_url) socials.push({ label: "Instagram", href: row.instagram_url, platform: "instagram" });
  if (row.youtube_url) socials.push({ label: "YouTube", href: row.youtube_url, platform: "youtube" });
  if (row.discord_url) socials.push({ label: "Discord", href: row.discord_url, platform: "discord" });
  if (row.tiktok_url) socials.push({ label: "TikTok", href: row.tiktok_url, platform: "tiktok" });
  return socials.length ? socials : undefined;
}

function mapRosterRow(row: RosterRow): RosterPlayer {
  return {
    id: row.id,
    displayOrder: row.display_order,
    name: row.handle,
    slug: row.slug?.trim() || row.handle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    role: row.player_role,
    group: row.roster_header,
    descriptor: row.descriptor?.trim() || row.player_role,
    bio: row.bio?.trim() || undefined,
    image: row.image_url?.trim() || undefined,
    realName: row.real_name?.trim() || undefined,
    specialties: row.specialties?.length ? row.specialties : undefined,
    tags: row.tags?.length ? row.tags : undefined,
    rank: row.rank?.trim() || undefined,
    number: row.jersey_number ?? undefined,
    socials: mapSocials(row),
    featured: row.featured
  };
}

function mapFallbackPlayer(player: Person, index: number): RosterPlayer {
  return { ...player, id: `fallback-${index}`, displayOrder: index };
}

function sortPlayers(items: RosterPlayer[]) {
  return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
}

async function getSupabaseRoster() {
  if (!hasSupabaseBrowserEnv()) return [];

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("roster_entries").select("*").order("display_order", { ascending: true });

    if (error) {
      console.warn(
        "[roster-data] Supabase select(roster_entries) failed, falling back to static site-data:",
        error.message
      );
      return [];
    }
    return ((data ?? []) as RosterRow[]).map(mapRosterRow);
  } catch (err) {
    console.warn(
      "[roster-data] Supabase client threw, falling back to static site-data:",
      err instanceof Error ? err.message : err
    );
    return [];
  }
}

export async function getManagedRosterState(teamName?: string): Promise<{
  players: RosterPlayer[];
  usingDashboardRoster: boolean;
}> {
  const filterTeam = teamName ?? "Marvel Rivals";

  if (process.env.LOCAL_ADMIN_BYPASS === "1") {
    const data = await readLocalDashboardData();
    if (!data.roster_entries.length) {
      const fallback = sortPlayers(
        fallbackPlayers.filter((p) => p.group === filterTeam).map(mapFallbackPlayer)
      );
      return { players: fallback, usingDashboardRoster: false };
    }

    const players = sortPlayers(
      [...data.roster_entries]
        .sort((a, b) => a.display_order - b.display_order)
        .map((row) => mapRosterRow(row as RosterRow))
        .filter((player) => player.group === filterTeam)
    );

    return { players, usingDashboardRoster: true };
  }

  const remote = await getSupabaseRoster();
  if (remote.length > 0) {
    const players = sortPlayers(remote.filter((player) => player.group === filterTeam));
    return { players, usingDashboardRoster: true };
  }

  return {
    players: sortPlayers(fallbackPlayers.filter((p) => p.group === filterTeam).map(mapFallbackPlayer)),
    usingDashboardRoster: false
  };
}
