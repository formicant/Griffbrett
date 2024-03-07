import { Chord, knownChordNames } from '../theory/chord';
import { Tuning } from '../theory/tuning';
import { instruments } from '../theory/instruments';
import { getById, createElement } from './dom';
import { applyTypography } from './typography';
import { getFretboardElement } from './fretboard';
import { Model, makeConsistent } from './model';
import { getUrlHash, setUrlHash } from './urlHash';


// Static page elements
const instrumentElement = getById<HTMLSelectElement>('instrument');
const tuningElement     = getById<HTMLInputElement>('tuning');
const fretCountElement  = getById<HTMLInputElement>('fretCount');
const chordElement      = getById<HTMLInputElement>('chord');
const chordsDataList    = getById<HTMLDataListElement>('chords');
const statusElement     = getById('status');
const outputElement     = getById('output');

/** Chords datalist options */
const chordOptions: { [chord: string]: HTMLOptionElement } = { };
for (const chord of knownChordNames) {
  chordOptions[chord] = createElement('option', { value: chord });
}

/**
 * When the user types in the chord field,
 * this function forms the popup list with suggestions
 */
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

/** Populates the instrument drop-down */
function populateInstruments() {
  for (const instrument of Object.keys(instruments)) {
    instrumentElement.appendChild(createElement('option', {
      value: instrument,
      innerText: instrument
    }));
  }
}

/** Gets HTML element containing the list of chord's notes */
function getChordDescriptionElement(chord: Chord): HTMLParagraphElement {
  const notes = applyTypography(chord.notes.join(' '));
  return createElement('p', {
    id: 'chordDescription',
    innerText: `⟨ ${notes} ⟩`
  });
}

/** Gets HTML element containing an error message */
function getErrorElement(message: string): HTMLParagraphElement {
  return createElement('p', {
    id: 'error',
    innerText: message
  });
}


/** Current state of the page */
let model: Model;

/**
 * Displays the current state of the page.
 * The model should be consistent (use `makeConsistent` before calling this)
 */
function displayPage(model: Model) {
  // prevent recursive `onHashChange` calls
  removeEventListener('hashchange', onHashChange);
  
  const status = [];
  const output = [];
  
  try {
    const tuning = new Tuning(model.tuningDescription);
    // tuning is valid
    
    const chordName = model.chordName.trim();
    let chord: Chord | undefined = undefined;
    if (chordName !== '') {
      try {
        chord = new Chord(chordName);
        // chord is valid
        status.push(getChordDescriptionElement(chord));
      } catch(error) {
        // chord is invalid
        const message = error instanceof Error ? error.message : `${error}`;
        status.push(getErrorElement(message));
      }
    }
    
    const fretboard = tuning.getFretboard(chord, model.fretCount);
    output.push(getFretboardElement(fretboard, chord?.notes[0]));
    
    if (chord !== undefined || chordName === '') {
      // change url hash only if the tuning is valid and the chord is valid or empty
      setUrlHash(model);
    }
  } catch(error) {
    // tuning is invalid
    const message = error instanceof Error ? error.message : `${error}`;
    status.push(getErrorElement(`Invalid tuning: ${message}`));
  }
  
  // set the input field values
  instrumentElement.value = model.instrument;
  tuningElement.value = model.tuningDescription;
  fretCountElement.value = model.fretCount.toString();
  chordElement.value = model.chordName;
  
  // display the output
  statusElement.replaceChildren(...status);
  outputElement.replaceChildren(...output);
  
  // timeout fixes recursive `onHashChange` calls
  // TODO: find the reason and a better solution
  setTimeout(() => { addEventListener('hashchange', onHashChange); }, 100);
}

/** Changes the current page state */
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
  populateInstruments();
  
  onHashChange();
  addEventListener('hashchange', onHashChange);
  
  instrumentElement.addEventListener('input', onInstrumentInput);
  tuningElement    .addEventListener('input', onTuningInput);
  fretCountElement .addEventListener('input', onFretCountInput);
  chordElement     .addEventListener('input', onChordInput);
  
  chordElement.focus();
}
