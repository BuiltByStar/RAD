import { PageShell } from "@/components/page-shell";
import { RosterCard } from "@/components/roster-card";
import { players, staff, teams } from "@/lib/site-data";

export default function RosterPage() {
  const team = teams[0];
  const activePlayers = players.filter((p) => !p.role.includes("Sub"));
  const subs = players.filter((p) => p.role.includes("Sub"));
  const coaches = staff.filter((s) => s.group === "Competitive");

  return (
    <PageShell
      eyebrow="Roster"
      title="The Squad."
      description={`${team.name} — ${team.status}. Built for the highest level of competitive play.`}
      background="red"
    >
      {/* ── Quick Stats ────────────────────────────────────────── */}
      <section className="section" style={{ paddingBottom: "2rem" }}>
        <div className="container">
          <div className="at-roster-stats-strip">
            <div className="at-roster-stat">
              <span className="at-roster-stat-value">{players.length}</span>
              <span className="at-roster-stat-label">Players</span>
            </div>
            <div className="at-roster-stat">
              <span className="at-roster-stat-value">{activePlayers.length}</span>
              <span className="at-roster-stat-label">Starters</span>
            </div>
            <div className="at-roster-stat">
              <span className="at-roster-stat-value">{subs.length}</span>
              <span className="at-roster-stat-label">Substitutes</span>
            </div>
            <div className="at-roster-stat">
              <span className="at-roster-stat-value">{coaches.length}</span>
              <span className="at-roster-stat-label">Coaching Staff</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Active Roster ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="at-section-row" style={{ marginBottom: "2rem" }}>
            <p className="at-section-label">Active Players</p>
            <span className="at-section-label" style={{ color: "var(--dim)" }}>
              {team.game}
            </span>
          </div>
          <div className="at-roster-card-grid">
            {activePlayers.map((player, i) => (
              <RosterCard key={player.slug} person={player} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Substitutes ────────────────────────────────────────── */}
      {subs.length > 0 && (
        <section className="section" style={{ paddingTop: "2rem" }}>
          <div className="container">
            <div className="at-section-row" style={{ marginBottom: "2rem" }}>
              <p className="at-section-label">Substitutes</p>
            </div>
            <div className="at-roster-card-grid">
              {subs.map((player, i) => (
                <RosterCard key={player.slug} person={player} index={activePlayers.length + i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Coaching & Support Staff ───────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="at-section-row" style={{ marginBottom: "2rem" }}>
            <p className="at-section-label">Coaching & Support</p>
          </div>
          <div className="at-roster-card-grid">
            {coaches.map((member, i) => (
              <RosterCard key={member.slug} person={member} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
