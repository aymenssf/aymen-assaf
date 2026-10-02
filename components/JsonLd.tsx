import { contact } from "@/content/contact";
import { SITE_URL } from "@/lib/site";

/**
 * JSON-LD ProfilePage + Person schema (Google Search Central compliant).
 * Permet à Google d'indexer l'identité, les compétences, les diplômes
 * et les profils sociaux (LinkedIn, GitHub) pour le Knowledge Graph.
 */
export function JsonLd({ locale, description }: { locale: string; description: string }) {
  const pageUrl = `${SITE_URL}/${locale}`;

  const personData = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Aymen Assaf",
    givenName: "Aymen",
    familyName: "Assaf",
    url: pageUrl,
    image: `${SITE_URL}/portrait.jpg`,
    email: `mailto:${contact.email}`,
    jobTitle: "Data & AI Engineer",
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Calais",
      addressRegion: "Hauts-de-France",
      addressCountry: "FR",
    },
    knowsLanguage: [
      { "@type": "Language", name: "French", alternateName: "fr" },
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "Arabic", alternateName: "ar" },
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "EILCO — Université du Littoral Côte d'Opale",
        url: "https://www.eilco-ulco.fr",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Université Cadi Ayyad",
      },
      {
        "@type": "EducationalOrganization",
        name: "1337 Coding School (42 Network)",
        url: "https://1337.ma",
      },
    ],
    knowsAbout: [
      "Data Engineering",
      "Artificial Intelligence",
      "Machine Learning",
      "Recommender Systems",
      "Large Language Models (LLM)",
      "Natural Language Processing (NLP)",
      "Distributed Systems",
      "Python",
      "FastAPI",
      "Fastify",
      "WebSockets",
      "Docker",
      "PyTorch",
    ],
    sameAs: [
      contact.linkedin,
      contact.github,
      "https://github.com/aymenssf/PRISM-CINE",
      "https://github.com/aymenssf/ft_transcendence",
      "https://github.com/aymenssf/SatelliteGAN-Climate-Agriculture",
    ],
  };

  const profilePageData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": pageUrl,
    url: pageUrl,
    name: `Aymen Assaf — ${locale === "fr" ? "Ingénieur Data & IA" : "Data & AI Engineer"}`,
    description,
    inLanguage: locale,
    mainEntity: personData,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageData) }}
    />
  );
}
