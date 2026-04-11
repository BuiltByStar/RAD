"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { fallbackContent } from "@/lib/content-data";

type Video = {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
};

export function YouTubeFeatured() {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch("/api/youtube/latest", {
          signal: controller.signal,
          cache: "no-store"
        });
        const data = (await response.json()) as { latestVideo?: Video | null };
        setVideo(data.latestVideo ?? null);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setVideo(null);
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
      <div className="rad-media-feature rad-media-feature--loading" aria-hidden="true">
        <div className="rad-skeleton rad-skeleton--media" />
        <div className="rad-media-feature__body">
          <div className="rad-skeleton rad-skeleton--title" />
          <div className="rad-skeleton rad-skeleton--copy" />
          <div className="rad-skeleton rad-skeleton--link" />
        </div>
      </div>
    );
  }

  if (!video) {
    const fallback = fallbackContent.find((item) => item.featured) ?? fallbackContent[0];

    if (!fallback) {
      return null;
    }

    return (
      <a
        href={fallback.url}
        target="_blank"
        rel="noopener noreferrer"
        className="rad-media-feature"
        data-reveal
      >
        <div className="rad-media-feature__media">
          <Image
            src={fallback.thumbnail}
            alt={fallback.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rad-media-feature__image"
          />
        </div>
        <div className="rad-media-feature__body">
          <p className="rad-kicker">Fallback media</p>
          <h3 className="rad-card__title">{fallback.title}</h3>
          {fallback.description ? <p className="rad-copy">{fallback.description}</p> : null}
          <span className="rad-text-link">Open on YouTube</span>
        </div>
      </a>
    );
  }

  return (
    <div className="rad-media-feature" data-reveal>
      <div className="rad-media-feature__embed">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rad-media-feature__iframe"
        />
      </div>
      <div className="rad-media-feature__body">
        <p className="rad-kicker">Latest upload</p>
        <h3 className="rad-card__title">{video.title}</h3>
        {video.description ? <p className="rad-copy">{video.description}</p> : null}
        <a
          href={`https://www.youtube.com/watch?v=${video.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rad-text-link"
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  );
}
