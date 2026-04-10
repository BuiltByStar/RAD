import Link from "next/link";

import { contactChannels, navLinks } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-column">
          <p className="section-kicker section-kicker--tight">RAD Esports</p>
          <img
            src="/assets/RadNewLogoWordmarkRed.png"
            alt="RAD Esports"
            className="footer-brand"
          />
          <p className="footer-copy">
            Competitive pedigree, scalable branding, and a site structure built to grow with new titles, media, and partnerships.
          </p>
        </div>

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

        <div>
          <p className="footer-col-label">Connect</p>
          <div className="footer-links">
            {contactChannels.map((channel) => (
              <a key={channel.label} href={channel.href}>
                {channel.value}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="footer-bottom-main">
          <p>© {new Date().getFullYear()} RAD Esports</p>
          <span className="footer-tag">Built for pressure, content, and the next stage of competition.</span>
        </div>

        <div className="footer-legal">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
