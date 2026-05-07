import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { TwitchCreators } from "@/components/twitch-creators";
import { YouTubeFeatured } from "@/components/youtube-featured";
import { YouTubeLibrary } from "@/components/youtube-library";
import {
  CardEyebrow,
  Container,
  NoteStack,
  Section,
  SectionHeading
} from "@/components/ui";
import { getFeaturedPost, getPostMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Content",
  description: "RAD news, articles, video, and creator surfaces."
};

export default async function ContentPage() {
  const featured = await getFeaturedPost();
  const posts = await getPostMeta();
  // Feature and archive are presentation slices of one posts collection.
  // Future admin tooling should manage one News/Posts model with a featured flag.
  const feed = posts.filter((post) => post.slug !== featured?.slug);

  return (
    <PageShell
      variant="content"
      eyebrow="Content"
      title="Content"
      description="News, video, and creator updates in one place."
      heroImage={featured?.cover ?? "/assets/RadBannerNewTest300ppi.png"}
      status="News + media"
      note={
        <NoteStack
          items={[
            { label: "Featured Story", value: featured?.category ?? "Org Update" },
            { label: "Archive Count", value: String(posts.length) }
          ]}
        />
      }
    >
      <Section padding="sm">
        <Container>
          <SectionHeading eyebrow="Feature" title="Featured Story" />

          {featured ? (
            <Link
              href={`/content/${featured.slug}`}
              className="group relative grid overflow-hidden rounded-[1.45rem] border border-[var(--border)] bg-white shadow-[var(--shadow)] transition-colors hover:border-[color:var(--color-rad)] md:grid-cols-[1.1fr_0.9fr]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[var(--color-rad)] to-transparent"
              />
              <div className="relative aspect-[16/10] md:aspect-auto">
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 48vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-[rgba(21,31,33,0.35)] via-transparent to-transparent"
                />
              </div>
              <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
                <CardEyebrow>{featured.category}</CardEyebrow>
                <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase leading-[1.02] tracking-normal text-[var(--text)] sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">{featured.summary}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-rad-hi)] transition-colors group-hover:text-[var(--text)]">
                  Open article
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </Link>
          ) : null}
        </Container>
      </Section>

      <Section padding="sm" className="bg-[var(--bg-alt)]">
        <Container>
          <SectionHeading eyebrow="Archive" title="Latest Stories" />

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {feed.map((post) => (
              <Link
                key={post.slug}
                href={`/content/${post.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-[1.2rem] border border-[var(--border)] bg-white transition-colors hover:border-[color:var(--color-rad)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 31vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[rgba(21,31,33,0.3)] via-transparent to-transparent"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <CardEyebrow>{post.category}</CardEyebrow>
                  <h3 className="font-[family-name:var(--font-display)] text-xl uppercase leading-[1.1] tracking-normal text-[var(--text)] [text-wrap:balance]">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">{post.summary}</p>
                  <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--dim)]">
                    {post.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section padding="sm">
        <Container>
          <SectionHeading eyebrow="Channels" title="Video and Creators" />

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-[1.2rem] border border-[var(--border)] bg-white p-5 sm:p-6">
              <CardEyebrow>Featured Video</CardEyebrow>
              <div className="mt-4">
                <YouTubeFeatured />
              </div>
            </div>
            <div className="rounded-[1.2rem] border border-[var(--border)] bg-white p-5 sm:p-6">
              <CardEyebrow>Creator Status</CardEyebrow>
              <div className="mt-4">
                <TwitchCreators />
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[1.2rem] border border-[var(--border)] bg-white p-5 sm:p-6">
            <CardEyebrow>Library</CardEyebrow>
            <div className="mt-4">
              <YouTubeLibrary />
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
