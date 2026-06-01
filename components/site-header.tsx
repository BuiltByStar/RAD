"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import { AuthWidget } from "@/components/auth-widget";
import { NavGlitchOverlay } from "@/components/nav-glitch-overlay";
import { cn } from "@/components/ui/cn";
import { assets } from "@/lib/assets";
import {
  discordInviteUrl,
  headerCompeteLinks,
  headerNavLinks,
  headerOrgLinks,
  type HeaderNavLink
} from "@/lib/site-data";

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

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
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
      headerNavLinks.forEach((link) => router.prefetch(link.href));
      router.prefetch("/");
      router.prefetch("/shop");
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

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, link: HeaderNavLink, active: boolean) {
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

  function renderNavLink(link: HeaderNavLink, variant: "bar" | "mobile") {
    const active = isActive(pathname, link.href);
    return (
      <Link
        key={`${variant}-${link.label}-${link.href}`}
        href={link.href}
        onClick={(event) => handleNavClick(event, link, active)}
        className={cn(
          variant === "bar" ? "rad-nav-link" : "flex items-center justify-between px-4 py-3.5 text-xs font-bold uppercase tracking-[0.16em]",
          variant === "bar" && link.zone === "compete" && "rad-nav-link--compete",
          active && (variant === "bar" ? "rad-nav-link--active" : "bg-[var(--color-blood)]/10 text-white"),
          !active && variant === "mobile" && "text-neutral-400"
        )}
        aria-current={active ? "page" : undefined}
      >
        {link.label}
        {variant === "mobile" ? <span aria-hidden className="text-neutral-600">→</span> : null}
      </Link>
    );
  }

  const homeActive = pathname === "/";

  return (
    <>
      <NavGlitchOverlay
        key={navTransition?.id ?? "idle"}
        active={!!navTransition}
        exiting={navTransition?.phase === "exit"}
        label={navTransition?.label}
      />
      <header className="rad-header fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-14 max-w-[2400px] items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label="RAD Esports home"
            onClick={(event) => handleNavClick(event, { href: "/", label: "Home" }, homeActive)}
            className={cn(
              "group flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90",
              homeActive && "opacity-100"
            )}
          >
            <Image
              src={assets.logoMark}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
            <span className="hidden flex-col sm:flex">
              <span className="font-[family-name:var(--font-display)] text-sm font-extrabold uppercase leading-none tracking-[0.06em] text-white">
                RAD
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-[var(--color-blood)]">
                #GoWild
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="rad-nav-cluster absolute left-1/2 hidden -translate-x-1/2 lg:flex"
          >
            <div className="rad-nav-cluster__zone" aria-label="Compete">
              {headerCompeteLinks.map((link) => renderNavLink(link, "bar"))}
            </div>
            <div className="rad-nav-cluster__zone" aria-label="Organization">
              {headerOrgLinks.map((link) => renderNavLink(link, "bar"))}
            </div>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href={discordInviteUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500 transition-colors hover:text-white md:inline-flex"
            >
              Discord
            </Link>
            <Link
              href="/shop"
              onClick={(event) =>
                handleNavClick(event, { href: "/shop", label: "Shop" }, isActive(pathname, "/shop"))
              }
              className="hidden bg-[var(--color-blood)] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black transition-opacity hover:opacity-90 sm:inline-flex"
            >
              Shop
            </Link>
            <div className="hidden sm:block">
              <AuthWidget />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center border border-neutral-800 text-neutral-400 transition-colors hover:border-neutral-600 hover:text-white lg:hidden"
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

        {menuOpen ? (
          <div
            id="mobile-rad-nav"
            className="border-t border-neutral-900 bg-black lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="mx-auto max-w-[2400px] px-4 py-4">
              <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-blood)]">
                Compete
              </p>
              <div className="mb-4 grid border border-neutral-900">
                {headerCompeteLinks.map((link) => renderNavLink(link, "mobile"))}
              </div>
              <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                Organization
              </p>
              <div className="grid border border-neutral-900">
                {headerOrgLinks.map((link) => renderNavLink(link, "mobile"))}
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Link
                  href={discordInviteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-neutral-800 py-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                >
                  Discord
                </Link>
                <Link
                  href="/shop"
                  onClick={(event) =>
                    handleNavClick(event, { href: "/shop", label: "Shop" }, isActive(pathname, "/shop"))
                  }
                  className="bg-[var(--color-blood)] py-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-black"
                >
                  Shop
                </Link>
              </div>
              <div className="mt-4 border-t border-neutral-900 pt-4">
                <AuthWidget />
              </div>
            </nav>
          </div>
        ) : null}
      </header>
    </>
  );
}
