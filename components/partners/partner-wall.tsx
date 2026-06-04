import Image from "next/image";
import Link from "next/link";

import type { PartnerDisplay } from "@/lib/partners-data.server";

/**
 * Compact logo wall for confirmed partners. Open slots are handled separately
 * on the partners page tier section.
 */
export function PartnerLogoWall({ partners }: { partners: PartnerDisplay[] }) {
  if (!partners.length) return null;

  return (
    <div className="grid gap-px border border-neutral-900 bg-neutral-900 sm:grid-cols-2 lg:grid-cols-4">
      {partners.map((partner) => (
        <Link
          key={partner.id}
          href={partner.href}
          className="group relative flex h-28 items-center justify-center overflow-hidden bg-black px-4 transition-colors hover:bg-neutral-950 sm:h-32"
        >
          <span className="absolute left-3 top-3 text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-700 transition-colors group-hover:text-neutral-500">
            {partner.tier}
          </span>
          {partner.logo ? (
            <div className="relative h-12 w-full max-w-[160px] sm:h-14 sm:max-w-[180px]">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                fill
                sizes="(max-width: 768px) 40vw, 180px"
                className="object-contain opacity-85 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <span className="sr-only">{partner.name}</span>
            </div>
          ) : (
            <span className="font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-tight text-white">
              {partner.name}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}

// Backwards-compat export — the page now drives tier UI directly.
export const PartnerWall = PartnerLogoWall;
