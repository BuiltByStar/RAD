import Image from "next/image";
import Link from "next/link";

import { cn } from "@/components/ui/cn";
import type { PartnerDisplay } from "@/lib/partners-data.server";

const tierOrder = ["Primary", "Official", "Supporting"] as const;

function groupByTier(partners: PartnerDisplay[]) {
  const groups = new Map<string, PartnerDisplay[]>();

  for (const partner of partners) {
    const bucket = groups.get(partner.tier) ?? [];
    bucket.push(partner);
    groups.set(partner.tier, bucket);
  }

  const orderedTiers = [
    ...tierOrder.filter((tier) => groups.has(tier)),
    ...[...groups.keys()].filter((tier) => !tierOrder.includes(tier as (typeof tierOrder)[number])).sort()
  ];

  return orderedTiers.map((tier) => ({
    tier,
    partners: groups.get(tier) ?? []
  }));
}

function PartnerSlot({ partner }: { partner: PartnerDisplay }) {
  const isOpen = partner.isOpenSlot || !partner.logo;

  return (
    <Link
      href={partner.href}
      className="group flex min-h-[120px] flex-col items-center justify-center border border-neutral-900 bg-black px-4 py-8 transition-colors hover:border-neutral-700 hover:bg-neutral-950 sm:min-h-[132px]"
    >
      {isOpen ? (
        <>
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-600">
            {partner.tier}
          </span>
          <span className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-neutral-500 transition-colors group-hover:text-neutral-300">
            Available
          </span>
        </>
      ) : (
        <div className="relative h-12 w-full max-w-[160px] sm:h-14 sm:max-w-[180px]">
          <Image
            src={partner.logo!}
            alt={`${partner.name} logo`}
            fill
            sizes="(max-width: 768px) 40vw, 180px"
            className="object-contain opacity-90 transition-opacity group-hover:opacity-100"
          />
          <span className="sr-only">{partner.name}</span>
        </div>
      )}
    </Link>
  );
}

export function PartnerWall({ partners }: { partners: PartnerDisplay[] }) {
  const tiers = groupByTier(partners);

  if (!tiers.length) {
    return (
      <p className="border border-neutral-900 px-6 py-10 text-center text-sm text-neutral-500">
        Partner slots will appear here.
      </p>
    );
  }

  return (
    <div className="space-y-10 md:space-y-12">
      {tiers.map(({ tier, partners: tierPartners }) => (
        <section key={tier} aria-labelledby={`partners-tier-${tier}`}>
          <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-neutral-900 pb-3">
            <h2
              id={`partners-tier-${tier}`}
              className="font-[family-name:var(--font-display)] text-lg font-extrabold uppercase tracking-tight text-white sm:text-xl"
            >
              {tier}
            </h2>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-600">
              {tierPartners.length} {tierPartners.length === 1 ? "slot" : "slots"}
            </p>
          </div>

          <div
            className={cn(
              "grid gap-3",
              tier === "Primary" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            )}
          >
            {tierPartners.map((partner) => (
              <PartnerSlot key={partner.id} partner={partner} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
