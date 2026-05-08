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
    <section className="relative overflow-hidden border-y border-white/10 bg-[#08080a] py-10 sm:py-14">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(72%_60%_at_82%_18%,rgba(255,0,0,0.1),transparent_58%)]" />
      <Container size="xl">
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.article
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative min-h-[390px] overflow-hidden rounded-xl border border-white/12 bg-black shadow-[0_24px_74px_-50px_rgba(0,0,0,0.9)]"
          >
            <Image
              src={featured.thumbnail}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover opacity-78"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.58)_52%,#050505_100%)]" />
            <div className="relative z-10 flex min-h-[390px] flex-col justify-end p-5 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ff4040]">
                Lead drop
              </p>
              <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.4rem,5.4vw,4.8rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.02em] text-white">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/66 sm:text-base">
                {featured.description}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="/content">Open content</Button>
                <Button href="https://www.youtube.com/@RadEsport" variant="outline">
                  YouTube
                </Button>
              </div>
            </div>
          </motion.article>

          <div className="grid gap-5">
            <motion.div
              initial={false}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.05 }}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff4040]">
                More media
              </p>
              <div className="mt-5 grid gap-3">
                {secondary.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    className="group grid grid-cols-[88px_1fr] gap-3 rounded-lg border border-white/10 bg-black/24 p-2 transition hover:border-white/22 hover:bg-white/[0.04]"
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
              initial={false}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff6b6b]">
                Community
              </p>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.9] text-white">
                RAD channels.
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
