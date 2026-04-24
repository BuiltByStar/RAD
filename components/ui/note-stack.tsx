import type { ReactNode } from "react";

type Item = { label: string; value: ReactNode };
type NoteStackProps = { items: Item[] };

export function NoteStack({ items }: NoteStackProps) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-1 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.008)),rgba(7,7,7,0.68)] px-4 py-3 [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%-12px))]"
        >
          <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/42">
            {item.label}
          </dt>
          <dd className="font-[family-name:var(--font-display)] text-sm uppercase tracking-tight text-white">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
