import type { L } from "@/lib/i18n";

export type Experience = {
  id: string;
  company: string;
  role: L;
  place: L;
  period: L;
  points: L[];
  stack: string[];
};

/** Expérience professionnelle (0x02) — extraite du CV. */
export const experiences: Experience[] = [
  {
    id: "innovx",
    company: "INNOVX",
    role: { fr: "Stagiaire Data Scientist / IA", en: "Data Science / AI Intern" },
    place: { fr: "Casablanca, Maroc", en: "Casablanca, Morocco" },
    period: { fr: "Février — Août 2026", en: "February — August 2026" },
    points: [
      {
        fr: "Conception et développement d'une plateforme d'analyse et d'anonymisation de contrats industriels reposant sur des LLM, déployée en environnement de production (Docker, NGINX).",
        en: "Designed and built an LLM-based platform for analysing and anonymising industrial contracts, deployed to a production environment (Docker, NGINX).",
      },
      {
        fr: "Construction du pipeline NLP complet : extraction de texte PDF, reconnaissance d'entités nommées bilingue français/anglais (spaCy, Microsoft Presidio) et développement de 8 détecteurs d'entités métier spécifiques.",
        en: "Built the full NLP pipeline: PDF text extraction, bilingual French/English named-entity recognition (spaCy, Microsoft Presidio) and 8 custom business-entity detectors.",
      },
      {
        fr: "Développement d'une couche d'orchestration LLM multi-fournisseurs (prompting structuré, sorties JSON validées) et d'un backend asynchrone Python (FastAPI, Celery, Redis, PostgreSQL).",
        en: "Developed a multi-provider LLM orchestration layer (structured prompting, validated JSON outputs) and an asynchronous Python backend (FastAPI, Celery, Redis, PostgreSQL).",
      },
    ],
    stack: ["spaCy", "Presidio", "FastAPI", "Celery", "Redis", "PostgreSQL", "Docker", "NGINX"],
  },
  {
    id: "grif",
    company: "Grif Center GATechno",
    role: { fr: "Stagiaire Data Engineer", en: "Data Engineering Intern" },
    place: { fr: "Safi, Maroc", en: "Safi, Morocco" },
    period: { fr: "Septembre 2023 — Avril 2024", en: "September 2023 — April 2024" },
    points: [
      {
        fr: "Conception de pipelines ETL automatisés (Node.js, SQL) réduisant d'environ 40 % les traitements manuels.",
        en: "Designed automated ETL pipelines (Node.js, SQL) cutting manual processing by about 40%.",
      },
      {
        fr: "Modélisation de données et construction de tableaux de bord décisionnels pour le suivi d'activité.",
        en: "Modelled data and built decision dashboards for activity monitoring.",
      },
    ],
    stack: ["Node.js", "SQL", "ETL"],
  },
  {
    id: "sadelec",
    company: "SADELEC",
    role: {
      fr: "Stagiaire Data Industriel — IoT & séries temporelles",
      en: "Industrial Data Intern — IoT & time series",
    },
    place: { fr: "Grenoble, France", en: "Grenoble, France" },
    period: { fr: "Mai — Août 2023", en: "May — August 2023" },
    points: [
      {
        fr: "Traitement de données de capteurs industriels, structuration de logs sous MongoDB et automatisation de rapports d'analyse en Python.",
        en: "Processed industrial sensor data, structured logs in MongoDB and automated analysis reports in Python.",
      },
    ],
    stack: ["Python", "MongoDB"],
  },
];
