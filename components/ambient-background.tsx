"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Site-wide atmosphere — soft, slow, editorial (inspired by premium dev-marketing
 * sites like https://resend.com): no grids, no scan lines, no harsh motion.
 */
export function AmbientBackground() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030303]"
    >
      {/* Top “floor” wash — subtle lift from pure black */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_-25%,rgba(255,255,255,0.055),transparent_50%)]" />

      {/* Single slow radial — barely-there brand warmth */}
      <motion.div
        className="absolute left-1/2 top-[18%] h-[min(92vw,820px)] w-[min(92vw,820px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,43,69,0.07)_0%,transparent_68%)] blur-[100px]"
        animate={reduced ? undefined : { opacity: [0.55, 0.9, 0.55], scale: [1, 1.04, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Very slow conic “light ray” — low contrast, no hard edges */}
      <motion.div
        className="absolute -left-1/2 top-0 h-[140vh] w-[200%] bg-[conic-gradient(from_200deg_at_50%_0%,transparent_0deg,rgba(255,255,255,0.025)_25deg,transparent_55deg,transparent_360deg)] opacity-[0.35]"
        animate={reduced ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
      />

      {/* Readability: vignette into true black at edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
