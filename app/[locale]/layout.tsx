import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { generalSans, jetbrainsMono } from "@/app/fonts";
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
  return {
    title: t("title"),
    description: t("description"),
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

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

  return (
    <html lang={locale} className={`${generalSans.variable} ${jetbrainsMono.variable}`}>
      <body>
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
          <main id="main" className="relative z-10 pt-12 lg:pt-0 lg:pl-rail">
            {children}
          </main>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
