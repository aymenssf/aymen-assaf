"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

/**
 * Métrique de dossier en carte de monitoring : valeur réelle (CV) en gros
 * mono, LED de statut, sparkline décorative — déterministe (seed = position),
 * sans axe ni graduation : elle n'affirme aucune série temporelle, la donnée
 * est la valeur affichée.
 */
function sparklinePath(seed: number): string {
  const points: string[] = [];
  for (let i = 0; i < 28; i += 1) {
    const v =
      0.5 +
      0.26 * Math.sin(i * 0.55 + seed * 2.1) +
      0.16 * Math.sin(i * 1.35 + seed * 4.7) +
      0.06 * Math.sin(i * 2.6 + seed * 1.3);
    const x = (i / 27) * 100;
    const y = 4 + (1 - Math.min(1, Math.max(0, v))) * 16;
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return points.join(" ");
}

export function MetricCard({
  label,
  value,
  seed,
  index,
}: {
  label: string;
  value: string;
  /** Graine du motif — varie par projet ET par métrique. */
  seed: number;
  /** Position dans la rangée — cadence l'animation. */
  index: number;
}) {
  // Tracé complet d'emblée en reduced-motion — jamais de sparkline vide.
  const reduced = usePrefersReducedMotion();
  return (
    <div className="border border-line bg-panel p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="label-mono text-2xs text-faint">{label}</p>
        <span
          aria-hidden
          className="size-1.5 shrink-0 rounded-full bg-accent motion-safe:animate-pulse"
        />
      </div>
      <p className="mt-3 font-mono text-lg text-accent">{value}</p>
      <svg aria-hidden viewBox="0 0 100 24" preserveAspectRatio="none" className="mt-4 h-6 w-full">
        <line x1="0" y1="23.5" x2="100" y2="23.5" className="stroke-line" strokeWidth="1" />
        {reduced ? (
          <path
            d={sparklinePath(seed)}
            fill="none"
            className="stroke-accent/70"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
          />
        ) : (
          <motion.path
            d={sparklinePath(seed)}
            fill="none"
            className="stroke-accent/70"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
          />
        )}
      </svg>
    </div>
  );
}
