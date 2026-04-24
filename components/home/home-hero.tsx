"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button, Container } from "@/components/ui";

const statItems = [
  { label: "World Titles", value: "01" },
  { label: "Regional Titles", value: "01" },
  { label: "Live Titles", value: "01" }
];

export function HomeHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[calc(100svh-84px)] items-center overflow-hidden border-b border-white/5 bg-[#050508] py-16 lg:min-h-[calc(100svh-120px)]">
      {/* Background gradients and clean atmospheric noise */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050508_0%,#07070F_50%,#040407_100%)] z-[-2]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,43,69,0.12),transparent_60%)] z-[-1]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] z-[-1] opacity-50" />

      <Container size="xl" className="relative z-10 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          
          {/* Left Text Column */}
          <div className="relative z-10 max-w-[620px]">
            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 10 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-white/70 backdrop-blur-md"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#ff2b45] shadow-[0_0_10px_rgba(255,43,69,0.6)]" />
              RAD Esports
            </motion.div>

            <motion.h1
              initial={reduced ? undefined : { opacity: 0, y: 28 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
              className="mt-6 font-[family-name:var(--font-display)] text-[clamp(3.5rem,8vw,6.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-white"
            >
              Dominate <br />
              <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#fff_0%,#ff2b45_100%)]">The Arena.</span>
            </motion.h1>

            <motion.p
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
              className="mt-6 max-w-[34rem] text-[17px] leading-[1.7] text-[#A0A0B8] font-[family-name:var(--font-body)]"
            >
              Built for pressure, content, and the next stage of competition. RAD blends competitive pedigree, identity, and media presence into one sharp public system.
            </motion.p>

            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
              className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
            >
              <Link 
                href="/roster" 
                className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-full bg-[#ff2b45] px-6 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,43,69,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,43,69,0.5)]"
              >
                View Roster
              </Link>
              <Link 
                href="/about" 
                className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/[0.08]"
              >
                About RAD
              </Link>
            </motion.div>

            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mt-12 grid max-w-lg gap-4 sm:grid-cols-3"
            >
              {statItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/5 bg-[#0A0A0F] px-5 py-4 shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-colors hover:border-white/10"
                >
                  <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none tracking-tight text-[#EDEDED]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5C5C7A]">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Visual Column */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, scale: 0.95 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative aspect-square w-full max-w-[540px] mx-auto lg:ml-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] bg-[#0A0A0F]"
          >
            <Image
              src="/assets/RadPlayerBannerPNG8.png"
              alt="RAD Esports players"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 50vw"
              className="object-cover object-center opacity-80 mix-blend-lighten transition-transform duration-700 hover:scale-105"
            />
            {/* Elegant overlay gradient to blend image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
            
            <div className="absolute bottom-6 left-6 right-6">
               <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
                 <div className="flex items-center gap-3 mb-2">
                   <span className="flex h-2 w-2 items-center justify-center">
                     <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff2b45] opacity-75"></span>
                     <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ff2b45]"></span>
                   </span>
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A0A0B8]">Featured Roster</span>
                 </div>
                 <p className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">Marvel Rivals</p>
                 <p className="mt-1 text-sm text-[#5C5C7A]">Setting the standard on the world stage.</p>
               </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
