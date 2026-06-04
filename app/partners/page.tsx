import type { Metadata } from "next";
import Link from "next/link";

import { PartnerLogoWall } from "@/components/partners/partner-wall";
import { PageShell } from "@/components/page-shell";
import { Button, PageRail, PageRailSection } from "@/components/ui";
import { discordInviteUrl } from "@/lib/site-data";
import { getManagedPartnersState } from "@/lib/partners-data.server";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with RAD Esports — championship-tested roster, creator-led content, and community-first activations."
};

export const dynamic = "force-dynamic";

const VALUE_PILLARS = [
  {
    num: "01",
    title: "Championship pedigree",
    body: "World Champions and Season 6 EMEA title holders. Brand placement that ships next to wins, not noise."
  },
  {
    num: "02",
    title: "Roster + creator reach",
    body: "Player kits, watch-along streams, and creator drops keep your brand inside the moment — not pinned to a banner."
  },
  {
    num: "03",
    title: "Community-first",
    body: "RAD's Discord and content channels turn campaigns into conversations. Activations land where supporters already are."
  }
];

type TierKey = "Primary" | "Official" | "Supporting";

const TIER_DETAILS: Record<TierKey, { eyebrow: string; pitch: string; perks: string[] }> = {
  Primary: {
    eyebrow: "Top of the kit",
    pitch: "Jersey-front, broadcast lower-thirds, and shared campaign rights with the flagship roster.",
    perks: ["Front-of-jersey", "Broadcast presence", "Co-produced campaigns", "Creator integrations"]
  },
  Official: {
    eyebrow: "Always in frame",
    pitch: "Recurring presence across content, scrim nights, and community drops with dedicated activation slots.",
    perks: ["Kit + content placement", "Watch-along sponsorship", "Drop-night activations"]
  },
  Supporting: {
    eyebrow: "First into the room",
    pitch: "Entry tier for brands building alongside the org — community shout-outs and seasonal collabs.",
    perks: ["Community shout-outs", "Seasonal collabs", "Discord activations"]
  }
};

const TIER_ORDER: TierKey[] = ["Primary", "Official", "Supporting"];

export default async function PartnersPage() {
  const { partners } = await getManagedPartnersState();

  const realPartners = partners.filter((partner) => !partner.isOpenSlot && partner.logo);
  const tierCounts: Record<string, { total: number; open: number }> = {};
  for (const partner of partners) {
    const bucket = tierCounts[partner.tier] ?? (tierCounts[partner.tier] = { total: 0, open: 0 });
    bucket.total += 1;
    if (partner.isOpenSlot) bucket.open += 1;
  }

  return (
    <PageShell variant="partners" hideHero eyebrow="Partners" title="Partners" route="/partners">
      <PageRail className="pb-14 sm:pb-16">
        {/* Hero */}
        <PageRailSection className="relative overflow-hidden py-10 sm:py-14 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_360px_at_85%_10%,rgba(229,6,47,0.16),transparent_60%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(180deg,black,transparent_85%)]"
          />

          <div className="relative grid gap-8 md:grid-cols-[1.25fr_0.9fr] md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-blood)]">
                Partnerships
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-white">
                Build a campaign{" "}
                <span className="text-[var(--color-blood)]">with RAD.</span>
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base sm:leading-[1.7]">
                Championship-tested roster, creator-led content, and a Discord-first community.
                Pick a tier or pitch us a custom activation.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" size="lg">
                  Pitch a partnership
                </Button>
                <Button href={discordInviteUrl} variant="outline" size="lg">
                  Join the server
                </Button>
              </div>
            </div>

            <dl className="grid grid-cols-3 gap-px border border-neutral-900 bg-neutral-900">
              {[
                { value: "2023", label: "Founded" },
                { value: "02", label: "Titles" },
                { value: "EMEA", label: "Region" }
              ].map((stat) => (
                <div key={stat.label} className="bg-black px-3 py-5 text-center sm:py-6">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase text-white sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </PageRailSection>

        {/* Value pillars */}
        <PageRailSection borderTop className="py-10 md:py-12">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl">
              Why partner
            </h2>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-600">
              Three signals
            </span>
          </div>

          <div className="grid gap-px border border-neutral-900 bg-neutral-900 md:grid-cols-3">
            {VALUE_PILLARS.map((pillar) => (
              <article key={pillar.num} className="bg-black p-5 sm:p-6">
                <span className="font-[family-name:var(--font-display)] text-2xl font-black text-[var(--color-blood)]">
                  {pillar.num}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-extrabold uppercase leading-tight text-white sm:text-xl">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{pillar.body}</p>
              </article>
            ))}
          </div>
        </PageRailSection>

        {/* Tiers */}
        <PageRailSection borderTop className="py-10 md:py-12">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl">
              Partnership tiers
            </h2>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-600">
              {Object.values(tierCounts).reduce((sum, t) => sum + t.open, 0)} open
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {TIER_ORDER.map((tier, index) => {
              const counts = tierCounts[tier] ?? { total: 0, open: 0 };
              const details = TIER_DETAILS[tier];
              const isPrimary = tier === "Primary";

              return (
                <article
                  key={tier}
                  className={[
                    "group relative flex flex-col gap-5 border bg-black p-5 transition-colors sm:p-6",
                    isPrimary
                      ? "border-[var(--color-blood)]/45 bg-[linear-gradient(165deg,rgba(229,6,47,0.08),transparent_55%)]"
                      : "border-neutral-900 hover:border-neutral-700"
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-blood)]">
                        {`Tier ${String(index + 1).padStart(2, "0")}`}
                      </p>
                      <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-none text-white sm:text-3xl">
                        {tier}
                      </h3>
                      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">
                        {details.eyebrow}
                      </p>
                    </div>
                    <span
                      className={[
                        "shrink-0 border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em]",
                        counts.open > 0
                          ? "border-[var(--color-blood)]/40 bg-[var(--color-blood)]/10 text-white"
                          : "border-neutral-800 bg-black text-neutral-500"
                      ].join(" ")}
                    >
                      {counts.open > 0 ? `${counts.open} open` : "Full"}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-neutral-400">{details.pitch}</p>

                  <ul className="space-y-1.5">
                    {details.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-start gap-2 text-xs text-neutral-500 sm:text-sm"
                      >
                        <span aria-hidden className="mt-1 h-px w-3 shrink-0 bg-[var(--color-blood)]" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="mt-auto inline-flex items-center gap-2 self-start text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-blood)] transition-opacity hover:opacity-70"
                  >
                    Inquire <span aria-hidden>→</span>
                  </Link>
                </article>
              );
            })}
          </div>
        </PageRailSection>

        {/* Current partners (only when there are real logos) */}
        {realPartners.length > 0 ? (
          <PageRailSection borderTop className="py-10 md:py-12">
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl">
                On board
              </h2>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-600">
                {realPartners.length} active
              </span>
            </div>

            <PartnerLogoWall partners={realPartners} />
          </PageRailSection>
        ) : null}

        {/* Closing CTA */}
        <PageRailSection borderTop className="py-12 md:py-14">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-blood)]">
                Next step
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold uppercase leading-[1] text-white">
                Let&apos;s talk.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">
                Pitches, custom activations, and roster collabs — reach the team directly.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button href="/contact" size="lg">
                Contact partnerships
              </Button>
              <Button href={discordInviteUrl} variant="outline" size="lg">
                Discord
              </Button>
            </div>
          </div>
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
