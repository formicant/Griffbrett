import { Note } from './note';
import { Chord, knownChordNames } from './chord';
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

function populateChords(chordsDataList: HTMLDataListElement) {
  for (const chordName of knownChordNames) {
    chordsDataList.appendChild(createElement('option', { value: chordName }));
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

function getFretElement(fretNote: Note | null, rootNote?: Note): HTMLSpanElement {
  const innerText = fretNote !== null
    ? applyTypography(fretNote.toString())
    : '·';
  const group = rootNote !== undefined ? getGroup(rootNote, fretNote) : undefined;
  const color = group !== undefined ? getGroupColor(group) : undefined;
  return createElement('span', { innerText }, { color });
}

function getFrettedStringElement(frettedString: Array<Note | null>, rootNote?: Note): HTMLParagraphElement {
  const frettedStringElement = createElement('p');
  for (const fretNote of frettedString) {
    frettedStringElement.appendChild(getFretElement(fretNote, rootNote));
  }
  return frettedStringElement;
}

function getFretboardElement(fretboard: Array<Note | null>[], rootNote?: Note): HTMLDivElement {
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
  const statusElement = getById('status');
  const outputElement = getById('output');
  
  function showFretboard() {
    const tuningDescription = tuningElement.value.trim();
    const chordName = chordElement.value.trim();
    const fretCount = parseInt(fretCountElement.value);
    
    statusElement.replaceChildren();
    outputElement.replaceChildren();
    
    try {
      const tuning = new Tuning(tuningDescription);
      let chord = undefined;
      if (chordName !== '') {
        try {
          chord = new Chord(chordName);
          statusElement.appendChild(getChordDescription(chord));
        } catch(error) {
          const message = error instanceof Error ? error.message : `${error}`;
          statusElement.appendChild(getErrorElement(message));
        }
      }
      const fretboard = tuning.getFretboard(chord, fretCount);
      outputElement.appendChild(
        getFretboardElement(fretboard, chord?.notes[0])
      );
    } catch(error) {
      const message = error instanceof Error ? error.message : `${error}`;
      statusElement.appendChild(getErrorElement(`Invalid tuning: ${message}`));
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
  
  populateChords(getById<HTMLDataListElement>('chords'));
  
  instrumentElement.addEventListener('input', onInstrumentInput);
  tuningElement.addEventListener('input', onTuningInput);
  fretCountElement.addEventListener('input', onFretCountInput);
  chordElement.addEventListener('input', onChordInput);
  
  chordElement.focus();
}
