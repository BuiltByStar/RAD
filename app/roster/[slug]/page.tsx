import Link from "next/link";
import { notFound } from "next/navigation";
import { getPersonBySlug, getAllPersonSlugs, teams } from "@/lib/site-data";

export function generateStaticParams() {
  return getAllPersonSlugs().map((slug) => ({ slug }));
}

export default async function MemberDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) notFound();

  const team = teams[0];

  return (
    <main className="page-main">
      {/* ── Hero Header ────────────────────────────────────────── */}
      <section className="at-member-hero">
        <div className="container">
          <Link href="/roster" className="at-link-arrow" style={{ marginBottom: "2rem", display: "inline-flex" }}>
            ← Back to Roster
          </Link>
          <div className="at-member-hero-grid">
            <div className="at-member-hero-visual at-glass at-hud-border">
              <div className="at-member-hero-glow" />
              <span className="at-member-hero-initials">{person.name.slice(0, 2).toUpperCase()}</span>
              {person.number && (
                <span className="at-member-hero-number">#{String(person.number).padStart(2, "0")}</span>
              )}
            </div>
            <div className="at-member-hero-info">
              <p className="at-section-label">{person.role}</p>
              <h1 className="at-member-hero-name">{person.name}</h1>
              {person.realName && (
                <p className="at-member-hero-realname">{person.realName}</p>
              )}
              {person.rank && (
                <p className="at-member-hero-rank">
                  <span className="at-live-dot" style={{ background: "var(--red)" }} />
                  {person.rank}
                </p>
              )}
              {person.tags && person.tags.length > 0 && (
                <div className="at-member-hero-tags">
                  {person.tags.map((tag) => (
                    <span key={tag} className="at-roster-card-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bio / About ────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="at-member-detail-grid">
            <div>
              <p className="at-section-label">About</p>
              <p className="at-member-bio">
                {person.bio || person.descriptor}
              </p>
            </div>

            <div className="at-member-sidebar">
              {/* Meta */}
              <div className="at-member-meta-block at-glass at-hud-border">
                <p className="at-section-label">Details</p>
                <div className="at-member-meta-row">
                  <span>Role</span>
                  <strong>{person.role}</strong>
                </div>
                <div className="at-member-meta-row">
                  <span>Team</span>
                  <strong>{person.group}</strong>
                </div>
                {person.rank && (
                  <div className="at-member-meta-row">
                    <span>Title</span>
                    <strong>{person.rank}</strong>
                  </div>
                )}
              </div>

              {/* Specialties */}
              {person.specialties && person.specialties.length > 0 && (
                <div className="at-member-meta-block at-glass at-hud-border">
                  <p className="at-section-label">Specialties</p>
                  <div className="at-member-specialties">
                    {person.specialties.map((s) => (
                      <span key={s} className="at-roster-card-tag">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Socials */}
              {person.socials && person.socials.length > 0 && (
                <div className="at-member-meta-block at-glass at-hud-border">
                  <p className="at-section-label">Socials</p>
                  <div className="at-member-socials">
                    {person.socials.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="at-link-arrow">
                        {s.label} →
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Reference */}
              <Link href="/teams" className="at-member-team-ref at-glass at-hud-border">
                <p className="at-section-label">Organization</p>
                <strong>{team.name}</strong>
                <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{team.status}</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
