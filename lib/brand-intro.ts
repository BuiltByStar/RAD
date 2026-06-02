export const BRAND_INTRO_SESSION_KEY = "rad-site-intro-v3";

export const BRAND_INTRO_COMPLETE_EVENT = "rad:brand-intro-complete";

export function dispatchBrandIntroComplete() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(BRAND_INTRO_COMPLETE_EVENT));
}

export function hasSeenBrandIntro() {
  if (typeof window === "undefined") return true;
  try {
    return (
      sessionStorage.getItem(BRAND_INTRO_SESSION_KEY) === "1" ||
      sessionStorage.getItem("rad-site-intro-v2") === "1" ||
      sessionStorage.getItem("rad-site-intro-v1") === "1" ||
      sessionStorage.getItem("rad-home-brand-intro-v1") === "1"
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
