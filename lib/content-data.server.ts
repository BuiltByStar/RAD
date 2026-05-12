import { fallbackContent, type ContentItem } from "./content-data";
import { readLocalDashboardData } from "./local-admin-store";

export async function getManagedContentItemsState(): Promise<{
  items: ContentItem[];
  usingDashboardItems: boolean;
}> {
  if (process.env.LOCAL_ADMIN_BYPASS !== "1") {
    return { items: fallbackContent, usingDashboardItems: false };
  }

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

export async function getManagedContentItems(): Promise<ContentItem[]> {
  return (await getManagedContentItemsState()).items;
}
