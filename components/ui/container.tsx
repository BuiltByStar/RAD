import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: ContainerSize;
  children: ReactNode;
};

const sizes: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1440px]",
  full: "max-w-none"
};

export function Container({ size = "lg", className, children, ...rest }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", sizes[size], className)}
      {...rest}
    >
      {children}
    </div>
  );
}
