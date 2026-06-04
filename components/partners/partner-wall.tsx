import Image from "next/image";
import Link from "next/link";

import type { PartnerDisplay } from "@/lib/partners-data.server";

/** Centered wall of partners managed from the dashboard (logos + open slots). */
export function PartnerLogoWall({ partners }: { partners: PartnerDisplay[] }) {
  if (!partners.length) {
    return (
      <p className="text-center text-sm text-neutral-600">Partners coming soon.</p>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
      {partners.map((partner) => {
        const isOpen = partner.isOpenSlot || !partner.logo;

        return (
          <Link
            key={partner.id}
            href={partner.href}
            className="group flex h-32 w-44 items-center justify-center border border-neutral-900 bg-black px-5 transition-colors hover:border-neutral-700 hover:bg-neutral-950 sm:h-36 sm:w-52"
          >
            {isOpen ? (
              <span className="flex flex-col items-center gap-1 text-center">
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-600">
                  {partner.tier}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500 transition-colors group-hover:text-neutral-300">
                  Available
                </span>
              </span>
            ) : (
              <span className="relative h-14 w-full">
                <Image
                  src={partner.logo!}
                  alt={`${partner.name} logo`}
                  fill
                  sizes="208px"
                  className="object-contain opacity-90 transition-opacity group-hover:opacity-100"
                />
                <span className="sr-only">{partner.name}</span>
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

// Backwards-compat alias.
export const PartnerWall = PartnerLogoWall;
