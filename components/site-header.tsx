"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import { AuthWidget } from "@/components/auth-widget";
import { NavGlitchOverlay } from "@/components/nav-glitch-overlay";
import { cn } from "@/components/ui/cn";
import { assets } from "@/lib/assets";
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
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navTransition, setNavTransition] = useState<NavTransition | null>(null);
  const pushTimerRef = useRef<number | null>(null);
  const clearTimerRef = useRef<number | null>(null);
  const readyTimerRef = useRef<number | null>(null);
  const hardFallbackTimerRef = useRef<number | null>(null);
  const readyRouteRef = useRef<string | null>(null);

  function clearNavTimers() {
    if (pushTimerRef.current) {
      window.clearTimeout(pushTimerRef.current);
      pushTimerRef.current = null;
    }
    if (clearTimerRef.current) {
      window.clearTimeout(clearTimerRef.current);
      clearTimerRef.current = null;
    }
    if (readyTimerRef.current) {
      window.clearTimeout(readyTimerRef.current);
      readyTimerRef.current = null;
    }
    if (hardFallbackTimerRef.current) {
      window.clearTimeout(hardFallbackTimerRef.current);
      hardFallbackTimerRef.current = null;
    }
  }

  function scheduleNavClear() {
    if (clearTimerRef.current) {
      window.clearTimeout(clearTimerRef.current);
    }

    clearTimerRef.current = window.setTimeout(() => {
      setNavTransition(null);
      clearNavTimers();
    }, NAV_GLITCH_OUTRO_MS);
  }

  function beginNavExit() {
    if (pushTimerRef.current) {
      window.clearTimeout(pushTimerRef.current);
      pushTimerRef.current = null;
    }

    setNavTransition((current) => {
      if (!current || current.phase === "exit") return current;
      return { ...current, phase: "exit" };
    });
    scheduleNavClear();
  }

  useEffect(() => {
    let frame = 0;
    let lastScrolled = window.scrollY > SCROLL_THRESHOLD;

    const syncScrolled = () => {
      frame = 0;
      const nextScrolled = window.scrollY > SCROLL_THRESHOLD;
      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
    };

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(syncScrolled);
      }
    };

    setScrolled(lastScrolled);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
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
    <>
      <NavGlitchOverlay
        key={navTransition?.id ?? "idle"}
        active={!!navTransition}
        exiting={navTransition?.phase === "exit"}
        label={navTransition?.label}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-200 ease-[var(--ease-emphasis)]",
          scrolled ? "border-[#dc143c]/28 bg-black/84" : "border-white/10 bg-black/60"
        )}
      >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid h-14 min-w-0 grid-cols-[auto_1fr_auto] items-center gap-3 sm:h-16 sm:gap-6">
          <Link href="/" aria-label="RAD Esports home" className="group flex shrink-0 items-center gap-3">
            <Image
              src={assets.logoMark}
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 object-contain transition-opacity duration-200 group-hover:opacity-90 sm:h-10 sm:w-10"
              priority
            />
            <span className="hidden flex-col sm:flex">
              <span className="font-[family-name:var(--font-display)] text-sm font-extrabold uppercase leading-none tracking-[0.08em] text-white">
                RAD
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/42">Esports Org</span>
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden w-fit items-center justify-center gap-0 justify-self-center md:flex"
          >
            {primaryNavLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handlePrimaryNavClick(event, link, active)}
                  className={`group relative px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc143c] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    active ? "text-white" : "text-white/52 hover:text-white"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className={`pointer-events-none absolute inset-x-2 bottom-0 h-px origin-left bg-[#dc143c] transition-transform duration-200 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
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
              className="inline-flex h-9 items-center justify-center rounded-none border border-white/10 bg-white/[0.04] px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/64 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc143c] md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-rad-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="mobile-menu-label">Menu</span>
              <svg
                className="mobile-menu-icon"
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 1h14M1 6h14M1 11h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
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
                    onClick={(event) => handlePrimaryNavClick(event, link, active)}
                    className={`flex items-center justify-between px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc143c] ${
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
    </>
  );
}
