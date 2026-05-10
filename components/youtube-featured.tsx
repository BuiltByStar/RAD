"use client";

import { useEffect, useState } from "react";

import { fallbackContent } from "@/lib/content-data";

type Video = {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  url?: string;
};

export function YouTubeFeatured() {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch("/api/youtube/latest")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setVideo(data.latestVideo ?? null);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="overflow-hidden rounded-[1.65rem] border border-white/10 bg-white/[0.035]">
        <div className="aspect-video animate-pulse bg-white/[0.07]" />
        <div className="space-y-3 p-5">
          <div className="h-3 w-28 animate-pulse rounded-full bg-white/10" />
          <div className="h-7 w-3/4 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-full animate-pulse rounded bg-white/10" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
        </div>
      </div>
    );
  }

  if (!video) {
    const fallback = fallbackContent.find((item) => item.featured) ?? fallbackContent[0];

    if (!fallback) return null;

    return (
      <a
        href={fallback.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group mx-auto block w-full min-w-0 max-w-[342px] overflow-hidden rounded-[1.65rem] border border-white/10 bg-white/[0.045] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--color-rad)]/45 hover:bg-white/[0.065] sm:max-w-none"
      >
        <div className="relative aspect-video overflow-hidden bg-black">
          <img
            src={fallback.thumbnail}
            alt={fallback.title}
            className="h-full w-full object-cover opacity-82 transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.48))]" />
          <span className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-xl">
            Featured
          </span>
          <span className="absolute bottom-4 right-4 grid h-14 w-14 place-items-center rounded-full border border-white/16 bg-[color:var(--color-rad)] text-white shadow-[0_16px_40px_rgba(220,20,60,0.36)]">
            <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
        <div className="min-w-0 p-5 sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-rad-hi)]">
            Featured Video
          </p>
          <h3 className="mt-3 break-words font-[family-name:var(--font-display)] text-[clamp(1.7rem,7vw,2.5rem)] uppercase leading-[0.92] text-white">
            {fallback.title}
          </h3>
          {fallback.description ? (
            <p className="mt-4 line-clamp-3 break-words text-sm leading-relaxed text-white/60">
              {fallback.description}
            </p>
          ) : null}
          <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/74 transition group-hover:text-white">
            Open on YouTube
            <span aria-hidden className="transition group-hover:translate-x-1">→</span>
          </span>
        </div>
      </a>
    );
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-[342px] overflow-hidden rounded-[1.65rem] border border-white/10 bg-white/[0.045] sm:max-w-none">
      <div className="aspect-video overflow-hidden bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
      <div className="min-w-0 p-5 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-rad-hi)]">
          Featured Video
        </p>
        <h3 className="mt-3 break-words font-[family-name:var(--font-display)] text-[clamp(1.7rem,7vw,2.5rem)] uppercase leading-[0.92] text-white">
          {video.title}
        </h3>
        {video.description ? (
          <p className="mt-4 line-clamp-3 break-words text-sm leading-relaxed text-white/60">
            {video.description}
          </p>
        ) : null}
        <a
          href={`https://www.youtube.com/watch?v=${video.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/74 transition hover:text-white"
        >
          Watch on YouTube
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
