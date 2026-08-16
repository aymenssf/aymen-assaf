import { l, type L } from "@/lib/i18n";
import type { ProjectVisual } from "@/content/projects";
import transcendenceDashboard from "@/public/projects/transcendence-dashboard.png";

export type SchoolProject = {
  id: string;
  code: string;
  title: L;
  points: L[];
  stack: string[];
  /** `validated` → contour plein accent ; `wip` → contour pointillé. */
  status: "validated" | "wip";
  /** Absent = « Repo privé ». Aucune URL n'est inventée. */
  githubUrl?: string;
  visual?: ProjectVisual;
};

/** Projet 1337 / réseau 42 — badge système, plus léger qu'un dossier IA. */
export const schoolProjects: SchoolProject[] = [
  {
    id: "transcendence",
    code: "42 · CURSUS",
    title: l(
      "Transcendence — moteur backend temps réel",
      "Transcendence — real-time backend engine",
    ),
    points: [
      l(
        "Architecture d'un backend à haute concurrence pour un jeu multijoueur (programmation asynchrone).",
        "High-concurrency backend architecture for a multiplayer game (asynchronous programming).",
      ),
      l(
        "Implémentation de WebSockets pour le temps réel et de SQLite (Prisma) pour la persistance des états.",
        "WebSockets for real-time exchange and SQLite (Prisma) for state persistence.",
      ),
    ],
    stack: ["Fastify", "React", "Vite", "TypeScript", "Socket.IO", "Prisma", "Docker"],
    status: "validated",
    githubUrl: "https://github.com/aymenssf/ft_transcendence",
    visual: {
      src: transcendenceDashboard,
      alt: l(
        "Tableau de bord — statistiques et derniers matchs, ft_transcendence",
        "Dashboard — stats and recent matches, ft_transcendence",
      ),
    },
  },
];
