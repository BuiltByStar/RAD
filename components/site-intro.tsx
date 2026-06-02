"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/components/ui/cn";
import { SiteIntroLogoDraw } from "@/components/site-intro-logo-draw";
import {
  dispatchBrandIntroComplete,
  hasSeenBrandIntro,
  markBrandIntroSeen
} from "@/lib/brand-intro";

const DRAW_MS = 1700;
const HOLD_MS = 600;
const FLASH_MS = 780;

export function SiteIntro() {
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const introRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);
  const [phase, setPhase] = useState<"draw" | "hold" | "flash" | "done">(() => {
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
      const flashTimer = window.setTimeout(() => {
        finishedRef.current = false;
        setPhase("flash");
      }, HOLD_MS);
      return () => window.clearTimeout(flashTimer);
    }

    return undefined;
  }, [phase]);

  useEffect(() => {
    if (phase !== "flash") return;

    const fallback = window.setTimeout(finishIntro, FLASH_MS + 80);
    return () => window.clearTimeout(fallback);
  }, [phase]);

  useEffect(() => {
    const node = introRef.current;
    if (!node || phase !== "flash") return;

    const onEnd = (event: AnimationEvent) => {
      if (event.target !== node || event.animationName !== "site-intro-shell-flash") return;
      finishIntro();
    };

    node.addEventListener("animationend", onEnd);
    return () => node.removeEventListener("animationend", onEnd);
  }, [phase]);

  if (phase === "done") return null;

  const drawing = phase === "draw";
  const filled = phase === "hold" || phase === "flash";
  const flashing = phase === "flash";

  return (
    <div
      ref={introRef}
      role="presentation"
      aria-hidden
      className={cn("site-intro", flashing && "site-intro--flash")}
      style={flashing ? { animationDuration: `${FLASH_MS}ms` } : undefined}
    >
      <div className="site-intro__glow" aria-hidden />
      <div className={cn("site-intro__logo-wrap", filled && "site-intro__logo-wrap--filled")}>
        <SiteIntroLogoDraw drawing={drawing} filled={filled} />
      </div>
      <div className="site-intro__flash" aria-hidden />
    </div>
  );
}
