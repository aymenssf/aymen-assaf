import graph from "@/content/graph.json";
import type { ClusterId } from "@/lib/store";

export type ClusterStat = {
  /** Nœuds du cluster dans le graphe de connaissances. */
  nodes: number;
  /** Liens internes au cluster. */
  links: number;
  /** Hubs (weight ≥ 3). */
  hubs: number;
};

/**
 * Statistiques réelles dérivées de graph.json au build — le mini-dashboard
 * de la section compétences visualise le même graphe que le hero WebGL,
 * aucune donnée inventée.
 */
const empty = (): ClusterStat => ({ nodes: 0, links: 0, hubs: 0 });

export const clusterStats: Record<ClusterId, ClusterStat> = {
  search: empty(),
  nlp: empty(),
  infra: empty(),
  data: empty(),
};

const clusterOf = new Map(graph.nodes.map((n) => [n.id, n.cluster as ClusterId]));

for (const node of graph.nodes) {
  const stat = clusterStats[node.cluster as ClusterId];
  stat.nodes += 1;
  if (node.weight >= 3) stat.hubs += 1;
}
for (const link of graph.links) {
  const a = clusterOf.get(link.source);
  const b = clusterOf.get(link.target);
  if (a && a === b) clusterStats[a].links += 1;
}

const all = Object.values(clusterStats);
/** Échelle commune des barres : comparaison honnête entre clusters. */
export const maxClusterStat = {
  nodes: Math.max(...all.map((s) => s.nodes)),
  links: Math.max(...all.map((s) => s.links)),
};

export const graphTotals = { nodes: graph.nodes.length, links: graph.links.length };
