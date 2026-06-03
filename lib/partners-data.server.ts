import { hasSupabaseBrowserEnv } from "./env";
import { readLocalDashboardData } from "./local-admin-store";
import { partners as fallbackPartners, type Partner } from "./site-data";
import { createSupabaseServerClient } from "./supabase/server";

type PartnerRow = {
  id: string;
  display_order: number;
  name: string | null;
  tier: string | null;
  description: string | null;
  logo_url: string | null;
  url: string | null;
  is_open_slot: boolean;
};

export type PartnerDisplay = Partner & {
  id: string;
  displayOrder: number;
};

function mapPartnerRow(row: PartnerRow): PartnerDisplay {
  return {
    id: row.id,
    displayOrder: row.display_order,
    name: row.name?.trim() || "Partner",
    tier: row.tier?.trim() || "Partner",
    href: row.url?.trim() || "/contact",
    description: row.description?.trim() || undefined,
    logo: row.logo_url?.trim() || undefined,
    isOpenSlot: row.is_open_slot
  };
}

function mapFallbackPartner(partner: Partner, index: number): PartnerDisplay {
  return {
    ...partner,
    id: `fallback-${index}`,
    displayOrder: index
  };
}

function sortPartners(items: PartnerDisplay[]) {
  return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
}

async function getSupabasePartners() {
  if (!hasSupabaseBrowserEnv()) return [];

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("partner_entries")
      .select("id, display_order, name, tier, description, logo_url, url, is_open_slot")
      .order("display_order", { ascending: true });

    if (error) return [];
    return ((data ?? []) as PartnerRow[]).map(mapPartnerRow);
  } catch {
    return [];
  }
}

export async function getManagedPartnersState(): Promise<{
  partners: PartnerDisplay[];
  usingDashboardPartners: boolean;
}> {
  if (process.env.LOCAL_ADMIN_BYPASS === "1") {
    const data = await readLocalDashboardData();
    if (!data.partner_entries.length) {
      return {
        partners: sortPartners(fallbackPartners.map(mapFallbackPartner)),
        usingDashboardPartners: false
      };
    }

    const partners = sortPartners(
      [...data.partner_entries]
        .sort((a, b) => a.display_order - b.display_order)
        .map(mapPartnerRow)
    );

    return { partners, usingDashboardPartners: true };
  }

  const remotePartners = await getSupabasePartners();
  if (remotePartners.length > 0) {
    return { partners: sortPartners(remotePartners), usingDashboardPartners: true };
  }

  return {
    partners: sortPartners(fallbackPartners.map(mapFallbackPartner)),
    usingDashboardPartners: false
  };
}
