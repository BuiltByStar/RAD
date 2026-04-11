import Image from "next/image";
import Link from "next/link";

import { activationsSummary, contactChannels, navLinks, siteTagline } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="rad-footer">
      <div className="container rad-footer__top">
        <div className="rad-footer__brand">
          <Image
            src="/assets/RadNewLogoWordmarkRed.png"
            alt="RAD Esports"
            width={196}
            height={50}
            className="rad-footer__logo"
          />
          <p className="rad-copy">
            {siteTagline}
          </p>
          <p className="rad-footer__note">{activationsSummary}</p>
        </div>

        <div className="rad-footer__group">
          <p className="rad-kicker">Navigate</p>
          <div className="rad-footer__links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rad-footer__group">
          <p className="rad-kicker">Connect</p>
          <div className="rad-footer__links">
            {contactChannels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {channel.value}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container rad-footer__bottom">
        <p>© {new Date().getFullYear()} RAD Esports. All rights reserved.</p>
        <div className="rad-footer__legal">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
