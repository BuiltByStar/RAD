"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const { progress, active } = useProgress();
  const [show, setShow] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smooth out the progress display
  useEffect(() => {
    let t: number;
    if (progress > displayProgress) {
      t = window.setTimeout(() => {
        setDisplayProgress((p) => Math.min(p + 1, Math.round(progress)));
      }, 10);
    }
    return () => clearTimeout(t);
  }, [progress, displayProgress]);

  // Hide the preloader only when 100% loaded and we wait a split second
  useEffect(() => {
    if (displayProgress >= 100) {
      const t = setTimeout(() => setShow(false), 800);
      return () => clearTimeout(t);
    }
  }, [displayProgress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="hud-preloader"
        >
          <div className="hud-preloader-content">
            <p className="hud-preloader-text">RAD Presents</p>
            <div className="hud-preloader-perc">{displayProgress}%</div>
            <div className="hud-preloader-bar-wrap">
              <motion.div
                className="hud-preloader-bar"
                initial={{ width: 0 }}
                animate={{ width: `${displayProgress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
