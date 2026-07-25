import type { L } from "@/lib/i18n";

/** Données Profil (0x01) — extraites du CV, seule source de vérité. */
export const profile = {
  summary: {
    fr: "Étudiant en Master 2 Ingénierie des Systèmes Complexes à l'EILCO et étudiant actif à 1337. Profil technique spécialisé en ingénierie logicielle et Machine Learning appliqué, avec une expérience de déploiement d'architectures distribuées et de systèmes d'IA en production. Recherche un stage orienté ingénierie — Search Machine Learning Engineer — pour concevoir et optimiser des moteurs de recherche et des systèmes de recommandation à fort impact métier.",
    en: "Final-year student in Complex Systems Engineering (M2) at EILCO and active student at 1337. Engineering-focused profile specialised in software engineering and applied Machine Learning, with hands-on experience deploying distributed architectures and AI systems to production. Looking for an engineering internship — Search Machine Learning Engineer — to design and optimise search engines and recommender systems with real business impact.",
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
        fr: "Ingénierie logicielle — pédagogie par projets",
        en: "Software engineering — project-based curriculum",
      } satisfies L,
      school: "1337 UM6P (Réseau 42)",
      place: { fr: "Maroc", en: "Morocco" } satisfies L,
      period: { fr: "2023 — présent", en: "2023 — present" } satisfies L,
      note: {
        fr: "Algorithmique, programmation système, C/C++",
        en: "Algorithms, systems programming, C/C++",
      } satisfies L,
    },
  ],
  languages: [
    { fr: "Français — C1", en: "French — C1" },
    { fr: "Anglais — C1, langue de travail", en: "English — C1, working language" },
    { fr: "Arabe — natif", en: "Arabic — native" },
  ] satisfies L[],
  certifications: ["Google Advanced Data Analytics (2025)", "ALX Data Science Programme (2024)"],
};
