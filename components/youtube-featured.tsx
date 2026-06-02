"use client";

import { useEffect, useState } from "react";

import type { ContentItem } from "@/lib/content-data";
import { fallbackContent } from "@/lib/content-data";

type Video = {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  url?: string;
};

export function YouTubeFeatured({
  featuredItem,
  preferManaged = false
}: {
  featuredItem?: ContentItem;
  preferManaged?: boolean;
}) {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (preferManaged) {
      setVideo(null);
      setLoading(false);
      return;
    }

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
  }, [preferManaged]);

  if (loading) {
    return (
      <div className="overflow-hidden border border-neutral-900 bg-black">
        <div className="aspect-video animate-pulse bg-neutral-900" />
        <div className="space-y-3 border-t border-neutral-900 p-5">
          <div className="h-3 w-28 animate-pulse bg-neutral-900" />
          <div className="h-7 w-3/4 animate-pulse bg-neutral-900" />
          <div className="h-4 w-full animate-pulse bg-neutral-900" />
        </div>
      </div>
    );
  }

  if (!video) {
    const fallback = featuredItem ?? fallbackContent.find((item) => item.featured) ?? fallbackContent[0];

    if (!fallback) return null;

    return (
      <a
        href={fallback.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block w-full overflow-hidden border border-neutral-900 bg-black transition duration-300 hover:border-[var(--color-blood)]"
      >
        <div className="relative aspect-video overflow-hidden bg-black">
          <img
            src={fallback.thumbnail}
            alt={fallback.title}
            className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.48))]" />
          <span className="absolute left-4 top-4 border border-neutral-900 bg-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-blood)]">
            Featured
          </span>
          <span className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center border border-neutral-900 bg-[var(--color-blood)] text-white">
            <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
        <div className="min-w-0 border-t border-neutral-900 p-5 sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-blood)]">
            Featured Video
          </p>
          <h3 className="mt-3 break-words font-[family-name:var(--font-display)] text-[clamp(1.7rem,7vw,2.5rem)] font-extrabold uppercase leading-[0.92] text-white group-hover:text-[var(--color-blood)]">
            {fallback.title}
          </h3>
          {fallback.description ? (
            <p className="mt-4 line-clamp-3 break-words text-sm leading-relaxed text-neutral-500">
              {fallback.description}
            </p>
          ) : null}
          <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500 transition group-hover:text-white">
            Open on YouTube
            <span aria-hidden className="transition group-hover:translate-x-1">→</span>
          </span>
        </div>
      </a>
    );
  }

  return (
    <div className="w-full overflow-hidden border border-neutral-900 bg-black">
      <div className="aspect-video overflow-hidden bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
      <div className="min-w-0 border-t border-neutral-900 p-5 sm:p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-blood)]">
          Featured Video
        </p>
        <h3 className="mt-3 break-words font-[family-name:var(--font-display)] text-[clamp(1.7rem,7vw,2.5rem)] font-extrabold uppercase leading-[0.92] text-white">
          {video.title}
        </h3>
        {video.description ? (
          <p className="mt-4 line-clamp-3 break-words text-sm leading-relaxed text-neutral-500">
            {video.description}
          </p>
        ) : null}
        <a
          href={`https://www.youtube.com/watch?v=${video.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500 transition hover:text-white"
        >
          Watch on YouTube
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
