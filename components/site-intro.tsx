"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  dispatchBrandIntroComplete,
  hasSeenBrandIntro,
  markBrandIntroSeen
} from "@/lib/brand-intro";
import { assets } from "@/lib/assets";

const BITE_EASE = [0.72, 0, 0.9, 0.08] as const;
const HOLD_MS = 650;
const BITE_S = 0.58;
const FADE_S = 0.42;

export function SiteIntro() {
  const reducedMotion = useReducedMotion();
  const exitDoneRef = useRef(false);
  const [phase, setPhase] = useState<"hold" | "bite" | "done">(() => {
    if (typeof window === "undefined") return "done";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "done";
    return hasSeenBrandIntro() ? "done" : "hold";
  });

  useEffect(() => {
    if (phase === "done") {
      document.documentElement.classList.remove("site-intro-active");
      dispatchBrandIntroComplete();
      return;
    }

    document.documentElement.classList.add("site-intro-active");

    if (reducedMotion || hasSeenBrandIntro()) {
      markBrandIntroSeen();
      setPhase("done");
      return;
    }

    if (phase !== "hold") return;

    const biteTimer = window.setTimeout(() => {
      exitDoneRef.current = false;
      setPhase("bite");
    }, HOLD_MS);

    return () => window.clearTimeout(biteTimer);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (phase !== "bite") return;

    const fallback = window.setTimeout(finishIntro, (BITE_S + FADE_S) * 1000 + 80);
    return () => window.clearTimeout(fallback);
  }, [phase]);

  function finishIntro() {
    if (exitDoneRef.current) return;
    exitDoneRef.current = true;
    markBrandIntroSeen();
    setPhase("done");
  }

  return (
    <AnimatePresence mode="wait">
      {phase !== "done" ? (
        <motion.div
          key="site-intro"
          role="presentation"
          aria-hidden
          className="site-intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "bite" ? 0 : 1 }}
          transition={{
            duration: FADE_S,
            delay: phase === "bite" ? BITE_S * 0.38 : 0,
            ease: BITE_EASE
          }}
          onAnimationComplete={() => {
            if (phase === "bite") finishIntro();
          }}
        >
          <div className="site-intro__backdrop" />

          <motion.div
            className="site-intro__stage"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={
              phase === "bite"
                ? { opacity: 1, scale: 16 }
                : { opacity: 1, scale: 1 }
            }
            transition={{
              opacity: { duration: 0.28, ease: BITE_EASE },
              scale: { duration: BITE_S, ease: BITE_EASE }
            }}
          >
            <div className="site-intro__lion">
              <Image
                src={assets.logoMark}
                alt=""
                width={320}
                height={320}
                priority
                className="site-intro__lion-img"
              />
              <motion.div
                aria-hidden
                className="site-intro__mouth"
                initial={{ scale: 0.85, opacity: 0.9 }}
                animate={
                  phase === "bite"
                    ? { scale: 28, opacity: 1 }
                    : { scale: 1, opacity: 1 }
                }
                transition={{ duration: BITE_S, ease: BITE_EASE }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
