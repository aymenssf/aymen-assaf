"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { GraphScene } from "@/components/three/GraphScene";

export default function KnowledgeGraph({
  animate,
  theme = "dark",
}: {
  animate: boolean;
  theme?: "light" | "dark";
}) {
  const dpr = useMemo<[number, number]>(() => {
    if (typeof window === "undefined") return [0.75, 1.5];
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    return coarse || (memory !== undefined && memory <= 4) ? [0.6, 1] : [0.75, 1.5];
  }, []);

  const fogColor = theme === "light" ? "#f7f7f2" : "#0a0a0b";

  return (
    <Canvas
      frameloop="demand"
      dpr={dpr}
      camera={{ fov: 42, position: [0, 0.25, 9], near: 0.1, far: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      className="!absolute inset-0"
    >
      <fog attach="fog" args={[fogColor, 7.5, 13.5]} />
      <GraphScene animate={animate} theme={theme} />
    </Canvas>
  );
}
