"use client";

import Image from "next/image";
import portrait from "@/public/portrait.jpg";
import { cn } from "@/lib/cn";

/** Hexagone pointe-en-haut — même vocabulaire de forme que les nœuds du graphe. */
const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

/**
 * Portrait sous masque hexagonal, rattaché au graphe par une arête et un
 * nœud — le cadrage suit le vocabulaire du graphe, la photo reste réelle
 * et lisible (un traitement duotone/scan testé précédemment dégradait la
 * reconnaissabilité et lisait comme un défaut plutôt qu'un style).
 * Dimensions fixes : zéro CLS.
 */
export function Portrait({ className }: { className?: string }) {
  return (
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
          quality={90}
          priority
          placeholder="blur"
          sizes="(max-width: 1023px) 124px, 268px"
          className="object-cover"
        />
        {/* Vignette légère : fond aux bords, sans altérer les couleurs réelles. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            boxShadow: "inset 0 0 42px 6px rgba(10,10,11,0.45)",
          }}
        />
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
