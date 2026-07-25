"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Progression de scroll stylée « ranking » : barre accent en haut
 * + readout mono (position ordonnée / latence de frame réelle).
 */
export function ScrollProgress() {
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, { stiffness: 180, damping: 28, mass: 0.4 });
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    let lastFrame = 0;
    let lastText = 0;
    // Dernière latence inter-frame réellement observée pendant un défilement continu.
    let frameMs = 0;

    const update = () => {
      raf = 0;
      const now = performance.now();
      // Au-delà d'une frame plausible, on sort d'une pause : on réamorce la mesure
      // au lieu d'afficher le temps d'inactivité.
      const since = now - lastFrame;
      if (lastFrame > 0 && since <= 100) frameMs = Math.max(1, Math.round(since));
      lastFrame = now;

      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      progress.set(p);

      if (readout.current && now - lastText > 120) {
        lastText = now;
        const rank = String(Math.round(p * 100)).padStart(3, "0");
        const latency = frameMs > 0 ? ` · Δ${String(frameMs).padStart(2, "0")}ms` : "";
        readout.current.textContent = `RANK ${rank}/100${latency}`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [progress]);

  return (
    <>
      <div aria-hidden className="fixed inset-x-0 top-0 z-[90] h-[2px]">
        <motion.div style={{ scaleX }} className="h-full origin-left bg-accent" />
      </div>
      <span
        ref={readout}
        aria-hidden
        className="watermark fixed right-4 bottom-3 z-[90] hidden md:block"
      />
    </>
  );
}
