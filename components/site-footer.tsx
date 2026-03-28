import Link from "next/link";

import { contactChannels, navLinks } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img
            src="/assets/RadNewLogoWordmarkRed.png"
            alt="RAD Esports"
            className="footer-brand"
          />
          <p className="footer-copy">
            RAD Esports is built to launch now and evolve later. The structure
            is stable so premium assets, roster updates, and sponsorship layers
            can scale without a redesign.
          </p>
        </div>
        <div>
          <p className="eyebrow">Navigate</p>
          <div className="footer-links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Direct</p>
          <div className="footer-links">
            {contactChannels.map((channel) => (
              <a key={channel.label} href={channel.href}>
                {channel.label}: {channel.value}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
