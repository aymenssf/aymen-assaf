"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { invalidate, useFrame, useThree } from "@react-three/fiber";
import graph from "@/content/graph.json";
import layout from "@/content/graph-layout.json";
import { useUI, type ClusterId, type HoveredNode } from "@/lib/store";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import { ScrollTrigger } from "@/lib/gsap";

type GraphNode = (typeof graph.nodes)[number];

const NODE_BASE = new THREE.Color("#82828a");
/** Les hubs (weight 3) portent l'accent au repos — cohérent avec le fallback SVG. */
const NODE_HUB = new THREE.Color("#b4f461");
const NODE_ACCENT = new THREE.Color("#b4f461");
const NODE_FADE = new THREE.Color("#2c2c31");
const EDGE_BASE = new THREE.Color("#43434d");
const EDGE_ACCENT = new THREE.Color("#9ad152");
const EDGE_FADE = new THREE.Color("#232329");

const CAM_START = new THREE.Vector3(0, 0.25, 9.0);
const CAM_END = new THREE.Vector3(0.32, 0.05, 2.6);
const INTRO_MS = 1300;

const positions = new Map(layout.nodes.map((n) => [n.id, new THREE.Vector3(n.x, n.y, n.z)]));

const adjacency = new Map<string, Set<string>>(graph.nodes.map((n) => [n.id, new Set()]));
for (const link of graph.links) {
  adjacency.get(link.source)?.add(link.target);
  adjacency.get(link.target)?.add(link.source);
}

function nodeScale(node: GraphNode): number {
  return 0.75 + 0.45 * (node.weight - 1);
}

function restColor(node: GraphNode): THREE.Color {
  return node.weight >= 3 ? NODE_HUB : NODE_BASE;
}

/**
 * Scène du graphe de connaissances. `frameloop="demand"` :
 * l'invalidation vient (a) de la boucle de pulsation ~30fps quand le
 * hero est visible, (b) du scroll (caméra), (c) des interactions.
 */
