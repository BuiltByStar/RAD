"use client";

import { motion } from "framer-motion";

import { Container, Eyebrow } from "@/components/ui";
import { orgValues } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomePillars() {
  const lead = orgValues[0];
  const trailing = orgValues.slice(1);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(720px_260px_at_78%_10%,rgba(255,43,69,0.16),transparent_56%)]" />

      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-lg"
          >
            <Eyebrow tone="rad">Operating standard</Eyebrow>
            <h2 className="mt-4 max-w-[11ch] font-[family-name:var(--font-display)] text-4xl uppercase leading-[0.92] tracking-[-0.02em] sm:text-6xl">
              Identity that can actually scale.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/62 sm:text-base">
              The actual job is not just winning once. It is building an identity strong enough to carry new divisions, better media, and future activations without flattening into generic esports noise.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <motion.article
              key={lead.title}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.75, ease: EASE }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden border border-white/10 bg-[linear-gradient(135deg,rgba(255,43,69,0.12),rgba(255,255,255,0.02)_28%,rgba(5,5,5,0.88)_72%)] p-7 transition-colors duration-300 hover:border-[color:var(--color-rad)]/40 [clip-path:polygon(0_0,calc(100%-18px)_0,100%_18px,100%_100%,18px_100%,0_calc(100%-18px))]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_28%,rgba(255,255,255,0.08)_50%,transparent_74%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex h-full flex-col">
                <span
                  aria-hidden
                  className="inline-flex h-11 w-11 items-center justify-center border border-white/10 bg-black/35 text-lg text-[color:var(--color-rad-hi)] [clip-path:polygon(0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%,0_0)]"
                >
                  {lead.icon}
                </span>
                <h3 className="mt-6 max-w-[10ch] font-[family-name:var(--font-display)] text-4xl uppercase leading-[0.92] tracking-tight text-white">
                  {lead.title}
                </h3>
                <p className="mt-4 max-w-[34rem] text-sm leading-relaxed text-white/66 sm:text-base">
                  {lead.description}
                </p>
                <div className="mt-auto pt-10">
                  <div className="inline-flex items-center gap-2 border border-white/10 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/54 [clip-path:polygon(0_0,calc(100%-12px)_0,100%_50%,calc(100%-12px)_100%,0_100%,0_0)]">
                    Competitive identity that can travel
                  </div>
                </div>
              </div>
            </motion.article>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {trailing.map((value) => (
                <motion.article
                  key={value.title}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.75, ease: EASE }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01)),rgba(5,5,5,0.82)] p-6 transition-colors duration-300 hover:border-[color:var(--color-rad)]/40 [clip-path:polygon(0_0,calc(100%-18px)_0,100%_18px,100%_100%,18px_100%,0_calc(100%-18px))]"
                >
                  <div className="relative z-10">
                    <span
                      aria-hidden
                      className="inline-flex h-11 w-11 items-center justify-center border border-white/10 bg-black/35 text-lg text-[color:var(--color-rad-hi)] [clip-path:polygon(0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%,0_0)]"
                    >
                      {value.icon}
                    </span>
                    <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl uppercase leading-none tracking-tight text-white">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/62 sm:text-base">
                      {value.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
