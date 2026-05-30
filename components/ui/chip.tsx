"use client";

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "./cn";
import { EASE_EMPHASIS } from "./motion-tokens";

const rowVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } }
};

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: EASE_EMPHASIS }
  }
};

type ChipRowProps = Omit<HTMLMotionProps<"div">, "children"> & { children: ReactNode };
export function ChipRow({ className, children, ...rest }: ChipRowProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      variants={reduced ? undefined : rowVariants}
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-40px" }}
      className={cn("mt-4 flex flex-wrap items-center gap-2", className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type ChipProps = Omit<HTMLMotionProps<"span">, "children"> & { children: ReactNode };
export function Chip({ className, children, ...rest }: ChipProps) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      variants={reduced ? undefined : chipVariants}
      className={cn("rad-tag", className)}
      {...rest}
    >
      {children}
    </motion.span>
  );
}
