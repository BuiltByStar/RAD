"use server";

import { revalidatePath } from "next/cache";

import { requireAdminAccess } from "@/lib/admin";

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

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function getAdminSupabase() {
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
  const { error } = await supabase.from("news_posts").delete().eq("id", readText(formData, "id"));

  if (error) throw new Error(error.message);
  revalidatePublic(["/content"]);
}

export async function upsertRosterEntry(formData: FormData) {
  const supabase = await getAdminSupabase();
  const id = readText(formData, "id");
  const payload = {
    handle: readText(formData, "handle"),
    real_name: readOptionalText(formData, "real_name"),
    player_role: readText(formData, "player_role", "Player"),
    roster_header: readText(formData, "roster_header", "Marvel Rivals"),
    region: readOptionalText(formData, "region"),
    bio: readOptionalText(formData, "bio"),
    image_url: readOptionalText(formData, "image_url"),
    x_url: readOptionalText(formData, "x_url"),
    twitch_url: readOptionalText(formData, "twitch_url"),
    featured: readBoolean(formData, "featured"),
    role_order: readText(formData, "role_order", "Starter"),
    display_order: readNumber(formData, "display_order")
  };

  const query = id
    ? supabase.from("roster_entries").update(payload).eq("id", id)
    : supabase.from("roster_entries").insert(payload);
  const { error } = await query;

  if (error) throw new Error(error.message);
  revalidatePublic(["/roster"]);
}

export async function deleteRosterEntry(formData: FormData) {
  const supabase = await getAdminSupabase();
  const { error } = await supabase.from("roster_entries").delete().eq("id", readText(formData, "id"));

  if (error) throw new Error(error.message);
  revalidatePublic(["/roster"]);
}

export async function upsertStaffEntry(formData: FormData) {
  const supabase = await getAdminSupabase();
  const id = readText(formData, "id");
  const payload = {
    name: readText(formData, "name"),
    title: readText(formData, "title"),
    bio: readOptionalText(formData, "bio"),
    x_url: readOptionalText(formData, "x_url"),
    section: readText(formData, "section", "General Staff"),
    leadership: readBoolean(formData, "leadership"),
    image_url: readOptionalText(formData, "image_url"),
    display_order: readNumber(formData, "display_order")
  };

  const query = id
    ? supabase.from("staff_entries").update(payload).eq("id", id)
    : supabase.from("staff_entries").insert(payload);
  const { error } = await query;

  if (error) throw new Error(error.message);
  revalidatePublic(["/staff"]);
}

export async function deleteStaffEntry(formData: FormData) {
  const supabase = await getAdminSupabase();
  const { error } = await supabase.from("staff_entries").delete().eq("id", readText(formData, "id"));

  if (error) throw new Error(error.message);
  revalidatePublic(["/staff"]);
}

export async function upsertPartnerEntry(formData: FormData) {
  const supabase = await getAdminSupabase();
  const id = readText(formData, "id");
  const payload = {
    name: readOptionalText(formData, "name"),
    tier: readOptionalText(formData, "tier"),
    description: readOptionalText(formData, "description"),
    logo_url: readOptionalText(formData, "logo_url"),
    url: readOptionalText(formData, "url"),
    is_open_slot: readBoolean(formData, "is_open_slot"),
    display_order: readNumber(formData, "display_order")
  };

  const query = id
    ? supabase.from("partner_entries").update(payload).eq("id", id)
    : supabase.from("partner_entries").insert(payload);
  const { error } = await query;

  if (error) throw new Error(error.message);
  revalidatePublic(["/partners"]);
}

export async function deletePartnerEntry(formData: FormData) {
  const supabase = await getAdminSupabase();
  const { error } = await supabase.from("partner_entries").delete().eq("id", readText(formData, "id"));

  if (error) throw new Error(error.message);
  revalidatePublic(["/partners"]);
}

export async function updateInquiryStatus(formData: FormData) {
  const supabase = await getAdminSupabase();
  const { error } = await supabase
    .from("contact_inquiries")
    .update({ status: readText(formData, "status", "new") })
    .eq("id", readText(formData, "id"));

  if (error) throw new Error(error.message);
  revalidatePublic(["/dashboard"]);
}

export async function updateMaintenanceSetting(formData: FormData) {
  const supabase = await getAdminSupabase();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: "maintenance", value: { enabled: readBoolean(formData, "enabled") } });

  if (error) throw new Error(error.message);
  revalidatePublic(["/dashboard", "/"]);
}
