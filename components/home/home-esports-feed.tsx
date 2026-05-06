import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui";
import { fallbackContent } from "@/lib/content-data";

export function HomeEsportsFeed() {
  const featured = fallbackContent[0];
  const secondary = fallbackContent.slice(1, 4);

  return (
    <section className="bg-white py-14 sm:py-18">
      <Container size="xl">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
            <div className="relative aspect-[16/9]">
              <Image src={featured.thumbnail} alt="" fill sizes="(max-width: 1024px) 100vw, 62vw" className="object-cover" />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-rad-hi)]">Featured</p>
              <h3 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-bold uppercase leading-[0.92] text-[var(--text)]">{featured.title}</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">{featured.description}</p>
              <Link href="/content" className="mt-5 inline-flex text-sm font-semibold text-[var(--color-rad-hi)]">
                Open content →
              </Link>
            </div>
          </article>
          <div className="grid gap-4">
            {secondary.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="grid grid-cols-[94px_1fr] gap-3 rounded-xl border border-[var(--border)] bg-white p-3 transition hover:shadow-[var(--shadow)]"
              >
                <div className="relative h-20 overflow-hidden rounded-md">
                  <Image src={item.thumbnail} alt="" fill sizes="94px" className="object-cover" />
                </div>
                <div>
                  <p className="text-lg font-bold uppercase leading-tight text-[var(--text)]">{item.title}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.08em] text-[var(--muted)]">{item.tags.slice(0, 2).join(" / ")}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
