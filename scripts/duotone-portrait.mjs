/**
 * Précalcule le portrait en duotone (noir profond → vert phosphore).
 *
 * Le filtre CSS/SVG en temps réel donnait un résultat plat ("papier peint
 * vert") : la photo source est en lumière très plate et haute clé (fond
 * clair, veste claire), donc la majorité des pixels se retrouvait dans le
 * haut de la plage tonale et ressortait vert quasi uniforme, sans vraie
 * séparation ombre/lumière. Un LUT précalculé donne un contrôle exact —
 * et un rendu identique sur tous les navigateurs.
 *
 * Usage : node scripts/duotone-portrait.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "public", "portrait.jpg");
const OUT = join(root, "public", "portrait-duotone.jpg");

const VOID = { r: 10, g: 10, b: 11 };
const ACCENT = { r: 180, g: 244, b: 97 };

/**
 * Courbe calibrée sur l'histogramme réel de la photo. Deux écueils opposés
 * à éviter, tous deux observés en itérant :
 * - une rampe trop douce fait basculer la veste claire en vert plein dès
 *   le médian (~180/255) → effet "papier peint" ;
 * - la corriger en écrasant tout sous ~220 vers 0 réduit le visage (dont
 *   les carnations tombent vers 60-190) à un aplat noir sans relief.
 * Solution : une gradation continue sur toute la plage, qui préserve le
 * modelé du visage (variations subtiles sous mix≈0.15) tout en gardant
 * l'accent plein réservé aux vrais reflets (lunettes, col, bokeh clair
 * au-delà de p99 ≈ 245) — conforme à la règle « accent ≤ 10 % de la
 * surface visible ».
 * Points de contrôle (gris d'entrée 0-255 → mix vers l'accent 0-1).
 */
const CURVE = [
  [0, 0],
  [50, 0.015],
  [100, 0.03],
  [140, 0.05],
  [170, 0.08],
  [195, 0.12],
  [215, 0.18],
  [230, 0.3],
  [245, 0.6],
  [255, 1],
];

function mix(g) {
  for (let i = 1; i < CURVE.length; i++) {
    const [x0, y0] = CURVE[i - 1];
    const [x1, y1] = CURVE[i];
    if (g <= x1) {
      const t = x1 === x0 ? 0 : (g - x0) / (x1 - x0);
      return y0 + t * (y1 - y0);
    }
  }
  return 1;
}

const lut = new Uint8Array(256 * 3);
for (let g = 0; g < 256; g++) {
  const t = mix(g);
  lut[g * 3] = Math.round(VOID.r + t * (ACCENT.r - VOID.r));
  lut[g * 3 + 1] = Math.round(VOID.g + t * (ACCENT.g - VOID.g));
  lut[g * 3 + 2] = Math.round(VOID.b + t * (ACCENT.b - VOID.b));
}

const { data, info } = await sharp(SRC)
  .greyscale()
  // Contraste local (CLAHE) : fait ressortir les plis de la veste et le
  // modelé du visage — sans quoi ces zones, toutes proches en luminance
  // globale, restent des aplats plats une fois passées dans le LUT.
  .clahe({ width: 60, height: 60, maxSlope: 3 })
  .raw()
  .toBuffer({ resolveWithObject: true });

const out = Buffer.alloc(data.length * 3);
for (let i = 0; i < data.length; i++) {
  const g = data[i];
  out[i * 3] = lut[g * 3];
  out[i * 3 + 1] = lut[g * 3 + 1];
  out[i * 3 + 2] = lut[g * 3 + 2];
}

await sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } })
  .jpeg({ quality: 86 })
  .toFile(OUT);

console.log(`duotone: ${info.width}x${info.height} → public/portrait-duotone.jpg`);
