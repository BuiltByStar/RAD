import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/sections";
import { players, staff, teams } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Roster",
  description: "The current competitive core, roster depth, and support structure behind RAD."
};

export default function RosterPage() {
  const team = teams[0];
  const teamRoster = players.filter((player) => player.group === team.name);
  const supportStaff = staff.filter(
    (member) => member.group === "Competitive" || member.group === "Operations"
  );

  return (
    <PageShell
      variant="roster"
      eyebrow="Roster"
      title="The championship core."
      description="The roster page should feel like a serious competitive surface: clear lineup hierarchy, useful player detail, and visible support around the team."
      heroImage="/assets/RadPlayerBannerPNG8.png"
      status={team.status}
      note={
        <div className="rad-subpage-note__stack">
          <div>
            <span className="rad-subpage-note__label">Featured Division</span>
            <strong>{team.name}</strong>
          </div>
          <div>
            <span className="rad-subpage-note__label">Live Status</span>
            <strong>Active lineup</strong>
          </div>
        </div>
      }
    >
      <section className="rad-subpage-section">
        <div className="container">
          <SectionHeading
            eyebrow="Division Overview"
            title={`${team.name} is the current front line.`}
            description={team.description}
          />

          <div className="rad-subpage-grid rad-subpage-grid--3">
            <article className="rad-subpage-card rad-subpage-card--metric" data-reveal="true" data-delay="1">
              <p className="rad-subpage-metric">{teamRoster.length}</p>
              <p className="rad-subpage-card__eyebrow">Active Players</p>
            </article>
            <article className="rad-subpage-card rad-subpage-card--metric" data-reveal="true" data-delay="2">
              <p className="rad-subpage-metric">01</p>
              <p className="rad-subpage-card__eyebrow">World Title</p>
            </article>
            <article className="rad-subpage-card rad-subpage-card--metric" data-reveal="true" data-delay="3">
              <p className="rad-subpage-metric">01</p>
              <p className="rad-subpage-card__eyebrow">Regional Title</p>
            </article>
          </div>
        </div>
      </section>

      <section className="rad-subpage-section rad-subpage-section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Players"
            title="Seven names carrying the current standard."
            description="These cards are built to handle richer media and profiles later, but they already communicate role, specialties, and player identity clearly."
          />

          <div className="rad-subpage-grid rad-subpage-grid--3">
            {teamRoster.map((player) => (
              <article key={player.slug} id={player.slug} className="rad-player-card" data-reveal="true">
                <div className="rad-player-card__top">
                  <p className="rad-subpage-card__eyebrow">{player.role}</p>
                  {typeof player.number === "number" ? (
                    <span className="rad-player-card__index">#{String(player.number).padStart(2, "0")}</span>
                  ) : null}
                </div>

                <div className="rad-player-card__body">
                  <h3 className="rad-subpage-card__title">{player.name}</h3>
                  <p className="rad-player-card__descriptor">{player.descriptor}</p>
                  <p className="rad-subpage-body">{player.bio ?? player.descriptor}</p>
                </div>

                {player.specialties?.length ? (
                  <div className="rad-chip-row">
                    {player.specialties.slice(0, 3).map((specialty) => (
                      <span key={specialty} className="rad-chip">
                        {specialty}
                      </span>
                    ))}
                  </div>
                ) : null}

                {player.socials?.length ? (
                  <div className="rad-subpage-links">
                    {player.socials.map((social) => (
                      <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                        {social.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rad-subpage-section">
        <div className="container">
          <SectionHeading
            eyebrow="Support System"
            title="Management and coaching behind the lineup."
            description="The page reads stronger when it shows the competitive structure around the roster instead of treating the team like a standalone list of aliases."
            actionHref="/staff"
            actionLabel="Open staff page"
          />

          <div className="rad-subpage-grid rad-subpage-grid--3">
            {supportStaff.map((member) => (
              <article key={member.slug} className="rad-subpage-card" data-reveal="true">
                <p className="rad-subpage-card__eyebrow">{member.group}</p>
                <h3 className="rad-subpage-card__title">{member.name}</h3>
                <p className="rad-player-card__descriptor">{member.role}</p>
                <p className="rad-subpage-body">{member.bio ?? member.descriptor}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
