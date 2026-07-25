"use client";

import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";
import { pick, type Locale } from "@/lib/i18n";

export function About() {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");

  return (
    <Section id="profile" index="0x01" label={t("profile")}>
      <div className="col-span-4 md:col-span-7 md:col-start-3">
        <Reveal>
          <p className="measure text-md text-ink">{pick(profile.summary, locale)}</p>
        </Reveal>

        <div className="mt-20">
          {profile.education.map((entry, i) => (
            <Reveal key={entry.school} index={i}>
              <div className="grid gap-2 border-t border-line py-8 last:border-b md:grid-cols-[10rem_1fr] md:gap-8">
                <span className="label-mono pt-1 text-2xs text-faint">
                  {typeof entry.period === "string" ? entry.period : pick(entry.period, locale)}
                </span>
                <div>
                  <p className="text-base text-ink">{pick(entry.degree, locale)}</p>
                  <p className="mt-1.5 text-sm text-dim">
                    {entry.school} — {pick(entry.place, locale)}
                  </p>
                  {entry.note ? (
                    <p className="mt-2.5 font-mono text-xs text-faint">
                      {pick(entry.note, locale)}
                    </p>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <aside className="col-span-4 mt-16 md:col-span-2 md:col-start-11 md:mt-1">
        <Reveal index={1}>
          <h3 className="label-mono text-2xs text-faint">langues</h3>
          <ul className="mt-4 space-y-2.5">
            {profile.languages.map((lang) => (
              <li key={lang.en} className="font-mono text-xs text-dim">
                {pick(lang, locale)}
              </li>
            ))}
          </ul>
          <h3 className="label-mono mt-10 text-2xs text-faint">certifications</h3>
          <ul className="mt-4 space-y-2.5">
            {profile.certifications.map((cert) => (
              <li key={cert} className="font-mono text-xs text-dim">
                {cert}
              </li>
            ))}
          </ul>
        </Reveal>
      </aside>
    </Section>
  );
}
