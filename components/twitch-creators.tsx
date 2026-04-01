"use client";

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
    fetch("/api/twitch/live")
      .then((r) => r.json())
      .then((data) => {
        setCreators(data.creators || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="at-twitch-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="at-twitch-card at-glass">
            <div className="at-skeleton-shimmer" style={{ width: "100%", height: 60, borderRadius: 4 }} />
          </div>
        ))}
      </div>
    );
  }

  if (creators.length === 0) {
    return (
      <div className="at-twitch-empty at-glass at-hud-border" style={{ padding: "3rem", textAlign: "center" }}>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>No Twitch creators configured yet.</p>
      </div>
    );
  }

  return (
    <div className="at-twitch-grid">
      {creators.map((creator) => (
        <a
          key={creator.id}
          href={`https://www.twitch.tv/${creator.twitchLogin}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`at-twitch-card at-glass at-hud-border ${creator.isLive ? "at-twitch-card--live" : "at-twitch-card--offline"}`}
        >
          {creator.isLive && creator.thumbnail && (
            <div className="at-twitch-thumb-wrap">
              <img src={creator.thumbnail} alt={creator.streamTitle || ""} className="at-twitch-thumb" />
              <span className="at-twitch-viewers">
                <span className="at-live-dot" />
                {creator.viewerCount?.toLocaleString()} viewers
              </span>
            </div>
          )}
          <div className="at-twitch-card-body">
            <div className="at-twitch-card-header">
              <div className="at-twitch-name-row">
                <strong className="at-twitch-name">{creator.name}</strong>
                {creator.isLive && <span className="at-twitch-live-badge">LIVE</span>}
              </div>
              <span className="at-twitch-login">@{creator.twitchLogin}</span>
            </div>
            {creator.role && (
              <span className="at-twitch-role">{creator.role}</span>
            )}
            {creator.isLive && creator.streamTitle && (
              <p className="at-twitch-stream-title">{creator.streamTitle}</p>
            )}
            {creator.isLive && creator.game && (
              <span className="at-twitch-game">{creator.game}</span>
            )}
            {!creator.isLive && (
              <span className="at-twitch-offline-tag">Offline</span>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
