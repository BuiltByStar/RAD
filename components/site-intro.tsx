"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/components/ui/cn";
import {
  dispatchBrandIntroComplete,
  hasSeenBrandIntro,
  markBrandIntroSeen
} from "@/lib/brand-intro";
import { assets } from "@/lib/assets";

const HOLD_MS = 720;
const ZOOM_MS = 1050;
const FADE_MS = 420;
const FADE_DELAY_MS = 580;

export function SiteIntro() {
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const introRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);
  const [phase, setPhase] = useState<"hold" | "zoom" | "done">(() => {
    if (typeof window === "undefined") return "done";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "done";
    return hasSeenBrandIntro() ? "done" : "hold";
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

    if (phase !== "hold") return;

    const zoomTimer = window.setTimeout(() => {
      finishedRef.current = false;
      setPhase("zoom");
    }, HOLD_MS);

    return () => window.clearTimeout(zoomTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "zoom") return;

    const fallback = window.setTimeout(finishIntro, FADE_DELAY_MS + FADE_MS + 120);
    return () => window.clearTimeout(fallback);
  }, [phase]);

  useEffect(() => {
    const node = introRef.current;
    if (!node || phase !== "zoom") return;

    const onEnd = (event: AnimationEvent) => {
      if (event.target !== node || event.animationName !== "site-intro-fade") return;
      finishIntro();
    };

    node.addEventListener("animationend", onEnd);
    return () => node.removeEventListener("animationend", onEnd);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      ref={introRef}
      role="presentation"
      aria-hidden
      className={cn("site-intro", phase === "zoom" && "site-intro--zoom")}
      style={
        phase === "zoom"
          ? {
              animationDuration: `${FADE_MS}ms`,
              animationDelay: `${FADE_DELAY_MS}ms`
            }
          : undefined
      }
    >
      <div className="site-intro__glow" aria-hidden />
      <div
        className="site-intro__stage"
        style={phase === "zoom" ? { animationDuration: `${ZOOM_MS}ms` } : undefined}
      >
        <Image
          src={assets.logoMark}
          alt=""
          width={320}
          height={320}
          priority
          className="site-intro__lion"
        />
      </div>
    </div>
  );
}
