import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import graph from "@/content/graph.json";
import layout from "@/content/graph-layout.json";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Aymen Assaf — Search Machine Learning Engineer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** OG image générée au build : projection du même graphe que le hero. */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  const project = (n: { x: number; y: number; z: number }) => ({
    x: 600 + (n.x + n.z * 0.28) * 132,
    y: 315 - (n.y - n.z * 0.14) * 132,
  });
  const points = new Map(layout.nodes.map((n) => [n.id, project(n)]));
  const weights = new Map(graph.nodes.map((n) => [n.id, n.weight]));

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#0a0a0b",
        fontFamily: "monospace",
      }}
    >
      <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 }}>
        {graph.links.map((link, i) => {
          const a = points.get(link.source)!;
          const b = points.get(link.target)!;
          return (
            <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#2b2b31" strokeWidth="1.5" />
          );
        })}
        {layout.nodes.map((n) => {
          const p = points.get(n.id)!;
          const w = weights.get(n.id) ?? 1;
          return (
            <circle
              key={n.id}
              cx={p.x}
              cy={p.y}
              r={5 + 2.5 * (w - 1)}
              fill={w >= 3 ? "#b4f461" : "#82828a"}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px 72px",
          background: "linear-gradient(to top, #0a0a0b 22%, rgba(10,10,11,0.55) 55%, transparent)",
        }}
      >
        <div style={{ display: "flex", color: "#8a8a8e", fontSize: 22, letterSpacing: 4 }}>
          <span style={{ color: "#b4f461" }}>0x00</span>
          <span style={{ marginLeft: 12 }}>— INDEX</span>
        </div>
        <div
          style={{
            display: "flex",
            color: "#f4f4f0",
            fontSize: 96,
            fontWeight: 600,
            letterSpacing: -3,
            marginTop: 18,
          }}
        >
          AYMEN ASSAF
        </div>
        <div style={{ display: "flex", color: "#b4f461", fontSize: 26, marginTop: 20 }}>
          {t("role")}
        </div>
        <div style={{ display: "flex", color: "#8a8a8e", fontSize: 22, marginTop: 14 }}>
          {t("status")} · {t("location")}
        </div>
      </div>
    </div>,
    size,
  );
}
