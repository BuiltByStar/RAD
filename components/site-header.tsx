"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AuthWidget } from "@/components/auth-widget";
import { primaryNavLinks } from "@/lib/site-data";

const SCROLL_THRESHOLD = 8;
const NAV_PUSH_DELAY_MS = 90;
const NAV_GLITCH_OUTRO_MS = 320;
const NAV_READY_FALLBACK_MS = 950;
const NAV_HARD_FALLBACK_MS = 5000;

type NavTransition = {
  href: string;
  label: string;
  id: number;
  phase: "enter" | "exit";
};

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

  useEffect(() => clearNavTimers, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const prefetchRoutes = () => {
      primaryNavLinks.forEach((link) => router.prefetch(link.href));

      if (process.env.NODE_ENV === "development") {
        const warmTargets = primaryNavLinks
          .map((link) => link.href)
          .filter((href) => href !== "/");

        void (async () => {
          for (const href of warmTargets) {
            try {
              await fetch(href, {
                method: "GET",
                cache: "no-store",
                credentials: "same-origin"
              });
            } catch {
              // Dev warmup is best-effort only.
            }
          }
        })();
      }
    };

    if ("requestIdleCallback" in window) {
      const idleHost = window as Window & {
        requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
        cancelIdleCallback: (handle: number) => void;
      };
      const idleId = idleHost.requestIdleCallback(prefetchRoutes, { timeout: 1200 });
      return () => idleHost.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(prefetchRoutes, 250);
    return () => globalThis.clearTimeout(timeoutId);
  }, [router]);

  useEffect(() => {
    const handleReady = (event: Event) => {
      const detail = (event as CustomEvent<{ route?: string }>).detail;
      if (!detail?.route) return;
      readyRouteRef.current = detail.route;

      if (!navTransition || navTransition.phase === "exit") return;

      const reachedTarget =
        detail.route === navTransition.href ||
        (navTransition.href !== "/" && detail.route.startsWith(navTransition.href));

      if (reachedTarget && (pathname === navTransition.href || (navTransition.href !== "/" && pathname.startsWith(navTransition.href)))) {
        beginNavExit();
      }
    };

    window.addEventListener("rad:page-ready", handleReady as EventListener);
    return () => window.removeEventListener("rad:page-ready", handleReady as EventListener);
  }, [navTransition, pathname]);

  useEffect(() => {
    if (!navTransition || navTransition.phase === "exit") return;
    const reachedTarget =
      pathname === navTransition.href ||
      (navTransition.href !== "/" && pathname.startsWith(navTransition.href));

    if (!reachedTarget) return;

    if (
      readyRouteRef.current === navTransition.href ||
      (navTransition.href !== "/" && readyRouteRef.current?.startsWith(navTransition.href))
    ) {
      beginNavExit();
      return;
    }

    if (readyTimerRef.current) {
      window.clearTimeout(readyTimerRef.current);
    }

    readyTimerRef.current = window.setTimeout(() => {
      beginNavExit();
    }, NAV_READY_FALLBACK_MS);
  }, [pathname, navTransition]);

  function shouldHandleNavClick(event: MouseEvent<HTMLAnchorElement>) {
    const target = event.currentTarget.getAttribute("target");

    return (
      !event.defaultPrevented &&
      event.button === 0 &&
      !event.metaKey &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      (!target || target === "_self")
    );
  }

  function handlePrimaryNavClick(
    event: MouseEvent<HTMLAnchorElement>,
    link: (typeof primaryNavLinks)[number],
    active: boolean
  ) {
    if (!shouldHandleNavClick(event)) return;

    event.preventDefault();
    setMenuOpen(false);

    if (active || navTransition) return;

    clearNavTimers();
    readyRouteRef.current = null;
    setNavTransition({
      href: link.href,
      label: link.label,
      id: window.performance.now(),
      phase: "enter"
    });

    pushTimerRef.current = window.setTimeout(() => {
      router.push(link.href);
      pushTimerRef.current = null;
    }, NAV_PUSH_DELAY_MS);

    hardFallbackTimerRef.current = window.setTimeout(beginNavExit, NAV_HARD_FALLBACK_MS);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[rgba(5,5,7,0.72)] backdrop-blur-xl">
      <div
        className={`mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 ${
          scrolled ? "shadow-[0_16px_40px_rgba(0,0,0,0.4)]" : ""
        }`}
      >
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4">
          <Link href="/" aria-label="RAD Esports home">
            <Image src="/assets/RadNewLogoWordmarkWhite.png" alt="RAD Esports" width={116} height={30} priority />
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center justify-center gap-7 md:flex">
            {primaryNavLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 text-sm font-medium transition ${
                    active ? "text-white" : "text-white/62 hover:text-white"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--color-rad)] transition ${
                      active ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] text-white md:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              <span className="relative block h-3.5 w-4">
                <span className="absolute left-0 top-0 h-px w-full bg-current" />
                <span className="absolute left-0 top-[6px] h-px w-full bg-current" />
                <span className="absolute left-0 top-3 h-px w-full bg-current" />
              </span>
            </button>
            <AuthWidget />
          </div>
        </div>

        {menuOpen ? (
          <nav aria-label="Mobile navigation" className="grid gap-1 border-t border-[var(--border)] py-2 md:hidden">
            {primaryNavLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-2 py-3 text-sm ${
                    active ? "bg-[var(--surface-hi)] text-white" : "text-white/66"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
