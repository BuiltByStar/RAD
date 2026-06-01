"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glitchTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMove = (e: MouseEvent) => {
      if (!dotRef.current) return;
      dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
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

    window.addEventListener("mousemove", onMove, { passive: true });
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
