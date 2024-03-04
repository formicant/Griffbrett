const phi = (1 + Math.sqrt(5)) / 2;
const goldenAngle = 2 * Math.PI / (phi * phi);

const lightness = 0.55;
const saturation = 0.65;

export function getGroupColor(group: number): string {
  const hue = goldenAngle * group;
  const l = lightness * 100;
  const a = saturation * Math.cos(hue) * 100;
  const b = saturation * Math.sin(hue) * 100;
  return `oklab(${l.toFixed(2)}% ${a.toFixed(2)}% ${b.toFixed(2)}%)`;
}
