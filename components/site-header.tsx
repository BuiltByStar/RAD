"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AuthWidget } from "@/components/auth-widget";
import { primaryNavLinks } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();

  // The Immersive HUD handles the root page layout.
  if (pathname === "/") return null;

  return (
    <header className="subpage-header">
      <div className="container subpage-header-inner">
        <Link href="/" aria-label="RAD Esports home" className="subpage-brand">
          <img
            src="/assets/RadNewLogoWordmarkWhite.png"
            alt="RAD Esports"
            className="subpage-logo"
          />
        </Link>

        <nav className="subpage-nav" aria-label="Primary navigation">
          {primaryNavLinks.map((link) => {
            const active = pathname === link.href;

            return (
               <Link
                key={link.href}
                href={link.href}
                className={active ? "subpage-link active" : "subpage-link"}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="subpage-actions">
          <AuthWidget />
        </div>
      </div>
    </header>
  );
}
