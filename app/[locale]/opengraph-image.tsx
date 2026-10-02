import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import graph from "@/content/graph.json";
import layout from "@/content/graph-layout.json";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Aymen Assaf — Data & AI Engineer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Cadrage dérivé des bornes réelles du layout (et non de constantes à la main) :
 * le graphe est ajusté en largeur dans la moitié droite, le texte occupant
 * le bas-gauche sous le dégradé.
 */
const FLAT = layout.nodes.map((n) => ({
  id: n.id,
  x: n.x + n.z * 0.28,
  y: -(n.y - n.z * 0.14),
}));
const BOUNDS = {
  minX: Math.min(...FLAT.map((n) => n.x)),
  maxX: Math.max(...FLAT.map((n) => n.x)),
  minY: Math.min(...FLAT.map((n) => n.y)),
  maxY: Math.max(...FLAT.map((n) => n.y)),
};
/** Moitié droite du cadre : le graphe y tient en entier, sans rognage. */
const BOX = { x: 566, y: 52, w: 586, h: 526 };
const SCALE = Math.min(BOX.w / (BOUNDS.maxX - BOUNDS.minX), BOX.h / (BOUNDS.maxY - BOUNDS.minY));
const CENTER = {
  x: (BOUNDS.minX + BOUNDS.maxX) / 2,
  y: (BOUNDS.minY + BOUNDS.maxY) / 2,
};

const points = new Map(
  FLAT.map((n) => [
    n.id,
    {
      x: BOX.x + BOX.w / 2 + (n.x - CENTER.x) * SCALE,
      y: BOX.y + BOX.h / 2 + (n.y - CENTER.y) * SCALE,
    },
  ]),
);

/** OG image générée au build : projection du même graphe que le hero. */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

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
            <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#43434d" strokeWidth="1.5" />
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
      {/* Voile latéral : le texte reste lisible à gauche, le graphe s'estompe vers lui. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          // Satori ne dérive pas la hauteur de `inset` : sans dimensions
          // explicites, `justifyContent` reste sans effet.
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 72px",
          background:
            "linear-gradient(to right, #0a0a0b 38%, rgba(10,10,11,0.82) 52%, rgba(10,10,11,0) 76%)",
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
