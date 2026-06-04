import type { Metadata } from "next";

import { PartnerLogoWall } from "@/components/partners/partner-wall";
import { PageShell } from "@/components/page-shell";
import { PageRail, PageRailSection } from "@/components/ui";
import { getManagedPartnersState } from "@/lib/partners-data.server";

export const metadata: Metadata = {
  title: "Partners",
  description: "RAD Esports partners."
};

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const { partners } = await getManagedPartnersState();

  return (
    <PageShell variant="partners" hideHero eyebrow="Partners" title="Partners" route="/partners">
      <PageRail className="pb-16 sm:pb-20">
        <PageRailSection className="flex min-h-[70vh] items-center justify-center py-16 md:py-20">
          <PartnerLogoWall partners={partners} />
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
