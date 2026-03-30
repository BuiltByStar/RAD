import { PageShell } from "@/components/page-shell";
import { players, staff, teams } from "@/lib/site-data";

export default function TeamsPage() {
  const team = teams[0];
  const teamRoster = players.filter((player) => player.group === team.name);
  const featuredStaff = staff.slice(0, 4);

  return (
    <PageShell
      eyebrow="Teams"
      title="Marvel Rivals."
      description="One division, full roster context, and the support structure behind it."
      background="black"
    >
      <section className="section">
        <div className="container ig-team-page-grid">
          <article className="ig-team-overview-card">
            <div className="ig-team-card-top">
              <span className="ig-badge">{team.status}</span>
              <span className="ig-team-title">{team.game}</span>
            </div>
            <h2>{team.name}</h2>
            <p>{team.description}</p>
          </article>

          <div className="ig-team-side-notes">
            <article className="ig-note-card">
              <span className="ig-note-label">Competitive Focus</span>
              <p>Built around disciplined frontline structure, flexible duelists, and high-trust support play.</p>
            </article>
            <article className="ig-note-card">
              <span className="ig-note-label">Org Standard</span>
              <p>World title results, regional control, and a content-first identity that still feels sharp.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="ig-section-head ig-section-head-page">
            <div>
              <p className="ig-section-label">Roster</p>
              <h2>Starting lineup.</h2>
            </div>
            <p className="ig-section-copy-page">
              The full roster now lives directly on the team page instead of behind a separate detour.
            </p>
          </div>

          <div className="ig-team-roster-grid">
            {teamRoster.map((player) => (
              <article key={player.name} className="ig-team-roster-card">
                <div className="ig-player-topline">
                  <span>{player.group}</span>
                  <span>{player.role}</span>
                </div>
                <h3>{player.name}</h3>
                <p>{player.descriptor}</p>
                {player.socials?.length ? (
                  <div className="ig-social-row">
                    {player.socials.map((social) => (
                      <a key={social.label} href={social.href}>
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

      <section className="section">
        <div className="container">
          <div className="ig-section-head ig-section-head-page">
            <div>
              <p className="ig-section-label">Staff</p>
              <h2>Support layer.</h2>
            </div>
            <p className="ig-section-copy-page">
              Design, operations, analytics, and coaching are part of the same competitive surface.
            </p>
          </div>

          <div className="ig-support-grid">
            {featuredStaff.map((member) => (
              <article key={member.name} className="ig-support-card">
                <span className="ig-note-label">{member.group}</span>
                <h3>{member.name}</h3>
                <strong>{member.role}</strong>
                <p>{member.descriptor}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
