"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
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

      document.body.classList.add("reveal-ready");

      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        const rect = element.getBoundingClientRect();
        const alreadyVisible = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

        if (alreadyVisible) {
          element.classList.add("is-visible");
          return;
        }

        if (!element.classList.contains("is-visible")) {
          observer.observe(element);
        }
      });

      return () => observer.disconnect();
    }, 80);

    return () => clearTimeout(timer);
  }, [pathname]); // Re-run on every route change

  return null;
}
