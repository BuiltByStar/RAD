import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/sections";
import { aboutSummary, igniteSchedule, orgTimeline, orgValues } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "Identity, milestones, and the operating standard behind RAD Esports."
};

export default function AboutPage() {
  return (
    <PageShell
      variant="about"
      eyebrow="About RAD"
      title="Built to compete. Designed to scale."
      description="RAD needs to read like a serious modern organization: championship-proven, visually disciplined, and structured for more than a single season."
      heroImage="/assets/RadBannerNewTest300ppi.png"
      status="World title secured // EMEA pressure-tested"
      note={
        <div className="rad-subpage-note__stack">
          <div>
            <span className="rad-subpage-note__label">Primary Division</span>
            <strong>Marvel Rivals</strong>
          </div>
          <div>
            <span className="rad-subpage-note__label">Operating Region</span>
            <strong>EMEA / Global</strong>
          </div>
        </div>
      }
    >
      <section className="rad-subpage-section">
        <div className="container">
          <SectionHeading
            eyebrow="Identity"
            title="An org story with proof behind it."
            description="The site should explain who RAD is without reading like filler copy. The tone needs to stay competitive, credible, and brand-ready."
          />

          <div className="rad-subpage-grid rad-subpage-grid--2">
            <article className="rad-subpage-card rad-subpage-card--lead">
              <p className="rad-subpage-body rad-subpage-body--large">{aboutSummary}</p>
            </article>

            <div className="rad-subpage-stack">
              <article className="rad-subpage-card">
                <p className="rad-subpage-card__eyebrow">Competitive Position</p>
                <h3 className="rad-subpage-card__title">Championship-standard operation.</h3>
                <p className="rad-subpage-body">
                  RAD is already anchored by meaningful results, which lets the brand speak with confidence instead of launch-stage exaggeration.
                </p>
              </article>
              <article className="rad-subpage-card">
                <p className="rad-subpage-card__eyebrow">Brand Direction</p>
                <h3 className="rad-subpage-card__title">Aggressive, clean, and scalable.</h3>
                <p className="rad-subpage-body">
                  The org identity is meant to grow into new divisions, future activations, and a stronger editorial presence without changing its visual core.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="rad-subpage-section rad-subpage-section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Standards"
            title="The values that shape the public product."
            description="A strong esports site needs to communicate competitive standards and organizational intent, not just show results."
          />

          <div className="rad-subpage-grid rad-subpage-grid--4">
            {orgValues.map((value) => (
              <article key={value.title} className="rad-subpage-card">
                <span className="rad-subpage-icon" aria-hidden="true">
                  {value.icon}
                </span>
                <h3 className="rad-subpage-card__title">{value.title}</h3>
                <p className="rad-subpage-body">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rad-subpage-section">
        <div className="container">
          <SectionHeading
            eyebrow="Timeline"
            title="How RAD established credibility."
            description="This keeps the story chronological and readable without turning the page into a text wall."
          />

          <div className="rad-timeline">
            {orgTimeline.map((event) => (
              <article key={`${event.date}-${event.title}`} className="rad-timeline__item">
                <p className="rad-timeline__date">{event.date}</p>
                <div className="rad-timeline__body">
                  <h3 className="rad-subpage-card__title">{event.title}</h3>
                  <p className="rad-subpage-body">{event.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rad-subpage-section rad-subpage-section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Roadmap"
            title="Structured for the next competitive cycle."
            description="This gives the about page a forward-looking layer instead of ending only on past results."
          />

          <div className="rad-subpage-grid rad-subpage-grid--3">
            {igniteSchedule.map((item, index) => (
              <article key={`${item.stage}-${item.dates}`} className="rad-subpage-card rad-subpage-card--compact">
                <p className="rad-subpage-card__eyebrow">Stage {String(index + 1).padStart(2, "0")}</p>
                <h3 className="rad-subpage-card__title">{item.stage}</h3>
                <p className="rad-subpage-body">{item.dates}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
