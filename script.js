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
    fretboardElement.appendChild(getFretHeaderElement(fretboard[0].length));
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
/** Gets the HTML element containing the list of chord's notes */
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
    // input field values
    instrumentElement.value = model.instrument;
    tuningElement.value = model.tuningDescription;
    fretCountElement.value = model.fretCount.toString();
    chordElement.value = model.chordName;
    // display the output
    statusElement.replaceChildren(...status);
    outputElement.replaceChildren(...output);
    // Timeout fixes recursive `onHashChange` calls
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
 * but a valid tuning with a wrong instrument is not)
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
 * This allows the user to share links to specific tunings and chords
 */
function setUrlHash(model) {
    const tuningDescription = model.tuningDescription.trim().replace(/\s+/g, '-');
    const chordName = model.chordName.trim();
    const hash = `${formatVersion}|${tuningDescription}|${model.fretCount}|${chordName}`;
    window.location.hash = hash;
}
exports.setUrlHash = setUrlHash;
/** Reads the model from the page's URL hash part */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsY0FBYyxHQUFHLGtCQUFrQixHQUFHLGdCQUFnQixHQUFHLFVBQVU7QUFDdkY7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjs7Ozs7OztVQy9CbEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxhQUFhLG1CQUFPLENBQUMsK0JBQU07QUFDM0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3RoZW9yeS9jaG9yZC50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3RoZW9yeS9pbnN0cnVtZW50cy50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3RoZW9yeS9ub3RlLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L3R1bmluZy50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL2NvbG9ycy50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL2RvbS50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL2ZyZXRib2FyZC50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL2luZGV4LnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvbW9kZWwudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS90eXBvZ3JhcGh5LnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvdXJsSGFzaC50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNob3JkID0gZXhwb3J0cy5rbm93bkNob3JkTmFtZXMgPSB2b2lkIDA7XG5jb25zdCBub3RlXzEgPSByZXF1aXJlKFwiLi9ub3RlXCIpO1xuLy8gSW50ZXJ2YWxzIGluIHNlbWl0b25lczpcbmNvbnN0IFtQMSwgbTIsIE0yLCBtMywgTTMsIFA0LCBBNCwgUDUsIG02LCBNNiwgbTcsIE03XSA9IEFycmF5KDEyKS5rZXlzKCk7XG5jb25zdCBzdWZmaXhNZWFuaW5ncyA9IHtcbiAgICAnbShubzUpJzogW1AxLCBtM10sXG4gICAgJyhubzUpJzogW1AxLCBNM10sXG4gICAgJzUnOiBbUDEsIFA1XSxcbiAgICAnZGltJzogW1AxLCBtMywgQTRdLFxuICAgICdzdXMyJzogW1AxLCBNMiwgUDVdLFxuICAgICdtJzogW1AxLCBtMywgUDVdLFxuICAgICcnOiBbUDEsIE0zLCBQNV0sXG4gICAgJ3N1czQnOiBbUDEsIFA0LCBQNV0sXG4gICAgJ2F1Zyc6IFtQMSwgTTMsIG02XSxcbiAgICAnbTYnOiBbUDEsIG0zLCBQNSwgTTZdLFxuICAgICc2JzogW1AxLCBNMywgUDUsIE02XSxcbiAgICAnbTcnOiBbUDEsIG0zLCBQNSwgbTddLFxuICAgICdtTTcnOiBbUDEsIG0zLCBQNSwgTTddLFxuICAgICc3JzogW1AxLCBNMywgUDUsIG03XSxcbiAgICAnTTcnOiBbUDEsIE0zLCBQNSwgTTddLFxufTtcbmNvbnN0IGtub3duU3VmZml4ZXMgPSBPYmplY3Qua2V5cyhzdWZmaXhNZWFuaW5ncyk7XG5rbm93blN1ZmZpeGVzLnNvcnQoKTtcbi8qKiBMaXN0IG9mIGFsbCB2YWxpZCBjaG9yZCBuYW1lcywgdXNlZCBpbiB0aGUgY2hvcmQgcG9wdXAgKi9cbmV4cG9ydHMua25vd25DaG9yZE5hbWVzID0gW107XG5mb3IgKGNvbnN0IG5vdGUgb2Ygbm90ZV8xLmtub3duTm90ZU5hbWVzKSB7XG4gICAgZm9yIChjb25zdCBzdWZmaXggb2Yga25vd25TdWZmaXhlcykge1xuICAgICAgICBleHBvcnRzLmtub3duQ2hvcmROYW1lcy5wdXNoKG5vdGUgKyBzdWZmaXgpO1xuICAgIH1cbn1cbmNvbnN0IGNob3JkUmVnZXggPSBuZXcgUmVnRXhwKGBeKCR7bm90ZV8xLm5vdGVOYW1lUGF0dGVybn0pKC4qKSRgKTtcbmNsYXNzIENob3JkIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gbmFtZS5tYXRjaChjaG9yZFJlZ2V4KTtcbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBDYW4ndCBwYXJzZSBjaG9yZCAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgW18sIHJvb3ROYW1lLCBzdWZmaXhdID0gbWF0Y2g7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBuZXcgbm90ZV8xLk5vdGUocm9vdE5hbWUpO1xuICAgICAgICBpZiAoIShzdWZmaXggaW4gc3VmZml4TWVhbmluZ3MpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYENhbid0IHBhcnNlIGNob3JkIHN1ZmZpeCAke3N1ZmZpeH1gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vdGVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgaW50ZXJ2YWwgb2Ygc3VmZml4TWVhbmluZ3Nbc3VmZml4XSkge1xuICAgICAgICAgICAgdGhpcy5ub3Rlcy5wdXNoKHJvb3QuYWRkSW50ZXJ2YWwoaW50ZXJ2YWwpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0gPSA8JHt0aGlzLm5vdGVzLmpvaW4oJyAnKX0+YDtcbiAgICB9XG59XG5leHBvcnRzLkNob3JkID0gQ2hvcmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nID0gZXhwb3J0cy5pbnN0cnVtZW50cyA9IHZvaWQgMDtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4vdHVuaW5nXCIpO1xuZXhwb3J0cy5pbnN0cnVtZW50cyA9IHtcbiAgICAnQmFsYWxhaWthIChhY2FkZW1pYyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFNCBFNCBBNCcpLFxuICAgICdCYWxhbGFpa2EgKGZvbGspJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzQgRTQgRzQnKSxcbiAgICAnQmFuam8nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBEMyBHMyBCMyBENCcpLFxuICAgICdCYXNzJzogbmV3IHR1bmluZ18xLlR1bmluZygnRTEgQTEgRDIgRzInKSxcbiAgICAnQnJhZ3VpbmhhJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQjQgRDUnKSxcbiAgICAnQ2hhcmFuZ28nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBDNSBFIEE0IEU1JyksXG4gICAgJ0NhdmFxdWluaG8gKFBvcnR1Z2FsIEdHQkQpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgRzQgQjQgRDUnKSxcbiAgICAnQ2F2YXF1aW5obyAoUG9ydHVnYWwgREFCRSknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENSBBNCBCNCBFNScpLFxuICAgICdDYXZhcXVpbmhvIChCcmF6aWwgREdCRCknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBCNCBENScpLFxuICAgICdDYXZhcXVpbmhvIChCcmF6aWwgREdCRSknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBCNCBFNScpLFxuICAgICdEYWxhIGZhZW5keXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFNCBBNCBFNScpLFxuICAgICdEZWNoaWcgcG9uZGFyJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzQgRDQgRzQnKSxcbiAgICAnR3VpdGFsZWxlJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTIgRDMgRzMgQzQgRTQgQTQnKSxcbiAgICAnR3VpdGFyJzogbmV3IHR1bmluZ18xLlR1bmluZygnRTIgQTIgRDMgRzMgQjMgRTQnKSxcbiAgICAnR3VpdGFycsOzbic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0ExIEQyIEcyIEMzIEUzIEEyJyksXG4gICAgJ0phcmFuYSBqYXJvY2hhJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgQzQgRSBBMyBHMycpLFxuICAgICdKYXJhbmEgaHVhc3RlY2EnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBCMyBENCBGIzQgQTQnKSxcbiAgICAnTWFuZG9saW4nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBENCBBNCBFNScpLFxuICAgICdSYWphbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEM0IEU0IEE0JyksXG4gICAgJ1JlcXVpbnRvJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTIgRDMgRzMgQzQgRTQgQTQnKSxcbiAgICAnU2VtaXN0cnVua2EnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdEMiBHMiBCMiBEMyBHMyBCMyBENCcpLFxuICAgICdUZW5vciBndWl0YXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDMyBHMyBENCBBNCcpLFxuICAgICdUaW1wbGUnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBDNSBFNCBBNCBENScpLFxuICAgICdVa3VsZWxlIChoaWdoIEcpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgQzQgRTQgQTQnKSxcbiAgICAnVWt1bGVsZSAobG93IEcpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgQzQgRTQgQTQnKSxcbiAgICAnVWt1bGVsZSAoYmFyaXRvbmUpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDMgRzMgQjMgRTQnKSxcbiAgICAnVmlodWVsYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0EzIEQ0IEc0IEIzIEU0JyksXG4gICAgJ1Zpb2xhJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzMgRzMgRDQgQTQnKSxcbiAgICAnVmlvbGluJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgRDQgQTQgRTUnKSxcbn07XG4vKiogR2V0cyB0aGUgZmlyc3QgaW5zdHJ1bWVudCB3aXRoIHRoZSBnaXZlbiB0dW5pbmcgKi9cbmV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nID0ge307XG5mb3IgKGNvbnN0IFtuYW1lLCB0dW5pbmddIG9mIE9iamVjdC5lbnRyaWVzKGV4cG9ydHMuaW5zdHJ1bWVudHMpKSB7XG4gICAgaWYgKCEodHVuaW5nLmRlc2NyaXB0aW9uIGluIGV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nKSkge1xuICAgICAgICBleHBvcnRzLmluc3RydW1lbnRCeVR1bmluZ1t0dW5pbmcuZGVzY3JpcHRpb25dID0gbmFtZTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTm90ZSA9IGV4cG9ydHMubm90ZU5hbWVQYXR0ZXJuID0gZXhwb3J0cy5rbm93bk5vdGVOYW1lcyA9IHZvaWQgMDtcbi8qKiAxMmVkbyBub3Rlcy4gQSBub3RlIGNhbiBoYXZlIG9uZSBvciB0d28gbmFtZXMgKi9cbmNvbnN0IG5vdGVOYW1lcyA9IFtcbiAgICBbJ0MnXSwgWydDIycsICdEYiddLFxuICAgIFsnRCddLCBbJ0QjJywgJ0ViJ10sXG4gICAgWydFJ10sXG4gICAgWydGJ10sIFsnRiMnLCAnR2InXSxcbiAgICBbJ0cnXSwgWydHIycsICdBYiddLFxuICAgIFsnQSddLCBbJ0EjJywgJ0JiJ10sXG4gICAgWydCJ10sXG5dO1xuY29uc3QgdW5zdXBwb3J0ZWQgPSB7XG4gICAgJ0NiJzogJ0InLFxuICAgICdCIyc6ICdDJyxcbiAgICAnRmInOiAnRScsXG4gICAgJ0UjJzogJ0YnLFxufTtcbmNvbnN0IG5vdGVJbmRleEJ5TmFtZSA9IHt9O1xuZm9yIChjb25zdCBbaW5kZXgsIG5hbWVzXSBvZiBub3RlTmFtZXMuZW50cmllcygpKSB7XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIG5hbWVzKSB7XG4gICAgICAgIG5vdGVJbmRleEJ5TmFtZVtuYW1lXSA9IGluZGV4O1xuICAgIH1cbn1cbi8qKlxuICogTGlzdCBvZiBhbGwgdmFsaWQgbm90ZSBuYW1lcyBpbiBhbHBoYWJldGljYWwgb3JkZXJcbiAqIFsnQScsICdBIycsICdBYicsICdCJywgLi4uLCAnR2InXVxuICogVXNlZCBpbiB0aGUgY2hvcmQgcG9wdXBcbiAqL1xuZXhwb3J0cy5rbm93bk5vdGVOYW1lcyA9IE9iamVjdC5rZXlzKG5vdGVJbmRleEJ5TmFtZSk7XG5leHBvcnRzLmtub3duTm90ZU5hbWVzLnNvcnQoKTtcbmV4cG9ydHMubm90ZU5hbWVQYXR0ZXJuID0gJ1tBLUddWyNiXT8nOyAvLyB1c2VkIGJ5IGNob3JkLnRzXG5jb25zdCBub3RlUmVnZXggPSBuZXcgUmVnRXhwKGBeKCR7ZXhwb3J0cy5ub3RlTmFtZVBhdHRlcm59KShcXFxcZCk/JGApO1xuLyoqIFJlcHJlc2VudHMgZWl0aGVyIGFuIGFic29sdXRlLXBpdGNoZWQgbm90ZSBvciBhbiBvY3RhdmUtaW52YXJpYW50IG5vdGUgKi9cbmNsYXNzIE5vdGUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBuYW1lLm1hdGNoKG5vdGVSZWdleCk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgY29uc3QgW18sIG5vdGVOYW1lLCBvY3RhdmVOYW1lXSA9IG1hdGNoO1xuICAgICAgICAgICAgaWYgKG5vdGVOYW1lIGluIHVuc3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbiA9IHVuc3VwcG9ydGVkW25vdGVOYW1lXTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVzZSAke3N1Z2dlc3Rpb259IGluc3RlYWQgb2YgJHtub3RlTmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGl0Y2hDbGFzcyA9IG5vdGVJbmRleEJ5TmFtZVtub3RlTmFtZV07XG4gICAgICAgICAgICB0aGlzLm9jdGF2ZSA9IG9jdGF2ZU5hbWUgIT09IHVuZGVmaW5lZCA/IHBhcnNlSW50KG9jdGF2ZU5hbWUpIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBDYW4ndCBwYXJzZSBub3RlICR7bmFtZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgZnJvbVBpdGNoQ2xhc3NBbmRPY3RhdmUocGl0Y2hDbGFzcywgb2N0YXZlKSB7XG4gICAgICAgIGxldCBub3RlID0gT2JqZWN0LmNyZWF0ZShOb3RlLnByb3RvdHlwZSk7XG4gICAgICAgIG5vdGUucGl0Y2hDbGFzcyA9IHBpdGNoQ2xhc3M7XG4gICAgICAgIG5vdGUub2N0YXZlID0gb2N0YXZlO1xuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9XG4gICAgLyoqIENhbm9uaWNhbCBuYW1lIG9mIHRoZSBub3RlLiBGbGF0cyBhcmVuJ3QgdXNlZCAoZS5nLiBCYiBiZWNvbWVzIEEjKSAqL1xuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBjb25zdCBub3RlTmFtZSA9IG5vdGVOYW1lc1t0aGlzLnBpdGNoQ2xhc3NdWzBdO1xuICAgICAgICByZXR1cm4gdGhpcy5vY3RhdmUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBgJHtub3RlTmFtZX0ke3RoaXMub2N0YXZlfWBcbiAgICAgICAgICAgIDogbm90ZU5hbWU7XG4gICAgfVxuICAgIC8qKiBBZGRzIGEgbm9uLW5lZ2F0aXZlIGludGVydmFsIGluIHNlbWl0b25lcyBhbmQgcmV0dXJucyB0aGUgcmVzdWx0ICovXG4gICAgYWRkSW50ZXJ2YWwoaW50ZXJ2YWwpIHtcbiAgICAgICAgY29uc3QgcGl0Y2ggPSB0aGlzLnBpdGNoQ2xhc3MgKyBpbnRlcnZhbDtcbiAgICAgICAgY29uc3Qgb2N0YXZlID0gdGhpcy5vY3RhdmUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB0aGlzLm9jdGF2ZSArIE1hdGguZmxvb3IocGl0Y2ggLyAxMilcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gTm90ZS5mcm9tUGl0Y2hDbGFzc0FuZE9jdGF2ZShwaXRjaCAlIDEyLCBvY3RhdmUpOyAvLyBpbmNvcnJlY3QgZm9yIG5lZ2F0aXZlIGludGVydmFsc1xuICAgIH1cbn1cbmV4cG9ydHMuTm90ZSA9IE5vdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVHVuaW5nID0gZXhwb3J0cy5nZXRHcm91cCA9IHZvaWQgMDtcbmNvbnN0IG5vdGVfMSA9IHJlcXVpcmUoXCIuL25vdGVcIik7XG5jb25zdCBzcGxpdFJlZ2V4ID0gL1xccyt8KD89W0EtWl0pLzsgLy8gc3BsaXQgYnkgd2hpdGVzcGFjZSBvciBiZWZvcmUgdXBwZXJjYXNlIGxldHRlcnNcbi8qKiBSZXR1cm5zIGEgcm93IG9mIHRoZSBmcmV0IHRhYmxlIChzZWUgYGdldEZyZXRib2FyZGApICovXG5mdW5jdGlvbiBnZXRGcmV0cyhvcGVuU3RyaW5nLCBhbGxvd2VkUGl0Y2hlcywgZnJldENvdW50KSB7XG4gICAgY29uc3QgZnJldHMgPSBbXTtcbiAgICBmb3IgKGxldCBmcmV0SW5kZXggPSAwOyBmcmV0SW5kZXggPD0gZnJldENvdW50OyBmcmV0SW5kZXgrKykge1xuICAgICAgICBjb25zdCBub3RlID0gb3BlblN0cmluZy5hZGRJbnRlcnZhbChmcmV0SW5kZXgpO1xuICAgICAgICBmcmV0cy5wdXNoKGFsbG93ZWRQaXRjaGVzLmhhcyhub3RlLnBpdGNoQ2xhc3MpID8gbm90ZSA6IG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldHM7XG59XG4vKipcbiAqIEFzc2lnbnMgYSBncm91cCBpbmRleCB0byBhIGdpdmVuIG5vdGUgYmFzZWQgb24gdGhlIGNob3JkJ3Mgcm9vdCBub3RlXG4gKiBzbyB0aGF0IG5vdGVzIGluc2lkZSBhIHNpbmdsZSBncm91cCBmb3JtIGEgbm9uLWludmVydGVkIGNob3JkXG4gKi9cbmZ1bmN0aW9uIGdldEdyb3VwKHJvb3ROb3RlLCBub3RlKSB7XG4gICAgaWYgKG5vdGUgIT09IG51bGwgJiYgbm90ZS5vY3RhdmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigobm90ZS5vY3RhdmUgKiAxMiArIG5vdGUucGl0Y2hDbGFzcyAtIHJvb3ROb3RlLnBpdGNoQ2xhc3MpIC8gMTIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnRzLmdldEdyb3VwID0gZ2V0R3JvdXA7XG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIHR1bmluZyBvZiBhbiBpbnN0cnVtZW50LlxuICogQ2FuIGNvbnRhaW4gYm90aCBhYnNvbHV0ZS1waXRjaGVkIGFuZCBvY3RhdmUtaW52YXJpYW50IHN0cmluZ3MuXG4gKiAoT2N0YXZlLWludmFyaWFudCBzdHJpbmdzIGFyZSBhIHdvcmthcm91bmQgZm9yIG9jdGF2ZS1kb3VibGVkIHN0cmluZ3MgZm9yIG5vdylcbiAqIFRoZSBvcmRlciBvZiB0aGUgc3RyaW5ncyBpcyB0b3AtdG8tYm90dG9tIGluIHRoZSBpbnN0cnVtZW50J3MgcGxheWluZyBwb3NpdGlvblxuICogKG9uIHRoZSBkaWFncmFtLCBob3dldmVyLCBpdCdzIGJvdHRvbS10by10b3ApXG4gKi9cbmNsYXNzIFR1bmluZyB7XG4gICAgY29uc3RydWN0b3IoZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5vcGVuU3RyaW5ncyA9IGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAuc3BsaXQoc3BsaXRSZWdleClcbiAgICAgICAgICAgIC5maWx0ZXIobiA9PiBuICE9PSAnJylcbiAgICAgICAgICAgIC5tYXAobiA9PiBuZXcgbm90ZV8xLk5vdGUobikpO1xuICAgICAgICBpZiAodGhpcy5vcGVuU3RyaW5ncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXQgbGVhc3Qgb25lIG9wZW4gc3RyaW5nIHJlcXVpcmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMub3BlblN0cmluZ3Muam9pbignICcpO1xuICAgIH1cbiAgICAvKiogTm9ybWFsaXplZCB0dW5pbmcgZGVzY3JpcHRpb246IGZsYXRzIGFyZW4ndCB1c2VkLCB0aGUgbm90ZXMgYXJlIHNlcGFyYXRlZCBieSBzcGFjZXMgKi9cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGBUdW5pbmcoXCIke3RoaXMuZGVzY3JpcHRpb259XCIpYDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZnJldCB0YWJsZSBmb3IgYSBnaXZlbiBjaG9yZCBhcyBhbiBhcnJheSBvZiB0YWJsZSByb3dzLlxuICAgICAqIEVhY2ggcm93IGlzIGFuIGFycmF5IG9mIGNlbGxzIGFuZCByZXByZXNlbnRzIGEgc3RyaW5nLlxuICAgICAqIFRoZSBvcmRlciBvZiB0aGUgcm93cyBmb2xsb3dzIHRoZSBzdHJpbmcgb3JkZXIgaW4gdGhlIHR1bmluZyBkZXNjcmlwdGlvbiAoYm90dG9tLXRvLXRvcCBvbiB0aGUgZGlhZ3JhbSkuXG4gICAgICogQSBjZWxsIHJlcHJlc2VudHMgYSBmcmV0LiAwdGggY2VsbCBpbiBhIHJvdyByZXByZXNlbnRzIG9wZW4gc3RyaW5nLlxuICAgICAqIEVhY2ggY2VsbCBjb250YWlucyBlaXRoZXIgYSBub3RlIChpZiB0aGUgbm90ZSBpcyBpbiB0aGUgY2hvcmQpIG9yIGBudWxsYCAob3RoZXJ3aXNlKVxuICAgICAqL1xuICAgIGdldEZyZXRib2FyZChjaG9yZCwgZnJldENvdW50ID0gMTIpIHtcbiAgICAgICAgY29uc3QgYWxsb3dlZFBpdGNoZXMgPSBjaG9yZCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGNob3JkLm5vdGVzLm1hcChuID0+IG4ucGl0Y2hDbGFzcylcbiAgICAgICAgICAgIDogW107XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5TdHJpbmdzLm1hcChzID0+IGdldEZyZXRzKHMsIG5ldyBTZXQoYWxsb3dlZFBpdGNoZXMpLCBmcmV0Q291bnQpKTtcbiAgICB9XG59XG5leHBvcnRzLlR1bmluZyA9IFR1bmluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRHcm91cENvbG9yID0gdm9pZCAwO1xuY29uc3QgcGhpID0gKDEgKyBNYXRoLnNxcnQoNSkpIC8gMjtcbmNvbnN0IGdvbGRlbkFuZ2xlID0gMiAqIE1hdGguUEkgLyAocGhpICogcGhpKTtcbmNvbnN0IGxpZ2h0bmVzcyA9IDAuNTU7XG5jb25zdCBzYXR1cmF0aW9uID0gMC42NTtcbi8qKlxuICogR2VuZXJhdGVzIGFuIE9LbGFiIGNvbG9yIGZvciBhIGdpdmVuIGdyb3VwIGluZGV4XG4gKiBzbyB0aGF0IGFsbCBjb2xvcnMgaGF2ZSB0aGUgc2FtZSBsaWdodG5lc3MgYW5kIHNhdHVyYXRpb24sXG4gKiBhbGwgZ3JvdXBzIGhhdmUgZGlmZmVyZW50IGh1ZXMsXG4gKiBhbmQgaHVlcyBvZiB0aGUgbmVpZ2hib3IgZ3JvdXBzIGNvbnRyYXN0IHdlbGwgd2l0aCBlYWNoIG90aGVyXG4gKi9cbmZ1bmN0aW9uIGdldEdyb3VwQ29sb3IoZ3JvdXApIHtcbiAgICBjb25zdCBodWUgPSBnb2xkZW5BbmdsZSAqIGdyb3VwO1xuICAgIGNvbnN0IGwgPSBsaWdodG5lc3MgKiAxMDA7XG4gICAgY29uc3QgYSA9IHNhdHVyYXRpb24gKiBNYXRoLmNvcyhodWUpICogMTAwO1xuICAgIGNvbnN0IGIgPSBzYXR1cmF0aW9uICogTWF0aC5zaW4oaHVlKSAqIDEwMDtcbiAgICByZXR1cm4gYG9rbGFiKCR7bC50b0ZpeGVkKDEpfSUgJHthLnRvRml4ZWQoMSl9JSAke2IudG9GaXhlZCgxKX0lKWA7XG59XG5leHBvcnRzLmdldEdyb3VwQ29sb3IgPSBnZXRHcm91cENvbG9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSBleHBvcnRzLmdldEJ5SWQgPSB2b2lkIDA7XG4vKiogR2VuZXJpYy10eXBlZCB2ZXJzaW9uIG9mIGBnZXRFbGVtZW50QnlJZGAgKi9cbmZ1bmN0aW9uIGdldEJ5SWQoaWQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICB0aHJvdyBFcnJvcihgQ2Fubm90IGZpbmQgZWxlbWVudCB3aXRoIGlkICcke2lkfSdgKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5leHBvcnRzLmdldEJ5SWQgPSBnZXRCeUlkO1xuLyoqIENyZWF0ZXMgYW4gSFRNTCBlbGVtZW50IHdpdGggdGhlIGdpdmVuIHRhZyBuYW1lLCBwcm9wZXJ0aWVzIGFuZCAob3B0aW9uYWxseSkgc3R5bGUgKi9cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgcHJvcGVydGllcywgc3R5bGUpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICBpZiAocHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudCwgcHJvcGVydGllcyk7XG4gICAgfVxuICAgIGlmIChzdHlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudC5zdHlsZSwgc3R5bGUpO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0RnJldGJvYXJkRWxlbWVudCA9IHZvaWQgMDtcbmNvbnN0IGRvbV8xID0gcmVxdWlyZShcIi4vZG9tXCIpO1xuY29uc3QgdHVuaW5nXzEgPSByZXF1aXJlKFwiLi4vdGhlb3J5L3R1bmluZ1wiKTtcbmNvbnN0IHR5cG9ncmFwaHlfMSA9IHJlcXVpcmUoXCIuL3R5cG9ncmFwaHlcIik7XG5jb25zdCBjb2xvcnNfMSA9IHJlcXVpcmUoXCIuL2NvbG9yc1wiKTtcbmZ1bmN0aW9uIGdldEZyZXRIZWFkZXJFbGVtZW50KGZyZXRDb3VudCkge1xuICAgIGNvbnN0IGZyZXRIZWFkZXJFbGVtZW50ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJywge1xuICAgICAgICBjbGFzc05hbWU6ICdmcmV0SGVhZGVyJ1xuICAgIH0pO1xuICAgIGZvciAoY29uc3QgZnJldEluZGV4IG9mIEFycmF5KGZyZXRDb3VudCkua2V5cygpKSB7XG4gICAgICAgIGZyZXRIZWFkZXJFbGVtZW50LmFwcGVuZENoaWxkKCgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnc3BhbicsIHtcbiAgICAgICAgICAgIGlubmVyVGV4dDogZnJldEluZGV4LnRvU3RyaW5nKClcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldEhlYWRlckVsZW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRGcmV0RWxlbWVudChmcmV0Tm90ZSwgcm9vdE5vdGUpIHtcbiAgICBjb25zdCBpbm5lclRleHQgPSBmcmV0Tm90ZSAhPT0gbnVsbFxuICAgICAgICA/ICgwLCB0eXBvZ3JhcGh5XzEuYXBwbHlUeXBvZ3JhcGh5KShmcmV0Tm90ZS50b1N0cmluZygpKVxuICAgICAgICA6ICfCtyc7XG4gICAgY29uc3QgZ3JvdXAgPSByb290Tm90ZSAhPT0gdW5kZWZpbmVkID8gKDAsIHR1bmluZ18xLmdldEdyb3VwKShyb290Tm90ZSwgZnJldE5vdGUpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGNvbG9yID0gZ3JvdXAgIT09IHVuZGVmaW5lZCA/ICgwLCBjb2xvcnNfMS5nZXRHcm91cENvbG9yKShncm91cCkgOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnc3BhbicsIHsgaW5uZXJUZXh0IH0sIHsgY29sb3IgfSk7XG59XG5mdW5jdGlvbiBnZXRGcmV0dGVkU3RyaW5nRWxlbWVudChmcmV0dGVkU3RyaW5nLCByb290Tm90ZSkge1xuICAgIGNvbnN0IGZyZXR0ZWRTdHJpbmdFbGVtZW50ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJyk7XG4gICAgZm9yIChjb25zdCBmcmV0Tm90ZSBvZiBmcmV0dGVkU3RyaW5nKSB7XG4gICAgICAgIGZyZXR0ZWRTdHJpbmdFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXRFbGVtZW50KGZyZXROb3RlLCByb290Tm90ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldHRlZFN0cmluZ0VsZW1lbnQ7XG59XG4vKiogR2V0cyB0aGUgSFRNTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgZnJldGJvYXJkIGRpYWdyYW0gKi9cbmZ1bmN0aW9uIGdldEZyZXRib2FyZEVsZW1lbnQoZnJldGJvYXJkLCByb290Tm90ZSkge1xuICAgIGNvbnN0IGZyZXRib2FyZEVsZW1lbnQgPSAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ2RpdicsIHsgaWQ6ICdmcmV0Ym9hcmQnIH0pO1xuICAgIGZyZXRib2FyZEVsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0RnJldEhlYWRlckVsZW1lbnQoZnJldGJvYXJkWzBdLmxlbmd0aCkpO1xuICAgIGZvciAoY29uc3QgZnJldHRlZFN0cmluZyBvZiBbLi4uZnJldGJvYXJkXS5yZXZlcnNlKCkpIHtcbiAgICAgICAgZnJldGJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0dGVkU3RyaW5nRWxlbWVudChmcmV0dGVkU3RyaW5nLCByb290Tm90ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldGJvYXJkRWxlbWVudDtcbn1cbmV4cG9ydHMuZ2V0RnJldGJvYXJkRWxlbWVudCA9IGdldEZyZXRib2FyZEVsZW1lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZSA9IHZvaWQgMDtcbmNvbnN0IGNob3JkXzEgPSByZXF1aXJlKFwiLi4vdGhlb3J5L2Nob3JkXCIpO1xuY29uc3QgdHVuaW5nXzEgPSByZXF1aXJlKFwiLi4vdGhlb3J5L3R1bmluZ1wiKTtcbmNvbnN0IGluc3RydW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vdGhlb3J5L2luc3RydW1lbnRzXCIpO1xuY29uc3QgZG9tXzEgPSByZXF1aXJlKFwiLi9kb21cIik7XG5jb25zdCB0eXBvZ3JhcGh5XzEgPSByZXF1aXJlKFwiLi90eXBvZ3JhcGh5XCIpO1xuY29uc3QgZnJldGJvYXJkXzEgPSByZXF1aXJlKFwiLi9mcmV0Ym9hcmRcIik7XG5jb25zdCBtb2RlbF8xID0gcmVxdWlyZShcIi4vbW9kZWxcIik7XG5jb25zdCB1cmxIYXNoXzEgPSByZXF1aXJlKFwiLi91cmxIYXNoXCIpO1xuLy8gU3RhdGljIHBhZ2UgZWxlbWVudHNcbmNvbnN0IGluc3RydW1lbnRFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdpbnN0cnVtZW50Jyk7XG5jb25zdCB0dW5pbmdFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCd0dW5pbmcnKTtcbmNvbnN0IGZyZXRDb3VudEVsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2ZyZXRDb3VudCcpO1xuY29uc3QgY2hvcmRFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdjaG9yZCcpO1xuY29uc3QgY2hvcmRzRGF0YUxpc3QgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2Nob3JkcycpO1xuY29uc3Qgc3RhdHVzRWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnc3RhdHVzJyk7XG5jb25zdCBvdXRwdXRFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdvdXRwdXQnKTtcbi8qKiBDaG9yZHMgZGF0YWxpc3Qgb3B0aW9ucyAqL1xuY29uc3QgY2hvcmRPcHRpb25zID0ge307XG5mb3IgKGNvbnN0IGNob3JkIG9mIGNob3JkXzEua25vd25DaG9yZE5hbWVzKSB7XG4gICAgY2hvcmRPcHRpb25zW2Nob3JkXSA9ICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnb3B0aW9uJywgeyB2YWx1ZTogY2hvcmQgfSk7XG59XG4vKipcbiAqIFdoZW4gdGhlIHVzZXIgdHlwZXMgaW4gdGhlIGNob3JkIGZpZWxkLFxuICogdGhpcyBmdW5jdGlvbiBmb3JtcyB0aGUgcG9wdXAgbGlzdCB3aXRoIHN1Z2dlc3Rpb25zXG4gKi9cbmZ1bmN0aW9uIHBvcHVsYXRlQ2hvcmRzRGF0YWxpc3QodGV4dCA9ICcnKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZFRleHQgPSB0ZXh0LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGV4YWN0TWF0Y2hlcyA9IGNob3JkXzEua25vd25DaG9yZE5hbWVzLmZpbHRlcihjID0+IGMudG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZFRleHQpO1xuICAgIGNvbnN0IGJlZ2lubmluZ01hdGNoZXMgPSBjaG9yZF8xLmtub3duQ2hvcmROYW1lcy5maWx0ZXIoYyA9PiBjLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChub3JtYWxpemVkVGV4dCkgJiZcbiAgICAgICAgIWV4YWN0TWF0Y2hlcy5pbmNsdWRlcyhjKSk7XG4gICAgY29uc3Qgc3Vic3RyaW5nTWF0Y2hlcyA9IGNob3JkXzEua25vd25DaG9yZE5hbWVzLmZpbHRlcihjID0+IGMudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhub3JtYWxpemVkVGV4dCkgJiZcbiAgICAgICAgIWV4YWN0TWF0Y2hlcy5pbmNsdWRlcyhjKSAmJlxuICAgICAgICAhYmVnaW5uaW5nTWF0Y2hlcy5pbmNsdWRlcyhjKSk7XG4gICAgY29uc3QgbWF0Y2hlcyA9IFsuLi5leGFjdE1hdGNoZXMsIC4uLmJlZ2lubmluZ01hdGNoZXMsIC4uLnN1YnN0cmluZ01hdGNoZXNdO1xuICAgIGNob3Jkc0RhdGFMaXN0LnJlcGxhY2VDaGlsZHJlbiguLi5tYXRjaGVzLm1hcChjID0+IGNob3JkT3B0aW9uc1tjXSkpO1xufVxuLyoqIFBvcHVsYXRlcyB0aGUgaW5zdHJ1bWVudCBkcm9wLWRvd24gKi9cbmZ1bmN0aW9uIHBvcHVsYXRlSW5zdHJ1bWVudHMoKSB7XG4gICAgZm9yIChjb25zdCBpbnN0cnVtZW50IG9mIE9iamVjdC5rZXlzKGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudHMpKSB7XG4gICAgICAgIGluc3RydW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKCgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnb3B0aW9uJywge1xuICAgICAgICAgICAgdmFsdWU6IGluc3RydW1lbnQsXG4gICAgICAgICAgICBpbm5lclRleHQ6IGluc3RydW1lbnRcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbi8qKiBHZXRzIHRoZSBIVE1MIGVsZW1lbnQgY29udGFpbmluZyB0aGUgbGlzdCBvZiBjaG9yZCdzIG5vdGVzICovXG5mdW5jdGlvbiBnZXRDaG9yZERlc2NyaXB0aW9uRWxlbWVudChjaG9yZCkge1xuICAgIGNvbnN0IG5vdGVzID0gKDAsIHR5cG9ncmFwaHlfMS5hcHBseVR5cG9ncmFwaHkpKGNob3JkLm5vdGVzLmpvaW4oJyAnKSk7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcsIHtcbiAgICAgICAgaWQ6ICdjaG9yZERlc2NyaXB0aW9uJyxcbiAgICAgICAgaW5uZXJUZXh0OiBg4p+oICR7bm90ZXN9IOKfqWBcbiAgICB9KTtcbn1cbi8qKiBHZXRzIEhUTUwgZWxlbWVudCBjb250YWluaW5nIGFuIGVycm9yIG1lc3NhZ2UgKi9cbmZ1bmN0aW9uIGdldEVycm9yRWxlbWVudChtZXNzYWdlKSB7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcsIHtcbiAgICAgICAgaWQ6ICdlcnJvcicsXG4gICAgICAgIGlubmVyVGV4dDogbWVzc2FnZVxuICAgIH0pO1xufVxuLyoqIEN1cnJlbnQgc3RhdGUgb2YgdGhlIHBhZ2UgKi9cbmxldCBtb2RlbDtcbi8qKlxuICogRGlzcGxheXMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHBhZ2UuXG4gKiBUaGUgbW9kZWwgc2hvdWxkIGJlIGNvbnNpc3RlbnQgKHVzZSBgbWFrZUNvbnNpc3RlbnRgIGJlZm9yZSBjYWxsaW5nIHRoaXMpXG4gKi9cbmZ1bmN0aW9uIGRpc3BsYXlQYWdlKG1vZGVsKSB7XG4gICAgLy8gcHJldmVudCByZWN1cnNpdmUgYG9uSGFzaENoYW5nZWAgY2FsbHNcbiAgICByZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgb25IYXNoQ2hhbmdlKTtcbiAgICBjb25zdCBzdGF0dXMgPSBbXTtcbiAgICBjb25zdCBvdXRwdXQgPSBbXTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB0dW5pbmcgPSBuZXcgdHVuaW5nXzEuVHVuaW5nKG1vZGVsLnR1bmluZ0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgLy8gdHVuaW5nIGlzIHZhbGlkXG4gICAgICAgIGNvbnN0IGNob3JkTmFtZSA9IG1vZGVsLmNob3JkTmFtZS50cmltKCk7XG4gICAgICAgIGxldCBjaG9yZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGNob3JkTmFtZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY2hvcmQgPSBuZXcgY2hvcmRfMS5DaG9yZChjaG9yZE5hbWUpO1xuICAgICAgICAgICAgICAgIC8vIGNob3JkIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgc3RhdHVzLnB1c2goZ2V0Q2hvcmREZXNjcmlwdGlvbkVsZW1lbnQoY2hvcmQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIC8vIGNob3JkIGlzIGludmFsaWRcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBgJHtlcnJvcn1gO1xuICAgICAgICAgICAgICAgIHN0YXR1cy5wdXNoKGdldEVycm9yRWxlbWVudChtZXNzYWdlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZnJldGJvYXJkID0gdHVuaW5nLmdldEZyZXRib2FyZChjaG9yZCwgbW9kZWwuZnJldENvdW50KTtcbiAgICAgICAgb3V0cHV0LnB1c2goKDAsIGZyZXRib2FyZF8xLmdldEZyZXRib2FyZEVsZW1lbnQpKGZyZXRib2FyZCwgY2hvcmQgPT09IG51bGwgfHwgY2hvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNob3JkLm5vdGVzWzBdKSk7XG4gICAgICAgIGlmIChjaG9yZCAhPT0gdW5kZWZpbmVkIHx8IGNob3JkTmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgIC8vIGNoYW5nZSB1cmwgaGFzaCBvbmx5IGlmIHRoZSB0dW5pbmcgaXMgdmFsaWQgYW5kIHRoZSBjaG9yZCBpcyB2YWxpZCBvciBlbXB0eVxuICAgICAgICAgICAgKDAsIHVybEhhc2hfMS5zZXRVcmxIYXNoKShtb2RlbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIHR1bmluZyBpcyBpbnZhbGlkXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGAke2Vycm9yfWA7XG4gICAgICAgIHN0YXR1cy5wdXNoKGdldEVycm9yRWxlbWVudChgSW52YWxpZCB0dW5pbmc6ICR7bWVzc2FnZX1gKSk7XG4gICAgfVxuICAgIC8vIGlucHV0IGZpZWxkIHZhbHVlc1xuICAgIGluc3RydW1lbnRFbGVtZW50LnZhbHVlID0gbW9kZWwuaW5zdHJ1bWVudDtcbiAgICB0dW5pbmdFbGVtZW50LnZhbHVlID0gbW9kZWwudHVuaW5nRGVzY3JpcHRpb247XG4gICAgZnJldENvdW50RWxlbWVudC52YWx1ZSA9IG1vZGVsLmZyZXRDb3VudC50b1N0cmluZygpO1xuICAgIGNob3JkRWxlbWVudC52YWx1ZSA9IG1vZGVsLmNob3JkTmFtZTtcbiAgICAvLyBkaXNwbGF5IHRoZSBvdXRwdXRcbiAgICBzdGF0dXNFbGVtZW50LnJlcGxhY2VDaGlsZHJlbiguLi5zdGF0dXMpO1xuICAgIG91dHB1dEVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKC4uLm91dHB1dCk7XG4gICAgLy8gVGltZW91dCBmaXhlcyByZWN1cnNpdmUgYG9uSGFzaENoYW5nZWAgY2FsbHNcbiAgICAvLyBUT0RPOiBmaW5kIHRoZSByZWFzb24gYW5kIGEgYmV0dGVyIHNvbHV0aW9uXG4gICAgc2V0VGltZW91dCgoKSA9PiB7IGFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBvbkhhc2hDaGFuZ2UpOyB9LCAxMDApO1xufVxuLyoqIENoYW5nZXMgdGhlIGN1cnJlbnQgcGFnZSBzdGF0ZSAqL1xuZnVuY3Rpb24gY2hhbmdlTW9kZWwobmV3TW9kZWwpIHtcbiAgICBtb2RlbCA9ICgwLCBtb2RlbF8xLm1ha2VDb25zaXN0ZW50KShuZXdNb2RlbCk7XG4gICAgZGlzcGxheVBhZ2UobW9kZWwpO1xufVxuLy8gSW5wdXQgYWN0aW9uczpcbmZ1bmN0aW9uIG9uSW5zdHJ1bWVudElucHV0KCkge1xuICAgIGNvbnN0IGluc3RydW1lbnQgPSBpbnN0cnVtZW50RWxlbWVudC52YWx1ZTtcbiAgICBjaGFuZ2VNb2RlbChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBpbnN0cnVtZW50LCB0dW5pbmdEZXNjcmlwdGlvbjogJycgfSkpO1xufVxuZnVuY3Rpb24gb25UdW5pbmdJbnB1dCgpIHtcbiAgICBjb25zdCB0dW5pbmdEZXNjcmlwdGlvbiA9IHR1bmluZ0VsZW1lbnQudmFsdWU7XG4gICAgY2hhbmdlTW9kZWwoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgdHVuaW5nRGVzY3JpcHRpb24sIGluc3RydW1lbnQ6ICcnIH0pKTtcbn1cbmZ1bmN0aW9uIG9uRnJldENvdW50SW5wdXQoKSB7XG4gICAgY29uc3QgZnJldENvdW50ID0gcGFyc2VJbnQoZnJldENvdW50RWxlbWVudC52YWx1ZSk7XG4gICAgY2hhbmdlTW9kZWwoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgZnJldENvdW50IH0pKTtcbn1cbmZ1bmN0aW9uIG9uQ2hvcmRJbnB1dChlKSB7XG4gICAgY29uc3QgY2hvcmROYW1lID0gY2hvcmRFbGVtZW50LnZhbHVlO1xuICAgIGlmIChlIGluc3RhbmNlb2YgSW5wdXRFdmVudCAmJiBlLmlucHV0VHlwZSAhPT0gJ2luc2VydFJlcGxhY2VtZW50VGV4dCcpIHtcbiAgICAgICAgcG9wdWxhdGVDaG9yZHNEYXRhbGlzdChjaG9yZE5hbWUpO1xuICAgIH1cbiAgICBjaGFuZ2VNb2RlbChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBjaG9yZE5hbWUgfSkpO1xufVxuZnVuY3Rpb24gb25IYXNoQ2hhbmdlKCkge1xuICAgIGNoYW5nZU1vZGVsKCgwLCB1cmxIYXNoXzEuZ2V0VXJsSGFzaCkoKSk7XG4gICAgcG9wdWxhdGVDaG9yZHNEYXRhbGlzdChtb2RlbC5jaG9yZE5hbWUpO1xufVxuLy8gRW50cnkgcG9pbnRcbmZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgcG9wdWxhdGVJbnN0cnVtZW50cygpO1xuICAgIG9uSGFzaENoYW5nZSgpO1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBvbkhhc2hDaGFuZ2UpO1xuICAgIGluc3RydW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25JbnN0cnVtZW50SW5wdXQpO1xuICAgIHR1bmluZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvblR1bmluZ0lucHV0KTtcbiAgICBmcmV0Q291bnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25GcmV0Q291bnRJbnB1dCk7XG4gICAgY2hvcmRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25DaG9yZElucHV0KTtcbiAgICBjaG9yZEVsZW1lbnQuZm9jdXMoKTtcbn1cbmV4cG9ydHMuaW5pdGlhbGl6ZSA9IGluaXRpYWxpemU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWFrZUNvbnNpc3RlbnQgPSBleHBvcnRzLmRlZmF1bHRNb2RlbCA9IGV4cG9ydHMubWF4RnJldENvdW50ID0gdm9pZCAwO1xuY29uc3QgaW5zdHJ1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvaW5zdHJ1bWVudHNcIik7XG5jb25zdCB0dW5pbmdfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvdHVuaW5nXCIpO1xuZXhwb3J0cy5tYXhGcmV0Q291bnQgPSAzNjtcbi8qKiBUaGUgdmFsdWVzIHVzZWQgd2hlbiB0aGUgcGFnZSBpcyBvcGVuIHdpdGhvdXQgYSBVUkwgaGFzaCAqL1xuZXhwb3J0cy5kZWZhdWx0TW9kZWwgPSB7XG4gICAgaW5zdHJ1bWVudDogJ1VrdWxlbGUgKGhpZ2ggRyknLFxuICAgIHR1bmluZ0Rlc2NyaXB0aW9uOiAnRzQgQzQgRTQgQTQnLFxuICAgIGZyZXRDb3VudDogMTIsXG4gICAgY2hvcmROYW1lOiAnJyxcbn07XG4vKipcbiAqIENoYW5nZXMgdGhlIG1vZGVsIHNvIHRoYXQgaXRzIHZhbHVlcyBhcmUgY29uc2lzdGVudCBhbmQgcmV0dXJucyB0aGUgcmVzdWx0LlxuICogVGhlIHZhbHVlcyBkb24ndCBoYXZlIHRvIGJlIHZhbGlkIHRob3VnaCAoZS5nLiBpbnZhbGlkIHR1bmluZyBvciBjaG9yZCBhcmUgT0ssXG4gKiBidXQgYSB2YWxpZCB0dW5pbmcgd2l0aCBhIHdyb25nIGluc3RydW1lbnQgaXMgbm90KVxuICovXG5mdW5jdGlvbiBtYWtlQ29uc2lzdGVudChtb2RlbCkge1xuICAgIHZhciBfYTtcbiAgICAvLyBmcmV0Q291bnQgc2hvdWxkIGJlIGFuIGludGVnZXIgYmV0d2VlbiAwIGFuZCBtYXhGcmV0Q291bnRcbiAgICBjb25zdCBmcmV0Q291bnQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihleHBvcnRzLm1heEZyZXRDb3VudCwgTWF0aC5yb3VuZChtb2RlbC5mcmV0Q291bnQpKSk7XG4gICAgbW9kZWwgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBmcmV0Q291bnQgfSk7XG4gICAgY29uc3QgaW5zdHJ1bWVudFR1bmluZyA9IChfYSA9IGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudHNbbW9kZWwuaW5zdHJ1bWVudF0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kZXNjcmlwdGlvbjtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB0dW5pbmcgPSBuZXcgdHVuaW5nXzEuVHVuaW5nKG1vZGVsLnR1bmluZ0Rlc2NyaXB0aW9uKS5kZXNjcmlwdGlvbjtcbiAgICAgICAgaWYgKHR1bmluZyAhPT0gaW5zdHJ1bWVudFR1bmluZykge1xuICAgICAgICAgICAgLy8gaWYgdHVuaW5nIGlzIHZhbGlkIGFuZCBkaWZmZXJzIGZyb20gaW5zdHJ1bWVudCdzLCBjaGFuZ2UgdGhlIGluc3RydW1lbnRcbiAgICAgICAgICAgIGNvbnN0IGluc3RydW1lbnQgPSBpbnN0cnVtZW50c18xLmluc3RydW1lbnRCeVR1bmluZ1t0dW5pbmddIHx8ICcnO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGluc3RydW1lbnQgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKF9iKSB7IH1cbiAgICBpZiAoaW5zdHJ1bWVudFR1bmluZykge1xuICAgICAgICAvLyBJZiB0dW5pbmcgaXMgaW52YWxpZCBhbmQgaW5zdHJ1bWVudCBpcyB2YWxpZCwgY2hhbmdlIHRoZSB0dW5pbmdcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IHR1bmluZ0Rlc2NyaXB0aW9uOiBpbnN0cnVtZW50VHVuaW5nIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gSWYgaW5zdHJ1bWVudCBpcyBpbnZhbGlkLCBjaGFuZ2UgaXQgdG8gJydcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGluc3RydW1lbnQ6ICcnIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMubWFrZUNvbnNpc3RlbnQgPSBtYWtlQ29uc2lzdGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hcHBseVR5cG9ncmFwaHkgPSB2b2lkIDA7XG5jb25zdCBjaGFyYWN0ZXJEaWN0ID0ge1xuICAgICcjJzogJ+KZrycsXG4gICAgJ2InOiAn4pmtJyxcbiAgICAnMCc6ICfigoAnLFxuICAgICcxJzogJ+KCgScsXG4gICAgJzInOiAn4oKCJyxcbiAgICAnMyc6ICfigoMnLFxuICAgICc0JzogJ+KChCcsXG4gICAgJzUnOiAn4oKFJyxcbiAgICAnNic6ICfigoYnLFxuICAgICc3JzogJ+KChycsXG4gICAgJzgnOiAn4oKIJyxcbiAgICAnOSc6ICfigoknLFxufTtcbmNvbnN0IHJlcGxhY2VSZWdleCA9IG5ldyBSZWdFeHAoYFske09iamVjdC5rZXlzKGNoYXJhY3RlckRpY3QpfV1gLCAnZycpO1xuLyoqXG4gKiBSZXBsYWNlcyBlYXN5LXRvLXR5cGUgQVNDSUkgY2hhcmFjdGVyc1xuICogZm9yIGFjY2lkZW50YWxzIGFuZCBvY3RhdmUgbnVtYmVyc1xuICogd2l0aCBnb29kLWxvb2tpbmcgVW5pY29kZSBvbmVzXG4gKi9cbmZ1bmN0aW9uIGFwcGx5VHlwb2dyYXBoeSh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShyZXBsYWNlUmVnZXgsIGMgPT4gY2hhcmFjdGVyRGljdFtjXSk7XG59XG5leHBvcnRzLmFwcGx5VHlwb2dyYXBoeSA9IGFwcGx5VHlwb2dyYXBoeTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRVcmxIYXNoID0gZXhwb3J0cy5zZXRVcmxIYXNoID0gdm9pZCAwO1xuY29uc3QgbW9kZWxfMSA9IHJlcXVpcmUoXCIuL21vZGVsXCIpO1xuY29uc3QgZm9ybWF0VmVyc2lvbiA9IDA7XG4vKipcbiAqIEVuY29kZXMgdGhlIG1vZGVsIGludG8gdGhlIHBhZ2UncyBVUkwgaGFzaCBwYXJ0LlxuICogVGhpcyBhbGxvd3MgdGhlIHVzZXIgdG8gc2hhcmUgbGlua3MgdG8gc3BlY2lmaWMgdHVuaW5ncyBhbmQgY2hvcmRzXG4gKi9cbmZ1bmN0aW9uIHNldFVybEhhc2gobW9kZWwpIHtcbiAgICBjb25zdCB0dW5pbmdEZXNjcmlwdGlvbiA9IG1vZGVsLnR1bmluZ0Rlc2NyaXB0aW9uLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICctJyk7XG4gICAgY29uc3QgY2hvcmROYW1lID0gbW9kZWwuY2hvcmROYW1lLnRyaW0oKTtcbiAgICBjb25zdCBoYXNoID0gYCR7Zm9ybWF0VmVyc2lvbn18JHt0dW5pbmdEZXNjcmlwdGlvbn18JHttb2RlbC5mcmV0Q291bnR9fCR7Y2hvcmROYW1lfWA7XG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoO1xufVxuZXhwb3J0cy5zZXRVcmxIYXNoID0gc2V0VXJsSGFzaDtcbi8qKiBSZWFkcyB0aGUgbW9kZWwgZnJvbSB0aGUgcGFnZSdzIFVSTCBoYXNoIHBhcnQgKi9cbmZ1bmN0aW9uIGdldFVybEhhc2goKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdGV4dCA9IGRlY29kZVVSSSh3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKC8jLywgJycpKTtcbiAgICAgICAgY29uc3QgcGFydHMgPSB0ZXh0LnNwbGl0KCd8Jyk7XG4gICAgICAgIGlmIChwYXJzZUludChwYXJ0c1swXSkgPT09IGZvcm1hdFZlcnNpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IHR1bmluZ0Rlc2NyaXB0aW9uID0gcGFydHNbMV0ucmVwbGFjZSgvLS9nLCAnICcpO1xuICAgICAgICAgICAgY29uc3QgZnJldENvdW50ID0gcGFyc2VJbnQocGFydHNbMl0pO1xuICAgICAgICAgICAgY29uc3QgY2hvcmROYW1lID0gcGFydHNbM107XG4gICAgICAgICAgICByZXR1cm4geyBpbnN0cnVtZW50OiAnJywgdHVuaW5nRGVzY3JpcHRpb24sIGZyZXRDb3VudCwgY2hvcmROYW1lIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7IH1cbiAgICByZXR1cm4gbW9kZWxfMS5kZWZhdWx0TW9kZWw7XG59XG5leHBvcnRzLmdldFVybEhhc2ggPSBnZXRVcmxIYXNoO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdWlfMSA9IHJlcXVpcmUoXCIuL3VpXCIpO1xuKDAsIHVpXzEuaW5pdGlhbGl6ZSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==