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
  NoteStack,
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
    title: "Start with the right fit.",
    description:
      "Every activation starts by making sure the brand, audience, and competitive surface actually line up."
  },
  {
    label: "02 // Concept",
    title: "Build around competition and content.",
    description:
      "RAD's best work sits where competitive credibility meets clean creative execution and brand storytelling."
  },
  {
    label: "03 // Launch",
    title: "Roll the activation through real surfaces.",
    description:
      "Strong campaigns move through roster, content, social, and community surfaces without needing a redesign every time."
  }
];

export default function PartnersPage() {
  return (
    <PageShell
      variant="partners"
      eyebrow="Activations"
      title="Open for the right brand fit."
      description="RAD is open to brand relationships that fit competitive credibility, strong creative execution, and long-term growth."
      heroImage="/assets/RadBanner1920_1080.png"
      status="Partnership inventory // available"
      note={
        <NoteStack
          items={[
            { label: "Open Categories", value: "Apparel / Peripherals / Campaigns" },
            { label: "Best Contact", value: "Business inquiries" }
          ]}
        />
      }
    >
      <Section padding="sm">
        <Container>
          <SectionHeading
            eyebrow="Positioning"
            title="Brand-ready without pretending the sponsor wall already exists."
            description="RAD can present a clear activation case right now without leaning on fake sponsor walls or manufactured proof."
            actionHref="/contact"
            actionLabel="Contact RAD"
          />

          <CardGrid cols={3}>
            {processSteps.map((step) => (
              <Card key={step.title}>
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
            title="What RAD can package cleanly."
            description="These lanes show the kinds of work RAD can support now, not invented sponsors that do not exist."
          />

          <CardGrid cols={3}>
            {partners.map((partner) => (
              <Card key={partner.name} tone="tall" className="flex flex-col">
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
