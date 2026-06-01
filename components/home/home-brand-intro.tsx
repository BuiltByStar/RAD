"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { FluidContainer } from "@/components/ui/fluid-container";
import { assets } from "@/lib/assets";
import {
  dispatchBrandIntroComplete,
  hasSeenBrandIntro,
  markBrandIntroSeen
} from "@/lib/brand-intro";

const EASE = [0.22, 1, 0.36, 1] as const;
const HOLD_MS = 2200;
const ENTER_S = 0.95;
const EXIT_S = 1.05;

export function HomeBrandIntro() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"show" | "exit" | "done">(() => {
    if (typeof window === "undefined") return "done";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "done";
    return hasSeenBrandIntro() ? "done" : "show";
  });

  useEffect(() => {
    if (phase === "done") {
      dispatchBrandIntroComplete();
      return;
    }

    if (reducedMotion || hasSeenBrandIntro()) {
      dispatchBrandIntroComplete();
      setPhase("done");
      return;
    }

    if (phase !== "show") return;

    const exitTimer = window.setTimeout(() => {
      dispatchBrandIntroComplete();
      setPhase("exit");
    }, HOLD_MS);

    return () => window.clearTimeout(exitTimer);
  }, [phase, reducedMotion]);

  function handleExitComplete() {
    markBrandIntroSeen();
    setPhase("done");
  }

  return (
    <AnimatePresence mode="wait">
      {phase !== "done" ? (
        <motion.section
          key="home-brand-intro"
          aria-hidden={phase === "exit"}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="home-brand-intro overflow-hidden border-b border-neutral-900 bg-black"
        >
          <FluidContainer>
            <motion.div
              layout
              className="home-brand-intro__stage relative border-x border-neutral-900 px-4 py-12 md:py-16 lg:py-[4.25rem]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-[min(100%,28rem)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(229,6,47,0.22)_0%,transparent_72%)] opacity-80"
              />
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.9, filter: "blur(14px)" }}
                animate={
                  phase === "exit"
                    ? { opacity: 0, y: -6, scale: 0.94, filter: "blur(12px)" }
                    : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                }
                transition={{
                  duration: phase === "exit" ? EXIT_S : ENTER_S,
                  ease: EASE
                }}
                onAnimationComplete={() => {
                  if (phase === "exit") handleExitComplete();
                }}
                className="home-brand-intro__lockup relative z-[1] mx-auto flex w-fit flex-col items-center gap-4 sm:flex-row sm:gap-6"
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
            </motion.div>
          </FluidContainer>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
