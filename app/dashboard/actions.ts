"use server";

import { revalidatePath } from "next/cache";

import { requireAdminAccess } from "@/lib/admin";
import { resolveAdminImageUpload } from "@/lib/admin-media";
import {
  buildPartnerSeedRows,
  buildRosterSeedRows,
  buildStaffSeedRows,
  slugifyHandle
} from "@/lib/dashboard-seed";
import {
  createLocalId,
  readLocalDashboardData,
  writeLocalDashboardData,
  writeLocalSupabaseExport
} from "@/lib/local-admin-store";
import { getPostMeta } from "@/lib/posts";
import { fallbackContent } from "@/lib/content-data";
import { partners, players, staff } from "@/lib/site-data";

import type { ActionResult } from "./action-types";

function readText(formData: FormData, key: string, fallback = "") {
  const value = formData.get(key);
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

function readOptionalText(formData: FormData, key: string) {
  const value = readText(formData, key);
  return value.length ? value : null;
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
  return slugifyHandle(value);
}

function readCommaList(formData: FormData, key: string) {
  return readText(formData, key)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function readOptionalNumber(formData: FormData, key: string) {
  const raw = readText(formData, key);
  if (!raw.length) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

function errorMessage(err: unknown, fallback: string) {
  if (err instanceof Error && err.message) return err.message;
  if (typeof err === "string" && err.length > 0) return err;
  return fallback;
}

type OrderedRow = { id: string; display_order: number };

function swapOrderedRows<T extends OrderedRow>(rows: T[], id: string, direction: "up" | "down") {
  const sorted = [...rows].sort((a, b) => a.display_order - b.display_order);
  const index = sorted.findIndex((row) => row.id === id);
  if (index < 0) return rows;

  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= sorted.length) return rows;

  const current = sorted[index];
  const neighbor = sorted[targetIndex];

  return rows.map((row) => {
    if (row.id === current.id) return { ...row, display_order: neighbor.display_order };
    if (row.id === neighbor.id) return { ...row, display_order: current.display_order };
    return row;
  });
}

async function persistOrderUpdates(
  supabase: NonNullable<Awaited<ReturnType<typeof getAdminSupabase>>>,
  table: "roster_entries" | "staff_entries" | "partner_entries",
  rows: OrderedRow[]
) {
  const updates = await Promise.all(
    rows.map((row) => supabase.from(table).update({ display_order: row.display_order }).eq("id", row.id))
  );

  const error = updates.find((result) => result.error)?.error;
  if (error) throw new Error(error.message);
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

function buildRosterPayload(formData: FormData, imageUrl: string | null | undefined, displayOrder: number) {
  const handle = readText(formData, "handle");
  return {
    handle,
    slug: slugify(readText(formData, "slug", handle)),
    real_name: readOptionalText(formData, "real_name"),
    player_role: readText(formData, "player_role", "Player"),
    roster_header: readText(formData, "roster_header", "Marvel Rivals"),
    region: readOptionalText(formData, "region"),
    descriptor: readOptionalText(formData, "descriptor"),
    bio: readOptionalText(formData, "bio"),
    image_url: imageUrl ?? readOptionalText(formData, "image_url"),
    x_url: readOptionalText(formData, "x_url"),
    twitch_url: readOptionalText(formData, "twitch_url"),
    instagram_url: readOptionalText(formData, "instagram_url"),
    youtube_url: readOptionalText(formData, "youtube_url"),
    discord_url: readOptionalText(formData, "discord_url"),
    tiktok_url: readOptionalText(formData, "tiktok_url"),
    featured: readBoolean(formData, "featured"),
    role_order: readText(formData, "role_order", "Starter"),
    specialties: readCommaList(formData, "specialties"),
    tags: readCommaList(formData, "tags"),
    rank: readOptionalText(formData, "rank"),
    jersey_number: readOptionalNumber(formData, "jersey_number"),
    display_order: displayOrder
  };
}

const ROSTER_PUBLIC_PATHS = ["/roster", "/"];

export async function upsertRosterEntry(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await getAdminSupabase();
    const id = readText(formData, "id");
    const isUpdate = Boolean(id);
    const uploadedImage = readFile(formData, "image_file");
    const uploadedUrl = uploadedImage ? await resolveAdminImageUpload(uploadedImage, "roster", supabase) : null;

    let resultId = id;
    let label = "";

    if (!supabase) {
      const data = await readLocalDashboardData();
      const nextOrder = data.roster_entries.length
        ? Math.max(...data.roster_entries.map((entry) => entry.display_order)) + 1
        : 0;
      const existing = id ? data.roster_entries.find((entry) => entry.id === id) : null;
      const payload = buildRosterPayload(formData, uploadedUrl, existing?.display_order ?? nextOrder);
      if (id) {
        data.roster_entries = data.roster_entries.map((entry) =>
          entry.id === id ? { ...entry, ...payload } : entry
        );
      } else {
        const newId = createLocalId();
        data.roster_entries = [{ id: newId, ...payload }, ...data.roster_entries];
        resultId = newId;
      }
      await writeLocalDashboardData(data);
      label = payload.handle;
    } else {
      const { data: existingRows } = id
        ? await supabase.from("roster_entries").select("display_order").eq("id", id).maybeSingle()
        : { data: null };
      const { data: maxRow } = await supabase
        .from("roster_entries")
        .select("display_order")
        .order("display_order", { ascending: false })
        .limit(1)
        .maybeSingle();
      const nextOrder = (maxRow?.display_order ?? -1) + 1;
      const payload = buildRosterPayload(
        formData,
        uploadedUrl,
        existingRows?.display_order ?? nextOrder
      );

      if (id) {
        const { error } = await supabase.from("roster_entries").update(payload).eq("id", id);
        if (error) throw new Error(error.message);
      } else {
        const { data: inserted, error } = await supabase
          .from("roster_entries")
          .insert(payload)
          .select("id")
          .maybeSingle();
        if (error) throw new Error(error.message);
        resultId = inserted?.id ?? "";
      }
      label = payload.handle;
    }

    revalidatePublic(ROSTER_PUBLIC_PATHS);
    return {
      ok: true,
      id: resultId,
      label,
      message: isUpdate
        ? label
          ? `Player updated — ${label}`
          : "Player updated"
        : label
          ? `Player added — ${label}`
          : "Player added"
    };
  } catch (err) {
    return { ok: false, message: errorMessage(err, "Could not save player.") };
  }
}

export async function reorderRosterEntry(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await getAdminSupabase();
    const id = readText(formData, "id");
    const direction = readText(formData, "direction") === "down" ? "down" : "up";

    if (!supabase) {
      const data = await readLocalDashboardData();
      data.roster_entries = swapOrderedRows(data.roster_entries, id, direction);
      await writeLocalDashboardData(data);
    } else {
      const { data: rows, error } = await supabase.from("roster_entries").select("id, display_order");
      if (error) throw new Error(error.message);
      const updated = swapOrderedRows((rows ?? []) as OrderedRow[], id, direction);
      await persistOrderUpdates(supabase, "roster_entries", updated);
    }

    revalidatePublic(ROSTER_PUBLIC_PATHS);
    return {
      ok: true,
      id,
      message: direction === "up" ? "Moved up" : "Moved down"
    };
  } catch (err) {
    return { ok: false, message: errorMessage(err, "Could not reorder player.") };
  }
}

export async function deleteRosterEntry(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await getAdminSupabase();
    const id = readText(formData, "id");

    if (!supabase) {
      const data = await readLocalDashboardData();
      data.roster_entries = data.roster_entries.filter((entry) => entry.id !== id);
      await writeLocalDashboardData(data);
    } else {
      const { error } = await supabase.from("roster_entries").delete().eq("id", id);
      if (error) throw new Error(error.message);
    }

    revalidatePublic(ROSTER_PUBLIC_PATHS);
    return { ok: true, id, message: "Player removed" };
  } catch (err) {
    return { ok: false, message: errorMessage(err, "Could not remove player.") };
  }
}

