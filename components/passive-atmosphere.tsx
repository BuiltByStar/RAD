"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function PassiveAtmosphere() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Render a different passive glow intensity based on if you're on the homepage vs a subpage
  const isHome = pathname === "/";
  const glowClass = isHome ? "ambient-glow-home" : "ambient-glow-subpage";

  return (
    <div className="passive-atmosphere" aria-hidden="true">
      <div className={`ambient-glow ${glowClass}`} />
      <div className="atmosphere-vignette" />
      {/* Subtle floating particles */}
      {[...Array(8)].map((_, i) => (
        <div key={`mote-${i}`} className={`ambient-mote mote-${i + 1}`} />
      ))}
    </div>
  );
}
