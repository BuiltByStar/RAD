"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function KeepScrolling() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const scrollable = root.scrollHeight > window.innerHeight + 160;
      const distanceFromBottom = root.scrollHeight - (window.scrollY + window.innerHeight);
      setVisible(scrollable && distanceFromBottom > 220);
    };

    const onScrollOrResize = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    const timeout = window.setTimeout(update, 500);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.clearTimeout(timeout);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden={!visible}
      className={`keep-scrolling-global pointer-events-none fixed bottom-5 left-1/2 z-40 -translate-x-1/2 transition duration-300 sm:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-rad-hi)] drop-shadow-[0_0_18px_rgba(220,20,60,0.42)] sm:text-[10px]">
        <span className="h-px w-8 bg-[color:var(--color-rad)]/75" />
        <span className="rounded-full border border-white/10 bg-black/42 px-3 py-1.5 backdrop-blur-xl">
          Keep scrolling
        </span>
        <span className="h-px w-8 bg-[color:var(--color-rad)]/75" />
        <span className="keep-scrolling-arrow text-sm leading-none text-[color:var(--color-rad-hi)]">v</span>
      </div>
    </div>
  );
}
