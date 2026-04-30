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
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[var(--ease-emphasis)]">
      <div
        className={`mx-auto w-full max-w-[1720px] border-b px-4 sm:px-6 lg:px-10 ${
          scrolled
            ? "border-[#ff0000]/20 bg-black/76 shadow-[0_20px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl"
            : "border-white/[0.08] bg-black/46 backdrop-blur-xl"
        }`}
      >
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 sm:h-[4.5rem]">
          <Link href="/" aria-label="RAD Esports home" className="group relative block shrink-0">
            <span
              aria-hidden
              className="absolute -inset-3 rounded-full bg-[#ff0000]/0 blur-xl transition duration-500 group-hover:bg-[#ff0000]/18"
            />
            <Image
              src="/assets/RadNewLogoWordmarkWhite.png"
              alt="RAD Esports"
              width={108}
              height={28}
              priority
              className="relative h-6 w-auto transition duration-500 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_0_18px_rgba(255,0,0,0.45)] sm:h-7"
            />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden w-fit items-center justify-center gap-1 justify-self-center rounded-full border border-white/10 bg-white/[0.035] px-2 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:flex"
          >
            {primaryNavLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition ${
                    active ? "text-white" : "text-white/52 hover:text-white"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 rounded-full bg-[#ff0000]/0 transition duration-300 ${
                      active ? "bg-[#ff0000]/12" : "group-hover:bg-white/[0.045]"
                    }`}
                  />
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className={`pointer-events-none absolute inset-x-4 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[color:var(--color-rad)] to-transparent transition-transform duration-300 ${
                      active ? "scale-x-100" : "group-hover:scale-x-100"
                    }`}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-9 items-center rounded border border-white/10 bg-white/[0.04] px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/64 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-rad)] md:hidden"
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
            className="border-t border-white/10 py-2 md:hidden"
          >
            <nav aria-label="Mobile navigation" className="grid gap-1">
              {primaryNavLinks.map((link) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] transition ${
                      active ? "text-white" : "text-white/65 hover:text-white"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <span>{link.label}</span>
                    <span aria-hidden className="text-white/35">→</span>
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
