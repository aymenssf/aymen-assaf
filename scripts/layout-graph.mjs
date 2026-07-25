/**
 * Précalcule le layout 3D du graphe de connaissances (d3-force-3d)
 * → content/graph-layout.json. Zéro simulation au runtime : le même
 * fichier alimente la scène R3F et le fallback SVG.
 *
 * Usage : node scripts/layout-graph.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
  forceZ,
} from "d3-force-3d";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const graph = JSON.parse(readFileSync(join(root, "content", "graph.json"), "utf8"));

// Ancres spatiales par cluster — garde les 4 familles lisibles dans l'espace.
const ANCHORS = {
  search: [2.6, 1.2, 0.4],
  nlp: [-2.4, 1.4, -0.6],
  infra: [-1.8, -1.8, 0.8],
  data: [2.0, -1.6, -0.9],
};

// Graine déterministe pour un layout reproductible d'un build à l'autre.
let seed = 42;
const rand = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296 - 0.5;
};

const nodes = graph.nodes.map((n) => {
  const [ax, ay, az] = ANCHORS[n.cluster];
  return { ...n, x: ax + rand() * 2, y: ay + rand() * 2, z: az + rand() * 2 };
});
const links = graph.links.map((l) => ({ ...l }));

const sim = forceSimulation(nodes, 3)
  .force("charge", forceManyBody().strength(-1.6))
  .force(
    "link",
    forceLink(links)
      .id((d) => d.id)
      .distance(1.35)
      .strength(0.55),
  )
  .force("center", forceCenter(0, 0, 0))
  .force("collide", forceCollide(0.42))
  .force("ax", forceX((d) => ANCHORS[d.cluster][0]).strength(0.14))
  .force("ay", forceY((d) => ANCHORS[d.cluster][1]).strength(0.14))
  .force("az", forceZ((d) => ANCHORS[d.cluster][2]).strength(0.14))
  .stop();

for (let i = 0; i < 400; i += 1) sim.tick();

// Normalise le nuage dans un rayon cible pour cadrer la caméra de façon stable.
const TARGET_RADIUS = 3.1;
const maxRadius = Math.max(...nodes.map((n) => Math.hypot(n.x, n.y, n.z)));
const scale = TARGET_RADIUS / maxRadius;
for (const n of nodes) {
  n.x *= scale;
  n.y *= scale;
  n.z *= scale;
}

const r3 = (v) => Math.round(v * 1000) / 1000;
const output = {
  nodes: nodes.map((n) => ({ id: n.id, x: r3(n.x), y: r3(n.y), z: r3(n.z) })),
};

writeFileSync(join(root, "content", "graph-layout.json"), JSON.stringify(output, null, 2));
console.log(`layout: ${nodes.length} nœuds, ${links.length} arêtes → content/graph-layout.json`);
