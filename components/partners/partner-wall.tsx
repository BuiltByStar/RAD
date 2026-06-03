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

function PartnerSlot({
  partner,
  featured = false
}: {
  partner: PartnerDisplay;
  featured?: boolean;
}) {
  const isOpen = partner.isOpenSlot || !partner.logo;
  const label = isOpen ? partner.tier : partner.name;

  return (
    <Link
      href={partner.href}
      className={cn(
        "group relative flex min-h-[148px] flex-col items-center justify-center overflow-hidden bg-black p-6 transition-colors duration-300 hover:bg-neutral-950 sm:min-h-[168px]",
        featured && "sm:min-h-[184px] lg:row-span-2 lg:min-h-0"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 100%, rgba(229,6,47,0.1), transparent 60%), radial-gradient(70% 50% at 100% 0%, rgba(229,6,47,0.06), transparent 55%)"
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-[var(--color-blood)] transition-transform duration-300 group-hover:scale-x-100"
      />

      <span className="absolute left-4 top-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 transition-colors group-hover:text-neutral-400">
        {partner.tier}
      </span>

      {isOpen ? (
        <div className="relative flex flex-col items-center gap-3 text-center">
          <span
            aria-hidden
            className="grid h-12 w-12 place-items-center border border-dashed border-neutral-800 text-xl font-light text-neutral-700 transition-colors duration-300 group-hover:border-[var(--color-blood)]/35 group-hover:text-[var(--color-blood)]"
          >
            +
          </span>
          <div>
            <p className="text-lg font-black uppercase tracking-wide text-neutral-300 transition-colors group-hover:text-white">
              {label}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600 group-hover:text-neutral-400">
              Open slot
            </p>
          </div>
        </div>
      ) : (
        <div className="relative flex h-full w-full flex-col items-center justify-center pt-6">
          <div className="relative flex h-16 w-full max-w-[200px] items-center justify-center sm:h-20">
            <Image
              src={partner.logo!}
              alt={`${partner.name} logo`}
              fill
              sizes="(max-width: 640px) 50vw, 200px"
              className="object-contain opacity-80 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
            />
          </div>
          <span className="sr-only">{partner.name}</span>
        </div>
      )}
    </Link>
  );
}

export function PartnerWall({ partners }: { partners: PartnerDisplay[] }) {
  const tiers = groupByTier(partners);

  return (
    <div className="space-y-10 md:space-y-12">
      {tiers.map(({ tier, partners: tierPartners }) => {
        const featuredIndex = tierPartners.findIndex((partner) => !partner.isOpenSlot && partner.logo);
        const featured = featuredIndex >= 0 ? tierPartners[featuredIndex] : tierPartners[0];
        const rest = tierPartners.filter((partner) => partner.id !== featured?.id);

        return (
          <section key={tier} aria-labelledby={`partners-tier-${tier}`}>
            <h2
              id={`partners-tier-${tier}`}
              className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-600"
            >
              {tier}
            </h2>

            <div className="grid gap-px border border-neutral-900 bg-neutral-900 sm:grid-cols-2 lg:grid-cols-4">
              {featured ? (
                <PartnerSlot partner={featured} featured={tier === "Primary" || Boolean(featured.logo)} />
              ) : null}
              {rest.map((partner) => (
                <PartnerSlot key={partner.id} partner={partner} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
