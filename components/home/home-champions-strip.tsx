import { Container } from "@/components/ui";

const milestones = [
  { year: "2023", title: "Founded", detail: "Identity built and brand direction established." },
  { year: "2025", title: "World Title", detail: "Ignite mid-season world champions." },
  { year: "2026", title: "EMEA Crown", detail: "Season 6 EMEA PC champions." }
];

export function HomeChampionsStrip() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg-alt)] py-14 sm:py-18">
      <Container size="xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-rad-hi)]">Results</p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3.6rem)] font-bold uppercase leading-[0.9] text-[var(--text)]">
            Proven in competition.
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {milestones.map((milestone) => (
            <article key={milestone.title} className="rounded-xl border border-[var(--border)] bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-rad-hi)]">{milestone.year}</p>
              <h3 className="mt-3 text-3xl font-bold uppercase leading-none text-[var(--text)]">{milestone.title}</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">{milestone.detail}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
