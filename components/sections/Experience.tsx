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
        {experiences.map((exp, i) => (
          <Reveal key={exp.id} index={i}>
            <article className="border-t border-line py-12 last:border-b">
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                <h3 className="font-mono text-sm tracking-wide text-accent">{exp.company}</h3>
                <span className="label-mono text-2xs text-faint">
                  {pick(exp.period, locale)} · {pick(exp.place, locale)}
                </span>
              </div>
              <p className="mt-4 text-md text-ink">{pick(exp.role, locale)}</p>
              <ul className="measure mt-8 space-y-4">
                {exp.points.map((point, j) => (
                  <li key={j} className="flex gap-3 text-sm leading-relaxed text-dim">
                    <span aria-hidden className="mt-0.5 text-accent">
                      ▸
                    </span>
                    <span>{pick(point, locale)}</span>
                  </li>
                ))}
              </ul>
              <p className="label-mono mt-8 text-2xs text-faint">
                stack :: {exp.stack.join(" · ")}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
