import type { StaticImageData } from "next/image";
import { l, type L } from "@/lib/i18n";
import prismCineImage from "@/public/projects/prism-cine.png";
import ragHumaidImage from "@/public/projects/rag-humaid.jpg";
import satelliteGanImage from "@/public/projects/satellite-gan.jpg";

export type DiagramStep = {
  label: L;
  sub?: L;
  accent?: boolean;
};

export type ProjectVisual = {
  src: StaticImageData;
  alt: L;
};

export type Project = {
  id: string;
  file: string;
  tag: L;
  title: L;
  problem: L;
  architecture: L;
  metrics: { value: string; label: L }[];
  stack: string[];
  diagram: { steps: DiagramStep[]; loop?: L };
  githubUrl?: string;
  visual?: ProjectVisual;
};

/** Projets majeurs en Machine Learning & Architectures distribuées */
export const projects: Project[] = [
  {
    id: "prism-cine",
    file: "RecSys",
    tag: l("Système de Recommandation", "Recommender System"),
    title: l(
      "PRISM CINE — moteur de recommandation hybride distribué",
      "PRISM CINE — distributed hybrid recommendation engine",
    ),
    problem: l(
      "Recommander des films pertinents en croisant signaux collaboratifs et contenu, tout en intégrant les retours utilisateurs en continu, sans réentraînement batch.",
      "Recommend relevant movies by combining collaborative and content signals, while ingesting user feedback continuously, without batch retraining.",
    ),
    architecture: l(
      "Factorisation matricielle SVD entraînée par SGD en ligne multi-époques, combinée à un filtrage par contenu. Orchestration asynchrone distribuée via Ray, API Flask, messagerie inter-agents XMPP (JADE), conteneurisé sous Docker. L'exploration est gérée par un algorithme Epsilon-Greedy.",
      "SVD matrix factorization trained with multi-epoch online SGD, combined with content-based filtering. Distributed asynchronous orchestration with Ray, a Flask API surface, XMPP (JADE) inter-agent messaging, all containerized with Docker. Exploration is handled by an Epsilon-Greedy policy.",
    ),
    metrics: [{ value: "<50 ms", label: l("traitement d'un retour", "feedback processing") }],
    stack: ["Python", "SVD", "Epsilon-Greedy", "Ray", "Flask", "XMPP / JADE", "Docker"],
    diagram: {
      steps: [
        { label: l("Utilisateurs", "Users"), sub: l("notes & retours", "ratings & feedback") },
        { label: l("XMPP / JADE", "XMPP / JADE"), sub: l("agents", "agents") },
        {
          label: l("Ray", "Ray"),
          sub: l("SVD online · contenu", "online SVD · content"),
          accent: true,
        },
        { label: l("ε-greedy", "ε-greedy"), sub: l("arbitrage", "blend") },
        { label: l("API Flask", "Flask API"), sub: l("recommandation", "served recs") },
      ],
      loop: l("boucle de retour <50 ms", "feedback loop <50 ms"),
    },
    githubUrl: "https://github.com/aymenssf/PRISM-CINE",
    visual: {
      src: prismCineImage,
      alt: l(
        "Interface web PRISM CINE — recommandations de films et notation en ligne",
        "PRISM CINE web interface — movie recommendations and online rating",
      ),
    },
  },
  {
    id: "rag-humaid",
    file: "NLP / RAG",
    tag: l("Pipeline RAG & NLP", "RAG & NLP Pipeline"),
    title: l(
      "RAG hybride — analyse de données de crise (HumAID)",
      "Hybrid RAG — crisis data analysis (HumAID)",
    ),
    problem: l(
      "Extraire des faits fiables de messages de crise bruités (HumAID) et y répondre sans halluciner, avec une contrainte d'exécution 100 % locale sans dépendance à une API propriétaire.",
      "Extract reliable facts from noisy crisis messages (HumAID) and answer questions with zero hallucination, under a strict 100% local execution constraint without proprietary APIs.",
    ),
    architecture: l(
      "Extraction d'entités à deux étages (règles métier + GLiNER), désambiguïsation sémantique par Bi-Encoder SentenceBERT couplé à l'API Wikidata, puis génération augmentée par récupération sur un Mistral-7B quantifié exécuté en local.",
      "Two-stage entity extraction (business rules + GLiNER), semantic disambiguation with a SentenceBERT bi-encoder paired with the Wikidata API, then retrieval-augmented generation on a locally-run quantized Mistral-7B.",
    ),
    metrics: [
      { value: "0", label: l("hallucination mesurée", "measured hallucination") },
      { value: "7B", label: l("LLM local quantifié", "local quantized LLM") },
      { value: "2", label: l("niveaux d'extraction : règles + GLiNER", "extraction stages: rules + GLiNER") },
    ],
    stack: ["GLiNER", "SentenceBERT", "Wikidata API", "Mistral-7B", "RAG"],
    diagram: {
      steps: [
        { label: l("HumAID", "HumAID"), sub: l("messages de crise", "crisis messages") },
        { label: l("Extraction", "Extraction"), sub: l("règles + GLiNER", "rules + GLiNER") },
        {
          label: l("Désambiguïsation", "Disambiguation"),
          sub: l("SentenceBERT + Wikidata", "SentenceBERT + Wikidata"),
          accent: true,
        },
        { label: l("Récupération", "Retrieval"), sub: l("contexte factuel", "factual context") },
        { label: l("Mistral-7B", "Mistral-7B"), sub: l("local, quantifié", "local, quantized") },
      ],
    },
    visual: {
      src: ragHumaidImage,
      alt: l(
        "Interface HumAID RAG — extraction d'entités GLiNER et synthèse factuelle par LLM local",
        "HumAID RAG interface — GLiNER entity extraction and factual local LLM synthesis",
      ),
    },
  },
  {
    id: "satellite-gan",
    file: "Vision",
    tag: l("Vision & Modèles Génératifs", "Computer Vision & Generative AI"),
    title: l(
      "SatelliteGAN — synthèse d'imagerie spatiale agricole",
      "SatelliteGAN — agricultural satellite imagery synthesis",
    ),
    problem: l(
      "Simuler des scénarios agricoles complexes là où les données réelles manquent : adapter le domaine d'images satellites tout en préservant la cohérence géométrique des parcelles.",
      "Simulate complex agricultural scenarios where real data is scarce: adapt the domain of satellite images while preserving the geometric consistency of field parcels.",
    ),
    architecture: l(
      "Pipeline d'adaptation de domaine combinant CycleGAN (traduction inter-domaines) et modèles de diffusion DDPM (raffinement). Entraînement séquentiel optimisé sur GPU, avec validation quantitative de la fidélité structurelle par SSIM et de la distribution par FID.",
      "Domain-adaptation pipeline combining CycleGAN (cross-domain translation) with DDPM diffusion models (refinement). Sequential GPU training schedule, with quantitative validation of structural fidelity (SSIM) and distribution match (FID).",
    ),
    metrics: [
      { value: "0.91", label: l("similarité structurelle (SSIM)", "structural similarity (SSIM)") },
      { value: "18.5", label: l("score Fréchet Inception (FID)", "Fréchet Inception Distance (FID)") },
    ],
    stack: ["PyTorch", "CycleGAN", "DDPM", "Sentinel-2", "GPU"],
    diagram: {
      steps: [
        {
          label: l("Domaine source", "Source domain"),
          sub: l("images satellites", "satellite imagery"),
        },
        { label: l("CycleGAN", "CycleGAN"), sub: l("traduction", "translation") },
        { label: l("DDPM", "DDPM"), sub: l("raffinement", "refinement"), accent: true },
        { label: l("SSIM / FID", "SSIM / FID"), sub: l("validation", "validation") },
        { label: l("Dataset", "Dataset"), sub: l("scénarios simulés", "simulated scenarios") },
      ],
    },
    githubUrl: "https://github.com/aymenssf/SatelliteGAN-Climate-Agriculture",
    visual: {
      src: satelliteGanImage,
      alt: l(
        "Interface SatelliteGAN — simulation de sécheresse agricole sur imagerie Sentinel-2 par CycleGAN",
        "SatelliteGAN interface — Sentinel-2 agricultural drought simulation via CycleGAN",
      ),
    },
  },
];
