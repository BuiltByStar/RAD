import { FluidContainer } from "@/components/ui/fluid-container";
import { stats } from "@/lib/site-data";

export function HomeProofStrip() {
  return (
    <section aria-label="Championship proof">
      <FluidContainer>
        <div className="grid border-x border-neutral-900 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-neutral-900 px-4 py-5 sm:border-b-0 sm:border-r sm:px-6 sm:py-6 last:sm:border-r-0"
            >
              <p className="font-[family-name:var(--font-display)] text-4xl font-black uppercase leading-none text-white md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-blood)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <div className="border-x border-b border-neutral-900 px-4 py-3 md:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-neutral-500">
            Marvel Rivals · World & EMEA champions · <span className="text-[var(--color-blood)]">#GoWild</span>
          </p>
        </div>
      </FluidContainer>
    </section>
  );
}
