"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { clusterStats, maxClusterStat } from "@/lib/graph-stats";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import type { ClusterId } from "@/lib/store";

/**
 * Mini-dashboard d'un cluster : barres fines animées au scroll, échelle
 * commune à tous les clusters, valeurs réelles issues de graph.json en
 * étiquette directe (la donnée reste lisible sans la barre).
 *
 * L'observation viewport se fait sur le bloc (surface réelle) et se propage
 * aux remplissages par variants : un élément en scaleX(0) n'a pas de surface
 * et peut ne jamais déclencher IntersectionObserver.
 */
function Bar({
  label,
  value,
  max,
  delay,
  reduced,
}: {
  label: string;
  value: number;
  max: number;
  delay: number;
  reduced: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="label-mono w-14 shrink-0 text-2xs text-faint">{label}</span>
      <div className="relative h-1 flex-1 overflow-hidden bg-line/50">
        {reduced ? (
          // Barre statique pleine : l'état final ne dépend jamais d'une
          // animation désactivée.
          <div
            aria-hidden
            style={{ transform: `scaleX(${value / max})` }}
            className="absolute inset-0 origin-left bg-accent"
          />
        ) : (
          <motion.div
            aria-hidden
            variants={{
              hidden: { scaleX: 0 },
              show: {
                scaleX: value / max,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
              },
            }}
            className="absolute inset-0 origin-left bg-accent"
          />
        )}
      </div>
      <span className="w-6 shrink-0 text-right font-mono text-xs text-ink">{value}</span>
    </div>
  );
}

export function ClusterBars({ cluster, index }: { cluster: ClusterId; index: number }) {
  const t = useTranslations("skills");
  const reduced = usePrefersReducedMotion();
  const stat = clusterStats[cluster];

  return (
    <motion.div
      className="mt-8 space-y-2.5"
      {...(reduced
        ? {}
        : {
            initial: "hidden",
            whileInView: "show",
            viewport: { once: true, margin: "-40px" },
          })}
    >
      <Bar
        label={t("nodes")}
        value={stat.nodes}
        max={maxClusterStat.nodes}
        delay={index * 0.08}
        reduced={reduced}
      />
      <Bar
        label={t("links")}
        value={stat.links}
        max={maxClusterStat.links}
        delay={index * 0.08 + 0.12}
        reduced={reduced}
      />
    </motion.div>
  );
}
