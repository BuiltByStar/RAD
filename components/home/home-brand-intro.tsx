"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { FluidContainer } from "@/components/ui/fluid-container";
import { assets } from "@/lib/assets";
import {
  BRAND_INTRO_COMPLETE_EVENT,
  dispatchBrandIntroComplete,
  hasSeenBrandIntro,
  markBrandIntroSeen
} from "@/lib/brand-intro";

const HOLD_MS = 1400;
const EXIT_MS = 520;

export function HomeBrandIntro() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "show" | "exit" | "done">(() => {
    if (typeof window === "undefined") return "done";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "done";
    return hasSeenBrandIntro() ? "done" : "show";
  });

  useEffect(() => {
    if (phase !== "show") {
      if (phase === "done") dispatchBrandIntroComplete();
      return;
    }

    if (reducedMotion || hasSeenBrandIntro()) {
      dispatchBrandIntroComplete();
      setPhase("done");
      return;
    }
    const exitTimer = window.setTimeout(() => setPhase("exit"), HOLD_MS);
    const doneTimer = window.setTimeout(() => {
      markBrandIntroSeen();
      dispatchBrandIntroComplete();
      setPhase("done");
    }, HOLD_MS + EXIT_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [reducedMotion]);

  if (phase === "done") return null;

  return (
    <section aria-hidden={phase === "exit"} className="border-b border-neutral-900 bg-black">
      <FluidContainer>
        <div className="relative border-x border-neutral-900 px-4 py-10 md:py-14 lg:py-16">
          <AnimatePresence mode="wait">
            {phase === "show" || phase === "exit" ? (
              <motion.div
                key="home-brand-intro"
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={
                  phase === "exit"
                    ? { opacity: 0, y: -28, scale: 0.72 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                transition={{
                  duration: phase === "exit" ? EXIT_MS / 1000 : 0.55,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="home-brand-intro__lockup mx-auto flex w-fit flex-col items-center gap-4 sm:flex-row sm:gap-6"
              >
                <Image
                  src={assets.logoMark}
                  alt=""
                  width={96}
                  height={96}
                  className="h-16 w-16 object-contain sm:h-20 sm:w-20 md:h-24 md:w-24"
                  priority
                />
                <span className="rad-header-brand__stack flex flex-col items-center leading-none sm:items-start">
                  <span className="rad-header-brand__title font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase tracking-[0.06em] sm:text-5xl md:text-6xl lg:text-7xl">
                    RAD
                  </span>
                  <span className="rad-header-brand__tagline mt-1 text-xs font-bold uppercase tracking-[0.28em] sm:text-sm md:text-base">
                    #GoWild
                  </span>
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </FluidContainer>
    </section>
  );
}
