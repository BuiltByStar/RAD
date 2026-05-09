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
      heroImage={featured?.cover ?? "/assets/rad-bg-red.png"}
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
              className="group relative grid overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] shadow-[0_24px_80px_-52px_rgba(0,0,0,0.95)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/22 md:grid-cols-[1.1fr_0.9fr]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/24 to-transparent"
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
                  className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"
                />
              </div>
              <div className="flex flex-col justify-center gap-3 p-5 sm:p-7">
                <CardEyebrow>{featured.category}</CardEyebrow>
                <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase leading-[1.02] tracking-normal text-white sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="text-sm leading-relaxed text-white/65 sm:text-base">{featured.summary}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-rad-hi)] transition-colors group-hover:text-white">
                  Open article
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </Link>
          ) : null}
        </Container>
      </Section>

      <Section padding="sm" className="bg-white/[.015]">
        <Container>
          <SectionHeading eyebrow="Archive" title="Latest Stories" />

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {feed.map((post) => (
              <Link
                key={post.slug}
                href={`/content/${post.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-[1.55rem] border border-white/10 bg-white/[0.035] shadow-[0_18px_60px_-52px_rgba(0,0,0,0.95)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/22 hover:bg-white/[0.055]"
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
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <CardEyebrow>{post.category}</CardEyebrow>
                  <h3 className="font-[family-name:var(--font-display)] text-xl uppercase leading-[1.1] tracking-normal text-white [text-wrap:balance]">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">{post.summary}</p>
                  <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
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
            <div className="rounded-[1.55rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_60px_-52px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-6">
              <CardEyebrow>Featured Video</CardEyebrow>
              <div className="mt-4">
                <YouTubeFeatured />
              </div>
            </div>
            <div className="rounded-[1.55rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_60px_-52px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-6">
              <CardEyebrow>Creator Status</CardEyebrow>
              <div className="mt-4">
                <TwitchCreators />
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[1.55rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_60px_-52px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-6">
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
