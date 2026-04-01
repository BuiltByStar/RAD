"use client";

import { discordInviteUrl, discordWidgetUrl } from "@/lib/site-data";
import { useState } from "react";

export function DiscordSection() {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [widgetError, setWidgetError] = useState(false);

  return (
    <section className="at-discord-section">
      <div className="container">
        <div className="at-discord-grid">
          <div className="at-discord-content">
            <div className="at-section-label">Community</div>
            <h2 className="at-discord-title at-hover-sheen-text">
              Enter the <span className="at-discord-highlight">Wild</span>
            </h2>
            <p className="at-discord-text">
              The heartbeat of RAD is our community. Join our official Discord server for
              real-time match updates, exclusive behind-the-scenes content, and
              direct interaction with our champion rosters.
            </p>

            <ul className="at-discord-perks">
              <li><span>✦</span> Live Match Alerts</li>
              <li><span>✦</span> Exclusive Giveaways</li>
              <li><span>✦</span> Community Scrims</li>
              <li><span>✦</span> Pro-Player Q&As</li>
            </ul>

            <a
              href={discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="at-discord-cta"
            >
              Join the Discord
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7 7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div className="at-discord-visual">
            <div className="at-discord-widget-wrap">
              {!widgetError ? (
                <>
                  {!widgetLoaded && (
                    <div className="at-discord-widget-loading">
                      <svg viewBox="0 0 71 55" fill="currentColor" width="40" style={{ color: "var(--discord)", opacity: 0.4 }}>
                        <path d="M60.1 4.9A58.55 58.55 0 0 0 45.6.3a40.85 40.85 0 0 0-1.85 3.8 54.15 54.15 0 0 0-16.4 0A36.81 36.81 0 0 0 25.5.3 58.36 58.36 0 0 0 11 4.9C1.58 18.77-1 32.3.65 45.62a58.82 58.82 0 0 0 17.9 9.07 43.8 43.8 0 0 0 3.8-6.2 38.14 38.14 0 0 1-6-2.88 28.6 28.6 0 0 0 1.45-1.15 41.66 41.66 0 0 0 35.8 0c.47.4.95.78 1.45 1.15a38.25 38.25 0 0 1-6 2.89 43.19 43.19 0 0 0 3.8 6.19 58.61 58.61 0 0 0 17.9-9.07C72.16 32.17 68.62 18.68 60.1 4.9Z" />
                      </svg>
                      <p style={{ color: "var(--dim)", fontSize: "0.75rem", marginTop: "0.5rem" }}>Loading widget...</p>
                    </div>
                  )}
                  <iframe
                    src={discordWidgetUrl}
                    width="350"
                    height="420"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    style={{
                      border: "none",
                      width: "100%",
                      height: "420px",
                      display: widgetLoaded ? "block" : "none",
                      borderRadius: "8px"
                    }}
                    onLoad={() => setWidgetLoaded(true)}
                    onError={() => setWidgetError(true)}
                  />
                </>
              ) : (
                <div className="at-discord-widget-fallback">
                  <svg viewBox="0 0 71 55" fill="currentColor" width="48" style={{ color: "var(--discord)", marginBottom: "1rem" }}>
                    <path d="M60.1 4.9A58.55 58.55 0 0 0 45.6.3a40.85 40.85 0 0 0-1.85 3.8 54.15 54.15 0 0 0-16.4 0A36.81 36.81 0 0 0 25.5.3 58.36 58.36 0 0 0 11 4.9C1.58 18.77-1 32.3.65 45.62a58.82 58.82 0 0 0 17.9 9.07 43.8 43.8 0 0 0 3.8-6.2 38.14 38.14 0 0 1-6-2.88 28.6 28.6 0 0 0 1.45-1.15 41.66 41.66 0 0 0 35.8 0c.47.4.95.78 1.45 1.15a38.25 38.25 0 0 1-6 2.89 43.19 43.19 0 0 0 3.8 6.19 58.61 58.61 0 0 0 17.9-9.07C72.16 32.17 68.62 18.68 60.1 4.9Z" />
                  </svg>
                  <strong style={{ color: "white", fontSize: "1.1rem" }}>RAD Esports</strong>
                  <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>Official Community</p>
                  <a href={discordInviteUrl} target="_blank" rel="noopener noreferrer" className="at-discord-cta" style={{ marginTop: "1rem" }}>
                    Join Discord →
                  </a>
                </div>
              )}
            </div>
            <div className="at-discord-glow" />
          </div>
        </div>
      </div>

    </section>
  );
}
