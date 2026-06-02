"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { SiteIntroLogoDraw } from "@/components/site-intro-logo-draw";
import {
  dispatchBrandIntroComplete,
  hasSeenBrandIntro,
  markBrandIntroSeen
} from "@/lib/brand-intro";

const DRAW_MS = 1900;
const HOLD_MS = 650;
const EXIT_MS = 850;

const EXIT_EASE = [0.76, 0, 0.24, 1] as const;
const IMPACT_EASE = [0.16, 1, 0.3, 1] as const;

export function SiteIntro() {
  const reduced = useReducedMotion();
  const finishedRef = useRef(false);
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return !hasSeenBrandIntro();
  });
  const [phase, setPhase] = useState<"draw" | "hold" | "exit">("draw");

  function complete() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    markBrandIntroSeen();
    document.documentElement.classList.remove("site-intro-active");
    setShow(false);
  }

  useEffect(() => {
    if (!show) {
      document.documentElement.classList.remove("site-intro-active");
      return;
    }

    if (reduced) {
      markBrandIntroSeen();
      dispatchBrandIntroComplete();
      setShow(false);
      return;
    }

    document.documentElement.classList.add("site-intro-active");

    if (phase === "draw") {
      const timer = window.setTimeout(() => setPhase("hold"), DRAW_MS);
      return () => window.clearTimeout(timer);
    }

    if (phase === "hold") {
      const timer = window.setTimeout(() => setPhase("exit"), HOLD_MS);
      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [show, phase, reduced]);

  useEffect(() => {
    if (phase !== "exit") return;
    dispatchBrandIntroComplete();

    const fallback = window.setTimeout(complete, EXIT_MS + 120);
    return () => window.clearTimeout(fallback);
  }, [phase]);

  if (!show) return null;

  const drawing = phase === "draw";
  const filled = phase === "hold" || phase === "exit";
  const exiting = phase === "exit";

  return (
    <motion.div
      role="presentation"
      aria-hidden
      className={exiting ? "site-intro site-intro--exiting" : "site-intro"}
      initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      animate={
        exiting
          ? { opacity: 0, scale: 1.06, filter: "blur(14px)" }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      transition={{ duration: EXIT_MS / 1000, ease: EXIT_EASE }}
      onAnimationComplete={() => {
        if (exiting) complete();
      }}
    >
      <div className="site-intro__glow" aria-hidden />
      <motion.div
        className="site-intro__logo-wrap"
        animate={
          phase === "hold"
            ? {
                scale: [1, 1.07, 1],
                filter: ["blur(5px)", "blur(0px)", "blur(0px)"]
              }
            : { scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.55, ease: IMPACT_EASE }}
      >
        <SiteIntroLogoDraw drawing={drawing} filled={filled} />
      </motion.div>
    </motion.div>
  );
}