function buildStaffPayload(formData: FormData, imageUrl: string | null | undefined, displayOrder: number) {
  const name = readText(formData, "name");
  return {
    name,
    slug: slugify(readText(formData, "slug", name)),
    title: readText(formData, "title"),
    descriptor: readOptionalText(formData, "descriptor"),
    bio: readOptionalText(formData, "bio"),
    x_url: readOptionalText(formData, "x_url"),
    section: readText(formData, "section", "General Staff"),
    group_name: readOptionalText(formData, "group_name"),
    leadership: readBoolean(formData, "leadership"),
    image_url: imageUrl ?? readOptionalText(formData, "image_url"),
    tags: readCommaList(formData, "tags"),
    display_order: displayOrder
  };
}

export async function upsertStaffEntry(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await getAdminSupabase();
    const id = readText(formData, "id");
    const isUpdate = Boolean(id);
    const uploadedImage = readFile(formData, "image_file");
    const uploadedUrl = uploadedImage ? await resolveAdminImageUpload(uploadedImage, "staff", supabase) : null;

    let resultId = id;
    let label = "";

    if (!supabase) {
      const data = await readLocalDashboardData();
      const nextOrder = data.staff_entries.length
        ? Math.max(...data.staff_entries.map((entry) => entry.display_order)) + 1
        : 0;
      const existing = id ? data.staff_entries.find((entry) => entry.id === id) : null;
      const payload = buildStaffPayload(formData, uploadedUrl, existing?.display_order ?? nextOrder);
      if (id) {
        data.staff_entries = data.staff_entries.map((entry) =>
          entry.id === id ? { ...entry, ...payload } : entry
        );
      } else {
        const newId = createLocalId();
        data.staff_entries = [{ id: newId, ...payload }, ...data.staff_entries];
        resultId = newId;
      }
      await writeLocalDashboardData(data);
      label = payload.name;
    } else {
      const { data: existingRows } = id
        ? await supabase.from("staff_entries").select("display_order").eq("id", id).maybeSingle()
        : { data: null };
      const { data: maxRow } = await supabase
        .from("staff_entries")
        .select("display_order")
        .order("display_order", { ascending: false })
        .limit(1)
        .maybeSingle();
      const nextOrder = (maxRow?.display_order ?? -1) + 1;
      const payload = buildStaffPayload(formData, uploadedUrl, existingRows?.display_order ?? nextOrder);

      if (id) {
        const { error } = await supabase.from("staff_entries").update(payload).eq("id", id);
        if (error) throw new Error(error.message);
      } else {
        const { data: inserted, error } = await supabase
          .from("staff_entries")
          .insert(payload)
          .select("id")
          .maybeSingle();
        if (error) throw new Error(error.message);
        resultId = inserted?.id ?? "";
      }
      label = payload.name;
    }

    revalidatePublic(["/staff"]);
    return {
      ok: true,
      id: resultId,
      label,
      message: isUpdate
        ? label
          ? `Staff member updated — ${label}`
          : "Staff member updated"
        : label
          ? `Staff member added — ${label}`
          : "Staff member added"
    };
  } catch (err) {
    return { ok: false, message: errorMessage(err, "Could not save staff member.") };
  }
}

