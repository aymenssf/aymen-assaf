"use client";

import { useTranslations } from "next-intl";
import { ProjectShot } from "@/components/sections/ProjectShot";
import { RepoLink } from "@/components/ui/RepoLink";
import type { SchoolProject } from "@/content/school";
import { pick, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/**
 * Badge système d'un projet 42 — volontairement plus léger qu'un dossier IA.
 * Contour plein accent si validé, pointillé si en cours. Le badge entier est
 * cliquable dès qu'un dépôt est fourni.
 */
export function SchoolBadge({ project, locale }: { project: SchoolProject; locale: Locale }) {
  const t = useTranslations("projects");
  const validated = project.status === "validated";

  const frame = cn(
    "block border p-8 transition-colors duration-300 md:p-10",
    validated ? "border-accent/55" : "border-dashed border-faint",
  );

  const body = (
    <>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <span className="label-mono text-2xs text-faint">{project.code}</span>
        <span
          className={cn(
            "label-mono inline-flex items-center gap-2 text-2xs",
            validated ? "text-accent" : "text-dim",
          )}
        >
          <span
            aria-hidden
            className={cn("inline-block size-1.5 rounded-full", validated ? "bg-accent" : "bg-dim")}
          />
          {validated ? t("statusValidated") : t("statusWip")}
        </span>
      </div>

      <h3 className="mt-6 text-md text-ink md:text-lg">{pick(project.title, locale)}</h3>

      <ul className="measure mt-8 space-y-4">
        {project.points.map((point, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-dim">
            <span aria-hidden className="mt-0.5 text-accent">
              ▸
            </span>
            <span>{pick(point, locale)}</span>
          </li>
        ))}
      </ul>

      <p className="label-mono mt-8 text-2xs text-faint">stack :: {project.stack.join(" · ")}</p>
    </>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center">
      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className={cn(frame, "hover:border-accent")}
        >
          {body}
          <span className="label-mono mt-8 inline-flex items-center gap-2 text-2xs text-accent">
            {t("viewCode")} <span aria-hidden>↗</span>
          </span>
        </a>
      ) : (
        <div className={frame}>
          {body}
          <RepoLink className="mt-8" />
        </div>
      )}

      <ProjectShot visual={project.visual} locale={locale} />
    </div>
  );
}
