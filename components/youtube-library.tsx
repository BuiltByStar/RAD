"use client";

import Image from "next/image";
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
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch("/api/youtube/latest", {
          signal: controller.signal,
          cache: "no-store"
        });
        const data = (await response.json()) as { recentVideos?: Video[] };

        if (data.recentVideos?.length) {
          setVideos(data.recentVideos);
        } else {
          setUsedFallback(true);
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setUsedFallback(true);
        }
      } finally {
        setLoading(false);
      }
    }

    void load();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="rad-media-grid" aria-hidden="true">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rad-media-card rad-media-card--loading">
            <div className="rad-skeleton rad-skeleton--media" />
            <div className="rad-media-card__body">
              <div className="rad-skeleton rad-skeleton--title" />
              <div className="rad-skeleton rad-skeleton--copy" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const displayItems = usedFallback
    ? fallbackContent
        .filter((item) => !item.featured)
        .map((item) => ({
          videoId: item.id,
          title: item.title,
          description: item.description || "",
          thumbnail: item.thumbnail,
          url: item.url
        }))
    : videos;

  if (displayItems.length === 0) {
    return (
      <div className="rad-empty-state" data-reveal>
        <p className="rad-copy">No recent media items are available yet.</p>
      </div>
    );
  }

  return (
    <div className="rad-media-grid">
      {displayItems.map((video) => {
        const externalUrl =
          "url" in video && video.url
            ? video.url
            : `https://www.youtube.com/watch?v=${video.videoId}`;

        return (
          <a
            key={video.videoId}
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rad-media-card"
            data-reveal
          >
            <div className="rad-media-card__media">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rad-media-card__image"
              />
            </div>
            <div className="rad-media-card__body">
              <p className="rad-kicker">{usedFallback ? "Curated" : "YouTube"}</p>
              <h3 className="rad-card__title">{video.title}</h3>
              {video.description ? <p className="rad-copy">{video.description.slice(0, 120)}</p> : null}
            </div>
          </a>
        );
      })}
    </div>
  );
}
