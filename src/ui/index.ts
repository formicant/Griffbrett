import { Chord, knownChordNames } from '../theory/chord';
import { Tuning } from '../theory/tuning';
import { instruments } from '../theory/instruments';
import { getById, createElement } from './dom';
import { applyTypography } from './typography';
import { getFretboardElement } from './fretboard';
import { Model, makeConsistent } from './model';
import { getUrlHash, setUrlHash } from './urlHash';


// Html elements
const instrumentElement = getById<HTMLSelectElement>('instrument');
const tuningElement     = getById<HTMLInputElement>('tuning');
const fretCountElement  = getById<HTMLInputElement>('fretCount');
const chordElement      = getById<HTMLInputElement>('chord');
const chordsDataList    = getById<HTMLDataListElement>('chords');
const statusElement     = getById('status');
const outputElement     = getById('output');

// Chords datalist options
const chordOptions: { [chord: string]: HTMLOptionElement } = { };
for (const chord of knownChordNames) {
  chordOptions[chord] = createElement('option', { value: chord });
}

function populateChordsDatalist(text: string = '') {
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

function getChordDescriptionElement(chord: Chord): HTMLParagraphElement {
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


let model: Model;

function displayPage(model: Model) {
  // assuming that the model is consistent
  
  const status = [];
  const output = [];
  
  try {
    const tuning = new Tuning(model.tuningDescription);
    
    const chordName = model.chordName.trim();
    let chord: Chord | undefined = undefined;
    if (chordName !== '') {
      try {
        chord = new Chord(chordName);
        status.push(getChordDescriptionElement(chord));
      } catch(error) {
        const message = error instanceof Error ? error.message : `${error}`;
        status.push(getErrorElement(message));
      }
    }
    
    const fretboard = tuning.getFretboard(chord, model.fretCount);
    output.push(getFretboardElement(fretboard, chord?.notes[0]));
    
    if (chord !== undefined || chordName === '') {
      setUrlHash(model);
    }
  } catch(error) {
    const message = error instanceof Error ? error.message : `${error}`;
    status.push(getErrorElement(`Invalid tuning: ${message}`));
  }

  instrumentElement.value = model.instrument;
  tuningElement.value = model.tuningDescription;
  fretCountElement.value = model.fretCount.toString();
  chordElement.value = model.chordName;
  
  statusElement.replaceChildren(...status);
  outputElement.replaceChildren(...output);
}

function changeModel(newModel: Model) {
  model = makeConsistent(newModel);
  displayPage(model);
}

// Input actions:

function onInstrumentInput() {
  const instrument = instrumentElement.value;
  changeModel({ ...model, instrument, tuningDescription: '' });
}

function onTuningInput() {
  const tuningDescription = tuningElement.value;
  changeModel({ ...model, tuningDescription, instrument: '' });
}

function onFretCountInput() {
  const fretCount = parseInt(fretCountElement.value);
  changeModel({ ...model, fretCount });
}

function onChordInput(e?: Event) {
  const chordName = chordElement.value;
  if (e instanceof InputEvent && e.inputType !== 'insertReplacementText') {
    populateChordsDatalist(chordName);
  }
  changeModel({ ...model, chordName });
}

function onHashChange() {
  changeModel(getUrlHash());
  populateChordsDatalist(model.chordName);
}


// Entry point
export function initialize() {  
  populateChordsDatalist();
  populateInstruments();
  
  onHashChange();
  addEventListener('hashchange', onHashChange);
  
  instrumentElement.addEventListener('input', onInstrumentInput);
  tuningElement    .addEventListener('input', onTuningInput);
  fretCountElement .addEventListener('input', onFretCountInput);
  chordElement     .addEventListener('input', onChordInput);
  
  chordElement.focus();
}
