import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IndexLabel } from "@/components/ui/IndexLabel";

/**
 * Section one-page à grille asymétrique 12 colonnes.
 * L'index (`0x01`) vit dans les 2 premières colonnes, sticky ;
 * le contenu démarre décalé — jamais centré.
 */
export function Section({
  id,
  index,
  label,
  children,
  className,
  island = false,
}: {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
  /** Îlot sombre : la section reste en tokens sombres quel que soit le thème. */
  island?: boolean;
}) {
  return (
    <section
      id={id}
      data-section={id}
      {...(island ? { "data-island": true } : {})}
      className={cn(
        // Respiration : 64px mobile / 120px+ desktop (règle de densité v2).
        "relative scroll-mt-24 border-t border-line/60 px-gutter py-16 lg:py-30",
        className,
      )}
    >
      <div className="mx-auto grid max-w-[90rem] grid-cols-4 gap-x-4 md:grid-cols-12 md:gap-x-6">
        <div className="col-span-4 mb-10 md:col-span-2 md:mb-0">
          <h2 className="md:sticky md:top-28">
            <IndexLabel index={index}>{label}</IndexLabel>
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
