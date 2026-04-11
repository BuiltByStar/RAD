"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

export function TwitchCreators() {
  const [creators, setCreators] = useState<CreatorStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch("/api/twitch/live", {
          signal: controller.signal,
          cache: "no-store"
        });
        const data = (await response.json()) as { creators?: CreatorStatus[] };
        setCreators(data.creators ?? []);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setCreators([]);
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
      <div className="rad-creator-grid" aria-hidden="true">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rad-creator-card rad-creator-card--loading">
            <div className="rad-skeleton rad-skeleton--title" />
            <div className="rad-skeleton rad-skeleton--copy" />
          </div>
        ))}
      </div>
    );
  }

  if (creators.length === 0) {
    return (
      <div className="rad-empty-state" data-reveal>
        <p className="rad-copy">
          No live creator data is available in this environment yet. Add Twitch credentials to light this section up.
        </p>
      </div>
    );
  }

  return (
    <div className="rad-creator-grid">
      {creators.map((creator) => (
        <a
          key={creator.id}
          href={`https://www.twitch.tv/${creator.twitchLogin}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`rad-creator-card${creator.isLive ? " rad-creator-card--live" : ""}`}
          data-reveal
        >
          {creator.thumbnail ? (
            <div className="rad-creator-card__media">
              <Image
                src={creator.thumbnail}
                alt={creator.streamTitle || `${creator.name} Twitch stream`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="rad-creator-card__image"
              />
            </div>
          ) : null}
          <div className="rad-creator-card__body">
            <div className="rad-creator-card__top">
              <div>
                <p className="rad-kicker">{creator.isLive ? "Live now" : "Creator"}</p>
                <h3 className="rad-card__title">{creator.name}</h3>
              </div>
              {creator.isLive ? <span className="rad-live-pill">LIVE</span> : null}
            </div>
            {creator.role ? <p className="rad-copy">{creator.role}</p> : null}
            {creator.streamTitle ? <p className="rad-copy">{creator.streamTitle}</p> : null}
            <div className="rad-inline-meta">
              <span className="rad-badge">@{creator.twitchLogin}</span>
              {creator.viewerCount ? (
                <span className="rad-badge">{creator.viewerCount.toLocaleString()} viewers</span>
              ) : null}
              {creator.game ? <span className="rad-badge">{creator.game}</span> : null}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
