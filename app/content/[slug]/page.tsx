import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container, Section } from "@/components/ui";
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
      <main className="relative isolate">
        <section className="relative overflow-hidden pb-10 pt-6 sm:pb-16 sm:pt-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1100px_520px_at_80%_-10%,rgb(255_43_69_/_0.18),transparent_60%),radial-gradient(900px_400px_at_0%_120%,rgb(255_43_69_/_0.10),transparent_60%)]"
          />
          <Container size="xl">
            <div className="relative grid gap-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_80px_-54px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:p-10">
              <div className="relative z-10 flex flex-col justify-between gap-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-rad-hi)]">
                  {post.category}
                </p>
                <div>
                  <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5.5vw,4.6rem)] uppercase leading-[0.95] tracking-normal text-white [text-wrap:balance]">
                    {post.title}
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                    {post.summary}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                    {post.date}
                  </span>
                  <Link
                    href="/content"
                    className="inline-flex items-center gap-1.5 text-[color:var(--color-rad-hi)] transition-colors hover:text-white"
                  >
                    <span aria-hidden>←</span> Back to content
                  </Link>
                </div>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.55rem] border border-white/10 bg-black sm:aspect-[5/6] lg:aspect-[4/5]">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 44vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                />
              </div>
            </div>
          </Container>
        </section>

        <Section padding="sm">
          <Container size="md">
            <article className="mdx-body text-white/80">{post.content}</article>
          </Container>
        </Section>
      </main>
    );
  } catch {
    notFound();
  }
}
