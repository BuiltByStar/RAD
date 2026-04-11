import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { PartnerGrid, SectionHeading } from "@/components/sections";
import { activationsSummary, partners } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Activations",
  description: "RAD's brand-facing page for future activations, sponsorships, and campaign collaboration."
};

export default function PartnersPage() {
  return (
    <PageShell
      eyebrow="Activations"
      title="Open for the right brand partners."
      description="RAD does not need fake sponsor walls. This page exists to explain what is available now, what the org is built for, and where serious conversations should start."
      heroImage="/assets/RadBanner1920_1080.png"
      heroNote={
        <div className="rad-note-card">
          <p className="rad-kicker">Current state</p>
          <p className="rad-copy">
            No placeholder logos, no invented partners. Just a clear public entry point for brands, creators, and campaign teams.
          </p>
        </div>
      }
    >
      <section className="rad-section">
        <div className="container">
          <SectionHeading
            eyebrow="Overview"
            title="Brand-ready without pretending."
            description={activationsSummary}
            actionHref="/contact"
            actionLabel="Contact RAD"
          />
          <PartnerGrid items={partners} />
        </div>
      </section>
    </PageShell>
  );
}
