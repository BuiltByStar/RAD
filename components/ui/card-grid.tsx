import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

type CardGridProps = HTMLAttributes<HTMLDivElement> & {
  cols?: 1 | 2 | 3 | 4;
  mosaic?: boolean;
  children: ReactNode;
};

const gridCols: Record<NonNullable<CardGridProps["cols"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
};

export function CardGrid({ cols = 3, mosaic = true, className, children, ...rest }: CardGridProps) {
  return (
    <div
      className={cn(
        mosaic
          ? "grid gap-px border border-neutral-900 bg-neutral-900 [&>article]:border-0 [&>article]:bg-black [&>article]:h-full"
          : "grid gap-4 sm:gap-5",
        gridCols[cols],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
