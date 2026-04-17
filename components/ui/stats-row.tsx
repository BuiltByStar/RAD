import type { ReactNode } from "react";

import { cn } from "./cn";

type StatsRowProps = {
  className?: string;
  children: ReactNode;
};

export function StatsRow({ className, children }: StatsRowProps) {
  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-3 sm:gap-5",
        className
      )}
    >
      {children}
    </div>
  );
}
