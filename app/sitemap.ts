import type { MetadataRoute } from "next";

import { getPostMeta } from "@/lib/posts";
import { getPublicSiteUrl } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getPublicSiteUrl();
  const posts = await getPostMeta();

  const staticRoutes = [
    "",
    "/about",
    "/roster",
    "/staff",
    "/content",
    "/shop",
    "/partners",
    "/contact"
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date()
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/content/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date()
  }));

  return [...staticEntries, ...postEntries];
}
