import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardBody,
  CardEyebrow,
  CardGrid,
  CardTitle,
  PageRail,
  PageRailSection
} from "@/components/ui";
import { partners } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Partners",
  description: "Partnership opportunities, campaigns, and branded work for RAD."
};

export default function PartnersPage() {
  return (
    <PageShell
      variant="partners"
      compact
      eyebrow="Partners"
      title="Partners"
      description="Campaigns and activations that fit RAD's team and audience."
    >
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection className="py-8 md:py-10">
          <CardGrid cols={3}>
            {partners.map((partner) => (
              <Card key={partner.name} tone="tall" accent={false} className="flex flex-col">
                <CardEyebrow>{partner.tier}</CardEyebrow>
                <CardTitle size="sm">{partner.name}</CardTitle>
                <CardBody>{partner.description}</CardBody>
                <Link
                  href={partner.href}
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-blood)] transition-opacity hover:opacity-70"
                >
                  Contact
                  <span aria-hidden>→</span>
                </Link>
              </Card>
            ))}
          </CardGrid>
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
