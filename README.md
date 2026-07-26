# Portfolio — Aymen Assaf

Portfolio bilingue (FR/EN) de **Aymen Assaf**, Search Machine Learning Engineer & Software Engineer.

Direction artistique : **Knowledge Graph** — le site se parcourt comme un graphe de connaissances,
pas comme un CV en ligne. Les sections sont indexées façon adresses mémoire (`0x00` → `0x06`),
les projets s'ouvrent comme des dossiers système, et le hero rend en WebGL le graphe réel des
compétences (nœuds = technos, arêtes = projets qui les relient). Le portrait y apparaît sous
masque hexagonal, relié au graphe par une arête — un nœud parmi les autres, en couleur réelle
(un traitement duotone testé en cours de route dégradait la reconnaissabilité de la photo).

## Stack

| Couche          | Techno                                      |
| --------------- | ------------------------------------------- |
| Framework       | Next.js 15 (App Router, SSG)                |
| Langage         | TypeScript strict                           |
| Styling         | Tailwind CSS 4 — tokens custom via `@theme` |
| i18n            | next-intl (`/fr`, `/en`, hreflang)          |
| Animation       | Motion (motion.dev)                         |
| Scroll narratif | GSAP + ScrollTrigger                        |
| Smooth scroll   | Lenis                                       |
| 3D              | React Three Fiber + three                   |
| État            | Zustand                                     |
| Typographie     | General Sans (display) · JetBrains Mono     |

## Démarrage

```bash
npm install
npm run dev        # http://localhost:3000 → redirige vers /fr
npm run build      # build de production
npm start
npm run lint
npm run graph      # recalcule le layout 3D du graphe
```

> Le build utilise webpack, pas Turbopack : sur Next 15.5.21 le build Turbopack émettait des
> chunks de développement non minifiés (dont `next-devtools`), coûtant ~40 points de performance
> Lighthouse.

## Architecture

```
app/[locale]/        layout (fonts, chrome, JSON-LD) · page one-page · opengraph-image
components/ui/       primitives : Section, Button, IndexLabel, Cursor, NavRail, ScrollProgress…
components/sections/ Hero, Portrait, About, Experience, SchoolProjects/SchoolBadge,
                     Projects/ProjectDossier, FlowDiagram, ProjectShot, Skills, Contact
components/three/    KnowledgeGraph (Canvas), GraphScene, HeroFallback (SVG)
content/             données typées bilingues extraites du CV + graph.json / graph-layout.json
messages/            chaînes d'interface fr.json / en.json
lib/                 store Zustand, détection WebGL, reduced-motion, tokens i18n, SEO
scripts/             layout-graph.mjs (d3-force-3d, précalcul du graphe)
```

**Contenu** — Tout provient de `CV_Aymen_Assaf_Search_ML.tex`. Les textes structurés (expériences,
projets, compétences) vivent dans `content/` sous forme `{ fr, en }` typée ; seules les chaînes
d'interface passent par `messages/`.

**Graphe** — `scripts/layout-graph.mjs` calcule une fois pour toutes les positions 3D
(d3-force-3d, graine déterministe) dans `content/graph-layout.json`. Aucune simulation au runtime,
et le même fichier alimente la scène WebGL, le fallback SVG et l'image OpenGraph.

## Performance & accessibilité

Lighthouse mobile, testé sur `/fr` et `/en` — audité avec `NEXT_PUBLIC_SITE_URL` aligné sur
l'origine testée, sans quoi l'URL canonique pointe hors origine et le SEO plafonne à 92 en local :

| Locale | Performance | Accessibilité | Bonnes pratiques | SEO | CLS |
| ------ | ----------- | ------------- | ---------------- | --- | --- |
| `/fr`  | 91          | 100           | 100              | 100 | 0   |
| `/en`  | 91          | 100           | 100              | 100 | 0   |

Décisions notables :

- Le Canvas R3F est en `dynamic(..., { ssr: false })` — les ~885 KB de three.js n'entrent jamais
  dans le chargement initial.
- `frameloop="demand"` : le rendu n'est invalidé qu'au scroll, à l'interaction, et par une boucle
  de pulsation ~30 fps active uniquement tant que le hero est visible.
- DPR clampé `[0.6, 1]` sur pointeur grossier ou `deviceMemory ≤ 4`, `[0.75, 1.5]` sinon. Pas de
  postprocessing.
- Sans WebGL — ou avec `?nogl=1` — le hero rend un SVG statique issu du même layout ; three.js
  n'est alors pas téléchargé du tout.
- `prefers-reduced-motion: reduce` désactive Lenis, les boucles GSAP/R3F et le curseur custom ;
  le graphe rend une frame statique.
- Contrastes validés WCAG AA jusqu'aux labels de 10 px.
- Le portrait est rendu par une seule instance dimensionnée en CSS (`aspect-[3/4]`, `sizes`
  responsive) : deux instances masquées téléchargeraient deux images et pénaliseraient le LCP.
- Navigation mobile en barre basse (cibles de 56 px) plutôt qu'un rail desktop comprimé.
- L'image OpenGraph est générée au build depuis le même `graph-layout.json` ; son cadrage est
  dérivé des bornes réelles du layout, donc il suit automatiquement une évolution du graphe.

## Éléments à fournir

Rien n'est inventé : tout élément absent est rendu comme emplacement explicitement étiqueté,
et marqué `// TODO` dans les données.

| Élément                  | Fichier                             | État actuel                         |
| ------------------------ | ----------------------------------- | ----------------------------------- |
| Dépôts PRISM / RAG / GAN | `content/projects.ts` → `githubUrl` | « Repo privé »                      |
| Dépôt Transcendence      | `content/school.ts` → `githubUrl`   | « Repo privé »                      |
| Captures des 4 projets   | `content/*.ts` → `visual`           | Cadre 16/10 « // visuel à fournir » |

Pour brancher un visuel, déposer l'image dans `public/`, puis :

```ts
import shot from "@/public/prism-cine.png"; // import statique = blurDataURL auto
visual: { src: shot, alt: l("Interface PRISM CINE", "PRISM CINE interface") },
```

L'emplacement 16/10 étant déjà réservé, l'ajout d'une capture ne provoque aucun décalage (CLS 0).

## Déploiement

Zéro configuration sur Vercel. Définir `NEXT_PUBLIC_SITE_URL` avec le domaine final pour que
les URLs canoniques, le hreflang et le sitemap pointent au bon endroit.
