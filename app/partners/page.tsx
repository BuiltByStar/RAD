import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardBody,
  CardEyebrow,
  CardGrid,
  CardTitle,
  Container,
  Section,
  SectionHeading
} from "@/components/ui";
import { partners } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Activations",
  description: "RAD's public-facing page for sponsorships, campaigns, and branded activations."
};

const processSteps = [
  {
    label: "01 // Brief",
    title: "Find the fit.",
    description:
      "The best work starts with a brand, audience, and competitive angle that make sense together."
  },
  {
    label: "02 // Concept",
    title: "Build the idea.",
    description:
      "RAD packages competition, content, and community into a campaign people can actually feel."
  },
  {
    label: "03 // Launch",
    title: "Launch it clean.",
    description:
      "Campaigns should move through roster, media, social, and community without feeling forced."
  }
];

export default function PartnersPage() {
  return (
    <PageShell
      variant="partners"
      eyebrow="Activations"
      title="Brand fit."
      description="RAD is open to partners that match competitive credibility, creative work, and long-term growth."
      heroImage="/assets/RadBanner1920_1080.png"
      status="Open to partners"
    >
      <Section padding="sm">
        <Container>
          <SectionHeading
            eyebrow="Positioning"
            title="Real lanes, no fake wall."
            description="RAD can pitch clear partner work without pretending sponsors already exist."
            actionHref="/contact"
            actionLabel="Contact RAD"
          />

          <CardGrid cols={3}>
            {processSteps.map((step) => (
              <Card key={step.title} spotlight className="min-h-[230px]">
                <CardEyebrow>{step.label}</CardEyebrow>
                <CardTitle size="sm">{step.title}</CardTitle>
                <CardBody>{step.description}</CardBody>
              </Card>
            ))}
          </CardGrid>
        </Container>
      </Section>

      <Section padding="sm" className="bg-white/[.015]">
        <Container>
          <SectionHeading
            eyebrow="Available Angles"
            title="What fits RAD."
          />

          <CardGrid cols={3}>
            {partners.map((partner) => (
              <Card key={partner.name} tone="tall" spotlight className="flex flex-col">
                <CardEyebrow>{partner.tier}</CardEyebrow>
                <CardTitle size="sm">{partner.name}</CardTitle>
                <CardBody>{partner.description}</CardBody>
                <Link
                  href={partner.href}
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-rad-hi)] transition-colors hover:text-white"
                >
                  Start the conversation
                  <span aria-hidden>→</span>
                </Link>
              </Card>
            ))}
          </CardGrid>
        </Container>
      </Section>
    </PageShell>
  );
}
