"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ImmersiveHudProps {
  activeIndex: number;
  totalWorlds: number;
}

export function ImmersiveHud({ activeIndex, totalWorlds }: ImmersiveHudProps) {
  const worlds = [
    { title: "THE CORE", subtitle: "Organization & Culture", action: "About RAD", href: "/about" },
    { title: "VANGUARD", subtitle: "Elite Esports Rosters", action: "View Roster", href: "/roster" },
    { title: "MEDIA", subtitle: "Content & Broadcasts", action: "Watch Content", href: "/content" },
    { title: "ALLIANCES", subtitle: "Partners & Activations", action: "Connect", href: "/contact" },
  ];

  const currentWorld = worlds[activeIndex] || worlds[0];

  return (
    <div className="hud-overlay">
      {/* Top Left Logo (replaces SiteHeader on Home) */}
      <div className="hud-logo">
        <img src="/assets/RadNewLogoWordmarkWhite.png" alt="RAD Esports" />
      </div>

      {/* Instructional text */}
      <div className="hud-instructions">
        <span>DRAG OR USE ARROWS</span>
        <br />
        <span className="hud-instructions-sub">TO NAVIGATE</span>
      </div>

      {/* Center Left: Active World Info */}
      <div className="hud-info">
        <motion.p
          key={`sub-${activeIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hud-kicker"
        >
          {currentWorld.subtitle}
        </motion.p>
        
        <motion.h2
          key={`title-${activeIndex}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="hud-title"
        >
          {currentWorld.title}
        </motion.h2>

        <motion.div
          key={`btn-${activeIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href={currentWorld.href} className="btn btn-primary hud-action">
            {currentWorld.action}
          </Link>
        </motion.div>
      </div>

      {/* Bottom Navigation Dots */}
      <div className="hud-pagination">
        {worlds.map((w, idx) => (
          <div
            key={idx}
            className={`hud-dot ${idx === activeIndex ? "hud-dot-active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
