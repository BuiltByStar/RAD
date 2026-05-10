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

export function YouTubeLibrary() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-[1.55rem] border border-white/10 bg-white/[0.035]">
            <div className="aspect-video animate-pulse bg-white/[0.07]" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
              <div className="h-6 w-5/6 animate-pulse rounded bg-white/10" />
              <div className="h-4 w-full animate-pulse rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const displayItems: Video[] = usedFallback
    ? fallbackContent
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
      <div className="rounded-[1.55rem] border border-white/10 bg-white/[0.04] p-8 text-center">
        <p className="text-sm text-white/58">No videos are available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
            className="group relative mx-auto w-full min-w-0 max-w-[342px] overflow-hidden rounded-[1.55rem] border border-white/10 bg-white/[0.04] shadow-[0_22px_70px_-60px_rgba(0,0,0,0.95)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[color:var(--color-rad)]/42 hover:bg-white/[0.065] sm:max-w-none"
          >
            <div className="relative aspect-video overflow-hidden bg-black">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover opacity-82 transition duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.52))]" />
              <span className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/58 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/76 backdrop-blur-xl">
                YouTube
              </span>
              <span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-white/14 bg-white/10 text-white backdrop-blur-xl transition group-hover:bg-[color:var(--color-rad)]">
                <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>

            <div className="min-w-0 p-5">
              <h3 className="break-words font-[family-name:var(--font-display)] text-2xl uppercase leading-[0.95] text-white">
                {video.title}
              </h3>
              {video.description ? (
                <p className="mt-3 line-clamp-3 break-words text-sm leading-relaxed text-white/56">
                  {video.description}
                </p>
              ) : null}
              <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/48 transition group-hover:text-white">
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
