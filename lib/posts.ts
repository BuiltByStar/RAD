import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

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
  content: React.ReactNode;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

async function readPostFile(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  return fs.readFile(fullPath, "utf8");
}

export async function getPostSlugs() {
  const files = await fs.readdir(postsDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getPostMeta() {
  const slugs = await getPostSlugs();
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

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getFeaturedPost() {
  const posts = await getPostMeta();
  return posts.find((post) => post.featured) ?? posts[0];
}

export async function getPostBySlug(slug: string): Promise<Post> {
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
