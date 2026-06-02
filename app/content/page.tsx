import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { TwitchCreators } from "@/components/twitch-creators";
import { YouTubeFeatured } from "@/components/youtube-featured";
import { YouTubeLibrary } from "@/components/youtube-library";
import { Button, PageRail, PageRailSection, SectionHeading } from "@/components/ui";
import { getManagedContentItemsState } from "@/lib/content-data.server";
import { contentCreators } from "@/lib/creators";
import { getFeaturedPost, getPostMeta } from "@/lib/posts";
import { contactChannels } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Content",
  description: "RAD videos, creator streams, and editorial updates."
};

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const { items: managedContent, usingDashboardItems } = await getManagedContentItemsState();
  const featuredPost = await getFeaturedPost();
  const posts = await getPostMeta();
  const articleFeed = posts.filter((post) => post.slug !== featuredPost?.slug);
  const featuredDrop = managedContent.find((item) => item.featured) ?? managedContent[0];
  const youtube = contactChannels.find((channel) => channel.label === "YouTube");
  const x = contactChannels.find((channel) => channel.label === "X");

  return (
    <PageShell
      variant="content"
      eyebrow="Content"
      title="Media"
      description="Videos, creator streams, match stories, and brand drops from the competitive side of RAD."
      heroImage="/assets/rad-bg-red.png"
      status={`${managedContent.length + posts.length} pieces live`}
    >
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection>
          <SectionHeading
            eyebrow="Featured"
            title="Latest drop"
            description="Highlights, streams, and editorial from across RAD media."
          />
          <div className="grid gap-px border border-neutral-900 bg-neutral-900 lg:grid-cols-[1fr_0.9fr]">
            <div className="bg-black p-4 sm:p-6">
              <YouTubeFeatured featuredItem={featuredDrop} preferManaged={usingDashboardItems} />
              {featuredDrop ? (
                <a
                  href={featuredDrop.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 grid gap-3 border-t border-neutral-900 pt-4 sm:grid-cols-[92px_1fr]"
                >
                  <div className="relative min-h-24 overflow-hidden border border-neutral-900 bg-black">
                    <Image src={featuredDrop.thumbnail} alt="" fill sizes="92px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-blood)]">
                      Featured drop
                    </p>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-extrabold uppercase leading-tight text-white group-hover:text-[var(--color-blood)]">
                      {featuredDrop.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-neutral-500">{featuredDrop.description}</p>
                  </div>
                </a>
              ) : null}
            </div>
            <div className="grid gap-px bg-neutral-900 sm:grid-cols-3 lg:grid-cols-1">
              <div className="bg-black px-4 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Media</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-white">
                  {managedContent.length + posts.length}
                </p>
              </div>
              <div className="bg-black px-4 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Creators</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-white">
                  {contentCreators.length}
                </p>
              </div>
              <div className="flex flex-col justify-center bg-black px-4 py-5">
                <Button href="#latest-videos" size="sm">
                  Latest videos
                </Button>
                <Button
                  href={youtube?.href ?? "https://www.youtube.com/@RadEsport"}
                  size="sm"
                  variant="outline"
                  className="mt-2"
                >
                  RAD YouTube
                </Button>
              </div>
            </div>
          </div>
        </PageRailSection>

        <PageRailSection borderTop>
          <SectionHeading
            eyebrow="Twitch"
            title="Creator live status"
            description="Live creators surface first. Offline cards keep the roster visible between streams."
          />
          <TwitchCreators />
        </PageRailSection>

        <PageRailSection borderTop id="latest-videos">
          <SectionHeading
            eyebrow="Library"
            title="Latest content"
            actionHref={youtube?.href ?? "https://www.youtube.com/@RadEsport"}
            actionLabel="Open channel"
          />
          <YouTubeLibrary fallbackItems={managedContent} preferManaged={usingDashboardItems} />
        </PageRailSection>

        <PageRailSection borderTop>
          <SectionHeading
            eyebrow="Editorial"
            title="Field notes"
            description="Articles and updates for moments that need more context than a clip."
          />
          <div className="grid gap-px border border-neutral-900 bg-neutral-900 lg:grid-cols-[1.04fr_0.96fr]">
            {featuredPost ? (
              <Link
                href={`/content/${featuredPost.slug}`}
                className="group relative min-h-[380px] overflow-hidden bg-black lg:min-h-[420px]"
              >
                <Image
                  src={featuredPost.cover}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                <div className="relative z-10 flex min-h-[380px] flex-col justify-end p-5 sm:p-7 lg:min-h-[420px]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--color-blood)]">
                    {featuredPost.category}
                  </p>
                  <h3 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-[0.9] text-white sm:text-4xl">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                    {featuredPost.summary}
                  </p>
                </div>
              </Link>
            ) : null}

            <div className="grid gap-px bg-neutral-900">
              {articleFeed.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/content/${post.slug}`}
                  className="group grid gap-4 bg-black p-3 sm:grid-cols-[140px_1fr]"
                >
                  <div className="relative min-h-32 overflow-hidden border border-neutral-900 bg-black sm:min-h-0">
                    <Image
                      src={post.cover}
                      alt=""
                      fill
                      sizes="140px"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col justify-center py-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                      {post.category} / {post.date}
                    </p>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-extrabold uppercase leading-tight text-white group-hover:text-[var(--color-blood)]">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-neutral-500">{post.summary}</p>
                  </div>
                </Link>
              ))}
              <div className="bg-black p-5 sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                  Follow the feed
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-tight text-white">
                  More drops land first on RAD socials.
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {x ? <Button href={x.href} size="sm">X / Twitter</Button> : null}
                  {youtube ? (
                    <Button href={youtube.href} size="sm" variant="outline">
                      YouTube
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
