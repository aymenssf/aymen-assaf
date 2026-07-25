/** Détection WebGL — le hero bascule sur le fallback SVG si absent (ou `?nogl=1`). */
export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") ?? canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}
