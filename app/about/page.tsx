import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import {
  RoadmapGrid,
  SectionHeading,
  TimelineList,
  ValuesGrid
} from "@/components/sections";
import {
  aboutSummary,
  igniteSchedule,
  orgTimeline,
  orgValues
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "The RAD Esports story, standards, roadmap, and competitive identity."
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About RAD"
      title="A competitive org with real standards."
      description="RAD is built for elite competition, high-output content, and the kind of public presentation that supports long-term growth."
      heroImage="/assets/RadBannerNewTest300ppi.png"
      heroNote={
        <div className="rad-note-card">
          <p className="rad-kicker">What matters</p>
          <p className="rad-copy">
            World title pedigree, EMEA success, scalable brand systems, and a public-facing identity that already feels bigger than one roster.
          </p>
        </div>
      }
    >
      <section className="rad-section">
        <div className="container">
          <SectionHeading
            eyebrow="Identity"
            title="RAD didn&apos;t wait for permission."
            description={aboutSummary}
            align="stacked"
          />
        </div>
      </section>

      <section className="rad-section rad-section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Pillars"
            title="Standards that shape the org."
            description="Competition, presentation, and long-term scalability are treated like shared operating principles, not optional extras."
          />
          <ValuesGrid values={orgValues} />
        </div>
      </section>

      <section className="rad-section">
        <div className="container">
          <SectionHeading
            eyebrow="Timeline"
            title="How RAD has moved so far."
            description="The timeline is short because the org has moved quickly. The important part is that the site tells that story clearly and without inflated claims."
          />
          <TimelineList items={orgTimeline} />
        </div>
      </section>

      <section className="rad-section rad-section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Roadmap"
            title="The current competitive runway."
            description="The roadmap keeps the flagship title visible without forcing the entire org to read like a single-game website."
          />
          <RoadmapGrid items={igniteSchedule} />
        </div>
      </section>
    </PageShell>
  );
}
