"use client";

import { AnimatePresence, motion } from "framer-motion";

const worldThemes = [
  { slug: "core", label: "Core Shift" },
  { slug: "vanguard", label: "Vanguard Break" },
  { slug: "media", label: "Media Pulse" },
  { slug: "alliances", label: "Alliance Link" }
] as const;

export function WorldTransitionOverlay({ worldIndex }: { worldIndex: number | null }) {
  const theme = typeof worldIndex === "number" ? worldThemes[worldIndex] : null;

  return (
    <AnimatePresence>
      {theme ? (
        <motion.div
          key={theme.slug}
          className={`world-transition world-transition--${theme.slug}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          aria-hidden="true"
        >
          <div className="world-transition__shade" />
          <div className="world-transition__grain" />
          <div className="world-transition__label-wrap">
            <motion.p
              className="world-transition__label"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {theme.label}
            </motion.p>
          </div>

          {theme.slug === "core" ? (
            <>
              <div className="world-transition__core-panel world-transition__core-panel--left" />
              <div className="world-transition__core-panel world-transition__core-panel--right" />
              <div className="world-transition__core-bloom" />
              <div className="world-transition__core-ring" />
            </>
          ) : null}

          {theme.slug === "vanguard" ? (
            <>
              <div className="world-transition__blade world-transition__blade--top" />
              <div className="world-transition__blade world-transition__blade--bottom" />
              <div className="world-transition__vanguard-ring world-transition__vanguard-ring--outer" />
              <div className="world-transition__vanguard-ring world-transition__vanguard-ring--inner" />
            </>
          ) : null}

          {theme.slug === "media" ? (
            <>
              <div className="world-transition__pulse world-transition__pulse--a" />
              <div className="world-transition__pulse world-transition__pulse--b" />
              <div className="world-transition__pulse world-transition__pulse--c" />
              <div className="world-transition__scanline world-transition__scanline--one" />
              <div className="world-transition__scanline world-transition__scanline--two" />
            </>
          ) : null}

          {theme.slug === "alliances" ? (
            <>
              <div className="world-transition__diamond" />
              <div className="world-transition__diamond world-transition__diamond--inner" />
              <div className="world-transition__alliance-panel world-transition__alliance-panel--tl" />
              <div className="world-transition__alliance-panel world-transition__alliance-panel--br" />
            </>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
