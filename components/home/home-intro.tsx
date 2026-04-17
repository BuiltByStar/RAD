"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { EASE_OUT_EXPO } from "@/components/ui/motion-tokens";

const SESSION_KEY = "rad:home-intro";

const ease = EASE_OUT_EXPO;

const sequence = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.45 }
  }
};

const logoShell = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0 }
  }
};

const logoClip = {
  hidden: { clipPath: "inset(40% 6% 40% 6%)", opacity: 0, y: 10 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    y: 0,
    transition: { duration: 1.08, ease }
  }
};

const rule = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.75, ease }
  }
};

const line = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } }
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
    const t = setTimeout(complete, 4800);
    return () => clearTimeout(t);
  }, [stage, complete]);

  useEffect(() => {
    if (stage !== "exit") return;
    const t = setTimeout(() => setStage("idle"), 820);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") complete();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, complete]);

  if (reduced || stage === "idle") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-layer"
        role="dialog"
        aria-modal="true"
        aria-label="RAD introduction"
        tabIndex={-1}
        initial="hidden"
        animate={stage === "exit" ? "exit" : "visible"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          exit: {
            opacity: 0,
            scale: 0.985,
            y: -18,
            transition: { duration: 0.82, ease }
          }
        }}
        transition={{ duration: 0.45, ease }}
        className="fixed inset-0 z-[60] flex cursor-pointer flex-col items-center justify-center bg-[#050505] outline-none"
        onClick={complete}
      >
        {/* Atmosphere — soft floor + faint ray (Resend-style restraint) */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(95%_65%_at_50%_-15%,rgba(255,255,255,0.055),transparent_52%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_105%,rgba(255,43,69,0.07),transparent_50%)]" />
          <motion.div
            className="absolute -left-[40%] top-[-20%] h-[120vh] w-[180%] opacity-30"
            style={{
              background:
                "conic-gradient(from 220deg at 50% 0%, transparent 0deg, rgba(255,255,255,0.04) 28deg, transparent 56deg, transparent 360deg)"
            }}
            animate={reduced ? undefined : { rotate: [0, 8, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]" />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            complete();
          }}
          className="absolute right-6 top-20 z-10 rounded-md px-2 py-1 text-[12px] font-medium text-white/45 transition-colors hover:text-white sm:right-10 sm:top-24"
        >
          Skip
        </button>

        <motion.div
          className="relative z-10 flex max-w-lg flex-col items-center px-8 text-center"
          variants={sequence}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={logoShell} className="flex w-full flex-col items-center">
            <motion.div
              variants={logoClip}
              className="relative w-[min(72vw,300px)] sm:w-[min(42vw,360px)]"
            >
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
              variants={rule}
              className="mt-6 h-px w-[min(48vw,180px)] origin-center bg-gradient-to-r from-transparent via-white/35 to-transparent"
            />
          </motion.div>

          <motion.p
            variants={line}
            className="mt-10 max-w-md font-[family-name:var(--font-body)] text-[15px] font-normal leading-relaxed tracking-[-0.01em] text-white/72 sm:text-[17px]"
          >
            Esports built for pressure — identity, execution, and what&apos;s next.
          </motion.p>

          <motion.p
            variants={line}
            className="mt-3 font-[family-name:var(--font-display)] text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-rad-hi)]/90"
          >
            Go Wild
          </motion.p>

          <motion.p
            variants={line}
            className="mt-12 text-[12px] font-medium text-white/38"
          >
            Click anywhere · <span className="text-white/50">Esc</span> to continue
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
