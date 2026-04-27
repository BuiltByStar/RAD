"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { EASE_OUT_EXPO } from "@/components/ui/motion-tokens";

const SESSION_KEY = "rad:home-intro";

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
      }, 4300);

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
        animate={
          stage === "exit"
            ? { opacity: 0, y: -18, scale: 0.986, transition: { duration: 0.82, ease: EASE_OUT_EXPO } }
            : { opacity: 1, y: 0, scale: 1 }
        }
        className="fixed inset-0 z-[100] overflow-hidden bg-[#04040a]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(95%_68%_at_50%_-8%,rgba(255,255,255,0.07),transparent_56%),radial-gradient(75%_56%_at_50%_58%,rgba(255,43,69,0.16),transparent_62%),linear-gradient(180deg,#07070a,#0a0a10)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.02)_100%)]" />
        <motion.div
          aria-hidden
          className="absolute -left-[50%] top-[-32%] h-[150vh] w-[200%] opacity-45 [background:conic-gradient(from_210deg_at_50%_0%,transparent_0deg,rgba(255,255,255,0.07)_22deg,transparent_48deg,transparent_360deg)]"
          animate={{ rotate: [0, 8, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.45)_100%)]"
        />

        <button
          type="button"
          onClick={skipIntro}
          className="pointer-events-auto absolute right-6 top-6 inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/35 px-3 py-2 text-[11px] font-medium text-white/55 backdrop-blur-md transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-rad)]"
        >
          Skip
        </button>

        <div className="absolute inset-0 flex items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO }}
            className="relative flex w-full max-w-5xl flex-col items-center"
          >
            <motion.div
              aria-hidden
              className="absolute inset-x-[20%] top-[45%] h-40 -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,43,69,0.42),transparent_70%)] blur-3xl"
              animate={{ scaleX: [0.88, 1.08, 0.92], opacity: [0.4, 0.9, 0.45] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),rgba(8,8,12,0.92)] px-10 py-10 sm:px-16 sm:py-12">
              <div aria-hidden className="pointer-events-none absolute inset-4 rounded-md border border-white/10" />
              <motion.div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(110deg,transparent_24%,rgba(255,255,255,0.14)_44%,rgba(255,43,69,0.22)_52%,transparent_72%)]"
                animate={{ x: ["-140%", "140%"] }}
                transition={{ duration: 1.4, delay: 0.55, ease: EASE_OUT_EXPO }}
              />
              <Image
                src="/assets/RadNewLogoWordmarkWhite.png"
                alt="RAD Esports"
                width={920}
                height={240}
                priority
                className="relative z-10 h-auto w-[260px] sm:w-[420px]"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.5, ease: EASE_OUT_EXPO }}
              className="mt-9 text-center font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.2vw,2.7rem)] uppercase tracking-[0.04em] text-white/92"
            >
              The Wild Ones
            </motion.p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[11px] font-medium text-white/36"
        >
          Esc to continue
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
