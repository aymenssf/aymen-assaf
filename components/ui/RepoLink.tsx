"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

/** Glyphe GitHub retravaillé en filaire — pas d'icône de librairie brute. */
function RepoGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="none">
      <path
        d="M8 1.6a6.4 6.4 0 0 0-2.02 12.47c.32.06.44-.14.44-.31v-1.2c-1.78.39-2.16-.86-2.16-.86-.29-.74-.71-.94-.71-.94-.58-.4.04-.39.04-.39.64.05.98.66.98.66.57.98 1.5.7 1.87.53.06-.42.22-.7.4-.86-1.42-.16-2.92-.71-2.92-3.17 0-.7.25-1.27.66-1.72-.07-.16-.29-.82.06-1.71 0 0 .54-.17 1.76.66a6.1 6.1 0 0 1 3.2 0c1.22-.83 1.76-.66 1.76-.66.35.89.13 1.55.06 1.71.41.45.66 1.02.66 1.72 0 2.47-1.5 3.01-2.93 3.17.23.2.44.59.44 1.19v1.76c0 .17.12.38.45.31A6.4 6.4 0 0 0 8 1.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Lien vers le dépôt. Sans `url`, affiche « Repo privé » —
 * jamais une URL inventée (règle anti-placeholder).
 */
export function RepoLink({ url, className }: { url?: string; className?: string }) {
  const t = useTranslations("projects");

  if (!url) {
    return (
      <span
        className={cn(
          "label-mono inline-flex items-center gap-2 border border-line px-4 py-2.5 text-2xs text-faint",
          className,
        )}
      >
        <RepoGlyph />
        {t("privateRepo")}
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="link"
      className={cn(
        "label-mono group inline-flex items-center gap-2 border border-line px-4 py-2.5 text-2xs text-dim",
        "transition-colors duration-300 hover:border-accent/50 hover:text-accent focus-visible:border-accent/50 focus-visible:text-accent",
        className,
      )}
    >
      <RepoGlyph />
      {t("viewCode")}
      <span aria-hidden className="text-faint transition-colors group-hover:text-accent">
        ↗
      </span>
    </a>
  );
}
