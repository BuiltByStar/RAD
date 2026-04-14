import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/sections";
import { partners } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Activations",
  description: "RAD's public-facing page for sponsorships, campaigns, and branded activations."
};

const processSteps = [
  {
    label: "01 // Brief",
    title: "Start with the right fit.",
    description:
      "The page should qualify serious brand interest without pretending there is already a full sponsor roster."
  },
  {
    label: "02 // Concept",
    title: "Build around competition and content.",
    description:
      "RAD's strongest value is the crossover between competitive credibility and an org identity that can support branded storytelling."
  },
  {
    label: "03 // Launch",
    title: "Roll the activation through real surfaces.",
    description:
      "Campaigns should be able to flow through the roster, content, community, and social channels without rebuilding the site around them."
  }
];

export default function PartnersPage() {
  return (
    <PageShell
      variant="partners"
      eyebrow="Activations"
      title="Open for the right brand fit."
      description="This page should position RAD as activation-ready without using fake sponsor walls or manufactured social proof."
      heroImage="/assets/RadBanner1920_1080.png"
      status="Partnership inventory // available"
      note={
        <div className="rad-subpage-note__stack">
          <div>
            <span className="rad-subpage-note__label">Open Categories</span>
            <strong>Apparel / Peripherals / Campaigns</strong>
          </div>
          <div>
            <span className="rad-subpage-note__label">Best Contact</span>
            <strong>Business inquiries</strong>
          </div>
        </div>
      }
    >
      <section className="rad-subpage-section">
        <div className="container">
          <SectionHeading
            eyebrow="Positioning"
            title="Brand-ready without pretending the sponsor wall already exists."
            description="This page is stronger when it clearly explains what RAD can support right now instead of filling space with fake logos."
            actionHref="/contact"
            actionLabel="Contact RAD"
          />

          <div className="rad-subpage-grid rad-subpage-grid--3">
            {processSteps.map((step) => (
              <article key={step.title} className="rad-subpage-card" data-reveal="true">
                <p className="rad-subpage-card__eyebrow">{step.label}</p>
                <h3 className="rad-subpage-card__title">{step.title}</h3>
                <p className="rad-subpage-body">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rad-subpage-section rad-subpage-section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Available Angles"
            title="What RAD can package cleanly."
            description="The offering cards are framed as collaboration lanes rather than imaginary existing sponsorships."
          />

          <div className="rad-subpage-grid rad-subpage-grid--3">
            {partners.map((partner) => (
              <article key={partner.name} className="rad-subpage-card rad-subpage-card--tall" data-reveal="true">
                <p className="rad-subpage-card__eyebrow">{partner.tier}</p>
                <h3 className="rad-subpage-card__title">{partner.name}</h3>
                <p className="rad-subpage-body">{partner.description}</p>
                <Link href={partner.href} className="rad-subpage-link">
                  Start the conversation
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
