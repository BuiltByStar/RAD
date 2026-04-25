"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
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
  | "legal";

type HeroMeta = { mark: string; code: string; channel: string; tags: string[] };

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

const copyVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } }
};

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EMPHASIS } }
};

const accentByVariant: Record<Variant, string> = {
  default: "rgba(255,0,0,0.18)",
  about: "rgba(255,0,0,0.2)",
  roster: "rgba(255,0,0,0.24)",
  staff: "rgba(255,255,255,0.08)",
  content: "rgba(255,0,0,0.18)",
  contact: "rgba(255,0,0,0.2)",
  partners: "rgba(255,0,0,0.18)",
  legal: "rgba(255,255,255,0.06)"
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
  const stagger = reduced ? {} : ({ variants: copyVariants, initial: "hidden", animate: "visible" } as const);
  const item = reduced ? {} : ({ variants: rise } as const);
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
          priority
          sizes="100vw"
          className="z-[-3] object-cover opacity-58"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 z-[-2] bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.82)_42%,rgba(0,0,0,0.58)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-1]"
        style={{
          background: `radial-gradient(720px 360px at 18% 42%, ${accentByVariant[variant]}, transparent 70%)`
        }}
      />

      <Container size="xl">
        <motion.div
          {...stagger}
          className={
            compact
              ? "max-w-4xl pb-8 pt-16 sm:pb-10 sm:pt-20 lg:pb-12 lg:pt-24"
              : "max-w-4xl pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32"
          }
        >
          <motion.div
            {...item}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/62"
          >
            <span className="text-[color:var(--color-rad)]">{eyebrow}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-white/35" />
            <span>{meta.channel}</span>
            <span className="hidden sm:inline">{meta.code}</span>
          </motion.div>

          <motion.h1
            {...item}
            className={
              compact
                ? "mt-5 max-w-5xl font-[family-name:var(--font-display)] text-[clamp(2.8rem,5.6vw,5rem)] font-extrabold uppercase leading-[0.92] tracking-normal text-white"
                : "mt-5 max-w-5xl font-[family-name:var(--font-display)] text-[clamp(2.9rem,6.4vw,5.8rem)] font-extrabold uppercase leading-[0.92] tracking-normal text-white"
            }
          >
            {title}
          </motion.h1>

          <motion.p
            {...item}
            className={
              compact
                ? "mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
                : "mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-xl"
            }
          >
            {description}
          </motion.p>

          <motion.div {...item} className={compact ? "mt-6 flex flex-wrap items-center gap-3" : "mt-8 flex flex-wrap items-center gap-3"}>
            {status ? (
              <span className="inline-flex rounded-lg border border-[color:var(--color-rad)]/40 bg-[color:var(--color-rad)]/14 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                {status}
              </span>
            ) : null}
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex rounded-lg border border-white/12 bg-white/[0.055] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/64"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {note ? (
            <motion.div {...item} className="mt-8 max-w-2xl rounded-lg border border-white/12 bg-black/42 p-4 backdrop-blur">
              {note}
            </motion.div>
          ) : null}
        </motion.div>
      </Container>
    </section>
  );
}
