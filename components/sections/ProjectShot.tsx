"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ProjectVisual } from "@/content/projects";
import { pick, type Locale } from "@/lib/i18n";

export function ProjectShot({
  visual,
  locale,
  href,
}: {
  visual?: ProjectVisual;
  locale: Locale;
  href?: string;
}) {
  const t = useTranslations("projects");

  const figure = (
    <figure className="group relative aspect-[16/10] w-full overflow-hidden border border-line bg-panel">
      {visual ? (
        <>
          <Image
            src={visual.src}
            alt={pick(visual.alt, locale)}
            fill
            quality={85}
            placeholder="blur"
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {href && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--s-line) 1px, transparent 1px), linear-gradient(to bottom, var(--s-line) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
          <span className="label-mono relative text-2xs text-faint">{t("visualPending")}</span>
        </div>
      )}
    </figure>
  );

  if (href && visual) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="link"
        className="block cursor-pointer"
        title={visual ? pick(visual.alt, locale) : undefined}
      >
        {figure}
      </a>
    );
  }

  return figure;
}
