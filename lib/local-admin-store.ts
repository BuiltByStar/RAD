import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { fallbackContent } from "./content-data";

const localStorePath = path.join(process.cwd(), ".codex-local", "state", "dashboard-data.json");
const localUploadRoot = path.join(process.cwd(), ".codex-local", "uploads");
export const localSupabaseExportPath = path.join(process.cwd(), ".codex-local", "state", "dashboard-supabase-export.json");

export type LocalNewsPostRow = {
  id: string;
  title: string;
  slug: string;
  date: string;
  summary: string;
  category: string;
  cover: string;
  body: string;
  featured: boolean;
  published: boolean;
  display_order: number;
};

export type LocalRosterRow = {
  id: string;
  display_order: number;
  handle: string;
  slug?: string | null;
  real_name: string | null;
  player_role: string;
  roster_header: string;
  region: string | null;
  bio: string | null;
  image_url: string | null;
  x_url: string | null;
  twitch_url: string | null;
  instagram_url?: string | null;
  youtube_url?: string | null;
  featured: boolean;
  role_order: string;
  descriptor?: string | null;
  specialties?: string[];
  tags?: string[];
  rank?: string | null;
  jersey_number?: number | null;
};

export type LocalStaffRow = {
  id: string;
  display_order: number;
  name: string;
  title: string;
  bio: string | null;
  x_url: string | null;
  section: string;
  leadership: boolean;
  image_url: string | null;
  slug?: string | null;
  descriptor?: string | null;
  tags?: string[];
  group_name?: string | null;
};

export type LocalPartnerRow = {
  id: string;
  display_order: number;
  name: string | null;
  tier: string | null;
  description: string | null;
  logo_url: string | null;
  url: string | null;
  is_open_slot: boolean;
};

export type LocalContentItemRow = {
  id: string;
  title: string;
  description: string | null;
  url: string;
  thumbnail: string;
  type: "video" | "article" | "clip";
  tags: string[];
  featured: boolean;
  display_order: number;
};

export type LocalInquiryRow = {
  id: string;
  submitted_at: string;
  name: string;
  email: string;
  organization: string | null;
  inquiry_type: string;
  message: string;
  socials: string | null;
  status: string;
};

export type LocalSiteSettingRow = {
  key: string;
  value: { enabled?: boolean } | null;
};

export type LocalDashboardData = {
  news_posts: LocalNewsPostRow[];
  roster_entries: LocalRosterRow[];
  staff_entries: LocalStaffRow[];
  partner_entries: LocalPartnerRow[];
  content_items: LocalContentItemRow[];
  contact_inquiries: LocalInquiryRow[];
  site_settings: LocalSiteSettingRow[];
};

function createDefaultData(): LocalDashboardData {
  return {
    news_posts: [],
    roster_entries: [],
    staff_entries: [],
    partner_entries: [],
    content_items: [],
    contact_inquiries: [],
    site_settings: [{ key: "maintenance", value: { enabled: false } }]
  };
}

async function ensureStore() {
  await fs.mkdir(path.dirname(localStorePath), { recursive: true });

  try {
    await fs.access(localStorePath);
  } catch {
    await fs.writeFile(localStorePath, JSON.stringify(createDefaultData(), null, 2), "utf8");
  }
}

export async function readLocalDashboardData() {
  await ensureStore();
  const raw = await fs.readFile(localStorePath, "utf8");
  const parsed = JSON.parse(raw) as Partial<LocalDashboardData>;
  const fallbackItems =
    process.env.LOCAL_ADMIN_BYPASS === "1" && (!parsed.content_items || parsed.content_items.length === 0)
      ? fallbackContent.map((item, index) => ({
          id: randomUUID(),
          title: item.title,
          description: item.description ?? null,
          url: item.url,
          thumbnail: item.thumbnail,
          type: item.type,
          tags: item.tags,
          featured: Boolean(item.featured),
          display_order: index
        }))
      : [];

  const hydrated = {
    ...createDefaultData(),
    ...parsed,
    news_posts: parsed.news_posts ?? [],
    roster_entries: parsed.roster_entries ?? [],
    staff_entries: parsed.staff_entries ?? [],
    partner_entries: parsed.partner_entries ?? [],
    content_items: parsed.content_items?.length ? parsed.content_items : fallbackItems,
    contact_inquiries: parsed.contact_inquiries ?? [],
    site_settings: parsed.site_settings ?? [{ key: "maintenance", value: { enabled: false } }]
  } satisfies LocalDashboardData;

  if (fallbackItems.length > 0) {
    await writeLocalDashboardData(hydrated);
  }

  return hydrated;
}

export async function writeLocalDashboardData(data: LocalDashboardData) {
  await ensureStore();
  await fs.writeFile(localStorePath, JSON.stringify(data, null, 2), "utf8");
}

export function createLocalId() {
  return randomUUID();
}

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-");
}

export async function saveLocalAdminUpload(file: File, folder: string) {
  await fs.mkdir(path.join(localUploadRoot, folder), { recursive: true });

  const extension = path.extname(file.name) || ".bin";
  const fileName = `${Date.now()}-${randomUUID()}-${sanitizeFileName(path.basename(file.name, extension))}${extension}`;
  const outputPath = path.join(localUploadRoot, folder, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(outputPath, buffer);

  return `/api/local-media/${folder}/${fileName}`;
}

export async function writeLocalSupabaseExport(data: LocalDashboardData) {
  await fs.mkdir(path.dirname(localSupabaseExportPath), { recursive: true });
  await fs.writeFile(localSupabaseExportPath, JSON.stringify(data, null, 2), "utf8");
}
