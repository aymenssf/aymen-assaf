"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { playUI } from "@/lib/sound";

type Theme = "light" | "dark";

/**
 * Bascule clair/sombre du rail : demi-disque « contraste », persistance
 * localStorage, fondu piloté par la classe `theme-switching` (globals.css).
 * Le thème effectif est posé avant la peinture par le script inline du layout.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const [theme, setTheme] = useState<Theme>("light");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    return () => clearTimeout(timer.current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-switching");
    root.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#0a0a0b" : "#f7f7f2");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => root.classList.remove("theme-switching"), 550);
    playUI("tick");
  };

  return (
    <button
      type="button"
      data-cursor="link"
      onClick={toggle}
      aria-pressed={theme === "dark"}
      aria-label={t(theme === "dark" ? "themeToLight" : "themeToDark")}
      className={`text-dim transition-colors duration-300 hover:text-accent ${className ?? ""}`}
    >
      <svg aria-hidden viewBox="0 0 16 16" className="size-4">
        <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        {/* Demi-disque : plein à droite en clair, à gauche en sombre — état lisible d'un coup d'œil. */}
        <path
          d={theme === "dark" ? "M8 1.8 a6.2 6.2 0 0 0 0 12.4 Z" : "M8 1.8 a6.2 6.2 0 0 1 0 12.4 Z"}
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
