"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui";
import { contactChannels, discordInviteUrl } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeFollowStrip() {
  const reduced = useReducedMotion();
  const socials = contactChannels.filter((channel) => channel.href.startsWith("http"));

  return (
    <section className="rad-section relative bg-[#030304] py-14 sm:py-16">
      <Container size="xl">
        <motion.div
          initial={false}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.52, ease: EASE }}
          className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-end"
        >
          <div>
            <p className="rad-kicker">Community</p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.2rem,4.5vw,3.8rem)] font-extrabold uppercase leading-[0.9] text-white">
              Follow RAD
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-white/58">
            Rising from the competitive scene in 2023, RAD is more than a roster — a movement of players and creators built around pressure, content, and the next stage.
          </p>
        </motion.div>

        <div className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-8">
          <Link href={discordInviteUrl} className="rad-tag transition-colors hover:border-[#dc143c]/35 hover:text-white">
            Discord
          </Link>
          {socials.map((channel) => (
            <Link
              key={channel.label}
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              className="rad-tag transition-colors hover:border-white/24 hover:text-white"
            >
              {channel.label}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
