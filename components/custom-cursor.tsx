"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = -200,
      my = -200,
      rx = -200,
      ry = -200;
    let rafId: number;
    let isHoveringLink = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHoveringLink = !!(target.closest("a") || target.closest("button"));
      if (ringRef.current) {
        ringRef.current.classList.toggle("cursor-ring--expanded", isHoveringLink);
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
