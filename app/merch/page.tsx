import type { Metadata } from "next";

import { JerseyToggleViewer } from "@/components/merch/jersey-toggle-viewer";
import { PageShell } from "@/components/page-shell";
import {
  Container,
  NoteStack,
  Section,
  SectionHeading
} from "@/components/ui";
import { merchCollection, merchItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Merch",
  description: "RAD apparel preview, flagship drop direction, and upcoming release details."
};

export default function MerchPage() {
  const featuredMerch = merchItems.find((item) => item.featured);
  const secondaryMerch = merchItems.find((item) => !item.featured && item.frontImage && item.backImage);
  const accessoryMerch = merchItems.filter((item) => !item.frontImage || !item.backImage);

  return (
    <PageShell
      variant="merch"
      eyebrow="Merch"
      title="Merch"
      description="The first RAD drop, with featured pieces and upcoming releases."
      heroImage="/assets/RadBanner1920_1080.png"
      status="Drop 01 // Coming soon"
      note={
        <NoteStack
          items={[
            { label: "Flagship", value: merchCollection.spotlight },
            { label: "Status", value: merchCollection.status }
          ]}
        />
      }
    >
      <Section padding="sm">
        <Container>
          <SectionHeading eyebrow="Drop 01" title="Featured Drop" />

          <div className="grid gap-8">
            {featuredMerch?.frontImage && featuredMerch.backImage ? (
              <section className="grid gap-5">
                <div className="rounded-[1.55rem] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,0,0,0.04))] p-4 shadow-[0_38px_140px_-70px_rgba(255,0,0,0.62)] sm:p-5">
                  <JerseyToggleViewer
                    frontImage={featuredMerch.frontImage}
                    backImage={featuredMerch.backImage}
                    name={featuredMerch.name}
                    status={featuredMerch.status}
                  />
                </div>

                <div className="grid gap-4 xl:grid-cols-[1.32fr_0.68fr] xl:items-start">
                  <div className="rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff5959]">
                      {featuredMerch.category}
                    </p>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2.6rem,5vw,4.6rem)] font-extrabold uppercase leading-[0.9] text-white">
                      {featuredMerch.name}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/64 sm:text-base">
                      {featuredMerch.description}
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "Views", value: "Front + back" },
                      { label: "Status", value: featuredMerch.status },
                      { label: "Category", value: featuredMerch.category }
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/38">
                          {item.label}
                        </p>
                        <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-extrabold uppercase leading-none text-white">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {secondaryMerch?.frontImage && secondaryMerch.backImage ? (
              <section className="grid gap-5">
                <div className="rounded-[1.55rem] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,0,0,0.04))] p-4 shadow-[0_38px_140px_-70px_rgba(255,0,0,0.46)] sm:p-5">
                  <JerseyToggleViewer
                    frontImage={secondaryMerch.frontImage}
                    backImage={secondaryMerch.backImage}
                    name={secondaryMerch.name}
                    status={secondaryMerch.status}
                  />
                </div>
                <div className="grid gap-4 xl:grid-cols-[1.32fr_0.68fr] xl:items-start">
                  <div className="rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff5959]">
                      {secondaryMerch.category}
                    </p>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2.4rem,4vw,4rem)] font-extrabold uppercase leading-[0.9] text-white">
                      {secondaryMerch.name}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/64 sm:text-base">
                      {secondaryMerch.description}
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "Views", value: "Front + back" },
                      { label: "Status", value: secondaryMerch.status },
                      { label: "Category", value: secondaryMerch.category }
                    ].map((item) => (
                      <div
                        key={`${secondaryMerch.name}-${item.label}`}
                        className="rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/38">
                          {item.label}
                        </p>
                        <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-extrabold uppercase leading-none text-white">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {accessoryMerch.length ? (
              <section className="rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff5959]">More from the drop</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {accessoryMerch.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-xl border border-white/10 bg-black/18 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ff6a6a]">
                            {item.category}
                          </p>
                          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-none text-white">
                            {item.name}
                          </p>
                        </div>
                        <span className="rounded-full border border-[#ff0000]/18 bg-[#ff0000]/8 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/66">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
