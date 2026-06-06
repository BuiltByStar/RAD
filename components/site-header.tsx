"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import { AuthWidget } from "@/components/auth-widget";
import { BrandLockup } from "@/components/brand-lockup";
import { NavGlitchOverlay } from "@/components/nav-glitch-overlay";
import { cn } from "@/components/ui/cn";
import { SocialIconLink } from "@/components/ui/social-icon-link";
import { BRAND_INTRO_COMPLETE_EVENT, hasSeenBrandIntro } from "@/lib/brand-intro";
import {
  headerCompeteLinks,
  headerNavLinks,
  headerOrgLinks,
  orgSocialChannels,
  type HeaderNavLink,
  type OrgSocialPlatform
} from "@/lib/site-data";

const HEADER_SOCIAL_PLATFORMS: OrgSocialPlatform[] = ["discord", "youtube", "x"];

const headerSocialLinks = HEADER_SOCIAL_PLATFORMS.flatMap((platform) => {
  const channel = orgSocialChannels.find((entry) => entry.platform === platform);
  return channel ? [channel] : [];
});

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
  const [brandIntroAwaiting, setBrandIntroAwaiting] = useState<boolean | null>(null);
  const [brandIntroReady, setBrandIntroReady] = useState(false);
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
    setBrandIntroAwaiting(!hasSeenBrandIntro());
    setBrandIntroReady(hasSeenBrandIntro());

    const onIntroComplete = () => {
      setBrandIntroAwaiting(false);
      setBrandIntroReady(true);
    };

    window.addEventListener(BRAND_INTRO_COMPLETE_EVENT, onIntroComplete);
    return () => window.removeEventListener(BRAND_INTRO_COMPLETE_EVENT, onIntroComplete);
  }, []);

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
          active && (variant === "bar" ? "rad-nav-link--active" : "bg-[var(--color-blood)]/10 text-white"),
          !active && variant === "mobile" && "text-neutral-400"
        )}
        aria-current={active ? "page" : undefined}
      >
        <span
          className={cn(
            variant === "bar" ? "rad-nav-link__label" : active ? "text-white" : "text-neutral-400",
            variant === "bar" && link.zone === "compete" && "rad-nav-link__label--compete",
            variant === "bar" && active && "rad-nav-link__label--active"
          )}
        >
          {link.label}
        </span>
        {variant === "mobile" ? <span aria-hidden className="text-neutral-600">→</span> : null}
      </Link>
    );
  }

  const homeActive = pathname === "/";

  const brandIntroHidden = brandIntroAwaiting !== false;

  function renderBrandLink() {
    return (
      <Link
        href="/"
        aria-label="RAD Esports home"
        onClick={(event) => handleNavClick(event, { href: "/", label: "Home" }, homeActive)}
        className={cn(
          "rad-header-logo group flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90 sm:gap-3",
          brandIntroHidden && "rad-header-brand--await-intro",
          brandIntroReady && "rad-header-brand--intro-ready"
        )}
      >
        <BrandLockup size="nav" />
      </Link>
    );
  }

  return (
    <>
      <NavGlitchOverlay
        key={navTransition?.id ?? "idle"}
        active={!!navTransition}
        exiting={navTransition?.phase === "exit"}
        label={navTransition?.label}
      />
      <header className="rad-header fixed inset-x-0 top-0 z-50 border-b border-neutral-900 bg-black/95 backdrop-blur-md">
        <div className="mx-auto h-14 max-w-[2400px] px-4 sm:h-16 sm:px-6 md:px-8">
          {/* Mobile: menu left, brand top-right */}
          <div className="flex h-full items-center justify-between gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-neutral-800 text-neutral-400 transition-colors hover:border-neutral-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blood)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-expanded={menuOpen}
              aria-controls="mobile-rad-nav"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {menuOpen ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="14" viewBox="0 0 16 12" fill="none" aria-hidden>
                  <path d="M1 1h14M1 6h14M1 11h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              )}
            </button>
            <div className="rad-header-brand rad-header-brand--mobile">{renderBrandLink()}</div>
          </div>

          {/* Desktop: compete — brand — org + utilities */}
          <div className="hidden h-full items-center md:flex">
            <div className="flex min-w-0 flex-1 justify-end pr-3">
              <nav aria-label="Compete" className="rad-nav-cluster rad-border-trace shrink-0">
                {headerCompeteLinks.map((link) => renderNavLink(link, "bar"))}
              </nav>
            </div>

            <div className="rad-header-crest rad-border-trace rad-border-trace--vertical shrink-0">
              <div className="rad-header-brand rad-header-brand--center">{renderBrandLink()}</div>
            </div>

            <div className="flex min-w-0 flex-1 items-center gap-3 pl-3">
              <nav aria-label="Organization" className="rad-nav-cluster rad-border-trace rad-border-trace--offset shrink-0">
                {headerOrgLinks.map((link) => renderNavLink(link, "bar"))}
              </nav>
              <div className="ml-auto flex shrink-0 items-center gap-4">
                {headerSocialLinks.length > 0 ? (
                  <ul className="flex items-center gap-3">
                    {headerSocialLinks.map((channel) => (
                      <li key={channel.platform}>
                        <SocialIconLink
                          href={channel.href}
                          platform={channel.platform}
                          label={channel.label}
                          ariaLabel={`Follow RAD on ${channel.label} (opens in a new tab)`}
                          sizeClass="h-8 w-8"
                          iconClass="h-4 w-4"
                        />
                      </li>
                    ))}
                  </ul>
                ) : null}
                <AuthWidget />
              </div>
            </div>
          </div>
        </div>

        {menuOpen ? (
          <div
            id="mobile-rad-nav"
            className="border-t border-neutral-900 bg-black md:hidden"
          >
            <nav aria-label="Mobile navigation" className="mx-auto max-w-[2400px] px-4 py-4">
              <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-blood)]">
                Compete
              </p>
              <div className="rad-border-trace grid border border-neutral-900">
                {headerCompeteLinks.map((link) => renderNavLink(link, "mobile"))}
              </div>
              <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                Organization
              </p>
              <div className="rad-border-trace rad-border-trace--offset grid border border-neutral-900">
                {headerOrgLinks.map((link) => renderNavLink(link, "mobile"))}
              </div>
              {headerSocialLinks.length > 0 ? (
                <ul className="mt-5 flex items-center justify-center gap-5">
                  {headerSocialLinks.map((channel) => (
                    <li key={channel.platform}>
                      <SocialIconLink
                        href={channel.href}
                        platform={channel.platform}
                        label={channel.label}
                        ariaLabel={`Follow RAD on ${channel.label} (opens in a new tab)`}
                        sizeClass="h-10 w-10"
                        iconClass="h-5 w-5"
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
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
