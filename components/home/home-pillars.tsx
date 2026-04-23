"use client";

import { motion } from "framer-motion";

import { Container, Eyebrow } from "@/components/ui";
import { orgValues } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomePillars() {
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
              The real job is not just winning once. It is creating a public identity strong enough to carry new titles, better media, and future activations without losing clarity.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {orgValues.map((value, index) => (
              <motion.article
                key={value.title}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.75, ease: EASE }}
                whileHover={{ y: -4 }}
                className={`group relative overflow-hidden border border-white/10 p-6 transition-colors duration-300 hover:border-[color:var(--color-rad)]/40 ${
                  index === 0
                    ? "sm:col-span-2 bg-[linear-gradient(135deg,rgba(255,43,69,0.12),rgba(255,255,255,0.02)_28%,rgba(5,5,5,0.88)_72%)]"
                    : "bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01)),rgba(5,5,5,0.82)]"
                } [clip-path:polygon(0_0,calc(100%-18px)_0,100%_18px,100%_100%,18px_100%,0_calc(100%-18px))]`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_28%,rgba(255,255,255,0.08)_50%,transparent_74%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
