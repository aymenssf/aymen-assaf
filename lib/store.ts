import { create } from "zustand";
import type Lenis from "lenis";

export type ClusterId = "search" | "nlp" | "infra" | "data";

export type HoveredNode = {
  id: string;
  label: string;
  cluster: ClusterId;
  degree: number;
};

type UIState = {
  /** Instance Lenis partagée (null si reduced-motion ou non montée). */
  lenis: Lenis | null;
  setLenis: (lenis: Lenis | null) => void;
  /** Section visible, pilotée par IntersectionObserver (NavRail). */
  activeSection: string;
  setActiveSection: (id: string) => void;
  /** Cluster de compétences survolé — synchronise la section 0x04 et le graphe WebGL. */
  hoveredCluster: ClusterId | null;
  setHoveredCluster: (c: ClusterId | null) => void;
  /** Nœud du graphe survolé — alimente le readout terminal du hero. */
  hoveredNode: HoveredNode | null;
  setHoveredNode: (n: HoveredNode | null) => void;
  /** Progression de sortie du hero (0→1) — pilote la caméra. Mise à jour transiente. */
  heroProgress: number;
  /** Index hexa de la section ciblée par la navigation — le curseur custom
      se morphe brièvement en indicateur (`at` déduplique les tirs successifs). */
  sectionPulse: { index: string; at: number } | null;
  /** Sons UI opt-in (muet par défaut) — piloté par <SoundToggle/>. */
  soundOn: boolean;
  setSoundOn: (on: boolean) => void;
};

export const useUI = create<UIState>((set) => ({
  lenis: null,
  setLenis: (lenis) => set({ lenis }),
  activeSection: "index",
  setActiveSection: (activeSection) => set({ activeSection }),
  hoveredCluster: null,
  setHoveredCluster: (hoveredCluster) => set({ hoveredCluster }),
  hoveredNode: null,
  setHoveredNode: (hoveredNode) => set({ hoveredNode }),
  heroProgress: 0,
  sectionPulse: null,
  soundOn: false,
  setSoundOn: (soundOn) => set({ soundOn }),
}));

/** Scroll vers une ancre : Lenis si actif, sinon natif (reduced-motion → saut direct). */
export function scrollToSection(id: string, index?: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (index) useUI.setState({ sectionPulse: { index, at: performance.now() } });
  const lenis = useUI.getState().lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: 0 });
  } else {
    el.scrollIntoView();
  }
}
