"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    let activeObserver: IntersectionObserver | null = null;
    let frame = 0;

    const attachObserver = () => {
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
    };

    frame = window.requestAnimationFrame(attachObserver);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      activeObserver?.disconnect();
    };
  }, [pathname]);

  return null;
}
