import Image from "next/image";

import { cn } from "@/components/ui/cn";
import { assets } from "@/lib/assets";

type BrandLockupProps = {
  size: "hero" | "nav";
  className?: string;
};

export function BrandLockup({ size, className }: BrandLockupProps) {
  const isHero = size === "hero";

  return (
    <span
      className={cn(
        "flex items-center gap-2.5 sm:gap-3",
        isHero && "flex-col sm:flex-row",
        className
      )}
    >
      <Image
        src={assets.logoMark}
        alt=""
        width={isHero ? 96 : 36}
        height={isHero ? 96 : 36}
        className={cn(
          "object-contain",
          isHero ? "h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24" : "h-9 w-9"
        )}
        priority={isHero}
      />
      <span
        className={cn(
          "rad-header-brand__stack flex flex-col leading-none",
          isHero ? "items-center sm:items-start" : "items-start"
        )}
      >
        <span
          className={cn(
            "rad-header-brand__title font-[family-name:var(--font-display)] font-extrabold uppercase tracking-[0.06em]",
            isHero ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" : "text-sm"
          )}
        >
          RAD
        </span>
        <span
          className={cn(
            "rad-header-brand__tagline font-bold uppercase tracking-[0.26em]",
            isHero ? "mt-1 text-xs sm:text-sm md:text-base tracking-[0.28em]" : "text-[9px]"
          )}
        >
          #GoWild
        </span>
      </span>
    </span>
  );
}
