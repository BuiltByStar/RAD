"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import { cn } from "@/components/ui";

type JerseyToggleViewerProps = {
  frontImage: string;
  backImage: string;
  name: string;
  status: string;
  className?: string;
  compact?: boolean;
};

const VIEW_EASE = [0.22, 1, 0.36, 1] as const;
const ZOOM_SCALE = 2.8;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function JerseyToggleViewer({
  frontImage,
  backImage,
  name,
  status,
  className,
  compact = false
}: JerseyToggleViewerProps) {
  const reduced = useReducedMotion();
  const [side, setSide] = useState<"front" | "back">("front");
  const [pointerInside, setPointerInside] = useState(false);
  const inspectorHostRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const activeImage = side === "front" ? frontImage : backImage;
  const activeLabel = `${side} view`;

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const nextY = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    const host = inspectorHostRef.current;

    if (!host) return;

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      host.style.setProperty("--focus-x", `${nextX * 100}%`);
      host.style.setProperty("--focus-y", `${nextY * 100}%`);
      frameRef.current = null;
    });
  }

  return (
    <div
      ref={inspectorHostRef}
      className={cn("relative overflow-hidden rounded-[1.55rem] border border-white/12 bg-[#080809]", className)}
      style={{ ["--focus-x" as string]: "50%", ["--focus-y" as string]: "40%" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(56%_40%_at_50%_16%,rgba(255,0,0,0.14),transparent_62%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,0,0,0.03)_48%,rgba(0,0,0,0.12)_100%)]"
      />
      <div aria-hidden className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:54px_54px]" />

      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff5555]">Merch</p>
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-none text-white">
            {name}
          </h3>
        </div>
        <span className="rounded-full border border-[#ff0000]/28 bg-[#ff0000]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/74">
          {status}
        </span>
      </div>

      <div className="relative z-10 px-4 pb-4 pt-5 sm:px-5 sm:pb-5">
        <div className="mb-4 flex items-center justify-center">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
            {(["front", "back"] as const).map((view) => {
              const active = side === view;
              return (
                <button
                  key={view}
                  type="button"
                  onClick={() => setSide(view)}
                  className={cn(
                    "rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0000]",
                    active ? "bg-[#ff0000] text-white" : "text-white/56 hover:text-white"
                  )}
                  aria-pressed={active}
                >
                  {view}
                </button>
              );
            })}
          </div>
        </div>

        <div className={cn("grid gap-4", compact ? "xl:grid-cols-1" : "xl:grid-cols-[1.08fr_0.92fr]")}>
          <motion.div
            key={side}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: VIEW_EASE }}
            className="relative"
          >
            <div
              className={cn(
                "relative mx-auto w-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,#09090a,#050506)]",
                compact ? "aspect-[10/11] max-w-[420px]" : "aspect-[5/6] max-w-[880px]"
              )}
              onPointerMove={handlePointerMove}
              onPointerEnter={() => setPointerInside(true)}
              onPointerLeave={() => setPointerInside(false)}
              onPointerDown={handlePointerMove}
            >
              <div aria-hidden className="absolute inset-x-[18%] top-[8%] h-24 rounded-full bg-[radial-gradient(circle,rgba(255,0,0,0.13),transparent_72%)] blur-3xl" />
              <div className="absolute inset-0 p-4 sm:p-5">
                <div className="relative h-full w-full">
                  <Image
                    src={activeImage}
                    alt={`${name} ${activeLabel}`}
                    fill
                    sizes={compact ? "(max-width: 1280px) 420px, 420px" : "(max-width: 1280px) 880px, 880px"}
                    className="object-contain"
                  />
                </div>
              </div>
              {!reduced && pointerInside && !compact ? (
                <div
                  aria-hidden
                  className="pointer-events-none absolute h-24 w-24 rounded-full border border-[#ff6a6a]/65 bg-white/[0.03] shadow-[0_0_0_1px_rgba(0,0,0,0.3),0_18px_44px_rgba(0,0,0,0.36)] backdrop-blur-[1px]"
                  style={{
                    left: "calc(var(--focus-x) - 3rem)",
                    top: "calc(var(--focus-y) - 3rem)"
                  }}
                />
              ) : null}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-full border border-white/10 bg-black/42 px-4 py-2 backdrop-blur">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">RAD product render</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/52">{activeLabel}</span>
              </div>
            </div>
          </motion.div>

          {!compact ? (
            <div className="rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff5c5c]">Inspector</p>
                  <p className="mt-1 text-sm text-white/52">Move across the product to magnify details.</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/56">
                  {side}
                </span>
              </div>

              <div className="mt-4 relative aspect-square overflow-hidden rounded-[1.15rem] border border-white/10 bg-[#070708]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: `${ZOOM_SCALE * 100}%`,
                    backgroundPosition: "var(--focus-x) var(--focus-y)"
                  }}
                />
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                {[
                  side === "front" ? "Front graphic" : "Back graphic",
                  side === "front" ? "Sleeve details" : "Upper back details"
                ].map((label) => (
                  <div
                    key={label}
                    className="rounded-lg border border-white/8 bg-black/24 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/48"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
