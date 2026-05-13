import { fallbackContent, type ContentItem } from "./content-data";
import { hasSupabaseBrowserEnv } from "./env";
import { readLocalDashboardData } from "./local-admin-store";
import { createSupabaseServerClient } from "./supabase/server";

type ContentItemRow = {
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

function mapContentItem(row: ContentItemRow): ContentItem {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    url: row.url,
    thumbnail: row.thumbnail,
    type: row.type,
    tags: row.tags,
    featured: row.featured
  };
}

async function getSupabaseContentItems() {
  if (!hasSupabaseBrowserEnv()) return [];

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("content_items")
      .select("id, title, description, url, thumbnail, type, tags, featured, display_order")
      .order("display_order", { ascending: true });

    if (error) return [];
    return ((data ?? []) as ContentItemRow[]).map(mapContentItem);
  } catch {
    return [];
  }
}

export async function getManagedContentItemsState(): Promise<{
  items: ContentItem[];
  usingDashboardItems: boolean;
}> {
  if (process.env.LOCAL_ADMIN_BYPASS === "1") {
    const data = await readLocalDashboardData();
    if (!data.content_items.length) {
      return { items: fallbackContent, usingDashboardItems: false };
    }

    const items = [...data.content_items]
      .sort((a, b) => {
        if (a.display_order !== b.display_order) return a.display_order - b.display_order;
        return a.title.localeCompare(b.title);
      })
      .map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description ?? undefined,
        url: item.url,
        thumbnail: item.thumbnail,
        type: item.type,
        tags: item.tags,
        featured: item.featured
      }));

    return { items, usingDashboardItems: true };
  }

  const remoteItems = await getSupabaseContentItems();
  if (remoteItems.length > 0) {
    return { items: remoteItems, usingDashboardItems: true };
  }

  return { items: fallbackContent, usingDashboardItems: false };
}

export async function getManagedContentItems(): Promise<ContentItem[]> {
  return (await getManagedContentItemsState()).items;
}
