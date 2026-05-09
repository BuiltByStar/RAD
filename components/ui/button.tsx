import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border font-semibold uppercase tracking-[0.14em] transition-[transform,background,border-color,box-shadow,color] duration-300 ease-[var(--ease-emphasis)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-rad)] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 active:translate-y-[1px]";

const variants: Record<Variant, string> = {
  primary:
    "border-[color:var(--color-rad)] bg-[linear-gradient(135deg,#dc143c,#f13a5d)] text-white shadow-[0_18px_38px_rgba(220,20,60,0.22)] hover:-translate-y-[2px] hover:shadow-[0_24px_54px_rgba(220,20,60,0.28)]",
  secondary:
    "border-white/14 bg-white/[0.075] text-white backdrop-blur-xl hover:border-white/26 hover:bg-white/[0.12]",
  ghost:
    "border-transparent bg-transparent text-white/74 hover:border-white/14 hover:bg-white/[0.06] hover:text-white",
  outline:
    "border-white/18 bg-black/18 text-white backdrop-blur-xl hover:border-white/34 hover:bg-white/[0.07]"
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[10px]",
  md: "h-11 px-5 text-[11px]",
  lg: "h-12 px-6 text-[11px]"
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

  const content = <span className="inline-flex items-center gap-2">{children}</span>;

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
