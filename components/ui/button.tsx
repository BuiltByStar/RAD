import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border font-semibold uppercase tracking-[0.12em] transition-[transform,background,border-color,box-shadow,color] duration-300 ease-[var(--ease-emphasis)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-rad)] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 active:translate-y-[1px] before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(110deg,transparent_24%,rgba(255,255,255,0.16)_48%,transparent_74%)] before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-full";

const variants: Record<Variant, string> = {
  primary:
    "border-[color:var(--color-rad)] bg-[color:var(--color-rad)] text-white shadow-[0_16px_36px_rgba(255,0,0,0.22)] hover:-translate-y-[1px] hover:bg-[#ff2020] hover:shadow-[0_22px_50px_rgba(255,0,0,0.28)]",
  secondary:
    "border-white/18 bg-white/[0.075] text-white hover:border-white/30 hover:bg-white/[0.11]",
  ghost:
    "border-white/12 bg-white/[.05] text-white backdrop-blur-md hover:border-white/22 hover:bg-white/[.08]",
  outline:
    "border-white/22 bg-black/35 text-white hover:border-[color:var(--color-rad)]/55 hover:bg-white/[0.07]"
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
