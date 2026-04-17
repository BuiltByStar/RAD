import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden font-semibold uppercase tracking-[0.12em] transition-[transform,background,border-color,box-shadow] duration-200 ease-[var(--ease-emphasis)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-rad)] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 will-change-transform active:translate-y-[1px] before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.35)_50%,transparent_70%)] before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-full";

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-rad)] text-white hover:bg-[color:var(--color-rad-hi)] shadow-[var(--shadow-glow)] hover:shadow-[0_0_60px_rgb(255_43_69_/_0.5),0_0_120px_rgb(255_43_69_/_0.25)] hover:-translate-y-[1px]",
  secondary:
    "bg-white text-black hover:bg-white/90",
  ghost:
    "bg-white/[.04] text-white hover:bg-white/[.08] border border-white/10 hover:border-white/20 backdrop-blur",
  outline:
    "bg-transparent text-white border border-white/25 hover:border-white hover:bg-white/5"
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
