"use client";

import Link from "next/link";
import { ScrollReveal } from "./scroll-effects";

const navItems = [
  { label: "About", path: "/about", desc: "Organization Story", icon: "🏢" },
  { label: "Roster", path: "/roster", desc: "Players & Staff", icon: "🎮" },
  { label: "Content", path: "/content", desc: "Videos & Streams", icon: "📺" },
  { label: "Staff", path: "/staff", desc: "Behind the Scenes", icon: "👥" },
  { label: "Partners", path: "/partners", desc: "Open for Activations", icon: "✦" },
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

    </section>
  );
}
