"use client";

import { useEffect, useState } from "react";

import type { ContentItem } from "@/lib/content-data";

type Video = {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  url?: string;
};

export function YouTubeLibrary({
  fallbackItems,
  preferManaged = false
}: {
  fallbackItems: ContentItem[];
  preferManaged?: boolean;
}) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    if (preferManaged) {
      setVideos([]);
      setUsedFallback(true);
      setLoading(false);
      return;
    }

    let mounted = true;

    fetch("/api/youtube/latest")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;

        if (data.recentVideos && data.recentVideos.length > 0) {
          setVideos(data.recentVideos);
          setUsedFallback(false);
        } else {
          setVideos([]);
          setUsedFallback(true);
        }

        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setVideos([]);
        setUsedFallback(true);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [preferManaged]);

  if (loading) {
    return (
      <div className="grid gap-px border border-neutral-900 bg-neutral-900 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden bg-black">
            <div className="aspect-video animate-pulse bg-neutral-900" />
            <div className="space-y-3 border-t border-neutral-900 p-5">
              <div className="h-3 w-24 animate-pulse bg-neutral-900" />
              <div className="h-6 w-5/6 animate-pulse bg-neutral-900" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const displayItems: Video[] = usedFallback
    ? fallbackItems
        .filter((item) => !item.featured)
        .map((item) => ({
          videoId: item.id,
          title: item.title,
          description: item.description ?? "",
          thumbnail: item.thumbnail,
          url: item.url
        }))
    : videos;

  if (displayItems.length === 0) {
    return (
      <div className="border border-neutral-900 bg-black p-8 text-center">
        <p className="text-sm text-neutral-500">No videos are available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-px border border-neutral-900 bg-neutral-900 md:grid-cols-2 xl:grid-cols-3">
      {displayItems.map((video) => {
        const isYouTubeVideo = !video.videoId.startsWith("vid-");
        const href = isYouTubeVideo
          ? `https://www.youtube.com/watch?v=${video.videoId}`
          : video.url ?? "https://www.youtube.com/@RadEsport";

        return (
          <a
            key={video.videoId}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full overflow-hidden bg-black transition duration-300 hover:bg-neutral-950"
          >
            <div className="relative aspect-video overflow-hidden bg-black">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.52))]" />
              <span className="absolute left-4 top-4 border border-neutral-900 bg-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                YouTube
              </span>
              <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center border border-neutral-900 bg-black text-white transition group-hover:bg-[var(--color-blood)]">
                <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>

            <div className="min-w-0 border-t border-neutral-900 p-5">
              <h3 className="break-words font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-[0.95] text-white group-hover:text-[var(--color-blood)]">
                {video.title}
              </h3>
              {video.description ? (
                <p className="mt-3 line-clamp-3 break-words text-sm leading-relaxed text-neutral-500">
                  {video.description}
                </p>
              ) : null}
              <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500 transition group-hover:text-white">
                Watch
                <span aria-hidden className="transition group-hover:translate-x-1">→</span>
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