export async function reorderStaffEntry(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await getAdminSupabase();
    const id = readText(formData, "id");
    const direction = readText(formData, "direction") === "down" ? "down" : "up";

    if (!supabase) {
      const data = await readLocalDashboardData();
      data.staff_entries = swapOrderedRows(data.staff_entries, id, direction);
      await writeLocalDashboardData(data);
    } else {
      const { data: rows, error } = await supabase.from("staff_entries").select("id, display_order");
      if (error) throw new Error(error.message);
      const updated = swapOrderedRows((rows ?? []) as OrderedRow[], id, direction);
      await persistOrderUpdates(supabase, "staff_entries", updated);
    }

    revalidatePublic(["/staff"]);
    return {
      ok: true,
      id,
      message: direction === "up" ? "Moved up" : "Moved down"
    };
  } catch (err) {
    return { ok: false, message: errorMessage(err, "Could not reorder staff member.") };
  }
}

export async function deleteStaffEntry(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await getAdminSupabase();
    const id = readText(formData, "id");

    if (!supabase) {
      const data = await readLocalDashboardData();
      data.staff_entries = data.staff_entries.filter((entry) => entry.id !== id);
      await writeLocalDashboardData(data);
    } else {
      const { error } = await supabase.from("staff_entries").delete().eq("id", id);
      if (error) throw new Error(error.message);
    }

    revalidatePublic(["/staff"]);
    return { ok: true, id, message: "Staff member removed" };
  } catch (err) {
    return { ok: false, message: errorMessage(err, "Could not remove staff member.") };
  }
}

