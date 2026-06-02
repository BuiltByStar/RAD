"use client";

import { useEffect, useState } from "react";

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

const fallbackCreators: CreatorStatus[] = contentCreators.map((creator) => ({
  id: creator.id,
  name: creator.name,
  twitchLogin: creator.twitchLogin,
  role: creator.role,
  isLive: false
}));

export function TwitchCreators() {
  const [creators, setCreators] = useState<CreatorStatus[]>(fallbackCreators);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch("/api/twitch/live")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;

        setCreators(data.creators?.length ? data.creators : fallbackCreators);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setCreators(fallbackCreators);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid gap-px border border-neutral-900 bg-neutral-900 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="overflow-hidden bg-black p-4">
            <div className="aspect-[16/8.8] animate-pulse bg-neutral-900" />
            <div className="mt-5 space-y-3">
              <div className="h-3 w-20 animate-pulse bg-neutral-900" />
              <div className="h-7 w-3/4 animate-pulse bg-neutral-900" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (creators.length === 0) {
    return (
      <div className="border border-neutral-900 bg-black p-8 text-center">
        <p className="text-sm text-neutral-500">No Twitch creators are configured yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-px border border-neutral-900 bg-neutral-900 md:grid-cols-2 xl:grid-cols-3">
      {creators.map((creator) => (
        <a
          key={creator.id}
          href={`https://www.twitch.tv/${creator.twitchLogin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full overflow-hidden bg-black p-4 transition duration-300 hover:bg-neutral-950"
        >
          <div className="relative aspect-[16/8.8] overflow-hidden border border-neutral-900 bg-black">
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
                  width="58"
                  height="58"
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
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.5))]" />
            <span
              className={
                creator.isLive
                  ? "absolute left-4 top-4 border border-[var(--color-blood)] bg-[var(--color-blood)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white"
                  : "absolute left-4 top-4 border border-neutral-900 bg-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
              }
            >
              {creator.isLive ? "Live" : "Offline"}
            </span>
            {creator.isLive && creator.viewerCount ? (
              <span className="absolute right-4 top-4 border border-neutral-900 bg-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                {creator.viewerCount.toLocaleString()} watching
              </span>
            ) : null}
          </div>

          <div className="min-w-0 pt-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="break-words font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-[0.9] text-white group-hover:text-[var(--color-blood)]">
                  {creator.name}
                </h3>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-blood)]">
                  @{creator.twitchLogin}
                </p>
              </div>
              {creator.isLive ? (
                <span className="mt-1 h-2.5 w-2.5 bg-[var(--color-blood)]" aria-hidden />
              ) : null}
            </div>

            {creator.role ? (
              <p className="mt-4 text-sm font-semibold text-neutral-400">{creator.role}</p>
            ) : null}
            {creator.isLive && creator.streamTitle ? (
              <p className="mt-2 line-clamp-2 break-words text-sm leading-relaxed text-neutral-500">
                {creator.streamTitle}
              </p>
            ) : (
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Channel is ready and will surface here when the stream goes live.
              </p>
            )}
            {creator.isLive && creator.game ? (
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                {creator.game}
              </p>
            ) : null}
            <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500 transition group-hover:text-white">
              Watch on Twitch
              <span aria-hidden className="transition group-hover:translate-x-1">→</span>
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
