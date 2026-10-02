import { contact } from "@/content/contact";
import { SITE_URL } from "@/lib/site";

/** JSON-LD Person — améliore la compréhension du profil par les moteurs. */
export function JsonLd({ locale, description }: { locale: string; description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aymen Assaf",
    url: `${SITE_URL}/${locale}`,
    email: `mailto:${contact.email}`,
    jobTitle: "Data & AI Engineer",
    description,
    address: { "@type": "PostalAddress", addressLocality: "Calais", addressCountry: "FR" },
    knowsLanguage: ["fr", "en", "ar"],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "EILCO — Université du Littoral Côte d'Opale" },
      { "@type": "CollegeOrUniversity", name: "Université Cadi Ayyad" },
      { "@type": "CollegeOrUniversity", name: "1337 UM6P (42 Network)" },
    ],
    knowsAbout: [
      "Machine Learning",
      "Data Engineering",
      "Natural Language Processing",
      "Large Language Models",
      "Recommender Systems",
      "Distributed Systems",
    ],
    sameAs: [contact.linkedin, contact.github],
  };

  return (
    <script
      type="application/ld+json"
      // Données statiques construites ici — pas d'entrée utilisateur.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
