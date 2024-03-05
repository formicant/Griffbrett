import { Note } from './note';
import { Chord } from './chord';
import { Tuning, getGroup } from './tuning';
import { instruments, instrumentByTuning, defaultInstrument } from './instruments';
import { getById, createElement } from './dom';
import { applyTypography } from './typography';
import { getGroupColor } from './colors';

function populateInstruments(instrumentsElement: HTMLSelectElement) {
  for (const instrument of Object.keys(instruments)) {
    instrumentsElement.appendChild(createElement('option', {
      value: instrument,
      innerText: instrument
    }));
  }
}

function getChordDescription(chord: Chord): HTMLParagraphElement {
  const notes = applyTypography(chord.notes.join(' '));
  return createElement('p', {
    id: 'chordDescription',
    innerText: `⟨ ${notes} ⟩`
  });
}

function getFretHeaderElement(fretCount: number): HTMLParagraphElement {
  const fretHeaderElement = createElement('p', {
    className: 'fretHeader'
  });
  for (const fretIndex of Array(fretCount).keys()) {
    fretHeaderElement.appendChild(createElement('span', {
      innerText: fretIndex.toString()
    }));
  }
  return fretHeaderElement;
}

function getFretElement(fretNote: Note | null, rootNote: Note): HTMLSpanElement {
  const innerText = fretNote !== null
    ? applyTypography(fretNote.toString())
    : '·';
  const group = getGroup(rootNote, fretNote);
  const color = group !== undefined ? getGroupColor(group) : undefined;
  return createElement('span', { innerText }, { color });
}

function getFrettedStringElement(frettedString: Array<Note | null>, rootNote: Note): HTMLParagraphElement {
  const frettedStringElement = createElement('p');
  for (const fretNote of frettedString) {
    frettedStringElement.appendChild(getFretElement(fretNote, rootNote));
  }
  return frettedStringElement;
}

function getFretboardElement(fretboard: Array<Note | null>[], rootNote: Note): HTMLDivElement {
  const fretboardElement = createElement('div', { id: 'fretboard' });
  fretboardElement.appendChild(getFretHeaderElement(fretboard[0].length));
  for (const frettedString of [...fretboard].reverse()) {
    fretboardElement.appendChild(getFrettedStringElement(frettedString, rootNote));
  }
  return fretboardElement;
}

function getErrorElement(message: string): HTMLParagraphElement {
  return createElement('p', {
    id: 'error',
    innerText: message
  });
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
        getFretboardElement(fretboard, chord.notes[0])
      );
    } catch(error) {
      const message = error instanceof Error ? error.message : `${error}`;
      outputElement.replaceChildren(
        getErrorElement(message)
      );
    }
  }
  
  function onInstrumentInput() {
    const instrument = instrumentElement.value;
    if (instrument in instruments) {
      const tuning = instruments[instrument];
      tuningElement.value = tuning.description;
      showFretboard();
    }
  }
  
  function onTuningInput() {
    const tuningDescription = tuningElement.value;
    let instrument = '';
    try {
      const tuning = new Tuning(tuningDescription);
      if (tuning.description in instrumentByTuning) {
        instrument = instrumentByTuning[tuning.description];
      }
    } catch { }
    instrumentElement.value = instrument;
    showFretboard();
  }
  
  function onFretCountInput() {
    showFretboard();
  }
  
  function onChordInput() {
    showFretboard();
  }
  
  populateInstruments(instrumentElement);
  instrumentElement.value = defaultInstrument;
  onInstrumentInput();
  
  instrumentElement.addEventListener('input', onInstrumentInput);
  tuningElement.addEventListener('input', onTuningInput);
  fretCountElement.addEventListener('input', onFretCountInput);
  chordElement.addEventListener('input', onChordInput);
  
  chordElement.focus();
}
