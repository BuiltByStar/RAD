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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-300 ease-[var(--ease-emphasis)] sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-[1500px]">
        <div
          className={`flex h-16 w-full items-center justify-between gap-4 border px-5 sm:h-[4.5rem] sm:px-7 lg:h-20 lg:px-10 ${
            scrolled
              ? "border-white/12 bg-[linear-gradient(180deg,rgba(6,6,6,0.88),rgba(6,6,6,0.72))] shadow-[0_20px_40px_-26px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
              : "border-white/8 bg-[linear-gradient(180deg,rgba(6,6,6,0.56),rgba(6,6,6,0.34))] backdrop-blur-xl"
          } [clip-path:polygon(0_0,calc(100%-18px)_0,100%_18px,100%_100%,18px_100%,0_calc(100%-18px))]`}
        >
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
                  className={`group relative rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition ${
                    active
                      ? "text-white"
                      : "text-white/58 hover:text-white"
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

          <div className="flex items-center gap-2 border-l border-white/10 pl-3 sm:pl-4">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 items-center gap-2 border border-white/10 bg-white/[0.03] px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-rad)] md:hidden [clip-path:polygon(0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%,0_0)]"
              aria-expanded={menuOpen}
              aria-controls="mobile-rad-nav"
            >
              Menu
            </button>
            <AuthWidget />
          </div>
        </div>

        {menuOpen ? (
          <div
            id="mobile-rad-nav"
            className="mt-2 border border-white/10 bg-[linear-gradient(180deg,rgba(6,6,6,0.92),rgba(6,6,6,0.76))] p-3 backdrop-blur-2xl md:hidden [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))]"
          >
            <nav aria-label="Mobile navigation" className="grid gap-2">
              {primaryNavLinks.map((link) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between border px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${
                      active
                        ? "border-[color:var(--color-rad)]/32 bg-[color:var(--color-rad)]/10 text-white"
                        : "border-white/10 bg-white/[0.03] text-white/68 hover:border-white/18 hover:text-white"
                    } [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%-12px))]`}
                    aria-current={active ? "page" : undefined}
                  >
                    <span>{link.label}</span>
                    <span aria-hidden>→</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
