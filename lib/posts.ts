import fs from "node:fs/promises";
import path from "node:path";
import { cache, type ReactNode } from "react";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { hasSupabaseBrowserEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type PostMeta = {
  title: string;
  slug: string;
  date: string;
  summary: string;
  category: string;
  cover: string;
  featured?: boolean;
};

export type Post = PostMeta & {
  content: ReactNode;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");
const REMOTE_POST_TIMEOUT_MS = 1200;

type NewsPostRow = {
  title: string;
  slug: string;
  date: string;
  summary: string;
  category: string;
  cover: string;
  body: string;
  featured: boolean;
  display_order: number;
};

async function readPostFile(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  return fs.readFile(fullPath, "utf8");
}

const getLocalPostSlugs = cache(async function getLocalPostSlugs() {
  const files = await fs.readdir(postsDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
});

export async function getPostSlugs() {
  const localSlugs = await getLocalPostSlugs();

  const remotePosts = await getSupabasePostMeta();
  const remoteSlugs = remotePosts?.map((post) => post.slug) ?? [];

  return Array.from(new Set([...localSlugs, ...remoteSlugs]));
}

const getLocalPostMeta = cache(async function getLocalPostMeta() {
  const slugs = await getLocalPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const source = await readPostFile(slug);
      const { data } = matter(source);
      return {
        title: data.title as string,
        slug,
        date: data.date as string,
        summary: data.summary as string,
        category: data.category as string,
        cover: data.cover as string,
        featured: Boolean(data.featured)
      } satisfies PostMeta;
    })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

function mapNewsPost(row: NewsPostRow): PostMeta {
  return {
    title: row.title,
    slug: row.slug,
    date: row.date,
    summary: row.summary,
    category: row.category,
    cover: row.cover,
    featured: row.featured
  };
}

async function withTimeout<T>(promise: Promise<T>, fallback: T, timeoutMs = REMOTE_POST_TIMEOUT_MS) {
  let timeoutId: NodeJS.Timeout | null = null;

  try {
    return await Promise.race([
      promise,
      new Promise<T>((resolve) => {
        timeoutId = setTimeout(() => resolve(fallback), timeoutMs);
      })
    ]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

const getSupabasePostRows = cache(async function getSupabasePostRows() {
  if (!hasSupabaseBrowserEnv()) return null;

  try {
    const result = await withTimeout(
      (async () => {
        const supabase = await createSupabaseServerClient();
        const { data, error } = await supabase
          .from("news_posts")
          .select("title, slug, date, summary, category, cover, body, featured, display_order")
          .eq("published", true)
          .order("display_order", { ascending: true })
          .order("date", { ascending: false });

        if (error) return null;
        return (data ?? []) as NewsPostRow[];
      })(),
      null
    );

    return result;
  } catch {
    return null;
  }
});

async function getSupabasePostMeta() {
  const rows = await getSupabasePostRows();
  if (!rows?.length) return null;
  return rows.map(mapNewsPost);
}

export async function getPostMeta() {
  const remotePosts = await getSupabasePostMeta();
  if (remotePosts?.length) return remotePosts;

  return getLocalPostMeta();
}

export async function getFeaturedPost() {
  const posts = await getPostMeta();
  return posts.find((post) => post.featured) ?? posts[0];
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const rows = await getSupabasePostRows();
  const remotePost = rows?.find((row) => row.slug === slug);

  if (remotePost) {
    const compiled = await compileMDX({
      source: remotePost.body,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm]
        },
        parseFrontmatter: false
      }
    });

    return {
      ...mapNewsPost(remotePost),
      content: compiled.content
    };
  }

  const source = await readPostFile(slug);
  const { content, data } = matter(source);
  const compiled = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm]
      },
      parseFrontmatter: false
    }
  });

  return {
    title: data.title as string,
    slug,
    date: data.date as string,
    summary: data.summary as string,
    category: data.category as string,
    cover: data.cover as string,
    featured: Boolean(data.featured),
    content: compiled.content
  };
}
