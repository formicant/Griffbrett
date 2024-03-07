/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/theory/chord.ts":
/*!*****************************!*\
  !*** ./src/theory/chord.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Chord = exports.knownChordNames = void 0;
const note_1 = __webpack_require__(/*! ./note */ "./src/theory/note.ts");
// Intervals in semitones:
const [P1, m2, M2, m3, M3, P4, A4, P5, m6, M6, m7, M7] = Array(12).keys();
const suffixMeanings = {
    'm(no5)': [P1, m3],
    '(no5)': [P1, M3],
    '5': [P1, P5],
    'dim': [P1, m3, A4],
    'sus2': [P1, M2, P5],
    'm': [P1, m3, P5],
    '': [P1, M3, P5],
    'sus4': [P1, P4, P5],
    'aug': [P1, M3, m6],
    'm6': [P1, m3, P5, M6],
    '6': [P1, M3, P5, M6],
    'm7': [P1, m3, P5, m7],
    'mM7': [P1, m3, P5, M7],
    '7': [P1, M3, P5, m7],
    'M7': [P1, M3, P5, M7],
};
const knownSuffixes = Object.keys(suffixMeanings);
knownSuffixes.sort();
/** List of all valid chord names, used in the chord popup */
exports.knownChordNames = [];
for (const note of note_1.knownNoteNames) {
    for (const suffix of knownSuffixes) {
        exports.knownChordNames.push(note + suffix);
    }
}
const chordRegex = new RegExp(`^(${note_1.noteNamePattern})(.*)$`);
class Chord {
    constructor(name) {
        this.name = name;
        const match = name.match(chordRegex);
        if (!match) {
            throw new SyntaxError(`Can't parse chord ${name}`);
        }
        const [_, rootName, suffix] = match;
        const root = new note_1.Note(rootName);
        if (!(suffix in suffixMeanings)) {
            throw new SyntaxError(`Can't parse chord suffix ${suffix}`);
        }
        this.notes = [];
        for (const interval of suffixMeanings[suffix]) {
            this.notes.push(root.addInterval(interval));
        }
    }
    toString() {
        return `${this.name} = <${this.notes.join(' ')}>`;
    }
}
exports.Chord = Chord;


/***/ }),

/***/ "./src/theory/instruments.ts":
/*!***********************************!*\
  !*** ./src/theory/instruments.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.instrumentByTuning = exports.instruments = void 0;
const tuning_1 = __webpack_require__(/*! ./tuning */ "./src/theory/tuning.ts");
exports.instruments = {
    'Balalaika (academic)': new tuning_1.Tuning('E4 E4 A4'),
    'Balalaika (folk)': new tuning_1.Tuning('C4 E4 G4'),
    'Banjo': new tuning_1.Tuning('G4 D3 G3 B3 D4'),
    'Bass': new tuning_1.Tuning('E1 A1 D2 G2'),
    'Braguinha': new tuning_1.Tuning('D4 G4 B4 D5'),
    'Charango': new tuning_1.Tuning('G4 C5 E A4 E5'),
    'Cavaquinho (Portugal GGBD)': new tuning_1.Tuning('G4 G4 B4 D5'),
    'Cavaquinho (Portugal DABE)': new tuning_1.Tuning('D5 A4 B4 E5'),
    'Cavaquinho (Brazil DGBD)': new tuning_1.Tuning('D4 G4 B4 D5'),
    'Cavaquinho (Brazil DGBE)': new tuning_1.Tuning('D4 G4 B4 E5'),
    'Dala faendyr': new tuning_1.Tuning('E4 A4 E5'),
    'Dechig pondar': new tuning_1.Tuning('C4 D4 G4'),
    'Guitalele': new tuning_1.Tuning('A2 D3 G3 C4 E4 A4'),
    'Guitar': new tuning_1.Tuning('E2 A2 D3 G3 B3 E4'),
    'Guitarrón': new tuning_1.Tuning('A1 D2 G2 C3 E3 A2'),
    'Jarana jarocha': new tuning_1.Tuning('G3 C4 E A3 G3'),
    'Jarana huasteca': new tuning_1.Tuning('G3 B3 D4 F#4 A4'),
    'Mandolin': new tuning_1.Tuning('G3 D4 A4 E5'),
    'Rajao': new tuning_1.Tuning('D4 G4 C4 E4 A4'),
    'Requinto': new tuning_1.Tuning('A2 D3 G3 C4 E4 A4'),
    'Semistrunka': new tuning_1.Tuning('D2 G2 B2 D3 G3 B3 D4'),
    'Tenor guitar': new tuning_1.Tuning('C3 G3 D4 A4'),
    'Timple': new tuning_1.Tuning('G4 C5 E4 A4 D5'),
    'Ukulele (high G)': new tuning_1.Tuning('G4 C4 E4 A4'),
    'Ukulele (low G)': new tuning_1.Tuning('G3 C4 E4 A4'),
    'Ukulele (baritone)': new tuning_1.Tuning('D3 G3 B3 E4'),
    'Vihuela': new tuning_1.Tuning('A3 D4 G4 B3 E4'),
    'Viola': new tuning_1.Tuning('C3 G3 D4 A4'),
    'Violin': new tuning_1.Tuning('G3 D4 A4 E5'),
};
/** Gets the first instrument with the given tuning */
exports.instrumentByTuning = {};
for (const [name, tuning] of Object.entries(exports.instruments)) {
    if (!(tuning.description in exports.instrumentByTuning)) {
        exports.instrumentByTuning[tuning.description] = name;
    }
}


/***/ }),

/***/ "./src/theory/note.ts":
/*!****************************!*\
  !*** ./src/theory/note.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Note = exports.noteNamePattern = exports.knownNoteNames = void 0;
/** 12edo notes. A note can have one or two names */
const noteNames = [
    ['C'], ['C#', 'Db'],
    ['D'], ['D#', 'Eb'],
    ['E'],
    ['F'], ['F#', 'Gb'],
    ['G'], ['G#', 'Ab'],
    ['A'], ['A#', 'Bb'],
    ['B'],
];
const unsupported = {
    'Cb': 'B',
    'B#': 'C',
    'Fb': 'E',
    'E#': 'F',
};
const noteIndexByName = {};
for (const [index, names] of noteNames.entries()) {
    for (const name of names) {
        noteIndexByName[name] = index;
    }
}
/**
 * List of all valid note names in alphabetical order
 * ['A', 'A#', 'Ab', 'B', ..., 'Gb']
 * Used in the chord popup
 */
exports.knownNoteNames = Object.keys(noteIndexByName);
exports.knownNoteNames.sort();
exports.noteNamePattern = '[A-G][#b]?'; // used by chord.ts
const noteRegex = new RegExp(`^(${exports.noteNamePattern})(\\d)?$`);
/** Represents either an absolute-pitched note or an octave-invariant note */
class Note {
    constructor(name) {
        const match = name.match(noteRegex);
        if (match) {
            const [_, noteName, octaveName] = match;
            if (noteName in unsupported) {
                const suggestion = unsupported[noteName];
                throw new SyntaxError(`Use ${suggestion} instead of ${noteName}`);
            }
            this.pitchClass = noteIndexByName[noteName];
            this.octave = octaveName !== undefined ? parseInt(octaveName) : undefined;
        }
        else {
            throw new SyntaxError(`Can't parse note ${name}`);
        }
    }
    static fromPitchClassAndOctave(pitchClass, octave) {
        let note = Object.create(Note.prototype);
        note.pitchClass = pitchClass;
        note.octave = octave;
        return note;
    }
    /** Canonical name of the note. Flats aren't used (e.g. Bb becomes A#) */
    toString() {
        const noteName = noteNames[this.pitchClass][0];
        return this.octave !== undefined
            ? `${noteName}${this.octave}`
            : noteName;
    }
    /** Adds a non-negative interval in semitones and returns the result */
    addInterval(interval) {
        const pitch = this.pitchClass + interval;
        const octave = this.octave !== undefined
            ? this.octave + Math.floor(pitch / 12)
            : undefined;
        return Note.fromPitchClassAndOctave(pitch % 12, octave); // incorrect for negative intervals
    }
}
exports.Note = Note;


/***/ }),

/***/ "./src/theory/tuning.ts":
/*!******************************!*\
  !*** ./src/theory/tuning.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tuning = exports.getGroup = void 0;
const note_1 = __webpack_require__(/*! ./note */ "./src/theory/note.ts");
const splitRegex = /\s+|(?=[A-Z])/; // split by whitespace or before uppercase letters
/** Returns a row of the fret table (see `getFretboard`) */
function getFrets(openString, allowedPitches, fretCount) {
    const frets = [];
    for (let fretIndex = 0; fretIndex <= fretCount; fretIndex++) {
        const note = openString.addInterval(fretIndex);
        frets.push(allowedPitches.has(note.pitchClass) ? note : null);
    }
    return frets;
}
/**
 * Assigns a group index to a given note based on the chord's root note
 * so that notes inside a single group form a non-inverted chord
 */
function getGroup(rootNote, note) {
    if (note !== null && note.octave !== undefined) {
        return Math.floor((note.octave * 12 + note.pitchClass - rootNote.pitchClass) / 12);
    }
    else {
        return undefined;
    }
}
exports.getGroup = getGroup;
/**
 * Represents the tuning of an instrument.
 * Can contain both absolute-pitched and octave-invariant strings.
 * (Octave-invariant strings are a workaround for octave-doubled strings for now)
 * The order of the strings is top-to-bottom in the instrument's playing position
 * (on the diagram, however, it's bottom-to-top)
 */
