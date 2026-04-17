"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    let t: number;
    if (progress > displayProgress) {
      t = window.setTimeout(() => {
        setDisplayProgress((p) => Math.min(p + 2, Math.round(progress)));
      }, 8);
    }
    return () => clearTimeout(t);
  }, [progress, displayProgress]);

  useEffect(() => {
    if (displayProgress >= 100) {
      const t = setTimeout(() => setShow(false), 250);
      return () => clearTimeout(t);
    }
  }, [displayProgress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="hud-preloader"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20
          }}
        >
          <div className="hud-preloader-content">
            <p className="hud-preloader-text">RAD Worlds</p>
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
