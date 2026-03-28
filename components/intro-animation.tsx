"use client";
import { useEffect, useState } from "react";

export function IntroAnimation() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 80);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1980);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === 3) return null;

  return (
    <div className={`rad-intro rad-intro--${phase}`} aria-hidden="true">
      <div className="rad-intro__panel rad-intro__panel--t" />
      <div className="rad-intro__panel rad-intro__panel--b" />
      <div className="rad-intro__center">
        <div className="rad-intro__line" />
        <div className="rad-intro__logo">
          <img src="/assets/RadNewLogoWordmarkWhite.png" alt="" draggable="false" />
        </div>
      </div>
    </div>
  );
}
