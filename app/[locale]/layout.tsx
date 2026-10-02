import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { alternates, SITE_URL } from "@/lib/site";
import { generalSans, jetbrainsMono } from "@/app/fonts";
import { JsonLd } from "@/components/JsonLd";
import { Cursor } from "@/components/ui/Cursor";
import { GridOverlay } from "@/components/ui/GridOverlay";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { NavRail } from "@/components/ui/NavRail";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: `${SITE_URL}/${locale}`, ...alternates() },
    keywords: [
      "Data and AI Engineer",
      "Data Engineer",
      "Machine Learning Engineer",
      "recommender systems",
      "RAG",
      "NLP",
      "Aymen Assaf",
    ],
    authors: [{ name: "Aymen Assaf" }],
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: "Aymen Assaf",
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const viewport: Viewport = {
  themeColor: "#f7f7f2",
};

/* Exécuté avant la première peinture (script inline bloquant) : applique le
   thème persisté sans flash. Le SSR émet data-theme="light" (défaut clair
   du design v3) ; suppressHydrationWarning couvre la divergence éventuelle. */
const THEME_INIT = `try{var t=localStorage.getItem("theme");if(t!=="dark")t="light";var d=document.documentElement;d.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"#0a0a0b":"#f7f7f2")}catch(e){}`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  return (
    <html
      lang={locale}
      data-theme="light"
      suppressHydrationWarning
      className={`${generalSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <JsonLd locale={locale} description={tMeta("description")} />
        <NextIntlClientProvider>
          <MotionProvider>
            <a
              href="#main"
              className="label-mono sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
            >
              {t("skip")}
            </a>
            <GridOverlay />
            <NavRail />
            <ScrollProgress />
            <Cursor />
            <SmoothScroll />
            {/* Marges réservées au bandeau haut et à la barre d'index basse en mobile. */}
            <main id="main" className="relative z-10 pt-14 pb-14 lg:pt-0 lg:pb-0 lg:pl-rail">
              {children}
            </main>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
