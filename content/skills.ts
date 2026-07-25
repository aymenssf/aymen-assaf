import { l, type L } from "@/lib/i18n";
import type { ClusterId } from "@/lib/store";

export type SkillCluster = {
  id: ClusterId;
  code: string;
  name: L;
  items: L[];
  note: L;
};

/** Compétences (0x04) — organisées par cluster, miroir du graphe WebGL. */
export const skillClusters: SkillCluster[] = [
  {
    id: "search",
    code: "CL-01",
    name: { fr: "Search & Recsys", en: "Search & Recsys" },
    items: [
      l("Systèmes de recommandation", "Recommender systems"),
      l("SVD / factorisation matricielle", "SVD / matrix factorization"),
      l("Filtrage par contenu", "Content-based filtering"),
      l("RAG hybride", "Hybrid RAG"),
      l("SentenceBERT", "SentenceBERT"),
      l("Epsilon-Greedy", "Epsilon-Greedy"),
    ],
    note: {
      fr: "Ranking, retrieval et exploration — du feedback temps réel (<50ms) à la désambiguïsation d'entités.",
      en: "Ranking, retrieval and exploration — from real-time feedback (<50ms) to entity disambiguation.",
    },
  },
  {
    id: "nlp",
    code: "CL-02",
    name: { fr: "NLP & LLM", en: "NLP & LLM" },
    items: [
      l("spaCy", "spaCy"),
      l("Microsoft Presidio", "Microsoft Presidio"),
      l("GLiNER", "GLiNER"),
      l("NER FR/EN", "French/English NER"),
      l("Orchestration LLM multi-fournisseurs", "Multi-provider LLM orchestration"),
      l("Mistral-7B quantifié", "Quantized Mistral-7B"),
    ],
    note: {
      fr: "Pipelines NLP de production : extraction, anonymisation, prompting structuré à sorties JSON validées.",
      en: "Production NLP pipelines: extraction, anonymisation, structured prompting with validated JSON outputs.",
    },
  },
  {
    id: "infra",
    code: "CL-03",
    name: { fr: "Infra distribuée", en: "Distributed infra" },
    items: [
      l("FastAPI", "FastAPI"),
      l("Celery", "Celery"),
      l("Redis", "Redis"),
      l("PostgreSQL", "PostgreSQL"),
      l("Docker", "Docker"),
      l("Ray", "Ray"),
      l("XMPP / JADE", "XMPP / JADE"),
      l("CI/CD", "CI/CD"),
      l("Linux", "Linux"),
      l("C/C++", "C/C++"),
    ],
    note: {
      fr: "Backends asynchrones et orchestration distribuée, déployés derrière NGINX en production.",
      en: "Asynchronous backends and distributed orchestration, deployed behind NGINX in production.",
    },
  },
  {
    id: "data",
    code: "CL-04",
    name: { fr: "Data", en: "Data" },
    items: [
      l("Python", "Python"),
      l("PyTorch", "PyTorch"),
      l("scikit-learn", "scikit-learn"),
      l("pandas", "pandas"),
      l("SQL", "SQL"),
      l("MongoDB", "MongoDB"),
      l("ETL", "ETL"),
      l("Séries temporelles", "Time series"),
      l("CycleGAN / DDPM", "CycleGAN / DDPM"),
    ],
    note: {
      fr: "Du pipeline ETL (−40% de traitements manuels) à la synthèse d'imagerie validée SSIM/FID.",
      en: "From ETL pipelines (−40% manual processing) to imagery synthesis validated with SSIM/FID.",
    },
  },
];
