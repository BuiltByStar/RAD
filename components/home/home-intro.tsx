"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { EASE_OUT_EXPO } from "@/components/ui/motion-tokens";
import { assets } from "@/lib/assets";

const SESSION_KEY = "rad:home-intro";

export function HomeIntro() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<"idle" | "playing" | "exit">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      }, 2600);

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

  if (reduced || !mounted || stage === "idle") return null;

  return createPortal(
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
            ? { opacity: 0, y: -12, scale: 0.99, transition: { duration: 0.55, ease: EASE_OUT_EXPO } }
            : { opacity: 1, y: 0, scale: 1 }
        }
        className="fixed inset-0 z-[100] overflow-hidden bg-[#050102]"
      >
        <Image
          src={assets.bgRed}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[radial-gradient(72%_54%_at_50%_42%,rgba(220,20,60,0.24),transparent_64%),linear-gradient(180deg,rgba(5,1,2,0.88),#050102)]" />
        <motion.div
          aria-hidden
          className="absolute left-[-30%] top-1/2 h-px w-[160%] bg-[linear-gradient(90deg,transparent,rgba(220,20,60,0.95),rgba(255,255,255,0.52),transparent)]"
          animate={{ x: ["-18%", "18%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.25, delay: 0.35, ease: EASE_OUT_EXPO }}
        />

        <motion.div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_18%,rgba(0,0,0,0.5)_100%)]"
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
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            className="relative flex w-full max-w-4xl flex-col items-center"
          >
            <motion.div
              aria-hidden
              className="absolute inset-x-[18%] top-[48%] h-24 -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,0,0,0.34),transparent_70%)] blur-3xl"
              animate={{ scaleX: [0.92, 1.06, 0.96], opacity: [0.34, 0.7, 0.34] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative overflow-hidden px-8 py-8 sm:px-12 sm:py-10">
              <motion.div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(110deg,transparent_24%,rgba(255,255,255,0.2)_44%,rgba(220,20,60,0.22)_52%,transparent_72%)]"
                animate={{ x: ["-140%", "140%"] }}
                transition={{ duration: 1.15, delay: 0.35, ease: EASE_OUT_EXPO }}
              />
              <Image
                src={assets.wordmark}
                alt="RAD Esports"
                width={920}
                height={240}
                className="relative z-10 h-auto w-[260px] sm:w-[420px]"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.42, ease: EASE_OUT_EXPO }}
              className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-white/52"
            >
              Enter the wild
            </motion.p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-medium text-white/30"
        >
          Esc to continue
        </motion.p>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
