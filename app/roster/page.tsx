import type { Metadata } from "next";

import { players, teams } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Roster",
  description: "RAD's featured competitive lineup, active players, and championship core."
};

export default function RosterPage() {
  const team = teams[0];
  const teamRoster = players.filter((player) => player.group === team.name);

  return (
    <main className="cinematic-main">
      <section className="cinematic-hero">
        <div 
          className="cinematic-hero-bg" 
          style={{ backgroundImage: "url('/assets/RadPlayerBannerPNG8.png')" }} 
        />
        <div className="cinematic-hero-overlay" />
        <div className="cinematic-hero-content">
          <p className="cinematic-eyebrow">Live Roster</p>
          <h1 className="cinematic-title">The Championship Lineup.</h1>
          <p className="cinematic-desc">
            RAD's primary title contenders, world-class individual talent, and the backbone of the organization's competitive presence.
          </p>
        </div>
      </section>

      <section className="cinematic-section">
        <span className="cinematic-item-eyebrow">Featured Division</span>
        <h2 className="cinematic-item-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{team.name}</h2>
        <p className="cinematic-desc" style={{ marginBottom: '4rem' }}>{team.description}</p>
        
        <div className="cinematic-roster-grid">
          {teamRoster.map((player) => (
            <div key={player.name} className="cinematic-roster-card">
              <div 
                className="cinematic-roster-bg" 
                style={{ backgroundImage: `url('/assets/RadPlayerBannerPNG8.png')` }} 
              />
              <div className="cinematic-roster-content">
                <p className="cinematic-roster-role">{player.role}</p>
                <h3 className="cinematic-roster-name">{player.name}</h3>
                <p className="cinematic-item-desc" style={{ fontSize: '0.8rem', opacity: 0.8 }}>{player.descriptor}</p>
                
                {player.socials?.length ? (
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                    {player.socials.map((social) => (
                      <a key={social.label} href={social.href} style={{ color: 'var(--red)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }} target="_blank" rel="noopener noreferrer">
                        {social.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
