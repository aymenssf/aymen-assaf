"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import { useUI } from "@/lib/store";
import { cn } from "@/lib/cn";

/**
 * Curseur custom : point accent + anneau amorti qui s'élargit sur les zones
 * `[data-cursor]`, et se morphe brièvement en indicateur de section (index
 * hexa) lors d'une navigation. Actif uniquement sur pointeur fin, jamais en
 * reduced-motion (le curseur natif reste sinon).
 */
export function Cursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"default" | "link">("default");
  const [pulse, setPulse] = useState<string | null>(null);
  const pulseTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

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

  // Navigation de section : l'anneau devient l'indicateur (0x0N) le temps du scroll.
  useEffect(
    () =>
      useUI.subscribe((state, prev) => {
        if (state.sectionPulse && state.sectionPulse !== prev.sectionPulse) {
          setPulse(state.sectionPulse.index);
          clearTimeout(pulseTimer.current);
          pulseTimer.current = setTimeout(() => setPulse(null), 950);
        }
      }),
    [],
  );
  useEffect(() => () => clearTimeout(pulseTimer.current), []);

  if (!enabled) return null;

  const state = pulse ? "section" : mode;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div style={{ x, y }} className="absolute top-0 left-0">
        <div className="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </motion.div>
      <motion.div style={{ x: ringX, y: ringY }} className="absolute top-0 left-0">
        <motion.div
          animate={state}
          variants={{
            default: { scale: 1 },
            link: { scale: 1.75 },
            section: { scale: 2.6 },
          }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className={cn(
            "size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-200",
            state === "default" ? "border-hairline/70" : "border-accent/90",
          )}
        />
        {/* Étiquette hors du div scalé — le texte reste net. */}
        <motion.span
          animate={{ opacity: pulse ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 font-mono text-2xs tracking-[0.14em] text-accent"
        >
          {pulse}
        </motion.span>
      </motion.div>
    </div>
  );
}
