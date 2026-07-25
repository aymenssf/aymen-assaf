"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Désactive les animations Motion pour les utilisateurs en reduced-motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