function buildPartnerPayload(formData: FormData, logoUrl: string | null | undefined, displayOrder: number) {
  return {
    name: readOptionalText(formData, "name"),
    tier: readOptionalText(formData, "tier"),
    description: readOptionalText(formData, "description"),
    logo_url: logoUrl ?? readOptionalText(formData, "logo_url"),
    url: readOptionalText(formData, "url"),
    is_open_slot: readBoolean(formData, "is_open_slot"),
    display_order: displayOrder
  };
}

export async function upsertPartnerEntry(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await getAdminSupabase();
    const id = readText(formData, "id");
    const isUpdate = Boolean(id);
    const uploadedLogo = readFile(formData, "logo_file");
    const uploadedUrl = uploadedLogo ? await resolveAdminImageUpload(uploadedLogo, "partners", supabase) : null;

    let resultId = id;
    let label = "";

    if (!supabase) {
      const data = await readLocalDashboardData();
      const nextOrder = data.partner_entries.length
        ? Math.max(...data.partner_entries.map((entry) => entry.display_order)) + 1
        : 0;
      const existing = id ? data.partner_entries.find((entry) => entry.id === id) : null;
      const payload = buildPartnerPayload(formData, uploadedUrl, existing?.display_order ?? nextOrder);
      if (id) {
        data.partner_entries = data.partner_entries.map((entry) =>
          entry.id === id ? { ...entry, ...payload } : entry
        );
      } else {
        const newId = createLocalId();
        data.partner_entries = [{ id: newId, ...payload }, ...data.partner_entries];
        resultId = newId;
      }
      await writeLocalDashboardData(data);
      label = payload.name ?? "";
    } else {
      const { data: existingRows } = id
        ? await supabase.from("partner_entries").select("display_order").eq("id", id).maybeSingle()
        : { data: null };
      const { data: maxRow } = await supabase
        .from("partner_entries")
        .select("display_order")
        .order("display_order", { ascending: false })
        .limit(1)
        .maybeSingle();
      const nextOrder = (maxRow?.display_order ?? -1) + 1;
      const payload = buildPartnerPayload(formData, uploadedUrl, existingRows?.display_order ?? nextOrder);

      if (id) {
        const { error } = await supabase.from("partner_entries").update(payload).eq("id", id);
        if (error) throw new Error(error.message);
      } else {
        const { data: inserted, error } = await supabase
          .from("partner_entries")
          .insert(payload)
          .select("id")
          .maybeSingle();
        if (error) throw new Error(error.message);
        resultId = inserted?.id ?? "";
      }
      label = payload.name ?? "";
    }

    revalidatePublic(["/partners"]);
    return {
      ok: true,
      id: resultId,
      label,
      message: isUpdate
        ? label
          ? `Partner slot updated — ${label}`
          : "Partner slot updated"
        : label
          ? `Partner slot added — ${label}`
          : "Partner slot added"
    };
  } catch (err) {
    return { ok: false, message: errorMessage(err, "Could not save partner slot.") };
  }
}