export function GraphScene({ animate }: { animate: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const reduced = usePrefersReducedMotion();
  const camera = useThree((s) => s.camera);
  const hoveredId = useRef<string | null>(null);
  const introStart = useRef<number | null>(null);
  const camTarget = useMemo(() => new THREE.Vector3().copy(CAM_START), []);

  // Géométrie des arêtes : 2 sommets par lien, couleurs par sommet.
  const edgeGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const verts = new Float32Array(graph.links.length * 6);
    const colors = new Float32Array(graph.links.length * 6);
    graph.links.forEach((link, i) => {
      const a = positions.get(link.source)!;
      const b = positions.get(link.target)!;
      verts.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
      colors.set([...EDGE_BASE.toArray(), ...EDGE_BASE.toArray()], i * 6);
    });
    geometry.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, []);

  // Matrices d'instances + couleurs initiales.
  useEffect(() => {
    const inst = mesh.current;
    if (!inst) return;
    const m = new THREE.Matrix4();
    graph.nodes.forEach((node, i) => {
      const p = positions.get(node.id)!;
      const s = nodeScale(node);
      m.makeScale(s, s, s).setPosition(p);
      inst.setMatrixAt(i, m);
      inst.setColorAt(i, restColor(node));
    });
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    introStart.current = reduced ? null : performance.now();
    invalidate();
  }, [reduced]);

  // Recolore nœuds + arêtes selon le nœud survolé ou le cluster actif (section 0x04).
  const applyHighlight = useMemo(() => {
    return (hoverId: string | null, cluster: ClusterId | null) => {
      const inst = mesh.current;
      if (!inst) return;
      const neighbors = hoverId ? adjacency.get(hoverId) : null;
      const inSubgraph = (id: string) =>
        hoverId !== null && (id === hoverId || (neighbors?.has(id) ?? false));

      graph.nodes.forEach((node, i) => {
        let color = restColor(node);
        if (hoverId) color = inSubgraph(node.id) ? NODE_ACCENT : NODE_FADE;
        else if (cluster) color = node.cluster === cluster ? NODE_ACCENT : NODE_FADE;
        inst.setColorAt(i, color);
      });
      if (inst.instanceColor) inst.instanceColor.needsUpdate = true;

      const colorAttr = edgeGeometry.getAttribute("color") as THREE.BufferAttribute;
      graph.links.forEach((link, i) => {
        let color = EDGE_BASE;
        if (hoverId) {
          color = inSubgraph(link.source) && inSubgraph(link.target) ? EDGE_ACCENT : EDGE_FADE;
        } else if (cluster) {
          const a = graph.nodes.find((n) => n.id === link.source)!;
          const b = graph.nodes.find((n) => n.id === link.target)!;
          color = a.cluster === cluster && b.cluster === cluster ? EDGE_ACCENT : EDGE_FADE;
        }
        colorAttr.set([...color.toArray(), ...color.toArray()], i * 6);
      });
      colorAttr.needsUpdate = true;
      invalidate();
    };
  }, [edgeGeometry]);

  // Le hover d'un cluster dans la section Compétences illumine le graphe.
  useEffect(
    () =>
      useUI.subscribe((state, prev) => {
        if (state.hoveredCluster !== prev.hoveredCluster && !hoveredId.current) {
          applyHighlight(null, state.hoveredCluster);
        }
      }),
    [applyHighlight],
  );

  // Caméra liée au scroll de sortie du hero. Déclaré ici (chunk lazy) pour ne pas
  // importer @react-three/fiber dans le bundle initial.
  useEffect(() => {
    const el = document.getElementById("index");
    if (!el || reduced) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        useUI.setState({ heroProgress: self.progress });
        invalidate();
      },
    });
    return () => st.kill();
  }, [reduced]);

  // Boucle d'invalidation ~30fps quand le hero est visible (pulse + intro).
  useEffect(() => {
    if (!animate || reduced) return;
    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last >= 33) {
        last = t;
        invalidate();
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [animate, reduced]);

  useFrame((state, delta) => {
    // Caméra : plongée dans le graphe liée au scroll + parallaxe pointeur.
    const p = useUI.getState().heroProgress;
    const eased = p * p * (3 - 2 * p);
    camTarget.lerpVectors(CAM_START, CAM_END, eased);

    // Un viewport étroit recadre le nuage : on réduit le graphe plutôt que de
    // reculer la caméra, qui le ferait sortir du brouillard.
    if (group.current) {
      const s = THREE.MathUtils.clamp(state.viewport.aspect / 1.55, 0.45, 1);
      group.current.scale.setScalar(s);
    }
    const parallax = reduced ? 0 : 0.35 * (1 - eased);
    camTarget.x += state.pointer.x * parallax;
    camTarget.y += state.pointer.y * parallax * 0.6;
    if (reduced) {
      camera.position.copy(camTarget);
    } else {
      camera.position.lerp(camTarget, 1 - Math.exp(-8 * Math.min(delta, 0.05)));
    }
    camera.lookAt(0, 0, 0);

    if (!reduced) {
      // Respiration des arêtes.
      if (lineMat.current) {
        lineMat.current.opacity = 0.5 + 0.16 * Math.sin(state.clock.elapsedTime * 1.4);
      }
      // Intro : scale global 0 → 1.
      if (introStart.current !== null && mesh.current) {
        const k = Math.min(1, (performance.now() - introStart.current) / INTRO_MS);
        const ease = 1 - Math.pow(1 - k, 3);
        const m = new THREE.Matrix4();
        graph.nodes.forEach((node, i) => {
          const pos = positions.get(node.id)!;
          const s = nodeScale(node) * ease;
          m.makeScale(s, s, s).setPosition(pos);
          mesh.current!.setMatrixAt(i, m);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
        if (k >= 1) introStart.current = null;
      }
    }
  });

  const setHover = (id: string | null) => {
    if (hoveredId.current === id) return;
    hoveredId.current = id;
    let payload: HoveredNode | null = null;
    if (id) {
      const node = graph.nodes.find((n) => n.id === id)!;
      payload = {
        id,
        label: node.label,
        cluster: node.cluster as ClusterId,
        degree: adjacency.get(id)?.size ?? 0,
      };
    }
    useUI.getState().setHoveredNode(payload);
    applyHighlight(id, useUI.getState().hoveredCluster);
  };

  return (
    <group ref={group}>
      <lineSegments geometry={edgeGeometry} frustumCulled={false}>
        <lineBasicMaterial
          ref={lineMat}
          vertexColors
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </lineSegments>
      <instancedMesh
        ref={mesh}
        args={[undefined, undefined, graph.nodes.length]}
        onPointerMove={(e) => {
          e.stopPropagation();
          if (e.instanceId !== undefined) setHover(graph.nodes[e.instanceId].id);
          invalidate();
        }}
        onPointerOut={() => setHover(null)}
      >
        <sphereGeometry args={[0.085, 20, 20]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}
