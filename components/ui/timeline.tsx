"use client";

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "./cn";
import { EASE_EMPHASIS } from "./motion-tokens";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12, y: 8 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.55, ease: EASE_EMPHASIS }
  }
};

type TimelineProps = Omit<HTMLMotionProps<"ol">, "children"> & {
  children: ReactNode;
};

export function Timeline({ className, children, ...rest }: TimelineProps) {
  const reduced = useReducedMotion();

  return (
    <motion.ol
      variants={reduced ? undefined : containerVariants}
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "relative grid gap-6 pl-6",
        "before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-[color:var(--color-rad)]/60 before:via-white/15 before:to-transparent",
        className
      )}
      {...rest}
    >
      {children}
    </motion.ol>
  );
}

type TimelineItemProps = {
  date: string;
  title: string;
  description?: ReactNode;
  className?: string;
};

export function TimelineItem({ date, title, description, className }: TimelineItemProps) {
  const reduced = useReducedMotion();

  return (
    <motion.li
      variants={reduced ? undefined : itemVariants}
      className={cn("relative pl-4", className)}
    >
      <span
        aria-hidden
        className="absolute -left-[7px] top-1 inline-flex h-3 w-3 items-center justify-center"
      >
        <motion.span
          className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-rad)]/40 blur-[2px]"
          animate={reduced ? undefined : { opacity: [0.6, 0.2, 0.6], scale: [1, 1.8, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-[color:var(--color-rad)] bg-black" />
      </span>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">{date}</p>
      <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl uppercase tracking-normal sm:text-2xl">
        {title}
      </h3>
      {description ? (
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
          {description}
        </p>
      ) : null}
    </motion.li>
  );
}
