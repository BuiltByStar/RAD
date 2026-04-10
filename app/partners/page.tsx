import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { PartnerGrid, SectionHeading } from "@/components/sections";
import { partners } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Activations",
  description: "RAD's brand partnership, activation, and sponsorship entry point."
};

export default function PartnersPage() {
  return (
    <PageShell
      eyebrow="Activations"
      title="Open for the right partners."
      description="RAD does not need fake sponsor walls. This page should clearly communicate what kinds of collaborations are open right now."
      background="black"
      heroType="partners"
      heroImage="/assets/RadBanner1920_1080.png"
    >
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Sponsorship"
            title="Brand-ready without fake logos."
            description="RAD is currently positioning for activations, sponsorships, and creator-facing campaigns. This page works as an invitation, not a placeholder graveyard."
            actionHref="/contact"
            actionLabel="Contact RAD"
          />
          <PartnerGrid partners={partners} />
        </div>
      </section>
    </PageShell>
  );
}
