import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

type SenButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
  href: string;
  children: ReactNode;
  className?: string;
};

export function SenButton({ href, children, className, ...rest }: SenButtonProps) {
  const isExternal = /^https?:\/\//.test(href);

  const inner = (
    <div className="group flex w-full max-w-md items-stretch">
      <div className="relative isolate w-5 shrink-0 bg-[var(--color-blood)] transition-colors duration-300 group-disabled:bg-neutral-900">
        <div className="clip-top absolute left-0 top-0 h-3 w-3 bg-black transition-all duration-300 group-hover:h-5 group-hover:w-5" />
      </div>
      <div className="flex flex-1 items-center justify-center gap-2 py-2.5 text-sm font-bold uppercase tracking-wide">
        {children}
        <span aria-hidden className="text-xs">
          ↗
        </span>
      </div>
      <div className="relative isolate w-5 shrink-0 bg-[var(--color-blood)] transition-colors duration-300 group-disabled:bg-neutral-900">
        <div className="clip-bottom absolute bottom-0 right-0 h-3 w-3 bg-black transition-all duration-300 group-hover:h-5 group-hover:w-5" />
      </div>
    </div>
  );

  const cls = cn("inline-block w-full max-w-md text-white transition-opacity hover:opacity-90", className);

  if (isExternal) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer" {...rest}>
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
