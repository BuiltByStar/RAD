"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container, Eyebrow } from "@/components/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const systems = [
  {
    key: "core",
    label: "Core",
    meta: "Identity / culture",
    className: "left-[7%] top-[10%] items-start text-left",
    accent: "bg-white/12"
  },
  {
    key: "vanguard",
    label: "Vanguard",
    meta: "Competition / roster",
    className: "right-[7%] top-[12%] items-end text-right",
    accent: "bg-[color:var(--color-rad)]/75"
  },
  {
    key: "media",
    label: "Media",
    meta: "Content / broadcasts",
    className: "left-[9%] bottom-[13%] items-start text-left",
    accent: "bg-[color:var(--color-rad-hi)]/70"
  },
  {
    key: "alliances",
    label: "Alliances",
    meta: "Activations / partners",
    className: "right-[8%] bottom-[11%] items-end text-right",
    accent: "bg-white/14"
  }
] as const;

function WorldsMatrix() {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(8,8,8,0.96),rgba(4,4,4,1))] shadow-[var(--shadow-card)]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(44%_32%_at_50%_50%,rgba(255,43,69,0.16),transparent_70%),radial-gradient(60%_44%_at_18%_18%,rgba(255,255,255,0.03),transparent_72%),radial-gradient(60%_42%_at_86%_80%,rgba(255,43,69,0.08),transparent_74%)]"
      />

      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--color-rad)]/15 bg-[radial-gradient(circle,rgba(255,43,69,0.14),transparent_68%)] blur-[2px]"
        animate={reduced ? undefined : { scale: [0.94, 1.04, 0.96], opacity: [0.45, 0.9, 0.55] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="pointer-events-none absolute inset-[6%] rounded-[28px] border border-white/8" />
      <div className="pointer-events-none absolute inset-[14%] rounded-[26px] border border-white/6" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_49%,transparent_51%),linear-gradient(transparent_0%,rgba(255,255,255,0.03)_49%,transparent_51%)] bg-[size:100%_100%]" />

      <motion.div
        aria-hidden
        className="absolute left-[12%] top-[20%] h-[2px] w-[34%] origin-left bg-[linear-gradient(90deg,rgba(255,43,69,0.7),rgba(255,255,255,0.08))]"
        animate={reduced ? undefined : { scaleX: [0.82, 1.04, 0.9], opacity: [0.45, 1, 0.55] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[12%] top-[23%] h-[2px] w-[32%] origin-right bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,43,69,0.72))]"
        animate={reduced ? undefined : { scaleX: [0.92, 1.06, 0.88], opacity: [0.4, 0.92, 0.52] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.18 }}
      />
      <motion.div
        aria-hidden
        className="absolute left-[18%] bottom-[23%] h-[2px] w-[28%] origin-left bg-[linear-gradient(90deg,rgba(255,43,69,0.7),rgba(255,255,255,0.08))]"
        animate={reduced ? undefined : { scaleX: [0.82, 1.04, 0.9], opacity: [0.45, 1, 0.55] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.34 }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[16%] bottom-[22%] h-[2px] w-[27%] origin-right bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,43,69,0.72))]"
        animate={reduced ? undefined : { scaleX: [0.92, 1.08, 0.88], opacity: [0.42, 0.94, 0.54] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.12 }}
      />

      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,43,69,0.12),rgba(255,255,255,0.03)_28%,rgba(8,8,8,0.96)_72%)] shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
        animate={reduced ? undefined : { rotate: [-2.2, 2.2, -2.2], y: [-10, 10, -10] }}
        transition={{ duration: 9.6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[36%] w-[36%] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015)),rgba(5,5,5,0.66)] shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
        animate={reduced ? undefined : { rotate: [3, -3, 3], scale: [0.98, 1.04, 1] }}
        transition={{ duration: 10.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute left-1/2 top-1/2 flex w-full max-w-[280px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div className="relative flex w-full items-center justify-center rounded-[24px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01)),rgba(5,5,5,0.7)] px-8 py-8 shadow-[0_20px_54px_rgba(0,0,0,0.42)]">
          <motion.div
            aria-hidden
            className="absolute inset-x-[10%] bottom-[-14%] h-10 rounded-full bg-[radial-gradient(circle,rgba(255,43,69,0.85),transparent_72%)] blur-xl"
            animate={reduced ? undefined : { scaleX: [0.94, 1.1, 0.96], opacity: [0.6, 1, 0.62] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-[24px] bg-[linear-gradient(112deg,transparent_24%,rgba(255,255,255,0.14)_42%,rgba(255,43,69,0.2)_52%,transparent_74%)]"
            animate={reduced ? undefined : { x: ["-140%", "140%"] }}
            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
          />
          <Image
            src="/assets/RadNewLogoWordmarkWhite.png"
            alt=""
            width={720}
            height={190}
            className="relative z-10 h-auto w-full max-w-[200px]"
          />
        </div>
      </div>

      {systems.map((system, index) => (
        <motion.div
          key={system.key}
          className={`absolute flex ${system.className}`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
        >
          <div className="min-w-[126px] rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01)),rgba(8,8,8,0.82)] px-4 py-3 shadow-[0_18px_34px_rgba(0,0,0,0.32)]">
            <div className="flex items-center gap-2">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${system.accent} shadow-[0_0_18px_rgba(255,43,69,0.4)]`} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-3 text-[17px] font-[family-name:var(--font-display)] font-bold uppercase tracking-[0.1em] text-white">
              {system.label}
            </p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
              {system.meta}
            </p>
          </div>
        </motion.div>
      ))}

      <div className="pointer-events-none absolute inset-4">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-white/30" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-white/30" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-white/30" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-white/30" />
      </div>
    </div>
  );
}

export function HomeWorldsPortal() {
  return (
    <section id="experience" className="relative border-t border-white/10 py-24 sm:py-32">
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-md"
          >
            <Eyebrow>Systems</Eyebrow>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl">
              Four worlds.
              <br />
              One organization.
            </h2>
            <p className="mt-5 text-sm text-white/60 sm:text-base">
              An interactive map of how RAD operates across competition, content, identity, and activations without flattening the org into a single page.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about" variant="primary">About the org</Button>
              <Button href="/roster" variant="outline">Roster</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative aspect-[4/3] w-full lg:aspect-[16/11]"
          >
            <div
              aria-hidden
              className="absolute -inset-px rounded-[28px] opacity-60 [background:conic-gradient(from_var(--border-angle),transparent_0%,rgb(255_43_69_/_0.35)_10%,transparent_30%)] [animation:border-rotate_8s_linear_infinite]"
            />
            <WorldsMatrix />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
