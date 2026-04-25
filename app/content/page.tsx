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
  description: "RAD's editorial layer across articles, video, and live creator surfaces."
};

export default async function ContentPage() {
  const featured = await getFeaturedPost();
  const posts = await getPostMeta();
  const feed = posts.filter((post) => post.slug !== featured?.slug);

  return (
    <PageShell
      variant="content"
      eyebrow="Content"
      title="Stories, drops, and org signals."
      description="RAD's content surface brings together articles, video, and creator visibility without treating media like an afterthought."
      heroImage={featured?.cover ?? "/assets/RadBannerNewTest300ppi.png"}
      status="Editorial surface // active"
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
          <SectionHeading
            eyebrow="Feature"
            title="Lead with the strongest story."
            description="The lead story should set the tone for the org, not just fill the first slot in the archive."
          />

          {featured ? (
            <Link
              href={`/content/${featured.slug}`}
              className="group relative grid overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] transition-colors hover:border-[color:var(--color-rad)]/26 md:grid-cols-[1.1fr_0.9fr]"
            >
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
              <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
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
          <SectionHeading
            eyebrow="Archive"
            title="Recent stories and update drops."
            description="Announcements, recaps, and org updates need enough structure to scale as the editorial library grows."
          />

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {feed.map((post) => (
              <Link
                key={post.slug}
                href={`/content/${post.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] transition-colors hover:border-[color:var(--color-rad)]/26"
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
          <SectionHeading
            eyebrow="Live Surfaces"
            title="Video and creator touchpoints."
            description="Video and creator visibility give the org another public layer beyond match results and written updates."
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <CardEyebrow>Featured Video</CardEyebrow>
              <div className="mt-4">
                <YouTubeFeatured />
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <CardEyebrow>Creator Status</CardEyebrow>
              <div className="mt-4">
                <TwitchCreators />
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
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
