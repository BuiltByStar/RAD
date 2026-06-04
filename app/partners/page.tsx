import type { Metadata } from "next";
import Link from "next/link";

import { PartnerWall } from "@/components/partners/partner-wall";
import { PageShell } from "@/components/page-shell";
import { PageRail, PageRailSection } from "@/components/ui";
import { getManagedPartnersState } from "@/lib/partners-data.server";

export const metadata: Metadata = {
  title: "Partners",
  description: "RAD Esports partner tiers and brand activation slots."
};

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const { partners } = await getManagedPartnersState();

  return (
    <PageShell variant="partners" hideHero eyebrow="Partners" title="Partners" route="/partners">
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection className="py-6 md:py-8">
          <div className="mb-10 max-w-xl md:mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-blood)]">Partners</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3rem)] font-extrabold uppercase leading-[0.95] text-white">
              Brand slots
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500 sm:text-base">
              Primary, official, and supporting tiers for campaigns tied to competitive content and community.
            </p>
          </div>

          <PartnerWall partners={partners} />

          <div className="mt-10 flex flex-col gap-4 border-t border-neutral-900 pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-12">
            <p className="text-sm text-neutral-500">Interested in a partnership slot?</p>
            <Link
              href="/contact"
              className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-blood)] transition-opacity hover:opacity-70"
            >
              Contact the team →
            </Link>
          </div>
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
