import { aboutSummary, staff, orgTimeline, orgValues, igniteSchedule } from "@/lib/site-data";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/sections";

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About RAD"
      title="The standard of excellence."
      description="World champions. EMEA title holders. Built from the ground up to redefine the competitive landscape."
      background="red"
      heroType="about"
    >
      {/* ── Identity ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Identity"
            title="RAD didn't wait for permission."
            description="A sharper look at the org's tone, titles, and the way RAD wants to be read across competition, content, and community."
          />
          <div className="at-about-split">
            <div className="at-about-copy">
              <p className="at-about-lead">
                {aboutSummary}
              </p>
            </div>
            <div className="grid-3 at-about-highlight-grid">
              <article className="rad-card at-glass at-hud-border">
                <div className="rad-card__body">
                  <h3 className="card-title">World Champions</h3>
                  <p className="card-desc">
                    RAD cemented its place as the inaugural Marvel Rivals Ignite:
                    Mid-Season World Champions.
                  </p>
                </div>
              </article>
              <article className="rad-card at-glass at-hud-border">
                <div className="rad-card__body">
                  <h3 className="card-title">EMEA Champions</h3>
                  <p className="card-desc">
                    The org most recently added the EMEA Regional Champions title
                    to its record.
                  </p>
                </div>
              </article>
              <article className="rad-card at-glass at-hud-border">
                <div className="rad-card__body">
                  <h3 className="card-title">#GoWild</h3>
                  <p className="card-desc">
                    You&apos;ve seen RAD do it before. Get ready to see it again.
                    Welcome to the wild.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values / Pillars ───────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Our Pillars"
            title="Standards that shape the org."
            description="The through-line across RAD's branding, roster culture, public voice, and the way the org carries itself."
          />
          <div className="at-values-grid">
            {orgValues.map((value) => (
              <div key={value.title} className="at-value-card at-glass at-hud-border">
                <span className="at-value-icon">{value.icon}</span>
                <h3 className="at-value-title">{value.title}</h3>
                <p className="at-value-desc">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Timeline"
            title="How RAD moved fast."
            description="The key competitive and organizational milestones that turned RAD from a new org into a title-winning brand."
          />
          <div className="at-timeline">
            {orgTimeline.map((event, i) => (
              <div key={i} className="at-timeline-item">
                <div className="at-timeline-marker">
                  <span className="at-timeline-dot" />
                  {i < orgTimeline.length - 1 && <span className="at-timeline-line" />}
                </div>
                <div className="at-timeline-content at-glass">
                  <span className="at-timeline-date">{event.date}</span>
                  <h4 className="at-timeline-title">{event.title}</h4>
                  <p className="at-timeline-desc">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roadmap ────────────────────────────────────────────── */}
      <section className="section bg-black/20">
        <div className="container">
          <SectionHeading
            eyebrow="2026 Roadmap"
            title="The road to Ignite."
            description="The full championship schedule for the upcoming season, from preseason qualifiers to the Grand Finals."
          />
          <div className="grid-3 at-roadmap-grid">
            {igniteSchedule.map((item, i) => (
              <div key={i} className="rad-card at-glass at-hud-border">
                <div className="rad-card__body">
                  <span className="at-timeline-date">{item.dates}</span>
                  <h3 className="card-title" style={{ marginTop: '0.5rem' }}>{item.stage}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership / Staff ─────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Leadership & Staff"
            title="The people behind the org."
            description="Operations, coaching, design, and social support are part of the same competitive system."
            actionHref="/staff"
            actionLabel="View all staff"
          />
          <div className="at-staff-about-grid">
            {staff.map((member) => (
              <div key={member.slug} className="at-staff-about-card at-glass at-hud-border">
                <div className="at-staff-about-header">
                  <strong>{member.name}</strong>
                  <span className="at-roster-card-tag">{member.group}</span>
                </div>
                <p className="at-staff-about-role">{member.role}</p>
                <p className="at-staff-about-bio">{member.descriptor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
