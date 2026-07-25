"use client";

import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectDossier } from "@/components/sections/ProjectDossier";
import { projects } from "@/content/projects";
import type { Locale } from "@/lib/i18n";

export function Projects() {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const tp = useTranslations("projects");

  return (
    <Section id="projects" index="0x04" label={t("projects")}>
      <div className="col-span-4 md:col-span-10 md:col-start-3">
        <Reveal>
          <p aria-hidden className="font-mono text-xs text-faint">
            $ ls ./case_studies — {tp("hint")}
          </p>
        </Reveal>
        <div className="mt-6 space-y-4">
          {projects.map((project, i) => (
            <Reveal key={project.id} index={i}>
              <ProjectDossier
                project={project}
                position={`CASE ${String(i + 1).padStart(2, "0")}/0${projects.length}`}
                locale={locale}
                defaultOpen={i === 0}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
