import { Chord, knownChordNames } from '../theory/chord';
import { Tuning } from '../theory/tuning';
import { instruments, instrumentByTuning, defaultInstrument } from '../theory/instruments';
import { getById, createElement } from './dom';
import { applyTypography } from './typography';
import { getFretboardElement } from './fretboard';

function getChordDescription(chord: Chord): HTMLParagraphElement {
  const notes = applyTypography(chord.notes.join(' '));
  return createElement('p', {
    id: 'chordDescription',
    innerText: `⟨ ${notes} ⟩`
  });
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
  const chordsDataList = getById<HTMLDataListElement>('chords');
  const statusElement = getById('status');
  const outputElement = getById('output');
  
  const chordOptions: { [chord: string]: HTMLOptionElement } = { };
  for (const chord of knownChordNames) {
    chordOptions[chord] = createElement('option', { value: chord });
  }

  function populateChords(text: string = '') {
    const normalizedText = text.trim().toLowerCase();
    const exactMatches = knownChordNames.filter(c =>
      c.toLowerCase() === normalizedText);
    const beginningMatches = knownChordNames.filter(c =>
      c.toLowerCase().startsWith(normalizedText) &&
      !exactMatches.includes(c));
    const substringMatches = knownChordNames.filter(c =>
      c.toLowerCase().includes(normalizedText) &&
      !exactMatches.includes(c) &&
      !beginningMatches.includes(c));
    const matches = [...exactMatches, ...beginningMatches, ...substringMatches];
    chordsDataList.replaceChildren(...matches.map(c => chordOptions[c]));
  }
  
  function populateInstruments() {
    for (const instrument of Object.keys(instruments)) {
      instrumentElement.appendChild(createElement('option', {
        value: instrument,
        innerText: instrument
      }));
    }
  }
  
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
  
  function onChordInput(e: Event) {
    if (e instanceof InputEvent && e.inputType !== 'insertReplacementText') {
      const text = chordElement.value.trim();
      populateChords(text);
    }
    showFretboard();
  }
  
  populateInstruments();
  instrumentElement.value = defaultInstrument;
  onInstrumentInput();
  populateChords();
  
  instrumentElement.addEventListener('input', onInstrumentInput);
  tuningElement.addEventListener('input', onTuningInput);
  fretCountElement.addEventListener('input', onFretCountInput);
  chordElement.addEventListener('input', onChordInput);
  
  chordElement.focus();
}
