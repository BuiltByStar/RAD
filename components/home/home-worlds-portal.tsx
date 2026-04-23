"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container, Eyebrow } from "@/components/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const systems = [
  {
    key: "core",
    label: "Core",
    meta: "Identity / culture",
    href: "/about",
    className: "left-[7%] top-[8%] items-start text-left",
    accent: "bg-white/16",
    railClassName: "left-[26%] top-[26%] w-[22%]",
    dotClassName: "left-[46%] top-[calc(26%-4px)]"
  },
  {
    key: "vanguard",
    label: "Vanguard",
    meta: "Competition / roster",
    href: "/roster",
    className: "right-[7%] top-[8%] items-end text-right",
    accent: "bg-[color:var(--color-rad)]/78",
    railClassName: "right-[26%] top-[26%] w-[22%]",
    dotClassName: "right-[46%] top-[calc(26%-4px)]"
  },
  {
    key: "media",
    label: "Media",
    meta: "Content / broadcasts",
    href: "/content",
    className: "left-[7%] bottom-[10%] items-start text-left",
    accent: "bg-[color:var(--color-rad-hi)]/78",
    railClassName: "left-[26%] bottom-[24%] w-[22%]",
    dotClassName: "left-[46%] bottom-[calc(24%-4px)]"
  },
  {
    key: "alliances",
    label: "Alliances",
    meta: "Activations / partners",
    href: "/partners",
    className: "right-[7%] bottom-[10%] items-end text-right",
    accent: "bg-white/16",
    railClassName: "right-[26%] bottom-[24%] w-[22%]",
    dotClassName: "right-[46%] bottom-[calc(24%-4px)]"
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
        className="absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,43,69,0.16),rgba(255,43,69,0.06)_42%,transparent_74%)] blur-2xl"
        animate={reduced ? undefined : { scale: [0.96, 1.04, 0.98], opacity: [0.5, 0.92, 0.56] }}
        transition={{ duration: 6.6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="pointer-events-none absolute inset-[6%] rounded-[28px] border border-white/8" />
      <div className="pointer-events-none absolute inset-[14%] rounded-[26px] border border-white/6" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_49%,transparent_51%),linear-gradient(transparent_0%,rgba(255,255,255,0.03)_49%,transparent_51%)] bg-[size:100%_100%]" />

      {systems.map((system, index) => (
        <div key={`${system.key}-rail`}>
          <motion.div
            aria-hidden
            className={`absolute h-px ${system.railClassName} ${
              system.key === "core" || system.key === "media"
                ? "origin-right bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,43,69,0.55),rgba(255,255,255,0.04))]"
                : "origin-left bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,43,69,0.55),rgba(255,255,255,0.04))]"
            }`}
            animate={reduced ? undefined : { opacity: [0.3, 0.9, 0.38], scaleX: [0.94, 1.02, 0.96] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
          />
          <motion.span
            aria-hidden
            className={`absolute h-2.5 w-2.5 rounded-full bg-[color:var(--color-rad)] shadow-[0_0_18px_rgba(255,43,69,0.55)] ${system.dotClassName}`}
            animate={
              reduced
                ? undefined
                : system.key === "core" || system.key === "media"
                  ? { x: [-24, 18, -24], opacity: [0.38, 1, 0.38] }
                  : { x: [24, -18, 24], opacity: [0.38, 1, 0.38] }
            }
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.25 + index * 0.2 }}
          />
        </div>
      ))}

      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 [clip-path:polygon(12%_0,88%_0,100%_18%,100%_82%,88%_100%,12%_100%,0_82%,0_18%)] border border-white/10 bg-[linear-gradient(145deg,rgba(255,43,69,0.12),rgba(255,255,255,0.04)_26%,rgba(5,5,5,0.96)_72%)] shadow-[0_28px_72px_rgba(0,0,0,0.5)]"
        animate={reduced ? undefined : { rotate: [-1.4, 1.4, -1.4], y: [-6, 8, -6] }}
        transition={{ duration: 10.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 [clip-path:polygon(14%_0,86%_0,100%_18%,100%_82%,86%_100%,14%_100%,0_82%,0_18%)] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.012)),rgba(5,5,5,0.78)] shadow-[0_24px_58px_rgba(0,0,0,0.44)]"
        animate={reduced ? undefined : { rotate: [1.6, -1.6, 1.6], scale: [0.985, 1.015, 0.99] }}
        transition={{ duration: 9.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-[31%] top-1/2 h-[22%] w-[6%] -translate-y-1/2 [clip-path:polygon(18%_0,100%_0,82%_100%,0_100%)] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,43,69,0.08),rgba(8,8,8,0.9))]"
        animate={reduced ? undefined : { y: [-6, 5, -6], opacity: [0.45, 0.78, 0.48] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[31%] top-1/2 h-[22%] w-[6%] -translate-y-1/2 [clip-path:polygon(0_0,82%_0,100%_100%,18%_100%)] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,43,69,0.08),rgba(8,8,8,0.9))]"
        animate={reduced ? undefined : { y: [6, -5, 6], opacity: [0.45, 0.78, 0.48] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.24 }}
      />

      <div className="absolute left-1/2 top-1/2 flex w-full max-w-[320px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div className="relative flex w-full items-center justify-center [clip-path:polygon(12%_0,88%_0,100%_18%,100%_82%,88%_100%,12%_100%,0_82%,0_18%)] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.018)),rgba(5,5,5,0.7)] px-10 py-10 shadow-[0_24px_62px_rgba(0,0,0,0.48)]">
          <motion.div
            aria-hidden
            className="absolute inset-x-[14%] bottom-[-12%] h-10 rounded-full bg-[radial-gradient(circle,rgba(255,43,69,0.8),transparent_72%)] blur-xl"
            animate={reduced ? undefined : { scaleX: [0.94, 1.08, 0.98], opacity: [0.58, 0.94, 0.62] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(108deg,transparent_22%,rgba(255,255,255,0.1)_42%,rgba(255,43,69,0.18)_52%,transparent_76%)]"
            animate={reduced ? undefined : { x: ["-110%", "110%"] }}
            transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
          />
          <Image
            src="/assets/RadNewLogoWordmarkWhite.png"
            alt=""
            width={720}
            height={190}
            className="relative z-10 h-auto w-full max-w-[210px]"
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
          <motion.div whileHover={reduced ? undefined : { y: -4, scale: 1.02 }} transition={{ duration: 0.22, ease: "easeOut" }}>
            <Link
              href={system.href}
              className="group block min-w-[144px] rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01)),rgba(8,8,8,0.84)] px-4 py-3 shadow-[0_18px_34px_rgba(0,0,0,0.32)] transition-[border-color,background-color,transform,box-shadow] duration-300 hover:border-[color:var(--color-rad)]/36 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015)),rgba(8,8,8,0.9)] hover:shadow-[0_22px_40px_rgba(0,0,0,0.34)] focus-visible:border-[color:var(--color-rad)]/44 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-rad)]/35"
            >
              <div className={`flex items-center gap-2 ${system.className.includes("items-end") ? "justify-end" : ""}`}>
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${system.accent} shadow-[0_0_18px_rgba(255,43,69,0.4)] transition-transform duration-300 group-hover:scale-125`} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 text-[17px] font-[family-name:var(--font-display)] font-bold uppercase tracking-[0.1em] text-white transition-colors duration-300 group-hover:text-[color:var(--color-rad-hi)]">
                {system.label}
              </p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
                {system.meta}
              </p>
            </Link>
          </motion.div>
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
            className="relative mx-auto aspect-[4/3] w-full max-w-[980px] lg:aspect-[16/11]"
          >
            <div
              aria-hidden
              className="absolute -inset-px rounded-[28px] opacity-30 [background:conic-gradient(from_var(--border-angle),transparent_0%,rgb(255_43_69_/_0.28)_10%,transparent_32%)] [animation:border-rotate_12s_linear_infinite]"
            />
            <WorldsMatrix />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
