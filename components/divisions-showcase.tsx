"use client";

import Link from "next/link";
import { useState } from "react";
import type { Team } from "@/lib/site-data";

const DIVISION_BG: Record<string, string> = {
  "marvel-rivals": "/assets/RadRivals_Wallpaper_Red.png",
  valorant: "/assets/RadRivals_Wallpaper_Black.png",
  "creator-division": "/assets/RadRivals_Wallpaper_Black.png"
};

export function DivisionsShowcase({ teams }: { teams: Team[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="at-divisions">
      {teams.map((team) => (
        <div
          key={team.slug}
          className={`at-divisions-bg${hovered === team.slug ? " is-active" : ""}`}
          style={{
            backgroundImage: `url(${DIVISION_BG[team.slug] ?? "/assets/RadRivals_Wallpaper_Black.png"})`
          }}
        />
      ))}
      <div className="at-divisions-overlay" />

      <div className="container">
        <p className="at-section-label">Active Divisions</p>
        <div className="at-divisions-list">
          {teams.map((team, i) => (
            <Link
              key={team.slug}
              href="/roster"
              className={`at-division-row${hovered === team.slug ? " is-active" : ""}${hovered && hovered !== team.slug ? " is-dimmed" : ""}`}
              onMouseEnter={() => setHovered(team.slug)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="at-division-num">0{i + 1}</span>
              <h2 className="at-division-name">{team.name}</h2>
              <span className="at-division-game">{team.game}</span>
              <span className="at-division-status">{team.status}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