class Tuning {
    constructor(description) {
        this.openStrings = description
            .split(splitRegex)
            .filter(n => n !== '')
            .map(n => new note_1.Note(n));
        if (this.openStrings.length === 0) {
            throw new Error('At least one open string required');
        }
        this.description = this.openStrings.join(' ');
    }
    /** Normalized tuning description: flats aren't used, the notes are separated by spaces */
    toString() {
        return `Tuning("${this.description}")`;
    }
    /**
     * Returns the fret table for a given chord as an array of table rows.
     * Each row is an array of cells and represents a string.
     * The order of the rows follows the string order in the tuning description (bottom-to-top on the diagram).
     * A cell represents a fret. 0th cell in a row represents open string.
     * Each cell contains either a note (if the note is in the chord) or `null` (otherwise)
     */
    getFretboard(chord, fretCount = 12) {
        const allowedPitches = chord !== undefined
            ? chord.notes.map(n => n.pitchClass)
            : [];
        return this.openStrings.map(s => getFrets(s, new Set(allowedPitches), fretCount));
    }
}
exports.Tuning = Tuning;


/***/ }),

/***/ "./src/ui/colors.ts":
/*!**************************!*\
  !*** ./src/ui/colors.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getGroupColor = void 0;
const phi = (1 + Math.sqrt(5)) / 2;
const goldenAngle = 2 * Math.PI / (phi * phi);
const lightness = 0.55;
const saturation = 0.65;
/**
 * Generates an OKlab color for a given group index
 * so that all colors have the same lightness and saturation,
 * all groups have different hues,
 * and hues of the neighbor groups contrast well with each other
 */
function getGroupColor(group) {
    const hue = goldenAngle * group;
    const l = lightness * 100;
    const a = saturation * Math.cos(hue) * 100;
    const b = saturation * Math.sin(hue) * 100;
    return `oklab(${l.toFixed(1)}% ${a.toFixed(1)}% ${b.toFixed(1)}%)`;
}
exports.getGroupColor = getGroupColor;


/***/ }),

/***/ "./src/ui/dom.ts":
/*!***********************!*\
  !*** ./src/ui/dom.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createElement = exports.getById = void 0;
/** Generic-typed version of `getElementById` */
function getById(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw Error(`Cannot find element with id '${id}'`);
    }
    return element;
}
exports.getById = getById;
/** Creates an HTML element with the given tag name, properties and (optionally) style */
function createElement(tagName, properties, style) {
    const element = document.createElement(tagName);
    if (properties !== undefined) {
        Object.assign(element, properties);
    }
    if (style !== undefined) {
        Object.assign(element.style, style);
    }
    return element;
}
exports.createElement = createElement;


/***/ }),

/***/ "./src/ui/fretboard.ts":
/*!*****************************!*\
  !*** ./src/ui/fretboard.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFretboardElement = void 0;
const dom_1 = __webpack_require__(/*! ./dom */ "./src/ui/dom.ts");
const tuning_1 = __webpack_require__(/*! ../theory/tuning */ "./src/theory/tuning.ts");
const typography_1 = __webpack_require__(/*! ./typography */ "./src/ui/typography.ts");
const colors_1 = __webpack_require__(/*! ./colors */ "./src/ui/colors.ts");
function getFretHeaderElement(fretCount) {
    const fretHeaderElement = (0, dom_1.createElement)('p', {
        className: 'fretHeader'
    });
    for (const fretIndex of Array(fretCount).keys()) {
        fretHeaderElement.appendChild((0, dom_1.createElement)('span', {
            innerText: fretIndex.toString()
        }));
    }
    return fretHeaderElement;
}
function getFretElement(fretNote, rootNote) {
    const innerText = fretNote !== null
        ? (0, typography_1.applyTypography)(fretNote.toString())
        : '·';
    const group = rootNote !== undefined ? (0, tuning_1.getGroup)(rootNote, fretNote) : undefined;
    const color = group !== undefined ? (0, colors_1.getGroupColor)(group) : undefined;
    return (0, dom_1.createElement)('span', { innerText }, { color });
}
function getFrettedStringElement(frettedString, rootNote) {
    const frettedStringElement = (0, dom_1.createElement)('p');
    for (const fretNote of frettedString) {
        frettedStringElement.appendChild(getFretElement(fretNote, rootNote));
    }
    return frettedStringElement;
}
/** Gets the HTML representation of the fretboard diagram */
function getFretboardElement(fretboard, rootNote) {
    const fretboardElement = (0, dom_1.createElement)('div', { id: 'fretboard' });
    // add fret numbers
    fretboardElement.appendChild(getFretHeaderElement(fretboard[0].length));
    // add strings bottom to top
    for (const frettedString of [...fretboard].reverse()) {
        fretboardElement.appendChild(getFrettedStringElement(frettedString, rootNote));
    }
    return fretboardElement;
}
exports.getFretboardElement = getFretboardElement;


/***/ }),

/***/ "./src/ui/index.ts":
/*!*************************!*\
  !*** ./src/ui/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initialize = void 0;
const chord_1 = __webpack_require__(/*! ../theory/chord */ "./src/theory/chord.ts");
const tuning_1 = __webpack_require__(/*! ../theory/tuning */ "./src/theory/tuning.ts");
const instruments_1 = __webpack_require__(/*! ../theory/instruments */ "./src/theory/instruments.ts");
const dom_1 = __webpack_require__(/*! ./dom */ "./src/ui/dom.ts");
const typography_1 = __webpack_require__(/*! ./typography */ "./src/ui/typography.ts");
const fretboard_1 = __webpack_require__(/*! ./fretboard */ "./src/ui/fretboard.ts");
const model_1 = __webpack_require__(/*! ./model */ "./src/ui/model.ts");
const urlHash_1 = __webpack_require__(/*! ./urlHash */ "./src/ui/urlHash.ts");
// Static page elements
const instrumentElement = (0, dom_1.getById)('instrument');
const tuningElement = (0, dom_1.getById)('tuning');
const fretCountElement = (0, dom_1.getById)('fretCount');
const chordElement = (0, dom_1.getById)('chord');
const chordsDataList = (0, dom_1.getById)('chords');
const statusElement = (0, dom_1.getById)('status');
const outputElement = (0, dom_1.getById)('output');
/** Chords datalist options */
const chordOptions = {};
for (const chord of chord_1.knownChordNames) {
    chordOptions[chord] = (0, dom_1.createElement)('option', { value: chord });
}
/**
 * When the user types in the chord field,
 * this function forms the popup list with suggestions
 */
function populateChordsDatalist(text = '') {
    const normalizedText = text.trim().toLowerCase();
    const exactMatches = chord_1.knownChordNames.filter(c => c.toLowerCase() === normalizedText);
    const beginningMatches = chord_1.knownChordNames.filter(c => c.toLowerCase().startsWith(normalizedText) &&
        !exactMatches.includes(c));
    const substringMatches = chord_1.knownChordNames.filter(c => c.toLowerCase().includes(normalizedText) &&
        !exactMatches.includes(c) &&
        !beginningMatches.includes(c));
    const matches = [...exactMatches, ...beginningMatches, ...substringMatches];
    chordsDataList.replaceChildren(...matches.map(c => chordOptions[c]));
}
/** Populates the instrument drop-down */
function populateInstruments() {
    for (const instrument of Object.keys(instruments_1.instruments)) {
        instrumentElement.appendChild((0, dom_1.createElement)('option', {
            value: instrument,
            innerText: instrument
        }));
    }
}
/** Gets HTML element containing the list of chord's notes */
function getChordDescriptionElement(chord) {
    const notes = (0, typography_1.applyTypography)(chord.notes.join(' '));
    return (0, dom_1.createElement)('p', {
        id: 'chordDescription',
        innerText: `⟨ ${notes} ⟩`
    });
}
/** Gets HTML element containing an error message */
function getErrorElement(message) {
    return (0, dom_1.createElement)('p', {
        id: 'error',
        innerText: message
    });
}
/** Current state of the page */
let model;
/**
 * Displays the current state of the page.
 * The model should be consistent (use `makeConsistent` before calling this)
 */
function displayPage(model) {
    // prevent recursive `onHashChange` calls
    removeEventListener('hashchange', onHashChange);
    const status = [];
    const output = [];
    try {
        const tuning = new tuning_1.Tuning(model.tuningDescription);
        // tuning is valid
        const chordName = model.chordName.trim();
        let chord = undefined;
        if (chordName !== '') {
            try {
                chord = new chord_1.Chord(chordName);
                // chord is valid
                status.push(getChordDescriptionElement(chord));
            }
            catch (error) {
                // chord is invalid
                const message = error instanceof Error ? error.message : `${error}`;
                status.push(getErrorElement(message));
            }
        }
        const fretboard = tuning.getFretboard(chord, model.fretCount);
        output.push((0, fretboard_1.getFretboardElement)(fretboard, chord === null || chord === void 0 ? void 0 : chord.notes[0]));
        if (chord !== undefined || chordName === '') {
            // change url hash only if the tuning is valid and the chord is valid or empty
            (0, urlHash_1.setUrlHash)(model);
        }
    }
    catch (error) {
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
function changeModel(newModel) {
    model = (0, model_1.makeConsistent)(newModel);
    displayPage(model);
}
// Input actions:
function onInstrumentInput() {
    const instrument = instrumentElement.value;
    changeModel(Object.assign(Object.assign({}, model), { instrument, tuningDescription: '' }));
}
function onTuningInput() {
    const tuningDescription = tuningElement.value;
    changeModel(Object.assign(Object.assign({}, model), { tuningDescription, instrument: '' }));
}
function onFretCountInput() {
    const fretCount = parseInt(fretCountElement.value);
    changeModel(Object.assign(Object.assign({}, model), { fretCount }));
}
function onChordInput(e) {
    const chordName = chordElement.value;
    if (e instanceof InputEvent && e.inputType !== 'insertReplacementText') {
        populateChordsDatalist(chordName);
    }
    changeModel(Object.assign(Object.assign({}, model), { chordName }));
}
function onHashChange() {
    changeModel((0, urlHash_1.getUrlHash)());
    populateChordsDatalist(model.chordName);
}
// Entry point
function initialize() {
    populateInstruments();
    onHashChange();
    addEventListener('hashchange', onHashChange);
    instrumentElement.addEventListener('input', onInstrumentInput);
    tuningElement.addEventListener('input', onTuningInput);
    fretCountElement.addEventListener('input', onFretCountInput);
    chordElement.addEventListener('input', onChordInput);
    chordElement.focus();
}
exports.initialize = initialize;


/***/ }),

