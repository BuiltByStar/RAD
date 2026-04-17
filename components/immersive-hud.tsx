"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { WorldTransitionOverlay } from "./world-transition-overlay";

interface ImmersiveHudProps {
  activeIndex: number;
  totalWorlds: number;
  onSelect?: (index: number) => void;
}

export function ImmersiveHud({ activeIndex, totalWorlds, onSelect }: ImmersiveHudProps) {
  const router = useRouter();
  const [transitioningWorld, setTransitioningWorld] = useState<number | null>(null);

  const worlds = useMemo(
    () => [
      { title: "THE CORE", subtitle: "Organization & Culture", action: "About RAD", href: "/about" },
      { title: "VANGUARD", subtitle: "Elite Esports Rosters", action: "View Roster", href: "/roster" },
      { title: "MEDIA", subtitle: "Content & Broadcasts", action: "Watch Content", href: "/content" },
      { title: "ALLIANCES", subtitle: "Partners & Activations", action: "Connect", href: "/contact" }
    ],
    []
  );

  const availableWorlds = worlds.slice(0, totalWorlds);
  const currentWorld = availableWorlds[activeIndex] || availableWorlds[0];

  useEffect(() => {
    availableWorlds.forEach((world) => router.prefetch(world.href));
  }, [router, availableWorlds]);

  function handleWorldEnter() {
    if (transitioningWorld !== null) return;
    setTransitioningWorld(activeIndex);
    window.setTimeout(() => {
      router.push(currentWorld.href);
    }, 650);
  }

  return (
    <div className="hud-overlay">
      <WorldTransitionOverlay worldIndex={transitioningWorld} />

      {/* Instructional hint — bottom-left */}
      <div className="hud-instructions">
        <span>← →</span>
        <br />
        <span className="hud-instructions-sub">to navigate</span>
      </div>

      {/* Center-left: Active World Info */}
      <div className="hud-info">
        <motion.p
          key={`sub-${activeIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="hud-kicker"
        >
          {currentWorld.subtitle}
        </motion.p>

        <motion.h2
          key={`title-${activeIndex}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="hud-title"
        >
          {currentWorld.title}
        </motion.h2>

        <motion.div
          key={`btn-${activeIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <button
            type="button"
            className={`btn btn-primary hud-action ${transitioningWorld !== null ? "hud-action--locked" : ""}`}
            onClick={handleWorldEnter}
            disabled={transitioningWorld !== null}
          >
            <span>{currentWorld.action}</span>
            <span className="hud-action__arrow" aria-hidden="true">
              →
            </span>
          </button>
        </motion.div>
      </div>

      {/* Bottom pagination — now clickable */}
      <div className="hud-pagination">
        {availableWorlds.map((w, idx) => (
          <button
            key={w.title}
            type="button"
            aria-label={`Jump to ${w.title}`}
            aria-current={idx === activeIndex}
            onClick={() => onSelect?.(idx)}
            className={`hud-dot ${idx === activeIndex ? "hud-dot-active" : ""}`}
            style={{
              pointerEvents: "auto",
              background: "transparent",
              border: 0,
              padding: 0,
              cursor: "pointer"
            }}
          />
        ))}
      </div>
    </div>
  );
}
