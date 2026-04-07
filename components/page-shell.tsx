"use client";

import { motion } from "framer-motion";
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
        {/* Decorative corner element */}
        <div className="hero-corner-accents" aria-hidden="true" />
      </section>

      <section className="page-hero-intro">
        <div className="container page-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="page-hero-copy"
          >
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="eyebrow"
            >
              {eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="section-copy page-hero-description"
            >
              {description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="page-content">{children}</div>
    </main>
  );
}

