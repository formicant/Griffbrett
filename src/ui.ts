import { Note } from './note';
import { Chord } from './chord';
import { Tuning, getGroup } from './tuning';

const typographyDict: { [char: string]: string } = {
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

const typographyRegex = new RegExp(`[${Object.keys(typographyDict)}]`, 'g');


function getById<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw Error(`Cannot find element with id '${id}'.`);
  }
  return element as T;
}


function getFretHeaderElement(fretCount: number): HTMLParagraphElement {
  const fretHeaderElement = document.createElement('p');
  fretHeaderElement.className = 'fretHeader';
  for (const fretIndex of Array(fretCount).keys()) {
    const fretIndexElement = document.createElement('span');
    fretIndexElement.append(fretIndex.toString());
    fretHeaderElement.appendChild(fretIndexElement);
  }
  return fretHeaderElement;
}

function getFretElement(fretNote: Note | null): HTMLSpanElement {
  const fretElement = document.createElement('span');
  const text = fretNote !== null
    ? fretNote.toString().replace(typographyRegex, c => typographyDict[c])
    : '·';
  fretElement.append(text);
  return fretElement;
}

function getFrettedStringElement(frettedString: Array<Note | null>): HTMLParagraphElement {
  const frettedStringElement = document.createElement('p');
  for (const fretNote of frettedString) {
    frettedStringElement.appendChild(getFretElement(fretNote));
  }
  return frettedStringElement;
}

function getFretboardElement(fretboard: Array<Note | null>[]): HTMLDivElement {
  const fretboardElement = document.createElement('div');
  fretboardElement.id = 'fretboard';
  fretboardElement.appendChild(getFretHeaderElement(fretboard[0].length));
  for (const frettedString of [...fretboard].reverse()) {
    fretboardElement.appendChild(getFrettedStringElement(frettedString));
  }
  return fretboardElement;
}

export function test() {
  const tuning = new Tuning('G4 C4 E4 A4');
  const chord = new Chord('Cm7');
  const fretboard = tuning.getFretboard(chord);
  
  const outputElement = getById('output');
  outputElement.replaceChildren(getFretboardElement(fretboard));
}
