"use client";

import { motion } from "framer-motion";

interface CinematicHeroProps {
  title: string;
  eyebrow?: string;
  description?: string;
  videoSrc?: string;
  imageSrc?: string;
  statusText?: string;
}

export function CinematicHero({
  title,
  eyebrow,
  description,
  videoSrc,
  imageSrc,
  statusText = "SYSTEM_READY // 04.12.2026"
}: CinematicHeroProps) {
  return (
    <section className="cinematic-hero">
      {videoSrc ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="cinematic-hero-bg"
          style={{ objectFit: 'cover', opacity: 0.3 }}
        >
          <source src={videoSrc} type="video/video/mp4" />
        </video>
      ) : (
        <div
          className="cinematic-hero-bg"
          style={{ backgroundImage: `url('${imageSrc || "/assets/RadRivals_Wallpaper_Black.png"}')` }}
        />
      )}
      <div className="cinematic-hero-overlay" />
      
      {/* HUD Accents */}
      <div className="absolute top-8 left-8 z-10 hidden md:block">
        <div className="flex items-center gap-4">
          <div className="w-1 h-1 bg-red-600 animate-pulse" />
          <span className="cinematic-mono text-[10px] tracking-[0.3em]">{statusText}</span>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-10 hidden md:block">
        <span className="cinematic-mono text-[10px] tracking-[0.3em]">ENCRYPTED_TRANSMISSION</span>
      </div>

      <div className="cinematic-hero-content">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="cinematic-eyebrow"
        >
          {eyebrow}
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="cinematic-title"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="cinematic-desc"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
