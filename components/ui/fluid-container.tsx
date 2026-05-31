import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

type FluidContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function FluidContainer({ className, children, ...rest }: FluidContainerProps) {
  return (
    <div className={cn("container-fluid mx-auto w-full max-w-[2400px] px-4 md:px-6", className)} {...rest}>
      {children}
    </div>
  );
}
