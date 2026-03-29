import Link from "next/link";

import { contactChannels, navLinks } from "@/lib/site-data";

function SocialIcon() {
  return (
    <svg width="12" height="9" viewBox="0 0 71 55" fill="currentColor" aria-hidden="true">
      <path d="M60.1 4.9A58.55 58.55 0 0 0 45.6.3a40.85 40.85 0 0 0-1.85 3.8 54.15 54.15 0 0 0-16.4 0A36.81 36.81 0 0 0 25.5.3 58.36 58.36 0 0 0 11 4.9C1.58 18.77-1 32.3.65 45.62a58.82 58.82 0 0 0 17.9 9.07 43.8 43.8 0 0 0 3.8-6.2 38.14 38.14 0 0 1-6-2.88 28.6 28.6 0 0 0 1.45-1.15 41.66 41.66 0 0 0 35.8 0c.47.4.95.78 1.45 1.15a38.25 38.25 0 0 1-6 2.89 43.19 43.19 0 0 0 3.8 6.19 58.61 58.61 0 0 0 17.9-9.07C72.16 32.17 68.62 18.68 60.1 4.9ZM23.73 37.73c-3.55 0-6.46-3.25-6.46-7.25s2.84-7.25 6.46-7.25c3.61 0 6.52 3.25 6.46 7.25 0 4-2.85 7.25-6.46 7.25Zm23.54 0c-3.55 0-6.46-3.25-6.46-7.25s2.84-7.25 6.46-7.25c3.61 0 6.52 3.25 6.46 7.25 0 4-2.85 7.25-6.46 7.25Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Brand column */}
        <div>
          <img
            src="/assets/RadNewLogoWordmarkRed.png"
            alt="RAD Esports"
            className="footer-brand"
          />
          <p className="footer-copy">
            RAD Esports is built to launch now and evolve later. The structure is stable
            so premium assets, roster updates, and sponsorship layers can all scale without
            a redesign.
          </p>
        </div>

        {/* Nav column */}
        <div>
          <p className="footer-col-label">Navigate</p>
          <div className="footer-links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact column */}
        <div>
          <p className="footer-col-label">Direct</p>
          <div className="footer-links">
            {contactChannels.map((ch) => (
              <a key={ch.label} href={ch.href}>
                {ch.label}: {ch.value}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} RAD Esports — V1 Launch Build</p>
        <a className="footer-discord-badge" href="https://x.com/RADesport">
          <SocialIcon />
          Follow on X
        </a>
      </div>
    </footer>
  );
}
