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

const HOLD_MS = 420;
const PULL_ZOOM_MS = 580;
const PULL_FADE_MS = 280;
const PULL_FADE_DELAY_MS = 340;

export function SiteIntro() {
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const introRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);
  const [phase, setPhase] = useState<"hold" | "pull" | "done">(() => {
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

    const pullTimer = window.setTimeout(() => {
      finishedRef.current = false;
      setPhase("pull");
    }, HOLD_MS);

    return () => window.clearTimeout(pullTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "pull") return;

    const fallback = window.setTimeout(finishIntro, PULL_FADE_DELAY_MS + PULL_FADE_MS + 100);
    return () => window.clearTimeout(fallback);
  }, [phase]);

  useEffect(() => {
    const node = introRef.current;
    if (!node || phase !== "pull") return;

    const onEnd = (event: AnimationEvent) => {
      if (event.target !== node || event.animationName !== "site-intro-fade") return;
      finishIntro();
    };

    node.addEventListener("animationend", onEnd);
    return () => node.removeEventListener("animationend", onEnd);
  }, [phase]);

  if (phase === "done") return null;

  const pulling = phase === "pull";

  return (
    <div
      ref={introRef}
      role="presentation"
      aria-hidden
      className={cn("site-intro", pulling && "site-intro--pull")}
      style={
        pulling
          ? {
              animationDuration: `${PULL_FADE_MS}ms`,
              animationDelay: `${PULL_FADE_DELAY_MS}ms`
            }
          : undefined
      }
    >
      <div className="site-intro__glow" aria-hidden />
      <div
        className="site-intro__stage"
        style={pulling ? { animationDuration: `${PULL_ZOOM_MS}ms` } : undefined}
      >
        <div className="site-intro__lion-wrap">
          <span className="site-intro__eye site-intro__eye--left" aria-hidden />
          <span className="site-intro__eye site-intro__eye--right" aria-hidden />
          <Image
            src={assets.logoMark}
            alt=""
            width={320}
            height={320}
            priority
            className="site-intro__lion"
          />
          <div className="site-intro__maw" aria-hidden>
            <span className="site-intro__tunnel" />
            <span className="site-intro__jaw site-intro__jaw--top" />
            <span className="site-intro__jaw site-intro__jaw--bottom" />
          </div>
        </div>
      </div>
    </div>
  );
}
