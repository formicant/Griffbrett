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
const formatVersion = 0;
/**
 * Encodes the model into the page's URL hash part.
 * This allows the user to share links to specific tunings and chords.
 */
function setUrlHash(model) {
    const tuningDescription = (0, typography_1.removeTypography)(model.tuningDescription).trim().replace(/\s+/g, '-');
    const chordName = (0, typography_1.removeTypography)(model.chordName).trim();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsYUFBYSxtQkFBTyxDQUFDLCtCQUFNO0FBQzNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy90aGVvcnkvY2hvcmQudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy90aGVvcnkvaW5zdHJ1bWVudHMudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy90aGVvcnkvbm90ZS50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3RoZW9yeS90dW5pbmcudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9jb2xvcnMudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9kb20udHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9mcmV0Ym9hcmQudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9oaW50cy50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL2luZGV4LnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvbW9kZWwudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS90eXBvZ3JhcGh5LnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvdXJsSGFzaC50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNob3JkID0gZXhwb3J0cy5zdWZmaXhlcyA9IHZvaWQgMDtcbmNvbnN0IG5vdGVfMSA9IHJlcXVpcmUoXCIuL25vdGVcIik7XG4vLyBJbnRlcnZhbHMgaW4gc2VtaXRvbmVzOlxuY29uc3QgW1AxLCBtMiwgTTIsIG0zLCBNMywgUDQsIEE0LCBQNSwgbTYsIE02LCBtNywgTTddID0gQXJyYXkoMTIpLmtleXMoKTtcbmV4cG9ydHMuc3VmZml4ZXMgPSBbXG4gICAgJ20obm81KScsICcobm81KScsICc1JyxcbiAgICAnZGltJywgJ3N1czInLCAnbScsICcnLCAnc3VzNCcsICdhdWcnLFxuICAgICdtNicsICc2JywgJ203JywgJ21NNycsICc3JywgJ003Jyxcbl07XG5jb25zdCBzdWZmaXhNZWFuaW5ncyA9IHtcbiAgICAnbShubzUpJzogW1AxLCBtM10sXG4gICAgJyhubzUpJzogW1AxLCBNM10sXG4gICAgJzUnOiBbUDEsIFA1XSxcbiAgICAnZGltJzogW1AxLCBtMywgQTRdLFxuICAgICdzdXMyJzogW1AxLCBNMiwgUDVdLFxuICAgICdtJzogW1AxLCBtMywgUDVdLFxuICAgICcnOiBbUDEsIE0zLCBQNV0sXG4gICAgJ3N1czQnOiBbUDEsIFA0LCBQNV0sXG4gICAgJ2F1Zyc6IFtQMSwgTTMsIG02XSxcbiAgICAnbTYnOiBbUDEsIG0zLCBQNSwgTTZdLFxuICAgICc2JzogW1AxLCBNMywgUDUsIE02XSxcbiAgICAnbTcnOiBbUDEsIG0zLCBQNSwgbTddLFxuICAgICdtTTcnOiBbUDEsIG0zLCBQNSwgTTddLFxuICAgICc3JzogW1AxLCBNMywgUDUsIG03XSxcbiAgICAnTTcnOiBbUDEsIE0zLCBQNSwgTTddLFxufTtcbmNvbnN0IGNob3JkUmVnZXggPSBuZXcgUmVnRXhwKGBeKCR7bm90ZV8xLm5vdGVOYW1lUGF0dGVybn0pKC4qKSRgKTtcbmNsYXNzIENob3JkIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gbmFtZS5tYXRjaChjaG9yZFJlZ2V4KTtcbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBDYW4ndCBwYXJzZSBjaG9yZCAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgW18sIHJvb3ROYW1lLCBzdWZmaXhdID0gbWF0Y2g7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBuZXcgbm90ZV8xLk5vdGUocm9vdE5hbWUpO1xuICAgICAgICBpZiAoIShzdWZmaXggaW4gc3VmZml4TWVhbmluZ3MpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYENhbid0IHBhcnNlIGNob3JkIHN1ZmZpeCAke3N1ZmZpeH1gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vdGVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgaW50ZXJ2YWwgb2Ygc3VmZml4TWVhbmluZ3Nbc3VmZml4XSkge1xuICAgICAgICAgICAgdGhpcy5ub3Rlcy5wdXNoKHJvb3QuYWRkSW50ZXJ2YWwoaW50ZXJ2YWwpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0gPSA8JHt0aGlzLm5vdGVzLmpvaW4oJyAnKX0+YDtcbiAgICB9XG59XG5leHBvcnRzLkNob3JkID0gQ2hvcmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nID0gZXhwb3J0cy5pbnN0cnVtZW50cyA9IHZvaWQgMDtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4vdHVuaW5nXCIpO1xuZXhwb3J0cy5pbnN0cnVtZW50cyA9IHtcbiAgICAnQmFsYWxhaWthIChhY2FkZW1pYyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFNCBFNCBBNCcpLFxuICAgICdCYWxhbGFpa2EgKGZvbGspJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzQgRTQgRzQnKSxcbiAgICAnQmFuam8nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBEMyBHMyBCMyBENCcpLFxuICAgICdCYXNzJzogbmV3IHR1bmluZ18xLlR1bmluZygnRTEgQTEgRDIgRzInKSxcbiAgICAnQnJhZ3VpbmhhJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQjQgRDUnKSxcbiAgICAnQ2hhcmFuZ28nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBDNSBFIEE0IEU1JyksXG4gICAgJ0NhdmFxdWluaG8gKFBvcnR1Z2FsIEdHQkQpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgRzQgQjQgRDUnKSxcbiAgICAnQ2F2YXF1aW5obyAoUG9ydHVnYWwgREFCRSknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENSBBNCBCNCBFNScpLFxuICAgICdDYXZhcXVpbmhvIChCcmF6aWwgREdCRCknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBCNCBENScpLFxuICAgICdDYXZhcXVpbmhvIChCcmF6aWwgREdCRSknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBCNCBFNScpLFxuICAgICdEYWxhIGZhZW5keXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFNCBBNCBFNScpLFxuICAgICdEZWNoaWcgcG9uZGFyJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzQgRDQgRzQnKSxcbiAgICAnR3VpdGFsZWxlJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTIgRDMgRzMgQzQgRTQgQTQnKSxcbiAgICAnR3VpdGFyJzogbmV3IHR1bmluZ18xLlR1bmluZygnRTIgQTIgRDMgRzMgQjMgRTQnKSxcbiAgICAnR3VpdGFycsOzbic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0ExIEQyIEcyIEMzIEUzIEEyJyksXG4gICAgJ0phcmFuYSBqYXJvY2hhJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgQzQgRSBBMyBHMycpLFxuICAgICdKYXJhbmEgaHVhc3RlY2EnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBCMyBENCBGIzQgQTQnKSxcbiAgICAnTWFuZG9saW4nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBENCBBNCBFNScpLFxuICAgICdSYWphbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEM0IEU0IEE0JyksXG4gICAgJ1JlcXVpbnRvJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTIgRDMgRzMgQzQgRTQgQTQnKSxcbiAgICAnU2VtaXN0cnVua2EnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdEMiBHMiBCMiBEMyBHMyBCMyBENCcpLFxuICAgICdUZW5vciBndWl0YXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDMyBHMyBENCBBNCcpLFxuICAgICdUaW1wbGUnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBDNSBFNCBBNCBENScpLFxuICAgICdVa3VsZWxlIChoaWdoIEcpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgQzQgRTQgQTQnKSxcbiAgICAnVWt1bGVsZSAobG93IEcpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgQzQgRTQgQTQnKSxcbiAgICAnVWt1bGVsZSAoYmFyaXRvbmUpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDMgRzMgQjMgRTQnKSxcbiAgICAnVmlodWVsYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0EzIEQ0IEc0IEIzIEU0JyksXG4gICAgJ1Zpb2xhJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzMgRzMgRDQgQTQnKSxcbiAgICAnVmlvbGluJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgRDQgQTQgRTUnKSxcbn07XG4vKiogR2V0cyB0aGUgZmlyc3QgaW5zdHJ1bWVudCB3aXRoIHRoZSBnaXZlbiB0dW5pbmcgKi9cbmV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nID0ge307XG5mb3IgKGNvbnN0IFtuYW1lLCB0dW5pbmddIG9mIE9iamVjdC5lbnRyaWVzKGV4cG9ydHMuaW5zdHJ1bWVudHMpKSB7XG4gICAgaWYgKCEodHVuaW5nLmRlc2NyaXB0aW9uIGluIGV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nKSkge1xuICAgICAgICBleHBvcnRzLmluc3RydW1lbnRCeVR1bmluZ1t0dW5pbmcuZGVzY3JpcHRpb25dID0gbmFtZTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTm90ZSA9IGV4cG9ydHMubm90ZU5hbWVQYXR0ZXJuID0gZXhwb3J0cy51bnN1cHBvcnRlZCA9IGV4cG9ydHMubm90ZU5hbWVzID0gdm9pZCAwO1xuLyoqIDEyZWRvIG5vdGVzLiBBIG5vdGUgY2FuIGhhdmUgb25lIG9yIHR3byBuYW1lcyAqL1xuZXhwb3J0cy5ub3RlTmFtZXMgPSBbXG4gICAgWydDJ10sIFsnQyMnLCAnRGInXSxcbiAgICBbJ0QnXSwgWydEIycsICdFYiddLFxuICAgIFsnRSddLFxuICAgIFsnRiddLCBbJ0YjJywgJ0diJ10sXG4gICAgWydHJ10sIFsnRyMnLCAnQWInXSxcbiAgICBbJ0EnXSwgWydBIycsICdCYiddLFxuICAgIFsnQiddLFxuXTtcbmV4cG9ydHMudW5zdXBwb3J0ZWQgPSB7XG4gICAgJ0NiJzogJ0InLFxuICAgICdCIyc6ICdDJyxcbiAgICAnRmInOiAnRScsXG4gICAgJ0UjJzogJ0YnLFxufTtcbmNvbnN0IG5vdGVJbmRleEJ5TmFtZSA9IHt9O1xuZm9yIChjb25zdCBbaW5kZXgsIG5hbWVzXSBvZiBleHBvcnRzLm5vdGVOYW1lcy5lbnRyaWVzKCkpIHtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgbmFtZXMpIHtcbiAgICAgICAgbm90ZUluZGV4QnlOYW1lW25hbWVdID0gaW5kZXg7XG4gICAgfVxufVxuZXhwb3J0cy5ub3RlTmFtZVBhdHRlcm4gPSAnW0EtR11bI2JdPyc7IC8vIHVzZWQgYnkgY2hvcmQudHNcbmNvbnN0IG5vdGVSZWdleCA9IG5ldyBSZWdFeHAoYF4oJHtleHBvcnRzLm5vdGVOYW1lUGF0dGVybn0pKFxcXFxkKT8kYCk7XG4vKiogUmVwcmVzZW50cyBlaXRoZXIgYW4gYWJzb2x1dGUtcGl0Y2hlZCBub3RlIG9yIGFuIG9jdGF2ZS1pbnZhcmlhbnQgbm90ZSAqL1xuY2xhc3MgTm90ZSB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICBjb25zdCBtYXRjaCA9IG5hbWUubWF0Y2gobm90ZVJlZ2V4KTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBjb25zdCBbXywgbm90ZU5hbWUsIG9jdGF2ZU5hbWVdID0gbWF0Y2g7XG4gICAgICAgICAgICBpZiAobm90ZU5hbWUgaW4gZXhwb3J0cy51bnN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1Z2dlc3Rpb24gPSBleHBvcnRzLnVuc3VwcG9ydGVkW25vdGVOYW1lXTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVzZSAke3N1Z2dlc3Rpb259IGluc3RlYWQgb2YgJHtub3RlTmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGl0Y2hDbGFzcyA9IG5vdGVJbmRleEJ5TmFtZVtub3RlTmFtZV07XG4gICAgICAgICAgICB0aGlzLm9jdGF2ZSA9IG9jdGF2ZU5hbWUgIT09IHVuZGVmaW5lZCA/IHBhcnNlSW50KG9jdGF2ZU5hbWUpIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBDYW4ndCBwYXJzZSBub3RlICR7bmFtZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgZnJvbVBpdGNoQ2xhc3NBbmRPY3RhdmUocGl0Y2hDbGFzcywgb2N0YXZlKSB7XG4gICAgICAgIGxldCBub3RlID0gT2JqZWN0LmNyZWF0ZShOb3RlLnByb3RvdHlwZSk7XG4gICAgICAgIG5vdGUucGl0Y2hDbGFzcyA9IHBpdGNoQ2xhc3M7XG4gICAgICAgIG5vdGUub2N0YXZlID0gb2N0YXZlO1xuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9XG4gICAgLyoqIENhbm9uaWNhbCBuYW1lIG9mIHRoZSBub3RlLiBGbGF0cyBhcmVuJ3QgdXNlZCAoZS5nLiBCYiBiZWNvbWVzIEEjKSAqL1xuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBjb25zdCBub3RlTmFtZSA9IGV4cG9ydHMubm90ZU5hbWVzW3RoaXMucGl0Y2hDbGFzc11bMF07XG4gICAgICAgIHJldHVybiB0aGlzLm9jdGF2ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGAke25vdGVOYW1lfSR7dGhpcy5vY3RhdmV9YFxuICAgICAgICAgICAgOiBub3RlTmFtZTtcbiAgICB9XG4gICAgLyoqIEFkZHMgYSBub24tbmVnYXRpdmUgaW50ZXJ2YWwgaW4gc2VtaXRvbmVzIGFuZCByZXR1cm5zIHRoZSByZXN1bHQgKi9cbiAgICBhZGRJbnRlcnZhbChpbnRlcnZhbCkge1xuICAgICAgICBjb25zdCBwaXRjaCA9IHRoaXMucGl0Y2hDbGFzcyArIGludGVydmFsO1xuICAgICAgICBjb25zdCBvY3RhdmUgPSB0aGlzLm9jdGF2ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHRoaXMub2N0YXZlICsgTWF0aC5mbG9vcihwaXRjaCAvIDEyKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBOb3RlLmZyb21QaXRjaENsYXNzQW5kT2N0YXZlKHBpdGNoICUgMTIsIG9jdGF2ZSk7IC8vIGluY29ycmVjdCBmb3IgbmVnYXRpdmUgaW50ZXJ2YWxzXG4gICAgfVxufVxuZXhwb3J0cy5Ob3RlID0gTm90ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UdW5pbmcgPSBleHBvcnRzLmdldEdyb3VwID0gdm9pZCAwO1xuY29uc3Qgbm90ZV8xID0gcmVxdWlyZShcIi4vbm90ZVwiKTtcbmNvbnN0IHNwbGl0UmVnZXggPSAvXFxzK3woPz1bQS1aXSkvOyAvLyBzcGxpdCBieSB3aGl0ZXNwYWNlIG9yIGJlZm9yZSB1cHBlcmNhc2UgbGV0dGVyc1xuLyoqIFJldHVybnMgYSByb3cgb2YgdGhlIGZyZXQgdGFibGUgKHNlZSBgZ2V0RnJldGJvYXJkYCkgKi9cbmZ1bmN0aW9uIGdldEZyZXRzKG9wZW5TdHJpbmcsIGFsbG93ZWRQaXRjaGVzLCBmcmV0Q291bnQpIHtcbiAgICBjb25zdCBmcmV0cyA9IFtdO1xuICAgIGZvciAobGV0IGZyZXRJbmRleCA9IDA7IGZyZXRJbmRleCA8PSBmcmV0Q291bnQ7IGZyZXRJbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IG5vdGUgPSBvcGVuU3RyaW5nLmFkZEludGVydmFsKGZyZXRJbmRleCk7XG4gICAgICAgIGZyZXRzLnB1c2goYWxsb3dlZFBpdGNoZXMuaGFzKG5vdGUucGl0Y2hDbGFzcykgPyBub3RlIDogbnVsbCk7XG4gICAgfVxuICAgIHJldHVybiBmcmV0cztcbn1cbi8qKlxuICogQXNzaWducyBhIGdyb3VwIGluZGV4IHRvIGEgZ2l2ZW4gbm90ZSBiYXNlZCBvbiB0aGUgY2hvcmQncyByb290IG5vdGVcbiAqIHNvIHRoYXQgbm90ZXMgaW5zaWRlIGEgc2luZ2xlIGdyb3VwIGZvcm0gYSBub24taW52ZXJ0ZWQgY2hvcmRcbiAqL1xuZnVuY3Rpb24gZ2V0R3JvdXAocm9vdE5vdGUsIG5vdGUpIHtcbiAgICBpZiAobm90ZSAhPT0gbnVsbCAmJiBub3RlLm9jdGF2ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKChub3RlLm9jdGF2ZSAqIDEyICsgbm90ZS5waXRjaENsYXNzIC0gcm9vdE5vdGUucGl0Y2hDbGFzcykgLyAxMik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0R3JvdXAgPSBnZXRHcm91cDtcbi8qKlxuICogUmVwcmVzZW50cyB0aGUgdHVuaW5nIG9mIGFuIGluc3RydW1lbnQuXG4gKiBDYW4gY29udGFpbiBib3RoIGFic29sdXRlLXBpdGNoZWQgYW5kIG9jdGF2ZS1pbnZhcmlhbnQgc3RyaW5ncy5cbiAqIFRoZSBvcmRlciBvZiB0aGUgc3RyaW5ncyBpcyBsZWZ0LXRvLXJpZ2h0IGlmIHRoZSBpbnN0cnVtZW50IGlzIHJpZ2h0LWhhbmRlZFxuICogYW5kIHBvc2l0aW9uZWQgd2l0aCB0aGUgbmVjayB1cCBhbmQgdGhlIHN0cmluZ3MgZmFjaW5nIHlvdS5cbiAqIChPbiB0aGUgZGlhZ3JhbSwgdGhlIG9yZGVyIGlzIGJvdHRvbS10by10b3ApXG4gKi9cbmNsYXNzIFR1bmluZyB7XG4gICAgY29uc3RydWN0b3IoZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5vcGVuU3RyaW5ncyA9IGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAuc3BsaXQoc3BsaXRSZWdleClcbiAgICAgICAgICAgIC5maWx0ZXIobiA9PiBuICE9PSAnJylcbiAgICAgICAgICAgIC5tYXAobiA9PiBuZXcgbm90ZV8xLk5vdGUobikpO1xuICAgICAgICBpZiAodGhpcy5vcGVuU3RyaW5ncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXQgbGVhc3Qgb25lIG9wZW4gc3RyaW5nIHJlcXVpcmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMub3BlblN0cmluZ3Muam9pbignICcpO1xuICAgIH1cbiAgICAvKiogTm9ybWFsaXplZCB0dW5pbmcgZGVzY3JpcHRpb246IGZsYXRzIGFyZW4ndCB1c2VkLCB0aGUgbm90ZXMgYXJlIHNlcGFyYXRlZCBieSBzcGFjZXMgKi9cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGBUdW5pbmcoXCIke3RoaXMuZGVzY3JpcHRpb259XCIpYDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZnJldCB0YWJsZSBmb3IgYSBnaXZlbiBjaG9yZCBhcyBhbiBhcnJheSBvZiB0YWJsZSByb3dzLlxuICAgICAqIEVhY2ggcm93IGlzIGFuIGFycmF5IG9mIGNlbGxzIGFuZCByZXByZXNlbnRzIGEgc3RyaW5nLlxuICAgICAqIFRoZSBvcmRlciBvZiB0aGUgcm93cyBmb2xsb3dzIHRoZSBzdHJpbmcgb3JkZXIgaW4gdGhlIHR1bmluZyBkZXNjcmlwdGlvbiAoYm90dG9tLXRvLXRvcCBvbiB0aGUgZGlhZ3JhbSkuXG4gICAgICogQSBjZWxsIHJlcHJlc2VudHMgYSBmcmV0LiAwdGggY2VsbCBpbiBhIHJvdyByZXByZXNlbnRzIG9wZW4gc3RyaW5nLlxuICAgICAqIEVhY2ggY2VsbCBjb250YWlucyBlaXRoZXIgYSBub3RlIChpZiB0aGUgbm90ZSBpcyBpbiB0aGUgY2hvcmQpIG9yIGBudWxsYCAob3RoZXJ3aXNlKS5cbiAgICAgKiBJZiB0aGUgY2hvcmQgaXMgYHVuZGVmaW5lZGAsIHJldHVybnMgYSB0YWJsZSB3aXRoIGFsbCBgbnVsbGBzXG4gICAgICovXG4gICAgZ2V0RnJldGJvYXJkKGNob3JkLCBmcmV0Q291bnQgPSAxMikge1xuICAgICAgICBjb25zdCBhbGxvd2VkUGl0Y2hlcyA9IGNob3JkICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gY2hvcmQubm90ZXMubWFwKG4gPT4gbi5waXRjaENsYXNzKVxuICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXMub3BlblN0cmluZ3MubWFwKHMgPT4gZ2V0RnJldHMocywgbmV3IFNldChhbGxvd2VkUGl0Y2hlcyksIGZyZXRDb3VudCkpO1xuICAgIH1cbn1cbmV4cG9ydHMuVHVuaW5nID0gVHVuaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldEdyb3VwQ29sb3IgPSB2b2lkIDA7XG5jb25zdCBwaGkgPSAoMSArIE1hdGguc3FydCg1KSkgLyAyO1xuY29uc3QgZ29sZGVuQW5nbGUgPSAyICogTWF0aC5QSSAvIChwaGkgKiBwaGkpO1xuY29uc3QgbGlnaHRuZXNzID0gMC41NTtcbmNvbnN0IHNhdHVyYXRpb24gPSAwLjY1O1xuLyoqXG4gKiBHZW5lcmF0ZXMgYW4gT0tsYWIgY29sb3IgZm9yIGEgZ2l2ZW4gZ3JvdXAgaW5kZXhcbiAqIHNvIHRoYXQgYWxsIGNvbG9ycyBoYXZlIHRoZSBzYW1lIGxpZ2h0bmVzcyBhbmQgc2F0dXJhdGlvbixcbiAqIGFsbCBncm91cHMgaGF2ZSBkaWZmZXJlbnQgaHVlcyxcbiAqIGFuZCBodWVzIG9mIG5laWdoYm9yIGdyb3VwcyBjb250cmFzdCB3ZWxsIHdpdGggZWFjaCBvdGhlclxuICovXG5mdW5jdGlvbiBnZXRHcm91cENvbG9yKGdyb3VwKSB7XG4gICAgY29uc3QgaHVlID0gZ29sZGVuQW5nbGUgKiBncm91cDtcbiAgICBjb25zdCBsID0gbGlnaHRuZXNzICogMTAwO1xuICAgIGNvbnN0IGEgPSBzYXR1cmF0aW9uICogTWF0aC5jb3MoaHVlKSAqIDEwMDtcbiAgICBjb25zdCBiID0gc2F0dXJhdGlvbiAqIE1hdGguc2luKGh1ZSkgKiAxMDA7XG4gICAgcmV0dXJuIGBva2xhYigke2wudG9GaXhlZCgxKX0lICR7YS50b0ZpeGVkKDEpfSUgJHtiLnRvRml4ZWQoMSl9JSlgO1xufVxuZXhwb3J0cy5nZXRHcm91cENvbG9yID0gZ2V0R3JvdXBDb2xvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gZXhwb3J0cy5nZXRCeUlkID0gdm9pZCAwO1xuLyoqIEdlbmVyaWMtdHlwZWQgdmVyc2lvbiBvZiBgZ2V0RWxlbWVudEJ5SWRgICovXG5mdW5jdGlvbiBnZXRCeUlkKGlkKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYENhbm5vdCBmaW5kIGVsZW1lbnQgd2l0aCBpZCAnJHtpZH0nYCk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xufVxuZXhwb3J0cy5nZXRCeUlkID0gZ2V0QnlJZDtcbi8qKiBDcmVhdGVzIGFuIEhUTUwgZWxlbWVudCB3aXRoIHRoZSBnaXZlbiB0YWcgbmFtZSwgcHJvcGVydGllcyBhbmQgKG9wdGlvbmFsbHkpIHN0eWxlICovXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZ05hbWUsIHByb3BlcnRpZXMsIHN0eWxlKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgaWYgKHByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQsIHByb3BlcnRpZXMpO1xuICAgIH1cbiAgICBpZiAoc3R5bGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIHN0eWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5leHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldEZyZXRib2FyZEVsZW1lbnQgPSB2b2lkIDA7XG5jb25zdCBkb21fMSA9IHJlcXVpcmUoXCIuL2RvbVwiKTtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS90dW5pbmdcIik7XG5jb25zdCB0eXBvZ3JhcGh5XzEgPSByZXF1aXJlKFwiLi90eXBvZ3JhcGh5XCIpO1xuY29uc3QgY29sb3JzXzEgPSByZXF1aXJlKFwiLi9jb2xvcnNcIik7XG5mdW5jdGlvbiBnZXRGcmV0SGVhZGVyRWxlbWVudChmcmV0Q291bnQpIHtcbiAgICBjb25zdCBmcmV0SGVhZGVyRWxlbWVudCA9ICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcsIHtcbiAgICAgICAgY2xhc3NOYW1lOiAnZnJldEhlYWRlcidcbiAgICB9KTtcbiAgICBmb3IgKGNvbnN0IGZyZXRJbmRleCBvZiBBcnJheShmcmV0Q291bnQpLmtleXMoKSkge1xuICAgICAgICBmcmV0SGVhZGVyRWxlbWVudC5hcHBlbmRDaGlsZCgoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3NwYW4nLCB7XG4gICAgICAgICAgICBpbm5lclRleHQ6IGZyZXRJbmRleC50b1N0cmluZygpXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXRIZWFkZXJFbGVtZW50O1xufVxuZnVuY3Rpb24gZ2V0RnJldEVsZW1lbnQoZnJldE5vdGUsIHJvb3ROb3RlKSB7XG4gICAgY29uc3QgaW5uZXJUZXh0ID0gZnJldE5vdGUgIT09IG51bGxcbiAgICAgICAgPyAoMCwgdHlwb2dyYXBoeV8xLnR5cGVzZXROb3RlKShmcmV0Tm90ZS50b1N0cmluZygpKVxuICAgICAgICA6ICfCtyc7XG4gICAgY29uc3QgZ3JvdXAgPSByb290Tm90ZSAhPT0gdW5kZWZpbmVkID8gKDAsIHR1bmluZ18xLmdldEdyb3VwKShyb290Tm90ZSwgZnJldE5vdGUpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGNvbG9yID0gZ3JvdXAgIT09IHVuZGVmaW5lZCA/ICgwLCBjb2xvcnNfMS5nZXRHcm91cENvbG9yKShncm91cCkgOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnc3BhbicsIHsgaW5uZXJUZXh0IH0sIHsgY29sb3IgfSk7XG59XG5mdW5jdGlvbiBnZXRGcmV0dGVkU3RyaW5nRWxlbWVudChmcmV0dGVkU3RyaW5nLCByb290Tm90ZSkge1xuICAgIGNvbnN0IGZyZXR0ZWRTdHJpbmdFbGVtZW50ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJyk7XG4gICAgZm9yIChjb25zdCBmcmV0Tm90ZSBvZiBmcmV0dGVkU3RyaW5nKSB7XG4gICAgICAgIGZyZXR0ZWRTdHJpbmdFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXRFbGVtZW50KGZyZXROb3RlLCByb290Tm90ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldHRlZFN0cmluZ0VsZW1lbnQ7XG59XG4vKiogR2V0cyB0aGUgSFRNTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgZnJldGJvYXJkIGRpYWdyYW0gKi9cbmZ1bmN0aW9uIGdldEZyZXRib2FyZEVsZW1lbnQoZnJldGJvYXJkLCByb290Tm90ZSkge1xuICAgIGNvbnN0IGZyZXRib2FyZEVsZW1lbnQgPSAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ2RpdicsIHsgaWQ6ICdmcmV0Ym9hcmQnIH0pO1xuICAgIC8vIGFkZCBmcmV0IG51bWJlcnNcbiAgICBmcmV0Ym9hcmRFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXRIZWFkZXJFbGVtZW50KGZyZXRib2FyZFswXS5sZW5ndGgpKTtcbiAgICAvLyBhZGQgc3RyaW5ncyBib3R0b20gdG8gdG9wXG4gICAgZm9yIChjb25zdCBmcmV0dGVkU3RyaW5nIG9mIFsuLi5mcmV0Ym9hcmRdLnJldmVyc2UoKSkge1xuICAgICAgICBmcmV0Ym9hcmRFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXR0ZWRTdHJpbmdFbGVtZW50KGZyZXR0ZWRTdHJpbmcsIHJvb3ROb3RlKSk7XG4gICAgfVxuICAgIHJldHVybiBmcmV0Ym9hcmRFbGVtZW50O1xufVxuZXhwb3J0cy5nZXRGcmV0Ym9hcmRFbGVtZW50ID0gZ2V0RnJldGJvYXJkRWxlbWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5IaW50cyA9IHZvaWQgMDtcbmNvbnN0IG5vdGVfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvbm90ZVwiKTtcbmNvbnN0IGNob3JkXzEgPSByZXF1aXJlKFwiLi4vdGhlb3J5L2Nob3JkXCIpO1xuY29uc3QgZG9tXzEgPSByZXF1aXJlKFwiLi9kb21cIik7XG5jb25zdCB0eXBvZ3JhcGh5XzEgPSByZXF1aXJlKFwiLi90eXBvZ3JhcGh5XCIpO1xuY29uc3Qgbm90ZVJlZ2V4ID0gbmV3IFJlZ0V4cChgXlxcXFxzKigke25vdGVfMS5ub3RlTmFtZVBhdHRlcm59KWApO1xuZnVuY3Rpb24gZ2V0SGludHMoaW5wdXRUZXh0KSB7XG4gICAgY29uc3QgbWF0Y2ggPSBpbnB1dFRleHQubWF0Y2gobm90ZVJlZ2V4KTtcbiAgICBpZiAobWF0Y2ggJiYgIShtYXRjaFsxXSBpbiBub3RlXzEudW5zdXBwb3J0ZWQpKSB7XG4gICAgICAgIHJldHVybiBjaG9yZF8xLnN1ZmZpeGVzLm1hcChzdWZmaXggPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hvcmROYW1lID0gbWF0Y2hbMV0gKyBzdWZmaXg7XG4gICAgICAgICAgICBjb25zdCBjaG9yZCA9IG5ldyBjaG9yZF8xLkNob3JkKGNob3JkTmFtZSk7XG4gICAgICAgICAgICBjb25zdCBub3RlcyA9IGNob3JkLm5vdGVzLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGV4dDogY2hvcmROYW1lLFxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IGDin6ggJHtub3Rlc30g4p+pYFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbm90ZV8xLm5vdGVOYW1lcy5tYXAobmFtZXMgPT4gKHtcbiAgICAgICAgICAgIHRleHQ6IG5hbWVzWzBdLFxuICAgICAgICAgICAgdG9vbHRpcDogbmFtZXMubGVuZ3RoID4gMSA/IGA9ICR7bmFtZXNbMV19YCA6ICcnXG4gICAgICAgIH0pKTtcbiAgICB9XG59XG5jbGFzcyBIaW50cyB7XG4gICAgY29uc3RydWN0b3IoaGludHNDb250YWluZXIsIG9uQ2xpY2spIHtcbiAgICAgICAgdGhpcy5oaW50c0NvbnRhaW5lciA9IGhpbnRzQ29udGFpbmVyO1xuICAgICAgICB0aGlzLm9uQ2xpY2sgPSBvbkNsaWNrO1xuICAgIH1cbiAgICBnZXRIaW50RWxlbWVudChoaW50KSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9ICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnYnV0dG9uJywge1xuICAgICAgICAgICAgaW5uZXJUZXh0OiAoMCwgdHlwb2dyYXBoeV8xLnR5cGVzZXRDaG9yZCkoaGludC50ZXh0KSxcbiAgICAgICAgICAgIHRpdGxlOiAoMCwgdHlwb2dyYXBoeV8xLnR5cGVzZXRDaG9yZCkoaGludC50b29sdGlwKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgdGhpcy5vbkNsaWNrKGhpbnQudGV4dCk7IH0pO1xuICAgICAgICByZXR1cm4gYnV0dG9uO1xuICAgIH1cbiAgICAvKiogU2hvd3MgdGhlIGhpbnQgYnV0dG9ucyAqL1xuICAgIHNob3coaW5wdXRUZXh0KSB7XG4gICAgICAgIGNvbnN0IGhpbnRzID0gZ2V0SGludHMoaW5wdXRUZXh0KTtcbiAgICAgICAgY29uc3QgaGludEVsZW1lbnRzID0gaGludHMubWFwKGhpbnQgPT4gdGhpcy5nZXRIaW50RWxlbWVudChoaW50KSk7XG4gICAgICAgIHRoaXMuaGludHNDb250YWluZXIucmVwbGFjZUNoaWxkcmVuKC4uLmhpbnRFbGVtZW50cyk7XG4gICAgfVxufVxuZXhwb3J0cy5IaW50cyA9IEhpbnRzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemUgPSB2b2lkIDA7XG5jb25zdCBjaG9yZF8xID0gcmVxdWlyZShcIi4uL3RoZW9yeS9jaG9yZFwiKTtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS90dW5pbmdcIik7XG5jb25zdCBpbnN0cnVtZW50c18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS9pbnN0cnVtZW50c1wiKTtcbmNvbnN0IGRvbV8xID0gcmVxdWlyZShcIi4vZG9tXCIpO1xuY29uc3QgdHlwb2dyYXBoeV8xID0gcmVxdWlyZShcIi4vdHlwb2dyYXBoeVwiKTtcbmNvbnN0IGZyZXRib2FyZF8xID0gcmVxdWlyZShcIi4vZnJldGJvYXJkXCIpO1xuY29uc3QgbW9kZWxfMSA9IHJlcXVpcmUoXCIuL21vZGVsXCIpO1xuY29uc3QgdXJsSGFzaF8xID0gcmVxdWlyZShcIi4vdXJsSGFzaFwiKTtcbmNvbnN0IGhpbnRzXzEgPSByZXF1aXJlKFwiLi9oaW50c1wiKTtcbi8vIFN0YXRpYyBwYWdlIGVsZW1lbnRzXG5jb25zdCBpbnN0cnVtZW50RWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnaW5zdHJ1bWVudCcpO1xuY29uc3QgdHVuaW5nRWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgndHVuaW5nJyk7XG5jb25zdCBmcmV0Q291bnRFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdmcmV0Q291bnQnKTtcbmNvbnN0IGNob3JkRWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnY2hvcmQnKTtcbmNvbnN0IGNsZWFyQ2hvcmRCdXR0b24gPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2NsZWFyQ2hvcmQnKTtcbmNvbnN0IGhpbnRzRWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnaGludHMnKTtcbmNvbnN0IHN0YXR1c0VsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ3N0YXR1cycpO1xuY29uc3Qgb3V0cHV0RWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnb3V0cHV0Jyk7XG5jb25zdCBoaW50cyA9IG5ldyBoaW50c18xLkhpbnRzKGhpbnRzRWxlbWVudCwgb25IaW50Q2xpY2spO1xuLyoqIFBvcHVsYXRlcyB0aGUgaW5zdHJ1bWVudCBkcm9wLWRvd24gKi9cbmZ1bmN0aW9uIHBvcHVsYXRlSW5zdHJ1bWVudHMoKSB7XG4gICAgZm9yIChjb25zdCBpbnN0cnVtZW50IG9mIE9iamVjdC5rZXlzKGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudHMpKSB7XG4gICAgICAgIGluc3RydW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKCgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnb3B0aW9uJywge1xuICAgICAgICAgICAgdmFsdWU6IGluc3RydW1lbnQsXG4gICAgICAgICAgICBpbm5lclRleHQ6IGluc3RydW1lbnRcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbi8qKiBHZXRzIEhUTUwgZWxlbWVudCBjb250YWluaW5nIHRoZSBsaXN0IG9mIGNob3JkJ3Mgbm90ZXMgKi9cbmZ1bmN0aW9uIGdldENob3JkRGVzY3JpcHRpb25FbGVtZW50KGNob3JkKSB7XG4gICAgY29uc3Qgbm90ZXMgPSAoMCwgdHlwb2dyYXBoeV8xLnR5cGVzZXROb3RlKShjaG9yZC5ub3Rlcy5qb2luKCcgJykpO1xuICAgIHJldHVybiAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3AnLCB7XG4gICAgICAgIGlkOiAnY2hvcmREZXNjcmlwdGlvbicsXG4gICAgICAgIGlubmVyVGV4dDogYOKfqCAke25vdGVzfSDin6lgXG4gICAgfSk7XG59XG4vKiogR2V0cyBIVE1MIGVsZW1lbnQgY29udGFpbmluZyBhbiBlcnJvciBtZXNzYWdlICovXG5mdW5jdGlvbiBnZXRFcnJvckVsZW1lbnQobWVzc2FnZSkge1xuICAgIHJldHVybiAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3AnLCB7XG4gICAgICAgIGlkOiAnZXJyb3InLFxuICAgICAgICBpbm5lclRleHQ6IG1lc3NhZ2VcbiAgICB9KTtcbn1cbi8qKiBDdXJyZW50IHN0YXRlIG9mIHRoZSBwYWdlICovXG5sZXQgbW9kZWw7XG4vKipcbiAqIERpc3BsYXlzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBwYWdlLlxuICogVGhlIG1vZGVsIHNob3VsZCBiZSBjb25zaXN0ZW50ICh1c2UgYG1ha2VDb25zaXN0ZW50YCBiZWZvcmUgY2FsbGluZyB0aGlzKVxuICovXG5mdW5jdGlvbiBkaXNwbGF5UGFnZShtb2RlbCkge1xuICAgIC8vIHByZXZlbnQgcmVjdXJzaXZlIGBvbkhhc2hDaGFuZ2VgIGNhbGxzXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIG9uSGFzaENoYW5nZSk7XG4gICAgY29uc3Qgc3RhdHVzID0gW107XG4gICAgY29uc3Qgb3V0cHV0ID0gW107XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdHVuaW5nID0gbmV3IHR1bmluZ18xLlR1bmluZygoMCwgdHlwb2dyYXBoeV8xLnJlbW92ZVR5cG9ncmFwaHkpKG1vZGVsLnR1bmluZ0Rlc2NyaXB0aW9uKSk7XG4gICAgICAgIC8vIHR1bmluZyBpcyB2YWxpZFxuICAgICAgICBjb25zdCBjaG9yZE5hbWUgPSAoMCwgdHlwb2dyYXBoeV8xLnJlbW92ZVR5cG9ncmFwaHkpKG1vZGVsLmNob3JkTmFtZSkudHJpbSgpO1xuICAgICAgICBsZXQgY2hvcmQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChjaG9yZE5hbWUgIT09ICcnKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNob3JkID0gbmV3IGNob3JkXzEuQ2hvcmQoY2hvcmROYW1lKTtcbiAgICAgICAgICAgICAgICAvLyBjaG9yZCBpcyB2YWxpZFxuICAgICAgICAgICAgICAgIHN0YXR1cy5wdXNoKGdldENob3JkRGVzY3JpcHRpb25FbGVtZW50KGNob3JkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyBjaG9yZCBpcyBpbnZhbGlkXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogYCR7ZXJyb3J9YDtcbiAgICAgICAgICAgICAgICBzdGF0dXMucHVzaChnZXRFcnJvckVsZW1lbnQobWVzc2FnZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZyZXRib2FyZCA9IHR1bmluZy5nZXRGcmV0Ym9hcmQoY2hvcmQsIG1vZGVsLmZyZXRDb3VudCk7XG4gICAgICAgIG91dHB1dC5wdXNoKCgwLCBmcmV0Ym9hcmRfMS5nZXRGcmV0Ym9hcmRFbGVtZW50KShmcmV0Ym9hcmQsIGNob3JkID09PSBudWxsIHx8IGNob3JkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjaG9yZC5ub3Rlc1swXSkpO1xuICAgICAgICBpZiAoY2hvcmQgIT09IHVuZGVmaW5lZCB8fCBjaG9yZE5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICAvLyBjaGFuZ2UgdXJsIGhhc2ggb25seSBpZiB0aGUgdHVuaW5nIGlzIHZhbGlkIGFuZCB0aGUgY2hvcmQgaXMgdmFsaWQgb3IgZW1wdHlcbiAgICAgICAgICAgICgwLCB1cmxIYXNoXzEuc2V0VXJsSGFzaCkobW9kZWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyB0dW5pbmcgaXMgaW52YWxpZFxuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBgJHtlcnJvcn1gO1xuICAgICAgICBzdGF0dXMucHVzaChnZXRFcnJvckVsZW1lbnQoYEludmFsaWQgdHVuaW5nOiAke21lc3NhZ2V9YCkpO1xuICAgIH1cbiAgICAvLyBzZXQgdGhlIGlucHV0IGZpZWxkIHZhbHVlc1xuICAgIGluc3RydW1lbnRFbGVtZW50LnZhbHVlID0gbW9kZWwuaW5zdHJ1bWVudDtcbiAgICB0dW5pbmdFbGVtZW50LnZhbHVlID0gbW9kZWwudHVuaW5nRGVzY3JpcHRpb247XG4gICAgZnJldENvdW50RWxlbWVudC52YWx1ZSA9IG1vZGVsLmZyZXRDb3VudC50b1N0cmluZygpO1xuICAgIGNob3JkRWxlbWVudC52YWx1ZSA9IG1vZGVsLmNob3JkTmFtZTtcbiAgICBoaW50cy5zaG93KCgwLCB0eXBvZ3JhcGh5XzEucmVtb3ZlVHlwb2dyYXBoeSkobW9kZWwuY2hvcmROYW1lKSk7XG4gICAgLy8gZGlzcGxheSB0aGUgb3V0cHV0XG4gICAgc3RhdHVzRWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4oLi4uc3RhdHVzKTtcbiAgICBvdXRwdXRFbGVtZW50LnJlcGxhY2VDaGlsZHJlbiguLi5vdXRwdXQpO1xuICAgIC8vIHRpbWVvdXQgZml4ZXMgcmVjdXJzaXZlIGBvbkhhc2hDaGFuZ2VgIGNhbGxzXG4gICAgLy8gVE9ETzogZmluZCB0aGUgcmVhc29uIGFuZCBhIGJldHRlciBzb2x1dGlvblxuICAgIHNldFRpbWVvdXQoKCkgPT4geyBhZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgb25IYXNoQ2hhbmdlKTsgfSwgMTAwKTtcbn1cbi8qKiBDaGFuZ2VzIHRoZSBjdXJyZW50IHBhZ2Ugc3RhdGUgKi9cbmZ1bmN0aW9uIGNoYW5nZU1vZGVsKG5ld01vZGVsKSB7XG4gICAgbW9kZWwgPSAoMCwgbW9kZWxfMS5tYWtlQ29uc2lzdGVudCkobmV3TW9kZWwpO1xuICAgIGRpc3BsYXlQYWdlKG1vZGVsKTtcbn1cbi8vIElucHV0IGFjdGlvbnM6XG5mdW5jdGlvbiBvbkluc3RydW1lbnRJbnB1dCgpIHtcbiAgICBjb25zdCBpbnN0cnVtZW50ID0gaW5zdHJ1bWVudEVsZW1lbnQudmFsdWU7XG4gICAgY2hhbmdlTW9kZWwoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgaW5zdHJ1bWVudCwgdHVuaW5nRGVzY3JpcHRpb246ICcnIH0pKTtcbn1cbmZ1bmN0aW9uIG9uVHVuaW5nSW5wdXQoKSB7XG4gICAgY29uc3QgdHVuaW5nRGVzY3JpcHRpb24gPSB0dW5pbmdFbGVtZW50LnZhbHVlO1xuICAgIGNoYW5nZU1vZGVsKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IHR1bmluZ0Rlc2NyaXB0aW9uLCBpbnN0cnVtZW50OiAnJyB9KSk7XG59XG5mdW5jdGlvbiBvbkZyZXRDb3VudElucHV0KCkge1xuICAgIGNvbnN0IGZyZXRDb3VudCA9IHBhcnNlSW50KGZyZXRDb3VudEVsZW1lbnQudmFsdWUpO1xuICAgIGNoYW5nZU1vZGVsKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGZyZXRDb3VudCB9KSk7XG59XG5mdW5jdGlvbiBvbkNob3JkSW5wdXQoKSB7XG4gICAgY29uc3QgY2hvcmROYW1lID0gY2hvcmRFbGVtZW50LnZhbHVlO1xuICAgIGNoYW5nZU1vZGVsKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGNob3JkTmFtZSB9KSk7XG59XG5mdW5jdGlvbiBvbkhpbnRDbGljayhoaW50KSB7XG4gICAgY2hhbmdlTW9kZWwoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgY2hvcmROYW1lOiBoaW50IH0pKTtcbn1cbmZ1bmN0aW9uIG9uQ2hvcmRDbGVhcigpIHtcbiAgICBjaGFuZ2VNb2RlbChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBjaG9yZE5hbWU6ICcnIH0pKTtcbn1cbmZ1bmN0aW9uIG9uSGFzaENoYW5nZSgpIHtcbiAgICBjaGFuZ2VNb2RlbCgoMCwgdXJsSGFzaF8xLmdldFVybEhhc2gpKCkpO1xufVxuLy8gRW50cnkgcG9pbnRcbmZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgcG9wdWxhdGVJbnN0cnVtZW50cygpO1xuICAgIG9uSGFzaENoYW5nZSgpO1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBvbkhhc2hDaGFuZ2UpO1xuICAgIGluc3RydW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25JbnN0cnVtZW50SW5wdXQpO1xuICAgIHR1bmluZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvblR1bmluZ0lucHV0KTtcbiAgICBmcmV0Q291bnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25GcmV0Q291bnRJbnB1dCk7XG4gICAgY2hvcmRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25DaG9yZElucHV0KTtcbiAgICBjbGVhckNob3JkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DaG9yZENsZWFyKTtcbiAgICBjaG9yZEVsZW1lbnQuZm9jdXMoKTtcbn1cbmV4cG9ydHMuaW5pdGlhbGl6ZSA9IGluaXRpYWxpemU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWFrZUNvbnNpc3RlbnQgPSBleHBvcnRzLmRlZmF1bHRNb2RlbCA9IGV4cG9ydHMubWF4RnJldENvdW50ID0gdm9pZCAwO1xuY29uc3QgaW5zdHJ1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvaW5zdHJ1bWVudHNcIik7XG5jb25zdCB0dW5pbmdfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvdHVuaW5nXCIpO1xuZXhwb3J0cy5tYXhGcmV0Q291bnQgPSAzNjtcbi8qKiBUaGUgdmFsdWVzIHVzZWQgd2hlbiB0aGUgcGFnZSBpcyBvcGVubmVkIHdpdGhvdXQgYSBVUkwgaGFzaCAqL1xuZXhwb3J0cy5kZWZhdWx0TW9kZWwgPSB7XG4gICAgaW5zdHJ1bWVudDogJ1VrdWxlbGUgKGhpZ2ggRyknLFxuICAgIHR1bmluZ0Rlc2NyaXB0aW9uOiAnRzQgQzQgRTQgQTQnLFxuICAgIGZyZXRDb3VudDogMTIsXG4gICAgY2hvcmROYW1lOiAnJyxcbn07XG4vKipcbiAqIENoYW5nZXMgdGhlIG1vZGVsIHNvIHRoYXQgaXRzIHZhbHVlcyBhcmUgY29uc2lzdGVudCBhbmQgcmV0dXJucyB0aGUgcmVzdWx0LlxuICogVGhlIHZhbHVlcyBkb24ndCBoYXZlIHRvIGJlIHZhbGlkIHRob3VnaCAoZS5nLiBpbnZhbGlkIHR1bmluZyBvciBjaG9yZCBhcmUgT0ssXG4gKiBidXQgYSB2YWxpZCB0dW5pbmcgd2l0aCBhIHdyb25nIGluc3RydW1lbnQgaXMgbm90KS5cbiAqIFNob3VsZCBiZSBjYWxsZWQgYmVmb3JlIGRpc3BsYXlpbmcgdGhlIHBhZ2VcbiAqL1xuZnVuY3Rpb24gbWFrZUNvbnNpc3RlbnQobW9kZWwpIHtcbiAgICB2YXIgX2E7XG4gICAgLy8gZnJldENvdW50IHNob3VsZCBiZSBhbiBpbnRlZ2VyIGJldHdlZW4gMCBhbmQgbWF4RnJldENvdW50XG4gICAgY29uc3QgZnJldENvdW50ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZXhwb3J0cy5tYXhGcmV0Q291bnQsIE1hdGgucm91bmQobW9kZWwuZnJldENvdW50KSkpO1xuICAgIG1vZGVsID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgZnJldENvdW50IH0pO1xuICAgIGNvbnN0IGluc3RydW1lbnRUdW5pbmcgPSAoX2EgPSBpbnN0cnVtZW50c18xLmluc3RydW1lbnRzW21vZGVsLmluc3RydW1lbnRdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGVzY3JpcHRpb247XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdHVuaW5nID0gbmV3IHR1bmluZ18xLlR1bmluZyhtb2RlbC50dW5pbmdEZXNjcmlwdGlvbikuZGVzY3JpcHRpb247XG4gICAgICAgIGlmICh0dW5pbmcgIT09IGluc3RydW1lbnRUdW5pbmcpIHtcbiAgICAgICAgICAgIC8vIGlmIHR1bmluZyBpcyB2YWxpZCBhbmQgZGlmZmVycyBmcm9tIGluc3RydW1lbnQncywgY2hhbmdlIHRoZSBpbnN0cnVtZW50XG4gICAgICAgICAgICBjb25zdCBpbnN0cnVtZW50ID0gaW5zdHJ1bWVudHNfMS5pbnN0cnVtZW50QnlUdW5pbmdbdHVuaW5nXSB8fCAnJztcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBpbnN0cnVtZW50IH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChfYikgeyB9XG4gICAgaWYgKGluc3RydW1lbnRUdW5pbmcpIHtcbiAgICAgICAgLy8gSWYgdHVuaW5nIGlzIGludmFsaWQgYW5kIGluc3RydW1lbnQgaXMgdmFsaWQsIGNoYW5nZSB0aGUgdHVuaW5nXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyB0dW5pbmdEZXNjcmlwdGlvbjogaW5zdHJ1bWVudFR1bmluZyB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIElmIGluc3RydW1lbnQgaXMgaW52YWxpZCwgY2hhbmdlIGl0IHRvICcnXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBpbnN0cnVtZW50OiAnJyB9KTtcbiAgICB9XG59XG5leHBvcnRzLm1ha2VDb25zaXN0ZW50ID0gbWFrZUNvbnNpc3RlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVtb3ZlVHlwb2dyYXBoeSA9IGV4cG9ydHMudHlwZXNldENob3JkID0gZXhwb3J0cy50eXBlc2V0Tm90ZSA9IHZvaWQgMDtcbmNvbnN0IGFjY2lkZW50YWxzID0ge1xuICAgICcjJzogJ+KZrycsXG4gICAgJ2InOiAn4pmtJyxcbn07XG5jb25zdCBzdWJzY3JpcHQgPSB7XG4gICAgJzAnOiAn4oKAJyxcbiAgICAnMSc6ICfigoEnLFxuICAgICcyJzogJ+KCgicsXG4gICAgJzMnOiAn4oKDJyxcbiAgICAnNCc6ICfigoQnLFxuICAgICc1JzogJ+KChScsXG4gICAgJzYnOiAn4oKGJyxcbiAgICAnNyc6ICfigocnLFxuICAgICc4JzogJ+KCiCcsXG4gICAgJzknOiAn4oKJJyxcbn07XG5jb25zdCBiYWNrd2FyZERpY3Rpb25hcnkgPSBPYmplY3QuZnJvbUVudHJpZXMoT2JqZWN0LmVudHJpZXMoYWNjaWRlbnRhbHMpLmNvbmNhdChPYmplY3QuZW50cmllcyhzdWJzY3JpcHQpKVxuICAgIC5tYXAoKFtrZXksIHZhbHVlXSkgPT4gW3ZhbHVlLCBrZXldKSk7XG5jb25zdCBiYWNrd2FyZFJlZ2V4ID0gbmV3IFJlZ0V4cChgWyR7T2JqZWN0LnZhbHVlcyhhY2NpZGVudGFscykuY29uY2F0KE9iamVjdC52YWx1ZXMoc3Vic2NyaXB0KSl9XWAsICdnJyk7XG4vKipcbiAqIFJlcGxhY2VzIGVhc3ktdG8tdHlwZSBBU0NJSSBjaGFyYWN0ZXJzXG4gKiBmb3IgYWNjaWRlbnRhbHMgYW5kIG9jdGF2ZSBudW1iZXJzXG4gKiB3aXRoIGdvb2QtbG9va2luZyBVbmljb2RlIG9uZXNcbiAqL1xuZnVuY3Rpb24gdHlwZXNldE5vdGUodGV4dCkge1xuICAgIHJldHVybiB0ZXh0XG4gICAgICAgIC5yZXBsYWNlKC9bI2JdL2csIGMgPT4gYWNjaWRlbnRhbHNbY10pXG4gICAgICAgIC5yZXBsYWNlKC9cXGQvZywgYyA9PiBzdWJzY3JpcHRbY10pO1xufVxuZXhwb3J0cy50eXBlc2V0Tm90ZSA9IHR5cGVzZXROb3RlO1xuLyoqXG4gKiBSZXBsYWNlcyBlYXN5LXRvLXR5cGUgQVNDSUkgY2hhcmFjdGVyc1xuICogZm9yIGFjY2lkZW50YWxzIGFuZCBjaG9yZCB0eXBlc1xuICogd2l0aCBnb29kLWxvb2tpbmcgVW5pY29kZSBvbmVzXG4gKi9cbmZ1bmN0aW9uIHR5cGVzZXRDaG9yZCh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQucmVwbGFjZSgvWyNiXS9nLCBjID0+IGFjY2lkZW50YWxzW2NdKTtcbn1cbmV4cG9ydHMudHlwZXNldENob3JkID0gdHlwZXNldENob3JkO1xuLyoqXG4gKiBSZXBsYWNlcyB1bmljb2RlIGNoYXJhY3RlcnMgd2l0aCBBU0NJSSBvbmVzXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZVR5cG9ncmFwaHkodGV4dCkge1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoYmFja3dhcmRSZWdleCwgYyA9PiBiYWNrd2FyZERpY3Rpb25hcnlbY10pO1xufVxuZXhwb3J0cy5yZW1vdmVUeXBvZ3JhcGh5ID0gcmVtb3ZlVHlwb2dyYXBoeTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRVcmxIYXNoID0gZXhwb3J0cy5zZXRVcmxIYXNoID0gdm9pZCAwO1xuY29uc3QgbW9kZWxfMSA9IHJlcXVpcmUoXCIuL21vZGVsXCIpO1xuY29uc3QgdHlwb2dyYXBoeV8xID0gcmVxdWlyZShcIi4vdHlwb2dyYXBoeVwiKTtcbmNvbnN0IGZvcm1hdFZlcnNpb24gPSAwO1xuLyoqXG4gKiBFbmNvZGVzIHRoZSBtb2RlbCBpbnRvIHRoZSBwYWdlJ3MgVVJMIGhhc2ggcGFydC5cbiAqIFRoaXMgYWxsb3dzIHRoZSB1c2VyIHRvIHNoYXJlIGxpbmtzIHRvIHNwZWNpZmljIHR1bmluZ3MgYW5kIGNob3Jkcy5cbiAqL1xuZnVuY3Rpb24gc2V0VXJsSGFzaChtb2RlbCkge1xuICAgIGNvbnN0IHR1bmluZ0Rlc2NyaXB0aW9uID0gKDAsIHR5cG9ncmFwaHlfMS5yZW1vdmVUeXBvZ3JhcGh5KShtb2RlbC50dW5pbmdEZXNjcmlwdGlvbikudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJy0nKTtcbiAgICBjb25zdCBjaG9yZE5hbWUgPSAoMCwgdHlwb2dyYXBoeV8xLnJlbW92ZVR5cG9ncmFwaHkpKG1vZGVsLmNob3JkTmFtZSkudHJpbSgpO1xuICAgIGNvbnN0IGhhc2ggPSBgJHtmb3JtYXRWZXJzaW9ufXwke3R1bmluZ0Rlc2NyaXB0aW9ufXwke21vZGVsLmZyZXRDb3VudH18JHtjaG9yZE5hbWV9YDtcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhhc2g7XG59XG5leHBvcnRzLnNldFVybEhhc2ggPSBzZXRVcmxIYXNoO1xuLyoqXG4gKiBSZWFkcyB0aGUgbW9kZWwgZnJvbSB0aGUgcGFnZSdzIFVSTCBoYXNoIHBhcnQuXG4gKiBOb3RlOiB0aGUgaW5zdHJ1bWVudCBpcyBub3Qgc2F2ZWQgaW4gdGhlIGhhc2ggKGZvciB0aGUgc2FrZSBvZiBicmV2aXR5KVxuICogc28gaXQgY2FuIGJlIGNob3NlbiBpbmNvcnJlY3RseSB3aGVuIG11bHRpcGxlIGluc3RydW1lbnRzIHNoYXJlIHRoZSBzYW1lIHR1bmluZ1xuICovXG5mdW5jdGlvbiBnZXRVcmxIYXNoKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBkZWNvZGVVUkkod2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgvIy8sICcnKSk7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gdGV4dC5zcGxpdCgnfCcpO1xuICAgICAgICBpZiAocGFyc2VJbnQocGFydHNbMF0pID09PSBmb3JtYXRWZXJzaW9uKSB7XG4gICAgICAgICAgICBjb25zdCB0dW5pbmdEZXNjcmlwdGlvbiA9IHBhcnRzWzFdLnJlcGxhY2UoLy0vZywgJyAnKTtcbiAgICAgICAgICAgIGNvbnN0IGZyZXRDb3VudCA9IHBhcnNlSW50KHBhcnRzWzJdKTtcbiAgICAgICAgICAgIGNvbnN0IGNob3JkTmFtZSA9IHBhcnRzWzNdO1xuICAgICAgICAgICAgcmV0dXJuIHsgaW5zdHJ1bWVudDogJycsIHR1bmluZ0Rlc2NyaXB0aW9uLCBmcmV0Q291bnQsIGNob3JkTmFtZSB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChfYSkgeyB9XG4gICAgcmV0dXJuIG1vZGVsXzEuZGVmYXVsdE1vZGVsO1xufVxuZXhwb3J0cy5nZXRVcmxIYXNoID0gZ2V0VXJsSGFzaDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHVpXzEgPSByZXF1aXJlKFwiLi91aVwiKTtcbigwLCB1aV8xLmluaXRpYWxpemUpKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=