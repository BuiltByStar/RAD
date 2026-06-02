"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/components/ui/cn";
import { SiteIntroLogoDraw } from "@/components/site-intro-logo-draw";
import {
  dispatchBrandIntroComplete,
  hasSeenBrandIntro,
  markBrandIntroSeen
} from "@/lib/brand-intro";

const DRAW_MS = 1650;
const HOLD_MS = 3720;
const EXIT_MS = 1000;

export function SiteIntro() {
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const introRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);
  const [phase, setPhase] = useState<"draw" | "hold" | "exit" | "done">(() => {
    if (typeof window === "undefined") return "done";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "done";
    return hasSeenBrandIntro() ? "done" : "draw";
  });

  function finishIntro() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    markBrandIntroSeen();
    setPhase("done");
  }

  useEffect(() => {
    if (phase === "done") {
      document.documentElement.classList.remove("site-intro-active");
      dispatchBrandIntroComplete();
      return;
    }

    document.documentElement.classList.add("site-intro-active");

    if (reducedMotion.current || hasSeenBrandIntro()) {
      finishIntro();
      return;
    }

    if (phase === "draw") {
      const holdTimer = window.setTimeout(() => setPhase("hold"), DRAW_MS);
      return () => window.clearTimeout(holdTimer);
    }

    if (phase === "hold") {
      const exitTimer = window.setTimeout(() => {
        finishedRef.current = false;
        setPhase("exit");
      }, HOLD_MS);
      return () => window.clearTimeout(exitTimer);
    }

    return undefined;
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;

    const fallback = window.setTimeout(finishIntro, EXIT_MS + 80);
    return () => window.clearTimeout(fallback);
  }, [phase]);

  useEffect(() => {
    const node = brandRef.current;
    if (!node || phase !== "exit") return;

    const onEnd = (event: AnimationEvent) => {
      if (event.target !== node || event.animationName !== "site-intro-brand-exit") return;
      finishIntro();
    };

    node.addEventListener("animationend", onEnd);
    return () => node.removeEventListener("animationend", onEnd);
  }, [phase]);

  if (phase === "done") return null;

  const drawing = phase === "draw";
  const filled = phase === "hold" || phase === "exit";
  const showCopy = phase === "hold" || phase === "exit";
  const exiting = phase === "exit";

  return (
    <div ref={introRef} role="presentation" aria-hidden className={cn("site-intro", exiting && "site-intro--exit")}>
      <div className="site-intro__glow" aria-hidden />
      <div
        ref={brandRef}
        className={cn(
          "site-intro__brand",
          showCopy && "site-intro__brand--ready",
          exiting && "site-intro__brand--exit"
        )}
        style={exiting ? { animationDuration: `${EXIT_MS}ms` } : undefined}
      >
        <SiteIntroLogoDraw drawing={drawing} filled={filled} />
        <div className="site-intro__copy">
          <p className="site-intro__name">
            <span className="site-intro__name-rad">RAD</span> Esports
          </p>
          <p className="site-intro__tag">#GoWild</p>
        </div>
      </div>
    </div>
  );
}
