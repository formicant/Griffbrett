import { Note } from './note';
import { Chord } from './chord';
import { Tuning, getGroup } from './tuning';
import { applyTypography } from './typography';


function getById<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw Error(`Cannot find element with id '${id}'`);
  }
  return element as T;
}


function getChordDescription(chord: Chord): HTMLParagraphElement {
  const chordDescriptionElement = document.createElement('p');
  chordDescriptionElement.id = 'chordDescription';
  const notes = applyTypography(chord.notes.join(' '));
  chordDescriptionElement.append(`⟨ ${notes} ⟩`)
  return chordDescriptionElement;
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
    ? applyTypography(fretNote.toString())
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

function getErrorElement(message: string): HTMLParagraphElement {
  const errorElement = document.createElement('p');
  errorElement.id = 'error';
  errorElement.append(message);
  return errorElement;
}


export function initialize() {
  const instrumentElement = getById<HTMLSelectElement>('instrument');
  const tuningElement = getById<HTMLInputElement>('tuning');
  const fretCountElement = getById<HTMLInputElement>('fretCount');
  const chordElement = getById<HTMLInputElement>('chord');
  const outputElement = getById('output');
  
  function showFretboard() {
    try {
      const tuningDescription = tuningElement.value.trim();
      const chordName = chordElement.value.trim();
      const fretCount = parseInt(fretCountElement.value);
      
      if (!tuningDescription || !chordName) {
        outputElement.replaceChildren();
        return;
      }
      
      const tuning = new Tuning(tuningDescription);
      const chord = new Chord(chordName);
      const fretboard = tuning.getFretboard(chord, fretCount);
      
      outputElement.replaceChildren(
        getChordDescription(chord),
        getFretboardElement(fretboard)
      );
    } catch(error) {
      const message = error instanceof Error ? error.message : `${error}`;
      outputElement.replaceChildren(
        getErrorElement(message)
      );
    }
  }
  
  function onInput() {
    showFretboard();
  }
  
  tuningElement.addEventListener('input', onInput);
  fretCountElement.addEventListener('input', onInput);
  chordElement.addEventListener('input', onInput);
  
  chordElement.focus();
}
