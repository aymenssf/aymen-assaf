import { routing } from "@/i18n/routing";

/** URL canonique principale — domaine personnalisé aymenassaf.me */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aymenassaf.me"
).replace(/\/$/, "");

/** Alternates hreflang pour les deux locales + x-default. */
export function alternates(path = "") {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
  );
  return {
    languages: { ...languages, "x-default": `${SITE_URL}/${routing.defaultLocale}${path}` },
  };
}
