import { create } from "zustand";
import type Lenis from "lenis";

export type ClusterId = "search" | "nlp" | "infra" | "data";

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
};

export const useUI = create<UIState>((set) => ({
  lenis: null,
  setLenis: (lenis) => set({ lenis }),
  activeSection: "index",
  setActiveSection: (activeSection) => set({ activeSection }),
  hoveredCluster: null,
  setHoveredCluster: (hoveredCluster) => set({ hoveredCluster }),
}));

/** Scroll vers une ancre : Lenis si actif, sinon natif (reduced-motion → saut direct). */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = useUI.getState().lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: 0 });
  } else {
    el.scrollIntoView();
  }
}
