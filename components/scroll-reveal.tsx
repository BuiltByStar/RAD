"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    let activeObserver: IntersectionObserver | null = null;

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
      );

      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => observer.observe(el));
      activeObserver = observer;
    }, 100);

    return () => {
      clearTimeout(timer);
      activeObserver?.disconnect();
    };
  }, [pathname]);

  return null;
}
