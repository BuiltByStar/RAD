"use server";

import { revalidatePath } from "next/cache";

import { requireAdminAccess } from "@/lib/admin";
import {
  createLocalId,
  readLocalDashboardData,
  saveLocalAdminUpload,
  writeLocalDashboardData,
  writeLocalSupabaseExport
} from "@/lib/local-admin-store";
import { getPostMeta } from "@/lib/posts";
import { fallbackContent } from "@/lib/content-data";
import { partners, players, staff } from "@/lib/site-data";

function readText(formData: FormData, key: string, fallback = "") {
  const value = formData.get(key);
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

function readOptionalText(formData: FormData, key: string) {
  const value = readText(formData, key);
  return value.length ? value : null;
}

function readNumber(formData: FormData, key: string, fallback = 0) {
  const value = Number(readText(formData, key, String(fallback)));
  return Number.isFinite(value) ? value : fallback;
}

function readBoolean(formData: FormData, key: string) {
  const value = formData.get(key);
  return value === "on" || value === "true";
}

function readFile(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function getAdminSupabase() {
  if (process.env.LOCAL_ADMIN_BYPASS === "1") {
    return null;
  }

  const access = await requireAdminAccess();

  if (!access.ok) {
    throw new Error("Admin access is required.");
  }

  return access.supabase;
}

function revalidatePublic(paths: string[]) {
  revalidatePath("/dashboard");
  paths.forEach((path) => revalidatePath(path));
}

export async function createNewsPost(formData: FormData) {
  const supabase = await getAdminSupabase();
  const title = readText(formData, "title", "Untitled RAD update");
  const slug = slugify(readText(formData, "slug", title));
  const uploadedCover = readFile(formData, "cover_file");
  const localCover = uploadedCover ? await saveLocalAdminUpload(uploadedCover, "news") : null;

  if (!supabase) {
    const data = await readLocalDashboardData();
    data.news_posts.unshift({
      id: createLocalId(),
      title,
      slug,
      date: readText(formData, "date", new Date().toISOString().slice(0, 10)),
      summary: readText(formData, "summary"),
      category: readText(formData, "category", "Org Update"),
      cover: localCover ?? readText(formData, "cover", "/assets/rad-bg-red.png"),
      body: readText(formData, "body", "Write the story here."),
      featured: readBoolean(formData, "featured"),
      published: readBoolean(formData, "published"),
      display_order: readNumber(formData, "display_order")
    });
    await writeLocalDashboardData(data);
    revalidatePublic(["/content"]);
    return;
  }

  const { error } = await supabase.from("news_posts").insert({
    title,
    slug,
    date: readText(formData, "date", new Date().toISOString().slice(0, 10)),
    summary: readText(formData, "summary"),
    category: readText(formData, "category", "Org Update"),
    cover: readText(formData, "cover", "/assets/rad-bg-red.png"),
    body: readText(formData, "body", "Write the story here."),
    featured: readBoolean(formData, "featured"),
    published: readBoolean(formData, "published"),
    display_order: readNumber(formData, "display_order")
  });

  if (error) throw new Error(error.message);
  revalidatePublic(["/content"]);
}

export async function updateNewsPost(formData: FormData) {
  const supabase = await getAdminSupabase();
  const id = readText(formData, "id");
  const title = readText(formData, "title", "Untitled RAD update");
  const slug = slugify(readText(formData, "slug", title));
  const uploadedCover = readFile(formData, "cover_file");
  const localCover = uploadedCover ? await saveLocalAdminUpload(uploadedCover, "news") : null;

  if (!supabase) {
    const data = await readLocalDashboardData();
    data.news_posts = data.news_posts.map((post) =>
      post.id === id
        ? {
            ...post,
            title,
            slug,
            date: readText(formData, "date", new Date().toISOString().slice(0, 10)),
            summary: readText(formData, "summary"),
            category: readText(formData, "category", "Org Update"),
            cover: localCover ?? readText(formData, "cover", "/assets/rad-bg-red.png"),
            body: readText(formData, "body"),
            featured: readBoolean(formData, "featured"),
            published: readBoolean(formData, "published"),
            display_order: readNumber(formData, "display_order")
          }
        : post
    );
    await writeLocalDashboardData(data);
    revalidatePublic(["/content", `/content/${slug}`]);
    return;
  }

  const { error } = await supabase
    .from("news_posts")
    .update({
      title,
      slug,
      date: readText(formData, "date", new Date().toISOString().slice(0, 10)),
      summary: readText(formData, "summary"),
      category: readText(formData, "category", "Org Update"),
      cover: readText(formData, "cover", "/assets/rad-bg-red.png"),
      body: readText(formData, "body"),
      featured: readBoolean(formData, "featured"),
      published: readBoolean(formData, "published"),
      display_order: readNumber(formData, "display_order")
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePublic(["/content", `/content/${slug}`]);
}

export async function deleteNewsPost(formData: FormData) {
  const supabase = await getAdminSupabase();

  if (!supabase) {
    const data = await readLocalDashboardData();
    data.news_posts = data.news_posts.filter((post) => post.id !== readText(formData, "id"));
    await writeLocalDashboardData(data);
    revalidatePublic(["/content"]);
    return;
  }

  const { error } = await supabase.from("news_posts").delete().eq("id", readText(formData, "id"));

  if (error) throw new Error(error.message);
  revalidatePublic(["/content"]);
}

export async function upsertRosterEntry(formData: FormData) {
  const supabase = await getAdminSupabase();
  const id = readText(formData, "id");
  const uploadedImage = readFile(formData, "image_file");
  const localImage = uploadedImage ? await saveLocalAdminUpload(uploadedImage, "roster") : null;
  const payload = {
    handle: readText(formData, "handle"),
    real_name: readOptionalText(formData, "real_name"),
    player_role: readText(formData, "player_role", "Player"),
    roster_header: readText(formData, "roster_header", "Marvel Rivals"),
    region: readOptionalText(formData, "region"),
    bio: readOptionalText(formData, "bio"),
    image_url: localImage ?? readOptionalText(formData, "image_url"),
    x_url: readOptionalText(formData, "x_url"),
    twitch_url: readOptionalText(formData, "twitch_url"),
    featured: readBoolean(formData, "featured"),
    role_order: readText(formData, "role_order", "Starter"),
    display_order: readNumber(formData, "display_order")
  };

  if (!supabase) {
    const data = await readLocalDashboardData();
    data.roster_entries = id
      ? data.roster_entries.map((entry) => (entry.id === id ? { ...entry, ...payload } : entry))
      : [{ id: createLocalId(), ...payload }, ...data.roster_entries];
    await writeLocalDashboardData(data);
    revalidatePublic(["/roster"]);
    return;
  }

  const query = id
    ? supabase.from("roster_entries").update(payload).eq("id", id)
    : supabase.from("roster_entries").insert(payload);
  const { error } = await query;

  if (error) throw new Error(error.message);
  revalidatePublic(["/roster"]);
}

export async function deleteRosterEntry(formData: FormData) {
  const supabase = await getAdminSupabase();

  if (!supabase) {
    const data = await readLocalDashboardData();
    data.roster_entries = data.roster_entries.filter((entry) => entry.id !== readText(formData, "id"));
    await writeLocalDashboardData(data);
    revalidatePublic(["/roster"]);
    return;
  }

  const { error } = await supabase.from("roster_entries").delete().eq("id", readText(formData, "id"));

  if (error) throw new Error(error.message);
  revalidatePublic(["/roster"]);
}

export async function upsertStaffEntry(formData: FormData) {
  const supabase = await getAdminSupabase();
  const id = readText(formData, "id");
  const uploadedImage = readFile(formData, "image_file");
  const localImage = uploadedImage ? await saveLocalAdminUpload(uploadedImage, "staff") : null;
  const payload = {
    name: readText(formData, "name"),
    title: readText(formData, "title"),
    bio: readOptionalText(formData, "bio"),
    x_url: readOptionalText(formData, "x_url"),
    section: readText(formData, "section", "General Staff"),
    leadership: readBoolean(formData, "leadership"),
    image_url: localImage ?? readOptionalText(formData, "image_url"),
    display_order: readNumber(formData, "display_order")
  };

  if (!supabase) {
    const data = await readLocalDashboardData();
    data.staff_entries = id
      ? data.staff_entries.map((entry) => (entry.id === id ? { ...entry, ...payload } : entry))
      : [{ id: createLocalId(), ...payload }, ...data.staff_entries];
    await writeLocalDashboardData(data);
    revalidatePublic(["/staff"]);
    return;
  }

  const query = id
    ? supabase.from("staff_entries").update(payload).eq("id", id)
    : supabase.from("staff_entries").insert(payload);
  const { error } = await query;

  if (error) throw new Error(error.message);
  revalidatePublic(["/staff"]);
}

export async function deleteStaffEntry(formData: FormData) {
  const supabase = await getAdminSupabase();

  if (!supabase) {
    const data = await readLocalDashboardData();
    data.staff_entries = data.staff_entries.filter((entry) => entry.id !== readText(formData, "id"));
    await writeLocalDashboardData(data);
    revalidatePublic(["/staff"]);
    return;
  }

  const { error } = await supabase.from("staff_entries").delete().eq("id", readText(formData, "id"));

  if (error) throw new Error(error.message);
  revalidatePublic(["/staff"]);
}

export async function upsertPartnerEntry(formData: FormData) {
  const supabase = await getAdminSupabase();
  const id = readText(formData, "id");
  const uploadedLogo = readFile(formData, "logo_file");
  const localLogo = uploadedLogo ? await saveLocalAdminUpload(uploadedLogo, "partners") : null;
  const payload = {
    name: readOptionalText(formData, "name"),
    tier: readOptionalText(formData, "tier"),
    description: readOptionalText(formData, "description"),
    logo_url: localLogo ?? readOptionalText(formData, "logo_url"),
    url: readOptionalText(formData, "url"),
    is_open_slot: readBoolean(formData, "is_open_slot"),
    display_order: readNumber(formData, "display_order")
  };

  if (!supabase) {
    const data = await readLocalDashboardData();
    data.partner_entries = id
      ? data.partner_entries.map((entry) => (entry.id === id ? { ...entry, ...payload } : entry))
      : [{ id: createLocalId(), ...payload }, ...data.partner_entries];
    await writeLocalDashboardData(data);
    revalidatePublic(["/partners"]);
    return;
  }

  const query = id
    ? supabase.from("partner_entries").update(payload).eq("id", id)
    : supabase.from("partner_entries").insert(payload);
  const { error } = await query;

  if (error) throw new Error(error.message);
  revalidatePublic(["/partners"]);
}

export async function deletePartnerEntry(formData: FormData) {
  const supabase = await getAdminSupabase();

  if (!supabase) {
    const data = await readLocalDashboardData();
    data.partner_entries = data.partner_entries.filter((entry) => entry.id !== readText(formData, "id"));
    await writeLocalDashboardData(data);
    revalidatePublic(["/partners"]);
    return;
  }

  const { error } = await supabase.from("partner_entries").delete().eq("id", readText(formData, "id"));

  if (error) throw new Error(error.message);
  revalidatePublic(["/partners"]);
}

export async function upsertContentItem(formData: FormData) {
  const supabase = await getAdminSupabase();
  const id = readText(formData, "id");
  const payload = {
    title: readText(formData, "title"),
    description: readOptionalText(formData, "description"),
    url: readText(formData, "url", "https://www.youtube.com/@RadEsport"),
    thumbnail: readText(formData, "thumbnail", "/assets/rad-bg-red.png"),
    type: readText(formData, "type", "video") as "video" | "article" | "clip",
    tags: readText(formData, "tags")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    featured: readBoolean(formData, "featured"),
    display_order: readNumber(formData, "display_order")
  };

  if (!supabase) {
    const data = await readLocalDashboardData();
    data.content_items = id
      ? data.content_items.map((entry) => (entry.id === id ? { ...entry, ...payload } : entry))
      : [{ id: createLocalId(), ...payload }, ...data.content_items];
    await writeLocalDashboardData(data);
    revalidatePublic(["/content"]);
    return;
  }

  const query = id
    ? supabase.from("content_items").update(payload).eq("id", id)
    : supabase.from("content_items").insert(payload);
  const { error } = await query;

  if (error) throw new Error(error.message);
  revalidatePublic(["/content"]);
}

export async function deleteContentItem(formData: FormData) {
  const supabase = await getAdminSupabase();

  if (!supabase) {
    const data = await readLocalDashboardData();
    data.content_items = data.content_items.filter((entry) => entry.id !== readText(formData, "id"));
    await writeLocalDashboardData(data);
    revalidatePublic(["/content"]);
    return;
  }

  const { error } = await supabase.from("content_items").delete().eq("id", readText(formData, "id"));

  if (error) throw new Error(error.message);
  revalidatePublic(["/content"]);
}

export async function updateInquiryStatus(formData: FormData) {
  const supabase = await getAdminSupabase();

  if (!supabase) {
    const data = await readLocalDashboardData();
    data.contact_inquiries = data.contact_inquiries.map((entry) =>
      entry.id === readText(formData, "id")
        ? { ...entry, status: readText(formData, "status", "new") }
        : entry
    );
    await writeLocalDashboardData(data);
    revalidatePublic(["/dashboard"]);
    return;
  }

  const { error } = await supabase
    .from("contact_inquiries")
    .update({ status: readText(formData, "status", "new") })
    .eq("id", readText(formData, "id"));

  if (error) throw new Error(error.message);
  revalidatePublic(["/dashboard"]);
}

export async function updateMaintenanceSetting(formData: FormData) {
  const supabase = await getAdminSupabase();

  if (!supabase) {
    const data = await readLocalDashboardData();
    const enabled = readBoolean(formData, "enabled");
    const existing = data.site_settings.find((setting) => setting.key === "maintenance");
    if (existing) {
      existing.value = { enabled };
    } else {
      data.site_settings.push({ key: "maintenance", value: { enabled } });
    }
    await writeLocalDashboardData(data);
    revalidatePublic(["/dashboard", "/"]);
    return;
  }

  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: "maintenance", value: { enabled: readBoolean(formData, "enabled") } });

  if (error) throw new Error(error.message);
  revalidatePublic(["/dashboard", "/"]);
}

export async function seedLocalDashboardData() {
  if (process.env.LOCAL_ADMIN_BYPASS !== "1") {
    throw new Error("Local seed is only available in local admin bypass mode.");
  }

  const existing = await readLocalDashboardData();
  const posts = await getPostMeta();

  const data = {
    ...existing,
    news_posts: posts.map((post, index) => ({
      id: createLocalId(),
      title: post.title,
      slug: post.slug,
      date: post.date,
      summary: post.summary,
      category: post.category,
      cover: post.cover,
      body: `${post.summary}\n\nThis seeded local post mirrors the current site content and can be edited from the RAD dashboard.`,
      featured: Boolean(post.featured),
      published: true,
      display_order: index
    })),
    roster_entries: players.map((player, index) => ({
      id: createLocalId(),
      display_order: index,
      handle: player.name,
      real_name: player.realName ?? null,
      player_role: player.role,
      roster_header: player.group,
      region: null,
      bio: player.bio ?? null,
      image_url: null,
      x_url: player.socials?.find((social) => social.label === "X")?.href ?? null,
      twitch_url: player.socials?.find((social) => social.label === "Twitch")?.href ?? null,
      featured: Boolean(player.featured),
      role_order: player.tags?.includes("Substitute") ? "Sub" : "Starter"
    })),
    staff_entries: staff.map((member, index) => ({
      id: createLocalId(),
      display_order: index,
      name: member.name,
      title: member.role,
      bio: member.bio ?? null,
      x_url: member.socials?.find((social) => social.label === "X")?.href ?? null,
      section: member.group === "Brand" ? "Content + Social Media" : "General Staff",
      leadership: false,
      image_url: null
    })),
    partner_entries: partners.map((partner, index) => ({
      id: createLocalId(),
      display_order: index,
      name: partner.name,
      tier: partner.tier,
      description: partner.description,
      logo_url: null,
      url: partner.href,
      is_open_slot: false
    })),
    content_items: fallbackContent.map((item, index) => ({
      id: createLocalId(),
      title: item.title,
      description: item.description ?? null,
      url: item.url,
      thumbnail: item.thumbnail,
      type: item.type,
      tags: item.tags,
      featured: Boolean(item.featured),
      display_order: index
    })),
    contact_inquiries: existing.contact_inquiries,
    site_settings: existing.site_settings
  };

  await writeLocalDashboardData(data);
  revalidatePublic(["/dashboard", "/content", "/roster", "/staff", "/partners"]);
}

export async function exportLocalDashboardData() {
  if (process.env.LOCAL_ADMIN_BYPASS !== "1") {
    throw new Error("Local export is only available in local admin bypass mode.");
  }

  const data = await readLocalDashboardData();
  await writeLocalSupabaseExport(data);
  revalidatePublic(["/dashboard"]);
}