/***/ "./src/ui/model.ts":
/*!*************************!*\
  !*** ./src/ui/model.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.makeConsistent = exports.defaultModel = exports.maxFretCount = void 0;
const instruments_1 = __webpack_require__(/*! ../theory/instruments */ "./src/theory/instruments.ts");
const tuning_1 = __webpack_require__(/*! ../theory/tuning */ "./src/theory/tuning.ts");
exports.maxFretCount = 36;
/** The values used when the page is open without a URL hash */
exports.defaultModel = {
    instrument: 'Ukulele (high G)',
    tuningDescription: 'G4 C4 E4 A4',
    fretCount: 12,
    chordName: '',
};
/**
 * Changes the model so that its values are consistent and returns the result.
 * The values don't have to be valid though (e.g. invalid tuning or chord are OK,
 * but a valid tuning with a wrong instrument is not).
 * Should be called before displaying the page
 */
function makeConsistent(model) {
    var _a;
    // fretCount should be an integer between 0 and maxFretCount
    const fretCount = Math.max(0, Math.min(exports.maxFretCount, Math.round(model.fretCount)));
    model = Object.assign(Object.assign({}, model), { fretCount });
    const instrumentTuning = (_a = instruments_1.instruments[model.instrument]) === null || _a === void 0 ? void 0 : _a.description;
    try {
        const tuning = new tuning_1.Tuning(model.tuningDescription).description;
        if (tuning !== instrumentTuning) {
            // if tuning is valid and differs from instrument's, change the instrument
            const instrument = instruments_1.instrumentByTuning[tuning] || '';
            return Object.assign(Object.assign({}, model), { instrument });
        }
    }
    catch (_b) { }
    if (instrumentTuning) {
        // If tuning is invalid and instrument is valid, change the tuning
        return Object.assign(Object.assign({}, model), { tuningDescription: instrumentTuning });
    }
    else {
        // If instrument is invalid, change it to ''
        return Object.assign(Object.assign({}, model), { instrument: '' });
    }
}
exports.makeConsistent = makeConsistent;


/***/ }),

/***/ "./src/ui/typography.ts":
/*!******************************!*\
  !*** ./src/ui/typography.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.applyTypography = void 0;
const characterDict = {
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
/**
 * Replaces easy-to-type ASCII characters
 * for accidentals and octave numbers
 * with good-looking Unicode ones
 */
function applyTypography(text) {
    return text.replace(replaceRegex, c => characterDict[c]);
}
exports.applyTypography = applyTypography;


/***/ }),

/***/ "./src/ui/urlHash.ts":
/*!***************************!*\
  !*** ./src/ui/urlHash.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUrlHash = exports.setUrlHash = void 0;
const model_1 = __webpack_require__(/*! ./model */ "./src/ui/model.ts");
const formatVersion = 0;
/**
 * Encodes the model into the page's URL hash part.
 * This allows the user to share links to specific tunings and chords.
 */
function setUrlHash(model) {
    const tuningDescription = model.tuningDescription.trim().replace(/\s+/g, '-');
    const chordName = model.chordName.trim();
    const hash = `${formatVersion}|${tuningDescription}|${model.fretCount}|${chordName}`;
    window.location.hash = hash;
}
exports.setUrlHash = setUrlHash;
/**
 * Reads the model from the page's URL hash part.
 * Note: the instrument is not saved in the hash (for the sake of brevity)
 * so it can be chosen incorrectly when multiple instruments share the same tuning
 */
