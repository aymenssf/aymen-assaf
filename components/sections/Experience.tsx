"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { experiences } from "@/content/experience";
import { pick, type Locale } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

/** Commande tapée caractère par caractère à l'entrée dans le viewport,
    curseur bloc clignotant en fin de ligne. Purement décoratif (aria-hidden
    au niveau de la ligne) — statique en reduced-motion. */
function TypedCommand({ text }: { text: string }) {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduced) {
      setCount(text.length);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let interval: ReturnType<typeof setInterval>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        let i = 0;
        interval = setInterval(() => {
          i += 1;
          setCount(i);
          if (i >= text.length) clearInterval(interval);
        }, 45);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [reduced, text]);

  return (
    <span ref={ref}>
      {text.slice(0, count)}
      <span className="caret-blink text-accent">▊</span>
    </span>
  );
}

/**
 * Expérience (0x02) en mini-terminal : cadre îlot sombre, commande
 * `$ tail -f experience.log` tapée en direct, entrées horodatées façon
 * sortie de log, prompt en attente en fin de flux. Le contenu reste du
 * texte sémantique — seule la présentation est terminal.
 */
export function Experience() {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");

  return (
    <Section id="experience" index="0x02" label={t("experience")}>
      <div className="col-span-4 md:col-span-9 md:col-start-3">
        <div data-island className="border border-line bg-panel">
          <div className="flex items-center gap-3 border-b border-line px-5 py-3.5 md:px-8">
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-accent motion-safe:animate-pulse"
            />
            <p aria-hidden className="font-mono text-xs text-dim">
              $ <TypedCommand text="tail -f experience.log" />
            </p>
          </div>

          <div className="px-5 py-4 md:px-8">
            {experiences.map((exp, i) => (
              <Reveal key={exp.id} index={i}>
                <article className="border-t border-line/70 py-10 first:border-t-0">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <span className="font-mono text-2xs text-faint">
                      [{pick(exp.period, locale)}]
                    </span>
                    <h3 className="font-mono text-sm tracking-wide text-accent">{exp.company}</h3>
                    <span className="label-mono ml-auto text-2xs text-faint">
                      {pick(exp.place, locale)}
                    </span>
                  </div>
                  <p className="mt-4 text-md text-ink">{pick(exp.role, locale)}</p>
                  <ul className="measure mt-7 space-y-4">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed text-dim">
                        <span aria-hidden className="mt-0.5 text-accent">
                          ▸
                        </span>
                        <span>{pick(point, locale)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="label-mono mt-7 text-2xs text-faint">
                    stack :: {exp.stack.join(" · ")}
                  </p>
                </article>
              </Reveal>
            ))}

            {/* Prompt en attente — le log continue. */}
            <p aria-hidden className="border-t border-line/70 py-4 font-mono text-xs text-faint">
              $ <span className="caret-blink text-accent">▊</span>
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
