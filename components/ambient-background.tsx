"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AmbientBackground() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030304]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_-25%,rgba(255,0,0,0.2),transparent_52%),radial-gradient(70%_58%_at_84%_12%,rgba(255,255,255,0.06),transparent_55%)]" />

      <motion.div
        className="absolute -left-[18%] top-[8%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.2)_0%,transparent_66%)] blur-[70px]"
        animate={reduced ? undefined : { opacity: [0.55, 0.95, 0.55], x: [0, 42, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[-22%] top-[18%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,64,64,0.12)_0%,transparent_68%)] blur-[80px]"
        animate={reduced ? undefined : { opacity: [0.42, 0.72, 0.42], x: [0, -34, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -left-[10%] top-0 h-[140vh] w-[120%] opacity-[0.14] [background-image:linear-gradient(to_right,rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:72px_72px]"
        animate={reduced ? undefined : { backgroundPosition: ["0px 0px", "72px 72px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute left-[-20%] top-[16%] h-24 w-[140%] rotate-[-12deg] bg-[linear-gradient(90deg,transparent,rgba(255,0,0,0.16),rgba(255,255,255,0.08),transparent)] blur-sm"
        animate={reduced ? undefined : { x: ["-10%", "10%", "-10%"], opacity: [0.22, 0.5, 0.22] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_42%,transparent_28%,rgba(0,0,0,0.68)_100%)]" />
    </div>
  );
}
