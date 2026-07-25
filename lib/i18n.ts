/** Types partagés pour le contenu localisé structuré (dossier `content/`). */
export type Locale = "fr" | "en";

/** Valeur localisée : `{ fr: "...", en: "..." }`. */
export type L<T = string> = Record<Locale, T>;

export function pick<T>(value: L<T>, locale: Locale): T {
  return value[locale];
}
