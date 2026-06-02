"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { SiteIntroLogoDraw } from "@/components/site-intro-logo-draw";
import {
  dispatchBrandIntroComplete,
  hasSeenBrandIntro,
  markBrandIntroSeen
} from "@/lib/brand-intro";
import { RAD_LOGO_DRAW_PATHS } from "@/lib/rad-logo-draw-path";

const STROKE_STAGGER_S = 0.14;
const STROKE_DRAW_S = 0.72;
const STROKE_COMPLETE_MS =
  Math.ceil(((RAD_LOGO_DRAW_PATHS.length - 1) * STROKE_STAGGER_S + STROKE_DRAW_S) * 1000) + 60;

const DRAW_MS = 1900;
const BACKDROP_EXIT_MS = 220;
const LOGO_EXIT_MS = 280;

const EXIT_EASE = [0.33, 1, 0.68, 1] as const;
const IMPACT_EASE = [0.22, 1, 0.36, 1] as const;

export function SiteIntro() {
  const reduced = useReducedMotion();
  const finishedRef = useRef(false);
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return !hasSeenBrandIntro();
  });
  const [phase, setPhase] = useState<"draw" | "exit">("draw");
  const [filled, setFilled] = useState(false);

  function complete() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    markBrandIntroSeen();
    document.documentElement.classList.remove("site-intro-active");
    setShow(false);
  }

  useEffect(() => {
    if (!show || reduced) return;

    const fillTimer = window.setTimeout(() => setFilled(true), STROKE_COMPLETE_MS);
    return () => window.clearTimeout(fillTimer);
  }, [show, reduced]);

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
      const exitTimer = window.setTimeout(() => setPhase("exit"), DRAW_MS);
      return () => window.clearTimeout(exitTimer);
    }

    return undefined;
  }, [show, phase, reduced]);

  useEffect(() => {
    if (phase !== "exit") return;
    dispatchBrandIntroComplete();

    const fallback = window.setTimeout(complete, LOGO_EXIT_MS + 80);
    return () => window.clearTimeout(fallback);
  }, [phase]);

  if (!show) return null;

  const drawing = phase === "draw" && !filled;
  const exiting = phase === "exit";

  return (
    <div
      role="presentation"
      aria-hidden
      className={exiting ? "site-intro site-intro--exiting" : "site-intro"}
    >
      <motion.div
        className="site-intro__backdrop"
        aria-hidden
        initial={false}
        animate={exiting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: BACKDROP_EXIT_MS / 1000, ease: EXIT_EASE }}
      />
      <div className="site-intro__glow" aria-hidden />
      <motion.div
        className="site-intro__logo-wrap"
        initial={false}
        animate={
          filled && !exiting
            ? { scale: [1, 1.045, 1], opacity: 1 }
            : exiting
              ? { scale: 1.03, opacity: 0 }
              : { scale: 1, opacity: 1 }
        }
        transition={
          exiting
            ? { duration: LOGO_EXIT_MS / 1000, ease: EXIT_EASE }
            : filled
              ? { duration: 0.32, ease: IMPACT_EASE }
              : { duration: 0 }
        }
        onAnimationComplete={() => {
          if (exiting) complete();
        }}
      >
        <SiteIntroLogoDraw drawing={drawing} filled={filled} />
      </motion.div>
    </div>
  );
}
