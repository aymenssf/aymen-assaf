import { l, type L } from "@/lib/i18n";

export type TechEntry = {
  /** Nom canonique affiché. */
  name: string;
  /**
   * Variantes rencontrées dans les tableaux `stack` des expériences et
   * projets. Sert à rattacher automatiquement une techno à ses contextes
   * d'usage réels (voir lib/tech-stack.ts) — la provenance n'est jamais
   * saisie à la main, donc jamais désynchronisée du reste du contenu.
   */
  aliases?: string[];
  /**
   * Origine hors expérience/projet, quand la techno vient du cursus ou
   * des certifications plutôt que d'une mission. Évite d'afficher une
   * provenance vide sans expliquer pourquoi.
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
 * Stack technique (0x05) — inventaire groupé par nature, complémentaire
 * des clusters thématiques : un recruteur qui cherche une techno précise
 * la trouve ici, un ingénieur y lit où elle a réellement servi.
 * Toutes les entrées proviennent du CV, des expériences ou des projets.
 */
export const techGroups: TechGroup[] = [
  {
    code: "TS-01",
    name: l("Langages", "Languages"),
    entries: [
      { name: "Python" },
      { name: "SQL" },
      { name: "C / C++", origin: CURSUS_42 },
      { name: "Node.js" },
    ],
  },
  {
    code: "TS-02",
    name: l("Machine Learning", "Machine Learning"),
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
    name: l("Backend & API", "Backend & API"),
    entries: [
      { name: "FastAPI" },
      { name: "Flask" },
      { name: "Celery" },
      { name: "WebSockets" },
      { name: "XMPP / JADE" },
      { name: "Async" },
    ],
  },
  {
    code: "TS-05",
    name: l("Données & stockage", "Data & storage"),
    entries: [{ name: "PostgreSQL" }, { name: "Redis" }, { name: "MongoDB" }, { name: "ETL" }],
  },
  {
    code: "TS-06",
    name: l("Infra & outillage", "Infra & tooling"),
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
