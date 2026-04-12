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
    fetch("/api/youtube/latest")
      .then((r) => r.json())
      .then((data) => {
        setVideo(data.latestVideo ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="at-yt-featured">
        <div className="at-yt-featured-skeleton">
          <div className="at-skeleton-shimmer" style={{ width: "100%", aspectRatio: "16/9", borderRadius: 4 }} />
          <div className="at-yt-featured-meta">
            <div className="at-skeleton-shimmer" style={{ width: "60%", height: 28, borderRadius: 4 }} />
            <div className="at-skeleton-shimmer" style={{ width: "90%", height: 16, borderRadius: 4, marginTop: 8 }} />
          </div>
        </div>
      </div>
    );
  }

  if (!video) {
    const fallback = fallbackContent.find((item) => item.featured) ?? fallbackContent[0];

    if (!fallback) return null;

    return (
      <div className="at-yt-featured">
        <a
          href={fallback.url}
          target="_blank"
          rel="noopener noreferrer"
          className="at-yt-featured-fallback"
        >
          <div className="at-yt-thumb-wrap">
            <img src={fallback.thumbnail} alt={fallback.title} className="at-yt-thumb" />
          </div>
          <div className="at-yt-featured-meta">
            <h3 className="at-yt-featured-title">{fallback.title}</h3>
            {fallback.description ? (
              <p className="at-yt-featured-desc">{fallback.description}</p>
            ) : null}
            <span className="text-link">Open on YouTube</span>
          </div>
        </a>
      </div>
    );
  }

  return (
    <div className="at-yt-featured">
      <div className="at-yt-embed-wrap">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="at-yt-iframe"
        />
      </div>
      <div className="at-yt-featured-meta">
        <h3 className="at-yt-featured-title">{video.title}</h3>
        {video.description && (
          <p className="at-yt-featured-desc">{video.description}</p>
        )}
        <a
          href={`https://www.youtube.com/watch?v=${video.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="at-link-arrow"
        >
          Watch on YouTube →
        </a>
      </div>
    </div>
  );
}
