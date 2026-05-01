import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { Container, LegalCard, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for the RAD Esports website."
};

const privacyBlocks = [
  {
    label: "01 // Collection",
    title: "What gets collected",
    copy:
      "RAD collects information submitted through website forms, account flows, or direct contact when that information is needed to respond or operate the service."
  },
  {
    label: "02 // Use",
    title: "How information is used",
    copy:
      "Collected information is used to provide responses, operate the site, improve performance, and support administrative or security-related communication."
  },
  {
    label: "03 // Sharing",
    title: "When information is shared",
    copy:
      "RAD does not sell personal information. Data may be processed by service providers acting on RAD's behalf where required for site operation or communications."
  }
];

export default function PrivacyPage() {
  return (
    <PageShell
      variant="legal"
      eyebrow="Legal"
      title="Privacy policy."
      description="How RAD handles information submitted through the site."
      heroImage="/assets/RadRivals_Wallpaper_Black.png"
      status="Current"
    >
      <Section padding="sm">
        <Container size="md">
          <div className="grid gap-4 sm:gap-5">
            {privacyBlocks.map((block) => (
              <LegalCard key={block.title} label={block.label} title={block.title} copy={block.copy} />
            ))}
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
