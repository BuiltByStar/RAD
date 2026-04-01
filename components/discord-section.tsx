"use client";

import { discordInviteUrl } from "@/lib/site-data";
import { ScrollReveal } from "./scroll-effects";

export function DiscordSection() {
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
              <div className="at-discord-card">
                <div className="at-discord-card-inner">
                  <div className="at-discord-card-top">
                    <div className="at-discord-logo">
                         <svg viewBox="0 0 71 55" fill="currentColor">
                           <path d="M60.1 4.9A58.55 58.55 0 0 0 45.6.3a40.85 40.85 0 0 0-1.85 3.8 54.15 54.15 0 0 0-16.4 0A36.81 36.81 0 0 0 25.5.3 58.36 58.36 0 0 0 11 4.9C1.58 18.77-1 32.3.65 45.62a58.82 58.82 0 0 0 17.9 9.07 43.8 43.8 0 0 0 3.8-6.2 38.14 38.14 0 0 1-6-2.88 28.6 28.6 0 0 0 1.45-1.15 41.66 41.66 0 0 0 35.8 0c.47.4.95.78 1.45 1.15a38.25 38.25 0 0 1-6 2.89 43.19 43.19 0 0 0 3.8 6.19 58.61 58.61 0 0 0 17.9-9.07C72.16 32.17 68.62 18.68 60.1 4.9ZM23.73 37.73c-3.55 0-6.46-3.25-6.46-7.25s2.84-7.25 6.46-7.25c3.61 0 6.52 3.25 6.46 7.25 0 4-2.85 7.25-6.46 7.25Zm23.54 0c-3.55 0-6.46-3.25-6.46-7.25s2.84-7.25 6.46-7.25c3.61 0 6.52 3.25 6.46 7.25 0 4-2.85 7.25-6.46 7.25Z" />
                         </svg>
                    </div>
                    <div className="at-discord-server-info">
                        <strong>RAD Esports</strong>
                        <span>Official Community</span>
                    </div>
                  </div>
                  <div className="at-discord-card-stats">
                    <div className="stat">
                        <span className="dot online"></span>
                        <strong>1.2k+</strong> Online
                    </div>
                    <div className="stat">
                        <span className="dot members"></span>
                        <strong>15.4k+</strong> Members
                    </div>
                  </div>
                  <div className="at-discord-card-wave"></div>
                </div>
              </div>
              <div className="at-discord-glow"></div>
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

        .at-discord-card {
          width: 100%;
          max-width: 380px;
          aspect-ratio: 16/10;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(88, 101, 242, 0.2);
          border-radius: 12px;
          padding: 2rem;
          position: relative;
          z-index: 2;
          backdrop-filter: blur(20px);
          overflow: hidden;
        }

        .at-discord-card-inner {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .at-discord-card-top {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .at-discord-logo {
          width: 54px;
          height: 54px;
          background: var(--discord);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
        }

        .at-discord-server-info strong {
          display: block;
          font-size: 1.4rem;
          color: white;
        }

        .at-discord-server-info span {
          font-size: 0.75rem;
          color: var(--discord-hi);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 700;
        }

        .at-discord-card-stats {
          display: flex;
          gap: 1.5rem;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--muted);
          font-family: var(--font-body);
        }

        .stat strong { color: white; }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot.online { background: #23a559; box-shadow: 0 0 10px #23a559; }
        .dot.members { background: rgba(255,255,255,0.2); }

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
        }
      `}</style>
    </section>
  );
}
