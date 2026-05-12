"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glitchTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mx = -200,
      my = -200;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
    };

    const onDown = () => {
      dotRef.current?.classList.remove("cursor-dot--glitch");
      if (glitchTimeoutRef.current) {
        window.clearTimeout(glitchTimeoutRef.current);
      }
      window.requestAnimationFrame(() => {
        dotRef.current?.classList.add("cursor-dot--glitch");
      });
      glitchTimeoutRef.current = window.setTimeout(() => {
        dotRef.current?.classList.remove("cursor-dot--glitch");
      }, 280);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      if (glitchTimeoutRef.current) {
        window.clearTimeout(glitchTimeoutRef.current);
      }
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
