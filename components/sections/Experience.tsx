"use client";

import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { experiences } from "@/content/experience";
import { pick, type Locale } from "@/lib/i18n";

export function Experience() {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");

  return (
    <Section id="experience" index="0x02" label={t("experience")}>
      <div className="col-span-4 md:col-span-9 md:col-start-3">
        <div className="border border-line bg-panel">
          <div className="flex items-center justify-between border-b border-line px-5 py-3.5 md:px-8">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-accent"
              />
              <p className="label-mono text-2xs text-dim">
                {locale === "fr" ? "Parcours en entreprise" : "Work experience"}
              </p>
            </div>
            <span className="label-mono text-2xs text-faint">
              {locale === "fr" ? "3 postes" : "3 roles"}
            </span>
          </div>

          <div className="px-5 py-2 md:px-8">
            {experiences.map((exp, i) => (
              <Reveal key={exp.id} index={i}>
                <article className="border-t border-line/70 py-8 first:border-t-0 md:py-9">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
                    <span className="font-mono text-2xs text-faint">
                      [{pick(exp.period, locale)}]
                    </span>
                    <h3 className="font-mono text-sm tracking-wide text-accent font-medium">
                      {exp.company}
                    </h3>
                    <span className="label-mono ml-auto text-2xs text-faint">
                      {pick(exp.place, locale)}
                    </span>
                  </div>
                  <p className="mt-3 text-md font-medium text-ink">{pick(exp.role, locale)}</p>
                  <ul className="measure mt-5 space-y-3">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed text-dim">
                        <span aria-hidden className="mt-0.5 select-none text-accent">
                          ▸
                        </span>
                        <span>{pick(point, locale)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="label-mono mt-6 text-2xs text-faint">
                    stack :: {exp.stack.join(" · ")}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
