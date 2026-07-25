"use client";

import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SchoolBadge } from "@/components/sections/SchoolBadge";
import { schoolProjects } from "@/content/school";
import type { Locale } from "@/lib/i18n";

export function SchoolProjects() {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const ts = useTranslations("school");

  return (
    <Section id="school" index="0x03" label={t("school")}>
      <div className="col-span-4 md:col-span-10 md:col-start-3">
        <Reveal>
          <p className="measure text-sm text-dim">{ts("intro")}</p>
        </Reveal>
        <div className="mt-10 space-y-8">
          {schoolProjects.map((project, i) => (
            <Reveal key={project.id} index={i}>
              <SchoolBadge project={project} locale={locale} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
