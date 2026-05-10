import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageReadySignal } from "@/components/page-ready-signal";
import { TwitchCreators } from "@/components/twitch-creators";
import { YouTubeFeatured } from "@/components/youtube-featured";
import { YouTubeLibrary } from "@/components/youtube-library";
import { Button, Container } from "@/components/ui";
import { assets } from "@/lib/assets";
import { contentCreators } from "@/lib/creators";
import { fallbackContent } from "@/lib/content-data";
import { getFeaturedPost, getPostMeta } from "@/lib/posts";
import { contactChannels } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Content",
  description: "RAD videos, creator streams, and editorial updates."
};

export default async function ContentPage() {
  const featuredPost = await getFeaturedPost();
  const posts = await getPostMeta();
  const articleFeed = posts.filter((post) => post.slug !== featuredPost?.slug);
  const featuredDrop = fallbackContent.find((item) => item.featured) ?? fallbackContent[0];
  const youtube = contactChannels.find((channel) => channel.label === "YouTube");
  const x = contactChannels.find((channel) => channel.label === "X");

  return (
    <main className="relative isolate overflow-hidden bg-[#030304]">
      <PageReadySignal route="/content" delayMs={32} />

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <Image
          src={assets.bgRed}
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none -z-30 object-cover opacity-[0.16]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#030304_0%,rgba(3,3,4,0.88)_46%,rgba(3,3,4,0.97)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(900px_420px_at_24%_18%,rgba(220,20,60,0.28),transparent_62%),radial-gradient(700px_360px_at_88%_10%,rgba(255,255,255,0.08),transparent_58%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#030304] to-transparent"
        />
        <div
          aria-hidden
          className="absolute left-0 top-20 -z-10 h-px w-full bg-gradient-to-r from-transparent via-white/18 to-transparent"
        />
        <div
          aria-hidden
          className="absolute -right-28 top-28 hidden h-[31rem] w-[31rem] rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(220,20,60,0.2),transparent_58%)] blur-[1px] lg:block"
        />

        <Container size="xl">
          <div className="grid min-h-[calc(100svh-5rem)] min-w-0 gap-8 py-14 sm:py-18 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-20">
            <div className="relative z-10 min-w-0 max-w-[342px] sm:max-w-4xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.48em] text-[color:var(--color-rad-hi)]">
                RAD Media Engine
              </p>
              <h1 className="mt-6 max-w-full font-[family-name:var(--font-display)] text-[clamp(3.65rem,9vw,7.2rem)] font-black uppercase leading-[0.84] tracking-[-0.055em] text-white">
                Content
                <span className="block bg-gradient-to-r from-white via-[#ff8a9d] to-[color:var(--color-rad-hi)] bg-clip-text text-transparent">
                  Runs Wild
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/68 sm:text-lg">
                Videos, creator streams, match stories, and brand drops from the competitive side of RAD.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full border border-[color:var(--color-rad)]/40 bg-[color:var(--color-rad)]/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                  {fallbackContent.length + posts.length} media pieces
                </span>
                <span className="rounded-full border border-white/12 bg-white/[0.055] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">
                  {contentCreators.length} creators tracked
                </span>
                <span className="rounded-full border border-white/12 bg-white/[0.055] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">
                  News + streams + drops
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#latest-videos" size="lg">Latest videos</Button>
                <Button href={youtube?.href ?? "https://www.youtube.com/@RadEsport"} size="lg" variant="outline">
                  RAD YouTube
                </Button>
              </div>

              <div className="mt-10 flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/42">
                <span>Highlights</span>
                <span className="h-px w-12 bg-[color:var(--color-rad)]/70" />
                <span>Live streams</span>
                <span className="h-px w-12 bg-white/16" />
                <span>Editorial</span>
              </div>
            </div>

            <div className="relative min-w-0 max-w-[342px] sm:max-w-none">
              <div
                aria-hidden
                className="absolute -inset-5 rounded-[2.4rem] bg-[radial-gradient(circle_at_50%_42%,rgba(220,20,60,0.28),transparent_62%)] blur-2xl"
              />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-black/62 p-3 shadow-[0_30px_120px_-70px_rgba(220,20,60,0.75)] backdrop-blur-xl sm:p-4">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_28%,rgba(220,20,60,0.1)_100%)]"
                />
                <div className="relative">
                  <YouTubeFeatured />
                </div>
              </div>

              {featuredDrop ? (
                <div className="relative mt-4 grid min-w-0 gap-3 overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl sm:grid-cols-[92px_1fr]">
                  <div className="relative min-h-24 overflow-hidden rounded-[1rem] bg-white/5">
                    <Image
                      src={featuredDrop.thumbnail}
                      alt=""
                      fill
                      sizes="92px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-rad-hi)]">
                      Featured Drop
                    </p>
                    <h2 className="mt-2 max-w-full break-words font-[family-name:var(--font-display)] text-2xl uppercase leading-[0.95] text-white">
                      {featuredDrop.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/58">
                      {featuredDrop.description}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-b border-white/10 py-12 sm:py-16">
        <div
          aria-hidden
          className="absolute left-[-12rem] top-[-14rem] h-[28rem] w-[28rem] rounded-full bg-[color:var(--color-rad)]/10 blur-3xl"
        />
        <Container size="xl">
          <div className="mb-8 grid gap-4 lg:grid-cols-[0.7fr_1fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[color:var(--color-rad-hi)]">
                Twitch Radar
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.7rem,5.2vw,5.8rem)] font-black uppercase leading-[0.86] tracking-[-0.035em] text-white">
                Creator Live Status
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-white/58 sm:text-base lg:justify-self-end">
              Live creators surface first. Offline cards still keep the roster visible so the page feels filled even between streams.
            </p>
          </div>

          <TwitchCreators />
        </Container>
      </section>

      <section id="latest-videos" className="relative overflow-hidden border-b border-white/10 py-12 sm:py-16">
        <Image
          src={assets.bgWhite}
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none -z-20 object-cover opacity-[0.035]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(820px_440px_at_84%_0%,rgba(220,20,60,0.14),transparent_60%)]"
        />
        <Container size="xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[color:var(--color-rad-hi)]">
                Library
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.7rem,5.2vw,5.6rem)] font-black uppercase leading-[0.86] tracking-[-0.035em] text-white">
                Latest Content
              </h2>
            </div>
            <Button href={youtube?.href ?? "https://www.youtube.com/@RadEsport"} variant="outline">
              Open channel
            </Button>
          </div>

          <YouTubeLibrary />
        </Container>
      </section>

      <section className="relative overflow-hidden py-12 sm:py-16">
        <Container size="xl">
          <div className="mb-8 grid gap-4 lg:grid-cols-[0.78fr_1fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[color:var(--color-rad-hi)]">
                Editorial
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.5rem,4.8vw,5.2rem)] font-black uppercase leading-[0.86] tracking-[-0.035em] text-white">
                RAD Field Notes
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-white/58 sm:text-base lg:justify-self-end">
              Articles and updates for the moments that need more context than a clip.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.04fr_0.96fr]">
            {featuredPost ? (
              <Link
                href={`/content/${featuredPost.slug}`}
                className="group relative min-h-[420px] min-w-0 overflow-hidden rounded-[2rem] border border-white/12 bg-black shadow-[0_26px_90px_-62px_rgba(0,0,0,0.95)]"
              >
                <Image
                  src={featuredPost.cover}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  className="object-cover opacity-80 transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.35)_42%,#030304_100%)]" />
                <div className="relative z-10 flex min-h-[420px] flex-col justify-end p-5 sm:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-rad-hi)]">
                    {featuredPost.category}
                  </p>
                  <h3 className="mt-3 max-w-3xl break-words font-[family-name:var(--font-display)] text-[clamp(2.25rem,10vw,5.1rem)] font-black uppercase leading-[0.86] tracking-[-0.035em] text-white">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/66 sm:text-base">
                    {featuredPost.summary}
                  </p>
                  <span className="mt-6 inline-flex w-fit rounded-full border border-white/14 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/78 transition group-hover:border-[color:var(--color-rad)]/50 group-hover:text-white">
                    Read feature
                  </span>
                </div>
              </Link>
            ) : null}

            <div className="grid gap-4">
              {articleFeed.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/content/${post.slug}`}
                  className="group grid min-w-0 gap-4 overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/[0.045] p-3 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/22 hover:bg-white/[0.07] sm:grid-cols-[160px_1fr]"
                >
                  <div className="relative min-h-36 overflow-hidden rounded-[1.05rem] bg-white/5 sm:min-h-0">
                    <Image
                      src={post.cover}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 160px"
                      className="object-cover transition duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col justify-center p-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-rad-hi)]">
                      {post.category} / {post.date}
                    </p>
                    <h3 className="mt-2 break-words font-[family-name:var(--font-display)] text-2xl uppercase leading-[0.95] text-white">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/56">
                      {post.summary}
                    </p>
                  </div>
                </Link>
              ))}
              <div className="rounded-[1.45rem] border border-[color:var(--color-rad)]/22 bg-[linear-gradient(135deg,rgba(220,20,60,0.16),rgba(255,255,255,0.045))] p-5 backdrop-blur-xl sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/44">
                  Follow the feed
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl uppercase leading-[0.9] text-white">
                  More drops land first on RAD socials.
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {x ? <Button href={x.href} size="sm">X / Twitter</Button> : null}
                  {youtube ? <Button href={youtube.href} size="sm" variant="outline">YouTube</Button> : null}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
