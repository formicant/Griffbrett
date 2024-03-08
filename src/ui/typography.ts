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

const superscript: { [char: string]: string } = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
};

const accidentalRegex = new RegExp(`[${Object.keys(accidentals)}]`, 'g');

const numberRegex = /\d/g;


/**
 * Replaces easy-to-type ASCII characters
 * for accidentals and octave numbers
 * with good-looking Unicode ones
 */
export function typesetNote(text: string): string {
  return text
    .replace(accidentalRegex, c => accidentals[c])
    .replace(numberRegex, c => subscript[c]);
}

/**
 * Replaces easy-to-type ASCII characters
 * for accidentals and chord types
 * with good-looking Unicode ones
 */
export function typesetChord(text: string): string {
  return text
    .replace(accidentalRegex, c => accidentals[c]);
    //.replace(numberRegex, c => superscript[c]);
}
