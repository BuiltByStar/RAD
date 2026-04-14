import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
}): Promise<Metadata> {
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
      <main className="rad-subpage rad-subpage--content">
        <section className="rad-article-hero">
          <div className="container">
            <div className="rad-article-hero__panel" data-reveal="true">
              <div className="rad-article-hero__copy">
                <p className="rad-subpage-eyebrow">{post.category}</p>
                <h1 className="rad-subpage-title">{post.title}</h1>
                <p className="rad-subpage-description">{post.summary}</p>
                <div className="rad-article-hero__meta">
                  <span className="rad-subpage-status">{post.date}</span>
                  <Link href="/content" className="rad-subpage-link">
                    Back to content
                  </Link>
                </div>
              </div>

              <div className="rad-article-hero__media">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 44vw"
                  className="rad-article-hero__image"
                />
                <div className="rad-subpage-hero__wash" />
              </div>
            </div>
          </div>
        </section>

        <section className="rad-subpage-section">
          <div className="container">
            <article className="rad-article-body" data-reveal="true" data-delay="1">
              <div className="mdx-body">{post.content}</div>
            </article>
          </div>
        </section>
      </main>
    );
  } catch {
    notFound();
  }
}
