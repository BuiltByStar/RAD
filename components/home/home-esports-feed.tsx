"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { assets } from "@/lib/assets";
import type { ContentItem } from "@/lib/content-data";
import { contactChannels, discordInviteUrl } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeEsportsFeed({ items }: { items: ContentItem[] }) {
  const reduced = useReducedMotion();
  const featured = items.find((item) => item.featured) ?? items[0];
  const secondary = items.filter((item) => item.id !== featured?.id).slice(0, 3);

  if (!featured) {
    return null;
  }

  return (
    <section className="rad-section rad-dot-surface relative overflow-hidden bg-[#08080a] py-10 sm:py-14">
      <Image src={assets.bgRed} alt="" fill sizes="100vw" className="object-cover opacity-[0.05]" />
      <Container size="xl" className="relative z-10">
        <div className="grid gap-px border border-white/10 bg-white/10 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.article
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.52, ease: EASE }}
            className="relative min-h-[320px] overflow-hidden bg-[#030304]"
          >
            <Image
              src={featured.thumbnail}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.58)_52%,#050505_100%)]" />
            <div className="relative z-10 flex min-h-[320px] flex-col justify-end p-5 sm:p-6">
              <p className="rad-kicker">Latest feature</p>
              <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.15rem,4.3vw,3.8rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-white">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/62 sm:text-base">
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

          <div className="grid gap-px bg-white/10">
            <motion.div
              initial={false}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.48, ease: EASE, delay: 0.04 }}
              className="bg-[#030304] p-5 sm:p-6"
            >
              <p className="rad-kicker">More updates</p>
              <div className="mt-5 rad-divide-y border border-white/10">
                {secondary.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    className="rad-panel-interactive grid grid-cols-[88px_1fr] gap-3 border-0 border-b border-white/10 bg-transparent p-2 transition-colors last:border-b-0"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="relative h-20 overflow-hidden bg-white/5">
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
              transition={{ duration: 0.48, ease: EASE, delay: 0.08 }}
              className="bg-[#030304] p-5 sm:p-6"
            >
              <p className="rad-kicker">Socials</p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.9] text-white">
                RAD channels.
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button href={discordInviteUrl} size="sm">
                  Discord
                </Button>
                {contactChannels.slice(1, 4).map((channel) => (
                  <Link
                    key={channel.label}
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                    className="rad-tag transition-colors hover:border-white/24 hover:text-white"
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
