"use client";

import Link from "next/link";
import { ScrollReveal } from "./scroll-effects";

const navItems = [
  { label: "Teams", path: "/teams", desc: "Active Roster & Titles", icon: "⚔️" },
  { label: "Content", path: "/content", desc: "Latest News & Media", icon: "📺" },
  { label: "About", path: "/about", desc: "Organization History", icon: "🏢" },
  { label: "Staff", path: "/staff", desc: "Behind the Scenes", icon: "👥" },
  { label: "Contact", path: "/contact", desc: "Partner with RAD", icon: "✉️" },
];

export function NavHub() {
  return (
    <section className="at-nav-hub-section">
      <div className="container">
        <ScrollReveal>
          <div className="at-nav-grid">
            {navItems.map((item, idx) => (
              <Link 
                key={item.label} 
                href={item.path} 
                className="at-nav-tile at-glass at-hud-border"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="at-nav-tile-inner">
                  <span className="at-nav-icon">{item.icon}</span>
                  <div className="at-nav-info">
                    <h3 className="at-nav-label at-glitch-text" data-text={item.label}>
                      {item.label}
                    </h3>
                    <p className="at-nav-desc">{item.desc}</p>
                  </div>
                  <div className="at-nav-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14m-7-7 7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <style jsx>{`
        .at-nav-hub-section {
          padding: 4rem 0 6rem;
          position: relative;
        }

        .at-nav-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .at-nav-tile {
          display: block;
          padding: 2rem;
          border-radius: 4px;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          text-decoration: none;
          color: inherit;
          overflow: hidden;
        }

        .at-nav-tile:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--red);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(230, 0, 0, 0.1);
        }

        .at-nav-tile-inner {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          position: relative;
        }

        .at-nav-icon {
          font-size: 2rem;
          opacity: 0.8;
          filter: grayscale(1);
          transition: all 0.3s ease;
        }

        .at-nav-tile:hover .at-nav-icon {
          filter: grayscale(0);
          opacity: 1;
          transform: scale(1.1);
        }

        .at-nav-info {
          flex: 1;
        }

        .at-nav-label {
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
          line-height: 1;
        }

        .at-nav-desc {
          font-size: 0.85rem;
          color: var(--muted);
          font-family: var(--font-body);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 700;
        }

        .at-nav-arrow {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
          color: var(--red);
        }

        .at-nav-tile:hover .at-nav-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 600px) {
          .at-nav-tile {
            padding: 1.5rem;
          }
          .at-nav-label {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}
