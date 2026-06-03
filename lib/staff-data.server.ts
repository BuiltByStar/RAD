import { hasSupabaseBrowserEnv } from "./env";
import { readLocalDashboardData } from "./local-admin-store";
import { staff as fallbackStaff, type Person } from "./site-data";
import { createSupabaseServerClient } from "./supabase/server";

type StaffRow = {
  id: string;
  display_order: number;
  name: string;
  title: string;
  bio: string | null;
  x_url: string | null;
  section: string;
  leadership: boolean;
  image_url: string | null;
  slug: string | null;
  descriptor: string | null;
  tags: string[] | null;
  group_name: string | null;
};

export type StaffMember = Person & {
  id: string;
  displayOrder: number;
};

function mapStaffRow(row: StaffRow): StaffMember {
  return {
    id: row.id,
    displayOrder: row.display_order,
    name: row.name,
    slug: row.slug?.trim() || row.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    role: row.title,
    group: row.group_name?.trim() || row.section,
    descriptor: row.descriptor?.trim() || row.title,
    bio: row.bio?.trim() || undefined,
    image: row.image_url?.trim() || undefined,
    tags: row.tags?.length ? row.tags : undefined,
    socials: row.x_url ? [{ label: "X", href: row.x_url }] : undefined,
    featured: row.leadership
  };
}

function mapFallbackStaff(member: Person, index: number): StaffMember {
  return { ...member, id: `fallback-${index}`, displayOrder: index };
}

function sortStaff(items: StaffMember[]) {
  return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
}

async function getSupabaseStaff() {
  if (!hasSupabaseBrowserEnv()) return [];

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("staff_entries").select("*").order("display_order", { ascending: true });

    if (error) return [];
    return ((data ?? []) as StaffRow[]).map(mapStaffRow);
  } catch {
    return [];
  }
}

export async function getManagedStaffState(): Promise<{
  staff: StaffMember[];
  usingDashboardStaff: boolean;
}> {
  if (process.env.LOCAL_ADMIN_BYPASS === "1") {
    const data = await readLocalDashboardData();
    if (!data.staff_entries.length) {
      return {
        staff: sortStaff(fallbackStaff.map(mapFallbackStaff)),
        usingDashboardStaff: false
      };
    }

    return {
      staff: sortStaff(
        [...data.staff_entries]
          .sort((a, b) => a.display_order - b.display_order)
          .map((row) => mapStaffRow(row as StaffRow))
      ),
      usingDashboardStaff: true
    };
  }

  const remote = await getSupabaseStaff();
  if (remote.length > 0) {
    return { staff: sortStaff(remote), usingDashboardStaff: true };
  }

  return {
    staff: sortStaff(fallbackStaff.map(mapFallbackStaff)),
    usingDashboardStaff: false
  };
}
