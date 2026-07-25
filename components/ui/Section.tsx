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
}: {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-section={id}
      className={cn(
        "relative scroll-mt-20 border-t border-line/60 px-gutter py-[clamp(4rem,10vh,8rem)]",
        className,
      )}
    >
      <div className="mx-auto grid max-w-[90rem] grid-cols-4 gap-x-4 md:grid-cols-12 md:gap-x-6">
        <div className="col-span-4 mb-8 md:col-span-2 md:mb-0">
          <div className="md:sticky md:top-24">
            <IndexLabel index={index}>{label}</IndexLabel>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
