import type { Metadata } from "next";
import Link from "next/link";

import { PartnerLogoWall } from "@/components/partners/partner-wall";
import { PageShell } from "@/components/page-shell";
import { Button, PageRail, PageRailSection } from "@/components/ui";
import { discordInviteUrl } from "@/lib/site-data";
import { getManagedPartnersState } from "@/lib/partners-data.server";

export const metadata: Metadata = {
  title: "Partners",
  description: "Partner with RAD Esports — championship roster, creator content, and a community-first audience."
};

export const dynamic = "force-dynamic";

type TierKey = "Primary" | "Official" | "Supporting";

const TIERS: { key: TierKey; pitch: string }[] = [
  { key: "Primary", pitch: "Front-of-jersey, broadcast presence, and co-produced campaigns." },
  { key: "Official", pitch: "Recurring placement across content, streams, and community drops." },
  { key: "Supporting", pitch: "Community shout-outs and seasonal collabs to start building together." }
];

export default async function PartnersPage() {
  const { partners } = await getManagedPartnersState();

  const realPartners = partners.filter((partner) => !partner.isOpenSlot && partner.logo);
  const openByTier: Record<string, number> = {};
  for (const partner of partners) {
    if (partner.isOpenSlot) openByTier[partner.tier] = (openByTier[partner.tier] ?? 0) + 1;
  }

  return (
    <PageShell variant="partners" hideHero eyebrow="Partners" title="Partners" route="/partners">
      <PageRail className="pb-16 sm:pb-20">
        {/* Hero */}
        <PageRailSection className="py-14 md:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-blood)]">
              Partnerships
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-white">
              Build with RAD.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-neutral-400 sm:text-lg sm:leading-[1.7]">
              A championship roster, creator-led content, and a Discord-first community.
              Pick a tier or pitch a custom activation.
            </p>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Pitch a partnership
              </Button>
            </div>
          </div>
        </PageRailSection>

        {/* Tiers */}
        <PageRailSection borderTop className="py-12 md:py-16">
          <h2 className="mb-8 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
            Tiers
          </h2>

          <div className="divide-y divide-neutral-900 border-y border-neutral-900">
            {TIERS.map(({ key, pitch }, index) => {
              const open = openByTier[key] ?? 0;

              return (
                <Link
                  key={key}
                  href="/contact"
                  className="group flex flex-col gap-3 py-7 transition-opacity hover:opacity-100 sm:flex-row sm:items-center sm:gap-8 md:py-8"
                >
                  <span className="w-12 shrink-0 font-[family-name:var(--font-display)] text-sm font-bold text-neutral-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-none text-white transition-colors group-hover:text-[var(--color-blood)] sm:text-3xl">
                        {key}
                      </h3>
                      <span
                        className={[
                          "text-[10px] font-bold uppercase tracking-[0.14em]",
                          open > 0 ? "text-[var(--color-blood)]" : "text-neutral-600"
                        ].join(" ")}
                      >
                        {open > 0 ? `${open} open` : "Full"}
                      </span>
                    </div>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-500">{pitch}</p>
                  </div>

                  <span
                    aria-hidden
                    className="hidden text-neutral-700 transition group-hover:translate-x-1 group-hover:text-white sm:block"
                  >
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </PageRailSection>

        {/* Current partners */}
        {realPartners.length > 0 ? (
          <PageRailSection borderTop className="py-12 md:py-16">
            <h2 className="mb-8 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
              On board
            </h2>
            <PartnerLogoWall partners={realPartners} />
          </PageRailSection>
        ) : null}

        {/* Closing CTA */}
        <PageRailSection borderTop className="py-12 md:py-16">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm text-neutral-500">
              Pitches, custom activations, and roster collabs — reach the team directly.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" size="md">
                Contact
              </Button>
              <Button href={discordInviteUrl} variant="outline" size="md">
                Discord
              </Button>
            </div>
          </div>
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
