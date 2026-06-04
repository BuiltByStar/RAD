import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

type SenButtonSize = "sm" | "md";

type SenButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
  href?: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  size?: SenButtonSize;
};

export function SenButton({
  href,
  children,
  className,
  disabled = false,
  size = "md",
  ...rest
}: SenButtonProps) {
  const isExternal = href ? /^https?:\/\//.test(href) : false;
  const sideWidth = size === "sm" ? "w-4" : "w-5";
  const clipSize = size === "sm" ? "h-2.5 w-2.5 group-hover:h-4 group-hover:w-4" : "h-3 w-3 group-hover:h-5 group-hover:w-5";
  const labelClass =
    size === "sm"
      ? "py-2 text-[10px] font-bold uppercase tracking-[0.12em]"
      : "py-2.5 text-sm font-bold uppercase tracking-wide";

  const inner = (
    <div className="group flex w-full items-stretch">
      <div
        className={cn(
          "relative isolate shrink-0 bg-[var(--color-blood)] transition-colors duration-300 group-disabled:bg-neutral-900",
          sideWidth
        )}
      >
        <div className={cn("clip-top absolute left-0 top-0 bg-black transition-all duration-300", clipSize)} />
      </div>
      <div
        className={cn(
          "flex flex-1 items-center justify-center gap-2 border-y border-neutral-900 bg-neutral-950",
          labelClass
        )}
      >
        <span>{children}</span>
        {isExternal ? <span className="sr-only">(opens in a new tab)</span> : null}
        <span aria-hidden className="text-xs">
          ↗
        </span>
      </div>
      <div
        className={cn(
          "relative isolate shrink-0 bg-[var(--color-blood)] transition-colors duration-300 group-disabled:bg-neutral-900",
          sideWidth
        )}
      >
        <div className={cn("clip-bottom absolute bottom-0 right-0 bg-black transition-all duration-300", clipSize)} />
      </div>
    </div>
  );

  const cls = cn(
    "rad-sen-button",
    size === "sm" && "rad-sen-button--sm",
    disabled && "rad-sen-button--disabled",
    className
  );

  if (disabled || !href) {
    return (
      <span className={cls} aria-disabled="true">
        {inner}
      </span>
    );
  }

  if (isExternal) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}
