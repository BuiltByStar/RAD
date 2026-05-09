import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { Container, Section, SectionHeading } from "@/components/ui";
import { assets } from "@/lib/assets";
import { merchCollection, merchItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Merch",
  description: "RAD merch direction, future shop readiness, and brand-led drop planning."
};

export default function MerchPage() {
  return (
    <PageShell
      variant="merch"
      eyebrow="Merch"
      title="Merch"
      description="A clean future shop lane using the current RAD brand system until final product photography is ready."
      heroImage={assets.brandBoard}
      status="Future shop lane"
    >
      <Section padding="sm">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow={merchCollection.eyebrow}
                title={merchCollection.title}
                description={merchCollection.description}
                compact
              />
              <div className="mt-6 rounded-xl border border-white/10 bg-black/36 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/42">
                  Store status
                </p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-none text-white">
                  {merchCollection.status}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/58">
                  No fake storefront is being shown. This page is ready for real apparel photography, product names,
                  pricing, and external shop links when RAD has them.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex rounded-md border border-[color:var(--color-rad)]/36 bg-[color:var(--color-rad)]/14 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[color:var(--color-rad)]/22"
                >
                  Ask about merch
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/45 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.42)]">
              <Image
                src={assets.bgRed}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover opacity-18"
              />
              <div className="relative z-10 grid gap-4">
                <div className="relative min-h-[290px] overflow-hidden rounded-xl border border-white/10 bg-black/38 p-6">
                  <Image
                    src={assets.goWild}
                    alt="GO WILD"
                    width={960}
                    height={260}
                    className="absolute left-1/2 top-1/2 h-auto w-[82%] -translate-x-1/2 -translate-y-1/2 object-contain"
                  />
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-white/48">
                    <span>Drop direction</span>
                    <span>#GoWild</span>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {merchItems.slice(0, 3).map((item) => (
                    <article key={item.name} className="rounded-xl border border-white/10 bg-black/42 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff6f88]">
                        {item.category}
                      </p>
                      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-none text-white">
                        {item.name}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-white/56">{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
