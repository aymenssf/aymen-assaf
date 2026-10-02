import graph from "@/content/graph.json";
import layout from "@/content/graph-layout.json";

const projected = new Map(
  layout.nodes.map((n) => [n.id, { x: n.x + n.z * 0.28, y: -(n.y - n.z * 0.14) }]),
);

export function HeroFallback({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const weights = new Map(graph.nodes.map((n) => [n.id, n.weight]));
  const isLight = theme === "light";
  const strokeColor = isLight ? "#c8c8bc" : "#2b2b31";
  const hubColor = isLight ? "#3f7a00" : "#b4f461";
  const nodeColor = isLight ? "#707078" : "#82828a";

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
            stroke={strokeColor}
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
            fill={w >= 3 ? hubColor : nodeColor}
          />
        );
      })}
    </svg>
  );
}
