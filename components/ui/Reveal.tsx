"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Révélation « ligne de log » : glissement horizontal court + opacité,
 * cadencé par l'index — évoque une sortie de terminal, pas un fade-in-up.
 */
export function Reveal({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
