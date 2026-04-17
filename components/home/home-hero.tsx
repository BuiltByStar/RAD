import Image from "next/image";

import { Badge, Button, Container, Eyebrow, MatchCard, Stat } from "@/components/ui";
import { stats } from "@/lib/site-data";

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <Image
          src="/assets/RadRivals_Wallpaper_Red.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgb(255_43_69_/_0.22),_transparent_55%),radial-gradient(ellipse_at_bottom,_rgb(0_0_0_/_0.95),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgb(5_5_5_/_0.4)_0%,_rgb(5_5_5_/_0.92)_65%,_#050505_100%)]" />
        {/* Scanline micro texture */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:repeating-linear-gradient(to_bottom,transparent_0_2px,rgb(255_255_255_/_0.7)_2px_3px)]" />
      </div>

      <Container size="xl">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          {/* Copy */}
          <div className="max-w-2xl">
            <Eyebrow tone="rad">RAD Esports / Marvel Rivals</Eyebrow>

            <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(3.25rem,8vw,6.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.01em] text-white">
              Go <span className="text-[color:var(--color-rad)]">Wild.</span>
              <br />
              Stay Champions.
            </h1>

            <p className="mt-6 max-w-xl text-base text-white/70 sm:text-lg">
              Inaugural Marvel Rivals Ignite <span className="text-white">Mid-Season World Champions</span>
              {" "}and the reigning <span className="text-white">Season 6: EMEA PC</span> title holders.
              Untamed, unstoppable, and never by the book.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/roster" size="lg">
                Meet the roster
                <span aria-hidden>→</span>
              </Button>
              <Button href="/content" variant="outline" size="lg">
                Watch latest
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                Partner with RAD
              </Button>
            </div>

            <div className="mt-14 flex flex-wrap items-stretch gap-6 sm:gap-10">
              {stats.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </div>

          {/* Feature card */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 bg-[radial-gradient(circle_at_70%_30%,rgb(255_43_69_/_0.25),transparent_55%)] blur-2xl" aria-hidden />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[.06] to-white/[0.015] p-5 shadow-[var(--shadow-card)] backdrop-blur">
              <div className="flex items-center justify-between">
                <Badge tone="live">On Air</Badge>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                  teamrad.gg
                </span>
              </div>

              <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/assets/RadPlayerBannerPNG8.png"
                  alt="RAD Esports roster"
                  fill
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
                    Marvel Rivals // Starters
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight">
                    World & EMEA Champions
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <MatchCard
                  status="final"
                  competition="Season 6: EMEA PC"
                  stage="Grand Finals"
                  dateLabel="Mar 2026"
                  home={{ name: "RAD", score: "W" }}
                  away={{ name: "Regional Finalists", score: "L" }}
                  note="RAD closed out the EMEA title on home soil. Full VOD coming to the content page."
                  href="/content"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
