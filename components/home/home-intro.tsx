"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { EASE_OUT_EXPO } from "@/components/ui/motion-tokens";

const SESSION_KEY = "rad:home-intro";
const ease = EASE_OUT_EXPO;

type Stage = "idle" | "playing" | "exit";

const introBlades = [
  {
    className:
      "-left-[12%] top-[18%] h-5 w-[48%] -rotate-[16deg] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,43,69,0.72),rgba(255,255,255,0.08),transparent)] blur-[2px]",
    animate: { x: [-14, 26, -14], opacity: [0.15, 0.85, 0.2] },
    transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const }
  },
  {
    className:
      "right-[-10%] top-[28%] h-4 w-[40%] -rotate-[18deg] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),rgba(255,43,69,0.68),transparent)] blur-[2px]",
    animate: { x: [18, -30, 18], opacity: [0.12, 0.72, 0.16] },
    transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const, delay: 0.2 }
  },
  {
    className:
      "left-[8%] bottom-[26%] h-4 w-[38%] -rotate-[14deg] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,43,69,0.58),rgba(255,255,255,0.06),transparent)] blur-[2px]",
    animate: { x: [-10, 22, -10], opacity: [0.1, 0.62, 0.12] },
    transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" as const, delay: 0.12 }
  }
];

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
    const t = setTimeout(complete, 4300);
    return () => clearTimeout(t);
  }, [stage, complete]);

  useEffect(() => {
    if (stage !== "exit") return;
    const t = setTimeout(() => setStage("idle"), 900);
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
            scale: 1.02,
            filter: "blur(10px)",
            transition: { duration: 0.9, ease }
          }
        }}
        transition={{ duration: 0.45, ease }}
        className="fixed inset-0 z-[60] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-[#030303] outline-none"
        onClick={complete}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(92%_68%_at_50%_-8%,rgba(255,255,255,0.06),transparent_52%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(55%_40%_at_50%_50%,rgba(255,43,69,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(42%_30%_at_50%_88%,rgba(255,43,69,0.12),transparent_72%)]" />

          <motion.div
            className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,43,69,0.35),rgba(255,43,69,0.1)_42%,transparent_72%)] blur-3xl"
            animate={{ scale: [0.82, 1.06, 0.88], opacity: [0.35, 0.8, 0.42] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {introBlades.map((blade) => (
            <motion.div
              key={blade.className}
              className={`absolute ${blade.className}`}
              animate={blade.animate}
              transition={blade.transition}
            />
          ))}

          <motion.div
            className="absolute left-[-12%] top-[20%] h-[130vh] w-[42%] -rotate-[18deg] border-r border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]"
            animate={{ x: [0, 40, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[-12%] top-[12%] h-[130vh] w-[40%] rotate-[18deg] border-l border-white/10 bg-[linear-gradient(180deg,rgba(255,43,69,0.08),rgba(255,255,255,0.01))]"
            animate={{ x: [0, -36, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.14 }}
          />

          <motion.div
            className="absolute inset-x-[-10%] top-[34%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),rgba(255,43,69,0.9),transparent)]"
            animate={{ x: ["-10%", "10%", "-10%"], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-x-[-10%] top-[62%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,43,69,0.85),rgba(255,255,255,0.25),transparent)]"
            animate={{ x: ["10%", "-10%", "10%"], opacity: [0.16, 0.92, 0.16] }}
            transition={{ duration: 1.55, repeat: Infinity, ease: "easeInOut", delay: 0.08 }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_18%,rgba(0,0,0,0.44)_100%)]" />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            complete();
          }}
          className="absolute right-6 top-20 z-10 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/48 backdrop-blur-md transition-colors hover:text-white sm:right-10 sm:top-24"
        >
          Skip
        </button>

        <motion.div
          className="relative z-10 flex max-w-2xl flex-col items-center px-8 text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.18 } }
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.92, y: 18 },
              visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.95, ease } }
            }}
            className="relative w-[min(74vw,420px)] sm:w-[min(48vw,520px)]"
          >
            <motion.div
              aria-hidden
              className="absolute inset-[-10%] rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,43,69,0.12),rgba(255,255,255,0.04)_28%,rgba(5,5,5,0.9)_72%)] shadow-[0_24px_70px_rgba(0,0,0,0.5)]"
              animate={{ rotate: [-1.6, 1.8, -1.6], y: [-4, 6, -4] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-x-[10%] bottom-[-10%] h-14 rounded-full bg-[radial-gradient(circle,rgba(255,43,69,0.78),transparent_72%)] blur-2xl"
              animate={{ scaleX: [0.92, 1.08, 0.96], opacity: [0.52, 1, 0.58] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-0 translate-x-[2%] translate-y-[6%] opacity-80 blur-[2px]"
              animate={{ x: [8, -4, 8], opacity: [0.45, 0.9, 0.45] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/assets/RadNewLogoWordmarkRed.png"
                alt=""
                width={900}
                height={240}
                priority
                className="h-auto w-full"
              />
            </motion.div>
            <motion.div
              className="relative"
              animate={{ y: [-4, 6, -4] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/assets/RadNewLogoWordmarkWhite.png"
                alt=""
                width={900}
                height={240}
                priority
                className="relative h-auto w-full"
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, scaleX: 0.4 },
              visible: { opacity: 1, scaleX: 1, transition: { duration: 0.7, ease } }
            }}
            className="mt-7 h-px w-[min(52vw,240px)] origin-center bg-gradient-to-r from-transparent via-white/35 to-transparent"
          />

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } }
            }}
            className="mt-8 max-w-xl text-[15px] font-medium leading-relaxed tracking-[-0.01em] text-white/78 sm:text-[18px]"
          >
            Pressure-built esports with identity, execution, and a brand that hits before the match even starts.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease } }
            }}
            className="mt-5 flex flex-wrap items-center justify-center gap-3"
          >
            <span className="inline-flex min-h-9 items-center rounded-full border border-white/10 bg-white/[0.03] px-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 backdrop-blur-md">
              RAD Worlds
            </span>
            <span className="inline-flex min-h-9 items-center rounded-full border border-[color:var(--color-rad)]/30 bg-[color:var(--color-rad)]/12 px-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-rad-hi)]">
              Go Wild
            </span>
          </motion.div>

          <motion.p
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.55, ease } }
            }}
            className="mt-12 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/38"
          >
            Click anywhere · Esc to continue
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
