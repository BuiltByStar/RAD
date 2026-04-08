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

  // Generate deterministic random values for diagonal shooting lines
  const lines = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    left: `${(i * 11) % 120}%`, // spread across wider than screen
    top: `${-20 + (i % 5) * 10}%`,
    width: `${150 + (i % 4) * 100}px`, // variable lengths
    height: i % 4 === 0 ? "2px" : "1px",
    duration: `${4 + (i % 6) * 1.5}s`, // varied speeds
    delay: `-${(i % 10)}s`, // staggered starts
    color: i % 3 === 0 ? "rgba(230,0,0,0.4)" : "rgba(255,255,255,0.06)",
    glow: i % 3 === 0 ? "0 0 12px rgba(255, 0, 0, 0.8)" : "none"
  }));

  // Generate floating dots
  const dots = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: `${(i * 17) % 100}%`,
    top: `${(i * 23) % 100}%`,
    size: `${2 + (i % 4) * 1.5}px`,
    duration: `${10 + (i % 7) * 4}s`,
    delay: `-${i % 12}s`,
    color: i % 4 === 0 ? "rgba(255,50,50,0.6)" : "rgba(255,255,255,0.2)",
    blur: i % 2 === 0 ? "blur(2px)" : "blur(1px)",
    glow: i % 4 === 0 ? "0 0 15px rgba(255, 0, 0, 0.6)" : "0 0 8px rgba(255, 255, 255, 0.3)"
  }));

  return (
    <div className="passive-atmosphere" aria-hidden="true">
      <div className={`ambient-glow ${glowClass}`} />
      <div className="atmosphere-vignette" />
      
      <div className="creative-bg-elements">
        {/* Diagonal shooting lines */}
        {lines.map((line) => (
          <div
            key={`line-${line.id}`}
            className="diagonal-line"
            style={{
              left: line.left,
              top: line.top,
              width: line.width,
              height: line.height,
              background: `linear-gradient(90deg, transparent, ${line.color}, transparent)`,
              boxShadow: line.glow,
              animationDuration: line.duration,
              animationDelay: line.delay
            }}
          />
        ))}

        {/* Floating glowing dots */}
        {dots.map((dot) => (
          <div
            key={`dot-${dot.id}`}
            className="floating-dot"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              backgroundColor: dot.color,
              filter: dot.blur,
              boxShadow: dot.glow,
              animationDuration: dot.duration,
              animationDelay: dot.delay
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .creative-bg-elements {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .diagonal-line {
          position: absolute;
          border-radius: 999px;
          transform: rotate(45deg);
          animation: shoot-diagonal linear infinite;
        }

        .floating-dot {
          position: absolute;
          border-radius: 50%;
          animation: float-around alternate infinite ease-in-out;
        }

        @keyframes shoot-diagonal {
          0% { transform: translate(-30vw, -30vh) rotate(45deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(130vw, 130vh) rotate(45deg); opacity: 0; }
        }

        @keyframes float-around {
          0% { transform: translate(0, 0) scale(1); opacity: 0.1; }
          50% { opacity: 0.9; }
          100% { transform: translate(40px, -60px) scale(1.6); opacity: 0.1; }
        }
      `}} />
    </div>
  );
}
