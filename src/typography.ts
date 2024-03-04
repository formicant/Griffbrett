const characterDict: { [char: string]: string } = {
  '#': '♯',
  'b': '♭',
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

const replaceRegex = new RegExp(`[${Object.keys(characterDict)}]`, 'g');


export function applyTypography(text: string): string {
  return text.replace(replaceRegex, c => characterDict[c]);
}
