import { experiences } from "@/content/experience";
import { projects } from "@/content/projects";
import { schoolProjects } from "@/content/school";
import { techGroups, type TechEntry } from "@/content/tech";
import type { L } from "@/lib/i18n";

export type TechUsage = {
  /**
   * Libellé court du contexte, ex. « INNOVX » ou « PRISM CINE ».
   * Localisé : les titres de projets diffèrent entre FR et EN
   * (« RAG hybride » / « Hybrid RAG »).
   */
  label: L;
  kind: "experience" | "project";
};

/** Normalise pour comparer « XMPP / JADE » et « XMPP/JADE ». */
function key(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "");
}

/** Nom court d'un projet : « PRISM CINE — moteur… » → « PRISM CINE ». */
function shortTitle(title: L): L {
  return {
    fr: title.fr.split("—")[0].trim(),
    en: title.en.split("—")[0].trim(),
  };
}

/**
 * Index techno → contextes d'usage, construit au build depuis les tableaux
 * `stack` déjà déclarés dans les expériences et les projets. La provenance
 * n'est donc jamais saisie deux fois : ajouter une techno à un projet la
 * fait apparaître ici automatiquement.
 */
const usageIndex = new Map<string, TechUsage[]>();

function record(stack: string[], usage: TechUsage) {
  for (const tech of stack) {
    const k = key(tech);
    const list = usageIndex.get(k) ?? [];
    if (!list.some((u) => u.label.en === usage.label.en)) list.push(usage);
    usageIndex.set(k, list);
  }
}

for (const exp of experiences) {
  // Raison sociale : identique dans les deux langues.
  record(exp.stack, { label: { fr: exp.company, en: exp.company }, kind: "experience" });
}
for (const project of projects) {
  record(project.stack, { label: shortTitle(project.title), kind: "project" });
}
for (const project of schoolProjects) {
  record(project.stack, { label: shortTitle(project.title), kind: "project" });
}

/** Contextes réels d'une entrée, en tenant compte de ses alias. */
export function usagesFor(entry: TechEntry): TechUsage[] {
  const names = [entry.name, ...(entry.aliases ?? [])];
  const seen = new Map<string, TechUsage>();
  for (const name of names) {
    for (const usage of usageIndex.get(key(name)) ?? []) {
      seen.set(usage.label.en, usage);
    }
  }
  return [...seen.values()];
}

/** Totaux affichés en en-tête de la section — comptés, jamais estimés. */
export const techTotals = {
  entries: techGroups.reduce((n, g) => n + g.entries.length, 0),
  groups: techGroups.length,
};
