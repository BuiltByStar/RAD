"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/ui";
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
  meta,
  variant
}: PageShellHeroProps) {
  const reduced = useReducedMotion();
  const compact = variant === "roster";

  return (
    <section className="rad-dot-surface relative isolate overflow-hidden border-b border-white/10 bg-[#050102]">
      {heroVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 z-[-3] h-full w-full object-cover opacity-30"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={heroImage}
          alt=""
          fill
          sizes="100vw"
          className="z-[-3] object-cover opacity-24"
        />
      )}
      <div aria-hidden className="absolute inset-0 z-[-2] bg-[linear-gradient(90deg,#050102_0%,rgba(5,1,2,0.92)_52%,rgba(52,1,6,0.78)_100%)]" />
      <div aria-hidden className="absolute inset-0 z-[-1] bg-[radial-gradient(70%_48%_at_20%_10%,rgba(220,20,60,0.18),transparent_60%)]" />
      <div
        aria-hidden
        className="absolute right-[-14rem] top-[-12rem] z-[-1] h-[32rem] w-[32rem] rounded-full bg-[#dc143c]/14 blur-3xl"
      />
      <motion.div
        aria-hidden
        className="absolute left-[-18%] top-[52%] z-[-1] h-px w-[70%] bg-[linear-gradient(90deg,transparent,rgba(220,20,60,0.8),transparent)]"
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
              ? "grid gap-8 pb-7 pt-18 sm:pb-8 sm:pt-22 lg:grid-cols-[1fr_0.42fr] lg:items-end lg:pb-9 lg:pt-24"
              : "grid gap-8 pb-10 pt-22 sm:pb-12 sm:pt-26 lg:grid-cols-[1fr_0.42fr] lg:items-end lg:pb-14 lg:pt-28"
          }
        >
          <div className="min-w-0 max-w-4xl">
            <motion.div
              initial={false}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/52"
            >
              <span>{eyebrow}</span>
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-rad)] shadow-[0_0_18px_rgba(220,20,60,0.65)]" />
              <span>{meta.line}</span>
            </motion.div>

            <motion.h1
              initial={false}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE_EMPHASIS, delay: 0.08 }}
              className={
                compact
                  ? "mt-4 max-w-[calc(100vw-3rem)] font-[family-name:var(--font-display)] text-[clamp(2.8rem,5.6vw,5rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.01em] text-white sm:max-w-4xl"
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
                  ? "mt-4 w-full max-w-[calc(100vw-3rem)] break-words text-sm leading-relaxed text-white/68 sm:max-w-2xl sm:text-base"
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
                <span className="inline-flex rounded-full border border-white/12 bg-white/[0.05] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/76 backdrop-blur-xl">
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
                className="mt-6 max-w-2xl rounded-[1.35rem] border border-white/10 bg-black/28 p-4 backdrop-blur-xl"
              >
                {note}
              </motion.div>
            ) : null}
          </div>

          <motion.div
            aria-hidden
            initial={false}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE_EMPHASIS, delay: 0.12 }}
            className="relative hidden min-h-[250px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/28 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl lg:block"
          >
            <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_36%,rgba(220,20,60,0.18),transparent_62%)]" />
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/[0.055] blur-2xl" />
            <div className="absolute -bottom-20 left-8 h-52 w-52 rounded-full bg-[#dc143c]/16 blur-3xl" />
            <Image
              src={assets.logoMark}
              alt=""
              width={420}
              height={520}
              className="relative z-10 mx-auto h-[220px] w-auto object-contain opacity-95 drop-shadow-[0_24px_60px_rgba(220,20,60,0.18)]"
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">{meta.code}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">{meta.mark}</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
