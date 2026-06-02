"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";

import { FluidContainer } from "@/components/ui/fluid-container";
import { EASE_EMPHASIS } from "@/components/ui/motion-tokens";
import { assets } from "@/lib/assets";

type Variant =
  | "default"
  | "about"
  | "roster"
  | "staff"
  | "content"
  | "contact"
  | "partners"
  | "legal"
  | "merch";

type HeroMeta = { mark: string; code: string; line: string; tags: string[] };

type PageShellHeroProps = {
  title: string;
  eyebrow: string;
  description: string;
  heroImage?: string;
  heroVideo?: string;
  status?: string;
  note?: ReactNode;
  meta: HeroMeta;
  variant: Variant;
};

export function PageShellHero({
  title,
  eyebrow,
  description,
  heroImage = assets.bgRed,
  heroVideo,
  status,
  note,
  meta
}: PageShellHeroProps) {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-b border-neutral-900 bg-black">
      {heroVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 z-[-3] h-full w-full object-cover opacity-20"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={heroImage}
          alt=""
          fill
          sizes="100vw"
          className="z-[-3] object-cover opacity-12"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 z-[-2] bg-[linear-gradient(180deg,rgba(229,6,47,0.08),transparent_42%,#000_92%)]"
      />

      <FluidContainer>
        <div className="border-x border-neutral-900 px-4 py-14 sm:px-6 md:px-8 md:py-16 lg:py-18">
          <motion.div
            initial={false}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_EMPHASIS }}
            className="max-w-4xl"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-blood)]">
              {eyebrow}
            </p>

            <motion.h1
              initial={false}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE_EMPHASIS, delay: 0.04 }}
              className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.94] tracking-normal text-white"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={false}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_EMPHASIS, delay: 0.1 }}
              className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base"
            >
              {description}
            </motion.p>

            <motion.div
              initial={false}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_EMPHASIS, delay: 0.14 }}
              className="mt-5 flex flex-wrap items-center gap-3"
            >
              {status ? (
                <span className="inline-flex border border-neutral-800 bg-black px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-300">
                  {status}
                </span>
              ) : null}
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                {meta.line}
              </span>
            </motion.div>

            {note ? (
              <motion.div
                initial={false}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE_EMPHASIS, delay: 0.18 }}
                className="mt-6 max-w-2xl border border-neutral-900 bg-black p-4"
              >
                {note}
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      </FluidContainer>
    </section>
  );
}
