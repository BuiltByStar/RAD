"use client";

import { discordInviteUrl, discordWidgetUrl } from "@/lib/site-data";
import { ScrollReveal } from "./scroll-effects";
import { useState } from "react";

export function DiscordSection() {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [widgetError, setWidgetError] = useState(false);

  return (
    <section className="at-discord-section">
      <div className="container">
        <ScrollReveal>
          <div className="at-discord-grid">
            <div className="at-discord-content">
              <div className="at-section-label">Community</div>
              <h2 className="at-discord-title">
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
              <div className="at-discord-widget-wrap at-glass">
                {!widgetError ? (
                  <>
                    {!widgetLoaded && (
                      <div className="at-discord-widget-skeleton">
                        <div className="at-skeleton-shimmer" style={{ width: "100%", height: "100%", borderRadius: 8 }} />
                      </div>
                    )}
                    <iframe
                      src={discordWidgetUrl}
                      width="350"
                      height="400"
                      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                      className="at-discord-widget-iframe"
                      style={{ opacity: widgetLoaded ? 1 : 0 }}
                      onLoad={() => setWidgetLoaded(true)}
                      onError={() => setWidgetError(true)}
                    />
                  </>
                ) : (
                  <div className="at-discord-widget-fallback">
                    <svg viewBox="0 0 71 55" fill="currentColor" width="48" style={{ color: "var(--discord)", marginBottom: "1rem" }}>
                      <path d="M60.1 4.9A58.55 58.55 0 0 0 45.6.3a40.85 40.85 0 0 0-1.85 3.8 54.15 54.15 0 0 0-16.4 0A36.81 36.81 0 0 0 25.5.3 58.36 58.36 0 0 0 11 4.9C1.58 18.77-1 32.3.65 45.62a58.82 58.82 0 0 0 17.9 9.07 43.8 43.8 0 0 0 3.8-6.2 38.14 38.14 0 0 1-6-2.88 28.6 28.6 0 0 0 1.45-1.15 41.66 41.66 0 0 0 35.8 0c.47.4.95.78 1.45 1.15a38.25 38.25 0 0 1-6 2.89 43.19 43.19 0 0 0 3.8 6.19 58.61 58.61 0 0 0 17.9-9.07C72.16 32.17 68.62 18.68 60.1 4.9Z" />
                    </svg>
                    <p style={{ color: "var(--muted)" }}>Widget unavailable</p>
                    <a href={discordInviteUrl} target="_blank" rel="noopener noreferrer" className="at-link-arrow">
                      Open Discord →
                    </a>
                  </div>
                )}
              </div>
              <div className="at-discord-glow" />
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style jsx>{`
        .at-discord-section {
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }
        .at-discord-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3rem;
          align-items: center;
        }
        .at-discord-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          margin-bottom: 1.5rem;
          line-height: 0.9;
        }
        .at-discord-highlight {
          color: var(--discord);
          text-shadow: 0 0 30px rgba(88, 101, 242, 0.3);
        }
        .at-discord-text {
          font-size: 1.15rem;
          color: var(--muted);
          max-width: 42ch;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .at-discord-perks {
          list-style: none;
          padding: 0;
          margin: 0 0 2.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8rem;
        }
        .at-discord-perks li {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .at-discord-perks li span {
          color: var(--discord);
          font-size: 1rem;
        }
        .at-discord-cta {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          background: var(--discord);
          color: white;
          padding: 1rem 2.2rem;
          border-radius: 4px;
          font-family: var(--font-body);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 0.9rem;
          transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 10px 40px rgba(88, 101, 242, 0.25);
        }
        .at-discord-cta:hover {
          transform: translateY(-3px) scale(1.02);
          background: var(--discord-hi);
          box-shadow: 0 15px 50px rgba(88, 101, 242, 0.4);
        }
        .at-discord-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .at-discord-widget-wrap {
          width: 100%;
          max-width: 380px;
          min-height: 420px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          z-index: 2;
          border: 1px solid rgba(88, 101, 242, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .at-discord-widget-skeleton {
          position: absolute;
          inset: 0;
        }
        .at-discord-widget-iframe {
          border: none;
          width: 100%;
          height: 420px;
          transition: opacity 0.4s ease;
        }
        .at-discord-widget-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
          gap: 0.5rem;
        }
        .at-discord-glow {
          position: absolute;
          width: 140%;
          height: 140%;
          background: radial-gradient(circle, rgba(88, 101, 242, 0.12) 0%, transparent 70%);
          z-index: 1;
          filter: blur(40px);
        }
        @media (max-width: 900px) {
          .at-discord-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .at-discord-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .at-discord-perks {
            justify-content: center;
          }
          .at-discord-widget-wrap {
            max-width: 100%;
          }
          .at-discord-widget-iframe {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
