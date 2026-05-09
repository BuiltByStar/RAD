import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { Container, LegalCard, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms",
  description: "The rules for using the RAD website and connected services."
};

const termsBlocks = [
  {
    label: "01 // Use",
    title: "Use of the site",
    copy:
      "By accessing RAD's website or related public services, you agree to use them lawfully and in a way that does not interfere with platform stability, community safety, or organizational operations."
  },
  {
    label: "02 // IP",
    title: "Brand and content ownership",
    copy:
      "RAD branding, site visuals, editorial content, video, and related materials remain the property of RAD Esports unless otherwise stated."
  },
  {
    label: "03 // Conduct",
    title: "Community-facing behavior",
    copy:
      "Harassment, abuse, or behavior that compromises affiliated RAD spaces may result in restriction from site-connected services or community access."
  }
];

export default function TermsPage() {
  return (
    <PageShell
      variant="legal"
      eyebrow="Legal"
      title="Terms"
      description="The rules for using RAD's public website and connected services."
      heroImage="/assets/rad-bg-red.png"
      status="Active"
    >
      <Section padding="sm">
        <Container size="md">
          <div className="grid gap-4 sm:gap-5">
            {termsBlocks.map((block) => (
              <LegalCard key={block.title} label={block.label} title={block.title} copy={block.copy} />
            ))}
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
