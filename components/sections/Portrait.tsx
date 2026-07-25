"use client";

import Image from "next/image";
import { motion } from "motion/react";
// Duotone précalculé par scripts/duotone-portrait.mjs (LUT calibrée sur
// l'histogramme réel) plutôt qu'un filtre CSS/SVG au runtime : un filtre
// naïf sur cette photo en haute clé faisait basculer toute la veste en
// vert plein, et rendait différemment selon les navigateurs.
import portrait from "@/public/portrait-duotone.jpg";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import { cn } from "@/lib/cn";

/** Hexagone pointe-en-haut — même vocabulaire de forme que les nœuds du graphe. */
const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

/**
 * Portrait duotone (noir profond → vert phosphore) sous masque hexagonal,
 * rattaché au graphe par une arête et un nœud. Dimensions fixes : zéro CLS.
 * En reduced-motion, rendu statique net sans balayage de décodage.
 */
export function Portrait({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    // Une seule instance, dimensionnée en CSS : deux instances masquées
    // téléchargeraient deux images et pénaliseraient le LCP.
    // `aspect-[3/4]` réserve la place aux deux tailles → CLS nul.
    <div className={cn("relative aspect-[3/4] w-[124px] lg:w-[268px]", className)}>
      {/* Arête vers le graphe + nœud d'ancrage */}
      <svg
        aria-hidden
        className="absolute -left-16 top-1/2 hidden h-px w-16 overflow-visible xl:block"
        viewBox="0 0 64 1"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0.5" x2="64" y2="0.5" stroke="#43434d" strokeWidth="1" />
        <circle cx="0" cy="0.5" r="3" fill="#b4f461" />
      </svg>

      <div className="relative size-full" style={{ clipPath: HEX }}>
        <Image
          src={portrait}
          alt="Aymen Assaf"
          fill
          quality={78}
          priority
          placeholder="blur"
          sizes="(max-width: 1023px) 124px, 268px"
          className="object-cover"
        />
        {/* Trame de balayage — évoque un décodage ligne à ligne, pas une photo brute. */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-overlay opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(180,244,97,0.16) 0 1px, transparent 1px 3px)",
          }}
        />
        {!reduced ? (
          <motion.div
            aria-hidden
            initial={{ y: "-110%" }}
            animate={{ y: "110%" }}
            transition={{ duration: 2.6, ease: "easeInOut", delay: 0.6 }}
            className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-accent/25 to-transparent"
          />
        ) : null}
      </div>

      {/* Contour hexagonal accent, tracé par-dessus le masque */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 size-full"
      >
        <polygon
          points="50,0 100,25 100,75 50,100 0,75 0,25"
          fill="none"
          stroke="#b4f461"
          strokeOpacity="0.55"
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <span className="watermark absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        node::aymen_assaf
      </span>
    </div>
  );
}
