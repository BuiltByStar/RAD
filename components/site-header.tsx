"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import { AuthWidget } from "@/components/auth-widget";
import { NavGlitchOverlay } from "@/components/nav-glitch-overlay";
import { cn } from "@/components/ui/cn";
import { assets } from "@/lib/assets";
import { primaryNavLinks, secondaryNavLinks } from "@/lib/site-data";

const SCROLL_THRESHOLD = 8;
const NAV_PUSH_DELAY_MS = 90;
const NAV_GLITCH_OUTRO_MS = 320;
const NAV_READY_FALLBACK_MS = 950;
const NAV_HARD_FALLBACK_MS = 5000;

type NavLinkItem = { href: string; label: string };
type NavTransition = {
  href: string;
  label: string;
  id: number;
  phase: "enter" | "exit";
};

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navTransition, setNavTransition] = useState<NavTransition | null>(null);
  const pushTimerRef = useRef<number | null>(null);
  const clearTimerRef = useRef<number | null>(null);
  const readyTimerRef = useRef<number | null>(null);
  const hardFallbackTimerRef = useRef<number | null>(null);
  const readyRouteRef = useRef<string | null>(null);

  function clearNavTimers() {
    [pushTimerRef, clearTimerRef, readyTimerRef, hardFallbackTimerRef].forEach((ref) => {
      if (ref.current) {
        window.clearTimeout(ref.current);
        ref.current = null;
      }
    });
  }

  function scheduleNavClear() {
    if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current);
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

  useEffect(() => clearNavTimers, []);
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const prefetchRoutes = () => {
      [...primaryNavLinks, ...secondaryNavLinks].forEach((link) => router.prefetch(link.href));
    };
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
      if (
        reachedTarget &&
        (pathname === navTransition.href ||
          (navTransition.href !== "/" && pathname.startsWith(navTransition.href)))
      ) {
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
    if (readyTimerRef.current) window.clearTimeout(readyTimerRef.current);
    readyTimerRef.current = window.setTimeout(beginNavExit, NAV_READY_FALLBACK_MS);
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

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, link: NavLinkItem, active: boolean) {
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

  function renderPrimaryLink(link: NavLinkItem) {
    const active = isActive(pathname, link.href);
    return (
      <Link
        key={`${link.label}-${link.href}`}
        href={link.href}
        onClick={(event) => handleNavClick(event, link, active)}
        className={cn(
          "relative isolate px-3 transition-colors duration-300 hover:text-white/70",
          active ? "text-white" : "text-white/90"
        )}
        aria-current={active ? "page" : undefined}
      >
        <div className="px-1 py-3">
          <span className="text-xs font-bold uppercase">{link.label}</span>
        </div>
        <span
          aria-hidden
          className={cn(
            "absolute bottom-0 left-1/2 h-0.5 w-2 -translate-x-1/2 bg-[var(--color-blood)] transition-opacity duration-300",
            active ? "opacity-100" : "opacity-0"
          )}
        />
      </Link>
    );
  }

  function renderSecondaryLink(link: NavLinkItem) {
    const active = isActive(pathname, link.href);
    return (
      <Link
        key={`${link.label}-${link.href}`}
        href={link.href}
        onClick={(event) => handleNavClick(event, link, active)}
        className={cn(
          "px-3 py-4 text-xs font-medium transition-colors duration-300 hover:text-neutral-400",
          active ? "text-neutral-300" : "text-neutral-500"
        )}
        aria-current={active ? "page" : undefined}
      >
        {link.label}
      </Link>
    );
  }

  const mobileLinks = [...secondaryNavLinks, ...primaryNavLinks];

  return (
    <>
      <NavGlitchOverlay
        key={navTransition?.id ?? "idle"}
        active={!!navTransition}
        exiting={navTransition?.phase === "exit"}
        label={navTransition?.label}
      />
      <header className="fixed left-0 top-0 z-50 w-full border-b border-neutral-900 bg-black">
        <div className="relative z-20 flex items-stretch bg-black">
          <Link href="/" aria-label="RAD Esports home" className="shrink-0">
            <div className="flex h-full flex-col items-start justify-center gap-1 border-neutral-900 py-4 pl-4 md:px-8 lg:border-r lg:py-10">
              <Image
                src={assets.wordmark}
                alt="RAD Esports"
                width={176}
                height={45}
                className="h-6 w-auto lg:h-8"
                priority
              />
              <span className="hidden text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-blood)] lg:inline">
                #GoWild
              </span>
            </div>
          </Link>

          <div className="hidden grow flex-col lg:flex">
            <div className="flex items-center border-b border-neutral-900 px-3 text-xs font-medium text-neutral-500">
              {secondaryNavLinks.map(renderSecondaryLink)}
            </div>
            <div className="flex h-full items-center px-3 font-bold uppercase">
              {primaryNavLinks.map(renderPrimaryLink)}
            </div>
          </div>

          <div className="flex grow flex-col items-end justify-end lg:grow-0 lg:justify-start">
            <div className="flex h-full items-center border-l border-neutral-900 px-1 md:px-3">
              <div className="hidden lg:block">
                <AuthWidget />
              </div>
              <Link
                href="/shop"
                className="p-3 transition-opacity hover:opacity-70"
                aria-label="Shop"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 7h15l-1.5 9h-12L6 7Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path d="M9 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="block p-3 lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-rad-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                <svg width="18" height="14" viewBox="0 0 16 12" fill="none" aria-hidden>
                  <path d="M1 1h14M1 6h14M1 11h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {menuOpen ? (
          <div id="mobile-rad-nav" className="border-t border-neutral-900 bg-black lg:hidden">
            <nav aria-label="Mobile navigation" className="grid gap-0 px-2 py-2">
              {mobileLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={`mobile-${link.label}-${link.href}`}
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link, active)}
                    className={cn(
                      "flex items-center justify-between px-3 py-3 text-xs font-bold uppercase tracking-wider",
                      active ? "text-[var(--color-blood)]" : "text-neutral-400"
                    )}
                  >
                    {link.label}
                    <span aria-hidden>→</span>
                  </Link>
                );
              })}
              <div className="border-t border-neutral-900 px-3 py-3">
                <AuthWidget />
              </div>
            </nav>
          </div>
        ) : null}
      </header>
    </>
  );
}
