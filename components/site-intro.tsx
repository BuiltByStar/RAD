"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  dispatchBrandIntroComplete,
  hasSeenBrandIntro,
  markBrandIntroSeen
} from "@/lib/brand-intro";
import { assets } from "@/lib/assets";

const HOLD_MS = 820;
const BITE_SPRING = { type: "spring" as const, stiffness: 95, damping: 16, mass: 1.05 };
const FADE_EASE = [0.33, 0, 0.2, 1] as const;

/** Viewport-fixed swallow origin — tuned to the lion “A” mouth when logo is centered */
const SWALLOW_AT = "50% 57%";
const SWALLOW_START = `circle(1.8% at ${SWALLOW_AT})`;
const SWALLOW_END = `circle(165% at ${SWALLOW_AT})`;

export function SiteIntro() {
  const reducedMotion = useReducedMotion();
  const exitDoneRef = useRef(false);
  const [phase, setPhase] = useState<"hold" | "bite" | "done">(() => {
    if (typeof window === "undefined") return "done";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "done";
    return hasSeenBrandIntro() ? "done" : "hold";
  });

  const biting = phase === "bite";

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

    if (phase !== "hold") return;

    const biteTimer = window.setTimeout(() => {
      exitDoneRef.current = false;
      setPhase("bite");
    }, HOLD_MS);

    return () => window.clearTimeout(biteTimer);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (phase !== "bite") return;

    const fallback = window.setTimeout(finishIntro, 1400);
    return () => window.clearTimeout(fallback);
  }, [phase]);

  function finishIntro() {
    if (exitDoneRef.current) return;
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
          className={`site-intro ${biting ? "site-intro--bite" : ""}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: biting ? 0 : 1 }}
          transition={{
            duration: 0.55,
            delay: biting ? 0.52 : 0,
            ease: FADE_EASE
          }}
          onAnimationComplete={() => {
            if (biting) finishIntro();
          }}
        >
          <motion.div
            className="site-intro__backdrop"
            animate={
              biting
                ? { opacity: 1, scale: 1.12 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.95, ease: FADE_EASE }}
          />

          <motion.div
            aria-hidden
            className="site-intro__swallow"
            initial={{ clipPath: SWALLOW_START }}
            animate={{ clipPath: biting ? SWALLOW_END : SWALLOW_START }}
            transition={BITE_SPRING}
          />

          {biting ? (
            <>
              <motion.span
                aria-hidden
                className="site-intro__ripple site-intro__ripple--one"
                initial={{ scale: 0.4, opacity: 0.7 }}
                animate={{ scale: 2.8, opacity: 0 }}
                transition={{ duration: 0.75, ease: FADE_EASE }}
              />
              <motion.span
                aria-hidden
                className="site-intro__ripple site-intro__ripple--two"
                initial={{ scale: 0.35, opacity: 0.5 }}
                animate={{ scale: 3.4, opacity: 0 }}
                transition={{ duration: 0.95, ease: FADE_EASE, delay: 0.08 }}
              />
              <motion.span
                aria-hidden
                className="site-intro__flash"
                initial={{ opacity: 0.85, scale: 0.6 }}
                animate={{ opacity: 0, scale: 2.2 }}
                transition={{ duration: 0.45, ease: FADE_EASE }}
              />
            </>
          ) : null}

          <motion.div
            className="site-intro__stage"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={
              biting
                ? { opacity: 1, scale: 22, y: 0, rotate: 0 }
                : { opacity: 1, scale: 1, y: 0, rotate: 0 }
            }
            transition={
              biting
                ? {
                    scale: BITE_SPRING,
                    y: { duration: 0.35, ease: FADE_EASE },
                    opacity: { duration: 0.2 }
                  }
                : { duration: 0.5, ease: FADE_EASE }
            }
          >
            <motion.div
              className="site-intro__lion"
              animate={
                biting
                  ? { x: [0, -5, 4, -2, 0], filter: "blur(0px)" }
                  : { x: 0, filter: "blur(0px)" }
              }
              transition={
                biting
                  ? { x: { duration: 0.28, ease: "easeOut" }, filter: { duration: 0.15 } }
                  : { duration: 0.4 }
              }
            >
              <Image
                src={assets.logoMark}
                alt=""
                width={320}
                height={320}
                priority
                className="site-intro__lion-img"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
