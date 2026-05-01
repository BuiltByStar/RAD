"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { fallbackContent } from "@/lib/content-data";
import { contactChannels, discordInviteUrl } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeEsportsFeed() {
  const reduced = useReducedMotion();
  const featured = fallbackContent[0];
  const secondary = fallbackContent.slice(1, 4);

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#08080a] py-12 sm:py-16">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(72%_60%_at_82%_18%,rgba(255,0,0,0.2),transparent_58%)]" />
      <Container size="xl">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.article
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative min-h-[460px] overflow-hidden rounded-[1.65rem] border border-white/12 bg-black shadow-[0_40px_130px_rgba(0,0,0,0.66)]"
          >
            <Image
              src={featured.thumbnail}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover opacity-78"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.58)_48%,#050505_100%),radial-gradient(circle_at_68%_20%,rgba(255,0,0,0.28),transparent_44%)]" />
            <motion.div
              aria-hidden
              className="absolute left-[-30%] top-[38%] h-24 w-[130%] rotate-[-8deg] bg-[linear-gradient(90deg,transparent,rgba(255,0,0,0.26),rgba(255,255,255,0.1),transparent)]"
              animate={reduced ? undefined : { x: ["-12%", "18%", "-12%"], opacity: [0.25, 0.66, 0.25] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative z-10 flex min-h-[460px] flex-col justify-end p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ff4040]">
                Lead drop
              </p>
              <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.7rem,6vw,6rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.03em] text-white">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/66">
                {featured.description}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/content" size="lg">Open content</Button>
                <Button href="https://www.youtube.com/@RadEsport" variant="outline" size="lg">
                  YouTube
                </Button>
              </div>
            </div>
          </motion.article>

          <div className="grid gap-5">
            <motion.div
              initial={reduced ? undefined : { opacity: 0, x: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.05 }}
              className="rounded-[1.4rem] border border-white/12 bg-white/[0.035] p-5 sm:p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff4040]">
                More media
              </p>
              <div className="mt-5 grid gap-3">
                {secondary.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    className="group grid grid-cols-[88px_1fr] gap-3 rounded-xl border border-white/10 bg-black/28 p-2 transition hover:border-[#ff0000]/34 hover:bg-black/42"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="relative h-20 overflow-hidden rounded-lg bg-white/5">
                      <Image src={item.thumbnail} alt="" fill sizes="88px" className="object-cover" />
                    </div>
                    <div className="py-1">
                      <p className="text-sm font-semibold uppercase leading-snug tracking-[0.04em] text-white">
                        {item.title}
                      </p>
                      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
                        {item.tags.slice(0, 2).join(" / ")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={reduced ? undefined : { opacity: 0, x: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
              className="relative overflow-hidden rounded-[1.4rem] border border-[#ff0000]/24 bg-[#ff0000]/10 p-5 sm:p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff6b6b]">
                Community
              </p>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.88] text-white">
                Discord, email, socials.
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button href={discordInviteUrl} size="sm">Discord</Button>
                {contactChannels.slice(1, 4).map((channel) => (
                  <Link
                    key={channel.label}
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                    className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/62 transition hover:text-white"
                  >
                    {channel.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
