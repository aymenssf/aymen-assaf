"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import { useUI } from "@/lib/store";

/**
 * Lenis piloté par le ticker GSAP — un seul rAF pour tout le site.
 * Désactivé intégralement en prefers-reduced-motion (scroll natif).
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.115, anchors: false });
    useUI.getState().setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      useUI.getState().setLenis(null);
    };
  }, [reduced]);

  return null;
}
