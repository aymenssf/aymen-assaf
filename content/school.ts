import { l, type L } from "@/lib/i18n";
import type { StaticImageData } from "next/image";
import transcendenceDashboard from "@/public/projects/transcendence-dashboard.png";
import transcendenceAiMatch from "@/public/projects/transcendence-ai-match.png";
import transcendenceTournament from "@/public/projects/transcendence-tournament.png";

export type ProjectMedia = {
  id: string;
  type: "gif" | "image";
  src: StaticImageData | string;
  label: L;
  caption: L;
};

export type SchoolProject = {
  id: string;
  code: string;
  title: L;
  points: L[];
  stack: string[];
  status: "validated" | "wip";
  githubUrl: string;
  media: ProjectMedia[];
};

export const schoolProjects: SchoolProject[] = [
  {
    id: "transcendence",
    code: "1337 / 42",
    title: l(
      "ft_transcendence — plateforme multijoueur temps réel & microservices",
      "ft_transcendence — real-time multiplayer platform & microservices",
    ),
    points: [
      l(
        "Moteur de jeu Pong multijoueur sur WebSockets avec synchronisation d'état serveur, matchmaking 1v1 et tournois à 4 joueurs.",
        "Server-authoritative WebSocket Pong game engine with real-time state synchronization, 1v1 matchmaking, and 4-player tournament brackets.",
      ),
      l(
        "Microservice d'IA adverse (ai-service) avec 3 niveaux de difficulté calibrés sur le temps de réaction et l'anticipation de trajectoire.",
        "Dedicated AI opponent microservice (ai-service) featuring 3 difficulty tiers based on reaction latency and trajectory prediction.",
      ),
      l(
        "Architecture microservices Fastify avec bases SQLite isolées (Prisma), reverse proxy NGINX, authentification OAuth 42 et 2FA.",
        "Fastify microservices architecture with isolated SQLite stores (Prisma), NGINX reverse proxy, 42 OAuth login, and 2FA.",
      ),
      l(
        "Refonte complète de l'interface en React 18, Vite, TypeScript et Tailwind CSS avec chat en direct (Socket.IO) et statut de présence.",
        "Full frontend rewrite in React 18, Vite, TypeScript, and Tailwind CSS with Socket.IO real-time messaging and presence management.",
      ),
    ],
    stack: [
      "Fastify",
      "React 18",
      "TypeScript",
      "WebSockets",
      "Socket.IO",
      "Prisma",
      "Docker",
      "NGINX",
    ],
    status: "validated",
    githubUrl: "https://github.com/aymenssf/ft_transcendence",
    media: [
      {
        id: "gameplay",
        type: "gif",
        src: "/projects/transcendence-gameplay.gif",
        label: l("Gameplay (GIF)", "Gameplay (GIF)"),
        caption: l(
          "Partie multijoueur temps réel sur WebSockets (physique 60 fps)",
          "Real-time multiplayer match over WebSockets (60 fps physics)",
        ),
      },
      {
        id: "dashboard",
        type: "image",
        src: transcendenceDashboard,
        label: l("Dashboard (Photo)", "Dashboard (Photo)"),
        caption: l(
          "Tableau de bord : statistiques, historique des matchs et matchmaking",
          "Player dashboard: stats, match history, and quick matchmaking",
        ),
      },
      {
        id: "ai-match",
        type: "image",
        src: transcendenceAiMatch,
        label: l("Adversaire IA", "AI Opponent"),
        caption: l(
          "Match contre PongBot 3000 (difficulté dynamique)",
          "Match vs. PongBot 3000 (dynamic difficulty engine)",
        ),
      },
      {
        id: "tournament",
        type: "image",
        src: transcendenceTournament,
        label: l("Tournoi", "Tournament"),
        caption: l(
          "Arbre de tournoi à 4 joueurs avec demi-finales en direct",
          "4-player tournament bracket with live semi-finals and final",
        ),
      },
    ],
  },
];
