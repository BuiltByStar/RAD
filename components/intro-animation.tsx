"use client";

import { useEffect, useState } from "react";

type Phase = 0 | 1 | 2 | 3 | 4;

export function IntroAnimation() {
  const [phase, setPhase] = useState<Phase>(0);

  useEffect(() => {
    // Phase 1 — scanline sweeps, logo materialises top-to-bottom
    const t1 = setTimeout(() => setPhase(1), 80);
    // Phase 2 — scan complete, logo fully visible with glow pulse
    const t2 = setTimeout(() => setPhase(2), 790);
    // Phase 3 — left + right panels slide open
    const t3 = setTimeout(() => setPhase(3), 1020);
    // Phase 4 — unmount overlay
    const t4 = setTimeout(() => setPhase(4), 2100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (phase === 4) return null;

  return (
    <div className={`rad-intro rad-intro--${phase}`} aria-hidden="true">
      {/* Black panels — left and right halves */}
      <div className="rad-intro__panel rad-intro__panel--l" />
      <div className="rad-intro__panel rad-intro__panel--r" />

      {/* Red scanline that sweeps top → bottom */}
      <div className="rad-intro__scanline" />

      {/* Logo — revealed by clip-path as scanline passes */}
      <div className="rad-intro__logo-wrap">
        <img
          src="/assets/RadNewLogoWordmarkWhite.png"
          alt=""
          draggable="false"
          className="rad-intro__logo-img"
        />
      </div>
    </div>
  );
}
