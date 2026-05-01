"use client";

import type { CSSProperties } from "react";

type NavGlitchOverlayProps = {
  active: boolean;
  exiting?: boolean;
  label?: string;
};

const glitchLayers = [
  { className: "nav-glitch-logo-layer nav-glitch-logo-layer--white", slice: "polygon(0 0,100% 0,96% 26%,3% 23%)" },
  { className: "nav-glitch-logo-layer nav-glitch-logo-layer--red nav-glitch-logo-layer--a", slice: "polygon(2% 20%,100% 16%,98% 43%,0 48%)" },
  { className: "nav-glitch-logo-layer nav-glitch-logo-layer--white nav-glitch-logo-layer--b", slice: "polygon(0 40%,96% 36%,100% 63%,4% 68%)" },
  { className: "nav-glitch-logo-layer nav-glitch-logo-layer--red nav-glitch-logo-layer--c", slice: "polygon(4% 62%,100% 58%,94% 100%,0 96%)" }
] as const;

export function NavGlitchOverlay({ active, exiting = false, label }: NavGlitchOverlayProps) {
  if (!active) return null;

  return (
    <div className={`nav-glitch-overlay ${exiting ? "nav-glitch-overlay--exit" : ""}`} aria-hidden="true">
      <div className="nav-glitch-field" />
      <div className="nav-glitch-scan nav-glitch-scan--one" />
      <div className="nav-glitch-scan nav-glitch-scan--two" />

      <div className="nav-glitch-stage">
        <div className="nav-glitch-logo" aria-label={label ? `Opening ${label}` : undefined}>
          <span className="nav-glitch-brush nav-glitch-brush--back" />
          <span className="nav-glitch-logo-base" />
          {glitchLayers.map((layer, index) => (
            <span
              key={index}
              className={layer.className}
              style={{ "--slice": layer.slice } as CSSProperties}
            />
          ))}
          <span className="nav-glitch-brush nav-glitch-brush--front" />
        </div>
      </div>
    </div>
  );
}
