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
const REST_MS = 140;
const EXIT_MS = 280;

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
  const [phase, setPhase] = useState<"draw" | "hold" | "exit">("draw");
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
      const holdTimer = window.setTimeout(() => setPhase("hold"), DRAW_MS);
      return () => window.clearTimeout(holdTimer);
    }

    if (phase === "hold") {
      const exitTimer = window.setTimeout(() => setPhase("exit"), REST_MS);
      return () => window.clearTimeout(exitTimer);
    }

    return undefined;
  }, [show, phase, reduced]);

  useEffect(() => {
    if (phase !== "exit") return;
    dispatchBrandIntroComplete();

    const fallback = window.setTimeout(complete, EXIT_MS + 60);
    return () => window.clearTimeout(fallback);
  }, [phase]);

  if (!show) return null;

  const drawing = phase === "draw" && !filled;
  const exiting = phase === "exit";

  return (
    <motion.div
      role="presentation"
      aria-hidden
      className={exiting ? "site-intro site-intro--exiting" : "site-intro"}
      initial={false}
      animate={exiting ? { opacity: 0, scale: 1.03 } : { opacity: 1, scale: 1 }}
      transition={{ duration: EXIT_MS / 1000, ease: EXIT_EASE }}
      onAnimationComplete={() => {
        if (exiting) complete();
      }}
    >
      <div className="site-intro__glow" aria-hidden />
      <motion.div
        key={filled ? "logo-filled" : "logo-drawing"}
        className="site-intro__logo-wrap"
        initial={{ scale: 1 }}
        animate={filled ? { scale: [1, 1.045, 1] } : { scale: 1 }}
        transition={{ duration: 0.32, ease: IMPACT_EASE }}
      >
        <SiteIntroLogoDraw drawing={drawing} filled={filled} />
      </motion.div>
    </motion.div>
  );
}
