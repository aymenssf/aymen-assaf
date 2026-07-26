"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { playUI, soundAvailable } from "@/lib/sound";
import { useUI } from "@/lib/store";

/**
 * Sons UI opt-in : muet par défaut, persisté (localStorage), proposé
 * uniquement sur pointeur fin hors reduced-motion — sinon rien n'est rendu.
 */
export function SoundToggle({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const soundOn = useUI((s) => s.soundOn);
  const setSoundOn = useUI((s) => s.setSoundOn);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (!soundAvailable()) return;
    setAvailable(true);
    try {
      if (localStorage.getItem("ui-sound") === "on") setSoundOn(true);
    } catch {}
  }, [setSoundOn]);

  if (!available) return null;

  const toggle = () => {
    const next = !soundOn;
    setSoundOn(next);
    try {
      localStorage.setItem("ui-sound", next ? "on" : "off");
    } catch {}
    // Retour immédiat à l'activation — après le set, sinon le garde-fou coupe.
    if (next) playUI("confirm");
  };

  return (
    <button
      type="button"
      data-cursor="link"
      onClick={toggle}
      aria-pressed={soundOn}
      aria-label={t(soundOn ? "soundOff" : "soundOn")}
      className={`text-dim transition-colors duration-300 hover:text-accent ${className ?? ""}`}
    >
      <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor">
        <path d="M2.5 6v4h2.8l3.2 2.8V3.2L5.3 6H2.5Z" strokeWidth="1.1" strokeLinejoin="round" />
        {soundOn ? (
          <>
            <path d="M10.8 5.6a3.4 3.4 0 0 1 0 4.8" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M12.6 4a6 6 0 0 1 0 8" strokeWidth="1.1" strokeLinecap="round" />
          </>
        ) : (
          <path d="M10.6 6.2l3.6 3.6M14.2 6.2l-3.6 3.6" strokeWidth="1.1" strokeLinecap="round" />
        )}
      </svg>
    </button>
  );
}