function getUrlHash() {
    try {
        const text = decodeURI(window.location.hash.replace(/#/, ''));
        const parts = text.split('|');
        if (parseInt(parts[0]) === formatVersion) {
            const tuningDescription = parts[1].replace(/-/g, ' ');
            const fretCount = parseInt(parts[2]);
            const chordName = parts[3];
            return { instrument: '', tuningDescription, fretCount, chordName };
        }
    }
    catch (_a) { }
    return model_1.defaultModel;
}
exports.getUrlHash = getUrlHash;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const ui_1 = __webpack_require__(/*! ./ui */ "./src/ui/index.ts");
(0, ui_1.initialize)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGtDQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsY0FBYyxHQUFHLGtCQUFrQixHQUFHLGdCQUFnQixHQUFHLFVBQVU7QUFDdkY7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7O1VDbkNsQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGFBQWEsbUJBQU8sQ0FBQywrQkFBTTtBQUMzQiIsInNvdXJjZXMiOlsid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L2Nob3JkLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L2luc3RydW1lbnRzLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L25vdGUudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy90aGVvcnkvdHVuaW5nLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvY29sb3JzLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvZG9tLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvZnJldGJvYXJkLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9tb2RlbC50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL3R5cG9ncmFwaHkudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS91cmxIYXNoLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2hvcmQgPSBleHBvcnRzLmtub3duQ2hvcmROYW1lcyA9IHZvaWQgMDtcbmNvbnN0IG5vdGVfMSA9IHJlcXVpcmUoXCIuL25vdGVcIik7XG4vLyBJbnRlcnZhbHMgaW4gc2VtaXRvbmVzOlxuY29uc3QgW1AxLCBtMiwgTTIsIG0zLCBNMywgUDQsIEE0LCBQNSwgbTYsIE02LCBtNywgTTddID0gQXJyYXkoMTIpLmtleXMoKTtcbmNvbnN0IHN1ZmZpeE1lYW5pbmdzID0ge1xuICAgICdtKG5vNSknOiBbUDEsIG0zXSxcbiAgICAnKG5vNSknOiBbUDEsIE0zXSxcbiAgICAnNSc6IFtQMSwgUDVdLFxuICAgICdkaW0nOiBbUDEsIG0zLCBBNF0sXG4gICAgJ3N1czInOiBbUDEsIE0yLCBQNV0sXG4gICAgJ20nOiBbUDEsIG0zLCBQNV0sXG4gICAgJyc6IFtQMSwgTTMsIFA1XSxcbiAgICAnc3VzNCc6IFtQMSwgUDQsIFA1XSxcbiAgICAnYXVnJzogW1AxLCBNMywgbTZdLFxuICAgICdtNic6IFtQMSwgbTMsIFA1LCBNNl0sXG4gICAgJzYnOiBbUDEsIE0zLCBQNSwgTTZdLFxuICAgICdtNyc6IFtQMSwgbTMsIFA1LCBtN10sXG4gICAgJ21NNyc6IFtQMSwgbTMsIFA1LCBNN10sXG4gICAgJzcnOiBbUDEsIE0zLCBQNSwgbTddLFxuICAgICdNNyc6IFtQMSwgTTMsIFA1LCBNN10sXG59O1xuY29uc3Qga25vd25TdWZmaXhlcyA9IE9iamVjdC5rZXlzKHN1ZmZpeE1lYW5pbmdzKTtcbmtub3duU3VmZml4ZXMuc29ydCgpO1xuLyoqIExpc3Qgb2YgYWxsIHZhbGlkIGNob3JkIG5hbWVzLCB1c2VkIGluIHRoZSBjaG9yZCBwb3B1cCAqL1xuZXhwb3J0cy5rbm93bkNob3JkTmFtZXMgPSBbXTtcbmZvciAoY29uc3Qgbm90ZSBvZiBub3RlXzEua25vd25Ob3RlTmFtZXMpIHtcbiAgICBmb3IgKGNvbnN0IHN1ZmZpeCBvZiBrbm93blN1ZmZpeGVzKSB7XG4gICAgICAgIGV4cG9ydHMua25vd25DaG9yZE5hbWVzLnB1c2gobm90ZSArIHN1ZmZpeCk7XG4gICAgfVxufVxuY29uc3QgY2hvcmRSZWdleCA9IG5ldyBSZWdFeHAoYF4oJHtub3RlXzEubm90ZU5hbWVQYXR0ZXJufSkoLiopJGApO1xuY2xhc3MgQ2hvcmQge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBuYW1lLm1hdGNoKGNob3JkUmVnZXgpO1xuICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYENhbid0IHBhcnNlIGNob3JkICR7bmFtZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbXywgcm9vdE5hbWUsIHN1ZmZpeF0gPSBtYXRjaDtcbiAgICAgICAgY29uc3Qgcm9vdCA9IG5ldyBub3RlXzEuTm90ZShyb290TmFtZSk7XG4gICAgICAgIGlmICghKHN1ZmZpeCBpbiBzdWZmaXhNZWFuaW5ncykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgQ2FuJ3QgcGFyc2UgY2hvcmQgc3VmZml4ICR7c3VmZml4fWApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm90ZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBpbnRlcnZhbCBvZiBzdWZmaXhNZWFuaW5nc1tzdWZmaXhdKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGVzLnB1c2gocm9vdC5hZGRJbnRlcnZhbChpbnRlcnZhbCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSA9IDwke3RoaXMubm90ZXMuam9pbignICcpfT5gO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2hvcmQgPSBDaG9yZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmcgPSBleHBvcnRzLmluc3RydW1lbnRzID0gdm9pZCAwO1xuY29uc3QgdHVuaW5nXzEgPSByZXF1aXJlKFwiLi90dW5pbmdcIik7XG5leHBvcnRzLmluc3RydW1lbnRzID0ge1xuICAgICdCYWxhbGFpa2EgKGFjYWRlbWljKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0U0IEU0IEE0JyksXG4gICAgJ0JhbGFsYWlrYSAoZm9sayknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDNCBFNCBHNCcpLFxuICAgICdCYW5qbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEQzIEczIEIzIEQ0JyksXG4gICAgJ0Jhc3MnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFMSBBMSBEMiBHMicpLFxuICAgICdCcmFndWluaGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBCNCBENScpLFxuICAgICdDaGFyYW5nbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEM1IEUgQTQgRTUnKSxcbiAgICAnQ2F2YXF1aW5obyAoUG9ydHVnYWwgR0dCRCknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBHNCBCNCBENScpLFxuICAgICdDYXZhcXVpbmhvIChQb3J0dWdhbCBEQUJFKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q1IEE0IEI0IEU1JyksXG4gICAgJ0NhdmFxdWluaG8gKEJyYXppbCBER0JEKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEI0IEQ1JyksXG4gICAgJ0NhdmFxdWluaG8gKEJyYXppbCBER0JFKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEI0IEU1JyksXG4gICAgJ0RhbGEgZmFlbmR5cic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0U0IEE0IEU1JyksXG4gICAgJ0RlY2hpZyBwb25kYXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDNCBENCBHNCcpLFxuICAgICdHdWl0YWxlbGUnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMiBEMyBHMyBDNCBFNCBBNCcpLFxuICAgICdHdWl0YXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFMiBBMiBEMyBHMyBCMyBFNCcpLFxuICAgICdHdWl0YXJyw7NuJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTEgRDIgRzIgQzMgRTMgQTInKSxcbiAgICAnSmFyYW5hIGphcm9jaGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBDNCBFIEEzIEczJyksXG4gICAgJ0phcmFuYSBodWFzdGVjYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEIzIEQ0IEYjNCBBNCcpLFxuICAgICdNYW5kb2xpbic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEQ0IEE0IEU1JyksXG4gICAgJ1JhamFvJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQzQgRTQgQTQnKSxcbiAgICAnUmVxdWludG8nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMiBEMyBHMyBDNCBFNCBBNCcpLFxuICAgICdTZW1pc3RydW5rYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0QyIEcyIEIyIEQzIEczIEIzIEQ0JyksXG4gICAgJ1Rlbm9yIGd1aXRhcic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0MzIEczIEQ0IEE0JyksXG4gICAgJ1RpbXBsZSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEM1IEU0IEE0IEQ1JyksXG4gICAgJ1VrdWxlbGUgKGhpZ2ggRyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBDNCBFNCBBNCcpLFxuICAgICdVa3VsZWxlIChsb3cgRyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBDNCBFNCBBNCcpLFxuICAgICdVa3VsZWxlIChiYXJpdG9uZSknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdEMyBHMyBCMyBFNCcpLFxuICAgICdWaWh1ZWxhJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTMgRDQgRzQgQjMgRTQnKSxcbiAgICAnVmlvbGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDMyBHMyBENCBBNCcpLFxuICAgICdWaW9saW4nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBENCBBNCBFNScpLFxufTtcbi8qKiBHZXRzIHRoZSBmaXJzdCBpbnN0cnVtZW50IHdpdGggdGhlIGdpdmVuIHR1bmluZyAqL1xuZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmcgPSB7fTtcbmZvciAoY29uc3QgW25hbWUsIHR1bmluZ10gb2YgT2JqZWN0LmVudHJpZXMoZXhwb3J0cy5pbnN0cnVtZW50cykpIHtcbiAgICBpZiAoISh0dW5pbmcuZGVzY3JpcHRpb24gaW4gZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmcpKSB7XG4gICAgICAgIGV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nW3R1bmluZy5kZXNjcmlwdGlvbl0gPSBuYW1lO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Ob3RlID0gZXhwb3J0cy5ub3RlTmFtZVBhdHRlcm4gPSBleHBvcnRzLmtub3duTm90ZU5hbWVzID0gdm9pZCAwO1xuLyoqIDEyZWRvIG5vdGVzLiBBIG5vdGUgY2FuIGhhdmUgb25lIG9yIHR3byBuYW1lcyAqL1xuY29uc3Qgbm90ZU5hbWVzID0gW1xuICAgIFsnQyddLCBbJ0MjJywgJ0RiJ10sXG4gICAgWydEJ10sIFsnRCMnLCAnRWInXSxcbiAgICBbJ0UnXSxcbiAgICBbJ0YnXSwgWydGIycsICdHYiddLFxuICAgIFsnRyddLCBbJ0cjJywgJ0FiJ10sXG4gICAgWydBJ10sIFsnQSMnLCAnQmInXSxcbiAgICBbJ0InXSxcbl07XG5jb25zdCB1bnN1cHBvcnRlZCA9IHtcbiAgICAnQ2InOiAnQicsXG4gICAgJ0IjJzogJ0MnLFxuICAgICdGYic6ICdFJyxcbiAgICAnRSMnOiAnRicsXG59O1xuY29uc3Qgbm90ZUluZGV4QnlOYW1lID0ge307XG5mb3IgKGNvbnN0IFtpbmRleCwgbmFtZXNdIG9mIG5vdGVOYW1lcy5lbnRyaWVzKCkpIHtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgbmFtZXMpIHtcbiAgICAgICAgbm90ZUluZGV4QnlOYW1lW25hbWVdID0gaW5kZXg7XG4gICAgfVxufVxuLyoqXG4gKiBMaXN0IG9mIGFsbCB2YWxpZCBub3RlIG5hbWVzIGluIGFscGhhYmV0aWNhbCBvcmRlclxuICogWydBJywgJ0EjJywgJ0FiJywgJ0InLCAuLi4sICdHYiddXG4gKiBVc2VkIGluIHRoZSBjaG9yZCBwb3B1cFxuICovXG5leHBvcnRzLmtub3duTm90ZU5hbWVzID0gT2JqZWN0LmtleXMobm90ZUluZGV4QnlOYW1lKTtcbmV4cG9ydHMua25vd25Ob3RlTmFtZXMuc29ydCgpO1xuZXhwb3J0cy5ub3RlTmFtZVBhdHRlcm4gPSAnW0EtR11bI2JdPyc7IC8vIHVzZWQgYnkgY2hvcmQudHNcbmNvbnN0IG5vdGVSZWdleCA9IG5ldyBSZWdFeHAoYF4oJHtleHBvcnRzLm5vdGVOYW1lUGF0dGVybn0pKFxcXFxkKT8kYCk7XG4vKiogUmVwcmVzZW50cyBlaXRoZXIgYW4gYWJzb2x1dGUtcGl0Y2hlZCBub3RlIG9yIGFuIG9jdGF2ZS1pbnZhcmlhbnQgbm90ZSAqL1xuY2xhc3MgTm90ZSB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICBjb25zdCBtYXRjaCA9IG5hbWUubWF0Y2gobm90ZVJlZ2V4KTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBjb25zdCBbXywgbm90ZU5hbWUsIG9jdGF2ZU5hbWVdID0gbWF0Y2g7XG4gICAgICAgICAgICBpZiAobm90ZU5hbWUgaW4gdW5zdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWdnZXN0aW9uID0gdW5zdXBwb3J0ZWRbbm90ZU5hbWVdO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVXNlICR7c3VnZ2VzdGlvbn0gaW5zdGVhZCBvZiAke25vdGVOYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5waXRjaENsYXNzID0gbm90ZUluZGV4QnlOYW1lW25vdGVOYW1lXTtcbiAgICAgICAgICAgIHRoaXMub2N0YXZlID0gb2N0YXZlTmFtZSAhPT0gdW5kZWZpbmVkID8gcGFyc2VJbnQob2N0YXZlTmFtZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYENhbid0IHBhcnNlIG5vdGUgJHtuYW1lfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tUGl0Y2hDbGFzc0FuZE9jdGF2ZShwaXRjaENsYXNzLCBvY3RhdmUpIHtcbiAgICAgICAgbGV0IG5vdGUgPSBPYmplY3QuY3JlYXRlKE5vdGUucHJvdG90eXBlKTtcbiAgICAgICAgbm90ZS5waXRjaENsYXNzID0gcGl0Y2hDbGFzcztcbiAgICAgICAgbm90ZS5vY3RhdmUgPSBvY3RhdmU7XG4gICAgICAgIHJldHVybiBub3RlO1xuICAgIH1cbiAgICAvKiogQ2Fub25pY2FsIG5hbWUgb2YgdGhlIG5vdGUuIEZsYXRzIGFyZW4ndCB1c2VkIChlLmcuIEJiIGJlY29tZXMgQSMpICovXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIGNvbnN0IG5vdGVOYW1lID0gbm90ZU5hbWVzW3RoaXMucGl0Y2hDbGFzc11bMF07XG4gICAgICAgIHJldHVybiB0aGlzLm9jdGF2ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGAke25vdGVOYW1lfSR7dGhpcy5vY3RhdmV9YFxuICAgICAgICAgICAgOiBub3RlTmFtZTtcbiAgICB9XG4gICAgLyoqIEFkZHMgYSBub24tbmVnYXRpdmUgaW50ZXJ2YWwgaW4gc2VtaXRvbmVzIGFuZCByZXR1cm5zIHRoZSByZXN1bHQgKi9cbiAgICBhZGRJbnRlcnZhbChpbnRlcnZhbCkge1xuICAgICAgICBjb25zdCBwaXRjaCA9IHRoaXMucGl0Y2hDbGFzcyArIGludGVydmFsO1xuICAgICAgICBjb25zdCBvY3RhdmUgPSB0aGlzLm9jdGF2ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHRoaXMub2N0YXZlICsgTWF0aC5mbG9vcihwaXRjaCAvIDEyKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBOb3RlLmZyb21QaXRjaENsYXNzQW5kT2N0YXZlKHBpdGNoICUgMTIsIG9jdGF2ZSk7IC8vIGluY29ycmVjdCBmb3IgbmVnYXRpdmUgaW50ZXJ2YWxzXG4gICAgfVxufVxuZXhwb3J0cy5Ob3RlID0gTm90ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UdW5pbmcgPSBleHBvcnRzLmdldEdyb3VwID0gdm9pZCAwO1xuY29uc3Qgbm90ZV8xID0gcmVxdWlyZShcIi4vbm90ZVwiKTtcbmNvbnN0IHNwbGl0UmVnZXggPSAvXFxzK3woPz1bQS1aXSkvOyAvLyBzcGxpdCBieSB3aGl0ZXNwYWNlIG9yIGJlZm9yZSB1cHBlcmNhc2UgbGV0dGVyc1xuLyoqIFJldHVybnMgYSByb3cgb2YgdGhlIGZyZXQgdGFibGUgKHNlZSBgZ2V0RnJldGJvYXJkYCkgKi9cbmZ1bmN0aW9uIGdldEZyZXRzKG9wZW5TdHJpbmcsIGFsbG93ZWRQaXRjaGVzLCBmcmV0Q291bnQpIHtcbiAgICBjb25zdCBmcmV0cyA9IFtdO1xuICAgIGZvciAobGV0IGZyZXRJbmRleCA9IDA7IGZyZXRJbmRleCA8PSBmcmV0Q291bnQ7IGZyZXRJbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IG5vdGUgPSBvcGVuU3RyaW5nLmFkZEludGVydmFsKGZyZXRJbmRleCk7XG4gICAgICAgIGZyZXRzLnB1c2goYWxsb3dlZFBpdGNoZXMuaGFzKG5vdGUucGl0Y2hDbGFzcykgPyBub3RlIDogbnVsbCk7XG4gICAgfVxuICAgIHJldHVybiBmcmV0cztcbn1cbi8qKlxuICogQXNzaWducyBhIGdyb3VwIGluZGV4IHRvIGEgZ2l2ZW4gbm90ZSBiYXNlZCBvbiB0aGUgY2hvcmQncyByb290IG5vdGVcbiAqIHNvIHRoYXQgbm90ZXMgaW5zaWRlIGEgc2luZ2xlIGdyb3VwIGZvcm0gYSBub24taW52ZXJ0ZWQgY2hvcmRcbiAqL1xuZnVuY3Rpb24gZ2V0R3JvdXAocm9vdE5vdGUsIG5vdGUpIHtcbiAgICBpZiAobm90ZSAhPT0gbnVsbCAmJiBub3RlLm9jdGF2ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKChub3RlLm9jdGF2ZSAqIDEyICsgbm90ZS5waXRjaENsYXNzIC0gcm9vdE5vdGUucGl0Y2hDbGFzcykgLyAxMik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0R3JvdXAgPSBnZXRHcm91cDtcbi8qKlxuICogUmVwcmVzZW50cyB0aGUgdHVuaW5nIG9mIGFuIGluc3RydW1lbnQuXG4gKiBDYW4gY29udGFpbiBib3RoIGFic29sdXRlLXBpdGNoZWQgYW5kIG9jdGF2ZS1pbnZhcmlhbnQgc3RyaW5ncy5cbiAqIChPY3RhdmUtaW52YXJpYW50IHN0cmluZ3MgYXJlIGEgd29ya2Fyb3VuZCBmb3Igb2N0YXZlLWRvdWJsZWQgc3RyaW5ncyBmb3Igbm93KVxuICogVGhlIG9yZGVyIG9mIHRoZSBzdHJpbmdzIGlzIHRvcC10by1ib3R0b20gaW4gdGhlIGluc3RydW1lbnQncyBwbGF5aW5nIHBvc2l0aW9uXG4gKiAob24gdGhlIGRpYWdyYW0sIGhvd2V2ZXIsIGl0J3MgYm90dG9tLXRvLXRvcClcbiAqL1xuY2xhc3MgVHVuaW5nIHtcbiAgICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLm9wZW5TdHJpbmdzID0gZGVzY3JpcHRpb25cbiAgICAgICAgICAgIC5zcGxpdChzcGxpdFJlZ2V4KVxuICAgICAgICAgICAgLmZpbHRlcihuID0+IG4gIT09ICcnKVxuICAgICAgICAgICAgLm1hcChuID0+IG5ldyBub3RlXzEuTm90ZShuKSk7XG4gICAgICAgIGlmICh0aGlzLm9wZW5TdHJpbmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdCBsZWFzdCBvbmUgb3BlbiBzdHJpbmcgcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5vcGVuU3RyaW5ncy5qb2luKCcgJyk7XG4gICAgfVxuICAgIC8qKiBOb3JtYWxpemVkIHR1bmluZyBkZXNjcmlwdGlvbjogZmxhdHMgYXJlbid0IHVzZWQsIHRoZSBub3RlcyBhcmUgc2VwYXJhdGVkIGJ5IHNwYWNlcyAqL1xuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYFR1bmluZyhcIiR7dGhpcy5kZXNjcmlwdGlvbn1cIilgO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBmcmV0IHRhYmxlIGZvciBhIGdpdmVuIGNob3JkIGFzIGFuIGFycmF5IG9mIHRhYmxlIHJvd3MuXG4gICAgICogRWFjaCByb3cgaXMgYW4gYXJyYXkgb2YgY2VsbHMgYW5kIHJlcHJlc2VudHMgYSBzdHJpbmcuXG4gICAgICogVGhlIG9yZGVyIG9mIHRoZSByb3dzIGZvbGxvd3MgdGhlIHN0cmluZyBvcmRlciBpbiB0aGUgdHVuaW5nIGRlc2NyaXB0aW9uIChib3R0b20tdG8tdG9wIG9uIHRoZSBkaWFncmFtKS5cbiAgICAgKiBBIGNlbGwgcmVwcmVzZW50cyBhIGZyZXQuIDB0aCBjZWxsIGluIGEgcm93IHJlcHJlc2VudHMgb3BlbiBzdHJpbmcuXG4gICAgICogRWFjaCBjZWxsIGNvbnRhaW5zIGVpdGhlciBhIG5vdGUgKGlmIHRoZSBub3RlIGlzIGluIHRoZSBjaG9yZCkgb3IgYG51bGxgIChvdGhlcndpc2UpXG4gICAgICovXG4gICAgZ2V0RnJldGJvYXJkKGNob3JkLCBmcmV0Q291bnQgPSAxMikge1xuICAgICAgICBjb25zdCBhbGxvd2VkUGl0Y2hlcyA9IGNob3JkICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gY2hvcmQubm90ZXMubWFwKG4gPT4gbi5waXRjaENsYXNzKVxuICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXMub3BlblN0cmluZ3MubWFwKHMgPT4gZ2V0RnJldHMocywgbmV3IFNldChhbGxvd2VkUGl0Y2hlcyksIGZyZXRDb3VudCkpO1xuICAgIH1cbn1cbmV4cG9ydHMuVHVuaW5nID0gVHVuaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldEdyb3VwQ29sb3IgPSB2b2lkIDA7XG5jb25zdCBwaGkgPSAoMSArIE1hdGguc3FydCg1KSkgLyAyO1xuY29uc3QgZ29sZGVuQW5nbGUgPSAyICogTWF0aC5QSSAvIChwaGkgKiBwaGkpO1xuY29uc3QgbGlnaHRuZXNzID0gMC41NTtcbmNvbnN0IHNhdHVyYXRpb24gPSAwLjY1O1xuLyoqXG4gKiBHZW5lcmF0ZXMgYW4gT0tsYWIgY29sb3IgZm9yIGEgZ2l2ZW4gZ3JvdXAgaW5kZXhcbiAqIHNvIHRoYXQgYWxsIGNvbG9ycyBoYXZlIHRoZSBzYW1lIGxpZ2h0bmVzcyBhbmQgc2F0dXJhdGlvbixcbiAqIGFsbCBncm91cHMgaGF2ZSBkaWZmZXJlbnQgaHVlcyxcbiAqIGFuZCBodWVzIG9mIHRoZSBuZWlnaGJvciBncm91cHMgY29udHJhc3Qgd2VsbCB3aXRoIGVhY2ggb3RoZXJcbiAqL1xuZnVuY3Rpb24gZ2V0R3JvdXBDb2xvcihncm91cCkge1xuICAgIGNvbnN0IGh1ZSA9IGdvbGRlbkFuZ2xlICogZ3JvdXA7XG4gICAgY29uc3QgbCA9IGxpZ2h0bmVzcyAqIDEwMDtcbiAgICBjb25zdCBhID0gc2F0dXJhdGlvbiAqIE1hdGguY29zKGh1ZSkgKiAxMDA7XG4gICAgY29uc3QgYiA9IHNhdHVyYXRpb24gKiBNYXRoLnNpbihodWUpICogMTAwO1xuICAgIHJldHVybiBgb2tsYWIoJHtsLnRvRml4ZWQoMSl9JSAke2EudG9GaXhlZCgxKX0lICR7Yi50b0ZpeGVkKDEpfSUpYDtcbn1cbmV4cG9ydHMuZ2V0R3JvdXBDb2xvciA9IGdldEdyb3VwQ29sb3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGV4cG9ydHMuZ2V0QnlJZCA9IHZvaWQgMDtcbi8qKiBHZW5lcmljLXR5cGVkIHZlcnNpb24gb2YgYGdldEVsZW1lbnRCeUlkYCAqL1xuZnVuY3Rpb24gZ2V0QnlJZChpZCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHRocm93IEVycm9yKGBDYW5ub3QgZmluZCBlbGVtZW50IHdpdGggaWQgJyR7aWR9J2ApO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbmV4cG9ydHMuZ2V0QnlJZCA9IGdldEJ5SWQ7XG4vKiogQ3JlYXRlcyBhbiBIVE1MIGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gdGFnIG5hbWUsIHByb3BlcnRpZXMgYW5kIChvcHRpb25hbGx5KSBzdHlsZSAqL1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBwcm9wZXJ0aWVzLCBzdHlsZSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgIGlmIChwcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LCBwcm9wZXJ0aWVzKTtcbiAgICB9XG4gICAgaWYgKHN0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCBzdHlsZSk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xufVxuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRGcmV0Ym9hcmRFbGVtZW50ID0gdm9pZCAwO1xuY29uc3QgZG9tXzEgPSByZXF1aXJlKFwiLi9kb21cIik7XG5jb25zdCB0dW5pbmdfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvdHVuaW5nXCIpO1xuY29uc3QgdHlwb2dyYXBoeV8xID0gcmVxdWlyZShcIi4vdHlwb2dyYXBoeVwiKTtcbmNvbnN0IGNvbG9yc18xID0gcmVxdWlyZShcIi4vY29sb3JzXCIpO1xuZnVuY3Rpb24gZ2V0RnJldEhlYWRlckVsZW1lbnQoZnJldENvdW50KSB7XG4gICAgY29uc3QgZnJldEhlYWRlckVsZW1lbnQgPSAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3AnLCB7XG4gICAgICAgIGNsYXNzTmFtZTogJ2ZyZXRIZWFkZXInXG4gICAgfSk7XG4gICAgZm9yIChjb25zdCBmcmV0SW5kZXggb2YgQXJyYXkoZnJldENvdW50KS5rZXlzKCkpIHtcbiAgICAgICAgZnJldEhlYWRlckVsZW1lbnQuYXBwZW5kQ2hpbGQoKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdzcGFuJywge1xuICAgICAgICAgICAgaW5uZXJUZXh0OiBmcmV0SW5kZXgudG9TdHJpbmcoKVxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiBmcmV0SGVhZGVyRWxlbWVudDtcbn1cbmZ1bmN0aW9uIGdldEZyZXRFbGVtZW50KGZyZXROb3RlLCByb290Tm90ZSkge1xuICAgIGNvbnN0IGlubmVyVGV4dCA9IGZyZXROb3RlICE9PSBudWxsXG4gICAgICAgID8gKDAsIHR5cG9ncmFwaHlfMS5hcHBseVR5cG9ncmFwaHkpKGZyZXROb3RlLnRvU3RyaW5nKCkpXG4gICAgICAgIDogJ8K3JztcbiAgICBjb25zdCBncm91cCA9IHJvb3ROb3RlICE9PSB1bmRlZmluZWQgPyAoMCwgdHVuaW5nXzEuZ2V0R3JvdXApKHJvb3ROb3RlLCBmcmV0Tm90ZSkgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgY29sb3IgPSBncm91cCAhPT0gdW5kZWZpbmVkID8gKDAsIGNvbG9yc18xLmdldEdyb3VwQ29sb3IpKGdyb3VwKSA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdzcGFuJywgeyBpbm5lclRleHQgfSwgeyBjb2xvciB9KTtcbn1cbmZ1bmN0aW9uIGdldEZyZXR0ZWRTdHJpbmdFbGVtZW50KGZyZXR0ZWRTdHJpbmcsIHJvb3ROb3RlKSB7XG4gICAgY29uc3QgZnJldHRlZFN0cmluZ0VsZW1lbnQgPSAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3AnKTtcbiAgICBmb3IgKGNvbnN0IGZyZXROb3RlIG9mIGZyZXR0ZWRTdHJpbmcpIHtcbiAgICAgICAgZnJldHRlZFN0cmluZ0VsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0RnJldEVsZW1lbnQoZnJldE5vdGUsIHJvb3ROb3RlKSk7XG4gICAgfVxuICAgIHJldHVybiBmcmV0dGVkU3RyaW5nRWxlbWVudDtcbn1cbi8qKiBHZXRzIHRoZSBIVE1MIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBmcmV0Ym9hcmQgZGlhZ3JhbSAqL1xuZnVuY3Rpb24gZ2V0RnJldGJvYXJkRWxlbWVudChmcmV0Ym9hcmQsIHJvb3ROb3RlKSB7XG4gICAgY29uc3QgZnJldGJvYXJkRWxlbWVudCA9ICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnZGl2JywgeyBpZDogJ2ZyZXRib2FyZCcgfSk7XG4gICAgLy8gYWRkIGZyZXQgbnVtYmVyc1xuICAgIGZyZXRib2FyZEVsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0RnJldEhlYWRlckVsZW1lbnQoZnJldGJvYXJkWzBdLmxlbmd0aCkpO1xuICAgIC8vIGFkZCBzdHJpbmdzIGJvdHRvbSB0byB0b3BcbiAgICBmb3IgKGNvbnN0IGZyZXR0ZWRTdHJpbmcgb2YgWy4uLmZyZXRib2FyZF0ucmV2ZXJzZSgpKSB7XG4gICAgICAgIGZyZXRib2FyZEVsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0RnJldHRlZFN0cmluZ0VsZW1lbnQoZnJldHRlZFN0cmluZywgcm9vdE5vdGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXRib2FyZEVsZW1lbnQ7XG59XG5leHBvcnRzLmdldEZyZXRib2FyZEVsZW1lbnQgPSBnZXRGcmV0Ym9hcmRFbGVtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemUgPSB2b2lkIDA7XG5jb25zdCBjaG9yZF8xID0gcmVxdWlyZShcIi4uL3RoZW9yeS9jaG9yZFwiKTtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS90dW5pbmdcIik7XG5jb25zdCBpbnN0cnVtZW50c18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS9pbnN0cnVtZW50c1wiKTtcbmNvbnN0IGRvbV8xID0gcmVxdWlyZShcIi4vZG9tXCIpO1xuY29uc3QgdHlwb2dyYXBoeV8xID0gcmVxdWlyZShcIi4vdHlwb2dyYXBoeVwiKTtcbmNvbnN0IGZyZXRib2FyZF8xID0gcmVxdWlyZShcIi4vZnJldGJvYXJkXCIpO1xuY29uc3QgbW9kZWxfMSA9IHJlcXVpcmUoXCIuL21vZGVsXCIpO1xuY29uc3QgdXJsSGFzaF8xID0gcmVxdWlyZShcIi4vdXJsSGFzaFwiKTtcbi8vIFN0YXRpYyBwYWdlIGVsZW1lbnRzXG5jb25zdCBpbnN0cnVtZW50RWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnaW5zdHJ1bWVudCcpO1xuY29uc3QgdHVuaW5nRWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgndHVuaW5nJyk7XG5jb25zdCBmcmV0Q291bnRFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdmcmV0Q291bnQnKTtcbmNvbnN0IGNob3JkRWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnY2hvcmQnKTtcbmNvbnN0IGNob3Jkc0RhdGFMaXN0ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdjaG9yZHMnKTtcbmNvbnN0IHN0YXR1c0VsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ3N0YXR1cycpO1xuY29uc3Qgb3V0cHV0RWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnb3V0cHV0Jyk7XG4vKiogQ2hvcmRzIGRhdGFsaXN0IG9wdGlvbnMgKi9cbmNvbnN0IGNob3JkT3B0aW9ucyA9IHt9O1xuZm9yIChjb25zdCBjaG9yZCBvZiBjaG9yZF8xLmtub3duQ2hvcmROYW1lcykge1xuICAgIGNob3JkT3B0aW9uc1tjaG9yZF0gPSAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ29wdGlvbicsIHsgdmFsdWU6IGNob3JkIH0pO1xufVxuLyoqXG4gKiBXaGVuIHRoZSB1c2VyIHR5cGVzIGluIHRoZSBjaG9yZCBmaWVsZCxcbiAqIHRoaXMgZnVuY3Rpb24gZm9ybXMgdGhlIHBvcHVwIGxpc3Qgd2l0aCBzdWdnZXN0aW9uc1xuICovXG5mdW5jdGlvbiBwb3B1bGF0ZUNob3Jkc0RhdGFsaXN0KHRleHQgPSAnJykge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRUZXh0ID0gdGV4dC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBleGFjdE1hdGNoZXMgPSBjaG9yZF8xLmtub3duQ2hvcmROYW1lcy5maWx0ZXIoYyA9PiBjLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRUZXh0KTtcbiAgICBjb25zdCBiZWdpbm5pbmdNYXRjaGVzID0gY2hvcmRfMS5rbm93bkNob3JkTmFtZXMuZmlsdGVyKGMgPT4gYy50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgobm9ybWFsaXplZFRleHQpICYmXG4gICAgICAgICFleGFjdE1hdGNoZXMuaW5jbHVkZXMoYykpO1xuICAgIGNvbnN0IHN1YnN0cmluZ01hdGNoZXMgPSBjaG9yZF8xLmtub3duQ2hvcmROYW1lcy5maWx0ZXIoYyA9PiBjLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobm9ybWFsaXplZFRleHQpICYmXG4gICAgICAgICFleGFjdE1hdGNoZXMuaW5jbHVkZXMoYykgJiZcbiAgICAgICAgIWJlZ2lubmluZ01hdGNoZXMuaW5jbHVkZXMoYykpO1xuICAgIGNvbnN0IG1hdGNoZXMgPSBbLi4uZXhhY3RNYXRjaGVzLCAuLi5iZWdpbm5pbmdNYXRjaGVzLCAuLi5zdWJzdHJpbmdNYXRjaGVzXTtcbiAgICBjaG9yZHNEYXRhTGlzdC5yZXBsYWNlQ2hpbGRyZW4oLi4ubWF0Y2hlcy5tYXAoYyA9PiBjaG9yZE9wdGlvbnNbY10pKTtcbn1cbi8qKiBQb3B1bGF0ZXMgdGhlIGluc3RydW1lbnQgZHJvcC1kb3duICovXG5mdW5jdGlvbiBwb3B1bGF0ZUluc3RydW1lbnRzKCkge1xuICAgIGZvciAoY29uc3QgaW5zdHJ1bWVudCBvZiBPYmplY3Qua2V5cyhpbnN0cnVtZW50c18xLmluc3RydW1lbnRzKSkge1xuICAgICAgICBpbnN0cnVtZW50RWxlbWVudC5hcHBlbmRDaGlsZCgoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ29wdGlvbicsIHtcbiAgICAgICAgICAgIHZhbHVlOiBpbnN0cnVtZW50LFxuICAgICAgICAgICAgaW5uZXJUZXh0OiBpbnN0cnVtZW50XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG4vKiogR2V0cyBIVE1MIGVsZW1lbnQgY29udGFpbmluZyB0aGUgbGlzdCBvZiBjaG9yZCdzIG5vdGVzICovXG5mdW5jdGlvbiBnZXRDaG9yZERlc2NyaXB0aW9uRWxlbWVudChjaG9yZCkge1xuICAgIGNvbnN0IG5vdGVzID0gKDAsIHR5cG9ncmFwaHlfMS5hcHBseVR5cG9ncmFwaHkpKGNob3JkLm5vdGVzLmpvaW4oJyAnKSk7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcsIHtcbiAgICAgICAgaWQ6ICdjaG9yZERlc2NyaXB0aW9uJyxcbiAgICAgICAgaW5uZXJUZXh0OiBg4p+oICR7bm90ZXN9IOKfqWBcbiAgICB9KTtcbn1cbi8qKiBHZXRzIEhUTUwgZWxlbWVudCBjb250YWluaW5nIGFuIGVycm9yIG1lc3NhZ2UgKi9cbmZ1bmN0aW9uIGdldEVycm9yRWxlbWVudChtZXNzYWdlKSB7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcsIHtcbiAgICAgICAgaWQ6ICdlcnJvcicsXG4gICAgICAgIGlubmVyVGV4dDogbWVzc2FnZVxuICAgIH0pO1xufVxuLyoqIEN1cnJlbnQgc3RhdGUgb2YgdGhlIHBhZ2UgKi9cbmxldCBtb2RlbDtcbi8qKlxuICogRGlzcGxheXMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHBhZ2UuXG4gKiBUaGUgbW9kZWwgc2hvdWxkIGJlIGNvbnNpc3RlbnQgKHVzZSBgbWFrZUNvbnNpc3RlbnRgIGJlZm9yZSBjYWxsaW5nIHRoaXMpXG4gKi9cbmZ1bmN0aW9uIGRpc3BsYXlQYWdlKG1vZGVsKSB7XG4gICAgLy8gcHJldmVudCByZWN1cnNpdmUgYG9uSGFzaENoYW5nZWAgY2FsbHNcbiAgICByZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgb25IYXNoQ2hhbmdlKTtcbiAgICBjb25zdCBzdGF0dXMgPSBbXTtcbiAgICBjb25zdCBvdXRwdXQgPSBbXTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB0dW5pbmcgPSBuZXcgdHVuaW5nXzEuVHVuaW5nKG1vZGVsLnR1bmluZ0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgLy8gdHVuaW5nIGlzIHZhbGlkXG4gICAgICAgIGNvbnN0IGNob3JkTmFtZSA9IG1vZGVsLmNob3JkTmFtZS50cmltKCk7XG4gICAgICAgIGxldCBjaG9yZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGNob3JkTmFtZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY2hvcmQgPSBuZXcgY2hvcmRfMS5DaG9yZChjaG9yZE5hbWUpO1xuICAgICAgICAgICAgICAgIC8vIGNob3JkIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgc3RhdHVzLnB1c2goZ2V0Q2hvcmREZXNjcmlwdGlvbkVsZW1lbnQoY2hvcmQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIC8vIGNob3JkIGlzIGludmFsaWRcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBgJHtlcnJvcn1gO1xuICAgICAgICAgICAgICAgIHN0YXR1cy5wdXNoKGdldEVycm9yRWxlbWVudChtZXNzYWdlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZnJldGJvYXJkID0gdHVuaW5nLmdldEZyZXRib2FyZChjaG9yZCwgbW9kZWwuZnJldENvdW50KTtcbiAgICAgICAgb3V0cHV0LnB1c2goKDAsIGZyZXRib2FyZF8xLmdldEZyZXRib2FyZEVsZW1lbnQpKGZyZXRib2FyZCwgY2hvcmQgPT09IG51bGwgfHwgY2hvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNob3JkLm5vdGVzWzBdKSk7XG4gICAgICAgIGlmIChjaG9yZCAhPT0gdW5kZWZpbmVkIHx8IGNob3JkTmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgIC8vIGNoYW5nZSB1cmwgaGFzaCBvbmx5IGlmIHRoZSB0dW5pbmcgaXMgdmFsaWQgYW5kIHRoZSBjaG9yZCBpcyB2YWxpZCBvciBlbXB0eVxuICAgICAgICAgICAgKDAsIHVybEhhc2hfMS5zZXRVcmxIYXNoKShtb2RlbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIHR1bmluZyBpcyBpbnZhbGlkXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGAke2Vycm9yfWA7XG4gICAgICAgIHN0YXR1cy5wdXNoKGdldEVycm9yRWxlbWVudChgSW52YWxpZCB0dW5pbmc6ICR7bWVzc2FnZX1gKSk7XG4gICAgfVxuICAgIC8vIHNldCB0aGUgaW5wdXQgZmllbGQgdmFsdWVzXG4gICAgaW5zdHJ1bWVudEVsZW1lbnQudmFsdWUgPSBtb2RlbC5pbnN0cnVtZW50O1xuICAgIHR1bmluZ0VsZW1lbnQudmFsdWUgPSBtb2RlbC50dW5pbmdEZXNjcmlwdGlvbjtcbiAgICBmcmV0Q291bnRFbGVtZW50LnZhbHVlID0gbW9kZWwuZnJldENvdW50LnRvU3RyaW5nKCk7XG4gICAgY2hvcmRFbGVtZW50LnZhbHVlID0gbW9kZWwuY2hvcmROYW1lO1xuICAgIC8vIGRpc3BsYXkgdGhlIG91dHB1dFxuICAgIHN0YXR1c0VsZW1lbnQucmVwbGFjZUNoaWxkcmVuKC4uLnN0YXR1cyk7XG4gICAgb3V0cHV0RWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4oLi4ub3V0cHV0KTtcbiAgICAvLyB0aW1lb3V0IGZpeGVzIHJlY3Vyc2l2ZSBgb25IYXNoQ2hhbmdlYCBjYWxsc1xuICAgIC8vIFRPRE86IGZpbmQgdGhlIHJlYXNvbiBhbmQgYSBiZXR0ZXIgc29sdXRpb25cbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIG9uSGFzaENoYW5nZSk7IH0sIDEwMCk7XG59XG4vKiogQ2hhbmdlcyB0aGUgY3VycmVudCBwYWdlIHN0YXRlICovXG5mdW5jdGlvbiBjaGFuZ2VNb2RlbChuZXdNb2RlbCkge1xuICAgIG1vZGVsID0gKDAsIG1vZGVsXzEubWFrZUNvbnNpc3RlbnQpKG5ld01vZGVsKTtcbiAgICBkaXNwbGF5UGFnZShtb2RlbCk7XG59XG4vLyBJbnB1dCBhY3Rpb25zOlxuZnVuY3Rpb24gb25JbnN0cnVtZW50SW5wdXQoKSB7XG4gICAgY29uc3QgaW5zdHJ1bWVudCA9IGluc3RydW1lbnRFbGVtZW50LnZhbHVlO1xuICAgIGNoYW5nZU1vZGVsKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGluc3RydW1lbnQsIHR1bmluZ0Rlc2NyaXB0aW9uOiAnJyB9KSk7XG59XG5mdW5jdGlvbiBvblR1bmluZ0lucHV0KCkge1xuICAgIGNvbnN0IHR1bmluZ0Rlc2NyaXB0aW9uID0gdHVuaW5nRWxlbWVudC52YWx1ZTtcbiAgICBjaGFuZ2VNb2RlbChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyB0dW5pbmdEZXNjcmlwdGlvbiwgaW5zdHJ1bWVudDogJycgfSkpO1xufVxuZnVuY3Rpb24gb25GcmV0Q291bnRJbnB1dCgpIHtcbiAgICBjb25zdCBmcmV0Q291bnQgPSBwYXJzZUludChmcmV0Q291bnRFbGVtZW50LnZhbHVlKTtcbiAgICBjaGFuZ2VNb2RlbChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBmcmV0Q291bnQgfSkpO1xufVxuZnVuY3Rpb24gb25DaG9yZElucHV0KGUpIHtcbiAgICBjb25zdCBjaG9yZE5hbWUgPSBjaG9yZEVsZW1lbnQudmFsdWU7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBJbnB1dEV2ZW50ICYmIGUuaW5wdXRUeXBlICE9PSAnaW5zZXJ0UmVwbGFjZW1lbnRUZXh0Jykge1xuICAgICAgICBwb3B1bGF0ZUNob3Jkc0RhdGFsaXN0KGNob3JkTmFtZSk7XG4gICAgfVxuICAgIGNoYW5nZU1vZGVsKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGNob3JkTmFtZSB9KSk7XG59XG5mdW5jdGlvbiBvbkhhc2hDaGFuZ2UoKSB7XG4gICAgY2hhbmdlTW9kZWwoKDAsIHVybEhhc2hfMS5nZXRVcmxIYXNoKSgpKTtcbiAgICBwb3B1bGF0ZUNob3Jkc0RhdGFsaXN0KG1vZGVsLmNob3JkTmFtZSk7XG59XG4vLyBFbnRyeSBwb2ludFxuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBwb3B1bGF0ZUluc3RydW1lbnRzKCk7XG4gICAgb25IYXNoQ2hhbmdlKCk7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIG9uSGFzaENoYW5nZSk7XG4gICAgaW5zdHJ1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkluc3RydW1lbnRJbnB1dCk7XG4gICAgdHVuaW5nRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uVHVuaW5nSW5wdXQpO1xuICAgIGZyZXRDb3VudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkZyZXRDb3VudElucHV0KTtcbiAgICBjaG9yZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkNob3JkSW5wdXQpO1xuICAgIGNob3JkRWxlbWVudC5mb2N1cygpO1xufVxuZXhwb3J0cy5pbml0aWFsaXplID0gaW5pdGlhbGl6ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tYWtlQ29uc2lzdGVudCA9IGV4cG9ydHMuZGVmYXVsdE1vZGVsID0gZXhwb3J0cy5tYXhGcmV0Q291bnQgPSB2b2lkIDA7XG5jb25zdCBpbnN0cnVtZW50c18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS9pbnN0cnVtZW50c1wiKTtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS90dW5pbmdcIik7XG5leHBvcnRzLm1heEZyZXRDb3VudCA9IDM2O1xuLyoqIFRoZSB2YWx1ZXMgdXNlZCB3aGVuIHRoZSBwYWdlIGlzIG9wZW4gd2l0aG91dCBhIFVSTCBoYXNoICovXG5leHBvcnRzLmRlZmF1bHRNb2RlbCA9IHtcbiAgICBpbnN0cnVtZW50OiAnVWt1bGVsZSAoaGlnaCBHKScsXG4gICAgdHVuaW5nRGVzY3JpcHRpb246ICdHNCBDNCBFNCBBNCcsXG4gICAgZnJldENvdW50OiAxMixcbiAgICBjaG9yZE5hbWU6ICcnLFxufTtcbi8qKlxuICogQ2hhbmdlcyB0aGUgbW9kZWwgc28gdGhhdCBpdHMgdmFsdWVzIGFyZSBjb25zaXN0ZW50IGFuZCByZXR1cm5zIHRoZSByZXN1bHQuXG4gKiBUaGUgdmFsdWVzIGRvbid0IGhhdmUgdG8gYmUgdmFsaWQgdGhvdWdoIChlLmcuIGludmFsaWQgdHVuaW5nIG9yIGNob3JkIGFyZSBPSyxcbiAqIGJ1dCBhIHZhbGlkIHR1bmluZyB3aXRoIGEgd3JvbmcgaW5zdHJ1bWVudCBpcyBub3QpLlxuICogU2hvdWxkIGJlIGNhbGxlZCBiZWZvcmUgZGlzcGxheWluZyB0aGUgcGFnZVxuICovXG5mdW5jdGlvbiBtYWtlQ29uc2lzdGVudChtb2RlbCkge1xuICAgIHZhciBfYTtcbiAgICAvLyBmcmV0Q291bnQgc2hvdWxkIGJlIGFuIGludGVnZXIgYmV0d2VlbiAwIGFuZCBtYXhGcmV0Q291bnRcbiAgICBjb25zdCBmcmV0Q291bnQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihleHBvcnRzLm1heEZyZXRDb3VudCwgTWF0aC5yb3VuZChtb2RlbC5mcmV0Q291bnQpKSk7XG4gICAgbW9kZWwgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBmcmV0Q291bnQgfSk7XG4gICAgY29uc3QgaW5zdHJ1bWVudFR1bmluZyA9IChfYSA9IGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudHNbbW9kZWwuaW5zdHJ1bWVudF0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kZXNjcmlwdGlvbjtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB0dW5pbmcgPSBuZXcgdHVuaW5nXzEuVHVuaW5nKG1vZGVsLnR1bmluZ0Rlc2NyaXB0aW9uKS5kZXNjcmlwdGlvbjtcbiAgICAgICAgaWYgKHR1bmluZyAhPT0gaW5zdHJ1bWVudFR1bmluZykge1xuICAgICAgICAgICAgLy8gaWYgdHVuaW5nIGlzIHZhbGlkIGFuZCBkaWZmZXJzIGZyb20gaW5zdHJ1bWVudCdzLCBjaGFuZ2UgdGhlIGluc3RydW1lbnRcbiAgICAgICAgICAgIGNvbnN0IGluc3RydW1lbnQgPSBpbnN0cnVtZW50c18xLmluc3RydW1lbnRCeVR1bmluZ1t0dW5pbmddIHx8ICcnO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGluc3RydW1lbnQgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKF9iKSB7IH1cbiAgICBpZiAoaW5zdHJ1bWVudFR1bmluZykge1xuICAgICAgICAvLyBJZiB0dW5pbmcgaXMgaW52YWxpZCBhbmQgaW5zdHJ1bWVudCBpcyB2YWxpZCwgY2hhbmdlIHRoZSB0dW5pbmdcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IHR1bmluZ0Rlc2NyaXB0aW9uOiBpbnN0cnVtZW50VHVuaW5nIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gSWYgaW5zdHJ1bWVudCBpcyBpbnZhbGlkLCBjaGFuZ2UgaXQgdG8gJydcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGluc3RydW1lbnQ6ICcnIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMubWFrZUNvbnNpc3RlbnQgPSBtYWtlQ29uc2lzdGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hcHBseVR5cG9ncmFwaHkgPSB2b2lkIDA7XG5jb25zdCBjaGFyYWN0ZXJEaWN0ID0ge1xuICAgICcjJzogJ+KZrycsXG4gICAgJ2InOiAn4pmtJyxcbiAgICAnMCc6ICfigoAnLFxuICAgICcxJzogJ+KCgScsXG4gICAgJzInOiAn4oKCJyxcbiAgICAnMyc6ICfigoMnLFxuICAgICc0JzogJ+KChCcsXG4gICAgJzUnOiAn4oKFJyxcbiAgICAnNic6ICfigoYnLFxuICAgICc3JzogJ+KChycsXG4gICAgJzgnOiAn4oKIJyxcbiAgICAnOSc6ICfigoknLFxufTtcbmNvbnN0IHJlcGxhY2VSZWdleCA9IG5ldyBSZWdFeHAoYFske09iamVjdC5rZXlzKGNoYXJhY3RlckRpY3QpfV1gLCAnZycpO1xuLyoqXG4gKiBSZXBsYWNlcyBlYXN5LXRvLXR5cGUgQVNDSUkgY2hhcmFjdGVyc1xuICogZm9yIGFjY2lkZW50YWxzIGFuZCBvY3RhdmUgbnVtYmVyc1xuICogd2l0aCBnb29kLWxvb2tpbmcgVW5pY29kZSBvbmVzXG4gKi9cbmZ1bmN0aW9uIGFwcGx5VHlwb2dyYXBoeSh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShyZXBsYWNlUmVnZXgsIGMgPT4gY2hhcmFjdGVyRGljdFtjXSk7XG59XG5leHBvcnRzLmFwcGx5VHlwb2dyYXBoeSA9IGFwcGx5VHlwb2dyYXBoeTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRVcmxIYXNoID0gZXhwb3J0cy5zZXRVcmxIYXNoID0gdm9pZCAwO1xuY29uc3QgbW9kZWxfMSA9IHJlcXVpcmUoXCIuL21vZGVsXCIpO1xuY29uc3QgZm9ybWF0VmVyc2lvbiA9IDA7XG4vKipcbiAqIEVuY29kZXMgdGhlIG1vZGVsIGludG8gdGhlIHBhZ2UncyBVUkwgaGFzaCBwYXJ0LlxuICogVGhpcyBhbGxvd3MgdGhlIHVzZXIgdG8gc2hhcmUgbGlua3MgdG8gc3BlY2lmaWMgdHVuaW5ncyBhbmQgY2hvcmRzLlxuICovXG5mdW5jdGlvbiBzZXRVcmxIYXNoKG1vZGVsKSB7XG4gICAgY29uc3QgdHVuaW5nRGVzY3JpcHRpb24gPSBtb2RlbC50dW5pbmdEZXNjcmlwdGlvbi50cmltKCkucmVwbGFjZSgvXFxzKy9nLCAnLScpO1xuICAgIGNvbnN0IGNob3JkTmFtZSA9IG1vZGVsLmNob3JkTmFtZS50cmltKCk7XG4gICAgY29uc3QgaGFzaCA9IGAke2Zvcm1hdFZlcnNpb259fCR7dHVuaW5nRGVzY3JpcHRpb259fCR7bW9kZWwuZnJldENvdW50fXwke2Nob3JkTmFtZX1gO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaDtcbn1cbmV4cG9ydHMuc2V0VXJsSGFzaCA9IHNldFVybEhhc2g7XG4vKipcbiAqIFJlYWRzIHRoZSBtb2RlbCBmcm9tIHRoZSBwYWdlJ3MgVVJMIGhhc2ggcGFydC5cbiAqIE5vdGU6IHRoZSBpbnN0cnVtZW50IGlzIG5vdCBzYXZlZCBpbiB0aGUgaGFzaCAoZm9yIHRoZSBzYWtlIG9mIGJyZXZpdHkpXG4gKiBzbyBpdCBjYW4gYmUgY2hvc2VuIGluY29ycmVjdGx5IHdoZW4gbXVsdGlwbGUgaW5zdHJ1bWVudHMgc2hhcmUgdGhlIHNhbWUgdHVuaW5nXG4gKi9cbmZ1bmN0aW9uIGdldFVybEhhc2goKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdGV4dCA9IGRlY29kZVVSSSh3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKC8jLywgJycpKTtcbiAgICAgICAgY29uc3QgcGFydHMgPSB0ZXh0LnNwbGl0KCd8Jyk7XG4gICAgICAgIGlmIChwYXJzZUludChwYXJ0c1swXSkgPT09IGZvcm1hdFZlcnNpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IHR1bmluZ0Rlc2NyaXB0aW9uID0gcGFydHNbMV0ucmVwbGFjZSgvLS9nLCAnICcpO1xuICAgICAgICAgICAgY29uc3QgZnJldENvdW50ID0gcGFyc2VJbnQocGFydHNbMl0pO1xuICAgICAgICAgICAgY29uc3QgY2hvcmROYW1lID0gcGFydHNbM107XG4gICAgICAgICAgICByZXR1cm4geyBpbnN0cnVtZW50OiAnJywgdHVuaW5nRGVzY3JpcHRpb24sIGZyZXRDb3VudCwgY2hvcmROYW1lIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7IH1cbiAgICByZXR1cm4gbW9kZWxfMS5kZWZhdWx0TW9kZWw7XG59XG5leHBvcnRzLmdldFVybEhhc2ggPSBnZXRVcmxIYXNoO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdWlfMSA9IHJlcXVpcmUoXCIuL3VpXCIpO1xuKDAsIHVpXzEuaW5pdGlhbGl6ZSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==