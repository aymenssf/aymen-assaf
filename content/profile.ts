import type { L } from "@/lib/i18n";

/** Données Profil — Aymen Assaf, Ingénieur Data & IA. */
export const profile = {
  summary: {
    fr: "Étudiant en Master 2 (EILCO) et à 1337 (réseau 42), je conçois des systèmes d'IA et des pipelines de données pensés pour la production. Mon parcours allie modélisation appliquée (systèmes de recommandation, RAG/LLM, vision) et ingénierie logicielle robuste (architectures distribuées, microservices, C/C++ et Python). Je recherche un stage de fin d'études en tant qu'ingénieur Data & IA à partir de janvier 2027.",
    en: "Completing an M2 in Complex Systems Engineering at EILCO alongside 1337 (42 Network). I focus on production AI systems, reliable data pipelines, and distributed backends. My work bridges applied machine learning (recommender systems, RAG/LLMs, computer vision) with solid software engineering (asynchronous services, C/C++, and Python). Looking for a 6-month Data & AI Engineer internship starting January 2027.",
  } satisfies L,
  education: [
    {
      degree: {
        fr: "Master 2 Ingénierie des Systèmes Complexes",
        en: "MSc (M2) in Complex Systems Engineering",
      } satisfies L,
      school: "EILCO — Université du Littoral Côte d'Opale",
      place: { fr: "Calais, France", en: "Calais, France" } satisfies L,
      period: "2026 — 2027",
      note: null,
    },
    {
      degree: {
        fr: "Master Data Science & Analytics",
        en: "MSc in Data Science & Analytics",
      } satisfies L,
      school: "Université Cadi Ayyad",
      place: { fr: "Maroc", en: "Morocco" } satisfies L,
      period: "2024 — 2026",
      note: {
        fr: "Machine Learning, Deep Learning, séries temporelles, optimisation",
        en: "Machine Learning, Deep Learning, time series, optimisation",
      } satisfies L,
    },
    {
      degree: {
        fr: "Ingénierie logicielle — formation par projets",
        en: "Software Engineering — project-based curriculum",
      } satisfies L,
      school: "1337 UM6P (Réseau 42)",
      place: { fr: "Maroc", en: "Morocco" } satisfies L,
      period: { fr: "2023 — présent", en: "2023 — present" } satisfies L,
      note: {
        fr: "Algorithmique, programmation système, C/C++, architectures réseau",
        en: "Algorithms, systems programming, C/C++, network architectures",
      } satisfies L,
    },
  ],
  languages: [
    { fr: "Français — C1", en: "French — C1" },
    { fr: "Anglais — C1 (langue de travail)", en: "English — C1 (working language)" },
    { fr: "Arabe — langue maternelle", en: "Arabic — native" },
  ] satisfies L[],
  certifications: ["Google Advanced Data Analytics (2025)", "ALX Data Science Programme (2024)"],
};
