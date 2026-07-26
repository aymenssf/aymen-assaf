"use client";

import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ClusterBars } from "@/components/sections/ClusterBars";
import { skillClusters } from "@/content/skills";
import { graphTotals } from "@/lib/graph-stats";
import { pick, type Locale } from "@/lib/i18n";
import { useUI } from "@/lib/store";

/** Mini-motif de sous-graphe — signature visuelle des clusters. */
function NodeMotif() {
  return (
    <svg aria-hidden viewBox="0 0 40 16" className="h-4 w-10">
      <line x1="4" y1="8" x2="20" y2="4" stroke="currentColor" strokeWidth="1" />
      <line x1="20" y1="4" x2="36" y2="11" stroke="currentColor" strokeWidth="1" />
      <circle cx="4" cy="8" r="2.4" fill="currentColor" />
      <circle cx="20" cy="4" r="3.2" fill="currentColor" />
      <circle cx="36" cy="11" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function Skills() {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const ts = useTranslations("skills");
  const setHoveredCluster = useUI((s) => s.setHoveredCluster);

  return (
    <Section id="skills" index="0x05" label={t("skills")}>
      <div className="col-span-4 md:col-span-10 md:col-start-3">
        <Reveal>
          <p aria-hidden className="font-mono text-xs text-faint">
            $ graph --stats — {graphTotals.nodes} {ts("nodes").toLowerCase()} · {graphTotals.links}{" "}
            {ts("links").toLowerCase()}
          </p>
        </Reveal>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          {skillClusters.map((cluster, i) => (
            <Reveal key={cluster.id} index={i} className="h-full">
              <div
                onMouseEnter={() => setHoveredCluster(cluster.id)}
                onMouseLeave={() => setHoveredCluster(null)}
                className="group h-full border border-line p-8 transition-colors duration-300 hover:border-accent/40 md:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="label-mono text-2xs text-faint transition-colors duration-300 group-hover:text-accent">
                    {cluster.code}
                  </span>
                  <span className="text-faint transition-colors duration-300 group-hover:text-accent">
                    <NodeMotif />
                  </span>
                </div>
                <h3 className="mt-6 text-md text-ink">{pick(cluster.name, locale)}</h3>
                <p className="measure mt-4 text-sm text-dim">{pick(cluster.note, locale)}</p>
                <ClusterBars cluster={cluster.id} index={i} />
                <p className="mt-8 font-mono text-xs leading-loose text-dim">
                  {cluster.items.map((item) => pick(item, locale)).join(" · ")}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
