"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { GraphScene } from "@/components/three/GraphScene";

/**
 * Canvas R3F du graphe — importé exclusivement en `dynamic(..., { ssr: false })`
 * depuis le hero. `frameloop="demand"` : aucun rendu hors interaction/pulse.
 * DPR réduit sur mobile / devices à faible mémoire, pas de postprocessing.
 */
export default function KnowledgeGraph({ animate }: { animate: boolean }) {
  const dpr = useMemo<[number, number]>(() => {
    if (typeof window === "undefined") return [0.75, 1.5];
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    return coarse || (memory !== undefined && memory <= 4) ? [0.6, 1] : [0.75, 1.5];
  }, []);

  return (
    <Canvas
      frameloop="demand"
      dpr={dpr}
      camera={{ fov: 42, position: [0, 0.25, 9], near: 0.1, far: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      className="!absolute inset-0"
    >
      <fog attach="fog" args={["#0a0a0b", 7.5, 13.5]} />
      <GraphScene animate={animate} />
    </Canvas>
  );
}
