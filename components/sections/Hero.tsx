"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { HeroFallback } from "@/components/three/HeroFallback";
import { HeroMetrics } from "@/components/sections/HeroMetrics";
import { Portrait } from "@/components/sections/Portrait";
import { supportsWebGL } from "@/lib/webgl";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import { useUI } from "@/lib/store";

const KnowledgeGraph = dynamic(() => import("@/components/three/KnowledgeGraph"), {
  ssr: false,
});

/**
 * Hero « entrée dans le graphe » : composition asymétrique bas-gauche,
 * graphe WebGL en fond (fallback SVG statique sans WebGL / `?nogl=1`),
 * readout terminal du nœud survolé.
 */
export function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("clusters");
  const sectionRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<"pending" | "gl" | "fallback">("pending");
  const [inView, setInView] = useState(true);
  const reduced = usePrefersReducedMotion();
  const hoveredNode = useUI((s) => s.hoveredNode);

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has("nogl");
    setMode(!forced && supportsWebGL() ? "gl" : "fallback");
  }, []);

  // La boucle de pulsation du graphe ne tourne que si le hero est visible.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="index"
      data-section="index"
      data-island
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0">
        {mode === "gl" ? (
          <KnowledgeGraph animate={inView && !reduced} />
        ) : mode === "fallback" ? (
          <HeroFallback />
        ) : null}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-void via-void/70 to-transparent"
        />
      </div>

      <div className="pointer-events-none absolute top-16 right-gutter z-10 hidden text-right md:block lg:top-10">
        <p className="label-mono flex items-center justify-end gap-2 text-2xs text-ink">
          <span
            aria-hidden
            className="inline-block size-1.5 rounded-full bg-accent motion-safe:animate-pulse"
          />
          {t("status")}
        </p>
        <p className="watermark mt-2">{t("location")}</p>
      </div>

      <div className="pointer-events-none relative z-10 px-gutter pb-20 lg:pb-24">
        {/* column-reverse : le portrait passe au-dessus du texte en mobile,
            à sa droite en desktop — sans dupliquer l'image. */}
        <div className="mx-auto flex max-w-[90rem] flex-col-reverse items-start gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <p className="label-mono text-dim">
              <span className="text-accent">0x00</span> — index
            </p>
            <h1 className="mt-6 font-display text-2xl font-medium tracking-tightest text-ink uppercase md:text-3xl xl:text-4xl">
              Aymen Assaf
            </h1>
            <p className="label-mono mt-6 text-accent">{t("role")}</p>
            <p className="measure mt-6 text-sm text-dim md:text-base">{t("tagline")}</p>

            <HeroMetrics />

            {/* Indice réservé au pointeur fin : le survol n'existe pas au toucher. */}
            <p className="label-mono mt-10 min-h-4 text-2xs text-faint">
              {hoveredNode ? (
                <>
                  <span className="text-accent">▸</span> {hoveredNode.label} ::{" "}
                  {tc(hoveredNode.cluster)} · deg({hoveredNode.degree})
                </>
              ) : mode === "gl" ? (
                <span className="hidden lg:inline">{t("nodeHint")}</span>
              ) : null}
            </p>
          </div>

          <Portrait className="shrink-0 lg:mb-8" />
        </div>
      </div>
    </section>
  );
}
