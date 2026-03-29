"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollReveal({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxBackgroundText({ 
  text, 
  speed = 1,
  top = "0%",
  left = "0%"
}: { 
  text: string; 
  speed?: number;
  top?: string;
  left?: string;
}) {
   const ref = useRef(null);
   
   // Track scrolling across the whole window
   const { scrollY } = useScroll();
   
   // Map scroll position to Y offset
   const y = useTransform(scrollY, [0, 3000], [0, -500 * speed]);
   
   return (
     <motion.div 
       ref={ref} 
       style={{ 
         y, 
         position: "absolute", 
         top,
         left,
         zIndex: 0, // Behind content
         opacity: 0.02, 
         fontSize: "18vw", 
         fontWeight: 900, 
         letterSpacing: "-0.04em",
         whiteSpace: "nowrap", 
         pointerEvents: "none", 
         color: "white" 
       }}
     >
       {text}
     </motion.div>
   );
}
