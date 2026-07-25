/**
 * Filtre duotone global : luminance → rampe noir profond → vert phosphore.
 * Déclaré une seule fois, référencé par `filter: url(#duotone-accent)`.
 * Les valeurs de sortie correspondent aux tokens --color-void et --color-accent.
 */
export function DuotoneDefs() {
  return (
    <svg aria-hidden focusable="false" className="pointer-events-none absolute size-0">
      <defs>
        <filter id="duotone-accent" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0      0      0      1 0"
          />
          {/* Rampe non linéaire : la source est très lumineuse (fond clair, veste claire).
              Les tons moyens restent proches du noir, seuls les hauts atteignent l'accent —
              l'accent conserve ainsi son statut de couleur rare. */}
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.039 0.075 0.20 0.706" />
            <feFuncG type="table" tableValues="0.039 0.11 0.30 0.957" />
            <feFuncB type="table" tableValues="0.043 0.06 0.12 0.380" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
