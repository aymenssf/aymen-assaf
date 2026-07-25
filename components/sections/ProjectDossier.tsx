"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { FlowDiagram } from "@/components/sections/FlowDiagram";
import { ProjectShot } from "@/components/sections/ProjectShot";
import { RepoLink } from "@/components/ui/RepoLink";
import type { Project } from "@/content/projects";
import { pick, type Locale } from "@/lib/i18n";

/**
 * Étude de cas en « dossier système » : rangée fermée type listing de
 * fichiers, ouverture en dépliage terminal (`$ cat …`) — pas de modal.
 */
export function ProjectDossier({
  project,
  position,
  locale,
  defaultOpen = false,
}: {
  project: Project;
  position: string;
  locale: Locale;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const t = useTranslations("projects");
  const contentId = `dossier-${project.id}`;

  return (
    <article className="border border-line transition-colors duration-300 hover:border-faint">
      <button
        type="button"
        data-cursor="link"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full flex-wrap items-baseline gap-x-5 gap-y-1 px-5 py-5 text-left md:px-8"
      >
        <span aria-hidden className="font-mono text-sm text-accent">
          {open ? "[-]" : "[+]"}
        </span>
        <span className="font-mono text-xs text-faint">{project.file}</span>
        <h3 className="min-w-0 flex-1 text-base font-normal text-ink md:text-md">
          {pick(project.title, locale)}
        </h3>
        <span className="label-mono hidden text-2xs text-faint sm:inline">{position}</span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-line px-5 py-7 md:px-8 md:py-9">
              <p aria-hidden className="font-mono text-xs text-faint">
                $ cat {project.file}
              </p>

              <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div>
                  <h4 className="label-mono text-2xs text-accent">{t("problem")}</h4>
                  <p className="measure mt-4 text-sm leading-relaxed text-dim">
                    {pick(project.problem, locale)}
                  </p>
                  <h4 className="label-mono mt-10 text-2xs text-accent">{t("architecture")}</h4>
                  <p className="measure mt-4 text-sm leading-relaxed text-dim">
                    {pick(project.architecture, locale)}
                  </p>
                </div>
                <div className="flex min-w-0 flex-col gap-8 self-center">
                  <FlowDiagram
                    steps={project.diagram.steps}
                    loop={project.diagram.loop ? pick(project.diagram.loop, locale) : undefined}
                    locale={locale}
                  />
                  <ProjectShot visual={project.visual} locale={locale} />
                </div>
              </div>

              <dl className="mt-12 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div key={metric.value}>
                    <dd className="font-mono text-lg text-accent">{metric.value}</dd>
                    <dt className="label-mono mt-2 text-2xs text-faint">
                      {pick(metric.label, locale)}
                    </dt>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                <p className="label-mono text-2xs text-faint">
                  stack :: {project.stack.join(" · ")}
                </p>
                <RepoLink url={project.githubUrl} />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
