const accidentals: { [char: string]: string } = {
  '#': '♯',
  'b': '♭',
};

const subscript: { [char: string]: string } = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
};

const backwardDictionary: { [char: string]: string } = Object.fromEntries(
  Object.entries(accidentals).concat(Object.entries(subscript))
    .map(([key, value]) => [value, key]));

const backwardRegex = new RegExp(
  `[${Object.values(accidentals).concat(Object.values(subscript))}]`, 'g');


/**
 * Replaces easy-to-type ASCII characters
 * for accidentals and octave numbers
 * with good-looking Unicode ones
 */
export function typesetNote(text: string): string {
  return text
    .replace(/[#b]/g, c => accidentals[c])
    .replace(/\d/g, c => subscript[c]);
}

/**
 * Replaces easy-to-type ASCII characters
 * for accidentals and chord types
 * with good-looking Unicode ones
 */
export function typesetChord(text: string): string {
  return text.replace(/[#b]/g, c => accidentals[c]);
}

/**
 * Replaces unicode characters with ASCII ones
 */
export function removeTypography(text: string): string {
  return text.replace(backwardRegex, c => backwardDictionary[c]);
}
