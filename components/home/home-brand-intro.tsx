"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { BrandLockup } from "@/components/brand-lockup";
import { FluidContainer } from "@/components/ui/fluid-container";
import {
  BRAND_INTRO_LANDED_EVENT,
  BRAND_LOCKUP_LAYOUT_ID,
  brandLockupLayoutTransition,
  dispatchBrandIntroComplete,
  dispatchBrandIntroFly,
  hasSeenBrandIntro,
  markBrandIntroSeen
} from "@/lib/brand-intro";

const EASE = [0.22, 1, 0.36, 1] as const;
const HOLD_MS = 1800;
const ENTER_S = 0.85;

export function HomeBrandIntro() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"show" | "fly" | "done">(() => {
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

    const flyTimer = window.setTimeout(() => {
      dispatchBrandIntroFly();
      setPhase("fly");
    }, HOLD_MS);

    return () => window.clearTimeout(flyTimer);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (phase !== "fly") return;

    const finish = () => {
      markBrandIntroSeen();
      dispatchBrandIntroComplete();
      setPhase("done");
    };

    window.addEventListener(BRAND_INTRO_LANDED_EVENT, finish);
    const fallback = window.setTimeout(finish, 900);

    return () => {
      window.removeEventListener(BRAND_INTRO_LANDED_EVENT, finish);
      window.clearTimeout(fallback);
    };
  }, [phase]);

  return (
    <AnimatePresence mode="wait">
      {phase !== "done" ? (
        <motion.section
          key="home-brand-intro"
          aria-hidden={phase === "fly"}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: phase === "fly" ? 0 : "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: phase === "fly" ? 0.55 : 0.65, ease: EASE }}
          className="home-brand-intro overflow-hidden border-b border-neutral-900 bg-black"
        >
          <FluidContainer>
            <div className="home-brand-intro__stage relative border-x border-neutral-900 px-4 py-12 md:py-16 lg:py-[4.25rem]">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-[min(100%,28rem)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(229,6,47,0.22)_0%,transparent_72%)] opacity-80 transition-opacity duration-500"
                style={{ opacity: phase === "fly" ? 0 : 0.8 }}
              />
              {phase === "show" ? (
                <motion.div
                  layoutId={BRAND_LOCKUP_LAYOUT_ID}
                  initial={{ opacity: 0, y: 24, scale: 0.9, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{
                    layout: brandLockupLayoutTransition,
                    opacity: { duration: ENTER_S, ease: EASE },
                    y: { duration: ENTER_S, ease: EASE },
                    scale: { duration: ENTER_S, ease: EASE },
                    filter: { duration: ENTER_S, ease: EASE }
                  }}
                  className="relative z-[1] mx-auto w-fit"
                >
                  <BrandLockup size="hero" />
                </motion.div>
              ) : null}
            </div>
          </FluidContainer>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
