"use client";

import { useEffect, useMemo, useState } from "react";

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
        "group relative flex min-h-0 flex-col overflow-hidden bg-black transition duration-300 hover:bg-neutral-950",
        creator.isLive && "ring-1 ring-inset ring-[var(--color-blood)]/35"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden border-b border-neutral-900 bg-black",
          isHero ? "aspect-[16/10] min-h-[220px] lg:min-h-[280px]" : "aspect-[16/9]"
        )}
      >
        {creator.isLive && creator.thumbnail ? (
          <img
            src={creator.thumbnail}
            alt={creator.streamTitle || `${creator.name} Twitch stream`}
            className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full place-items-center bg-neutral-950">
            <svg
              aria-hidden
              width={isHero ? 72 : 48}
              height={isHero ? 72 : 48}
              viewBox="0 0 24 24"
              fill="none"
              className="text-neutral-700"
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.62))]" />
        <span
          className={cn(
            "absolute left-3 top-3 border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]",
            creator.isLive
              ? "border-[var(--color-blood)] bg-[var(--color-blood)] text-white"
              : "border-neutral-800 bg-black/90 text-neutral-500"
          )}
        >
          {creator.isLive ? "Live" : "Offline"}
        </span>
        {creator.isLive && creator.viewerCount ? (
          <span className="absolute right-3 top-3 border border-neutral-800 bg-black/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
            {creator.viewerCount.toLocaleString()} watching
          </span>
        ) : null}
      </div>

      <div className={cn("flex flex-1 flex-col p-4", isHero && "p-5 sm:p-6")}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className={cn(
                "break-words font-[family-name:var(--font-display)] font-extrabold uppercase leading-[0.9] text-white group-hover:text-[var(--color-blood)]",
                isHero ? "text-[clamp(1.75rem,4vw,2.75rem)]" : "text-2xl"
              )}
            >
              {creator.name}
            </h3>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-blood)]">
              @{creator.twitchLogin}
            </p>
          </div>
          {creator.isLive ? (
            <span className="mt-1.5 h-2.5 w-2.5 shrink-0 animate-pulse bg-[var(--color-blood)]" aria-hidden />
          ) : null}
        </div>

        {creator.role ? (
          <p className={cn("text-neutral-500", isHero ? "mt-4 text-sm" : "mt-3 text-xs")}>{creator.role}</p>
        ) : null}
        {creator.isLive && creator.streamTitle ? (
          <p className="mt-2 line-clamp-2 break-words text-sm leading-relaxed text-neutral-400">
            {creator.streamTitle}
          </p>
        ) : (
          <p className="mt-2 text-xs leading-relaxed text-neutral-600">
            Follow for live Marvel Rivals streams and scrims.
          </p>
        )}
        {creator.isLive && creator.game ? (
          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600">{creator.game}</p>
        ) : null}
      </div>
    </a>
  );
}

function FeaturedSkeleton() {
  return (
    <div className="overflow-hidden border border-neutral-900 bg-neutral-900">
      <div className="grid gap-px bg-neutral-900 lg:grid-cols-12">
        <div className="lg:col-span-6 lg:row-span-2">
          <div className="aspect-[16/10] animate-pulse bg-black" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="lg:col-span-3">
            <div className="aspect-[16/9] animate-pulse bg-black" />
          </div>
        ))}
      </div>
      <div className="mt-px grid gap-px bg-neutral-900 lg:grid-cols-[1.35fr_1fr]">
        <div className="aspect-video animate-pulse bg-black" />
        <div className="min-h-[200px] animate-pulse bg-black" />
      </div>
    </div>
  );
}

export function FeaturedMediaSection() {
  const [creators, setCreators] = useState<CreatorStatus[]>(fallbackCreators);
  const [video, setVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    Promise.all([fetch("/api/twitch/live"), fetch("/api/youtube/latest")])
      .then(async ([twitchRes, youtubeRes]) => {
        const [twitchData, youtubeData] = await Promise.all([twitchRes.json(), youtubeRes.json()]);
        if (!mounted) return;

        setCreators(twitchData.creators?.length ? twitchData.creators : fallbackCreators);
        setVideo(youtubeData.latestVideo ?? null);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setCreators(fallbackCreators);
        setVideo(null);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const liveCount = useMemo(() => creators.filter((creator) => creator.isLive).length, [creators]);
  const heroCreator = creators.find((creator) => creator.isLive) ?? null;
  const gridCreators = heroCreator ? creators.filter((creator) => creator.id !== heroCreator.id) : creators;

  if (loading) {
    return <FeaturedSkeleton />;
  }

  return (
    <div className="overflow-hidden border border-neutral-900 bg-neutral-900">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-900 bg-black px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="border border-[var(--color-blood)]/50 bg-[var(--color-blood)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-blood)]">
            Featured
          </span>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">Live creators &amp; latest drop</p>
        </div>
        {liveCount > 0 ? (
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-blood)]">
            <span className="h-2 w-2 animate-pulse bg-[var(--color-blood)]" aria-hidden />
            {liveCount} live now
          </span>
        ) : null}
      </div>

      <div className="grid gap-px bg-neutral-900 lg:grid-cols-12">
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

      <div className="mt-px grid gap-px bg-neutral-900 lg:grid-cols-[1.35fr_1fr]">
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
            <div className="flex min-h-[220px] flex-col justify-between bg-black p-5 sm:p-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-blood)]">
                  Latest on YouTube
                </p>
                <h3 className="mt-3 break-words font-[family-name:var(--font-display)] text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold uppercase leading-[0.92] text-white">
                  {video.title}
                </h3>
                {video.description ? (
                  <p className="mt-4 line-clamp-4 break-words text-sm leading-relaxed text-neutral-500">
                    {video.description}
                  </p>
                ) : null}
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500 transition hover:text-white"
              >
                Watch on YouTube
                <span aria-hidden>→</span>
              </a>
            </div>
          </>
        ) : (
          <div className="col-span-full flex flex-col items-start justify-between gap-6 bg-black p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-blood)]">
                Latest on YouTube
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-[0.92] text-white sm:text-3xl">
                RAD Esports channel
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-500">
                Highlights, match VODs, and behind-the-scenes drops from the org — subscribe to catch the next upload.
              </p>
            </div>
            <a
              href={RAD_YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 border border-neutral-800 bg-neutral-950 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:border-[var(--color-blood)] hover:text-[var(--color-blood)]"
            >
              Open channel
              <span aria-hidden>→</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
