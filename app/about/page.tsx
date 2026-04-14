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
      title="Pressure made the identity."
      description="RAD turned heads early with real wins and a clear point of view. The org is being built to grow into new titles, bigger stories, and stronger stages without losing its edge."
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
            description="RAD did not wait for an invitation to matter. The identity already has championships behind it, which gives the brand a real foundation."
          />

          <div className="rad-subpage-grid rad-subpage-grid--2">
            <article className="rad-subpage-card rad-subpage-card--lead" data-reveal="true" data-delay="1">
              <p className="rad-subpage-body rad-subpage-body--large">{aboutSummary}</p>
            </article>

            <div className="rad-subpage-stack" data-reveal="true" data-delay="2">
              <article className="rad-subpage-card">
                <p className="rad-subpage-card__eyebrow">Competitive Position</p>
                <h3 className="rad-subpage-card__title">Pressure-tested on the biggest stages.</h3>
                <p className="rad-subpage-body">
                  The public identity works because there are real results underneath it, not because the site is trying to oversell the org.
                </p>
              </article>
              <article className="rad-subpage-card">
                <p className="rad-subpage-card__eyebrow">Brand Direction</p>
                <h3 className="rad-subpage-card__title">A brand built to move across titles.</h3>
                <p className="rad-subpage-body">
                  RAD needs to stay recognisable whether it is presenting a roster, an activation, or the next division added to the org.
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
            description="Results matter, but the long-term standard is what turns a winning roster into a real organization."
          />

          <div className="rad-subpage-grid rad-subpage-grid--4">
            {orgValues.map((value) => (
              <article key={value.title} className="rad-subpage-card" data-reveal="true">
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
            description="The key moments below show how the org earned credibility early and why the brand already carries weight."
          />

          <div className="rad-timeline">
            {orgTimeline.map((event) => (
              <article key={`${event.date}-${event.title}`} className="rad-timeline__item" data-reveal="true">
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
            description="The story does not stop at titles already won. The next stage is about expanding the org without lowering the standard."
          />

          <div className="rad-subpage-grid rad-subpage-grid--3">
            {igniteSchedule.map((item, index) => (
              <article key={`${item.stage}-${item.dates}`} className="rad-subpage-card rad-subpage-card--compact" data-reveal="true">
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
