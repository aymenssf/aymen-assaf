import graph from "@/content/graph.json";
import layout from "@/content/graph-layout.json";

const projected = new Map(
  layout.nodes.map((n) => [n.id, { x: n.x + n.z * 0.28, y: -(n.y - n.z * 0.14) }]),
);

/**
 * Fallback statique du graphe (WebGL indisponible ou forcé via `?nogl=1`) :
 * projection SVG du même layout précalculé — aucune dégradation visible.
 */
export function HeroFallback() {
  const weights = new Map(graph.nodes.map((n) => [n.id, n.weight]));
  return (
    <svg
      aria-hidden
      viewBox="-4.4 -3.4 8.8 6.8"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full opacity-80"
    >
      {graph.links.map((link, i) => {
        const a = projected.get(link.source)!;
        const b = projected.get(link.target)!;
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#2b2b31"
            strokeWidth={0.014}
          />
        );
      })}
      {layout.nodes.map((node) => {
        const p = projected.get(node.id)!;
        const w = weights.get(node.id) ?? 1;
        return (
          <circle
            key={node.id}
            cx={p.x}
            cy={p.y}
            r={0.05 + 0.028 * (w - 1)}
            fill={w >= 3 ? "#b4f461" : "#82828a"}
          />
        );
      })}
    </svg>
  );
}
