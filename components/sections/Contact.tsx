"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { contact } from "@/content/contact";

export function Contact() {
  const t = useTranslations("nav");
  const tc = useTranslations("contact");
  // Figé au build : `new Date()` côté client désynchroniserait le HTML statique.
  const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE ?? "";
  const year = buildDate.slice(0, 4) || "2026";

  return (
    <Section id="contact" index="0x05" label={t("contact")} className="pb-10">
      <div className="col-span-4 md:col-span-9 md:col-start-3">
        <Reveal>
          <p className="max-w-2xl text-md leading-normal text-ink md:text-lg">{tc("lead")}</p>
          <p className="label-mono mt-5 text-2xs text-dim">{tc("availability")}</p>
        </Reveal>

        <Reveal index={1}>
          <a
            href={`mailto:${contact.email}`}
            data-cursor="link"
            className="group mt-10 inline-block max-w-full break-all font-mono text-md text-accent underline decoration-accent/30 underline-offset-8 transition-colors hover:decoration-accent md:text-xl"
          >
            {contact.email}
          </a>
        </Reveal>

        <Reveal index={2} className="mt-10 flex flex-wrap gap-4">
          <Magnetic>
            <Button href={`mailto:${contact.email}`} meta="↗">
              {tc("email")}
            </Button>
          </Magnetic>
          <Magnetic>
            <Button href={contact.linkedin} meta="↗">
              LinkedIn
            </Button>
          </Magnetic>
          <Magnetic>
            <Button href={contact.github} meta="↗">
              GitHub
            </Button>
          </Magnetic>
        </Reveal>

        <footer className="mt-24 flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-6">
          <p className="label-mono text-2xs text-faint">
            © {year} Aymen Assaf — {tc("footerRole")}
          </p>
          <p className="watermark">
            build {process.env.NEXT_PUBLIC_COMMIT ?? "dev"} · {buildDate} · 50.9481°N 1.8564°E
          </p>
          <p className="watermark w-full md:w-auto">{tc("colophon")}</p>
        </footer>
      </div>
    </Section>
  );
}
