"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { BrandLockup } from "@/components/brand-lockup";
import {
  dispatchBrandIntroComplete,
  hasSeenBrandIntro,
  markBrandIntroSeen
} from "@/lib/brand-intro";

const EASE = [0.22, 1, 0.36, 1] as const;
const HOLD_MS = 2200;
const ENTER_S = 0.9;
const EXIT_S = 0.75;

export function SiteIntro() {
  const reducedMotion = useReducedMotion();
  const exitDoneRef = useRef(false);
  const [phase, setPhase] = useState<"splash" | "exit" | "done">(() => {
    if (typeof window === "undefined") return "done";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "done";
    return hasSeenBrandIntro() ? "done" : "splash";
  });

  useEffect(() => {
    if (phase === "done") {
      document.documentElement.classList.remove("site-intro-active");
      dispatchBrandIntroComplete();
      return;
    }

    document.documentElement.classList.add("site-intro-active");

    if (reducedMotion || hasSeenBrandIntro()) {
      markBrandIntroSeen();
      setPhase("done");
      return;
    }

    if (phase !== "splash") return;

    const exitTimer = window.setTimeout(() => {
      exitDoneRef.current = false;
      setPhase("exit");
    }, HOLD_MS);
    return () => window.clearTimeout(exitTimer);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (phase !== "exit") return;

    const fallback = window.setTimeout(() => {
      if (exitDoneRef.current) return;
      exitDoneRef.current = true;
      markBrandIntroSeen();
      setPhase("done");
    }, EXIT_S * 1000 + 120);

    return () => window.clearTimeout(fallback);
  }, [phase]);

  function handleExitComplete() {
    if (phase !== "exit" || exitDoneRef.current) return;
    exitDoneRef.current = true;
    markBrandIntroSeen();
    setPhase("done");
  }

  return (
    <AnimatePresence mode="wait">
      {phase !== "done" ? (
        <motion.div
          key="site-intro"
          role="presentation"
          aria-hidden
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "exit" ? 0 : 1 }}
          transition={{ duration: EXIT_S, ease: EASE }}
          onAnimationComplete={() => {
            if (phase === "exit") handleExitComplete();
          }}
          className="site-intro"
        >
          <div className="site-intro__veil" />
          <div className="site-intro__grid" aria-hidden />
          <div className="site-intro__scan site-intro__scan--one" aria-hidden />
          <div className="site-intro__scan site-intro__scan--two" aria-hidden />
          <div className="site-intro__glow" aria-hidden />

          <motion.div
            className="site-intro__content"
            initial={{ opacity: 0, scale: 0.88, filter: "blur(14px)" }}
            animate={
              phase === "exit"
                ? { opacity: 0, scale: 1.04, filter: "blur(10px)", y: -18 }
                : { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }
            }
            transition={{
              duration: phase === "exit" ? EXIT_S : ENTER_S,
              ease: EASE
            }}
          >
            <div className="site-intro__lockup site-intro__lockup--glitch">
              <BrandLockup size="hero" />
            </div>
            <p className="site-intro__tag">Built around players · Welcome to the wild</p>
          </motion.div>

          <motion.div
            aria-hidden
            className="site-intro__wipe origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: phase === "exit" ? 1 : 0 }}
            transition={{ duration: EXIT_S, ease: EASE }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
