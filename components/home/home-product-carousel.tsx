"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { FluidContainer } from "@/components/ui/fluid-container";
import { SenButton } from "@/components/ui/sen-button";
import { merchItems } from "@/lib/site-data";

const slides = merchItems.filter((item) => item.frontImage);

export function HomeProductCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;
  const active = slides[index] ?? slides[0];

  const go = useCallback(
    (next: number) => {
      if (!total) return;
      setIndex((next + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (paused || total <= 1) return;
    const timer = window.setInterval(() => go(index + 1), 7000);
    return () => window.clearInterval(timer);
  }, [go, index, paused, total]);

  if (!active) return null;

  const productHref = active.externalUrl ?? "/shop";
  const slideLabel = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <section
      className="pb-4 pt-14 sm:pb-0 sm:pt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <FluidContainer>
        <div className="relative isolate border-x border-neutral-900">
          <div className="absolute left-4 top-4 z-20 grid grid-cols-2 gap-2 px-4 lg:left-14 lg:top-14 lg:px-0">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="flex items-center justify-center bg-[var(--color-blood)] p-3 text-black transition-opacity hover:opacity-90 disabled:opacity-40"
              disabled={total <= 1}
              aria-label="Previous product"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="flex items-center justify-center bg-[var(--color-blood)] p-3 text-black transition-opacity hover:opacity-90 disabled:opacity-40"
              disabled={total <= 1}
              aria-label="Next product"
            >
              →
            </button>
          </div>

          <div className="grid md:grid-cols-2">
            <div className="relative isolate flex flex-col justify-center gap-8 border-b border-neutral-900 p-4 md:gap-16 md:border-b-0 md:border-r md:p-10 lg:p-14">
              <div aria-hidden className="absolute left-4 top-4 hidden h-3 w-3 bg-[var(--color-blood)] md:block" />
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-neutral-500">{slideLabel}</p>
              <div className="flex flex-col items-start gap-2 lg:gap-10">
                <div className="flex flex-col gap-2 lg:gap-4">
                  <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-blood)]">
                    <span className="text-neutral-500">#GoWild · </span>
                    {active.category}
                  </p>
                  <h1 className="text-3xl font-black uppercase md:text-4xl lg:text-6xl 2xl:text-7xl">{active.name}</h1>
                  <p className="max-w-lg text-sm leading-relaxed text-neutral-400 md:text-base">{active.description}</p>
                  <p className="text-lg font-bold uppercase tracking-wide text-[var(--color-blood)] md:text-xl">
                    {active.accent}
                  </p>
                </div>
                <SenButton href={productHref}>{active.ctaLabel ?? "View product"}</SenButton>
              </div>
            </div>

            <div className="relative flex items-center justify-center p-4 md:p-10 lg:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-8 right-0 w-[38%] bg-[linear-gradient(118deg,transparent_49.5%,rgba(229,6,47,0.14)_50%,transparent_50.5%)]"
              />
              <div className="relative isolate aspect-square w-full overflow-hidden border border-neutral-900 bg-neutral-950">
                {active.frontImage ? (
                  <Image
                    src={active.frontImage}
                    alt={active.name}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-2"
                  />
                ) : null}
                {active.backImage ? (
                  <Image
                    src={active.backImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                ) : null}
              </div>
            </div>
          </div>

          {total > 1 ? (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-900 p-4 md:px-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-500">RAD shop rack</p>
              <div className="flex flex-wrap gap-1">
                {slides.map((slide, i) => (
                  <button
                    key={slide.name}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-1.5 w-12 transition-colors duration-300 sm:w-20 ${
                      i === index ? "bg-[var(--color-blood)]" : "bg-neutral-900"
                    }`}
                    aria-label={`Show ${slide.name}`}
                    aria-current={i === index}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </FluidContainer>
    </section>
  );
}
