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
        ? (0, typography_1.typesetNote)(fretNote.toString())
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
const noteRegex = new RegExp(`^\\s*(${note_1.noteNamePattern})`);
function getHints(inputText) {
    const match = inputText.match(noteRegex);
    if (match && !(match[1] in note_1.unsupported)) {
        return chord_1.suffixes.map(suffix => {
            const chordName = match[1] + suffix;
            const chord = new chord_1.Chord(chordName);
            const notes = chord.notes.join(' ');
            return {
                text: chordName,
                tooltip: `⟨ ${notes} ⟩`
            };
        });
    }
    else {
        return note_1.noteNames.map(names => ({
            text: names[0],
            tooltip: names.length > 1 ? `= ${names[1]}` : ''
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
            innerText: (0, typography_1.typesetChord)(hint.text),
            title: (0, typography_1.typesetChord)(hint.tooltip),
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
    const notes = (0, typography_1.typesetNote)(chord.notes.join(' '));
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
        const tuning = new tuning_1.Tuning((0, typography_1.removeTypography)(model.tuningDescription));
        // tuning is valid
        const chordName = (0, typography_1.removeTypography)(model.chordName).trim();
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
    hints.show((0, typography_1.removeTypography)(model.chordName));
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
exports.removeTypography = exports.typesetChord = exports.typesetNote = void 0;
const accidentals = {
    '#': '♯',
    'b': '♭',
};
const subscript = {
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
const backwardDictionary = Object.fromEntries(Object.entries(accidentals).concat(Object.entries(subscript))
    .map(([key, value]) => [value, key]));
const backwardRegex = new RegExp(`[${Object.values(accidentals).concat(Object.values(subscript))}]`, 'g');
/**
 * Replaces easy-to-type ASCII characters
 * for accidentals and octave numbers
 * with good-looking Unicode ones
 */
function typesetNote(text) {
    return text
        .replace(/[#b]/g, c => accidentals[c])
        .replace(/\d/g, c => subscript[c]);
}
exports.typesetNote = typesetNote;
/**
 * Replaces easy-to-type ASCII characters
 * for accidentals and chord types
 * with good-looking Unicode ones
 */
function typesetChord(text) {
    return text.replace(/[#b]/g, c => accidentals[c]);
}
exports.typesetChord = typesetChord;
/**
 * Replaces unicode characters with ASCII ones
 */
function removeTypography(text) {
    return text.replace(backwardRegex, c => backwardDictionary[c]);
}
exports.removeTypography = removeTypography;


/***/ }),

/***/ "./src/ui/urlHash.ts":
/*!***************************!*\
  !*** ./src/ui/urlHash.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUrlHash = exports.setUrlHash = void 0;
const model_1 = __webpack_require__(/*! ./model */ "./src/ui/model.ts");
const typography_1 = __webpack_require__(/*! ./typography */ "./src/ui/typography.ts");
/**
 * Encodes the model into the page's URL hash part.
 * This allows the user to share links to specific tunings and chords.
 */
function setUrlHash(model) {
    const tuningDescription = (0, typography_1.removeTypography)(model.tuningDescription).trim().replace(/\s+/g, '-');
    const chordName = (0, typography_1.removeTypography)(model.chordName).trim();
    const hash = `${model.instrument}|${tuningDescription}|${model.fretCount}|${chordName}`;
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
        const instrument = parts[0];
        const tuningDescription = parts[1].replace(/-/g, ' ');
        const fretCount = parseInt(parts[2]);
        const chordName = parts[3];
        return { instrument, tuningDescription, fretCount, chordName };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGFBQWEsbUJBQU8sQ0FBQywrQkFBTTtBQUMzQiIsInNvdXJjZXMiOlsid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L2Nob3JkLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L2luc3RydW1lbnRzLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L25vdGUudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy90aGVvcnkvdHVuaW5nLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvY29sb3JzLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvZG9tLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvZnJldGJvYXJkLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvaGludHMudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9pbmRleC50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL21vZGVsLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvdHlwb2dyYXBoeS50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL3VybEhhc2gudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DaG9yZCA9IGV4cG9ydHMuc3VmZml4ZXMgPSB2b2lkIDA7XG5jb25zdCBub3RlXzEgPSByZXF1aXJlKFwiLi9ub3RlXCIpO1xuLy8gSW50ZXJ2YWxzIGluIHNlbWl0b25lczpcbmNvbnN0IFtQMSwgbTIsIE0yLCBtMywgTTMsIFA0LCBBNCwgUDUsIG02LCBNNiwgbTcsIE03XSA9IEFycmF5KDEyKS5rZXlzKCk7XG5leHBvcnRzLnN1ZmZpeGVzID0gW1xuICAgICdtKG5vNSknLCAnKG5vNSknLCAnNScsXG4gICAgJ2RpbScsICdzdXMyJywgJ20nLCAnJywgJ3N1czQnLCAnYXVnJyxcbiAgICAnbTYnLCAnNicsICdtNycsICdtTTcnLCAnNycsICdNNycsXG5dO1xuY29uc3Qgc3VmZml4TWVhbmluZ3MgPSB7XG4gICAgJ20obm81KSc6IFtQMSwgbTNdLFxuICAgICcobm81KSc6IFtQMSwgTTNdLFxuICAgICc1JzogW1AxLCBQNV0sXG4gICAgJ2RpbSc6IFtQMSwgbTMsIEE0XSxcbiAgICAnc3VzMic6IFtQMSwgTTIsIFA1XSxcbiAgICAnbSc6IFtQMSwgbTMsIFA1XSxcbiAgICAnJzogW1AxLCBNMywgUDVdLFxuICAgICdzdXM0JzogW1AxLCBQNCwgUDVdLFxuICAgICdhdWcnOiBbUDEsIE0zLCBtNl0sXG4gICAgJ202JzogW1AxLCBtMywgUDUsIE02XSxcbiAgICAnNic6IFtQMSwgTTMsIFA1LCBNNl0sXG4gICAgJ203JzogW1AxLCBtMywgUDUsIG03XSxcbiAgICAnbU03JzogW1AxLCBtMywgUDUsIE03XSxcbiAgICAnNyc6IFtQMSwgTTMsIFA1LCBtN10sXG4gICAgJ003JzogW1AxLCBNMywgUDUsIE03XSxcbn07XG5jb25zdCBjaG9yZFJlZ2V4ID0gbmV3IFJlZ0V4cChgXigke25vdGVfMS5ub3RlTmFtZVBhdHRlcm59KSguKikkYCk7XG5jbGFzcyBDaG9yZCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBjb25zdCBtYXRjaCA9IG5hbWUubWF0Y2goY2hvcmRSZWdleCk7XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgQ2FuJ3QgcGFyc2UgY2hvcmQgJHtuYW1lfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IFtfLCByb290TmFtZSwgc3VmZml4XSA9IG1hdGNoO1xuICAgICAgICBjb25zdCByb290ID0gbmV3IG5vdGVfMS5Ob3RlKHJvb3ROYW1lKTtcbiAgICAgICAgaWYgKCEoc3VmZml4IGluIHN1ZmZpeE1lYW5pbmdzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBDYW4ndCBwYXJzZSBjaG9yZCBzdWZmaXggJHtzdWZmaXh9YCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub3RlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGludGVydmFsIG9mIHN1ZmZpeE1lYW5pbmdzW3N1ZmZpeF0pIHtcbiAgICAgICAgICAgIHRoaXMubm90ZXMucHVzaChyb290LmFkZEludGVydmFsKGludGVydmFsKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9ID0gPCR7dGhpcy5ub3Rlcy5qb2luKCcgJyl9PmA7XG4gICAgfVxufVxuZXhwb3J0cy5DaG9yZCA9IENob3JkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluc3RydW1lbnRCeVR1bmluZyA9IGV4cG9ydHMuaW5zdHJ1bWVudHMgPSB2b2lkIDA7XG5jb25zdCB0dW5pbmdfMSA9IHJlcXVpcmUoXCIuL3R1bmluZ1wiKTtcbmV4cG9ydHMuaW5zdHJ1bWVudHMgPSB7XG4gICAgJ0JhbGFsYWlrYSAoYWNhZGVtaWMpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRTQgRTQgQTQnKSxcbiAgICAnQmFsYWxhaWthIChmb2xrKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0M0IEU0IEc0JyksXG4gICAgJ0JhbmpvJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgRDMgRzMgQjMgRDQnKSxcbiAgICAnQmFzcyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0UxIEExIEQyIEcyJyksXG4gICAgJ0JyYWd1aW5oYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEI0IEQ1JyksXG4gICAgJ0NoYXJhbmdvJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgQzUgRSBBNCBFNScpLFxuICAgICdDYXZhcXVpbmhvIChQb3J0dWdhbCBHR0JEKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEc0IEI0IEQ1JyksXG4gICAgJ0NhdmFxdWluaG8gKFBvcnR1Z2FsIERBQkUpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDUgQTQgQjQgRTUnKSxcbiAgICAnQ2F2YXF1aW5obyAoQnJhemlsIERHQkQpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQjQgRDUnKSxcbiAgICAnQ2F2YXF1aW5obyAoQnJhemlsIERHQkUpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQjQgRTUnKSxcbiAgICAnRGFsYSBmYWVuZHlyJzogbmV3IHR1bmluZ18xLlR1bmluZygnRTQgQTQgRTUnKSxcbiAgICAnRGVjaGlnIHBvbmRhcic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0M0IEQ0IEc0JyksXG4gICAgJ0d1aXRhbGVsZSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0EyIEQzIEczIEM0IEU0IEE0JyksXG4gICAgJ0d1aXRhcic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0UyIEEyIEQzIEczIEIzIEU0JyksXG4gICAgJ0d1aXRhcnLDs24nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMSBEMiBHMiBDMyBFMyBBMicpLFxuICAgICdKYXJhbmEgamFyb2NoYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEM0IEUgQTMgRzMnKSxcbiAgICAnSmFyYW5hIGh1YXN0ZWNhJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgQjMgRDQgRiM0IEE0JyksXG4gICAgJ01hbmRvbGluJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgRDQgQTQgRTUnKSxcbiAgICAnUmFqYW8nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBDNCBFNCBBNCcpLFxuICAgICdSZXF1aW50byc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0EyIEQzIEczIEM0IEU0IEE0JyksXG4gICAgJ1NlbWlzdHJ1bmthJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDIgRzIgQjIgRDMgRzMgQjMgRDQnKSxcbiAgICAnVGVub3IgZ3VpdGFyJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzMgRzMgRDQgQTQnKSxcbiAgICAnVGltcGxlJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgQzUgRTQgQTQgRDUnKSxcbiAgICAnVWt1bGVsZSAoaGlnaCBHKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEM0IEU0IEE0JyksXG4gICAgJ1VrdWxlbGUgKGxvdyBHKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEM0IEU0IEE0JyksXG4gICAgJ1VrdWxlbGUgKGJhcml0b25lKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0QzIEczIEIzIEU0JyksXG4gICAgJ1ZpaHVlbGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMyBENCBHNCBCMyBFNCcpLFxuICAgICdWaW9sYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0MzIEczIEQ0IEE0JyksXG4gICAgJ1Zpb2xpbic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEQ0IEE0IEU1JyksXG59O1xuLyoqIEdldHMgdGhlIGZpcnN0IGluc3RydW1lbnQgd2l0aCB0aGUgZ2l2ZW4gdHVuaW5nICovXG5leHBvcnRzLmluc3RydW1lbnRCeVR1bmluZyA9IHt9O1xuZm9yIChjb25zdCBbbmFtZSwgdHVuaW5nXSBvZiBPYmplY3QuZW50cmllcyhleHBvcnRzLmluc3RydW1lbnRzKSkge1xuICAgIGlmICghKHR1bmluZy5kZXNjcmlwdGlvbiBpbiBleHBvcnRzLmluc3RydW1lbnRCeVR1bmluZykpIHtcbiAgICAgICAgZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmdbdHVuaW5nLmRlc2NyaXB0aW9uXSA9IG5hbWU7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk5vdGUgPSBleHBvcnRzLm5vdGVOYW1lUGF0dGVybiA9IGV4cG9ydHMudW5zdXBwb3J0ZWQgPSBleHBvcnRzLm5vdGVOYW1lcyA9IHZvaWQgMDtcbi8qKiAxMmVkbyBub3Rlcy4gQSBub3RlIGNhbiBoYXZlIG9uZSBvciB0d28gbmFtZXMgKi9cbmV4cG9ydHMubm90ZU5hbWVzID0gW1xuICAgIFsnQyddLCBbJ0MjJywgJ0RiJ10sXG4gICAgWydEJ10sIFsnRCMnLCAnRWInXSxcbiAgICBbJ0UnXSxcbiAgICBbJ0YnXSwgWydGIycsICdHYiddLFxuICAgIFsnRyddLCBbJ0cjJywgJ0FiJ10sXG4gICAgWydBJ10sIFsnQSMnLCAnQmInXSxcbiAgICBbJ0InXSxcbl07XG5leHBvcnRzLnVuc3VwcG9ydGVkID0ge1xuICAgICdDYic6ICdCJyxcbiAgICAnQiMnOiAnQycsXG4gICAgJ0ZiJzogJ0UnLFxuICAgICdFIyc6ICdGJyxcbn07XG5jb25zdCBub3RlSW5kZXhCeU5hbWUgPSB7fTtcbmZvciAoY29uc3QgW2luZGV4LCBuYW1lc10gb2YgZXhwb3J0cy5ub3RlTmFtZXMuZW50cmllcygpKSB7XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIG5hbWVzKSB7XG4gICAgICAgIG5vdGVJbmRleEJ5TmFtZVtuYW1lXSA9IGluZGV4O1xuICAgIH1cbn1cbmV4cG9ydHMubm90ZU5hbWVQYXR0ZXJuID0gJ1tBLUddWyNiXT8nOyAvLyB1c2VkIGJ5IGNob3JkLnRzXG5jb25zdCBub3RlUmVnZXggPSBuZXcgUmVnRXhwKGBeKCR7ZXhwb3J0cy5ub3RlTmFtZVBhdHRlcm59KShcXFxcZCk/JGApO1xuLyoqIFJlcHJlc2VudHMgZWl0aGVyIGFuIGFic29sdXRlLXBpdGNoZWQgbm90ZSBvciBhbiBvY3RhdmUtaW52YXJpYW50IG5vdGUgKi9cbmNsYXNzIE5vdGUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBuYW1lLm1hdGNoKG5vdGVSZWdleCk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgY29uc3QgW18sIG5vdGVOYW1lLCBvY3RhdmVOYW1lXSA9IG1hdGNoO1xuICAgICAgICAgICAgaWYgKG5vdGVOYW1lIGluIGV4cG9ydHMudW5zdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWdnZXN0aW9uID0gZXhwb3J0cy51bnN1cHBvcnRlZFtub3RlTmFtZV07XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVc2UgJHtzdWdnZXN0aW9ufSBpbnN0ZWFkIG9mICR7bm90ZU5hbWV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBpdGNoQ2xhc3MgPSBub3RlSW5kZXhCeU5hbWVbbm90ZU5hbWVdO1xuICAgICAgICAgICAgdGhpcy5vY3RhdmUgPSBvY3RhdmVOYW1lICE9PSB1bmRlZmluZWQgPyBwYXJzZUludChvY3RhdmVOYW1lKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgQ2FuJ3QgcGFyc2Ugbm90ZSAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGZyb21QaXRjaENsYXNzQW5kT2N0YXZlKHBpdGNoQ2xhc3MsIG9jdGF2ZSkge1xuICAgICAgICBsZXQgbm90ZSA9IE9iamVjdC5jcmVhdGUoTm90ZS5wcm90b3R5cGUpO1xuICAgICAgICBub3RlLnBpdGNoQ2xhc3MgPSBwaXRjaENsYXNzO1xuICAgICAgICBub3RlLm9jdGF2ZSA9IG9jdGF2ZTtcbiAgICAgICAgcmV0dXJuIG5vdGU7XG4gICAgfVxuICAgIC8qKiBDYW5vbmljYWwgbmFtZSBvZiB0aGUgbm90ZS4gRmxhdHMgYXJlbid0IHVzZWQgKGUuZy4gQmIgYmVjb21lcyBBIykgKi9cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgY29uc3Qgbm90ZU5hbWUgPSBleHBvcnRzLm5vdGVOYW1lc1t0aGlzLnBpdGNoQ2xhc3NdWzBdO1xuICAgICAgICByZXR1cm4gdGhpcy5vY3RhdmUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBgJHtub3RlTmFtZX0ke3RoaXMub2N0YXZlfWBcbiAgICAgICAgICAgIDogbm90ZU5hbWU7XG4gICAgfVxuICAgIC8qKiBBZGRzIGEgbm9uLW5lZ2F0aXZlIGludGVydmFsIGluIHNlbWl0b25lcyBhbmQgcmV0dXJucyB0aGUgcmVzdWx0ICovXG4gICAgYWRkSW50ZXJ2YWwoaW50ZXJ2YWwpIHtcbiAgICAgICAgY29uc3QgcGl0Y2ggPSB0aGlzLnBpdGNoQ2xhc3MgKyBpbnRlcnZhbDtcbiAgICAgICAgY29uc3Qgb2N0YXZlID0gdGhpcy5vY3RhdmUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB0aGlzLm9jdGF2ZSArIE1hdGguZmxvb3IocGl0Y2ggLyAxMilcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gTm90ZS5mcm9tUGl0Y2hDbGFzc0FuZE9jdGF2ZShwaXRjaCAlIDEyLCBvY3RhdmUpOyAvLyBpbmNvcnJlY3QgZm9yIG5lZ2F0aXZlIGludGVydmFsc1xuICAgIH1cbn1cbmV4cG9ydHMuTm90ZSA9IE5vdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVHVuaW5nID0gZXhwb3J0cy5nZXRHcm91cCA9IHZvaWQgMDtcbmNvbnN0IG5vdGVfMSA9IHJlcXVpcmUoXCIuL25vdGVcIik7XG5jb25zdCBzcGxpdFJlZ2V4ID0gL1xccyt8KD89W0EtWl0pLzsgLy8gc3BsaXQgYnkgd2hpdGVzcGFjZSBvciBiZWZvcmUgdXBwZXJjYXNlIGxldHRlcnNcbi8qKiBSZXR1cm5zIGEgcm93IG9mIHRoZSBmcmV0IHRhYmxlIChzZWUgYGdldEZyZXRib2FyZGApICovXG5mdW5jdGlvbiBnZXRGcmV0cyhvcGVuU3RyaW5nLCBhbGxvd2VkUGl0Y2hlcywgZnJldENvdW50KSB7XG4gICAgY29uc3QgZnJldHMgPSBbXTtcbiAgICBmb3IgKGxldCBmcmV0SW5kZXggPSAwOyBmcmV0SW5kZXggPD0gZnJldENvdW50OyBmcmV0SW5kZXgrKykge1xuICAgICAgICBjb25zdCBub3RlID0gb3BlblN0cmluZy5hZGRJbnRlcnZhbChmcmV0SW5kZXgpO1xuICAgICAgICBmcmV0cy5wdXNoKGFsbG93ZWRQaXRjaGVzLmhhcyhub3RlLnBpdGNoQ2xhc3MpID8gbm90ZSA6IG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldHM7XG59XG4vKipcbiAqIEFzc2lnbnMgYSBncm91cCBpbmRleCB0byBhIGdpdmVuIG5vdGUgYmFzZWQgb24gdGhlIGNob3JkJ3Mgcm9vdCBub3RlXG4gKiBzbyB0aGF0IG5vdGVzIGluc2lkZSBhIHNpbmdsZSBncm91cCBmb3JtIGEgbm9uLWludmVydGVkIGNob3JkXG4gKi9cbmZ1bmN0aW9uIGdldEdyb3VwKHJvb3ROb3RlLCBub3RlKSB7XG4gICAgaWYgKG5vdGUgIT09IG51bGwgJiYgbm90ZS5vY3RhdmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigobm90ZS5vY3RhdmUgKiAxMiArIG5vdGUucGl0Y2hDbGFzcyAtIHJvb3ROb3RlLnBpdGNoQ2xhc3MpIC8gMTIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnRzLmdldEdyb3VwID0gZ2V0R3JvdXA7XG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIHR1bmluZyBvZiBhbiBpbnN0cnVtZW50LlxuICogQ2FuIGNvbnRhaW4gYm90aCBhYnNvbHV0ZS1waXRjaGVkIGFuZCBvY3RhdmUtaW52YXJpYW50IHN0cmluZ3MuXG4gKiBUaGUgb3JkZXIgb2YgdGhlIHN0cmluZ3MgaXMgbGVmdC10by1yaWdodCBpZiB0aGUgaW5zdHJ1bWVudCBpcyByaWdodC1oYW5kZWRcbiAqIGFuZCBwb3NpdGlvbmVkIHdpdGggdGhlIG5lY2sgdXAgYW5kIHRoZSBzdHJpbmdzIGZhY2luZyB5b3UuXG4gKiAoT24gdGhlIGRpYWdyYW0sIHRoZSBvcmRlciBpcyBib3R0b20tdG8tdG9wKVxuICovXG5jbGFzcyBUdW5pbmcge1xuICAgIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMub3BlblN0cmluZ3MgPSBkZXNjcmlwdGlvblxuICAgICAgICAgICAgLnNwbGl0KHNwbGl0UmVnZXgpXG4gICAgICAgICAgICAuZmlsdGVyKG4gPT4gbiAhPT0gJycpXG4gICAgICAgICAgICAubWFwKG4gPT4gbmV3IG5vdGVfMS5Ob3RlKG4pKTtcbiAgICAgICAgaWYgKHRoaXMub3BlblN0cmluZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0IGxlYXN0IG9uZSBvcGVuIHN0cmluZyByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0aGlzLm9wZW5TdHJpbmdzLmpvaW4oJyAnKTtcbiAgICB9XG4gICAgLyoqIE5vcm1hbGl6ZWQgdHVuaW5nIGRlc2NyaXB0aW9uOiBmbGF0cyBhcmVuJ3QgdXNlZCwgdGhlIG5vdGVzIGFyZSBzZXBhcmF0ZWQgYnkgc3BhY2VzICovXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBgVHVuaW5nKFwiJHt0aGlzLmRlc2NyaXB0aW9ufVwiKWA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGZyZXQgdGFibGUgZm9yIGEgZ2l2ZW4gY2hvcmQgYXMgYW4gYXJyYXkgb2YgdGFibGUgcm93cy5cbiAgICAgKiBFYWNoIHJvdyBpcyBhbiBhcnJheSBvZiBjZWxscyBhbmQgcmVwcmVzZW50cyBhIHN0cmluZy5cbiAgICAgKiBUaGUgb3JkZXIgb2YgdGhlIHJvd3MgZm9sbG93cyB0aGUgc3RyaW5nIG9yZGVyIGluIHRoZSB0dW5pbmcgZGVzY3JpcHRpb24gKGJvdHRvbS10by10b3Agb24gdGhlIGRpYWdyYW0pLlxuICAgICAqIEEgY2VsbCByZXByZXNlbnRzIGEgZnJldC4gMHRoIGNlbGwgaW4gYSByb3cgcmVwcmVzZW50cyBvcGVuIHN0cmluZy5cbiAgICAgKiBFYWNoIGNlbGwgY29udGFpbnMgZWl0aGVyIGEgbm90ZSAoaWYgdGhlIG5vdGUgaXMgaW4gdGhlIGNob3JkKSBvciBgbnVsbGAgKG90aGVyd2lzZSkuXG4gICAgICogSWYgdGhlIGNob3JkIGlzIGB1bmRlZmluZWRgLCByZXR1cm5zIGEgdGFibGUgd2l0aCBhbGwgYG51bGxgc1xuICAgICAqL1xuICAgIGdldEZyZXRib2FyZChjaG9yZCwgZnJldENvdW50ID0gMTIpIHtcbiAgICAgICAgY29uc3QgYWxsb3dlZFBpdGNoZXMgPSBjaG9yZCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGNob3JkLm5vdGVzLm1hcChuID0+IG4ucGl0Y2hDbGFzcylcbiAgICAgICAgICAgIDogW107XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5TdHJpbmdzLm1hcChzID0+IGdldEZyZXRzKHMsIG5ldyBTZXQoYWxsb3dlZFBpdGNoZXMpLCBmcmV0Q291bnQpKTtcbiAgICB9XG59XG5leHBvcnRzLlR1bmluZyA9IFR1bmluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRHcm91cENvbG9yID0gdm9pZCAwO1xuY29uc3QgcGhpID0gKDEgKyBNYXRoLnNxcnQoNSkpIC8gMjtcbmNvbnN0IGdvbGRlbkFuZ2xlID0gMiAqIE1hdGguUEkgLyAocGhpICogcGhpKTtcbmNvbnN0IGxpZ2h0bmVzcyA9IDAuNTU7XG5jb25zdCBzYXR1cmF0aW9uID0gMC42NTtcbi8qKlxuICogR2VuZXJhdGVzIGFuIE9LbGFiIGNvbG9yIGZvciBhIGdpdmVuIGdyb3VwIGluZGV4XG4gKiBzbyB0aGF0IGFsbCBjb2xvcnMgaGF2ZSB0aGUgc2FtZSBsaWdodG5lc3MgYW5kIHNhdHVyYXRpb24sXG4gKiBhbGwgZ3JvdXBzIGhhdmUgZGlmZmVyZW50IGh1ZXMsXG4gKiBhbmQgaHVlcyBvZiBuZWlnaGJvciBncm91cHMgY29udHJhc3Qgd2VsbCB3aXRoIGVhY2ggb3RoZXJcbiAqL1xuZnVuY3Rpb24gZ2V0R3JvdXBDb2xvcihncm91cCkge1xuICAgIGNvbnN0IGh1ZSA9IGdvbGRlbkFuZ2xlICogZ3JvdXA7XG4gICAgY29uc3QgbCA9IGxpZ2h0bmVzcyAqIDEwMDtcbiAgICBjb25zdCBhID0gc2F0dXJhdGlvbiAqIE1hdGguY29zKGh1ZSkgKiAxMDA7XG4gICAgY29uc3QgYiA9IHNhdHVyYXRpb24gKiBNYXRoLnNpbihodWUpICogMTAwO1xuICAgIHJldHVybiBgb2tsYWIoJHtsLnRvRml4ZWQoMSl9JSAke2EudG9GaXhlZCgxKX0lICR7Yi50b0ZpeGVkKDEpfSUpYDtcbn1cbmV4cG9ydHMuZ2V0R3JvdXBDb2xvciA9IGdldEdyb3VwQ29sb3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGV4cG9ydHMuZ2V0QnlJZCA9IHZvaWQgMDtcbi8qKiBHZW5lcmljLXR5cGVkIHZlcnNpb24gb2YgYGdldEVsZW1lbnRCeUlkYCAqL1xuZnVuY3Rpb24gZ2V0QnlJZChpZCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHRocm93IEVycm9yKGBDYW5ub3QgZmluZCBlbGVtZW50IHdpdGggaWQgJyR7aWR9J2ApO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbmV4cG9ydHMuZ2V0QnlJZCA9IGdldEJ5SWQ7XG4vKiogQ3JlYXRlcyBhbiBIVE1MIGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gdGFnIG5hbWUsIHByb3BlcnRpZXMgYW5kIChvcHRpb25hbGx5KSBzdHlsZSAqL1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBwcm9wZXJ0aWVzLCBzdHlsZSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgIGlmIChwcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LCBwcm9wZXJ0aWVzKTtcbiAgICB9XG4gICAgaWYgKHN0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCBzdHlsZSk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xufVxuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRGcmV0Ym9hcmRFbGVtZW50ID0gdm9pZCAwO1xuY29uc3QgZG9tXzEgPSByZXF1aXJlKFwiLi9kb21cIik7XG5jb25zdCB0dW5pbmdfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvdHVuaW5nXCIpO1xuY29uc3QgdHlwb2dyYXBoeV8xID0gcmVxdWlyZShcIi4vdHlwb2dyYXBoeVwiKTtcbmNvbnN0IGNvbG9yc18xID0gcmVxdWlyZShcIi4vY29sb3JzXCIpO1xuZnVuY3Rpb24gZ2V0RnJldEhlYWRlckVsZW1lbnQoZnJldENvdW50KSB7XG4gICAgY29uc3QgZnJldEhlYWRlckVsZW1lbnQgPSAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3AnLCB7XG4gICAgICAgIGNsYXNzTmFtZTogJ2ZyZXRIZWFkZXInXG4gICAgfSk7XG4gICAgZm9yIChjb25zdCBmcmV0SW5kZXggb2YgQXJyYXkoZnJldENvdW50KS5rZXlzKCkpIHtcbiAgICAgICAgZnJldEhlYWRlckVsZW1lbnQuYXBwZW5kQ2hpbGQoKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdzcGFuJywge1xuICAgICAgICAgICAgaW5uZXJUZXh0OiBmcmV0SW5kZXgudG9TdHJpbmcoKVxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiBmcmV0SGVhZGVyRWxlbWVudDtcbn1cbmZ1bmN0aW9uIGdldEZyZXRFbGVtZW50KGZyZXROb3RlLCByb290Tm90ZSkge1xuICAgIGNvbnN0IGlubmVyVGV4dCA9IGZyZXROb3RlICE9PSBudWxsXG4gICAgICAgID8gKDAsIHR5cG9ncmFwaHlfMS50eXBlc2V0Tm90ZSkoZnJldE5vdGUudG9TdHJpbmcoKSlcbiAgICAgICAgOiAnwrcnO1xuICAgIGNvbnN0IGdyb3VwID0gcm9vdE5vdGUgIT09IHVuZGVmaW5lZCA/ICgwLCB0dW5pbmdfMS5nZXRHcm91cCkocm9vdE5vdGUsIGZyZXROb3RlKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBjb2xvciA9IGdyb3VwICE9PSB1bmRlZmluZWQgPyAoMCwgY29sb3JzXzEuZ2V0R3JvdXBDb2xvcikoZ3JvdXApIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3NwYW4nLCB7IGlubmVyVGV4dCB9LCB7IGNvbG9yIH0pO1xufVxuZnVuY3Rpb24gZ2V0RnJldHRlZFN0cmluZ0VsZW1lbnQoZnJldHRlZFN0cmluZywgcm9vdE5vdGUpIHtcbiAgICBjb25zdCBmcmV0dGVkU3RyaW5nRWxlbWVudCA9ICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcpO1xuICAgIGZvciAoY29uc3QgZnJldE5vdGUgb2YgZnJldHRlZFN0cmluZykge1xuICAgICAgICBmcmV0dGVkU3RyaW5nRWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0RWxlbWVudChmcmV0Tm90ZSwgcm9vdE5vdGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXR0ZWRTdHJpbmdFbGVtZW50O1xufVxuLyoqIEdldHMgdGhlIEhUTUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIGZyZXRib2FyZCBkaWFncmFtICovXG5mdW5jdGlvbiBnZXRGcmV0Ym9hcmRFbGVtZW50KGZyZXRib2FyZCwgcm9vdE5vdGUpIHtcbiAgICBjb25zdCBmcmV0Ym9hcmRFbGVtZW50ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdkaXYnLCB7IGlkOiAnZnJldGJvYXJkJyB9KTtcbiAgICAvLyBhZGQgZnJldCBudW1iZXJzXG4gICAgZnJldGJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0SGVhZGVyRWxlbWVudChmcmV0Ym9hcmRbMF0ubGVuZ3RoKSk7XG4gICAgLy8gYWRkIHN0cmluZ3MgYm90dG9tIHRvIHRvcFxuICAgIGZvciAoY29uc3QgZnJldHRlZFN0cmluZyBvZiBbLi4uZnJldGJvYXJkXS5yZXZlcnNlKCkpIHtcbiAgICAgICAgZnJldGJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0dGVkU3RyaW5nRWxlbWVudChmcmV0dGVkU3RyaW5nLCByb290Tm90ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldGJvYXJkRWxlbWVudDtcbn1cbmV4cG9ydHMuZ2V0RnJldGJvYXJkRWxlbWVudCA9IGdldEZyZXRib2FyZEVsZW1lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSGludHMgPSB2b2lkIDA7XG5jb25zdCBub3RlXzEgPSByZXF1aXJlKFwiLi4vdGhlb3J5L25vdGVcIik7XG5jb25zdCBjaG9yZF8xID0gcmVxdWlyZShcIi4uL3RoZW9yeS9jaG9yZFwiKTtcbmNvbnN0IGRvbV8xID0gcmVxdWlyZShcIi4vZG9tXCIpO1xuY29uc3QgdHlwb2dyYXBoeV8xID0gcmVxdWlyZShcIi4vdHlwb2dyYXBoeVwiKTtcbmNvbnN0IG5vdGVSZWdleCA9IG5ldyBSZWdFeHAoYF5cXFxccyooJHtub3RlXzEubm90ZU5hbWVQYXR0ZXJufSlgKTtcbmZ1bmN0aW9uIGdldEhpbnRzKGlucHV0VGV4dCkge1xuICAgIGNvbnN0IG1hdGNoID0gaW5wdXRUZXh0Lm1hdGNoKG5vdGVSZWdleCk7XG4gICAgaWYgKG1hdGNoICYmICEobWF0Y2hbMV0gaW4gbm90ZV8xLnVuc3VwcG9ydGVkKSkge1xuICAgICAgICByZXR1cm4gY2hvcmRfMS5zdWZmaXhlcy5tYXAoc3VmZml4ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNob3JkTmFtZSA9IG1hdGNoWzFdICsgc3VmZml4O1xuICAgICAgICAgICAgY29uc3QgY2hvcmQgPSBuZXcgY2hvcmRfMS5DaG9yZChjaG9yZE5hbWUpO1xuICAgICAgICAgICAgY29uc3Qgbm90ZXMgPSBjaG9yZC5ub3Rlcy5qb2luKCcgJyk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRleHQ6IGNob3JkTmFtZSxcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBg4p+oICR7bm90ZXN9IOKfqWBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5vdGVfMS5ub3RlTmFtZXMubWFwKG5hbWVzID0+ICh7XG4gICAgICAgICAgICB0ZXh0OiBuYW1lc1swXSxcbiAgICAgICAgICAgIHRvb2x0aXA6IG5hbWVzLmxlbmd0aCA+IDEgPyBgPSAke25hbWVzWzFdfWAgOiAnJ1xuICAgICAgICB9KSk7XG4gICAgfVxufVxuY2xhc3MgSGludHMge1xuICAgIGNvbnN0cnVjdG9yKGhpbnRzQ29udGFpbmVyLCBvbkNsaWNrKSB7XG4gICAgICAgIHRoaXMuaGludHNDb250YWluZXIgPSBoaW50c0NvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5vbkNsaWNrID0gb25DbGljaztcbiAgICB9XG4gICAgZ2V0SGludEVsZW1lbnQoaGludCkge1xuICAgICAgICBjb25zdCBidXR0b24gPSAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ2J1dHRvbicsIHtcbiAgICAgICAgICAgIGlubmVyVGV4dDogKDAsIHR5cG9ncmFwaHlfMS50eXBlc2V0Q2hvcmQpKGhpbnQudGV4dCksXG4gICAgICAgICAgICB0aXRsZTogKDAsIHR5cG9ncmFwaHlfMS50eXBlc2V0Q2hvcmQpKGhpbnQudG9vbHRpcCksXG4gICAgICAgIH0pO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IHRoaXMub25DbGljayhoaW50LnRleHQpOyB9KTtcbiAgICAgICAgcmV0dXJuIGJ1dHRvbjtcbiAgICB9XG4gICAgLyoqIFNob3dzIHRoZSBoaW50IGJ1dHRvbnMgKi9cbiAgICBzaG93KGlucHV0VGV4dCkge1xuICAgICAgICBjb25zdCBoaW50cyA9IGdldEhpbnRzKGlucHV0VGV4dCk7XG4gICAgICAgIGNvbnN0IGhpbnRFbGVtZW50cyA9IGhpbnRzLm1hcChoaW50ID0+IHRoaXMuZ2V0SGludEVsZW1lbnQoaGludCkpO1xuICAgICAgICB0aGlzLmhpbnRzQ29udGFpbmVyLnJlcGxhY2VDaGlsZHJlbiguLi5oaW50RWxlbWVudHMpO1xuICAgIH1cbn1cbmV4cG9ydHMuSGludHMgPSBIaW50cztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplID0gdm9pZCAwO1xuY29uc3QgY2hvcmRfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvY2hvcmRcIik7XG5jb25zdCB0dW5pbmdfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvdHVuaW5nXCIpO1xuY29uc3QgaW5zdHJ1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvaW5zdHJ1bWVudHNcIik7XG5jb25zdCBkb21fMSA9IHJlcXVpcmUoXCIuL2RvbVwiKTtcbmNvbnN0IHR5cG9ncmFwaHlfMSA9IHJlcXVpcmUoXCIuL3R5cG9ncmFwaHlcIik7XG5jb25zdCBmcmV0Ym9hcmRfMSA9IHJlcXVpcmUoXCIuL2ZyZXRib2FyZFwiKTtcbmNvbnN0IG1vZGVsXzEgPSByZXF1aXJlKFwiLi9tb2RlbFwiKTtcbmNvbnN0IHVybEhhc2hfMSA9IHJlcXVpcmUoXCIuL3VybEhhc2hcIik7XG5jb25zdCBoaW50c18xID0gcmVxdWlyZShcIi4vaGludHNcIik7XG4vLyBTdGF0aWMgcGFnZSBlbGVtZW50c1xuY29uc3QgaW5zdHJ1bWVudEVsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2luc3RydW1lbnQnKTtcbmNvbnN0IHR1bmluZ0VsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ3R1bmluZycpO1xuY29uc3QgZnJldENvdW50RWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnZnJldENvdW50Jyk7XG5jb25zdCBjaG9yZEVsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2Nob3JkJyk7XG5jb25zdCBjbGVhckNob3JkQnV0dG9uID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdjbGVhckNob3JkJyk7XG5jb25zdCBoaW50c0VsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2hpbnRzJyk7XG5jb25zdCBzdGF0dXNFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdzdGF0dXMnKTtcbmNvbnN0IG91dHB1dEVsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ291dHB1dCcpO1xuY29uc3QgaGludHMgPSBuZXcgaGludHNfMS5IaW50cyhoaW50c0VsZW1lbnQsIG9uSGludENsaWNrKTtcbi8qKiBQb3B1bGF0ZXMgdGhlIGluc3RydW1lbnQgZHJvcC1kb3duICovXG5mdW5jdGlvbiBwb3B1bGF0ZUluc3RydW1lbnRzKCkge1xuICAgIGZvciAoY29uc3QgaW5zdHJ1bWVudCBvZiBPYmplY3Qua2V5cyhpbnN0cnVtZW50c18xLmluc3RydW1lbnRzKSkge1xuICAgICAgICBpbnN0cnVtZW50RWxlbWVudC5hcHBlbmRDaGlsZCgoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ29wdGlvbicsIHtcbiAgICAgICAgICAgIHZhbHVlOiBpbnN0cnVtZW50LFxuICAgICAgICAgICAgaW5uZXJUZXh0OiBpbnN0cnVtZW50XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG4vKiogR2V0cyBIVE1MIGVsZW1lbnQgY29udGFpbmluZyB0aGUgbGlzdCBvZiBjaG9yZCdzIG5vdGVzICovXG5mdW5jdGlvbiBnZXRDaG9yZERlc2NyaXB0aW9uRWxlbWVudChjaG9yZCkge1xuICAgIGNvbnN0IG5vdGVzID0gKDAsIHR5cG9ncmFwaHlfMS50eXBlc2V0Tm90ZSkoY2hvcmQubm90ZXMuam9pbignICcpKTtcbiAgICByZXR1cm4gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJywge1xuICAgICAgICBpZDogJ2Nob3JkRGVzY3JpcHRpb24nLFxuICAgICAgICBpbm5lclRleHQ6IGDin6ggJHtub3Rlc30g4p+pYFxuICAgIH0pO1xufVxuLyoqIEdldHMgSFRNTCBlbGVtZW50IGNvbnRhaW5pbmcgYW4gZXJyb3IgbWVzc2FnZSAqL1xuZnVuY3Rpb24gZ2V0RXJyb3JFbGVtZW50KG1lc3NhZ2UpIHtcbiAgICByZXR1cm4gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJywge1xuICAgICAgICBpZDogJ2Vycm9yJyxcbiAgICAgICAgaW5uZXJUZXh0OiBtZXNzYWdlXG4gICAgfSk7XG59XG4vKiogQ3VycmVudCBzdGF0ZSBvZiB0aGUgcGFnZSAqL1xubGV0IG1vZGVsO1xuLyoqXG4gKiBEaXNwbGF5cyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgcGFnZS5cbiAqIFRoZSBtb2RlbCBzaG91bGQgYmUgY29uc2lzdGVudCAodXNlIGBtYWtlQ29uc2lzdGVudGAgYmVmb3JlIGNhbGxpbmcgdGhpcylcbiAqL1xuZnVuY3Rpb24gZGlzcGxheVBhZ2UobW9kZWwpIHtcbiAgICAvLyBwcmV2ZW50IHJlY3Vyc2l2ZSBgb25IYXNoQ2hhbmdlYCBjYWxsc1xuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBvbkhhc2hDaGFuZ2UpO1xuICAgIGNvbnN0IHN0YXR1cyA9IFtdO1xuICAgIGNvbnN0IG91dHB1dCA9IFtdO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHR1bmluZyA9IG5ldyB0dW5pbmdfMS5UdW5pbmcoKDAsIHR5cG9ncmFwaHlfMS5yZW1vdmVUeXBvZ3JhcGh5KShtb2RlbC50dW5pbmdEZXNjcmlwdGlvbikpO1xuICAgICAgICAvLyB0dW5pbmcgaXMgdmFsaWRcbiAgICAgICAgY29uc3QgY2hvcmROYW1lID0gKDAsIHR5cG9ncmFwaHlfMS5yZW1vdmVUeXBvZ3JhcGh5KShtb2RlbC5jaG9yZE5hbWUpLnRyaW0oKTtcbiAgICAgICAgbGV0IGNob3JkID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoY2hvcmROYW1lICE9PSAnJykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjaG9yZCA9IG5ldyBjaG9yZF8xLkNob3JkKGNob3JkTmFtZSk7XG4gICAgICAgICAgICAgICAgLy8gY2hvcmQgaXMgdmFsaWRcbiAgICAgICAgICAgICAgICBzdGF0dXMucHVzaChnZXRDaG9yZERlc2NyaXB0aW9uRWxlbWVudChjaG9yZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgLy8gY2hvcmQgaXMgaW52YWxpZFxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGAke2Vycm9yfWA7XG4gICAgICAgICAgICAgICAgc3RhdHVzLnB1c2goZ2V0RXJyb3JFbGVtZW50KG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmcmV0Ym9hcmQgPSB0dW5pbmcuZ2V0RnJldGJvYXJkKGNob3JkLCBtb2RlbC5mcmV0Q291bnQpO1xuICAgICAgICBvdXRwdXQucHVzaCgoMCwgZnJldGJvYXJkXzEuZ2V0RnJldGJvYXJkRWxlbWVudCkoZnJldGJvYXJkLCBjaG9yZCA9PT0gbnVsbCB8fCBjaG9yZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2hvcmQubm90ZXNbMF0pKTtcbiAgICAgICAgaWYgKGNob3JkICE9PSB1bmRlZmluZWQgfHwgY2hvcmROYW1lID09PSAnJykge1xuICAgICAgICAgICAgLy8gY2hhbmdlIHVybCBoYXNoIG9ubHkgaWYgdGhlIHR1bmluZyBpcyB2YWxpZCBhbmQgdGhlIGNob3JkIGlzIHZhbGlkIG9yIGVtcHR5XG4gICAgICAgICAgICAoMCwgdXJsSGFzaF8xLnNldFVybEhhc2gpKG1vZGVsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gdHVuaW5nIGlzIGludmFsaWRcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogYCR7ZXJyb3J9YDtcbiAgICAgICAgc3RhdHVzLnB1c2goZ2V0RXJyb3JFbGVtZW50KGBJbnZhbGlkIHR1bmluZzogJHttZXNzYWdlfWApKTtcbiAgICB9XG4gICAgLy8gc2V0IHRoZSBpbnB1dCBmaWVsZCB2YWx1ZXNcbiAgICBpbnN0cnVtZW50RWxlbWVudC52YWx1ZSA9IG1vZGVsLmluc3RydW1lbnQ7XG4gICAgdHVuaW5nRWxlbWVudC52YWx1ZSA9IG1vZGVsLnR1bmluZ0Rlc2NyaXB0aW9uO1xuICAgIGZyZXRDb3VudEVsZW1lbnQudmFsdWUgPSBtb2RlbC5mcmV0Q291bnQudG9TdHJpbmcoKTtcbiAgICBjaG9yZEVsZW1lbnQudmFsdWUgPSBtb2RlbC5jaG9yZE5hbWU7XG4gICAgaGludHMuc2hvdygoMCwgdHlwb2dyYXBoeV8xLnJlbW92ZVR5cG9ncmFwaHkpKG1vZGVsLmNob3JkTmFtZSkpO1xuICAgIC8vIGRpc3BsYXkgdGhlIG91dHB1dFxuICAgIHN0YXR1c0VsZW1lbnQucmVwbGFjZUNoaWxkcmVuKC4uLnN0YXR1cyk7XG4gICAgb3V0cHV0RWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4oLi4ub3V0cHV0KTtcbiAgICAvLyB0aW1lb3V0IGZpeGVzIHJlY3Vyc2l2ZSBgb25IYXNoQ2hhbmdlYCBjYWxsc1xuICAgIC8vIFRPRE86IGZpbmQgdGhlIHJlYXNvbiBhbmQgYSBiZXR0ZXIgc29sdXRpb25cbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIG9uSGFzaENoYW5nZSk7IH0sIDEwMCk7XG59XG4vKiogQ2hhbmdlcyB0aGUgY3VycmVudCBwYWdlIHN0YXRlICovXG5mdW5jdGlvbiBjaGFuZ2VNb2RlbChuZXdNb2RlbCkge1xuICAgIG1vZGVsID0gKDAsIG1vZGVsXzEubWFrZUNvbnNpc3RlbnQpKG5ld01vZGVsKTtcbiAgICBkaXNwbGF5UGFnZShtb2RlbCk7XG59XG4vLyBJbnB1dCBhY3Rpb25zOlxuZnVuY3Rpb24gb25JbnN0cnVtZW50SW5wdXQoKSB7XG4gICAgY29uc3QgaW5zdHJ1bWVudCA9IGluc3RydW1lbnRFbGVtZW50LnZhbHVlO1xuICAgIGNoYW5nZU1vZGVsKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGluc3RydW1lbnQsIHR1bmluZ0Rlc2NyaXB0aW9uOiAnJyB9KSk7XG59XG5mdW5jdGlvbiBvblR1bmluZ0lucHV0KCkge1xuICAgIGNvbnN0IHR1bmluZ0Rlc2NyaXB0aW9uID0gdHVuaW5nRWxlbWVudC52YWx1ZTtcbiAgICBjaGFuZ2VNb2RlbChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyB0dW5pbmdEZXNjcmlwdGlvbiwgaW5zdHJ1bWVudDogJycgfSkpO1xufVxuZnVuY3Rpb24gb25GcmV0Q291bnRJbnB1dCgpIHtcbiAgICBjb25zdCBmcmV0Q291bnQgPSBwYXJzZUludChmcmV0Q291bnRFbGVtZW50LnZhbHVlKTtcbiAgICBjaGFuZ2VNb2RlbChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBmcmV0Q291bnQgfSkpO1xufVxuZnVuY3Rpb24gb25DaG9yZElucHV0KCkge1xuICAgIGNvbnN0IGNob3JkTmFtZSA9IGNob3JkRWxlbWVudC52YWx1ZTtcbiAgICBjaGFuZ2VNb2RlbChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBjaG9yZE5hbWUgfSkpO1xufVxuZnVuY3Rpb24gb25IaW50Q2xpY2soaGludCkge1xuICAgIGNoYW5nZU1vZGVsKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGNob3JkTmFtZTogaGludCB9KSk7XG59XG5mdW5jdGlvbiBvbkNob3JkQ2xlYXIoKSB7XG4gICAgY2hhbmdlTW9kZWwoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgY2hvcmROYW1lOiAnJyB9KSk7XG59XG5mdW5jdGlvbiBvbkhhc2hDaGFuZ2UoKSB7XG4gICAgY2hhbmdlTW9kZWwoKDAsIHVybEhhc2hfMS5nZXRVcmxIYXNoKSgpKTtcbn1cbi8vIEVudHJ5IHBvaW50XG5mdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIHBvcHVsYXRlSW5zdHJ1bWVudHMoKTtcbiAgICBvbkhhc2hDaGFuZ2UoKTtcbiAgICBhZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgb25IYXNoQ2hhbmdlKTtcbiAgICBpbnN0cnVtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uSW5zdHJ1bWVudElucHV0KTtcbiAgICB0dW5pbmdFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25UdW5pbmdJbnB1dCk7XG4gICAgZnJldENvdW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uRnJldENvdW50SW5wdXQpO1xuICAgIGNob3JkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uQ2hvcmRJbnB1dCk7XG4gICAgY2xlYXJDaG9yZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2hvcmRDbGVhcik7XG4gICAgY2hvcmRFbGVtZW50LmZvY3VzKCk7XG59XG5leHBvcnRzLmluaXRpYWxpemUgPSBpbml0aWFsaXplO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1ha2VDb25zaXN0ZW50ID0gZXhwb3J0cy5kZWZhdWx0TW9kZWwgPSBleHBvcnRzLm1heEZyZXRDb3VudCA9IHZvaWQgMDtcbmNvbnN0IGluc3RydW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vdGhlb3J5L2luc3RydW1lbnRzXCIpO1xuY29uc3QgdHVuaW5nXzEgPSByZXF1aXJlKFwiLi4vdGhlb3J5L3R1bmluZ1wiKTtcbmV4cG9ydHMubWF4RnJldENvdW50ID0gMzY7XG4vKiogVGhlIHZhbHVlcyB1c2VkIHdoZW4gdGhlIHBhZ2UgaXMgb3Blbm5lZCB3aXRob3V0IGEgVVJMIGhhc2ggKi9cbmV4cG9ydHMuZGVmYXVsdE1vZGVsID0ge1xuICAgIGluc3RydW1lbnQ6ICdVa3VsZWxlIChoaWdoIEcpJyxcbiAgICB0dW5pbmdEZXNjcmlwdGlvbjogJ0c0IEM0IEU0IEE0JyxcbiAgICBmcmV0Q291bnQ6IDEyLFxuICAgIGNob3JkTmFtZTogJycsXG59O1xuLyoqXG4gKiBDaGFuZ2VzIHRoZSBtb2RlbCBzbyB0aGF0IGl0cyB2YWx1ZXMgYXJlIGNvbnNpc3RlbnQgYW5kIHJldHVybnMgdGhlIHJlc3VsdC5cbiAqIFRoZSB2YWx1ZXMgZG9uJ3QgaGF2ZSB0byBiZSB2YWxpZCB0aG91Z2ggKGUuZy4gaW52YWxpZCB0dW5pbmcgb3IgY2hvcmQgYXJlIE9LLFxuICogYnV0IGEgdmFsaWQgdHVuaW5nIHdpdGggYSB3cm9uZyBpbnN0cnVtZW50IGlzIG5vdCkuXG4gKiBTaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBkaXNwbGF5aW5nIHRoZSBwYWdlXG4gKi9cbmZ1bmN0aW9uIG1ha2VDb25zaXN0ZW50KG1vZGVsKSB7XG4gICAgdmFyIF9hO1xuICAgIC8vIGZyZXRDb3VudCBzaG91bGQgYmUgYW4gaW50ZWdlciBiZXR3ZWVuIDAgYW5kIG1heEZyZXRDb3VudFxuICAgIGNvbnN0IGZyZXRDb3VudCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGV4cG9ydHMubWF4RnJldENvdW50LCBNYXRoLnJvdW5kKG1vZGVsLmZyZXRDb3VudCkpKTtcbiAgICBtb2RlbCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGZyZXRDb3VudCB9KTtcbiAgICBjb25zdCBpbnN0cnVtZW50VHVuaW5nID0gKF9hID0gaW5zdHJ1bWVudHNfMS5pbnN0cnVtZW50c1ttb2RlbC5pbnN0cnVtZW50XSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRlc2NyaXB0aW9uO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHR1bmluZyA9IG5ldyB0dW5pbmdfMS5UdW5pbmcobW9kZWwudHVuaW5nRGVzY3JpcHRpb24pLmRlc2NyaXB0aW9uO1xuICAgICAgICBpZiAodHVuaW5nICE9PSBpbnN0cnVtZW50VHVuaW5nKSB7XG4gICAgICAgICAgICAvLyBpZiB0dW5pbmcgaXMgdmFsaWQgYW5kIGRpZmZlcnMgZnJvbSBpbnN0cnVtZW50J3MsIGNoYW5nZSB0aGUgaW5zdHJ1bWVudFxuICAgICAgICAgICAgY29uc3QgaW5zdHJ1bWVudCA9IGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudEJ5VHVuaW5nW3R1bmluZ10gfHwgJyc7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgaW5zdHJ1bWVudCB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoX2IpIHsgfVxuICAgIGlmIChpbnN0cnVtZW50VHVuaW5nKSB7XG4gICAgICAgIC8vIElmIHR1bmluZyBpcyBpbnZhbGlkIGFuZCBpbnN0cnVtZW50IGlzIHZhbGlkLCBjaGFuZ2UgdGhlIHR1bmluZ1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgdHVuaW5nRGVzY3JpcHRpb246IGluc3RydW1lbnRUdW5pbmcgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBJZiBpbnN0cnVtZW50IGlzIGludmFsaWQsIGNoYW5nZSBpdCB0byAnJ1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgaW5zdHJ1bWVudDogJycgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5tYWtlQ29uc2lzdGVudCA9IG1ha2VDb25zaXN0ZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlbW92ZVR5cG9ncmFwaHkgPSBleHBvcnRzLnR5cGVzZXRDaG9yZCA9IGV4cG9ydHMudHlwZXNldE5vdGUgPSB2b2lkIDA7XG5jb25zdCBhY2NpZGVudGFscyA9IHtcbiAgICAnIyc6ICfima8nLFxuICAgICdiJzogJ+KZrScsXG59O1xuY29uc3Qgc3Vic2NyaXB0ID0ge1xuICAgICcwJzogJ+KCgCcsXG4gICAgJzEnOiAn4oKBJyxcbiAgICAnMic6ICfigoInLFxuICAgICczJzogJ+KCgycsXG4gICAgJzQnOiAn4oKEJyxcbiAgICAnNSc6ICfigoUnLFxuICAgICc2JzogJ+KChicsXG4gICAgJzcnOiAn4oKHJyxcbiAgICAnOCc6ICfigognLFxuICAgICc5JzogJ+KCiScsXG59O1xuY29uc3QgYmFja3dhcmREaWN0aW9uYXJ5ID0gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC5lbnRyaWVzKGFjY2lkZW50YWxzKS5jb25jYXQoT2JqZWN0LmVudHJpZXMoc3Vic2NyaXB0KSlcbiAgICAubWFwKChba2V5LCB2YWx1ZV0pID0+IFt2YWx1ZSwga2V5XSkpO1xuY29uc3QgYmFja3dhcmRSZWdleCA9IG5ldyBSZWdFeHAoYFske09iamVjdC52YWx1ZXMoYWNjaWRlbnRhbHMpLmNvbmNhdChPYmplY3QudmFsdWVzKHN1YnNjcmlwdCkpfV1gLCAnZycpO1xuLyoqXG4gKiBSZXBsYWNlcyBlYXN5LXRvLXR5cGUgQVNDSUkgY2hhcmFjdGVyc1xuICogZm9yIGFjY2lkZW50YWxzIGFuZCBvY3RhdmUgbnVtYmVyc1xuICogd2l0aCBnb29kLWxvb2tpbmcgVW5pY29kZSBvbmVzXG4gKi9cbmZ1bmN0aW9uIHR5cGVzZXROb3RlKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dFxuICAgICAgICAucmVwbGFjZSgvWyNiXS9nLCBjID0+IGFjY2lkZW50YWxzW2NdKVxuICAgICAgICAucmVwbGFjZSgvXFxkL2csIGMgPT4gc3Vic2NyaXB0W2NdKTtcbn1cbmV4cG9ydHMudHlwZXNldE5vdGUgPSB0eXBlc2V0Tm90ZTtcbi8qKlxuICogUmVwbGFjZXMgZWFzeS10by10eXBlIEFTQ0lJIGNoYXJhY3RlcnNcbiAqIGZvciBhY2NpZGVudGFscyBhbmQgY2hvcmQgdHlwZXNcbiAqIHdpdGggZ29vZC1sb29raW5nIFVuaWNvZGUgb25lc1xuICovXG5mdW5jdGlvbiB0eXBlc2V0Q2hvcmQodGV4dCkge1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL1sjYl0vZywgYyA9PiBhY2NpZGVudGFsc1tjXSk7XG59XG5leHBvcnRzLnR5cGVzZXRDaG9yZCA9IHR5cGVzZXRDaG9yZDtcbi8qKlxuICogUmVwbGFjZXMgdW5pY29kZSBjaGFyYWN0ZXJzIHdpdGggQVNDSUkgb25lc1xuICovXG5mdW5jdGlvbiByZW1vdmVUeXBvZ3JhcGh5KHRleHQpIHtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKGJhY2t3YXJkUmVnZXgsIGMgPT4gYmFja3dhcmREaWN0aW9uYXJ5W2NdKTtcbn1cbmV4cG9ydHMucmVtb3ZlVHlwb2dyYXBoeSA9IHJlbW92ZVR5cG9ncmFwaHk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0VXJsSGFzaCA9IGV4cG9ydHMuc2V0VXJsSGFzaCA9IHZvaWQgMDtcbmNvbnN0IG1vZGVsXzEgPSByZXF1aXJlKFwiLi9tb2RlbFwiKTtcbmNvbnN0IHR5cG9ncmFwaHlfMSA9IHJlcXVpcmUoXCIuL3R5cG9ncmFwaHlcIik7XG4vKipcbiAqIEVuY29kZXMgdGhlIG1vZGVsIGludG8gdGhlIHBhZ2UncyBVUkwgaGFzaCBwYXJ0LlxuICogVGhpcyBhbGxvd3MgdGhlIHVzZXIgdG8gc2hhcmUgbGlua3MgdG8gc3BlY2lmaWMgdHVuaW5ncyBhbmQgY2hvcmRzLlxuICovXG5mdW5jdGlvbiBzZXRVcmxIYXNoKG1vZGVsKSB7XG4gICAgY29uc3QgdHVuaW5nRGVzY3JpcHRpb24gPSAoMCwgdHlwb2dyYXBoeV8xLnJlbW92ZVR5cG9ncmFwaHkpKG1vZGVsLnR1bmluZ0Rlc2NyaXB0aW9uKS50cmltKCkucmVwbGFjZSgvXFxzKy9nLCAnLScpO1xuICAgIGNvbnN0IGNob3JkTmFtZSA9ICgwLCB0eXBvZ3JhcGh5XzEucmVtb3ZlVHlwb2dyYXBoeSkobW9kZWwuY2hvcmROYW1lKS50cmltKCk7XG4gICAgY29uc3QgaGFzaCA9IGAke21vZGVsLmluc3RydW1lbnR9fCR7dHVuaW5nRGVzY3JpcHRpb259fCR7bW9kZWwuZnJldENvdW50fXwke2Nob3JkTmFtZX1gO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaDtcbn1cbmV4cG9ydHMuc2V0VXJsSGFzaCA9IHNldFVybEhhc2g7XG4vKipcbiAqIFJlYWRzIHRoZSBtb2RlbCBmcm9tIHRoZSBwYWdlJ3MgVVJMIGhhc2ggcGFydC5cbiAqIE5vdGU6IHRoZSBpbnN0cnVtZW50IGlzIG5vdCBzYXZlZCBpbiB0aGUgaGFzaCAoZm9yIHRoZSBzYWtlIG9mIGJyZXZpdHkpXG4gKiBzbyBpdCBjYW4gYmUgY2hvc2VuIGluY29ycmVjdGx5IHdoZW4gbXVsdGlwbGUgaW5zdHJ1bWVudHMgc2hhcmUgdGhlIHNhbWUgdHVuaW5nXG4gKi9cbmZ1bmN0aW9uIGdldFVybEhhc2goKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdGV4dCA9IGRlY29kZVVSSSh3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKC8jLywgJycpKTtcbiAgICAgICAgY29uc3QgcGFydHMgPSB0ZXh0LnNwbGl0KCd8Jyk7XG4gICAgICAgIGNvbnN0IGluc3RydW1lbnQgPSBwYXJ0c1swXTtcbiAgICAgICAgY29uc3QgdHVuaW5nRGVzY3JpcHRpb24gPSBwYXJ0c1sxXS5yZXBsYWNlKC8tL2csICcgJyk7XG4gICAgICAgIGNvbnN0IGZyZXRDb3VudCA9IHBhcnNlSW50KHBhcnRzWzJdKTtcbiAgICAgICAgY29uc3QgY2hvcmROYW1lID0gcGFydHNbM107XG4gICAgICAgIHJldHVybiB7IGluc3RydW1lbnQsIHR1bmluZ0Rlc2NyaXB0aW9uLCBmcmV0Q291bnQsIGNob3JkTmFtZSB9O1xuICAgIH1cbiAgICBjYXRjaCAoX2EpIHsgfVxuICAgIHJldHVybiBtb2RlbF8xLmRlZmF1bHRNb2RlbDtcbn1cbmV4cG9ydHMuZ2V0VXJsSGFzaCA9IGdldFVybEhhc2g7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1aV8xID0gcmVxdWlyZShcIi4vdWlcIik7XG4oMCwgdWlfMS5pbml0aWFsaXplKSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9