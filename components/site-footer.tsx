import Link from "next/link";

import { contactChannels, navLinks } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-column">
          <p className="footer-kicker">RAD Esports</p>
          <img
            src="/assets/RadNewLogoWordmarkRed.png"
            alt="RAD Esports"
            className="footer-brand"
          />
          <p className="footer-copy">
            Championship-level Marvel Rivals, sharp branding, and a community
            built to keep growing.
          </p>
        </div>

        <div>
          <p className="footer-col-label">Pages</p>
          <div className="footer-links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="footer-col-label">Connect</p>
          <div className="footer-links">
            {contactChannels.map((ch) => (
              <a key={ch.label} href={ch.href}>
                {ch.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} RAD Esports</p>
        <span>Built for pressure, content, and the next stage of competition.</span>
      </div>
    </footer>
  );
}
