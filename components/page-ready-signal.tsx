"use client";

import { useEffect } from "react";

type PageReadySignalProps = {
  route: string;
  delayMs?: number;
};

export function PageReadySignal({ route, delayMs = 140 }: PageReadySignalProps) {
  useEffect(() => {
    let timeoutId: number | null = null;
    let frameOne = 0;
    let frameTwo = 0;

    const dispatchReady = () => {
      window.dispatchEvent(
        new CustomEvent("rad:page-ready", {
          detail: { route }
        })
      );
    };

    frameOne = window.requestAnimationFrame(() => {
      frameTwo = window.requestAnimationFrame(() => {
        timeoutId = window.setTimeout(dispatchReady, delayMs);
      });
    });

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      if (frameOne) {
        window.cancelAnimationFrame(frameOne);
      }
      if (frameTwo) {
        window.cancelAnimationFrame(frameTwo);
      }
    };
  }, [delayMs, route]);

  return null;
}
