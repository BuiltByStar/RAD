"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { FluidContainer } from "@/components/ui/fluid-container";
import { SenButton } from "@/components/ui/sen-button";
import { merchItems } from "@/lib/site-data";

const SLIDE_DURATION_MS = 10000;
const SLIDE_DURATION_REDUCED_MS = 20000;

const slides = merchItems.filter((item) => item.frontImage);

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return reduced;
}

function CarouselChevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
    >
      {direction === "prev" ? (
        <path d="M15 6l-6 6 6 6" strokeLinecap="square" />
      ) : (
        <path d="M9 6l6 6-6 6" strokeLinecap="square" />
      )}
    </svg>
  );
}

const arrowButtonClass =
  "absolute top-1/2 z-20 flex -translate-y-1/2 items-center justify-center border border-neutral-800 bg-black/70 p-2.5 text-neutral-400 transition-colors hover:border-[var(--color-blood)] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-blood)] disabled:pointer-events-none disabled:opacity-30 sm:p-3";

export function HomeProductCarousel() {
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const total = slides.length;
  const active = slides[index] ?? slides[0];
  const slideDuration = reducedMotion ? SLIDE_DURATION_REDUCED_MS : SLIDE_DURATION_MS;

  const go = useCallback(
    (next: number) => {
      if (!total) return;
      setIndex((next + total) % total);
    },
    [total]
  );

  /* Reduced motion: no animated bar — advance on a fixed timer instead */
  useEffect(() => {
    if (total <= 1 || !reducedMotion) return;
    const timer = window.setTimeout(() => go(index + 1), slideDuration);
    return () => window.clearTimeout(timer);
  }, [go, index, reducedMotion, slideDuration, total]);

  function handleProgressComplete(event: React.AnimationEvent<HTMLDivElement>) {
    if (event.animationName !== "home-carousel-progress" || reducedMotion || total <= 1) {
      return;
    }
    go(index + 1);
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || total <= 1) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        go(index + 1);
      }
    };

    section.addEventListener("keydown", onKeyDown);
    return () => section.removeEventListener("keydown", onKeyDown);
  }, [go, index, total]);

  if (!active) return null;

  const productHref = active.externalUrl ?? "/shop";
  const slideLabel = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <section
      ref={sectionRef}
      className="pb-4 pt-14 sm:pb-0 sm:pt-16"
      aria-roledescription="carousel"
      aria-label="Featured products"
      tabIndex={0}
    >
      <FluidContainer>
        <div className="relative isolate border-x border-neutral-900">
          {total > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(index - 1)}
                className={`${arrowButtonClass} left-0 -translate-x-px`}
                aria-label="Previous product"
              >
                <CarouselChevron direction="prev" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className={`${arrowButtonClass} right-0 translate-x-px`}
                aria-label="Next product"
              >
                <CarouselChevron direction="next" />
              </button>
            </>
          ) : null}

          <div className="grid md:grid-cols-[1fr_minmax(240px,36%)_1fr]">
            <div className="relative isolate flex flex-col justify-center gap-6 border-b border-neutral-900 p-4 md:gap-10 md:border-b-0 md:border-r md:p-8 md:text-right lg:p-12">
              <div aria-hidden className="absolute left-4 top-4 hidden h-3 w-3 bg-[var(--color-blood)] md:left-auto md:right-4" />
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-neutral-500">{slideLabel}</p>
              <div className="flex flex-col gap-2 md:items-end lg:gap-4">
                <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-blood)]">
                  <span className="text-neutral-500">#GoWild · </span>
                  {active.category}
                </p>
                <h1 className="text-3xl font-black uppercase md:text-3xl lg:text-5xl 2xl:text-6xl">{active.name}</h1>
              </div>
            </div>

            <div className="relative flex items-center justify-center border-b border-neutral-900 p-4 md:border-b-0 md:border-r md:px-6 md:py-10 lg:px-10 lg:py-14">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-4 bg-[linear-gradient(118deg,transparent_49.5%,rgba(229,6,47,0.12)_50%,transparent_50.5%)]"
              />
              <div className="relative isolate aspect-square w-full max-w-md overflow-hidden border border-neutral-900 bg-neutral-950">
                {active.frontImage ? (
                  <Image
                    src={active.frontImage}
                    alt={active.name}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 36vw"
                    className="object-contain p-2"
                  />
                ) : null}
                {active.backImage ? (
                  <Image
                    src={active.backImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 36vw"
                    className="object-contain p-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                ) : null}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-6 p-4 md:gap-10 md:p-8 lg:p-12">
              <div className="flex flex-col gap-2 lg:gap-4">
                <p className="max-w-md text-sm leading-relaxed text-neutral-400 md:text-base">{active.description}</p>
                <p className="text-lg font-bold uppercase tracking-wide text-[var(--color-blood)] md:text-xl">
                  {active.accent}
                </p>
              </div>
              <SenButton href={productHref} className="max-w-md">
                {active.ctaLabel ?? "View product"}
              </SenButton>
            </div>
          </div>

          {total > 1 ? (
            <>
              <div
                className="h-px w-full bg-neutral-900"
                role="progressbar"
                aria-label="Time until next product"
                aria-valuetext={`Next jersey in ${slideDuration / 1000} seconds`}
                aria-busy={!reducedMotion}
              >
                <div
                  key={index}
                  className={`home-carousel-progress-fill h-full bg-[var(--color-blood)] ${
                    reducedMotion ? "home-carousel-progress-fill--static" : ""
                  }`}
                  style={{ animationDuration: `${slideDuration}ms` }}
                  onAnimationEnd={handleProgressComplete}
                />
              </div>

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
            </>
          ) : null}
        </div>
      </FluidContainer>
    </section>
  );
}
