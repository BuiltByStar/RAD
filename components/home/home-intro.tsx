"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { EASE_OUT_EXPO, EASE_IN_OUT_EXPO } from "@/components/ui/motion-tokens";

const SESSION_KEY = "rad:home-intro";

export function HomeIntro() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<"idle" | "playing" | "exit">("idle");

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      return;
    }
    setStage("playing");
  }, [reduced]);

  const complete = () => {
    setStage((s) => {
      if (s !== "playing") return s;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      return "exit";
    });
  };

  useEffect(() => {
    if (stage === "playing") {
      document.body.style.overflow = "hidden";
      const t = setTimeout(complete, 2600); // Fast, punchy duration
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    } else if (stage === "exit") {
      document.body.style.overflow = "";
      const t = setTimeout(() => setStage("idle"), 1000);
      return () => clearTimeout(t);
    }
  }, [stage]);

  useEffect(() => {
    if (stage !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") complete();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage]);

  if (reduced || stage === "idle") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-layer"
        role="dialog"
        aria-modal="true"
        aria-label="RAD introduction"
        tabIndex={-1}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: EASE_IN_OUT_EXPO } }}
        className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-[#020202] outline-none"
        onClick={complete}
      >
        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.03] mix-blend-overlay" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
          transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
          className="relative z-10 flex flex-col items-center"
        >
          <Image
            src="/assets/RadNewLogoWordmarkWhite.png"
            alt="RAD Esports"
            width={480}
            height={140}
            priority
            className="h-auto w-[200px] object-contain sm:w-[280px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: EASE_OUT_EXPO }}
            className="mt-8 flex items-center gap-4"
          >
            <div className="h-px w-6 bg-white/20 sm:w-10" />
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/50 sm:text-[10px]">
              Worlds '26
            </span>
            <div className="h-px w-6 bg-white/20 sm:w-10" />
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/30"
        >
          Skip [ Esc ]
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
