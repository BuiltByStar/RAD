import { Container, Eyebrow } from "@/components/ui";
import { orgValues } from "@/lib/site-data";

export function HomePillars() {
  return (
    <section className="py-24 sm:py-32">
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <Eyebrow tone="rad">What drives us</Eyebrow>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl uppercase leading-[0.95] tracking-tight sm:text-6xl">
              Four pillars.
              <br />
              One organization.
            </h2>
            <p className="mt-5 max-w-md text-sm text-white/60 sm:text-base">
              RAD is engineered around a tight set of principles that keep the
              roster sharp, the brand loud, and the operation ready to scale.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {orgValues.map((value) => (
              <article
                key={value.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[.025] p-6 transition duration-300 hover:border-white/25 hover:bg-white/[.04]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgb(255_43_69_/_0.18),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-lg"
                  aria-hidden
                >
                  {value.icon}
                </span>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl uppercase tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
