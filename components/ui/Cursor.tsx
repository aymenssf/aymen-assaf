"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

/**
 * Curseur custom : point accent + anneau amorti qui s'élargit sur
 * les zones `[data-cursor]`. Actif uniquement sur pointeur fin,
 * jamais en reduced-motion (le curseur natif reste sinon).
 */
export function Cursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"default" | "link">("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.7 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const on = fine && !reduced;
    setEnabled(on);
    document.documentElement.classList.toggle("has-custom-cursor", on);
    if (!on) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target.closest("[data-cursor]") : null;
      setMode(target ? "link" : "default");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div style={{ x, y }} className="absolute top-0 left-0">
        <div className="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </motion.div>
      <motion.div style={{ x: ringX, y: ringY }} className="absolute top-0 left-0">
        <motion.div
          animate={mode}
          variants={{
            default: { scale: 1, borderColor: "rgba(138, 138, 142, 0.55)" },
            link: { scale: 1.75, borderColor: "rgba(180, 244, 97, 0.9)" },
          }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className="size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        />
      </motion.div>
    </div>
  );
}
