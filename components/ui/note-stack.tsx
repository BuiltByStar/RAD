import type { ReactNode } from "react";

type Item = { label: string; value: ReactNode };
type NoteStackProps = { items: Item[] };

export function NoteStack({ items }: NoteStackProps) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-1 border border-neutral-900 bg-black px-4 py-3"
        >
          <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
            {item.label}
          </dt>
          <dd className="font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-normal text-white">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
