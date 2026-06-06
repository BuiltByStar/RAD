import type { MouseEvent } from "react";

import { SocialIcon } from "@/components/icons/social-icons";
import { cn } from "@/components/ui/cn";
import type { OrgSocialPlatform } from "@/lib/site-data";

/** Per-platform hover color + drop-shadow glow shared between the site header
 *  and any "person + socials" surface (roster card, staff card, …) so all
 *  social icon rows feel consistent. */
export const SOCIAL_ICON_HOVER: Record<OrgSocialPlatform, string> = {
  discord: "hover:text-[#5865f2] hover:drop-shadow-[0_0_12px_rgba(88,101,242,0.6)]",
  youtube: "hover:text-[#ff0033] hover:drop-shadow-[0_0_12px_rgba(255,0,51,0.6)]",
  x: "hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]",
  twitch: "hover:text-[#9146ff] hover:drop-shadow-[0_0_12px_rgba(145,70,255,0.6)]",
  instagram: "hover:text-[#e1306c] hover:drop-shadow-[0_0_12px_rgba(225,48,108,0.55)]",
  tiktok: "hover:text-white hover:drop-shadow-[0_0_10px_rgba(0,242,234,0.5)]"
};

export const SOCIAL_ICON_BASE =
  "group inline-flex items-center justify-center text-neutral-500 transition-[color,transform,filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blood)] focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transform-none motion-reduce:transition-none";

const SOCIAL_ICON_INNER =
  "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[-6deg] motion-reduce:group-hover:rotate-0";

type SocialIconLinkProps = {
  href: string;
  label: string;
  ariaLabel?: string;
  /** When supplied the platform icon is rendered. When omitted (and not
   *  inferable) a fallback letter is rendered instead so the link stays
   *  usable. */
  platform?: OrgSocialPlatform;
  /** Tap-target sizing class. Defaults to `h-8 w-8`. */
  sizeClass?: string;
  /** Glyph sizing class. Defaults to `h-4 w-4`. */
  iconClass?: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

/** Borderless, brand-tinted social icon link with the hover treatment used
 *  across "person + socials" surfaces and the site header. */
export function SocialIconLink({
  href,
  label,
  ariaLabel,
  platform,
  sizeClass = "h-8 w-8",
  iconClass = "h-4 w-4",
  className,
  onClick
}: SocialIconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? label}
      onClick={onClick}
      className={cn(
        SOCIAL_ICON_BASE,
        sizeClass,
        platform ? SOCIAL_ICON_HOVER[platform] : "hover:text-white",
        className
      )}
    >
      {platform ? (
        <SocialIcon platform={platform} className={cn(iconClass, SOCIAL_ICON_INNER)} />
      ) : (
        <span
          aria-hidden
          className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400 transition-colors duration-300 group-hover:text-white"
        >
          {label.slice(0, 1).toUpperCase()}
        </span>
      )}
    </a>
  );
}
