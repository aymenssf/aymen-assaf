"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { SECTIONS } from "@/lib/sections";
import { playUI } from "@/lib/sound";
import { scrollToSection, useUI } from "@/lib/store";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";

/**
 * Navigation latérale fixe (remplace le header horizontal) :
 * indexes hexadécimaux des sections, monogramme, switch FR/EN,
 * coordonnées GPS en filigrane. Barre haute compacte sur mobile.
 */
export function NavRail() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const active = useUI((s) => s.activeSection);
  const setActive = useUI((s) => s.setActiveSection);

  // Suivi de la section visible — bande centrale de 20% du viewport.
  useEffect(() => {
    const targets = document.querySelectorAll("[data-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive((entry.target as HTMLElement).dataset.section ?? "index");
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [setActive]);

  const otherLocale = locale === "fr" ? "en" : "fr";

  const localeSwitch = (
    <div className="label-mono flex items-center gap-1.5 text-2xs" aria-label={t("ariaLocale")}>
      <span aria-current="true" className="text-accent">
        {locale.toUpperCase()}
      </span>
      <span aria-hidden className="text-faint">
        /
      </span>
      <Link
        href={pathname}
        locale={otherLocale}
        data-cursor="link"
        className="text-dim transition-colors hover:text-ink"
      >
        {otherLocale.toUpperCase()}
      </Link>
    </div>
  );

  // Le nom accessible doit contenir le texte visible ("aa") — d'où le sr-only
  // en complément plutôt qu'un aria-label qui le remplacerait.
  const monogram = (
    <button
      type="button"
      data-cursor="link"
      onClick={() => scrollToSection("index", "0x00")}
      className="font-mono text-sm tracking-tight text-ink transition-colors hover:text-accent"
    >
      aa
      <span aria-hidden className="text-accent">
        ·
      </span>
      <span className="sr-only">Aymen Assaf — {t("top")}</span>
    </button>
  );

  return (
    <>
      {/* Rail desktop */}
      <header className="fixed top-0 bottom-0 left-0 z-40 hidden w-rail flex-col items-center justify-between border-r border-line/60 bg-void/85 py-7 lg:flex">
        {monogram}

        <nav aria-label={t("ariaMain")}>
          <ul className="flex flex-col items-center gap-5">
            {SECTIONS.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id} className="relative">
                  <button
                    type="button"
                    data-cursor="link"
                    onClick={() => {
                      scrollToSection(section.id, section.index);
                      playUI("tick");
                    }}
                    aria-label={t(section.key)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group flex items-center font-mono text-2xs tracking-[0.14em] transition-colors duration-300",
                      isActive ? "text-accent" : "text-faint hover:text-dim",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "mr-2 h-px bg-accent transition-all duration-300",
                        isActive ? "w-3" : "w-0",
                      )}
                    />
                    {section.index}
                    <span
                      aria-hidden
                      className="label-mono pointer-events-none absolute left-full z-50 ml-4 hidden rounded-none border border-line bg-raise px-2.5 py-1.5 text-2xs whitespace-nowrap text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:block"
                    >
                      {t(section.key)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <SoundToggle />
            <ThemeToggle />
          </div>
          {localeSwitch}
          <span aria-hidden className="watermark [writing-mode:vertical-rl]">
            50.9481°N — 1.8564°E
          </span>
        </div>
      </header>

      {/* Mobile : identité en haut, index en barre basse — cibles tactiles pleines,
          jamais un rail desktop comprimé. */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-line/60 bg-void/90 px-5 backdrop-blur-sm lg:hidden">
        {monogram}
        <span aria-hidden className="label-mono text-2xs text-dim">
          {SECTIONS.find((s) => s.id === active)?.index ?? "0x00"} — {t(active)}
        </span>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {localeSwitch}
        </div>
      </header>

      <nav
        aria-label={t("ariaMain")}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line/60 bg-void/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden"
      >
        <ul className="flex items-stretch justify-between px-2">
          {SECTIONS.map((section) => {
            const isActive = active === section.id;
            return (
              <li key={section.id} className="flex-1">
                <button
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex h-14 w-full flex-col items-center justify-center gap-1.5 font-mono text-2xs tracking-[0.1em] transition-colors",
                    isActive ? "text-accent" : "text-faint",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-px w-4 transition-colors",
                      isActive ? "bg-accent" : "bg-transparent",
                    )}
                  />
                  {section.index}
                  <span className="sr-only">{t(section.key)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
