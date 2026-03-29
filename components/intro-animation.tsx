"use client";

import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./three-scene";
import { motion, AnimatePresence } from "framer-motion";

export function IntroAnimation() {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    // Phase 1 - Loader sequence
    const t1 = setTimeout(() => setPhase(1), 800);
    // Phase 2 - Background transitions and overlay clears
    const t2 = setTimeout(() => setPhase(2), 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      {/* 3D Canvas stays behind everything */}
      <div 
        className="webgl-canvas-container" 
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1, // Below content (200), above default background
          pointerEvents: phase === 2 ? "auto" : "none",
          background: "#010101"
        }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Intro Overlay sequence */}
      <AnimatePresence>
        {phase < 2 && (
          <motion.div
            key="intro-overlay"
            className="rad-intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          >
            {/* Split panels to open up */}
            <motion.div 
              className="rad-intro__panel rad-intro__panel--l" 
              initial={{ x: "0%" }}
              animate={phase === 1 ? { x: "-100%" } : { x: "0%" }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div 
              className="rad-intro__panel rad-intro__panel--r" 
              initial={{ x: "0%" }}
              animate={phase === 1 ? { x: "100%" } : { x: "0%" }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* Glowing Logo that scales down and fades */}
            <motion.div 
              className="rad-intro__logo-wrap"
              initial={{ x: "-50%", y: "-50%", scale: 0.9, opacity: 0, filter: 'blur(20px)' }}
              animate={
                phase === 0 
                  ? { x: "-50%", y: "-50%", scale: 1, opacity: 1, filter: 'blur(0px)' } 
                  : { x: "-50%", y: "-50%", scale: 1.2, opacity: 0, filter: 'blur(15px)' }
              }
              transition={{ duration: 0.8 }}
              style={{ clipPath: "none" }}
            >
              <img
                src="/assets/RadNewLogoWordmarkWhite.png"
                alt="RAD Esports"
                draggable="false"
                className="rad-intro__logo-img"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
