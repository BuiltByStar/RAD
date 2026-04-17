"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AuthWidget } from "@/components/auth-widget";
import { primaryNavLinks } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[var(--ease-emphasis)] ${
        scrolled
          ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-6 px-6 sm:h-18 sm:px-8 lg:h-20 lg:px-12">
        <Link href="/" aria-label="RAD Esports home" className="relative block shrink-0">
          <Image
            src="/assets/RadNewLogoWordmarkWhite.png"
            alt="RAD Esports"
            width={120}
            height={32}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {primaryNavLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                  active
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
                <span
                  className={`pointer-events-none absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 bg-[color:var(--color-rad)] transition-transform duration-300 ${
                    active ? "scale-x-100" : "group-hover:scale-x-100"
                  }`}
                  aria-hidden
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <AuthWidget />
        </div>
      </div>
    </header>
  );
}
