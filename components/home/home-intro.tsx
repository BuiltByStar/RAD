"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { EASE_OUT_EXPO } from "@/components/ui/motion-tokens";

const SESSION_KEY = "rad:home-intro";

const railRows = [
  "top-[14%]",
  "top-[24%]",
  "top-[36%]",
  "top-[66%]",
  "top-[78%]"
];

export function HomeIntro() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<"idle" | "playing" | "exit">("idle");

  const skipIntro = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setStage("exit");
  }, []);

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      return;
    }
    setStage("playing");
  }, [reduced]);

  useEffect(() => {
    if (stage === "playing") {
      document.body.style.overflow = "hidden";
      const timeout = setTimeout(() => {
        skipIntro();
      }, 2850);

      return () => {
        clearTimeout(timeout);
        document.body.style.overflow = "";
      };
    }

    if (stage === "exit") {
      document.body.style.overflow = "";
      const timeout = setTimeout(() => setStage("idle"), 900);
      return () => clearTimeout(timeout);
    }
  }, [skipIntro, stage]);

  useEffect(() => {
    if (stage !== "playing") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        skipIntro();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skipIntro, stage]);

  if (reduced || stage === "idle") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="rad-intro"
        role="dialog"
        aria-modal="true"
        aria-label="RAD introduction"
        tabIndex={-1}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } }}
        className="fixed inset-0 z-[100] overflow-hidden bg-[#020202]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(68%_50%_at_50%_38%,rgba(255,43,69,0.22),transparent_56%),radial-gradient(90%_70%_at_50%_-10%,rgba(255,255,255,0.05),transparent_45%),linear-gradient(180deg,#020202,#060606)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.03)),linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.025)_49%,transparent_51%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:52px_52px]" />

        <motion.div
          aria-hidden
          initial={{ scaleY: 1 }}
          animate={stage === "exit" ? { scaleY: 0, transition: { duration: 0.72, ease: EASE_OUT_EXPO } } : undefined}
          className="absolute left-0 top-0 h-1/2 w-full origin-top bg-[linear-gradient(180deg,#070707,#0b0b0b)]"
        />
        <motion.div
          aria-hidden
          initial={{ scaleY: 1 }}
          animate={stage === "exit" ? { scaleY: 0, transition: { duration: 0.72, ease: EASE_OUT_EXPO } } : undefined}
          className="absolute bottom-0 left-0 h-1/2 w-full origin-bottom bg-[linear-gradient(180deg,#0b0b0b,#070707)]"
        />

        <motion.div
          aria-hidden
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "120%"] }}
          transition={{ duration: 1.1, delay: 0.24, ease: EASE_OUT_EXPO }}
          className="absolute inset-y-[22%] left-0 h-px w-[44%] bg-[linear-gradient(90deg,transparent,rgba(255,43,69,0.85),rgba(255,255,255,0.12),transparent)] blur-[0.6px]"
        />
        <motion.div
          aria-hidden
          initial={{ x: "100%" }}
          animate={{ x: ["100%", "-120%"] }}
          transition={{ duration: 1.2, delay: 0.42, ease: EASE_OUT_EXPO }}
          className="absolute inset-y-[66%] right-0 h-px w-[40%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),rgba(255,43,69,0.85),transparent)] blur-[0.6px]"
        />

        {railRows.map((row, index) => (
          <motion.div
            key={row}
            aria-hidden
            className={`absolute ${row} left-0 h-px w-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.08)_30%,rgba(255,43,69,0.5)_50%,rgba(255,255,255,0.08)_70%,transparent_100%)]`}
            animate={{ opacity: [0.08, 0.36, 0.08] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", delay: index * 0.16 }}
          />
        ))}

        <button
          type="button"
          onClick={skipIntro}
          className="pointer-events-auto absolute right-5 top-5 inline-flex items-center gap-2 border border-white/10 bg-black/45 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-white/52 backdrop-blur-md transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-rad)]"
        >
          Skip
        </button>

        <div className="absolute inset-0 flex items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
            transition={{ duration: 0.95, ease: EASE_OUT_EXPO }}
            className="relative flex w-full max-w-4xl flex-col items-center"
          >
            <motion.div
              aria-hidden
              className="absolute inset-x-[18%] top-1/2 h-28 -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,43,69,0.52),transparent_72%)] blur-3xl"
              animate={{ scaleX: [0.9, 1.12, 0.94], opacity: [0.5, 0.92, 0.56] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)),rgba(5,5,5,0.88)] px-8 py-8 sm:px-12 sm:py-10 [clip-path:polygon(0_0,calc(100%-20px)_0,100%_20px,100%_100%,20px_100%,0_calc(100%-20px))]">
              <div aria-hidden className="pointer-events-none absolute inset-3 border border-white/8 [clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,14px_100%,0_calc(100%-14px))]" />
              <motion.div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(110deg,transparent_24%,rgba(255,255,255,0.18)_44%,rgba(255,43,69,0.2)_52%,transparent_72%)]"
                animate={{ x: ["-140%", "140%"] }}
                transition={{ duration: 1.3, delay: 0.45, ease: EASE_OUT_EXPO }}
              />
              <Image
                src="/assets/RadNewLogoWordmarkWhite.png"
                alt="RAD Esports"
                width={920}
                height={240}
                priority
                className="relative z-10 h-auto w-[240px] sm:w-[390px]"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE_OUT_EXPO }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <span className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55 [clip-path:polygon(0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%,0_0)]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-rad)] shadow-[0_0_8px_rgba(255,43,69,0.8)]" />
                Editorial-tech launch
              </span>
              <span className="inline-flex items-center gap-2 border border-[color:var(--color-rad)]/24 bg-[color:var(--color-rad)]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-rad-hi)] [clip-path:polygon(0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%,0_0)]">
                Brand + proof
              </span>
            </motion.div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/32"
        >
          Esc to skip
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
