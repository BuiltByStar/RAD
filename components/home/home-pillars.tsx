import { Container } from "@/components/ui";

const features = [
  { title: "Competition First", body: "Built around match outcomes, schedule clarity, and result visibility." },
  { title: "Player-Led Identity", body: "Roster storytelling that puts names, roles, and personalities forward." },
  { title: "Content Engine", body: "Articles, drops, and social continuity in one structured layer." },
  { title: "Activation Ready", body: "Clear sponsor pathways and business contact without visual clutter." }
];

export function HomePillars() {
  return (
    <section className="rad-dot-surface bg-[var(--bg-alt)] py-12 sm:py-16">
      <Container size="xl">
        <div className="mb-7 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-rad-hi)]">Pillars</p>
          <h2 className="mt-3 text-[clamp(2rem,5vw,3.3rem)] font-bold uppercase leading-[0.95] text-[var(--text)]">
            Clean by design. Competitive by default.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-xl border border-white/10 bg-white/[0.035] p-5 shadow-[var(--shadow)]">
              <h3 className="text-2xl font-bold uppercase leading-none text-[var(--text)]">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{feature.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
