"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";

import { Badge, Button, Container, Eyebrow, MatchCard, Stat } from "@/components/ui";
import { stats } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 }
};

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Scroll parallax
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : 120]);
  const bgScale = useTransform(scrollY, [0, 800], [1.05, reduced ? 1.05 : 1.14]);
  const textY = useTransform(scrollY, [0, 500], [0, reduced ? 0 : -40]);

  // Cursor-tracked spotlight
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const mxS = useSpring(mx, { stiffness: 60, damping: 20 });
  const myS = useSpring(my, { stiffness: 60, damping: 20 });
  const bg = useMotionTemplate`radial-gradient(600px circle at ${mxS}% ${myS}%, rgb(255 43 69 / 0.22), transparent 60%)`;

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <motion.section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative isolate overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Backdrop (parallaxed) */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: bgY, scale: bgScale }}
        aria-hidden
      >
        <Image
          src="/assets/RadRivals_Wallpaper_Red.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgb(255_43_69_/_0.25),_transparent_55%),radial-gradient(ellipse_at_bottom,_rgb(0_0_0_/_0.95),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgb(5_5_5_/_0.45)_0%,_rgb(5_5_5_/_0.92)_65%,_#050505_100%)]" />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:repeating-linear-gradient(to_bottom,transparent_0_2px,rgb(255_255_255_/_0.6)_2px_3px)]" />
      </motion.div>

      {/* Cursor spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-screen"
        style={{ background: bg }}
      />

      {/* Ambient corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-32 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgb(255_43_69_/_0.2),transparent_65%)] blur-2xl"
      />

      <Container size="xl">
        <motion.div style={{ y: textY }} className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          {/* Copy */}
          <motion.div variants={rise} transition={{ duration: 0.8, ease: EASE }} className="max-w-2xl">
            <motion.div variants={rise} transition={{ duration: 0.6, ease: EASE }}>
              <Eyebrow tone="rad">RAD Esports / Marvel Rivals</Eyebrow>
            </motion.div>

            <motion.h1
              variants={rise}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-6 font-[family-name:var(--font-display)] text-[clamp(3.25rem,8vw,6.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.01em] text-white [text-wrap:balance]"
            >
              Go{" "}
              <span className="relative inline-block text-[color:var(--color-rad)]">
                Wild.
                <motion.span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 h-[3px] origin-left rounded-full bg-[color:var(--color-rad)]/70"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
                />
              </span>
              <br />
              Stay Champions.
            </motion.h1>

            <motion.p
              variants={rise}
              transition={{ duration: 0.6, ease: EASE }}
              className="mt-6 max-w-xl text-base text-white/70 sm:text-lg"
            >
              Inaugural Marvel Rivals Ignite{" "}
              <span className="text-white">Mid-Season World Champions</span> and the reigning{" "}
              <span className="text-white">Season 6: EMEA PC</span> title holders. Untamed,
              unstoppable, and never by the book.
            </motion.p>

            <motion.div
              variants={rise}
              transition={{ duration: 0.6, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <BreathingButton href="/roster">
                Meet the roster
                <span aria-hidden>→</span>
              </BreathingButton>
              <Button href="/content" variant="outline" size="lg">
                Watch latest
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                Partner with RAD
              </Button>
            </motion.div>

            <motion.div
              variants={rise}
              transition={{ duration: 0.6, ease: EASE }}
              className="mt-14 flex flex-wrap items-stretch gap-6 sm:gap-10"
            >
              {stats.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} />
              ))}
            </motion.div>
          </motion.div>

          {/* Feature card */}
          <motion.div
            variants={rise}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative"
          >
            <motion.div
              aria-hidden
              className="absolute -inset-6 -z-10 bg-[radial-gradient(circle_at_70%_30%,rgb(255_43_69_/_0.3),transparent_55%)] blur-2xl"
              animate={reduced ? undefined : { opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[.06] to-white/[0.015] p-5 shadow-[var(--shadow-card)] backdrop-blur">
              <div className="flex items-center justify-between">
                <Badge tone="live">On Air</Badge>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                  teamrad.gg
                </span>
              </div>

              <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <motion.div
                  className="absolute inset-0"
                  animate={reduced ? undefined : { scale: [1, 1.04, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/assets/RadPlayerBannerPNG8.png"
                    alt="RAD Esports roster"
                    fill
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Scanning line */}
                {!reduced && (
                  <motion.div
                    aria-hidden
                    className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[color:var(--color-rad)]/70 to-transparent"
                    initial={{ y: "-10%", opacity: 0 }}
                    animate={{ y: "110%", opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      repeatDelay: 1.2,
                      ease: "linear"
                    }}
                  />
                )}

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
                    Marvel Rivals // Starters
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight">
                    World & EMEA Champions
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <MatchCard
                  status="final"
                  competition="Season 6: EMEA PC"
                  stage="Grand Finals"
                  dateLabel="Mar 2026"
                  home={{ name: "RAD", score: "W" }}
                  away={{ name: "Regional Finalists", score: "L" }}
                  note="RAD closed out the EMEA title on home soil. Full VOD coming to the content page."
                  href="/content"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <motion.div
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.span
            className="block h-2 w-1 rounded-full bg-white/70"
            animate={reduced ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

function BreathingButton({ href, children }: { href: string; children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className="relative inline-flex rounded-md"
      animate={
        reduced
          ? undefined
          : {
              boxShadow: [
                "0 0 40px rgb(255 43 69 / 0.25), 0 0 80px rgb(255 43 69 / 0.12)",
                "0 0 60px rgb(255 43 69 / 0.45), 0 0 120px rgb(255 43 69 / 0.22)",
                "0 0 40px rgb(255 43 69 / 0.25), 0 0 80px rgb(255 43 69 / 0.12)"
              ]
            }
      }
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <Button href={href} size="lg">
        {children}
      </Button>
    </motion.span>
  );
}
