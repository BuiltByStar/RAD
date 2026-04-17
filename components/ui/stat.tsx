import { cn } from "./cn";

type StatProps = {
  value: string;
  label: string;
  sub?: string;
  className?: string;
};

export function Stat({ value, label, sub, className }: StatProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 border-l border-white/10 pl-4 first:border-l-0 first:pl-0 sm:border-l sm:pl-6 sm:first:pl-0",
        className
      )}
    >
      <span
        className="font-[family-name:var(--font-display)] text-4xl leading-none tracking-tight sm:text-5xl"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
        {label}
      </span>
      {sub ? <span className="text-xs text-white/40">{sub}</span> : null}
    </div>
  );
}
