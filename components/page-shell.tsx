"use client";

import { motion, Variants } from "framer-motion";
import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  background?: "red" | "black";
  heroImage?: string;
  heroType?: string;
  children: ReactNode;
};

const shellVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, ease: "easeOut" } }
};

const textFadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

export function PageShell({
  title,
  eyebrow,
  description,
  background = "black",
  heroImage,
  heroType = "standard",
  children
}: PageShellProps) {
  const heroStyle = heroImage ? { backgroundImage: `url(${heroImage})` } : {};

  return (
    <main className="page-main">
      <section
        className={`page-hero page-hero-${background} page-hero--${heroType}`}
        style={heroStyle}
      >
        <div className="page-overlay" />
        <div className="hero-corner-accents" aria-hidden="true" />

        <div className="page-hero-content">
          <motion.div 
            className="container page-hero-copy"
            variants={shellVariants}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={textFadeUp} className="eyebrow" style={{ color: "var(--red-hi)", fontWeight: 800, letterSpacing: "0.2em", marginBottom: "1rem" }}>
              {eyebrow}
            </motion.p>
            <motion.h1 variants={textFadeUp} className="at-glitch-text" data-text={title}>
              {title}
            </motion.h1>
            <motion.p variants={textFadeUp} className="section-copy page-hero-description" style={{ opacity: 0.8, maxWidth: "800px" }}>
              {description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="page-content">{children}</div>
    </main>
  );
}