export async function reorderPartnerEntry(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await getAdminSupabase();
    const id = readText(formData, "id");
    const direction = readText(formData, "direction") === "down" ? "down" : "up";

    if (!supabase) {
      const data = await readLocalDashboardData();
      data.partner_entries = swapOrderedRows(data.partner_entries, id, direction);
      await writeLocalDashboardData(data);
    } else {
      const { data: rows, error } = await supabase.from("partner_entries").select("id, display_order");
      if (error) throw new Error(error.message);
      const updated = swapOrderedRows((rows ?? []) as OrderedRow[], id, direction);
      await persistOrderUpdates(supabase, "partner_entries", updated);
    }

    revalidatePublic(["/partners"]);
    return {
      ok: true,
      id,
      message: direction === "up" ? "Moved up" : "Moved down"
    };
  } catch (err) {
    return { ok: false, message: errorMessage(err, "Could not reorder partner slot.") };
  }
}

export async function deletePartnerEntry(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await getAdminSupabase();
    const id = readText(formData, "id");

    if (!supabase) {
      const data = await readLocalDashboardData();
      data.partner_entries = data.partner_entries.filter((entry) => entry.id !== id);
      await writeLocalDashboardData(data);
    } else {
      const { error } = await supabase.from("partner_entries").delete().eq("id", id);
      if (error) throw new Error(error.message);
    }

    revalidatePublic(["/partners"]);
    return { ok: true, id, message: "Partner slot removed" };
  } catch (err) {
    return { ok: false, message: errorMessage(err, "Could not remove partner slot.") };
  }
}

export async function updateInquiryStatus(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await getAdminSupabase();
    const id = readText(formData, "id");
    const status = readText(formData, "status", "new");

    if (!supabase) {
      const data = await readLocalDashboardData();
      data.contact_inquiries = data.contact_inquiries.map((entry) =>
        entry.id === id ? { ...entry, status } : entry
      );
      await writeLocalDashboardData(data);
    } else {
      const { error } = await supabase
        .from("contact_inquiries")
        .update({ status })
        .eq("id", id);
      if (error) throw new Error(error.message);
    }

    revalidatePublic(["/dashboard"]);
    return { ok: true, id, message: `Inquiry marked ${status}` };
  } catch (err) {
    return { ok: false, message: errorMessage(err, "Could not update inquiry.") };
  }
}

export async function updateMaintenanceSetting(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await getAdminSupabase();
    const enabled = readBoolean(formData, "enabled");

    if (!supabase) {
      const data = await readLocalDashboardData();
      const existing = data.site_settings.find((setting) => setting.key === "maintenance");
      if (existing) {
        existing.value = { enabled };
      } else {
        data.site_settings.push({ key: "maintenance", value: { enabled } });
      }
      await writeLocalDashboardData(data);
    } else {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key: "maintenance", value: { enabled } });
      if (error) throw new Error(error.message);
    }

    revalidatePublic(["/dashboard", "/"]);
    return {
      ok: true,
      message: enabled ? "Maintenance mode enabled" : "Maintenance mode disabled"
    };
  } catch (err) {
    return { ok: false, message: errorMessage(err, "Could not update settings.") };
  }
}

