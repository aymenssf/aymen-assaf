import { setRequestLocale } from "next-intl/server";
import { SECTIONS } from "@/lib/sections";
import { Hero } from "@/components/sections/Hero";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Squelette provisoire — les sections restantes arrivent aux étapes 5-7.
  return (
    <>
      <Hero />
      {SECTIONS.filter((s) => s.id !== "index").map((section) => (
        <section
          key={section.id}
          id={section.id}
          data-section={section.id}
          className="flex min-h-screen items-center border-t border-line/60 px-gutter"
        >
          <span className="label-mono text-dim">
            <span className="text-accent">{section.index}</span> — {section.id}
          </span>
        </section>
      ))}
    </>
  );
}
