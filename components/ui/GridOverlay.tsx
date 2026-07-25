/**
 * Guides de la grille 12 colonnes, en filigrane sous le contenu.
 * Purement décoratif — masqué aux lecteurs d'écran.
 */
export function GridOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden px-gutter md:block"
    >
      <div className="mx-auto grid h-full max-w-[90rem] grid-cols-12 gap-x-6">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="border-l border-line/25 last:border-r" />
        ))}
      </div>
    </div>
  );
}
