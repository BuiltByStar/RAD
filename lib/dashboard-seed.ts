import type { Person, Partner } from "@/lib/site-data";

export function slugifyHandle(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function socialHref(person: Person, label: string) {
  return person.socials?.find((social) => social.label === label)?.href ?? null;
}

function mapRoleOrder(tags?: string[]) {
  if (tags?.includes("Substitute")) return "Sub";
  if (tags?.some((tag) => /coach/i.test(tag))) return "Coach";
  if (tags?.some((tag) => /manager|captain/i.test(tag))) return "Manager";
  return "Starter";
}

function mapStaffSection(group: string) {
  if (group === "Brand") return "Content + Social Media";
  if (group === "Operations" || group === "Competitive") return "General Staff";
  return "General Staff";
}

export function buildRosterSeedRows(players: Person[]) {
  return players.map((player, index) => ({
    display_order: index,
    handle: player.name,
    slug: player.slug || slugifyHandle(player.name),
    real_name: player.realName ?? null,
    player_role: player.role,
    roster_header: player.group,
    region: null,
    descriptor: player.descriptor,
    bio: player.bio ?? null,
    image_url: player.image ?? null,
    x_url: socialHref(player, "X"),
    twitch_url: socialHref(player, "Twitch"),
    instagram_url: socialHref(player, "Instagram"),
    youtube_url: socialHref(player, "YouTube"),
    discord_url: socialHref(player, "Discord"),
    tiktok_url: socialHref(player, "TikTok"),
    featured: Boolean(player.featured),
    role_order: mapRoleOrder(player.tags),
    specialties: player.specialties ?? [],
    tags: player.tags ?? [],
    rank: player.rank ?? null,
    jersey_number: player.number ?? null
  }));
}

export function buildStaffSeedRows(members: Person[]) {
  return members.map((member, index) => ({
    display_order: index,
    name: member.name,
    slug: member.slug || slugifyHandle(member.name),
    title: member.role,
    bio: member.bio ?? null,
    descriptor: member.descriptor,
    x_url: socialHref(member, "X"),
    section: mapStaffSection(member.group),
    group_name: member.group,
    leadership: false,
    image_url: member.image ?? null,
    tags: member.tags ?? []
  }));
}

export function buildPartnerSeedRows(partnerList: Partner[]) {
  return partnerList.map((partner, index) => ({
    display_order: index,
    name: partner.name,
    tier: partner.tier,
    description: partner.description ?? null,
    logo_url: partner.logo ?? null,
    url: partner.href,
    is_open_slot: partner.isOpenSlot ?? false
  }));
}
