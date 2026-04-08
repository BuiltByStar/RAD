import Link from "next/link";

import { contactChannels, navLinks } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--grad-ocean)' }} />
      <div className="container footer-grid">
        <div className="footer-brand-column">
          <p className="footer-kicker">RAD Esports</p>
          <img
            src="/assets/RadNewLogoWordmarkRed.png"
            alt="RAD Esports"
            className="footer-brand"
          />
          <p className="footer-copy">
            Championship pedigree, sharp branding, and a competitive identity
            built to scale beyond a single title.
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
        <div className="footer-bottom-main">
          <p>© {new Date().getFullYear()} RAD Esports</p>
          <span className="footer-tag">Built for pressure, content, and the next stage of competition.</span>
        </div>
        
        <div className="footer-legal">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/cookies">Cookies</Link>
        </div>

        <div className="footer-attribution">
          <a href="https://builtbystar.com" target="_blank" rel="noopener noreferrer" className="built-by-star">
            Built by Star
          </a>
        </div>
      </div>
    </footer>
  );
}
