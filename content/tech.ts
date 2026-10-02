import { l, type L } from "@/lib/i18n";

export type TechEntry = {
  /** Nom canonique affiché. */
  name: string;
  /**
   * Variantes rencontrées dans les tableaux `stack` des expériences et
   * projets. Sert à rattacher automatiquement une techno à ses contextes
   * d'usage réels (voir lib/tech-stack.ts).
   */
  aliases?: string[];
  /**
   * Origine hors expérience/projet, quand la techno vient du cursus.
   */
  origin?: L;
};

export type TechGroup = {
  code: string;
  name: L;
  entries: TechEntry[];
};

const CURSUS_42 = l("cursus 1337 / 42", "1337 / 42 curriculum");
const CURSUS_MASTER = l("cursus Master Data Science", "Data Science MSc curriculum");

/**
 * Stack technique — inventaire groupé par catégorie, avec le contexte réel
 * d'utilisation (mission entreprise, projet 1337 ou projet personnel).
 */
export const techGroups: TechGroup[] = [
  {
    code: "TS-01",
    name: l("Langages", "Languages"),
    entries: [
      { name: "Python" },
      { name: "SQL" },
      { name: "C / C++", origin: CURSUS_42 },
      { name: "TypeScript" },
      { name: "Node.js" },
    ],
  },
  {
    code: "TS-02",
    name: l("Machine Learning & IA", "Machine Learning & AI"),
    entries: [
      { name: "PyTorch" },
      { name: "scikit-learn", origin: CURSUS_MASTER },
      { name: "pandas", origin: CURSUS_MASTER },
      { name: "SVD / factorisation matricielle", aliases: ["SVD"] },
      { name: "CycleGAN" },
      { name: "DDPM" },
      { name: "Epsilon-Greedy" },
    ],
  },
  {
    code: "TS-03",
    name: l("NLP & LLM", "NLP & LLM"),
    entries: [
      { name: "spaCy" },
      { name: "Microsoft Presidio", aliases: ["Presidio"] },
      { name: "GLiNER" },
      { name: "SentenceBERT" },
      { name: "Mistral-7B" },
      { name: "RAG" },
      { name: "Wikidata API" },
    ],
  },
  {
    code: "TS-04",
    name: l("Backend & Systèmes", "Backend & Systems"),
    entries: [
      { name: "FastAPI" },
      { name: "Fastify" },
      { name: "Flask" },
      { name: "WebSockets" },
      { name: "Socket.IO" },
      { name: "Celery" },
      { name: "XMPP / JADE" },
    ],
  },
  {
    code: "TS-05",
    name: l("Données & Stockage", "Data & Storage"),
    entries: [
      { name: "PostgreSQL" },
      { name: "Redis" },
      { name: "MongoDB" },
      { name: "SQLite" },
      { name: "Prisma" },
      { name: "ETL" },
    ],
  },
  {
    code: "TS-06",
    name: l("Infra & Déploiement", "Infra & Deployment"),
    entries: [
      { name: "Docker" },
      { name: "NGINX" },
      { name: "Ray" },
      { name: "GPU" },
      { name: "Linux", origin: CURSUS_42 },
      { name: "Git / GitHub", origin: CURSUS_42 },
      { name: "CI/CD", origin: CURSUS_42 },
    ],
  },
];
