import { Container, Eyebrow } from "@/components/ui";

type Milestone = {
  year: string;
  title: string;
  detail: string;
};

const milestones: Milestone[] = [
  {
    year: "2023",
    title: "Founded",
    detail: "RAD establishes its identity — red, black, white, and relentless."
  },
  {
    year: "2024",
    title: "Marvel Rivals",
    detail: "Official entry into competitive Marvel Rivals with a world-class starting lineup."
  },
  {
    year: "Aug 2025",
    title: "Ignite World Champions",
    detail: "Inaugural Marvel Rivals Ignite: Mid-Season World Championship secured."
  },
  {
    year: "Mar 2026",
    title: "EMEA Title",
    detail: "Season 6: EMEA PC champions. Back-to-back titles locked in."
  }
];

export function HomeChampionsStrip() {
  return (
    <section className="border-y border-white/10 bg-gradient-to-b from-black/60 via-black to-black/60 py-16 sm:py-20">
      <Container size="xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Eyebrow>RAD / Record</Eyebrow>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl uppercase leading-tight tracking-tight sm:text-5xl">
              Built in <span className="text-[color:var(--color-rad)]">three years.</span>{" "}
              Winning at the top.
            </h2>
            <p className="mt-4 text-sm text-white/60 sm:text-base">
              We didn&apos;t wait for an invitation. RAD broke in, took the belt, and now
              sets the tempo of the Marvel Rivals scene.
            </p>
          </div>

          <ol className="grid w-full flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-2xl lg:grid-cols-4">
            {milestones.map((m, i) => (
              <li
                key={m.year}
                className="group relative flex flex-col gap-2 border-l border-white/10 pl-5 transition-colors hover:border-[color:var(--color-rad)]/60"
              >
                <span className="absolute -left-[3px] top-1 h-1.5 w-1.5 rounded-full bg-[color:var(--color-rad)] shadow-[0_0_12px_rgb(255_43_69_/_0.6)]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                  {String(i + 1).padStart(2, "0")} / {m.year}
                </span>
                <span className="font-[family-name:var(--font-display)] text-xl uppercase tracking-tight">
                  {m.title}
                </span>
                <span className="text-xs text-white/60">{m.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
