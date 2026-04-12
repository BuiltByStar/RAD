import { notFound } from "next/navigation";

import { getPostBySlug, getPostMeta, getPostSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getPostMeta();
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary
  };
}

export default async function PostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);

    return (
      <main className="page-main">
        <article className="post-page">
          <div className="post-hero">
            <img src={post.cover} alt={post.title} />
            <div className="post-hero-overlay" />
            <div className="container post-hero-copy">
              <p className="eyebrow">{post.category}</p>
              <h1>{post.title}</h1>
              <p className="section-copy">{post.summary}</p>
              <span className="post-date">{post.date}</span>
            </div>
          </div>
          <div className="container post-body">
            <div className="mdx-body">{post.content}</div>
          </div>
        </article>
      </main>
    );
  } catch {
    notFound();
  }
}
