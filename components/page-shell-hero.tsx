import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/ui";

type Variant = "default" | "about" | "roster" | "merch" | "staff" | "content" | "contact" | "partners" | "legal";
type HeroMeta = { mark: string; code: string; channel: string; tags: string[] };

type PageShellHeroProps = {
  title: string;
  eyebrow: string;
  description: string;
  heroImage?: string;
  heroVideo?: string;
  status?: string;
  note?: ReactNode;
  meta: HeroMeta;
  variant: Variant;
};

export function PageShellHero({
  title,
  eyebrow,
  description,
  heroImage = "/assets/RadBanner1920_1080.png",
  heroVideo,
  status,
  note,
  meta
}: PageShellHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg-alt)]">
      <div className="absolute inset-0">
        {heroVideo ? (
          <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-22">
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : (
          <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover opacity-20" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,246,246,0.96)_0%,rgba(245,246,246,0.84)_45%,rgba(245,246,246,0.92)_100%)]" />
      </div>

      <Container size="xl" className="relative z-10 py-18 sm:py-22">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-rad-hi)]">{eyebrow}</p>
        <h1 className="mt-4 max-w-5xl text-[clamp(2.7rem,7vw,5.6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-[var(--text)]">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">{description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-[var(--border)] bg-white px-3 py-1.5 text-xs text-[var(--muted)]">
              {tag}
            </span>
          ))}
        </div>

        {(status || note) && (
          <div className="mt-6 rounded-lg border border-[var(--border)] bg-white p-4">
            {status ? <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-rad-hi)]">{status}</p> : null}
            {note ? <div className="mt-2 text-sm text-[var(--muted)]">{note}</div> : null}
            <p className="mt-2 text-xs text-[var(--dim)]">
              {meta.mark} • {meta.code} • {meta.channel}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
