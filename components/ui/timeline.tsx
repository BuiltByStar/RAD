import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

type TimelineProps = HTMLAttributes<HTMLOListElement> & {
  children: ReactNode;
};

export function Timeline({ className, children, ...rest }: TimelineProps) {
  return (
    <ol
      className={cn(
        "relative grid gap-6 pl-6",
        "before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-[color:var(--color-rad)]/60 before:via-white/15 before:to-transparent",
        className
      )}
      {...rest}
    >
      {children}
    </ol>
  );
}

type TimelineItemProps = {
  date: string;
  title: string;
  description?: ReactNode;
  className?: string;
};

export function TimelineItem({ date, title, description, className }: TimelineItemProps) {
  return (
    <li className={cn("relative pl-4", className)}>
      <span
        aria-hidden
        className="absolute -left-[7px] top-1 inline-flex h-3 w-3 items-center justify-center"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-rad)]/40 blur-[2px]" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-[color:var(--color-rad)] bg-black" />
      </span>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">{date}</p>
      <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl uppercase tracking-tight sm:text-2xl">
        {title}
      </h3>
      {description ? (
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
          {description}
        </p>
      ) : null}
    </li>
  );
}
