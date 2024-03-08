/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/theory/chord.ts":
/*!*****************************!*\
  !*** ./src/theory/chord.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Chord = exports.suffixes = void 0;
const note_1 = __webpack_require__(/*! ./note */ "./src/theory/note.ts");
// Intervals in semitones:
const [P1, m2, M2, m3, M3, P4, A4, P5, m6, M6, m7, M7] = Array(12).keys();
exports.suffixes = [
    'm(no5)', '(no5)', '5',
    'dim', 'sus2', 'm', '', 'sus4', 'aug',
    'm6', '6', 'm7', 'mM7', '7', 'M7',
];
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
exports.Note = exports.noteNamePattern = exports.unsupported = exports.noteNames = void 0;
/** 12edo notes. A note can have one or two names */
exports.noteNames = [
    ['C'], ['C#', 'Db'],
    ['D'], ['D#', 'Eb'],
    ['E'],
    ['F'], ['F#', 'Gb'],
    ['G'], ['G#', 'Ab'],
    ['A'], ['A#', 'Bb'],
    ['B'],
];
exports.unsupported = {
    'Cb': 'B',
    'B#': 'C',
    'Fb': 'E',
    'E#': 'F',
};
const noteIndexByName = {};
for (const [index, names] of exports.noteNames.entries()) {
    for (const name of names) {
        noteIndexByName[name] = index;
    }
}
exports.noteNamePattern = '[A-G][#b]?'; // used by chord.ts
const noteRegex = new RegExp(`^(${exports.noteNamePattern})(\\d)?$`);
/** Represents either an absolute-pitched note or an octave-invariant note */
class Note {
    constructor(name) {
        const match = name.match(noteRegex);
        if (match) {
            const [_, noteName, octaveName] = match;
            if (noteName in exports.unsupported) {
                const suggestion = exports.unsupported[noteName];
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
        const noteName = exports.noteNames[this.pitchClass][0];
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
 * The order of the strings is left-to-right if the instrument is right-handed
 * and positioned with the neck up and the strings facing you.
 * (On the diagram, the order is bottom-to-top)
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
     * Each cell contains either a note (if the note is in the chord) or `null` (otherwise).
     * If the chord is `undefined`, returns a table with all `null`s
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
 * and hues of neighbor groups contrast well with each other
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

/***/ "./src/ui/hints.ts":
/*!*************************!*\
  !*** ./src/ui/hints.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Hints = void 0;
const note_1 = __webpack_require__(/*! ../theory/note */ "./src/theory/note.ts");
const chord_1 = __webpack_require__(/*! ../theory/chord */ "./src/theory/chord.ts");
const dom_1 = __webpack_require__(/*! ./dom */ "./src/ui/dom.ts");
const typography_1 = __webpack_require__(/*! ./typography */ "./src/ui/typography.ts");
const noteRegex = new RegExp(`^\s*${note_1.noteNamePattern}`);
function getHints(inputText) {
    const note = inputText.match(noteRegex);
    if (note && !(note[0] in note_1.unsupported)) {
        return chord_1.suffixes.map(suffix => {
            const chordName = note + suffix;
            const chord = new chord_1.Chord(chordName);
            return {
                text: chordName,
                tooltip: chord.notes.join(' ')
            };
        });
    }
    else {
        return note_1.noteNames.map(names => ({
            text: names[0],
            tooltip: names[1] || ''
        }));
    }
}
class Hints {
    constructor(hintsContainer, onClick) {
        this.hintsContainer = hintsContainer;
        this.onClick = onClick;
    }
    getHintElement(hint) {
        const button = (0, dom_1.createElement)('button', {
            innerText: (0, typography_1.applyTypography)(hint.text),
            title: (0, typography_1.applyTypography)(hint.tooltip),
        });
        button.addEventListener('click', () => { this.onClick(hint.text); });
        return button;
    }
    /** Shows the hint buttons */
    show(inputText) {
        const hints = getHints(inputText);
        const hintElements = hints.map(hint => this.getHintElement(hint));
        this.hintsContainer.replaceChildren(...hintElements);
    }
}
exports.Hints = Hints;


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
const hints_1 = __webpack_require__(/*! ./hints */ "./src/ui/hints.ts");
// Static page elements
const instrumentElement = (0, dom_1.getById)('instrument');
const tuningElement = (0, dom_1.getById)('tuning');
const fretCountElement = (0, dom_1.getById)('fretCount');
const chordElement = (0, dom_1.getById)('chord');
const clearChordButton = (0, dom_1.getById)('clearChord');
const hintsElement = (0, dom_1.getById)('hints');
const statusElement = (0, dom_1.getById)('status');
const outputElement = (0, dom_1.getById)('output');
const hints = new hints_1.Hints(hintsElement, onHintClick);
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
    hints.show(model.chordName);
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
function onChordInput() {
    const chordName = chordElement.value;
    changeModel(Object.assign(Object.assign({}, model), { chordName }));
}
function onHintClick(hint) {
    changeModel(Object.assign(Object.assign({}, model), { chordName: hint }));
}
function onChordClear() {
    changeModel(Object.assign(Object.assign({}, model), { chordName: '' }));
}
function onHashChange() {
    changeModel((0, urlHash_1.getUrlHash)());
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
    clearChordButton.addEventListener('click', onChordClear);
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
/** The values used when the page is openned without a URL hash */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBLDZDQUE2QyxZQUFZLHFDQUFxQztBQUM5RjtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsWUFBWSxnQkFBZ0I7QUFDekU7QUFDQTtBQUNBLHNCQUFzQjs7Ozs7Ozs7Ozs7QUMzQ1Q7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsMkJBQTJCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7Ozs7Ozs7Ozs7O0FDMUJWO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQixHQUFHLGtCQUFrQjtBQUN2QyxnQkFBZ0IsbUJBQU8sQ0FBQyxrQ0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGNBQWMsR0FBRyxrQkFBa0IsR0FBRyxnQkFBZ0IsR0FBRyxVQUFVO0FBQ3ZGO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjs7Ozs7OztVQ25DbEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxhQUFhLG1CQUFPLENBQUMsK0JBQU07QUFDM0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3RoZW9yeS9jaG9yZC50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3RoZW9yeS9pbnN0cnVtZW50cy50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3RoZW9yeS9ub3RlLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L3R1bmluZy50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL2NvbG9ycy50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL2RvbS50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL2ZyZXRib2FyZC50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL2hpbnRzLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9tb2RlbC50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL3R5cG9ncmFwaHkudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS91cmxIYXNoLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2hvcmQgPSBleHBvcnRzLnN1ZmZpeGVzID0gdm9pZCAwO1xuY29uc3Qgbm90ZV8xID0gcmVxdWlyZShcIi4vbm90ZVwiKTtcbi8vIEludGVydmFscyBpbiBzZW1pdG9uZXM6XG5jb25zdCBbUDEsIG0yLCBNMiwgbTMsIE0zLCBQNCwgQTQsIFA1LCBtNiwgTTYsIG03LCBNN10gPSBBcnJheSgxMikua2V5cygpO1xuZXhwb3J0cy5zdWZmaXhlcyA9IFtcbiAgICAnbShubzUpJywgJyhubzUpJywgJzUnLFxuICAgICdkaW0nLCAnc3VzMicsICdtJywgJycsICdzdXM0JywgJ2F1ZycsXG4gICAgJ202JywgJzYnLCAnbTcnLCAnbU03JywgJzcnLCAnTTcnLFxuXTtcbmNvbnN0IHN1ZmZpeE1lYW5pbmdzID0ge1xuICAgICdtKG5vNSknOiBbUDEsIG0zXSxcbiAgICAnKG5vNSknOiBbUDEsIE0zXSxcbiAgICAnNSc6IFtQMSwgUDVdLFxuICAgICdkaW0nOiBbUDEsIG0zLCBBNF0sXG4gICAgJ3N1czInOiBbUDEsIE0yLCBQNV0sXG4gICAgJ20nOiBbUDEsIG0zLCBQNV0sXG4gICAgJyc6IFtQMSwgTTMsIFA1XSxcbiAgICAnc3VzNCc6IFtQMSwgUDQsIFA1XSxcbiAgICAnYXVnJzogW1AxLCBNMywgbTZdLFxuICAgICdtNic6IFtQMSwgbTMsIFA1LCBNNl0sXG4gICAgJzYnOiBbUDEsIE0zLCBQNSwgTTZdLFxuICAgICdtNyc6IFtQMSwgbTMsIFA1LCBtN10sXG4gICAgJ21NNyc6IFtQMSwgbTMsIFA1LCBNN10sXG4gICAgJzcnOiBbUDEsIE0zLCBQNSwgbTddLFxuICAgICdNNyc6IFtQMSwgTTMsIFA1LCBNN10sXG59O1xuY29uc3QgY2hvcmRSZWdleCA9IG5ldyBSZWdFeHAoYF4oJHtub3RlXzEubm90ZU5hbWVQYXR0ZXJufSkoLiopJGApO1xuY2xhc3MgQ2hvcmQge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBuYW1lLm1hdGNoKGNob3JkUmVnZXgpO1xuICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYENhbid0IHBhcnNlIGNob3JkICR7bmFtZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbXywgcm9vdE5hbWUsIHN1ZmZpeF0gPSBtYXRjaDtcbiAgICAgICAgY29uc3Qgcm9vdCA9IG5ldyBub3RlXzEuTm90ZShyb290TmFtZSk7XG4gICAgICAgIGlmICghKHN1ZmZpeCBpbiBzdWZmaXhNZWFuaW5ncykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgQ2FuJ3QgcGFyc2UgY2hvcmQgc3VmZml4ICR7c3VmZml4fWApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm90ZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBpbnRlcnZhbCBvZiBzdWZmaXhNZWFuaW5nc1tzdWZmaXhdKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGVzLnB1c2gocm9vdC5hZGRJbnRlcnZhbChpbnRlcnZhbCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSA9IDwke3RoaXMubm90ZXMuam9pbignICcpfT5gO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2hvcmQgPSBDaG9yZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmcgPSBleHBvcnRzLmluc3RydW1lbnRzID0gdm9pZCAwO1xuY29uc3QgdHVuaW5nXzEgPSByZXF1aXJlKFwiLi90dW5pbmdcIik7XG5leHBvcnRzLmluc3RydW1lbnRzID0ge1xuICAgICdCYWxhbGFpa2EgKGFjYWRlbWljKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0U0IEU0IEE0JyksXG4gICAgJ0JhbGFsYWlrYSAoZm9sayknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDNCBFNCBHNCcpLFxuICAgICdCYW5qbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEQzIEczIEIzIEQ0JyksXG4gICAgJ0Jhc3MnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFMSBBMSBEMiBHMicpLFxuICAgICdCcmFndWluaGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBCNCBENScpLFxuICAgICdDaGFyYW5nbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEM1IEUgQTQgRTUnKSxcbiAgICAnQ2F2YXF1aW5obyAoUG9ydHVnYWwgR0dCRCknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBHNCBCNCBENScpLFxuICAgICdDYXZhcXVpbmhvIChQb3J0dWdhbCBEQUJFKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q1IEE0IEI0IEU1JyksXG4gICAgJ0NhdmFxdWluaG8gKEJyYXppbCBER0JEKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEI0IEQ1JyksXG4gICAgJ0NhdmFxdWluaG8gKEJyYXppbCBER0JFKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEI0IEU1JyksXG4gICAgJ0RhbGEgZmFlbmR5cic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0U0IEE0IEU1JyksXG4gICAgJ0RlY2hpZyBwb25kYXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDNCBENCBHNCcpLFxuICAgICdHdWl0YWxlbGUnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMiBEMyBHMyBDNCBFNCBBNCcpLFxuICAgICdHdWl0YXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFMiBBMiBEMyBHMyBCMyBFNCcpLFxuICAgICdHdWl0YXJyw7NuJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTEgRDIgRzIgQzMgRTMgQTInKSxcbiAgICAnSmFyYW5hIGphcm9jaGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBDNCBFIEEzIEczJyksXG4gICAgJ0phcmFuYSBodWFzdGVjYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEIzIEQ0IEYjNCBBNCcpLFxuICAgICdNYW5kb2xpbic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEQ0IEE0IEU1JyksXG4gICAgJ1JhamFvJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQzQgRTQgQTQnKSxcbiAgICAnUmVxdWludG8nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMiBEMyBHMyBDNCBFNCBBNCcpLFxuICAgICdTZW1pc3RydW5rYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0QyIEcyIEIyIEQzIEczIEIzIEQ0JyksXG4gICAgJ1Rlbm9yIGd1aXRhcic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0MzIEczIEQ0IEE0JyksXG4gICAgJ1RpbXBsZSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEM1IEU0IEE0IEQ1JyksXG4gICAgJ1VrdWxlbGUgKGhpZ2ggRyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBDNCBFNCBBNCcpLFxuICAgICdVa3VsZWxlIChsb3cgRyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBDNCBFNCBBNCcpLFxuICAgICdVa3VsZWxlIChiYXJpdG9uZSknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdEMyBHMyBCMyBFNCcpLFxuICAgICdWaWh1ZWxhJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTMgRDQgRzQgQjMgRTQnKSxcbiAgICAnVmlvbGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDMyBHMyBENCBBNCcpLFxuICAgICdWaW9saW4nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBENCBBNCBFNScpLFxufTtcbi8qKiBHZXRzIHRoZSBmaXJzdCBpbnN0cnVtZW50IHdpdGggdGhlIGdpdmVuIHR1bmluZyAqL1xuZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmcgPSB7fTtcbmZvciAoY29uc3QgW25hbWUsIHR1bmluZ10gb2YgT2JqZWN0LmVudHJpZXMoZXhwb3J0cy5pbnN0cnVtZW50cykpIHtcbiAgICBpZiAoISh0dW5pbmcuZGVzY3JpcHRpb24gaW4gZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmcpKSB7XG4gICAgICAgIGV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nW3R1bmluZy5kZXNjcmlwdGlvbl0gPSBuYW1lO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Ob3RlID0gZXhwb3J0cy5ub3RlTmFtZVBhdHRlcm4gPSBleHBvcnRzLnVuc3VwcG9ydGVkID0gZXhwb3J0cy5ub3RlTmFtZXMgPSB2b2lkIDA7XG4vKiogMTJlZG8gbm90ZXMuIEEgbm90ZSBjYW4gaGF2ZSBvbmUgb3IgdHdvIG5hbWVzICovXG5leHBvcnRzLm5vdGVOYW1lcyA9IFtcbiAgICBbJ0MnXSwgWydDIycsICdEYiddLFxuICAgIFsnRCddLCBbJ0QjJywgJ0ViJ10sXG4gICAgWydFJ10sXG4gICAgWydGJ10sIFsnRiMnLCAnR2InXSxcbiAgICBbJ0cnXSwgWydHIycsICdBYiddLFxuICAgIFsnQSddLCBbJ0EjJywgJ0JiJ10sXG4gICAgWydCJ10sXG5dO1xuZXhwb3J0cy51bnN1cHBvcnRlZCA9IHtcbiAgICAnQ2InOiAnQicsXG4gICAgJ0IjJzogJ0MnLFxuICAgICdGYic6ICdFJyxcbiAgICAnRSMnOiAnRicsXG59O1xuY29uc3Qgbm90ZUluZGV4QnlOYW1lID0ge307XG5mb3IgKGNvbnN0IFtpbmRleCwgbmFtZXNdIG9mIGV4cG9ydHMubm90ZU5hbWVzLmVudHJpZXMoKSkge1xuICAgIGZvciAoY29uc3QgbmFtZSBvZiBuYW1lcykge1xuICAgICAgICBub3RlSW5kZXhCeU5hbWVbbmFtZV0gPSBpbmRleDtcbiAgICB9XG59XG5leHBvcnRzLm5vdGVOYW1lUGF0dGVybiA9ICdbQS1HXVsjYl0/JzsgLy8gdXNlZCBieSBjaG9yZC50c1xuY29uc3Qgbm90ZVJlZ2V4ID0gbmV3IFJlZ0V4cChgXigke2V4cG9ydHMubm90ZU5hbWVQYXR0ZXJufSkoXFxcXGQpPyRgKTtcbi8qKiBSZXByZXNlbnRzIGVpdGhlciBhbiBhYnNvbHV0ZS1waXRjaGVkIG5vdGUgb3IgYW4gb2N0YXZlLWludmFyaWFudCBub3RlICovXG5jbGFzcyBOb3RlIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gbmFtZS5tYXRjaChub3RlUmVnZXgpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGNvbnN0IFtfLCBub3RlTmFtZSwgb2N0YXZlTmFtZV0gPSBtYXRjaDtcbiAgICAgICAgICAgIGlmIChub3RlTmFtZSBpbiBleHBvcnRzLnVuc3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbiA9IGV4cG9ydHMudW5zdXBwb3J0ZWRbbm90ZU5hbWVdO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVXNlICR7c3VnZ2VzdGlvbn0gaW5zdGVhZCBvZiAke25vdGVOYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5waXRjaENsYXNzID0gbm90ZUluZGV4QnlOYW1lW25vdGVOYW1lXTtcbiAgICAgICAgICAgIHRoaXMub2N0YXZlID0gb2N0YXZlTmFtZSAhPT0gdW5kZWZpbmVkID8gcGFyc2VJbnQob2N0YXZlTmFtZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYENhbid0IHBhcnNlIG5vdGUgJHtuYW1lfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tUGl0Y2hDbGFzc0FuZE9jdGF2ZShwaXRjaENsYXNzLCBvY3RhdmUpIHtcbiAgICAgICAgbGV0IG5vdGUgPSBPYmplY3QuY3JlYXRlKE5vdGUucHJvdG90eXBlKTtcbiAgICAgICAgbm90ZS5waXRjaENsYXNzID0gcGl0Y2hDbGFzcztcbiAgICAgICAgbm90ZS5vY3RhdmUgPSBvY3RhdmU7XG4gICAgICAgIHJldHVybiBub3RlO1xuICAgIH1cbiAgICAvKiogQ2Fub25pY2FsIG5hbWUgb2YgdGhlIG5vdGUuIEZsYXRzIGFyZW4ndCB1c2VkIChlLmcuIEJiIGJlY29tZXMgQSMpICovXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIGNvbnN0IG5vdGVOYW1lID0gZXhwb3J0cy5ub3RlTmFtZXNbdGhpcy5waXRjaENsYXNzXVswXTtcbiAgICAgICAgcmV0dXJuIHRoaXMub2N0YXZlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gYCR7bm90ZU5hbWV9JHt0aGlzLm9jdGF2ZX1gXG4gICAgICAgICAgICA6IG5vdGVOYW1lO1xuICAgIH1cbiAgICAvKiogQWRkcyBhIG5vbi1uZWdhdGl2ZSBpbnRlcnZhbCBpbiBzZW1pdG9uZXMgYW5kIHJldHVybnMgdGhlIHJlc3VsdCAqL1xuICAgIGFkZEludGVydmFsKGludGVydmFsKSB7XG4gICAgICAgIGNvbnN0IHBpdGNoID0gdGhpcy5waXRjaENsYXNzICsgaW50ZXJ2YWw7XG4gICAgICAgIGNvbnN0IG9jdGF2ZSA9IHRoaXMub2N0YXZlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gdGhpcy5vY3RhdmUgKyBNYXRoLmZsb29yKHBpdGNoIC8gMTIpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIE5vdGUuZnJvbVBpdGNoQ2xhc3NBbmRPY3RhdmUocGl0Y2ggJSAxMiwgb2N0YXZlKTsgLy8gaW5jb3JyZWN0IGZvciBuZWdhdGl2ZSBpbnRlcnZhbHNcbiAgICB9XG59XG5leHBvcnRzLk5vdGUgPSBOb3RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlR1bmluZyA9IGV4cG9ydHMuZ2V0R3JvdXAgPSB2b2lkIDA7XG5jb25zdCBub3RlXzEgPSByZXF1aXJlKFwiLi9ub3RlXCIpO1xuY29uc3Qgc3BsaXRSZWdleCA9IC9cXHMrfCg/PVtBLVpdKS87IC8vIHNwbGl0IGJ5IHdoaXRlc3BhY2Ugb3IgYmVmb3JlIHVwcGVyY2FzZSBsZXR0ZXJzXG4vKiogUmV0dXJucyBhIHJvdyBvZiB0aGUgZnJldCB0YWJsZSAoc2VlIGBnZXRGcmV0Ym9hcmRgKSAqL1xuZnVuY3Rpb24gZ2V0RnJldHMob3BlblN0cmluZywgYWxsb3dlZFBpdGNoZXMsIGZyZXRDb3VudCkge1xuICAgIGNvbnN0IGZyZXRzID0gW107XG4gICAgZm9yIChsZXQgZnJldEluZGV4ID0gMDsgZnJldEluZGV4IDw9IGZyZXRDb3VudDsgZnJldEluZGV4KyspIHtcbiAgICAgICAgY29uc3Qgbm90ZSA9IG9wZW5TdHJpbmcuYWRkSW50ZXJ2YWwoZnJldEluZGV4KTtcbiAgICAgICAgZnJldHMucHVzaChhbGxvd2VkUGl0Y2hlcy5oYXMobm90ZS5waXRjaENsYXNzKSA/IG5vdGUgOiBudWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXRzO1xufVxuLyoqXG4gKiBBc3NpZ25zIGEgZ3JvdXAgaW5kZXggdG8gYSBnaXZlbiBub3RlIGJhc2VkIG9uIHRoZSBjaG9yZCdzIHJvb3Qgbm90ZVxuICogc28gdGhhdCBub3RlcyBpbnNpZGUgYSBzaW5nbGUgZ3JvdXAgZm9ybSBhIG5vbi1pbnZlcnRlZCBjaG9yZFxuICovXG5mdW5jdGlvbiBnZXRHcm91cChyb290Tm90ZSwgbm90ZSkge1xuICAgIGlmIChub3RlICE9PSBudWxsICYmIG5vdGUub2N0YXZlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKG5vdGUub2N0YXZlICogMTIgKyBub3RlLnBpdGNoQ2xhc3MgLSByb290Tm90ZS5waXRjaENsYXNzKSAvIDEyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRHcm91cCA9IGdldEdyb3VwO1xuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSB0dW5pbmcgb2YgYW4gaW5zdHJ1bWVudC5cbiAqIENhbiBjb250YWluIGJvdGggYWJzb2x1dGUtcGl0Y2hlZCBhbmQgb2N0YXZlLWludmFyaWFudCBzdHJpbmdzLlxuICogVGhlIG9yZGVyIG9mIHRoZSBzdHJpbmdzIGlzIGxlZnQtdG8tcmlnaHQgaWYgdGhlIGluc3RydW1lbnQgaXMgcmlnaHQtaGFuZGVkXG4gKiBhbmQgcG9zaXRpb25lZCB3aXRoIHRoZSBuZWNrIHVwIGFuZCB0aGUgc3RyaW5ncyBmYWNpbmcgeW91LlxuICogKE9uIHRoZSBkaWFncmFtLCB0aGUgb3JkZXIgaXMgYm90dG9tLXRvLXRvcClcbiAqL1xuY2xhc3MgVHVuaW5nIHtcbiAgICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLm9wZW5TdHJpbmdzID0gZGVzY3JpcHRpb25cbiAgICAgICAgICAgIC5zcGxpdChzcGxpdFJlZ2V4KVxuICAgICAgICAgICAgLmZpbHRlcihuID0+IG4gIT09ICcnKVxuICAgICAgICAgICAgLm1hcChuID0+IG5ldyBub3RlXzEuTm90ZShuKSk7XG4gICAgICAgIGlmICh0aGlzLm9wZW5TdHJpbmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdCBsZWFzdCBvbmUgb3BlbiBzdHJpbmcgcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5vcGVuU3RyaW5ncy5qb2luKCcgJyk7XG4gICAgfVxuICAgIC8qKiBOb3JtYWxpemVkIHR1bmluZyBkZXNjcmlwdGlvbjogZmxhdHMgYXJlbid0IHVzZWQsIHRoZSBub3RlcyBhcmUgc2VwYXJhdGVkIGJ5IHNwYWNlcyAqL1xuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYFR1bmluZyhcIiR7dGhpcy5kZXNjcmlwdGlvbn1cIilgO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBmcmV0IHRhYmxlIGZvciBhIGdpdmVuIGNob3JkIGFzIGFuIGFycmF5IG9mIHRhYmxlIHJvd3MuXG4gICAgICogRWFjaCByb3cgaXMgYW4gYXJyYXkgb2YgY2VsbHMgYW5kIHJlcHJlc2VudHMgYSBzdHJpbmcuXG4gICAgICogVGhlIG9yZGVyIG9mIHRoZSByb3dzIGZvbGxvd3MgdGhlIHN0cmluZyBvcmRlciBpbiB0aGUgdHVuaW5nIGRlc2NyaXB0aW9uIChib3R0b20tdG8tdG9wIG9uIHRoZSBkaWFncmFtKS5cbiAgICAgKiBBIGNlbGwgcmVwcmVzZW50cyBhIGZyZXQuIDB0aCBjZWxsIGluIGEgcm93IHJlcHJlc2VudHMgb3BlbiBzdHJpbmcuXG4gICAgICogRWFjaCBjZWxsIGNvbnRhaW5zIGVpdGhlciBhIG5vdGUgKGlmIHRoZSBub3RlIGlzIGluIHRoZSBjaG9yZCkgb3IgYG51bGxgIChvdGhlcndpc2UpLlxuICAgICAqIElmIHRoZSBjaG9yZCBpcyBgdW5kZWZpbmVkYCwgcmV0dXJucyBhIHRhYmxlIHdpdGggYWxsIGBudWxsYHNcbiAgICAgKi9cbiAgICBnZXRGcmV0Ym9hcmQoY2hvcmQsIGZyZXRDb3VudCA9IDEyKSB7XG4gICAgICAgIGNvbnN0IGFsbG93ZWRQaXRjaGVzID0gY2hvcmQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBjaG9yZC5ub3Rlcy5tYXAobiA9PiBuLnBpdGNoQ2xhc3MpXG4gICAgICAgICAgICA6IFtdO1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuU3RyaW5ncy5tYXAocyA9PiBnZXRGcmV0cyhzLCBuZXcgU2V0KGFsbG93ZWRQaXRjaGVzKSwgZnJldENvdW50KSk7XG4gICAgfVxufVxuZXhwb3J0cy5UdW5pbmcgPSBUdW5pbmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0R3JvdXBDb2xvciA9IHZvaWQgMDtcbmNvbnN0IHBoaSA9ICgxICsgTWF0aC5zcXJ0KDUpKSAvIDI7XG5jb25zdCBnb2xkZW5BbmdsZSA9IDIgKiBNYXRoLlBJIC8gKHBoaSAqIHBoaSk7XG5jb25zdCBsaWdodG5lc3MgPSAwLjU1O1xuY29uc3Qgc2F0dXJhdGlvbiA9IDAuNjU7XG4vKipcbiAqIEdlbmVyYXRlcyBhbiBPS2xhYiBjb2xvciBmb3IgYSBnaXZlbiBncm91cCBpbmRleFxuICogc28gdGhhdCBhbGwgY29sb3JzIGhhdmUgdGhlIHNhbWUgbGlnaHRuZXNzIGFuZCBzYXR1cmF0aW9uLFxuICogYWxsIGdyb3VwcyBoYXZlIGRpZmZlcmVudCBodWVzLFxuICogYW5kIGh1ZXMgb2YgbmVpZ2hib3IgZ3JvdXBzIGNvbnRyYXN0IHdlbGwgd2l0aCBlYWNoIG90aGVyXG4gKi9cbmZ1bmN0aW9uIGdldEdyb3VwQ29sb3IoZ3JvdXApIHtcbiAgICBjb25zdCBodWUgPSBnb2xkZW5BbmdsZSAqIGdyb3VwO1xuICAgIGNvbnN0IGwgPSBsaWdodG5lc3MgKiAxMDA7XG4gICAgY29uc3QgYSA9IHNhdHVyYXRpb24gKiBNYXRoLmNvcyhodWUpICogMTAwO1xuICAgIGNvbnN0IGIgPSBzYXR1cmF0aW9uICogTWF0aC5zaW4oaHVlKSAqIDEwMDtcbiAgICByZXR1cm4gYG9rbGFiKCR7bC50b0ZpeGVkKDEpfSUgJHthLnRvRml4ZWQoMSl9JSAke2IudG9GaXhlZCgxKX0lKWA7XG59XG5leHBvcnRzLmdldEdyb3VwQ29sb3IgPSBnZXRHcm91cENvbG9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSBleHBvcnRzLmdldEJ5SWQgPSB2b2lkIDA7XG4vKiogR2VuZXJpYy10eXBlZCB2ZXJzaW9uIG9mIGBnZXRFbGVtZW50QnlJZGAgKi9cbmZ1bmN0aW9uIGdldEJ5SWQoaWQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICB0aHJvdyBFcnJvcihgQ2Fubm90IGZpbmQgZWxlbWVudCB3aXRoIGlkICcke2lkfSdgKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5leHBvcnRzLmdldEJ5SWQgPSBnZXRCeUlkO1xuLyoqIENyZWF0ZXMgYW4gSFRNTCBlbGVtZW50IHdpdGggdGhlIGdpdmVuIHRhZyBuYW1lLCBwcm9wZXJ0aWVzIGFuZCAob3B0aW9uYWxseSkgc3R5bGUgKi9cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgcHJvcGVydGllcywgc3R5bGUpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICBpZiAocHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudCwgcHJvcGVydGllcyk7XG4gICAgfVxuICAgIGlmIChzdHlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudC5zdHlsZSwgc3R5bGUpO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0RnJldGJvYXJkRWxlbWVudCA9IHZvaWQgMDtcbmNvbnN0IGRvbV8xID0gcmVxdWlyZShcIi4vZG9tXCIpO1xuY29uc3QgdHVuaW5nXzEgPSByZXF1aXJlKFwiLi4vdGhlb3J5L3R1bmluZ1wiKTtcbmNvbnN0IHR5cG9ncmFwaHlfMSA9IHJlcXVpcmUoXCIuL3R5cG9ncmFwaHlcIik7XG5jb25zdCBjb2xvcnNfMSA9IHJlcXVpcmUoXCIuL2NvbG9yc1wiKTtcbmZ1bmN0aW9uIGdldEZyZXRIZWFkZXJFbGVtZW50KGZyZXRDb3VudCkge1xuICAgIGNvbnN0IGZyZXRIZWFkZXJFbGVtZW50ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJywge1xuICAgICAgICBjbGFzc05hbWU6ICdmcmV0SGVhZGVyJ1xuICAgIH0pO1xuICAgIGZvciAoY29uc3QgZnJldEluZGV4IG9mIEFycmF5KGZyZXRDb3VudCkua2V5cygpKSB7XG4gICAgICAgIGZyZXRIZWFkZXJFbGVtZW50LmFwcGVuZENoaWxkKCgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnc3BhbicsIHtcbiAgICAgICAgICAgIGlubmVyVGV4dDogZnJldEluZGV4LnRvU3RyaW5nKClcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldEhlYWRlckVsZW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRGcmV0RWxlbWVudChmcmV0Tm90ZSwgcm9vdE5vdGUpIHtcbiAgICBjb25zdCBpbm5lclRleHQgPSBmcmV0Tm90ZSAhPT0gbnVsbFxuICAgICAgICA/ICgwLCB0eXBvZ3JhcGh5XzEuYXBwbHlUeXBvZ3JhcGh5KShmcmV0Tm90ZS50b1N0cmluZygpKVxuICAgICAgICA6ICfCtyc7XG4gICAgY29uc3QgZ3JvdXAgPSByb290Tm90ZSAhPT0gdW5kZWZpbmVkID8gKDAsIHR1bmluZ18xLmdldEdyb3VwKShyb290Tm90ZSwgZnJldE5vdGUpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGNvbG9yID0gZ3JvdXAgIT09IHVuZGVmaW5lZCA/ICgwLCBjb2xvcnNfMS5nZXRHcm91cENvbG9yKShncm91cCkgOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnc3BhbicsIHsgaW5uZXJUZXh0IH0sIHsgY29sb3IgfSk7XG59XG5mdW5jdGlvbiBnZXRGcmV0dGVkU3RyaW5nRWxlbWVudChmcmV0dGVkU3RyaW5nLCByb290Tm90ZSkge1xuICAgIGNvbnN0IGZyZXR0ZWRTdHJpbmdFbGVtZW50ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJyk7XG4gICAgZm9yIChjb25zdCBmcmV0Tm90ZSBvZiBmcmV0dGVkU3RyaW5nKSB7XG4gICAgICAgIGZyZXR0ZWRTdHJpbmdFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXRFbGVtZW50KGZyZXROb3RlLCByb290Tm90ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldHRlZFN0cmluZ0VsZW1lbnQ7XG59XG4vKiogR2V0cyB0aGUgSFRNTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgZnJldGJvYXJkIGRpYWdyYW0gKi9cbmZ1bmN0aW9uIGdldEZyZXRib2FyZEVsZW1lbnQoZnJldGJvYXJkLCByb290Tm90ZSkge1xuICAgIGNvbnN0IGZyZXRib2FyZEVsZW1lbnQgPSAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ2RpdicsIHsgaWQ6ICdmcmV0Ym9hcmQnIH0pO1xuICAgIC8vIGFkZCBmcmV0IG51bWJlcnNcbiAgICBmcmV0Ym9hcmRFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXRIZWFkZXJFbGVtZW50KGZyZXRib2FyZFswXS5sZW5ndGgpKTtcbiAgICAvLyBhZGQgc3RyaW5ncyBib3R0b20gdG8gdG9wXG4gICAgZm9yIChjb25zdCBmcmV0dGVkU3RyaW5nIG9mIFsuLi5mcmV0Ym9hcmRdLnJldmVyc2UoKSkge1xuICAgICAgICBmcmV0Ym9hcmRFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXR0ZWRTdHJpbmdFbGVtZW50KGZyZXR0ZWRTdHJpbmcsIHJvb3ROb3RlKSk7XG4gICAgfVxuICAgIHJldHVybiBmcmV0Ym9hcmRFbGVtZW50O1xufVxuZXhwb3J0cy5nZXRGcmV0Ym9hcmRFbGVtZW50ID0gZ2V0RnJldGJvYXJkRWxlbWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5IaW50cyA9IHZvaWQgMDtcbmNvbnN0IG5vdGVfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvbm90ZVwiKTtcbmNvbnN0IGNob3JkXzEgPSByZXF1aXJlKFwiLi4vdGhlb3J5L2Nob3JkXCIpO1xuY29uc3QgZG9tXzEgPSByZXF1aXJlKFwiLi9kb21cIik7XG5jb25zdCB0eXBvZ3JhcGh5XzEgPSByZXF1aXJlKFwiLi90eXBvZ3JhcGh5XCIpO1xuY29uc3Qgbm90ZVJlZ2V4ID0gbmV3IFJlZ0V4cChgXlxccyoke25vdGVfMS5ub3RlTmFtZVBhdHRlcm59YCk7XG5mdW5jdGlvbiBnZXRIaW50cyhpbnB1dFRleHQpIHtcbiAgICBjb25zdCBub3RlID0gaW5wdXRUZXh0Lm1hdGNoKG5vdGVSZWdleCk7XG4gICAgaWYgKG5vdGUgJiYgIShub3RlWzBdIGluIG5vdGVfMS51bnN1cHBvcnRlZCkpIHtcbiAgICAgICAgcmV0dXJuIGNob3JkXzEuc3VmZml4ZXMubWFwKHN1ZmZpeCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaG9yZE5hbWUgPSBub3RlICsgc3VmZml4O1xuICAgICAgICAgICAgY29uc3QgY2hvcmQgPSBuZXcgY2hvcmRfMS5DaG9yZChjaG9yZE5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBjaG9yZE5hbWUsXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogY2hvcmQubm90ZXMuam9pbignICcpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBub3RlXzEubm90ZU5hbWVzLm1hcChuYW1lcyA9PiAoe1xuICAgICAgICAgICAgdGV4dDogbmFtZXNbMF0sXG4gICAgICAgICAgICB0b29sdGlwOiBuYW1lc1sxXSB8fCAnJ1xuICAgICAgICB9KSk7XG4gICAgfVxufVxuY2xhc3MgSGludHMge1xuICAgIGNvbnN0cnVjdG9yKGhpbnRzQ29udGFpbmVyLCBvbkNsaWNrKSB7XG4gICAgICAgIHRoaXMuaGludHNDb250YWluZXIgPSBoaW50c0NvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5vbkNsaWNrID0gb25DbGljaztcbiAgICB9XG4gICAgZ2V0SGludEVsZW1lbnQoaGludCkge1xuICAgICAgICBjb25zdCBidXR0b24gPSAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ2J1dHRvbicsIHtcbiAgICAgICAgICAgIGlubmVyVGV4dDogKDAsIHR5cG9ncmFwaHlfMS5hcHBseVR5cG9ncmFwaHkpKGhpbnQudGV4dCksXG4gICAgICAgICAgICB0aXRsZTogKDAsIHR5cG9ncmFwaHlfMS5hcHBseVR5cG9ncmFwaHkpKGhpbnQudG9vbHRpcCksXG4gICAgICAgIH0pO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IHRoaXMub25DbGljayhoaW50LnRleHQpOyB9KTtcbiAgICAgICAgcmV0dXJuIGJ1dHRvbjtcbiAgICB9XG4gICAgLyoqIFNob3dzIHRoZSBoaW50IGJ1dHRvbnMgKi9cbiAgICBzaG93KGlucHV0VGV4dCkge1xuICAgICAgICBjb25zdCBoaW50cyA9IGdldEhpbnRzKGlucHV0VGV4dCk7XG4gICAgICAgIGNvbnN0IGhpbnRFbGVtZW50cyA9IGhpbnRzLm1hcChoaW50ID0+IHRoaXMuZ2V0SGludEVsZW1lbnQoaGludCkpO1xuICAgICAgICB0aGlzLmhpbnRzQ29udGFpbmVyLnJlcGxhY2VDaGlsZHJlbiguLi5oaW50RWxlbWVudHMpO1xuICAgIH1cbn1cbmV4cG9ydHMuSGludHMgPSBIaW50cztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplID0gdm9pZCAwO1xuY29uc3QgY2hvcmRfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvY2hvcmRcIik7XG5jb25zdCB0dW5pbmdfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvdHVuaW5nXCIpO1xuY29uc3QgaW5zdHJ1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvaW5zdHJ1bWVudHNcIik7XG5jb25zdCBkb21fMSA9IHJlcXVpcmUoXCIuL2RvbVwiKTtcbmNvbnN0IHR5cG9ncmFwaHlfMSA9IHJlcXVpcmUoXCIuL3R5cG9ncmFwaHlcIik7XG5jb25zdCBmcmV0Ym9hcmRfMSA9IHJlcXVpcmUoXCIuL2ZyZXRib2FyZFwiKTtcbmNvbnN0IG1vZGVsXzEgPSByZXF1aXJlKFwiLi9tb2RlbFwiKTtcbmNvbnN0IHVybEhhc2hfMSA9IHJlcXVpcmUoXCIuL3VybEhhc2hcIik7XG5jb25zdCBoaW50c18xID0gcmVxdWlyZShcIi4vaGludHNcIik7XG4vLyBTdGF0aWMgcGFnZSBlbGVtZW50c1xuY29uc3QgaW5zdHJ1bWVudEVsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2luc3RydW1lbnQnKTtcbmNvbnN0IHR1bmluZ0VsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ3R1bmluZycpO1xuY29uc3QgZnJldENvdW50RWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnZnJldENvdW50Jyk7XG5jb25zdCBjaG9yZEVsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2Nob3JkJyk7XG5jb25zdCBjbGVhckNob3JkQnV0dG9uID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdjbGVhckNob3JkJyk7XG5jb25zdCBoaW50c0VsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2hpbnRzJyk7XG5jb25zdCBzdGF0dXNFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdzdGF0dXMnKTtcbmNvbnN0IG91dHB1dEVsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ291dHB1dCcpO1xuY29uc3QgaGludHMgPSBuZXcgaGludHNfMS5IaW50cyhoaW50c0VsZW1lbnQsIG9uSGludENsaWNrKTtcbi8qKiBQb3B1bGF0ZXMgdGhlIGluc3RydW1lbnQgZHJvcC1kb3duICovXG5mdW5jdGlvbiBwb3B1bGF0ZUluc3RydW1lbnRzKCkge1xuICAgIGZvciAoY29uc3QgaW5zdHJ1bWVudCBvZiBPYmplY3Qua2V5cyhpbnN0cnVtZW50c18xLmluc3RydW1lbnRzKSkge1xuICAgICAgICBpbnN0cnVtZW50RWxlbWVudC5hcHBlbmRDaGlsZCgoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ29wdGlvbicsIHtcbiAgICAgICAgICAgIHZhbHVlOiBpbnN0cnVtZW50LFxuICAgICAgICAgICAgaW5uZXJUZXh0OiBpbnN0cnVtZW50XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG4vKiogR2V0cyBIVE1MIGVsZW1lbnQgY29udGFpbmluZyB0aGUgbGlzdCBvZiBjaG9yZCdzIG5vdGVzICovXG5mdW5jdGlvbiBnZXRDaG9yZERlc2NyaXB0aW9uRWxlbWVudChjaG9yZCkge1xuICAgIGNvbnN0IG5vdGVzID0gKDAsIHR5cG9ncmFwaHlfMS5hcHBseVR5cG9ncmFwaHkpKGNob3JkLm5vdGVzLmpvaW4oJyAnKSk7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcsIHtcbiAgICAgICAgaWQ6ICdjaG9yZERlc2NyaXB0aW9uJyxcbiAgICAgICAgaW5uZXJUZXh0OiBg4p+oICR7bm90ZXN9IOKfqWBcbiAgICB9KTtcbn1cbi8qKiBHZXRzIEhUTUwgZWxlbWVudCBjb250YWluaW5nIGFuIGVycm9yIG1lc3NhZ2UgKi9cbmZ1bmN0aW9uIGdldEVycm9yRWxlbWVudChtZXNzYWdlKSB7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcsIHtcbiAgICAgICAgaWQ6ICdlcnJvcicsXG4gICAgICAgIGlubmVyVGV4dDogbWVzc2FnZVxuICAgIH0pO1xufVxuLyoqIEN1cnJlbnQgc3RhdGUgb2YgdGhlIHBhZ2UgKi9cbmxldCBtb2RlbDtcbi8qKlxuICogRGlzcGxheXMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHBhZ2UuXG4gKiBUaGUgbW9kZWwgc2hvdWxkIGJlIGNvbnNpc3RlbnQgKHVzZSBgbWFrZUNvbnNpc3RlbnRgIGJlZm9yZSBjYWxsaW5nIHRoaXMpXG4gKi9cbmZ1bmN0aW9uIGRpc3BsYXlQYWdlKG1vZGVsKSB7XG4gICAgLy8gcHJldmVudCByZWN1cnNpdmUgYG9uSGFzaENoYW5nZWAgY2FsbHNcbiAgICByZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgb25IYXNoQ2hhbmdlKTtcbiAgICBjb25zdCBzdGF0dXMgPSBbXTtcbiAgICBjb25zdCBvdXRwdXQgPSBbXTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB0dW5pbmcgPSBuZXcgdHVuaW5nXzEuVHVuaW5nKG1vZGVsLnR1bmluZ0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgLy8gdHVuaW5nIGlzIHZhbGlkXG4gICAgICAgIGNvbnN0IGNob3JkTmFtZSA9IG1vZGVsLmNob3JkTmFtZS50cmltKCk7XG4gICAgICAgIGxldCBjaG9yZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGNob3JkTmFtZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY2hvcmQgPSBuZXcgY2hvcmRfMS5DaG9yZChjaG9yZE5hbWUpO1xuICAgICAgICAgICAgICAgIC8vIGNob3JkIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgc3RhdHVzLnB1c2goZ2V0Q2hvcmREZXNjcmlwdGlvbkVsZW1lbnQoY2hvcmQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIC8vIGNob3JkIGlzIGludmFsaWRcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBgJHtlcnJvcn1gO1xuICAgICAgICAgICAgICAgIHN0YXR1cy5wdXNoKGdldEVycm9yRWxlbWVudChtZXNzYWdlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZnJldGJvYXJkID0gdHVuaW5nLmdldEZyZXRib2FyZChjaG9yZCwgbW9kZWwuZnJldENvdW50KTtcbiAgICAgICAgb3V0cHV0LnB1c2goKDAsIGZyZXRib2FyZF8xLmdldEZyZXRib2FyZEVsZW1lbnQpKGZyZXRib2FyZCwgY2hvcmQgPT09IG51bGwgfHwgY2hvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNob3JkLm5vdGVzWzBdKSk7XG4gICAgICAgIGlmIChjaG9yZCAhPT0gdW5kZWZpbmVkIHx8IGNob3JkTmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgIC8vIGNoYW5nZSB1cmwgaGFzaCBvbmx5IGlmIHRoZSB0dW5pbmcgaXMgdmFsaWQgYW5kIHRoZSBjaG9yZCBpcyB2YWxpZCBvciBlbXB0eVxuICAgICAgICAgICAgKDAsIHVybEhhc2hfMS5zZXRVcmxIYXNoKShtb2RlbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIHR1bmluZyBpcyBpbnZhbGlkXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGAke2Vycm9yfWA7XG4gICAgICAgIHN0YXR1cy5wdXNoKGdldEVycm9yRWxlbWVudChgSW52YWxpZCB0dW5pbmc6ICR7bWVzc2FnZX1gKSk7XG4gICAgfVxuICAgIC8vIHNldCB0aGUgaW5wdXQgZmllbGQgdmFsdWVzXG4gICAgaW5zdHJ1bWVudEVsZW1lbnQudmFsdWUgPSBtb2RlbC5pbnN0cnVtZW50O1xuICAgIHR1bmluZ0VsZW1lbnQudmFsdWUgPSBtb2RlbC50dW5pbmdEZXNjcmlwdGlvbjtcbiAgICBmcmV0Q291bnRFbGVtZW50LnZhbHVlID0gbW9kZWwuZnJldENvdW50LnRvU3RyaW5nKCk7XG4gICAgY2hvcmRFbGVtZW50LnZhbHVlID0gbW9kZWwuY2hvcmROYW1lO1xuICAgIGhpbnRzLnNob3cobW9kZWwuY2hvcmROYW1lKTtcbiAgICAvLyBkaXNwbGF5IHRoZSBvdXRwdXRcbiAgICBzdGF0dXNFbGVtZW50LnJlcGxhY2VDaGlsZHJlbiguLi5zdGF0dXMpO1xuICAgIG91dHB1dEVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKC4uLm91dHB1dCk7XG4gICAgLy8gdGltZW91dCBmaXhlcyByZWN1cnNpdmUgYG9uSGFzaENoYW5nZWAgY2FsbHNcbiAgICAvLyBUT0RPOiBmaW5kIHRoZSByZWFzb24gYW5kIGEgYmV0dGVyIHNvbHV0aW9uXG4gICAgc2V0VGltZW91dCgoKSA9PiB7IGFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBvbkhhc2hDaGFuZ2UpOyB9LCAxMDApO1xufVxuLyoqIENoYW5nZXMgdGhlIGN1cnJlbnQgcGFnZSBzdGF0ZSAqL1xuZnVuY3Rpb24gY2hhbmdlTW9kZWwobmV3TW9kZWwpIHtcbiAgICBtb2RlbCA9ICgwLCBtb2RlbF8xLm1ha2VDb25zaXN0ZW50KShuZXdNb2RlbCk7XG4gICAgZGlzcGxheVBhZ2UobW9kZWwpO1xufVxuLy8gSW5wdXQgYWN0aW9uczpcbmZ1bmN0aW9uIG9uSW5zdHJ1bWVudElucHV0KCkge1xuICAgIGNvbnN0IGluc3RydW1lbnQgPSBpbnN0cnVtZW50RWxlbWVudC52YWx1ZTtcbiAgICBjaGFuZ2VNb2RlbChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBpbnN0cnVtZW50LCB0dW5pbmdEZXNjcmlwdGlvbjogJycgfSkpO1xufVxuZnVuY3Rpb24gb25UdW5pbmdJbnB1dCgpIHtcbiAgICBjb25zdCB0dW5pbmdEZXNjcmlwdGlvbiA9IHR1bmluZ0VsZW1lbnQudmFsdWU7XG4gICAgY2hhbmdlTW9kZWwoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgdHVuaW5nRGVzY3JpcHRpb24sIGluc3RydW1lbnQ6ICcnIH0pKTtcbn1cbmZ1bmN0aW9uIG9uRnJldENvdW50SW5wdXQoKSB7XG4gICAgY29uc3QgZnJldENvdW50ID0gcGFyc2VJbnQoZnJldENvdW50RWxlbWVudC52YWx1ZSk7XG4gICAgY2hhbmdlTW9kZWwoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgZnJldENvdW50IH0pKTtcbn1cbmZ1bmN0aW9uIG9uQ2hvcmRJbnB1dCgpIHtcbiAgICBjb25zdCBjaG9yZE5hbWUgPSBjaG9yZEVsZW1lbnQudmFsdWU7XG4gICAgY2hhbmdlTW9kZWwoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgY2hvcmROYW1lIH0pKTtcbn1cbmZ1bmN0aW9uIG9uSGludENsaWNrKGhpbnQpIHtcbiAgICBjaGFuZ2VNb2RlbChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBjaG9yZE5hbWU6IGhpbnQgfSkpO1xufVxuZnVuY3Rpb24gb25DaG9yZENsZWFyKCkge1xuICAgIGNoYW5nZU1vZGVsKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGNob3JkTmFtZTogJycgfSkpO1xufVxuZnVuY3Rpb24gb25IYXNoQ2hhbmdlKCkge1xuICAgIGNoYW5nZU1vZGVsKCgwLCB1cmxIYXNoXzEuZ2V0VXJsSGFzaCkoKSk7XG59XG4vLyBFbnRyeSBwb2ludFxuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBwb3B1bGF0ZUluc3RydW1lbnRzKCk7XG4gICAgb25IYXNoQ2hhbmdlKCk7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIG9uSGFzaENoYW5nZSk7XG4gICAgaW5zdHJ1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkluc3RydW1lbnRJbnB1dCk7XG4gICAgdHVuaW5nRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uVHVuaW5nSW5wdXQpO1xuICAgIGZyZXRDb3VudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkZyZXRDb3VudElucHV0KTtcbiAgICBjaG9yZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkNob3JkSW5wdXQpO1xuICAgIGNsZWFyQ2hvcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNob3JkQ2xlYXIpO1xuICAgIGNob3JkRWxlbWVudC5mb2N1cygpO1xufVxuZXhwb3J0cy5pbml0aWFsaXplID0gaW5pdGlhbGl6ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tYWtlQ29uc2lzdGVudCA9IGV4cG9ydHMuZGVmYXVsdE1vZGVsID0gZXhwb3J0cy5tYXhGcmV0Q291bnQgPSB2b2lkIDA7XG5jb25zdCBpbnN0cnVtZW50c18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS9pbnN0cnVtZW50c1wiKTtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS90dW5pbmdcIik7XG5leHBvcnRzLm1heEZyZXRDb3VudCA9IDM2O1xuLyoqIFRoZSB2YWx1ZXMgdXNlZCB3aGVuIHRoZSBwYWdlIGlzIG9wZW5uZWQgd2l0aG91dCBhIFVSTCBoYXNoICovXG5leHBvcnRzLmRlZmF1bHRNb2RlbCA9IHtcbiAgICBpbnN0cnVtZW50OiAnVWt1bGVsZSAoaGlnaCBHKScsXG4gICAgdHVuaW5nRGVzY3JpcHRpb246ICdHNCBDNCBFNCBBNCcsXG4gICAgZnJldENvdW50OiAxMixcbiAgICBjaG9yZE5hbWU6ICcnLFxufTtcbi8qKlxuICogQ2hhbmdlcyB0aGUgbW9kZWwgc28gdGhhdCBpdHMgdmFsdWVzIGFyZSBjb25zaXN0ZW50IGFuZCByZXR1cm5zIHRoZSByZXN1bHQuXG4gKiBUaGUgdmFsdWVzIGRvbid0IGhhdmUgdG8gYmUgdmFsaWQgdGhvdWdoIChlLmcuIGludmFsaWQgdHVuaW5nIG9yIGNob3JkIGFyZSBPSyxcbiAqIGJ1dCBhIHZhbGlkIHR1bmluZyB3aXRoIGEgd3JvbmcgaW5zdHJ1bWVudCBpcyBub3QpLlxuICogU2hvdWxkIGJlIGNhbGxlZCBiZWZvcmUgZGlzcGxheWluZyB0aGUgcGFnZVxuICovXG5mdW5jdGlvbiBtYWtlQ29uc2lzdGVudChtb2RlbCkge1xuICAgIHZhciBfYTtcbiAgICAvLyBmcmV0Q291bnQgc2hvdWxkIGJlIGFuIGludGVnZXIgYmV0d2VlbiAwIGFuZCBtYXhGcmV0Q291bnRcbiAgICBjb25zdCBmcmV0Q291bnQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihleHBvcnRzLm1heEZyZXRDb3VudCwgTWF0aC5yb3VuZChtb2RlbC5mcmV0Q291bnQpKSk7XG4gICAgbW9kZWwgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBmcmV0Q291bnQgfSk7XG4gICAgY29uc3QgaW5zdHJ1bWVudFR1bmluZyA9IChfYSA9IGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudHNbbW9kZWwuaW5zdHJ1bWVudF0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kZXNjcmlwdGlvbjtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB0dW5pbmcgPSBuZXcgdHVuaW5nXzEuVHVuaW5nKG1vZGVsLnR1bmluZ0Rlc2NyaXB0aW9uKS5kZXNjcmlwdGlvbjtcbiAgICAgICAgaWYgKHR1bmluZyAhPT0gaW5zdHJ1bWVudFR1bmluZykge1xuICAgICAgICAgICAgLy8gaWYgdHVuaW5nIGlzIHZhbGlkIGFuZCBkaWZmZXJzIGZyb20gaW5zdHJ1bWVudCdzLCBjaGFuZ2UgdGhlIGluc3RydW1lbnRcbiAgICAgICAgICAgIGNvbnN0IGluc3RydW1lbnQgPSBpbnN0cnVtZW50c18xLmluc3RydW1lbnRCeVR1bmluZ1t0dW5pbmddIHx8ICcnO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGluc3RydW1lbnQgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKF9iKSB7IH1cbiAgICBpZiAoaW5zdHJ1bWVudFR1bmluZykge1xuICAgICAgICAvLyBJZiB0dW5pbmcgaXMgaW52YWxpZCBhbmQgaW5zdHJ1bWVudCBpcyB2YWxpZCwgY2hhbmdlIHRoZSB0dW5pbmdcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IHR1bmluZ0Rlc2NyaXB0aW9uOiBpbnN0cnVtZW50VHVuaW5nIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gSWYgaW5zdHJ1bWVudCBpcyBpbnZhbGlkLCBjaGFuZ2UgaXQgdG8gJydcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGluc3RydW1lbnQ6ICcnIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMubWFrZUNvbnNpc3RlbnQgPSBtYWtlQ29uc2lzdGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hcHBseVR5cG9ncmFwaHkgPSB2b2lkIDA7XG5jb25zdCBjaGFyYWN0ZXJEaWN0ID0ge1xuICAgICcjJzogJ+KZrycsXG4gICAgJ2InOiAn4pmtJyxcbiAgICAnMCc6ICfigoAnLFxuICAgICcxJzogJ+KCgScsXG4gICAgJzInOiAn4oKCJyxcbiAgICAnMyc6ICfigoMnLFxuICAgICc0JzogJ+KChCcsXG4gICAgJzUnOiAn4oKFJyxcbiAgICAnNic6ICfigoYnLFxuICAgICc3JzogJ+KChycsXG4gICAgJzgnOiAn4oKIJyxcbiAgICAnOSc6ICfigoknLFxufTtcbmNvbnN0IHJlcGxhY2VSZWdleCA9IG5ldyBSZWdFeHAoYFske09iamVjdC5rZXlzKGNoYXJhY3RlckRpY3QpfV1gLCAnZycpO1xuLyoqXG4gKiBSZXBsYWNlcyBlYXN5LXRvLXR5cGUgQVNDSUkgY2hhcmFjdGVyc1xuICogZm9yIGFjY2lkZW50YWxzIGFuZCBvY3RhdmUgbnVtYmVyc1xuICogd2l0aCBnb29kLWxvb2tpbmcgVW5pY29kZSBvbmVzXG4gKi9cbmZ1bmN0aW9uIGFwcGx5VHlwb2dyYXBoeSh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShyZXBsYWNlUmVnZXgsIGMgPT4gY2hhcmFjdGVyRGljdFtjXSk7XG59XG5leHBvcnRzLmFwcGx5VHlwb2dyYXBoeSA9IGFwcGx5VHlwb2dyYXBoeTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRVcmxIYXNoID0gZXhwb3J0cy5zZXRVcmxIYXNoID0gdm9pZCAwO1xuY29uc3QgbW9kZWxfMSA9IHJlcXVpcmUoXCIuL21vZGVsXCIpO1xuY29uc3QgZm9ybWF0VmVyc2lvbiA9IDA7XG4vKipcbiAqIEVuY29kZXMgdGhlIG1vZGVsIGludG8gdGhlIHBhZ2UncyBVUkwgaGFzaCBwYXJ0LlxuICogVGhpcyBhbGxvd3MgdGhlIHVzZXIgdG8gc2hhcmUgbGlua3MgdG8gc3BlY2lmaWMgdHVuaW5ncyBhbmQgY2hvcmRzLlxuICovXG5mdW5jdGlvbiBzZXRVcmxIYXNoKG1vZGVsKSB7XG4gICAgY29uc3QgdHVuaW5nRGVzY3JpcHRpb24gPSBtb2RlbC50dW5pbmdEZXNjcmlwdGlvbi50cmltKCkucmVwbGFjZSgvXFxzKy9nLCAnLScpO1xuICAgIGNvbnN0IGNob3JkTmFtZSA9IG1vZGVsLmNob3JkTmFtZS50cmltKCk7XG4gICAgY29uc3QgaGFzaCA9IGAke2Zvcm1hdFZlcnNpb259fCR7dHVuaW5nRGVzY3JpcHRpb259fCR7bW9kZWwuZnJldENvdW50fXwke2Nob3JkTmFtZX1gO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaDtcbn1cbmV4cG9ydHMuc2V0VXJsSGFzaCA9IHNldFVybEhhc2g7XG4vKipcbiAqIFJlYWRzIHRoZSBtb2RlbCBmcm9tIHRoZSBwYWdlJ3MgVVJMIGhhc2ggcGFydC5cbiAqIE5vdGU6IHRoZSBpbnN0cnVtZW50IGlzIG5vdCBzYXZlZCBpbiB0aGUgaGFzaCAoZm9yIHRoZSBzYWtlIG9mIGJyZXZpdHkpXG4gKiBzbyBpdCBjYW4gYmUgY2hvc2VuIGluY29ycmVjdGx5IHdoZW4gbXVsdGlwbGUgaW5zdHJ1bWVudHMgc2hhcmUgdGhlIHNhbWUgdHVuaW5nXG4gKi9cbmZ1bmN0aW9uIGdldFVybEhhc2goKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdGV4dCA9IGRlY29kZVVSSSh3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKC8jLywgJycpKTtcbiAgICAgICAgY29uc3QgcGFydHMgPSB0ZXh0LnNwbGl0KCd8Jyk7XG4gICAgICAgIGlmIChwYXJzZUludChwYXJ0c1swXSkgPT09IGZvcm1hdFZlcnNpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IHR1bmluZ0Rlc2NyaXB0aW9uID0gcGFydHNbMV0ucmVwbGFjZSgvLS9nLCAnICcpO1xuICAgICAgICAgICAgY29uc3QgZnJldENvdW50ID0gcGFyc2VJbnQocGFydHNbMl0pO1xuICAgICAgICAgICAgY29uc3QgY2hvcmROYW1lID0gcGFydHNbM107XG4gICAgICAgICAgICByZXR1cm4geyBpbnN0cnVtZW50OiAnJywgdHVuaW5nRGVzY3JpcHRpb24sIGZyZXRDb3VudCwgY2hvcmROYW1lIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7IH1cbiAgICByZXR1cm4gbW9kZWxfMS5kZWZhdWx0TW9kZWw7XG59XG5leHBvcnRzLmdldFVybEhhc2ggPSBnZXRVcmxIYXNoO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdWlfMSA9IHJlcXVpcmUoXCIuL3VpXCIpO1xuKDAsIHVpXzEuaW5pdGlhbGl6ZSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==