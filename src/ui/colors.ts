const phi = (1 + Math.sqrt(5)) / 2;
const goldenAngle = 2 * Math.PI / (phi * phi);

const lightness = 0.55;
const saturation = 0.65;

/**
 * Generates an OKlab color for a given group index
 * so that all colors have the same lightness and saturation,
 * all groups have different hues,
 * and hues of neighbor groups contrast well with each other
 */
export function getGroupColor(group: number): string {
  const hue = goldenAngle * group;
  const l = lightness * 100;
  const a = saturation * Math.cos(hue) * 100;
  const b = saturation * Math.sin(hue) * 100;
  return `oklab(${l.toFixed(1)}% ${a.toFixed(1)}% ${b.toFixed(1)}%)`;
}
