import { routing } from "@/i18n/routing";

/** URL canonique — surchargeable via NEXT_PUBLIC_SITE_URL (Vercel). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://aymenassaf.vercel.app")
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
