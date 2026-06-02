import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";
import { FluidContainer } from "./fluid-container";

type PageRailProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function PageRail({ className, children, ...rest }: PageRailProps) {
  return (
    <div className={cn("bg-black", className)} {...rest}>
      <FluidContainer>
        <div className="border-x border-neutral-900">{children}</div>
      </FluidContainer>
    </div>
  );
}

type PageRailSectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  borderTop?: boolean;
};

export function PageRailSection({
  borderTop = false,
  className,
  children,
  ...rest
}: PageRailSectionProps) {
  return (
    <section
      className={cn(
        "px-4 py-10 sm:px-6 md:px-8 md:py-12",
        borderTop && "border-t border-neutral-900",
        className
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
