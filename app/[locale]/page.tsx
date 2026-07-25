import { setRequestLocale } from "next-intl/server";
import { SECTIONS } from "@/lib/sections";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Squelette provisoire — les sections réelles arrivent aux étapes 4-7.
  return (
    <>
      {SECTIONS.map((section) => (
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
