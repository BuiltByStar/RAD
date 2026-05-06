"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/ui";
import { EASE_EMPHASIS } from "@/components/ui/motion-tokens";

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
  heroImage = "/assets/RadBanner1920_1080.png",
  heroVideo,
  status,
  note,
  meta,
  variant
}: PageShellHeroProps) {
  const reduced = useReducedMotion();
  const compact = variant === "roster";

  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-black">
      {heroVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 z-[-3] h-full w-full object-cover opacity-55"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={heroImage}
          alt=""
          fill
          sizes="100vw"
          className="z-[-3] object-cover opacity-58"
        />
      )}
      <div aria-hidden className="absolute inset-0 z-[-2] bg-[linear-gradient(90deg,rgba(2,2,4,0.95)_0%,rgba(10,0,0,0.78)_48%,rgba(2,2,4,0.72)_100%)]" />
      <div aria-hidden className="absolute inset-0 z-[-1] bg-[radial-gradient(76%_58%_at_50%_20%,rgba(255,0,0,0.18),transparent_62%)]" />
      <div aria-hidden className="absolute inset-0 z-[-1] opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:56px_56px]" />
      <motion.div
        aria-hidden
        className="absolute left-[-18%] top-[36%] z-[-1] h-24 w-[80%] rotate-[-8deg] bg-[linear-gradient(90deg,transparent,rgba(255,0,0,0.32),rgba(255,255,255,0.1),transparent)] blur-sm"
        animate={reduced ? undefined : { x: ["-10%", "34%", "-10%"], opacity: [0.22, 0.68, 0.22] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div aria-hidden className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#ff0000]/55 to-transparent" />

      <Container size="xl">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_EMPHASIS }}
          className={
            compact
              ? "max-w-5xl pb-8 pt-20 sm:pb-10 sm:pt-24 lg:pb-12 lg:pt-26"
              : "max-w-5xl pb-10 pt-22 sm:pb-12 sm:pt-26 lg:pb-16 lg:pt-30"
          }
        >
          <motion.div
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/52"
          >
            <span>{eyebrow}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-[color:var(--color-rad)]" />
            <span>{meta.line}</span>
          </motion.div>

          <motion.h1
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE_EMPHASIS, delay: 0.08 }}
            className={
              compact
                ? "mt-5 max-w-5xl font-[family-name:var(--font-display)] text-[clamp(3rem,6.2vw,6rem)] font-extrabold uppercase leading-[0.88] tracking-tight text-white"
                : "mt-5 max-w-5xl font-[family-name:var(--font-display)] text-[clamp(3.2rem,7vw,6.4rem)] font-extrabold uppercase leading-[0.88] tracking-tight text-white"
            }
          >
            {title}
          </motion.h1>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.62, ease: EASE_EMPHASIS, delay: 0.13 }}
            className="mt-5 flex flex-wrap gap-2"
          >
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#ff0000]/26 bg-[#ff0000]/8 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_EMPHASIS, delay: 0.16 }}
            className={
              compact
                ? "mt-4 max-w-2xl text-sm leading-relaxed text-white/64 sm:text-base"
                : "mt-5 max-w-3xl text-sm leading-relaxed text-white/64 sm:text-lg"
            }
          >
            {description}
          </motion.p>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_EMPHASIS, delay: 0.22 }}
            className={compact ? "mt-6 flex flex-wrap items-center gap-3" : "mt-8 flex flex-wrap items-center gap-3"}
          >
            {status ? (
              <span className="inline-flex rounded-md border border-white/14 bg-black/45 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/78">
                {status}
              </span>
            ) : null}
          </motion.div>

          {note ? (
            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 10 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_EMPHASIS, delay: 0.28 }}
              className="mt-8 max-w-2xl rounded-md border border-white/12 bg-black/42 p-4 backdrop-blur"
            >
              {note}
            </motion.div>
          ) : null}
        </motion.div>
      </Container>
    </section>
  );
}
