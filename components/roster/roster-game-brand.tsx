"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { Chip, ChipRow } from "@/components/ui/chip";
import { cn } from "@/components/ui";
import { EASE_OUT_EXPO } from "@/components/ui/motion-tokens";
import { assets } from "@/lib/assets";

const CHAMPIONSHIP_CHIPS = ["Ignite World Champions", "Season 6 EMEA PC"] as const;

export type RosterGameBrandProps = {
  game: string;
  status: string;
  className?: string;
};

function MarvelRivalsWordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-1 sm:items-center", className)}>
      <span className="text-[10px] font-bold uppercase tracking-[0.42em] text-neutral-500 sm:text-[11px]">
        Competitive title
      </span>
      <div className="relative flex flex-col items-center">
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-x-8 -inset-y-2 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(229,6,47,0.22),transparent_70%)]"
        />
        <span className="relative font-[family-name:var(--font-display)] text-[clamp(2rem,7vw,3.25rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.03em] text-white">
          Marvel
        </span>
        <span className="relative -mt-0.5 font-[family-name:var(--font-display)] text-[clamp(2.35rem,8.5vw,3.75rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] text-[var(--color-blood)]">
          Rivals
        </span>
        <span
          aria-hidden
          className="mt-2 h-px w-full max-w-[min(100%,280px)] bg-[linear-gradient(90deg,transparent,rgba(229,6,47,0.85),transparent)]"
        />
      </div>
    </div>
  );
}

export function RosterGameBrand({ game, status, className }: RosterGameBrandProps) {
  const reduced = useReducedMotion();
  const [customLogoReady, setCustomLogoReady] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = assets.marvelRivalsLogo;
    img.onload = () => setCustomLogoReady(true);
    img.onerror = () => setCustomLogoReady(false);
  }, []);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: 0.04 }}
      className={cn("relative mb-8", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-32 -translate-y-1/2 overflow-hidden sm:h-40"
      >
        <motion.div
          animate={reduced ? undefined : { opacity: [0.2, 0.38, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(229,6,47,0.16),transparent_72%)]"
        />
      </div>

      <div className="rad-border-trace relative overflow-hidden border border-neutral-900 bg-black">
        <div className="relative px-4 py-8 sm:px-8 sm:py-10">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18] sm:opacity-[0.24]"
            animate={reduced ? undefined : { scale: [1, 1.04, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <Image src={assets.goWild} alt="" fill sizes="100vw" className="object-cover object-center" />
          </motion.div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/88 to-black"
          />
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(229,6,47,0.9),transparent)]"
            animate={reduced ? undefined : { opacity: [0.35, 1, 0.35], x: ["-100%", "100%"] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-neutral-500">
              <span className="text-[var(--color-blood)]">#GoWild</span>
              <span className="mx-2 text-neutral-800" aria-hidden>
                ·
              </span>
              {game}
            </p>

            <div className="mt-5 w-full max-w-lg">
              {customLogoReady ? (
                <Image
                  src={assets.marvelRivalsLogo}
                  alt={`${game} logo`}
                  width={320}
                  height={96}
                  className="mx-auto h-auto w-[min(100%,280px)] object-contain sm:w-[300px]"
                  priority
                />
              ) : (
                <MarvelRivalsWordmark />
              )}
            </div>

            <ChipRow className="mt-6 justify-center">
              <Chip className="border-[var(--color-blood)]/40 bg-[var(--color-blood)]/10 text-white/90">
                {status}
              </Chip>
              {CHAMPIONSHIP_CHIPS.map((label) => (
                <Chip key={label} className="text-white/65">
                  {label}
                </Chip>
              ))}
            </ChipRow>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
