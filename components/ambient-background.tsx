"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AmbientBackground() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,0.65)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:60px_60px]"
      />

      <motion.div
        className="absolute -top-1/4 -left-1/4 h-[80vh] w-[80vh] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,43,69,0.38), rgba(255,43,69,0) 70%)"
        }}
        animate={
          reduced
            ? undefined
            : { x: [0, 80, -40, 0], y: [0, 40, 80, 0], scale: [1, 1.15, 0.95, 1] }
        }
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-1/3 right-[-10%] h-[75vh] w-[75vh] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,80,100,0.28), rgba(255,43,69,0) 70%)"
        }}
        animate={
          reduced
            ? undefined
            : { x: [0, -60, 40, 0], y: [0, -40, -80, 0], scale: [1, 0.9, 1.1, 1] }
        }
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        className="absolute top-1/3 left-1/2 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(120,40,255,0.10), rgba(0,0,0,0) 70%)"
        }}
        animate={reduced ? undefined : { opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,43,69,0.9), transparent)"
        }}
        animate={reduced ? undefined : { x: ["-25%", "125%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />
    </div>
  );
}
