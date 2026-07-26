"use client";

import { useUI } from "@/lib/store";
import { prefersReducedMotion } from "@/lib/reduced-motion";

/**
 * Sons UI générés en WebAudio (aucun asset, aucun poids réseau) :
 * blips courts à très bas volume, façon télémétrie. Opt-in strict —
 * muet par défaut, jamais sur pointeur grossier ni en reduced-motion.
 */
export type UISound = "tick" | "open" | "close" | "confirm";

let ctx: AudioContext | null = null;

/** Le toggle n'est proposé que là où le son a du sens (desktop, motion OK). */
export function soundAvailable(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !prefersReducedMotion()
  );
}

function blip(time: number, freq: number, duration: number, peak: number) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, time);
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(peak, time + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(time);
  osc.stop(time + duration + 0.02);
}

export function playUI(kind: UISound) {
  if (!useUI.getState().soundOn || !soundAvailable()) return;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    const t = ctx.currentTime;
    switch (kind) {
      case "tick":
        blip(t, 1900, 0.05, 0.022);
        break;
      case "open":
        blip(t, 520, 0.07, 0.03);
        blip(t + 0.06, 720, 0.09, 0.026);
        break;
      case "close":
        blip(t, 720, 0.07, 0.026);
        blip(t + 0.06, 520, 0.09, 0.03);
        break;
      case "confirm":
        blip(t, 520, 0.06, 0.03);
        blip(t + 0.07, 660, 0.06, 0.026);
        blip(t + 0.14, 880, 0.1, 0.022);
        break;
    }
  } catch {
    // AudioContext indisponible (autoplay policy, etc.) : silence, jamais d'erreur UI.
  }
}
