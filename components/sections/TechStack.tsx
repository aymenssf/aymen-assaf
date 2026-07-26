"use client";

import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { techGroups } from "@/content/tech";
import { techTotals, usagesFor } from "@/lib/tech-stack";
import { pick, type Locale } from "@/lib/i18n";

/**
 * Inventaire technique groupé par nature — complément des clusters
 * thématiques : ceux-ci racontent des domaines, celui-ci répond à
 * « quelle techno, et où l'a-t-il réellement utilisée ? ».
 *
 * Aucun niveau de maîtrise auto-évalué : la preuve affichée est la liste
 * des missions et projets où la techno a servi, dérivée des stacks déjà
 * déclarées (lib/tech-stack.ts). Une techno issue du cursus l'indique.
 */
export function TechStack() {
  const locale = useLocale() as Locale;
  const t = useTranslations("tech");

  return (
    <div className="mt-16">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-line pt-10">
          <h3 className="label-mono text-2xs text-accent">{t("title")}</h3>
          <p aria-hidden className="font-mono text-2xs text-faint">
            {techTotals.entries} {t("entries")} · {techTotals.groups} {t("groups")}
          </p>
        </div>
        <p className="measure mt-4 text-sm text-dim">{t("intro")}</p>
      </Reveal>

      <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {techGroups.map((group, i) => (
          <Reveal key={group.code} index={i}>
            <section>
              <div className="flex items-baseline gap-3 border-b border-line pb-3">
                <span className="label-mono text-2xs text-faint">{group.code}</span>
                <h4 className="font-mono text-xs tracking-wide text-ink">
                  {pick(group.name, locale)}
                </h4>
              </div>

              <dl className="mt-4">
                {group.entries.map((entry) => {
                  const usages = usagesFor(entry);
                  return (
                    <div
                      key={entry.name}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b border-line/40 py-2.5 last:border-b-0"
                    >
                      <dt className="font-mono text-xs text-ink">{entry.name}</dt>
                      <dd className="font-mono text-2xs text-faint">
                        {usages.length > 0 ? (
                          <span className="text-dim">
                            {usages.map((u) => pick(u.label, locale)).join(" · ")}
                          </span>
                        ) : entry.origin ? (
                          <span className="italic">{pick(entry.origin, locale)}</span>
                        ) : null}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
