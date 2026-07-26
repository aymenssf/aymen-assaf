"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

/**
 * Readout « métriques live » du hero — compteurs qui montent au chargement.
 * Chiffres réels du CV uniquement : 8 détecteurs NER (INNOVX), <50 ms de
 * boucle recsys (PRISM), 0 hallucination mesurée (RAG), −40 % de traitements
 * manuels (ETL). Statique en reduced-motion.
 */
type Tile = {
  id: string;
  target: number;
  /** Départ du tween — 12→0 pour l'hallucination : convergence vers zéro. */
  from?: number;
  format: (n: number) => string;
};

const TILES: Tile[] = [
  { id: "detectors", target: 8, format: (n) => String(n) },
  { id: "latency", target: 50, format: (n) => `<${n}ms` },
  { id: "hallucination", target: 0, from: 12, format: (n) => String(n) },
  { id: "etl", target: 40, format: (n) => `−${n}%` },
];

const DURATION = 1100;
const STAGGER = 140;

export function HeroMetrics() {
  const t = useTranslations("hero.metrics");
  const reduced = usePrefersReducedMotion();
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      let done = true;
      TILES.forEach((tile, i) => {
        const el = refs.current[i];
        if (!el) return;
        const k = Math.min(1, Math.max(0, (now - start - i * STAGGER) / DURATION));
        if (k < 1) done = false;
        const ease = 1 - Math.pow(1 - k, 4);
        const from = tile.from ?? 0;
        el.textContent = tile.format(Math.round(from + (tile.target - from) * ease));
      });
      if (!done) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
      {TILES.map((tile, i) => (
        <div key={tile.id} className="border-l border-line pl-4">
          <dd className="font-mono text-md text-accent">
            <span
              aria-hidden
              ref={(el) => {
                refs.current[i] = el;
              }}
            >
              {reduced ? tile.format(tile.target) : tile.format(tile.from ?? 0)}
            </span>
            <span className="sr-only">{tile.format(tile.target)}</span>
          </dd>
          <dt className="label-mono mt-2 text-2xs text-dim">{t(tile.id)}</dt>
        </div>
      ))}
    </dl>
  );
}
