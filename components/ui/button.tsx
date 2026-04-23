import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden border font-semibold uppercase tracking-[0.16em] transition-[transform,background,border-color,box-shadow,color] duration-300 ease-[var(--ease-emphasis)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-rad)] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 will-change-transform active:translate-y-[1px] [clip-path:polygon(0_0,calc(100%-16px)_0,100%_50%,calc(100%-16px)_100%,0_100%,0_0)] before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(110deg,transparent_22%,rgba(255,255,255,0.28)_48%,transparent_74%)] before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-full after:pointer-events-none after:absolute after:inset-[1px] after:[clip-path:polygon(0_0,calc(100%-15px)_0,100%_50%,calc(100%-15px)_100%,0_100%,0_0)] after:transition-opacity after:duration-300";

const variants: Record<Variant, string> = {
  primary:
    "border-[color:var(--color-rad-hi)]/40 bg-[linear-gradient(135deg,rgba(255,90,111,0.95),rgba(255,43,69,0.88)_52%,rgba(125,8,24,0.98))] text-white shadow-[0_18px_50px_rgba(255,43,69,0.22)] hover:-translate-y-[1px] hover:border-[color:var(--color-rad-hi)]/70 hover:shadow-[0_24px_72px_rgba(255,43,69,0.34)] after:bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02)_24%,rgba(20,6,8,0.18)_100%)]",
  secondary:
    "border-white/25 bg-white text-black hover:border-white hover:bg-white/92 after:bg-transparent",
  ghost:
    "border-white/12 bg-white/[.05] text-white backdrop-blur-md hover:border-white/28 hover:bg-white/[.09] after:bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.01))]",
  outline:
    "border-white/20 bg-transparent text-white hover:border-[color:var(--color-rad-hi)]/50 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,43,69,0.05))] after:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.008))]"
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[11px]",
  md: "h-11 px-6 text-[12px]",
  lg: "h-14 px-8 text-[13px]"
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ variant = "primary", size = "md", className, children, ...rest }: ButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);

  const content = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>;

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest;
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target={anchorProps.target ?? "_blank"}
          rel={anchorProps.rel ?? "noreferrer"}
          className={cls}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? "button"} className={cls} {...buttonProps}>
      {content}
    </button>
  );
}
