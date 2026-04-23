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
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } }
};

const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EMPHASIS } }
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
  const stagger = reduced ? {} : { variants: copyVariants, initial: "hidden", animate: "visible" } as const;
  const item = reduced ? {} : { variants: rise } as const;
  const accentMap: Record<string, string> = {
    about: "from-[color:var(--color-rad)]/26 via-transparent to-white/6",
    roster: "from-[color:var(--color-rad)]/22 via-transparent to-[color:var(--color-rad-hi)]/12",
    staff: "from-white/10 via-transparent to-[color:var(--color-rad)]/10",
    content: "from-[color:var(--color-rad)]/18 via-transparent to-white/10",
    contact: "from-[color:var(--color-rad)]/20 via-transparent to-white/8",
    partners: "from-[color:var(--color-rad)]/18 via-transparent to-white/6",
    legal: "from-white/8 via-transparent to-white/4",
    default: "from-[color:var(--color-rad)]/20 via-transparent to-white/6"
  };

  return (
    <section className="relative overflow-hidden pb-12 pt-6 sm:pb-18 sm:pt-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1100px_520px_at_80%_-10%,rgb(255_43_69_/_0.18),transparent_60%),radial-gradient(900px_400px_at_0%_120%,rgb(255_43_69_/_0.10),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <Container size="xl">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_EMPHASIS }}
          className="relative grid gap-6 overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.012)),rgba(5,5,5,0.88)] p-5 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:p-10 [clip-path:polygon(0_0,calc(100%-24px)_0,100%_24px,100%_100%,24px_100%,0_calc(100%-24px))]"
        >
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentMap[variant] ?? accentMap.default}`}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.02)_49%,transparent_51%),linear-gradient(transparent_0%,rgba(255,255,255,0.02)_49%,transparent_51%)] bg-[size:72px_72px]"
          />
          <motion.span
            aria-hidden
            initial={reduced ? undefined : { scaleX: 0 }}
            animate={reduced ? undefined : { scaleX: 1 }}
            transition={{ duration: 1.1, ease: EASE_EMPHASIS, delay: 0.2 }}
            style={{ originX: 0 }}
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent"
          />
          <motion.span
            aria-hidden
            initial={reduced ? undefined : { scaleY: 0 }}
            animate={reduced ? undefined : { scaleY: 1 }}
            transition={{ duration: 0.8, ease: EASE_EMPHASIS, delay: 0.3 }}
            style={{ originY: 0 }}
            className="pointer-events-none absolute left-0 top-10 hidden h-28 w-px bg-gradient-to-b from-[color:var(--color-rad)]/80 to-transparent sm:block"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute right-5 top-5 h-4 w-4 border-r border-t border-white/30"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-5 left-5 h-4 w-4 border-b border-l border-white/30"
          />

          <motion.div
            {...stagger}
            className="relative z-10 flex flex-col justify-between gap-10"
          >
            <motion.div
              {...item}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 font-[family-name:var(--font-display)] text-[11px] uppercase tracking-[0.24em] text-white/38"
            >
              <span className="flex items-center gap-2">
                <motion.span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-rad)] shadow-[0_0_8px_rgb(255_43_69_/_0.8)]"
                  animate={reduced ? undefined : { opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
                {meta.code}
              </span>
              <span>{meta.channel}</span>
              <span className="ml-auto hidden text-white/28 sm:inline">teamrad.gg</span>
            </motion.div>

            <div>
              <motion.p
                {...item}
                className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-rad-hi)]"
              >
                {eyebrow}
              </motion.p>
              <motion.h1
                {...item}
                className="relative mt-4 max-w-[10ch] font-[family-name:var(--font-display)] text-[clamp(2.6rem,6vw,5.4rem)] uppercase leading-[0.88] tracking-[-0.03em] text-white [text-wrap:balance]"
              >
                {title.split(" ").map((word, idx) => (
                  <motion.span
                    key={`${word}-${idx}`}
                    className="mr-[0.25em] inline-block"
                    initial={reduced ? undefined : { opacity: 0, y: 30, filter: "blur(12px)" }}
                    animate={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.8,
                      ease: EASE_EMPHASIS,
                      delay: 0.2 + idx * 0.08
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)] bg-[length:200%_100%] mix-blend-overlay"
                  animate={reduced ? undefined : { backgroundPosition: ["200% 0%", "-100% 0%"] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5 }}
                />
              </motion.h1>
              <motion.p
                {...item}
                className="mt-6 max-w-[40rem] text-base leading-relaxed text-white/64 sm:text-lg"
              >
                {description}
              </motion.p>
              {status ? (
                <motion.span
                  {...item}
                  className="mt-7 inline-flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 [clip-path:polygon(0_0,calc(100%-14px)_0,100%_50%,calc(100%-14px)_100%,0_100%,0_0)]"
                >
                  <motion.span
                    className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_6px_rgb(52_211_153_/_0.8)]"
                    animate={reduced ? undefined : { opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {status}
                </motion.span>
              ) : null}
            </div>

            <motion.div {...item} className="flex flex-wrap items-center gap-2 pt-1">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55 [clip-path:polygon(0_0,calc(100%-12px)_0,100%_50%,calc(100%-12px)_100%,0_100%,0_0)]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_EMPHASIS, delay: 0.2 }}
            className="relative z-10 flex flex-col gap-4"
          >
            <div className="group relative aspect-[4/5] overflow-hidden border border-white/10 bg-black sm:aspect-[5/6] lg:aspect-[4/5] [clip-path:polygon(0_0,calc(100%-18px)_0,100%_18px,100%_100%,18px_100%,0_calc(100%-18px))]">
              {heroVideo ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
                >
                  <source src={heroVideo} type="video/mp4" />
                </video>
              ) : (
                <motion.div
                  className="absolute inset-0"
                  initial={reduced ? undefined : { scale: 1.08 }}
                  animate={reduced ? undefined : { scale: 1 }}
                  transition={{ duration: 1.6, ease: EASE_EMPHASIS }}
                >
                  <Image
                    src={heroImage}
                    alt={title}
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 44vw"
                    className="object-cover"
                  />
                </motion.div>
              )}

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_220px_at_70%_30%,rgb(255_43_69_/_0.22),transparent_60%)] mix-blend-screen"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_28%,rgba(255,255,255,0.07)_48%,transparent_72%)] mix-blend-overlay"
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[color:var(--color-rad)]/70 to-transparent"
                animate={reduced ? undefined : { y: ["0%", "3200%", "0%"] }}
                transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: "blur(1px)" }}
              />

              <div aria-hidden className="pointer-events-none absolute inset-3">
                <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-white/40" />
                <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-white/40" />
                <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-white/40" />
                <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-white/40" />
              </div>

              <div className="absolute left-4 top-4 flex items-center gap-2 border border-white/15 bg-black/50 px-2.5 py-1 backdrop-blur-sm [clip-path:polygon(0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%,0_0)]">
                <Image
                  src="/assets/RadNewLogoWordmarkRed.png"
                  alt=""
                  width={74}
                  height={22}
                  className="h-5 w-auto opacity-95"
                />
              </div>

              <p
                aria-hidden
                className="absolute inset-x-4 bottom-3 text-right font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.5vw,3rem)] uppercase leading-none tracking-tight text-white/10"
              >
                {meta.mark}
              </p>
            </div>

            {note ? (
              <motion.div
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_EMPHASIS, delay: 0.5 }}
                className="rounded-2xl border border-white/10 bg-white/[.03] p-4 sm:p-5"
              >
                {note}
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
