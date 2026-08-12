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

function TwitchCard({
  creator,
  variant = "default"
}: {
  creator: CreatorStatus;
  variant?: "hero" | "default";
}) {
  const isHero = variant === "hero";

  return (
    <a
      href={`https://www.twitch.tv/${creator.twitchLogin}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex min-h-0 flex-col overflow-hidden border border-neutral-900 bg-black transition-colors duration-300 hover:border-neutral-700 hover:bg-neutral-950",
        creator.isLive && "border-[var(--color-blood)]/40"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden border-b border-neutral-900 bg-neutral-950",
          isHero ? "aspect-[16/10] min-h-[220px] lg:min-h-[260px]" : "aspect-[16/9]"
        )}
      >
        {creator.isLive && creator.thumbnail ? (
          <img
            src={creator.thumbnail}
            alt={creator.streamTitle || `${creator.name} Twitch stream`}
            className="h-full w-full object-cover opacity-95"
          />
        ) : (
          <div className="grid h-full place-items-center bg-neutral-950">
            <svg
              aria-hidden
              width={isHero ? 56 : 40}
              height={isHero ? 56 : 40}
              viewBox="0 0 24 24"
              fill="none"
              className="text-neutral-800"
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.55))]" />
        <span
          className={cn(
            "absolute left-3 top-3 border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em]",
            creator.isLive
              ? "border-[var(--color-blood)]/60 bg-black/90 text-[var(--color-blood)]"
              : "border-neutral-800 bg-black/90 text-neutral-500"
          )}
        >
          {creator.isLive ? "Live" : "Offline"}
        </span>
        {creator.isLive && creator.viewerCount ? (
          <span className="absolute right-3 top-3 border border-neutral-800 bg-black/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-400">
            {creator.viewerCount.toLocaleString()} viewers
          </span>
        ) : null}
      </div>

      <div className={cn("flex flex-1 flex-col p-4", isHero && "p-5 sm:p-6")}>
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-600">Twitch</p>
        <h3
          className={cn(
            "mt-2 break-words font-[family-name:var(--font-display)] font-extrabold uppercase leading-tight text-white",
            isHero ? "text-[clamp(1.5rem,3.5vw,2.25rem)]" : "text-xl"
          )}
        >
          {creator.name}
        </h3>
        <p className="mt-1 text-xs text-neutral-500">@{creator.twitchLogin}</p>

        {creator.role ? (
          <p className={cn("text-neutral-500", isHero ? "mt-4 text-sm" : "mt-3 text-xs")}>{creator.role}</p>
        ) : null}

        {creator.isLive && creator.streamTitle ? (
          <p className="mt-3 line-clamp-2 break-words text-sm leading-relaxed text-neutral-400">
            {creator.streamTitle}
          </p>
        ) : (
          <p className="mt-3 text-xs leading-relaxed text-neutral-600">
            Official RAD Esports creator channel.
          </p>
        )}

        {creator.isLive && creator.game ? (
          <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-600">
            {creator.game}
          </p>
        ) : null}
      </div>
    </a>
  );
}

function FeaturedSkeleton() {
  return (
    <div className="grid gap-10">
      <div>
        <div className="mb-6 h-4 w-32 animate-pulse bg-neutral-900" />
        <div className="grid gap-px border border-neutral-900 bg-neutral-900 lg:grid-cols-12">
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
        <div className="mb-6 h-4 w-32 animate-pulse bg-neutral-900" />
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
      <section aria-labelledby="content-creators-heading">
        <SectionHeading
          eyebrow="Broadcast"
          title="Creator channels"
          description={
            liveCount > 0
              ? `${liveCount} channel${liveCount === 1 ? "" : "s"} currently live on Twitch.`
              : "Official RAD Esports streams and creator broadcasts on Twitch."
          }
          compact
          className="mb-6 md:mb-8"
        />

        <div className="grid gap-px border border-neutral-900 bg-neutral-900 lg:grid-cols-12">
          {heroCreator ? (
            <div className="lg:col-span-6 lg:row-span-2">
              <TwitchCard creator={heroCreator} variant="hero" />
            </div>
          ) : null}

          {gridCreators.map((creator) => (
            <div
              key={creator.id}
              className={cn("min-h-0", heroCreator ? "lg:col-span-3" : "lg:col-span-4")}
            >
              <TwitchCard creator={creator} />
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="content-video-heading" className="border-t border-neutral-900 pt-12 md:pt-14">
        <SectionHeading
          eyebrow="Video"
          title="Featured release"
          description="Latest published video from the RAD Esports YouTube channel."
          compact
          className="mb-6 md:mb-8"
        />

        <div className="grid gap-px border border-neutral-900 bg-neutral-900 lg:grid-cols-[1.35fr_1fr]">
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
              <div className="flex min-h-[220px] flex-col justify-between bg-black p-5 sm:p-7">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-600">
                    YouTube
                  </p>
                  <h3 className="mt-3 break-words font-[family-name:var(--font-display)] text-[clamp(1.35rem,3.5vw,2rem)] font-extrabold uppercase leading-tight text-white">
                    {video.title}
                  </h3>
                  {video.description ? (
                    <p className="mt-4 line-clamp-5 break-words text-sm leading-relaxed text-neutral-500">
                      {video.description}
                    </p>
                  ) : null}
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 border border-neutral-800 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400 transition hover:border-neutral-600 hover:text-white"
                >
                  View on YouTube
                  <span aria-hidden>→</span>
                </a>
              </div>
            </>
          ) : (
            <div className="col-span-full flex flex-col items-start justify-between gap-6 bg-black p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-600">
                  YouTube
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-tight text-white">
                  RAD Esports
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-500">
                  Match highlights, tournament coverage, and official org video are published on our YouTube
                  channel.
                </p>
              </div>
              <a
                href={RAD_YOUTUBE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 border border-neutral-800 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-300 transition hover:border-neutral-600 hover:text-white"
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
