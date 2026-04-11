"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AuthWidget } from "@/components/auth-widget";
import { primaryNavLinks } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`rad-header${isHome ? " rad-header--home" : ""}`}>
      <div className="container rad-header__inner">
        <Link href="/" aria-label="RAD Esports home" className="rad-header__brand" onClick={() => setOpen(false)}>
          <Image
            src={isHome ? "/assets/RadNewLogoWordmarkWhite.png" : "/assets/RadNewLogoWordmarkRed.png"}
            alt="RAD Esports"
            width={168}
            height={42}
            priority
            className="rad-header__logo"
          />
        </Link>

        <button
          type="button"
          className="rad-header__toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`rad-header__nav-shell${open ? " is-open" : ""}`}>
          <nav id="site-nav" className="rad-header__nav" aria-label="Primary navigation">
            {primaryNavLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rad-header__link${active ? " is-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="rad-header__actions">
            <AuthWidget />
          </div>
        </div>
      </div>
    </header>
  );
}
