"use client";

import { useEffect, useMemo, useState } from "react";

import { SectionHeading } from "@/components/ui";
import { cn } from "@/components/ui/cn";
import { contentCreators } from "@/lib/creators";

type CreatorStatus = {
  id: string;
  name: string;
  twitchLogin: string;
  role?: string;
  isLive: boolean;
  streamTitle?: string;
  game?: string;
  viewerCount?: number;
  thumbnail?: string;
};

type YouTubeVideo = {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
};

const fallbackCreators: CreatorStatus[] = contentCreators.map((creator) => ({
  id: creator.id,
  name: creator.name,
  twitchLogin: creator.twitchLogin,
  role: creator.role,
  isLive: false
}));

const RAD_YOUTUBE = "https://www.youtube.com/@RadEsport";
const TWITCH_PURPLE = "#9146FF";

function TwitchCard({
  creator,
  variant = "default"
}: {
  creator: CreatorStatus;
  variant?: "hero" | "default";
}) {
  const isHero = variant === "hero";
  const isLive = creator.isLive;

  return (
    <a
      href={`https://www.twitch.tv/${creator.twitchLogin}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex min-h-0 flex-col overflow-hidden border bg-black transition-[border-color,box-shadow,background-color,transform] duration-300",
        isLive
          ? "z-[1] border-[var(--color-blood)] bg-[linear-gradient(180deg,rgba(229,6,47,0.16)_0%,rgba(0,0,0,0.96)_42%)] shadow-[0_0_0_1px_rgba(229,6,47,0.35),0_18px_48px_rgba(229,6,47,0.22)] hover:shadow-[0_0_0_1px_rgba(229,6,47,0.55),0_22px_56px_rgba(229,6,47,0.3)]"
          : "border-neutral-800/90 hover:border-[#9146FF]/45 hover:bg-neutral-950"
      )}
    >
      {isLive ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[3px] bg-[linear-gradient(90deg,transparent,var(--color-blood),#ff6f88,var(--color-blood),transparent)]"
          style={{ animation: "rad-live-glow 2.2s ease-in-out infinite" }}
        />
      ) : null}

      <div
        className={cn(
          "relative overflow-hidden border-b bg-neutral-950",
          isLive ? "border-[var(--color-blood)]/35" : "border-neutral-900",
          isHero ? "aspect-[16/10] min-h-[220px] lg:min-h-[260px]" : "aspect-[16/9]"
        )}
      >
        {isLive && creator.thumbnail ? (
          <img
            src={creator.thumbnail}
            alt={creator.streamTitle || `${creator.name} Twitch stream`}
            className="h-full w-full object-cover opacity-100 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_50%_30%,rgba(145,70,255,0.14),transparent_58%),linear-gradient(180deg,#0d0d14,#050506)]">
            <svg
              aria-hidden
              width={isHero ? 56 : 40}
              height={isHero ? 56 : 40}
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#9146FF]/55"
            >
              <path
                d="M5 4h15v9.6l-4 4h-4.2l-2.8 2.8v-2.8H5V4Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M10 8.2v4.2M15 8.2v4.2" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </div>
        )}
        <div
          className={cn(
            "absolute inset-0",
            isLive
              ? "bg-[linear-gradient(180deg,rgba(229,6,47,0.08),rgba(0,0,0,0.72))]"
              : "bg-[linear-gradient(180deg,rgba(145,70,255,0.04),rgba(0,0,0,0.55))]"
          )}
        />
        <span
          className={cn(
            "absolute left-3 top-3 inline-flex items-center gap-2 border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]",
            isLive
              ? "border-[var(--color-blood)] bg-[var(--color-blood)] text-white shadow-[0_0_24px_rgba(229,6,47,0.55)]"
              : "border-neutral-700 bg-black/90 text-neutral-500"
          )}
        >
          {isLive ? (
            <span
              aria-hidden
              className="h-2 w-2 rounded-full bg-white"
              style={{ animation: "rad-live-pulse 1.4s ease-out infinite" }}
            />
          ) : null}
          {isLive ? "Live now" : "Offline"}
        </span>
        {isLive && creator.viewerCount != null ? (
          <span className="absolute right-3 top-3 border border-white/15 bg-black/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
            {creator.viewerCount.toLocaleString()} viewers
          </span>
        ) : null}
      </div>

      <div className={cn("flex flex-1 flex-col p-4", isHero && "p-5 sm:p-6")}>
        <p
          className="text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{ color: isLive ? "var(--color-blood)" : TWITCH_PURPLE }}
        >
          Twitch
        </p>
        <h3
          className={cn(
            "mt-2 break-words font-[family-name:var(--font-display)] font-extrabold uppercase leading-tight text-white",
            isHero ? "text-[clamp(1.5rem,3.5vw,2.25rem)]" : "text-xl"
          )}
        >
          {creator.name}
        </h3>
        <p className={cn("mt-1 text-xs", isLive ? "text-[var(--color-rad-soft)]" : "text-neutral-500")}>
          @{creator.twitchLogin}
        </p>

        {creator.role ? (
          <p className={cn(isHero ? "mt-4 text-sm" : "mt-3 text-xs", isLive ? "text-neutral-300" : "text-neutral-500")}>
            {creator.role}
          </p>
        ) : null}

        {isLive && creator.streamTitle ? (
          <p className="mt-3 line-clamp-2 break-words text-sm leading-relaxed text-neutral-200">
            {creator.streamTitle}
          </p>
        ) : (
          <p className="mt-3 text-xs leading-relaxed text-neutral-600">
            Official RAD Esports creator channel.
          </p>
        )}

        {isLive && creator.game ? (
          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-blood)]">
            {creator.game}
          </p>
        ) : null}

        {isLive ? (
          <span className="mt-4 inline-flex w-fit items-center gap-2 border border-[var(--color-blood)]/50 bg-[var(--color-blood)]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-rad-soft)] transition-colors group-hover:border-[var(--color-blood)] group-hover:bg-[var(--color-blood)] group-hover:text-white">
            Watch live
            <span aria-hidden>→</span>
          </span>
        ) : null}
      </div>
    </a>
  );
}

function FeaturedSkeleton() {
  return (
    <div className="grid gap-10">
      <div>
        <div className="mb-6 h-4 w-32 animate-pulse bg-[var(--color-blood)]/20" />
        <div className="grid gap-px border border-[var(--color-blood)]/20 bg-[var(--color-blood)]/10 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:row-span-2">
            <div className="aspect-[16/10] animate-pulse bg-black" />
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="lg:col-span-3">
              <div className="aspect-[16/9] animate-pulse bg-black" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-6 h-4 w-32 animate-pulse bg-[var(--color-blood)]/20" />
        <div className="grid gap-px border border-neutral-900 bg-neutral-900 lg:grid-cols-[1.35fr_1fr]">
          <div className="aspect-video animate-pulse bg-black" />
          <div className="min-h-[200px] animate-pulse bg-black" />
        </div>
      </div>
    </div>
  );
}

const LIVE_POLL_MS = 60_000;

export function FeaturedMediaSection() {
  const [creators, setCreators] = useState<CreatorStatus[]>(fallbackCreators);
  const [video, setVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadStatus(isInitial: boolean) {
      try {
        const requests = isInitial
          ? [fetch("/api/twitch/live"), fetch("/api/youtube/latest")]
          : [fetch("/api/twitch/live")];

        const responses = await Promise.all(requests);
        const twitchData = await responses[0].json();
        if (!mounted) return;

        if (Array.isArray(twitchData.creators) && twitchData.creators.length > 0) {
          setCreators(twitchData.creators);
        }

        if (isInitial && responses[1]) {
          const youtubeData = await responses[1].json();
          if (!mounted) return;
          setVideo(youtubeData.latestVideo ?? null);
        }
      } catch {
        // Keep the last known creator statuses on transient failures.
      } finally {
        if (mounted && isInitial) {
          setLoading(false);
        }
      }
    }

    void loadStatus(true);
    const intervalId = window.setInterval(() => {
      void loadStatus(false);
    }, LIVE_POLL_MS);

    return () => {
      mounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const liveCount = useMemo(() => creators.filter((creator) => creator.isLive).length, [creators]);
  const heroCreator = creators.find((creator) => creator.isLive) ?? null;
  const gridCreators = heroCreator ? creators.filter((creator) => creator.id !== heroCreator.id) : creators;

  if (loading) {
    return <FeaturedSkeleton />;
  }

  return (
    <div className="grid gap-12 md:gap-14">
      <section aria-labelledby="content-creators-heading" className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-4 -top-6 bottom-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(229,6,47,0.16),transparent_55%),radial-gradient(ellipse_at_80%_20%,rgba(145,70,255,0.12),transparent_42%)] sm:-inset-x-8"
        />

        <SectionHeading
          eyebrow="Broadcast"
          title="Creator channels"
          description={
            liveCount > 0 ? (
              <span className="inline-flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 border border-[var(--color-blood)] bg-[var(--color-blood)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-white"
                    style={{ animation: "rad-live-pulse 1.4s ease-out infinite" }}
                  />
                  {liveCount} live
                </span>
                <span className="text-neutral-300">
                  channel{liveCount === 1 ? "" : "s"} currently streaming on Twitch.
                </span>
              </span>
            ) : (
              "Official RAD Esports streams and creator broadcasts on Twitch."
            )
          }
          compact
          className="mb-6 md:mb-8"
        />

        <div
          className={cn(
            "grid gap-px lg:grid-cols-12",
            liveCount > 0
              ? "border border-[var(--color-blood)]/35 bg-[linear-gradient(90deg,rgba(229,6,47,0.35),rgba(145,70,255,0.28),rgba(229,6,47,0.35))]"
              : "border border-[#9146FF]/25 bg-[linear-gradient(90deg,rgba(145,70,255,0.35),rgba(229,6,47,0.22),rgba(145,70,255,0.35))]"
          )}
        >
          {heroCreator ? (
            <div className="lg:col-span-6 lg:row-span-2">
              <TwitchCard creator={heroCreator} variant="hero" />
            </div>
          ) : null}

          {gridCreators.map((creator) => (
            <div
              key={creator.id}
              className="min-h-0 lg:col-span-3"
            >
              <TwitchCard creator={creator} />
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="content-video-heading"
        className="relative border-t border-[var(--color-blood)]/20 pt-12 md:pt-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-[radial-gradient(ellipse_at_center,rgba(229,6,47,0.12),transparent_70%)]"
        />

        <SectionHeading
          eyebrow="Video"
          title="Featured release"
          description="Latest published video from the RAD Esports YouTube channel."
          compact
          className="mb-6 md:mb-8"
        />

        <div className="grid gap-px border border-[var(--color-blood)]/25 bg-[linear-gradient(90deg,rgba(229,6,47,0.4),rgba(255,111,136,0.25),rgba(229,6,47,0.4))] lg:grid-cols-[1.35fr_1fr]">
          {video ? (
            <>
              <div className="aspect-video overflow-hidden bg-black lg:aspect-auto lg:min-h-[320px]">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full min-h-[220px]"
                />
              </div>
              <div className="flex min-h-[220px] flex-col justify-between bg-[linear-gradient(180deg,rgba(229,6,47,0.12),#050506_40%)] p-5 sm:p-7">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-blood)]">
                    YouTube
                  </p>
                  <h3 className="mt-3 break-words font-[family-name:var(--font-display)] text-[clamp(1.35rem,3.5vw,2rem)] font-extrabold uppercase leading-tight text-white">
                    {video.title}
                  </h3>
                  {video.description ? (
                    <p className="mt-4 line-clamp-5 break-words text-sm leading-relaxed text-neutral-400">
                      {video.description}
                    </p>
                  ) : null}
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 border border-[var(--color-blood)]/40 bg-[var(--color-blood)]/10 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-rad-soft)] transition hover:border-[var(--color-blood)] hover:bg-[var(--color-blood)] hover:text-white"
                >
                  View on YouTube
                  <span aria-hidden>→</span>
                </a>
              </div>
            </>
          ) : (
            <div className="col-span-full flex flex-col items-start justify-between gap-6 bg-[linear-gradient(135deg,rgba(229,6,47,0.14),#050506_55%)] p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-blood)]">
                  YouTube
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-tight text-white">
                  RAD Esports
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">
                  Match highlights, tournament coverage, and official org video are published on our YouTube
                  channel.
                </p>
              </div>
              <a
                href={RAD_YOUTUBE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 border border-[var(--color-blood)]/40 bg-[var(--color-blood)]/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-rad-soft)] transition hover:border-[var(--color-blood)] hover:bg-[var(--color-blood)] hover:text-white"
              >
                Visit channel
                <span aria-hidden>→</span>
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
