import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <Experience />
      {/* 0x03 Projets — étape 6 */}
      <section
        id="projects"
        data-section="projects"
        className="flex min-h-screen items-center border-t border-line/60 px-gutter"
      >
        <span className="label-mono text-dim">
          <span className="text-accent">0x03</span> — projects
        </span>
      </section>
      <Skills />
      {/* 0x05 Contact — étape 7 */}
      <section
        id="contact"
        data-section="contact"
        className="flex min-h-screen items-center border-t border-line/60 px-gutter"
      >
        <span className="label-mono text-dim">
          <span className="text-accent">0x05</span> — contact
        </span>
      </section>
    </>
  );
}
