import Link from "next/link";

import { discordInviteUrl, primaryNavLinks } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link href="/" className="brand-lockup" aria-label="RAD Esports home">
          <img
            src="/assets/RadNewLogoWordmarkWhite.png"
            alt="RAD Esports"
            className="brand-image"
          />
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {primaryNavLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <a className="nav-cta" href={discordInviteUrl}>
          Join Discord
        </a>
      </div>
    </header>
  );
}
