"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const SESSION_KEY = "rad:home-intro";

const EASE = [0.22, 1, 0.36, 1] as const;

const gate = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.72, ease: EASE }
  }
};

const mainSequence = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.28 }
  }
};

const logoReveal = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: EASE }
  }
};

const ruleReveal = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: EASE }
  }
};

const wordsGroup = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0 }
  }
};

const wordReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: EASE } }
};

type Stage = "idle" | "playing" | "exit";

export function HomeIntro() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<Stage>("idle");

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      return;
    }
    setStage("playing");
  }, [reduced]);

  const complete = useCallback(() => {
    setStage((s) => {
      if (s !== "playing") return s;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      return "exit";
    });
  }, []);

  useEffect(() => {
    if (stage === "playing" || stage === "exit") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  useEffect(() => {
    if (stage !== "playing") return;
    const t = setTimeout(complete, 4000);
    return () => clearTimeout(t);
  }, [stage, complete]);

  useEffect(() => {
    if (stage !== "exit") return;
    const t = setTimeout(() => setStage("idle"), 720);
    return () => clearTimeout(t);
  }, [stage]);

  if (reduced || stage === "idle") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-layer"
        className="fixed inset-0 z-[60] flex cursor-pointer flex-col items-center justify-center bg-black"
        role="dialog"
        aria-modal="true"
        aria-label="RAD introduction"
        initial={{ opacity: 1 }}
        animate={
          stage === "exit"
            ? { opacity: 0, y: -36, filter: "blur(8px)" }
            : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        transition={{ duration: 0.7, ease: EASE }}
        onClick={complete}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            complete();
          }}
          className="absolute right-6 top-20 z-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35 transition-colors hover:text-white sm:right-10 sm:top-24"
        >
          Skip
        </button>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-[min(26vw,220px)] sm:gap-48">
          <motion.div
            aria-hidden
            variants={gate}
            initial="hidden"
            animate="visible"
            className="h-[min(62vh,460px)] w-px origin-top bg-gradient-to-b from-transparent via-white/22 to-transparent"
          />
          <motion.div
            aria-hidden
            variants={gate}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.12 }}
            className="h-[min(62vh,460px)] w-px origin-top bg-gradient-to-b from-transparent via-white/22 to-transparent"
          />
        </div>

        <motion.div
          className="relative z-10 flex flex-col items-center px-8"
          variants={mainSequence}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={logoReveal} className="relative w-[min(78vw,340px)] sm:w-[400px]">
            <Image
              src="/assets/RadNewLogoWordmarkWhite.png"
              alt=""
              width={800}
              height={210}
              priority
              className="h-auto w-full"
            />
          </motion.div>

          <motion.span
            aria-hidden
            variants={ruleReveal}
            className="mt-5 h-px w-[min(52vw,200px)] origin-center bg-gradient-to-r from-transparent via-[color:var(--color-rad)] to-transparent"
          />

          <motion.div
            variants={wordsGroup}
            className="mt-14 flex flex-wrap justify-center gap-x-4 gap-y-2 text-center font-[family-name:var(--font-display)] text-[clamp(1.25rem,4.2vw,2.5rem)] font-semibold uppercase tracking-[0.06em] text-white"
          >
            <motion.span variants={wordReveal}>Untamed.</motion.span>
            <motion.span variants={wordReveal}>Unstoppable.</motion.span>
            <motion.span variants={wordReveal} className="text-white/85">
              RAD.
            </motion.span>
          </motion.div>

          <motion.p
            variants={wordReveal}
            className="mt-10 text-[10px] font-semibold uppercase tracking-[0.38em] text-white/40"
          >
            Continue
          </motion.p>
        </motion.div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[color:var(--color-rad)]/[0.06] to-transparent"
        />
      </motion.div>
    </AnimatePresence>
  );
}
