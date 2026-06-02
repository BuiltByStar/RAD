import type { ReactNode } from "react";

import { cn } from "./cn";
import { FluidContainer } from "./fluid-container";

type PageHeaderProps = {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  className?: string;
};

export function PageHeader({ title, eyebrow, description, className }: PageHeaderProps) {
  return (
    <header className={cn("border-b border-neutral-900 bg-black", className)}>
      <FluidContainer>
        <div className="border-x border-neutral-900 px-4 py-8 sm:px-6 md:px-8 md:py-10">
          {eyebrow ? (
            <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-blood)]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-extrabold uppercase leading-[0.95] tracking-normal text-white">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-500 sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </FluidContainer>
    </header>
  );
}
