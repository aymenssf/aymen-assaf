"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ProjectVisual } from "@/content/projects";
import { pick, type Locale } from "@/lib/i18n";

/**
 * Emplacement du visuel de projet, ratio 16/10 réservé dans tous les cas :
 * l'arrivée d'une capture ne déplace donc aucun contenu (CLS nul).
 * Sans image fournie, on rend un cadre de composition identique, explicitement
 * étiqueté — jamais une image inventée.
 */
export function ProjectShot({ visual, locale }: { visual?: ProjectVisual; locale: Locale }) {
  const t = useTranslations("projects");

  return (
    <figure className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-panel">
      {visual ? (
        <Image
          src={visual.src}
          alt={pick(visual.alt, locale)}
          fill
          quality={78}
          placeholder="blur"
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          {/* Trame de fond : même vocabulaire que le graphe, aucune image simulée. */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(to right, #232326 1px, transparent 1px), linear-gradient(to bottom, #232326 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
          <span className="label-mono relative text-2xs text-faint">{t("visualPending")}</span>
        </div>
      )}
    </figure>
  );
}
