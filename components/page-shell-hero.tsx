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
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#050505]">
      {heroVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 z-[-3] h-full w-full object-cover opacity-36"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={heroImage}
          alt=""
          fill
          sizes="100vw"
          className="z-[-3] object-cover opacity-36"
        />
      )}
      <div aria-hidden className="absolute inset-0 z-[-2] bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.88)_54%,rgba(5,5,5,0.64)_100%)]" />
      <div aria-hidden className="absolute inset-0 z-[-1] bg-[radial-gradient(70%_48%_at_20%_10%,rgba(255,0,0,0.15),transparent_60%)]" />
      <motion.div
        aria-hidden
        className="absolute left-[-18%] top-[52%] z-[-1] h-px w-[70%] bg-[linear-gradient(90deg,transparent,rgba(255,0,0,0.8),transparent)]"
        animate={reduced ? undefined : { x: ["0%", "18%", "0%"], opacity: [0.22, 0.55, 0.22] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container size="xl">
        <motion.div
          initial={false}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_EMPHASIS }}
          className={
            compact
              ? "max-w-4xl pb-7 pt-18 sm:pb-8 sm:pt-22 lg:pb-9 lg:pt-24"
              : "max-w-4xl pb-10 pt-22 sm:pb-12 sm:pt-26 lg:pb-14 lg:pt-28"
          }
        >
          <motion.div
            initial={false}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/52"
          >
            <span>{eyebrow}</span>
            <span aria-hidden className="h-px w-8 bg-[color:var(--color-rad)]" />
            <span>{meta.line}</span>
          </motion.div>

          <motion.h1
            initial={false}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE_EMPHASIS, delay: 0.08 }}
            className={
              compact
                ? "mt-4 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.8rem,5.6vw,5rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.01em] text-white"
                : "mt-4 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(3rem,6.5vw,5.9rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.01em] text-white"
            }
          >
            {title}
          </motion.h1>

          <motion.p
            initial={false}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_EMPHASIS, delay: 0.16 }}
            className={
              compact
                ? "mt-4 max-w-2xl text-sm leading-relaxed text-white/68 sm:text-base"
                : "mt-5 max-w-3xl text-sm leading-relaxed text-white/68 sm:text-lg"
            }
          >
            {description}
          </motion.p>

          <motion.div
            initial={false}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_EMPHASIS, delay: 0.22 }}
            className={compact ? "mt-6 flex flex-wrap items-center gap-3" : "mt-7 flex flex-wrap items-center gap-3"}
          >
            {status ? (
              <span className="inline-flex rounded-md border border-white/12 bg-white/[0.04] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/76">
                {status}
              </span>
            ) : null}
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/34">
              {meta.tags.join(" / ")}
            </span>
          </motion.div>

          {note ? (
            <motion.div
              initial={false}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_EMPHASIS, delay: 0.28 }}
              className="mt-6 max-w-2xl rounded-md border border-white/10 bg-white/[0.035] p-4"
            >
              {note}
            </motion.div>
          ) : null}
        </motion.div>
      </Container>
    </section>
  );
}
