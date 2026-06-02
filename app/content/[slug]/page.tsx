import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { PageRail, PageRailSection } from "@/components/ui";
import { getPostBySlug, getPostMeta, getPostSlugs } from "@/lib/posts";

export const dynamic = "force-dynamic";

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
      <PageShell
        variant="content"
        eyebrow={post.category}
        title={post.title}
        description={post.summary}
        heroImage={post.cover}
        status={post.date}
        route={`/content/${slug}`}
        hideHero
      >
        <PageRail className="pb-14 sm:pb-16">
          <PageRailSection className="border-b border-neutral-900 pt-10">
            <Link
              href="/content"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-blood)] transition-colors hover:text-white"
            >
              <span aria-hidden>←</span> Back to content
            </Link>

            <div className="mt-8 grid gap-px border border-neutral-900 bg-neutral-900 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="bg-black p-5 sm:p-8 lg:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--color-blood)]">
                  {post.category}
                </p>
                <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.4rem)] font-extrabold uppercase leading-[0.95] text-white [text-wrap:balance]">
                  {post.title}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-500 sm:text-lg">
                  {post.summary}
                </p>
                <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                  {post.date}
                </p>
              </div>

              <div className="relative min-h-[320px] bg-black sm:min-h-[380px] lg:min-h-full">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                />
              </div>
            </div>
          </PageRailSection>

          <PageRailSection>
            <article className="mdx-body mx-auto max-w-3xl text-neutral-400">{post.content}</article>
          </PageRailSection>
        </PageRail>
      </PageShell>
    );
  } catch {
    notFound();
  }
}