export async function seedDashboardFromSite(formData?: FormData): Promise<ActionResult> {
  try {
    const force = formData ? readBoolean(formData, "force") : false;
    const supabase = await getAdminSupabase();
    const posts = await getPostMeta();
    const rosterSeed = buildRosterSeedRows(players);
    const staffSeed = buildStaffSeedRows(staff);
    const partnerSeed = buildPartnerSeedRows(partners);

    if (!supabase) {
      const existing = await readLocalDashboardData();
      const data = {
        ...existing,
        news_posts:
          force || !existing.news_posts.length
            ? posts.map((post, index) => ({
                id: createLocalId(),
                title: post.title,
                slug: post.slug,
                date: post.date,
                summary: post.summary,
                category: post.category,
                cover: post.cover,
                body: `${post.summary}\n\nSeeded from site content.`,
                featured: Boolean(post.featured),
                published: true,
                display_order: index
              }))
            : existing.news_posts,
        roster_entries:
          force || !existing.roster_entries.length
            ? rosterSeed.map((row) => ({ id: createLocalId(), ...row }))
            : existing.roster_entries,
        staff_entries:
          force || !existing.staff_entries.length
            ? staffSeed.map((row) => ({ id: createLocalId(), ...row }))
            : existing.staff_entries,
        partner_entries:
          force || !existing.partner_entries.length
            ? partnerSeed.map((row) => ({ id: createLocalId(), ...row }))
            : existing.partner_entries,
        content_items:
          force || !existing.content_items.length
            ? fallbackContent.map((item, index) => ({
                id: createLocalId(),
                title: item.title,
                description: item.description ?? null,
                url: item.url,
                thumbnail: item.thumbnail,
                type: item.type,
                tags: item.tags,
                featured: Boolean(item.featured),
                display_order: index
              }))
            : existing.content_items,
        contact_inquiries: existing.contact_inquiries,
        site_settings: existing.site_settings
      };

      await writeLocalDashboardData(data);
      revalidatePublic(["/dashboard", "/content", "/roster", "/staff", "/partners"]);
      return {
        ok: true,
        message: force ? "Local store reseeded from site-data" : "Imported missing rows from site-data"
      };
    }

    const [{ count: rosterCount }, { count: staffCount }, { count: partnerCount }] = await Promise.all([
      supabase.from("roster_entries").select("*", { count: "exact", head: true }),
      supabase.from("staff_entries").select("*", { count: "exact", head: true }),
      supabase.from("partner_entries").select("*", { count: "exact", head: true })
    ]);

    if (!force && (rosterCount ?? 0) > 0 && (staffCount ?? 0) > 0 && (partnerCount ?? 0) > 0) {
      throw new Error("Dashboard tables already have data. Check “Replace existing” to force a re-seed.");
    }

    if (force) {
      await Promise.all([
        supabase.from("roster_entries").delete().neq("id", "00000000-0000-0000-0000-000000000000"),
        supabase.from("staff_entries").delete().neq("id", "00000000-0000-0000-0000-000000000000"),
        supabase.from("partner_entries").delete().neq("id", "00000000-0000-0000-0000-000000000000")
      ]);
    } else {
      if ((rosterCount ?? 0) === 0) {
        const { error } = await supabase.from("roster_entries").insert(rosterSeed);
        if (error) throw new Error(error.message);
      }
      if ((staffCount ?? 0) === 0) {
        const { error } = await supabase.from("staff_entries").insert(staffSeed);
        if (error) throw new Error(error.message);
      }
      if ((partnerCount ?? 0) === 0) {
        const { error } = await supabase.from("partner_entries").insert(partnerSeed);
        if (error) throw new Error(error.message);
      }
    }

    if (force) {
      const [{ error: rosterError }, { error: staffError }, { error: partnerError }] = await Promise.all([
        supabase.from("roster_entries").insert(rosterSeed),
        supabase.from("staff_entries").insert(staffSeed),
        supabase.from("partner_entries").insert(partnerSeed)
      ]);
      if (rosterError) throw new Error(rosterError.message);
      if (staffError) throw new Error(staffError.message);
      if (partnerError) throw new Error(partnerError.message);
    }

    revalidatePublic(["/dashboard", "/content", "/roster", "/staff", "/partners"]);
    return {
      ok: true,
      message: force ? "Tables reseeded from site-data" : "Imported missing rows from site-data"
    };
  } catch (err) {
    return { ok: false, message: errorMessage(err, "Could not import site-data.") };
  }
}

/** @deprecated Use seedDashboardFromSite */
export async function seedLocalDashboardData(): Promise<ActionResult> {
  return seedDashboardFromSite();
}

export async function exportLocalDashboardData(): Promise<ActionResult> {
  try {
    if (process.env.LOCAL_ADMIN_BYPASS !== "1") {
      throw new Error("Local export is only available in local admin bypass mode.");
    }

    const data = await readLocalDashboardData();
    await writeLocalSupabaseExport(data);
    revalidatePublic(["/dashboard"]);
    return { ok: true, message: "Local snapshot exported" };
  } catch (err) {
    return { ok: false, message: errorMessage(err, "Could not export local snapshot.") };
  }
}
