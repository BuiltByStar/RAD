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
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-300 ease-[var(--ease-emphasis)] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1500px]">
        <div
          className={`flex h-16 w-full items-center justify-between gap-4 rounded-lg border px-4 sm:h-[4.5rem] sm:px-6 lg:h-[4.75rem] lg:px-8 ${
            scrolled
              ? "border-white/14 bg-black/80 shadow-[0_20px_44px_-30px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
              : "border-white/10 bg-black/55 backdrop-blur-xl"
          }`}
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
                  className={`group relative rounded-md px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
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
              className="inline-flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.05] px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-rad)] md:hidden"
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
            className="mt-2 rounded-lg border border-white/10 bg-black/88 p-3 backdrop-blur-2xl md:hidden"
          >
            <nav aria-label="Mobile navigation" className="grid gap-2">
              {primaryNavLinks.map((link) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between rounded-md border px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
                      active
                        ? "border-[color:var(--color-rad)]/32 bg-[color:var(--color-rad)]/10 text-white"
                        : "border-white/10 bg-white/[0.03] text-white/68 hover:border-white/18 hover:text-white"
                    }`}
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
