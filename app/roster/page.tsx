import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { players, teams } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Roster",
  description: "RAD's featured competitive lineup, active players, and championship core."
};

export default function RosterPage() {
  const team = teams[0];
  const teamRoster = players.filter((player) => player.group === team.name);

  return (
    <PageShell
      eyebrow="Live Roster"
      title="The championship lineup."
      description="RAD's primary title contenders, world-class individual talent, and the backbone of the organization's competitive presence."
      background="black"
      heroType="roster"
      heroImage="/assets/RadPlayerBannerPNG8.png"
    >
      <section className="section">
        <div className="container team-page-grid">
          <article className="team-overview-card">
            <div className="card-topline">
              <span className="card-status">{team.status}</span>
              <span>Featured Division</span>
            </div>
            <h2 className="team-overview-title">{team.name}</h2>
            <p className="section-copy">{team.description}</p>
          </article>

          <div className="team-note-stack">
            <article className="team-note-card">
              <p className="eyebrow">Competitive Identity</p>
              <p>Frontline stability, flexible duelists, and support players built for high-pressure matches.</p>
            </article>
            <article className="team-note-card">
              <p className="eyebrow">RAD Standard</p>
              <p>World results first, strong presentation second, and a structure that can expand cleanly as RAD enters more titles.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Roster</p>
              <h2>Current lineup.</h2>
            </div>
            <div className="section-meta">
              <p className="section-copy">
                This page centers the current championship core without pretending RAD begins and ends with one game forever.
              </p>
            </div>
          </div>

          <div className="team-roster-grid">
            {teamRoster.map((player) => (
              <article key={player.name} className="rad-card team-player-card">
                <div className="rad-card__body">
                  <div className="card-topline">
                    <span>{player.group}</span>
                    <span>{player.role}</span>
                  </div>
                  <h3 className="card-title">{player.name}</h3>
                  <p className="card-desc">{player.descriptor}</p>
                  {player.socials?.length ? (
                    <div className="team-player-links">
                      {player.socials.map((social) => (
                        <a key={social.label} href={social.href}>
                          {social.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </PageShell>
  );
}
