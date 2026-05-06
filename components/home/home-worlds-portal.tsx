import Link from "next/link";

import { Container } from "@/components/ui";

const systems = [
  { label: "Roster", href: "/roster", meta: "Players, roles, and socials." },
  { label: "Content", href: "/content", meta: "Video drops and editorial updates." },
  { label: "Partners", href: "/partners", meta: "Activation formats and contact." },
  { label: "Contact", href: "/contact", meta: "Direct channels to the team." }
];

export function HomeWorldsPortal() {
  return (
    <section className="border-y border-[var(--border)] bg-white py-14 sm:py-18">
      <Container size="xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-rad-hi)]">Team hub</p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.9] text-[var(--text)]">
            One system, every touchpoint.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {systems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5 transition hover:border-[var(--color-rad)] hover:shadow-[var(--shadow)]"
            >
              <h3 className="text-2xl font-bold uppercase leading-none text-[var(--text)]">{item.label}</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">{item.meta}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-rad-hi)]">Open</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
