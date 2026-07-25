import { l, type L } from "@/lib/i18n";

export type DiagramStep = {
  label: L;
  sub?: L;
  accent?: boolean;
};

export type Project = {
  id: string;
  file: string;
  title: L;
  problem: L;
  architecture: L;
  metrics: { value: string; label: L }[];
  stack: string[];
  diagram: { steps: DiagramStep[]; loop?: L };
};

/** Projets phares (0x03) — post-mortems techniques, données du CV uniquement. */
export const projects: Project[] = [
  {
    id: "prism-cine",
    file: "prism_cine.sys",
    title: l(
      "PRISM CINE — moteur de recommandation hybride distribué",
      "PRISM CINE — distributed hybrid recommendation engine",
    ),
    problem: l(
      "Recommander des films pertinents en croisant signaux collaboratifs et contenu, tout en intégrant les retours utilisateurs en continu — sans réentraînement batch qui fige le système.",
      "Recommend relevant movies by combining collaborative and content signals, while ingesting user feedback continuously — without batch retraining freezing the system.",
    ),
    architecture: l(
      "Factorisation matricielle SVD entraînée par SGD en ligne multi-epoch, combinée à un filtrage par contenu. Orchestration asynchrone distribuée via Ray, exposition Flask, messagerie inter-agents XMPP (JADE), le tout conteneurisé sous Docker. L'exploration est gérée par un algorithme Epsilon-Greedy.",
      "SVD matrix factorization trained with multi-epoch online SGD, combined with content-based filtering. Distributed asynchronous orchestration with Ray, a Flask API surface, XMPP (JADE) inter-agent messaging, all containerized with Docker. Exploration is handled by an Epsilon-Greedy policy.",
    ),
    metrics: [
      { value: "<50 ms", label: l("traitement d'un feedback", "feedback processing") },
      { value: "SGD online", label: l("multi-epoch, sans batch", "multi-epoch, no batch") },
      { value: "ε-greedy", label: l("exploration / exploitation", "explore / exploit") },
    ],
    stack: ["Python", "SVD", "Ray", "Flask", "XMPP / JADE", "Docker"],
    diagram: {
      steps: [
        { label: l("Utilisateurs", "Users"), sub: l("notes + retours", "ratings + feedback") },
        { label: l("XMPP / JADE", "XMPP / JADE"), sub: l("agents", "agents") },
        {
          label: l("Ray", "Ray"),
          sub: l("SVD online · contenu", "online SVD · content"),
          accent: true,
        },
        { label: l("ε-greedy", "ε-greedy"), sub: l("mélange", "blend") },
        { label: l("API Flask", "Flask API"), sub: l("reco servie", "served recs") },
      ],
      loop: l("boucle de feedback <50 ms", "feedback loop <50 ms"),
    },
  },
  {
    id: "rag-humaid",
    file: "rag_humaid.sys",
    title: l(
      "RAG hybride — analyse de données de crise (HumAID)",
      "Hybrid RAG — crisis data analysis (HumAID)",
    ),
    problem: l(
      "Extraire des faits fiables de messages de crise bruités (HumAID) et y répondre sans halluciner — contrainte forte : exécution 100 % locale, pas d'API propriétaire.",
      "Extract reliable facts from noisy crisis messages (HumAID) and answer questions without hallucinating — hard constraint: 100% local execution, no proprietary API.",
    ),
    architecture: l(
      "Extraction d'entités à deux étages (règles métier + GLiNER), désambiguïsation sémantique par Bi-Encoder SentenceBERT couplé à l'API Wikidata, puis génération augmentée par la récupération sur un Mistral-7B quantifié exécuté localement. La factualité est contrainte par le contexte récupéré.",
      "Two-stage entity extraction (business rules + GLiNER), semantic disambiguation with a SentenceBERT bi-encoder paired with the Wikidata API, then retrieval-augmented generation on a locally-run quantized Mistral-7B. Factuality is constrained by the retrieved context.",
    ),
    metrics: [
      { value: "0", label: l("hallucination mesurée", "measured hallucination") },
      { value: "7B", label: l("LLM local quantifié", "local quantized LLM") },
      { value: "2 étages", label: l("règles + GLiNER", "rules + GLiNER") },
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
  },
  {
    id: "satellite-gan",
    file: "satellite_gan.sys",
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
      { value: "SSIM", label: l("cohérence géométrique", "geometric consistency") },
      { value: "FID", label: l("fidélité de distribution", "distribution fidelity") },
      { value: "GAN + DDPM", label: l("pipeline séquentiel GPU", "sequential GPU pipeline") },
    ],
    stack: ["PyTorch", "CycleGAN", "DDPM", "GPU"],
    diagram: {
      steps: [
        { label: l("Domaine source", "Source domain"), sub: l("images satellites", "satellite imagery") },
        { label: l("CycleGAN", "CycleGAN"), sub: l("traduction", "translation") },
        { label: l("DDPM", "DDPM"), sub: l("raffinement", "refinement"), accent: true },
        { label: l("SSIM / FID", "SSIM / FID"), sub: l("validation", "validation") },
        { label: l("Dataset", "Dataset"), sub: l("scénarios simulés", "simulated scenarios") },
      ],
    },
  },
];
