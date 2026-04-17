import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/ui";

type Variant =
  | "default"
  | "about"
  | "roster"
  | "staff"
  | "content"
  | "contact"
  | "partners"
  | "legal";

type PageShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  heroImage?: string;
  heroVideo?: string;
  status?: string;
  note?: ReactNode;
  variant?: Variant;
  children: ReactNode;
};

const heroMetaMap: Record<Variant, { mark: string; code: string; channel: string; tags: string[] }> = {
  default: {
    mark: "RAD // SYSTEM",
    code: "FILE 00",
    channel: "teamrad.gg",
    tags: ["Pressure-built", "Red // black // white", "Go wild"]
  },
  about: {
    mark: "RAD // ABOUT",
    code: "FILE 01",
    channel: "org identity",
    tags: ["World champions", "EMEA tested", "Built to scale"]
  },
  roster: {
    mark: "RAD // ROSTER",
    code: "FILE 02",
    channel: "competitive core",
    tags: ["Featured division", "Active lineup", "Role clarity"]
  },
  staff: {
    mark: "RAD // STAFF",
    code: "FILE 03",
    channel: "operations",
    tags: ["Brand", "Analytics", "Coaching"]
  },
  content: {
    mark: "RAD // CONTENT",
    code: "FILE 04",
    channel: "editorial layer",
    tags: ["Stories", "Video", "Community"]
  },
  contact: {
    mark: "RAD // CONTACT",
    code: "FILE 05",
    channel: "inquiry path",
    tags: ["Partnerships", "Talent", "Media"]
  },
  partners: {
    mark: "RAD // ACTIVATIONS",
    code: "FILE 06",
    channel: "brand fit",
    tags: ["Campaigns", "Apparel", "Peripherals"]
  },
  legal: {
    mark: "RAD // POLICY",
    code: "FILE 07",
    channel: "public terms",
    tags: ["Privacy", "Cookies", "Terms"]
  }
};

export function PageShell({
  title,
  eyebrow,
  description,
  heroImage = "/assets/RadBanner1920_1080.png",
  heroVideo,
  status,
  note,
  variant = "default",
  children
}: PageShellProps) {
  const meta = heroMetaMap[variant];

  return (
    <main className="relative isolate">
      <section className="relative overflow-hidden pb-10 pt-6 sm:pb-16 sm:pt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1100px_520px_at_80%_-10%,rgb(255_43_69_/_0.18),transparent_60%),radial-gradient(900px_400px_at_0%_120%,rgb(255_43_69_/_0.10),transparent_60%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:56px_56px]"
        />

        <Container size="xl">
          <div className="relative grid gap-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02] p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:p-10">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 top-10 hidden h-24 w-px bg-gradient-to-b from-[color:var(--color-rad)]/80 to-transparent sm:block"
            />

            <div className="relative z-10 flex flex-col justify-between gap-8">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-[family-name:var(--font-display)] text-[11px] uppercase tracking-[0.24em] text-white/40">
                <span className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-rad)] shadow-[0_0_8px_rgb(255_43_69_/_0.8)]" />
                  {meta.code}
                </span>
                <span>{meta.channel}</span>
                <span className="ml-auto hidden text-white/30 sm:inline">teamrad.gg</span>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-rad-hi)]">
                  {eyebrow}
                </p>
                <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,5rem)] uppercase leading-[0.92] tracking-tight text-white [text-wrap:balance]">
                  {title}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                  {description}
                </p>
                {status ? (
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_6px_rgb(52_211_153_/_0.8)]" />
                    {status}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-black sm:aspect-[5/6] lg:aspect-[4/5]">
                {heroVideo ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
                  >
                    <source src={heroVideo} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={heroImage}
                    alt={title}
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 44vw"
                    className="object-cover"
                  />
                )}

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_200px_at_70%_30%,rgb(255_43_69_/_0.22),transparent_60%)] mix-blend-screen"
                />

                <div aria-hidden className="pointer-events-none absolute inset-3">
                  <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-white/40" />
                  <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-white/40" />
                  <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-white/40" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-white/40" />
                </div>

                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md border border-white/15 bg-black/50 px-2.5 py-1 backdrop-blur-sm">
                  <Image
                    src="/assets/RadNewLogoWordmarkRed.png"
                    alt=""
                    width={74}
                    height={22}
                    className="h-5 w-auto opacity-95"
                  />
                </div>

                <p
                  aria-hidden
                  className="absolute inset-x-4 bottom-3 text-right font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.5vw,3rem)] uppercase leading-none tracking-tight text-white/10"
                >
                  {meta.mark}
                </p>
              </div>

              {note ? (
                <div className="rounded-2xl border border-white/10 bg-white/[.03] p-4 sm:p-5">
                  {note}
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <div>{children}</div>
    </main>
  );
}
