export const BRAND_INTRO_SESSION_KEY = "rad-site-intro-v3";

export const BRAND_INTRO_LEGACY_SESSION_KEYS = [
  "rad-site-intro-v2",
  "rad-site-intro-v1",
  "rad-home-brand-intro-v1"
] as const;

export const BRAND_INTRO_COMPLETE_EVENT = "rad:brand-intro-complete";

export const BRAND_INTRO_PENDING_CLASS = "site-intro-pending";

export const BRAND_INTRO_BLOCKING_SCRIPT = `(function(){try{var k=${JSON.stringify([BRAND_INTRO_SESSION_KEY, ...BRAND_INTRO_LEGACY_SESSION_KEYS])};var s=k.some(function(x){return sessionStorage.getItem(x)==="1"});if(s)return;if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.documentElement.classList.add("${BRAND_INTRO_PENDING_CLASS}")}catch(e){}})();`;

export function dispatchBrandIntroComplete() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(BRAND_INTRO_COMPLETE_EVENT));
}

export function hasSeenBrandIntro() {
  if (typeof window === "undefined") return true;
  try {
    return (
      sessionStorage.getItem(BRAND_INTRO_SESSION_KEY) === "1" ||
      BRAND_INTRO_LEGACY_SESSION_KEYS.some((key) => sessionStorage.getItem(key) === "1")
    );
  } catch {
    return true;
  }
}

export function markBrandIntroSeen() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(BRAND_INTRO_SESSION_KEY, "1");
  } catch {
    /* ignore */
  }
}
