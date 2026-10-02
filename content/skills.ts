import { l, type L } from "@/lib/i18n";
import type { ClusterId } from "@/lib/store";

export type SkillCluster = {
  id: ClusterId;
  code: string;
  name: L;
  items: L[];
  note: L;
};

/** Compétences — organisées par cluster technique. */
export const skillClusters: SkillCluster[] = [
  {
    id: "search",
    code: "CL-01",
    name: { fr: "Recommandation & Search", en: "RecSys & Search" },
    items: [
      l("Systèmes de recommandation", "Recommender systems"),
      l("SVD / factorisation matricielle", "SVD / matrix factorization"),
      l("Filtrage par contenu", "Content-based filtering"),
      l("RAG hybride", "Hybrid RAG"),
      l("SentenceBERT", "SentenceBERT"),
      l("Epsilon-Greedy", "Epsilon-Greedy"),
    ],
    note: {
      fr: "Modélisation, retrieval et exploration — de l'ingestion temps réel (<50ms) à la désambiguïsation d'entités.",
      en: "Modeling, retrieval, and exploration — from real-time feedback ingestion (<50ms) to semantic disambiguation.",
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
      l("NER bilingue FR/EN", "Bilingual French/English NER"),
      l("Orchestration LLM", "LLM Orchestration"),
      l("Mistral-7B quantifié", "Quantized Mistral-7B"),
    ],
    note: {
      fr: "Pipelines NLP de production : extraction, anonymisation Presidio et orchestration LLM à sorties JSON validées.",
      en: "Production NLP pipelines: extraction, Presidio anonymization, and structured LLM orchestration with validated outputs.",
    },
  },
  {
    id: "infra",
    code: "CL-03",
    name: { fr: "Systèmes & Backend", en: "Systems & Backend" },
    items: [
      l("FastAPI", "FastAPI"),
      l("Fastify", "Fastify"),
      l("WebSockets", "WebSockets"),
      l("Docker", "Docker"),
      l("PostgreSQL / SQLite", "PostgreSQL / SQLite"),
      l("Redis", "Redis"),
      l("Celery", "Celery"),
      l("Ray", "Ray"),
      l("C / C++", "C / C++"),
      l("Linux", "Linux"),
    ],
    note: {
      fr: "Architectures concurrentes, microservices temps réel et conteneurisation déployée sous NGINX.",
      en: "Concurrent architectures, real-time microservices, and containerized deployments behind NGINX.",
    },
  },
  {
    id: "data",
    code: "CL-04",
    name: { fr: "Data & Machine Learning", en: "Data & Machine Learning" },
    items: [
      l("Python", "Python"),
      l("PyTorch", "PyTorch"),
      l("scikit-learn", "scikit-learn"),
      l("pandas", "pandas"),
      l("SQL", "SQL"),
      l("MongoDB", "MongoDB"),
      l("Pipelines ETL", "ETL Pipelines"),
      l("Séries temporelles", "Time series"),
      l("CycleGAN / DDPM", "CycleGAN / DDPM"),
    ],
    note: {
      fr: "Du traitement de données brutes (−40% de charge manuelle) à la synthèse d'images par modèles génératifs.",
      en: "From raw data processing (−40% manual overhead) to image synthesis with generative models.",
    },
  },
];
