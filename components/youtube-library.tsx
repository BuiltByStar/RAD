"use client";

import { useEffect, useState } from "react";
import { fallbackContent } from "@/lib/content-data";

type Video = {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
};

export function YouTubeLibrary() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    fetch("/api/youtube/latest")
      .then((r) => r.json())
      .then((data) => {
        if (data.recentVideos && data.recentVideos.length > 0) {
          setVideos(data.recentVideos);
        } else {
          setVideos([]);
          setUsedFallback(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setVideos([]);
        setUsedFallback(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="at-yt-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="at-yt-card at-glass">
            <div className="at-skeleton-shimmer" style={{ width: "100%", aspectRatio: "16/9", borderRadius: 4 }} />
            <div style={{ padding: "1rem" }}>
              <div className="at-skeleton-shimmer" style={{ width: "80%", height: 18, borderRadius: 4 }} />
              <div className="at-skeleton-shimmer" style={{ width: "60%", height: 14, borderRadius: 4, marginTop: 6 }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Use fallback content if API returned nothing
  const displayItems = usedFallback
    ? fallbackContent.filter((c) => !c.featured).map((c) => ({
        videoId: c.id,
        title: c.title,
        description: c.description || "",
        thumbnail: c.thumbnail,
        url: c.url
      }))
    : videos;

  if (displayItems.length === 0) return null;

  return (
    <div className="at-yt-grid">
      {displayItems.map((video) => {
        const isYT = "videoId" in video && !video.videoId.startsWith("vid-");
        const href = isYT
          ? `https://www.youtube.com/watch?v=${video.videoId}`
          : ("url" in video ? (video as unknown as { url: string }).url : "#");
        const thumb = isYT
          ? video.thumbnail
          : video.thumbnail;

        return (
          <a
            key={video.videoId}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="at-yt-card at-glass at-hud-border"
          >
            <div className="at-yt-thumb-wrap">
              <img src={thumb} alt={video.title} className="at-yt-thumb" />
              <div className="at-yt-play-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="at-yt-card-info">
              <h4 className="at-yt-card-title">{video.title}</h4>
              {video.description && (
                <p className="at-yt-card-desc">{video.description.slice(0, 100)}...</p>
              )}
            </div>
          </a>
        );
      })}
    </div>
  );
}
