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
    'Ukulele (D6)': new tuning_1.Tuning('A4 D4 F#4 B4'),
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
function changeUrlHash() {
    removeEventListener('hashchange', onHashChange);
    (0, urlHash_1.setUrlHash)(model);
    // timeout fixes recursive `onHashChange` calls
    // TODO: find the reason and a better solution
    setTimeout(() => { addEventListener('hashchange', onHashChange); }, 100);
}
/**
 * Displays the current state of the page.
 * The model should be consistent (use `makeConsistent` before calling this)
 */
function displayPage(model) {
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
            changeUrlHash();
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
}
/** Changes the current page state */
function changeModel(change) {
    model = (0, model_1.makeConsistent)(Object.assign(Object.assign({}, model), change));
    displayPage(model);
}
// Input actions:
function onInstrumentInput() {
    const instrument = instrumentElement.value;
    changeModel({ instrument, tuningDescription: '' });
}
function onTuningInput() {
    const tuningDescription = tuningElement.value;
    changeModel({ tuningDescription, instrument: '' });
}
function onFretCountInput() {
    const fretCount = parseInt(fretCountElement.value);
    changeModel({ fretCount });
}
function onChordInput() {
    const chordName = chordElement.value;
    changeModel({ chordName });
}
function onHintClick(hint) {
    changeModel({ chordName: hint });
}
function onChordClear() {
    changeModel({ chordName: '' });
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
        const text = decodeURIComponent(window.location.hash.replace(/#/, ''));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsYUFBYSxtQkFBTyxDQUFDLCtCQUFNO0FBQzNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy90aGVvcnkvY2hvcmQudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy90aGVvcnkvaW5zdHJ1bWVudHMudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy90aGVvcnkvbm90ZS50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3RoZW9yeS90dW5pbmcudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9jb2xvcnMudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9kb20udHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9mcmV0Ym9hcmQudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9oaW50cy50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL2luZGV4LnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvbW9kZWwudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS90eXBvZ3JhcGh5LnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvdXJsSGFzaC50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNob3JkID0gZXhwb3J0cy5zdWZmaXhlcyA9IHZvaWQgMDtcbmNvbnN0IG5vdGVfMSA9IHJlcXVpcmUoXCIuL25vdGVcIik7XG4vLyBJbnRlcnZhbHMgaW4gc2VtaXRvbmVzOlxuY29uc3QgW1AxLCBtMiwgTTIsIG0zLCBNMywgUDQsIEE0LCBQNSwgbTYsIE02LCBtNywgTTddID0gQXJyYXkoMTIpLmtleXMoKTtcbmV4cG9ydHMuc3VmZml4ZXMgPSBbXG4gICAgJ20obm81KScsICcobm81KScsICc1JyxcbiAgICAnZGltJywgJ3N1czInLCAnbScsICcnLCAnc3VzNCcsICdhdWcnLFxuICAgICdtNicsICc2JywgJ203JywgJ21NNycsICc3JywgJ003Jyxcbl07XG5jb25zdCBzdWZmaXhNZWFuaW5ncyA9IHtcbiAgICAnbShubzUpJzogW1AxLCBtM10sXG4gICAgJyhubzUpJzogW1AxLCBNM10sXG4gICAgJzUnOiBbUDEsIFA1XSxcbiAgICAnZGltJzogW1AxLCBtMywgQTRdLFxuICAgICdzdXMyJzogW1AxLCBNMiwgUDVdLFxuICAgICdtJzogW1AxLCBtMywgUDVdLFxuICAgICcnOiBbUDEsIE0zLCBQNV0sXG4gICAgJ3N1czQnOiBbUDEsIFA0LCBQNV0sXG4gICAgJ2F1Zyc6IFtQMSwgTTMsIG02XSxcbiAgICAnbTYnOiBbUDEsIG0zLCBQNSwgTTZdLFxuICAgICc2JzogW1AxLCBNMywgUDUsIE02XSxcbiAgICAnbTcnOiBbUDEsIG0zLCBQNSwgbTddLFxuICAgICdtTTcnOiBbUDEsIG0zLCBQNSwgTTddLFxuICAgICc3JzogW1AxLCBNMywgUDUsIG03XSxcbiAgICAnTTcnOiBbUDEsIE0zLCBQNSwgTTddLFxufTtcbmNvbnN0IGNob3JkUmVnZXggPSBuZXcgUmVnRXhwKGBeKCR7bm90ZV8xLm5vdGVOYW1lUGF0dGVybn0pKC4qKSRgKTtcbmNsYXNzIENob3JkIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gbmFtZS5tYXRjaChjaG9yZFJlZ2V4KTtcbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBDYW4ndCBwYXJzZSBjaG9yZCAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgW18sIHJvb3ROYW1lLCBzdWZmaXhdID0gbWF0Y2g7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBuZXcgbm90ZV8xLk5vdGUocm9vdE5hbWUpO1xuICAgICAgICBpZiAoIShzdWZmaXggaW4gc3VmZml4TWVhbmluZ3MpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYENhbid0IHBhcnNlIGNob3JkIHN1ZmZpeCAke3N1ZmZpeH1gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vdGVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgaW50ZXJ2YWwgb2Ygc3VmZml4TWVhbmluZ3Nbc3VmZml4XSkge1xuICAgICAgICAgICAgdGhpcy5ub3Rlcy5wdXNoKHJvb3QuYWRkSW50ZXJ2YWwoaW50ZXJ2YWwpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0gPSA8JHt0aGlzLm5vdGVzLmpvaW4oJyAnKX0+YDtcbiAgICB9XG59XG5leHBvcnRzLkNob3JkID0gQ2hvcmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nID0gZXhwb3J0cy5pbnN0cnVtZW50cyA9IHZvaWQgMDtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4vdHVuaW5nXCIpO1xuZXhwb3J0cy5pbnN0cnVtZW50cyA9IHtcbiAgICAnQmFsYWxhaWthIChhY2FkZW1pYyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFNCBFNCBBNCcpLFxuICAgICdCYWxhbGFpa2EgKGZvbGspJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzQgRTQgRzQnKSxcbiAgICAnQmFuam8nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBEMyBHMyBCMyBENCcpLFxuICAgICdCYXNzJzogbmV3IHR1bmluZ18xLlR1bmluZygnRTEgQTEgRDIgRzInKSxcbiAgICAnQnJhZ3VpbmhhJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQjQgRDUnKSxcbiAgICAnQ2hhcmFuZ28nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBDNSBFIEE0IEU1JyksXG4gICAgJ0NhdmFxdWluaG8gKFBvcnR1Z2FsIEdHQkQpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgRzQgQjQgRDUnKSxcbiAgICAnQ2F2YXF1aW5obyAoUG9ydHVnYWwgREFCRSknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENSBBNCBCNCBFNScpLFxuICAgICdDYXZhcXVpbmhvIChCcmF6aWwgREdCRCknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBCNCBENScpLFxuICAgICdDYXZhcXVpbmhvIChCcmF6aWwgREdCRSknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBCNCBFNScpLFxuICAgICdEYWxhIGZhZW5keXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFNCBBNCBFNScpLFxuICAgICdEZWNoaWcgcG9uZGFyJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzQgRDQgRzQnKSxcbiAgICAnR3VpdGFsZWxlJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTIgRDMgRzMgQzQgRTQgQTQnKSxcbiAgICAnR3VpdGFyJzogbmV3IHR1bmluZ18xLlR1bmluZygnRTIgQTIgRDMgRzMgQjMgRTQnKSxcbiAgICAnR3VpdGFycsOzbic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0ExIEQyIEcyIEMzIEUzIEEyJyksXG4gICAgJ0phcmFuYSBqYXJvY2hhJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgQzQgRSBBMyBHMycpLFxuICAgICdKYXJhbmEgaHVhc3RlY2EnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBCMyBENCBGIzQgQTQnKSxcbiAgICAnTWFuZG9saW4nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBENCBBNCBFNScpLFxuICAgICdSYWphbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEM0IEU0IEE0JyksXG4gICAgJ1JlcXVpbnRvJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTIgRDMgRzMgQzQgRTQgQTQnKSxcbiAgICAnU2VtaXN0cnVua2EnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdEMiBHMiBCMiBEMyBHMyBCMyBENCcpLFxuICAgICdUZW5vciBndWl0YXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDMyBHMyBENCBBNCcpLFxuICAgICdUaW1wbGUnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBDNSBFNCBBNCBENScpLFxuICAgICdVa3VsZWxlIChoaWdoIEcpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgQzQgRTQgQTQnKSxcbiAgICAnVWt1bGVsZSAobG93IEcpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgQzQgRTQgQTQnKSxcbiAgICAnVWt1bGVsZSAoRDYpJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTQgRDQgRiM0IEI0JyksXG4gICAgJ1VrdWxlbGUgKGJhcml0b25lKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0QzIEczIEIzIEU0JyksXG4gICAgJ1ZpaHVlbGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMyBENCBHNCBCMyBFNCcpLFxuICAgICdWaW9sYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0MzIEczIEQ0IEE0JyksXG4gICAgJ1Zpb2xpbic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEQ0IEE0IEU1JyksXG59O1xuLyoqIEdldHMgdGhlIGZpcnN0IGluc3RydW1lbnQgd2l0aCB0aGUgZ2l2ZW4gdHVuaW5nICovXG5leHBvcnRzLmluc3RydW1lbnRCeVR1bmluZyA9IHt9O1xuZm9yIChjb25zdCBbbmFtZSwgdHVuaW5nXSBvZiBPYmplY3QuZW50cmllcyhleHBvcnRzLmluc3RydW1lbnRzKSkge1xuICAgIGlmICghKHR1bmluZy5kZXNjcmlwdGlvbiBpbiBleHBvcnRzLmluc3RydW1lbnRCeVR1bmluZykpIHtcbiAgICAgICAgZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmdbdHVuaW5nLmRlc2NyaXB0aW9uXSA9IG5hbWU7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk5vdGUgPSBleHBvcnRzLm5vdGVOYW1lUGF0dGVybiA9IGV4cG9ydHMudW5zdXBwb3J0ZWQgPSBleHBvcnRzLm5vdGVOYW1lcyA9IHZvaWQgMDtcbi8qKiAxMmVkbyBub3Rlcy4gQSBub3RlIGNhbiBoYXZlIG9uZSBvciB0d28gbmFtZXMgKi9cbmV4cG9ydHMubm90ZU5hbWVzID0gW1xuICAgIFsnQyddLCBbJ0MjJywgJ0RiJ10sXG4gICAgWydEJ10sIFsnRCMnLCAnRWInXSxcbiAgICBbJ0UnXSxcbiAgICBbJ0YnXSwgWydGIycsICdHYiddLFxuICAgIFsnRyddLCBbJ0cjJywgJ0FiJ10sXG4gICAgWydBJ10sIFsnQSMnLCAnQmInXSxcbiAgICBbJ0InXSxcbl07XG5leHBvcnRzLnVuc3VwcG9ydGVkID0ge1xuICAgICdDYic6ICdCJyxcbiAgICAnQiMnOiAnQycsXG4gICAgJ0ZiJzogJ0UnLFxuICAgICdFIyc6ICdGJyxcbn07XG5jb25zdCBub3RlSW5kZXhCeU5hbWUgPSB7fTtcbmZvciAoY29uc3QgW2luZGV4LCBuYW1lc10gb2YgZXhwb3J0cy5ub3RlTmFtZXMuZW50cmllcygpKSB7XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIG5hbWVzKSB7XG4gICAgICAgIG5vdGVJbmRleEJ5TmFtZVtuYW1lXSA9IGluZGV4O1xuICAgIH1cbn1cbmV4cG9ydHMubm90ZU5hbWVQYXR0ZXJuID0gJ1tBLUddWyNiXT8nOyAvLyB1c2VkIGJ5IGNob3JkLnRzXG5jb25zdCBub3RlUmVnZXggPSBuZXcgUmVnRXhwKGBeKCR7ZXhwb3J0cy5ub3RlTmFtZVBhdHRlcm59KShcXFxcZCk/JGApO1xuLyoqIFJlcHJlc2VudHMgZWl0aGVyIGFuIGFic29sdXRlLXBpdGNoZWQgbm90ZSBvciBhbiBvY3RhdmUtaW52YXJpYW50IG5vdGUgKi9cbmNsYXNzIE5vdGUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBuYW1lLm1hdGNoKG5vdGVSZWdleCk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgY29uc3QgW18sIG5vdGVOYW1lLCBvY3RhdmVOYW1lXSA9IG1hdGNoO1xuICAgICAgICAgICAgaWYgKG5vdGVOYW1lIGluIGV4cG9ydHMudW5zdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWdnZXN0aW9uID0gZXhwb3J0cy51bnN1cHBvcnRlZFtub3RlTmFtZV07XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVc2UgJHtzdWdnZXN0aW9ufSBpbnN0ZWFkIG9mICR7bm90ZU5hbWV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBpdGNoQ2xhc3MgPSBub3RlSW5kZXhCeU5hbWVbbm90ZU5hbWVdO1xuICAgICAgICAgICAgdGhpcy5vY3RhdmUgPSBvY3RhdmVOYW1lICE9PSB1bmRlZmluZWQgPyBwYXJzZUludChvY3RhdmVOYW1lKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgQ2FuJ3QgcGFyc2Ugbm90ZSAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGZyb21QaXRjaENsYXNzQW5kT2N0YXZlKHBpdGNoQ2xhc3MsIG9jdGF2ZSkge1xuICAgICAgICBsZXQgbm90ZSA9IE9iamVjdC5jcmVhdGUoTm90ZS5wcm90b3R5cGUpO1xuICAgICAgICBub3RlLnBpdGNoQ2xhc3MgPSBwaXRjaENsYXNzO1xuICAgICAgICBub3RlLm9jdGF2ZSA9IG9jdGF2ZTtcbiAgICAgICAgcmV0dXJuIG5vdGU7XG4gICAgfVxuICAgIC8qKiBDYW5vbmljYWwgbmFtZSBvZiB0aGUgbm90ZS4gRmxhdHMgYXJlbid0IHVzZWQgKGUuZy4gQmIgYmVjb21lcyBBIykgKi9cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgY29uc3Qgbm90ZU5hbWUgPSBleHBvcnRzLm5vdGVOYW1lc1t0aGlzLnBpdGNoQ2xhc3NdWzBdO1xuICAgICAgICByZXR1cm4gdGhpcy5vY3RhdmUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBgJHtub3RlTmFtZX0ke3RoaXMub2N0YXZlfWBcbiAgICAgICAgICAgIDogbm90ZU5hbWU7XG4gICAgfVxuICAgIC8qKiBBZGRzIGEgbm9uLW5lZ2F0aXZlIGludGVydmFsIGluIHNlbWl0b25lcyBhbmQgcmV0dXJucyB0aGUgcmVzdWx0ICovXG4gICAgYWRkSW50ZXJ2YWwoaW50ZXJ2YWwpIHtcbiAgICAgICAgY29uc3QgcGl0Y2ggPSB0aGlzLnBpdGNoQ2xhc3MgKyBpbnRlcnZhbDtcbiAgICAgICAgY29uc3Qgb2N0YXZlID0gdGhpcy5vY3RhdmUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB0aGlzLm9jdGF2ZSArIE1hdGguZmxvb3IocGl0Y2ggLyAxMilcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gTm90ZS5mcm9tUGl0Y2hDbGFzc0FuZE9jdGF2ZShwaXRjaCAlIDEyLCBvY3RhdmUpOyAvLyBpbmNvcnJlY3QgZm9yIG5lZ2F0aXZlIGludGVydmFsc1xuICAgIH1cbn1cbmV4cG9ydHMuTm90ZSA9IE5vdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVHVuaW5nID0gZXhwb3J0cy5nZXRHcm91cCA9IHZvaWQgMDtcbmNvbnN0IG5vdGVfMSA9IHJlcXVpcmUoXCIuL25vdGVcIik7XG5jb25zdCBzcGxpdFJlZ2V4ID0gL1xccyt8KD89W0EtWl0pLzsgLy8gc3BsaXQgYnkgd2hpdGVzcGFjZSBvciBiZWZvcmUgdXBwZXJjYXNlIGxldHRlcnNcbi8qKiBSZXR1cm5zIGEgcm93IG9mIHRoZSBmcmV0IHRhYmxlIChzZWUgYGdldEZyZXRib2FyZGApICovXG5mdW5jdGlvbiBnZXRGcmV0cyhvcGVuU3RyaW5nLCBhbGxvd2VkUGl0Y2hlcywgZnJldENvdW50KSB7XG4gICAgY29uc3QgZnJldHMgPSBbXTtcbiAgICBmb3IgKGxldCBmcmV0SW5kZXggPSAwOyBmcmV0SW5kZXggPD0gZnJldENvdW50OyBmcmV0SW5kZXgrKykge1xuICAgICAgICBjb25zdCBub3RlID0gb3BlblN0cmluZy5hZGRJbnRlcnZhbChmcmV0SW5kZXgpO1xuICAgICAgICBmcmV0cy5wdXNoKGFsbG93ZWRQaXRjaGVzLmhhcyhub3RlLnBpdGNoQ2xhc3MpID8gbm90ZSA6IG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldHM7XG59XG4vKipcbiAqIEFzc2lnbnMgYSBncm91cCBpbmRleCB0byBhIGdpdmVuIG5vdGUgYmFzZWQgb24gdGhlIGNob3JkJ3Mgcm9vdCBub3RlXG4gKiBzbyB0aGF0IG5vdGVzIGluc2lkZSBhIHNpbmdsZSBncm91cCBmb3JtIGEgbm9uLWludmVydGVkIGNob3JkXG4gKi9cbmZ1bmN0aW9uIGdldEdyb3VwKHJvb3ROb3RlLCBub3RlKSB7XG4gICAgaWYgKG5vdGUgIT09IG51bGwgJiYgbm90ZS5vY3RhdmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigobm90ZS5vY3RhdmUgKiAxMiArIG5vdGUucGl0Y2hDbGFzcyAtIHJvb3ROb3RlLnBpdGNoQ2xhc3MpIC8gMTIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnRzLmdldEdyb3VwID0gZ2V0R3JvdXA7XG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIHR1bmluZyBvZiBhbiBpbnN0cnVtZW50LlxuICogQ2FuIGNvbnRhaW4gYm90aCBhYnNvbHV0ZS1waXRjaGVkIGFuZCBvY3RhdmUtaW52YXJpYW50IHN0cmluZ3MuXG4gKiBUaGUgb3JkZXIgb2YgdGhlIHN0cmluZ3MgaXMgbGVmdC10by1yaWdodCBpZiB0aGUgaW5zdHJ1bWVudCBpcyByaWdodC1oYW5kZWRcbiAqIGFuZCBwb3NpdGlvbmVkIHdpdGggdGhlIG5lY2sgdXAgYW5kIHRoZSBzdHJpbmdzIGZhY2luZyB5b3UuXG4gKiAoT24gdGhlIGRpYWdyYW0sIHRoZSBvcmRlciBpcyBib3R0b20tdG8tdG9wKVxuICovXG5jbGFzcyBUdW5pbmcge1xuICAgIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMub3BlblN0cmluZ3MgPSBkZXNjcmlwdGlvblxuICAgICAgICAgICAgLnNwbGl0KHNwbGl0UmVnZXgpXG4gICAgICAgICAgICAuZmlsdGVyKG4gPT4gbiAhPT0gJycpXG4gICAgICAgICAgICAubWFwKG4gPT4gbmV3IG5vdGVfMS5Ob3RlKG4pKTtcbiAgICAgICAgaWYgKHRoaXMub3BlblN0cmluZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0IGxlYXN0IG9uZSBvcGVuIHN0cmluZyByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0aGlzLm9wZW5TdHJpbmdzLmpvaW4oJyAnKTtcbiAgICB9XG4gICAgLyoqIE5vcm1hbGl6ZWQgdHVuaW5nIGRlc2NyaXB0aW9uOiBmbGF0cyBhcmVuJ3QgdXNlZCwgdGhlIG5vdGVzIGFyZSBzZXBhcmF0ZWQgYnkgc3BhY2VzICovXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBgVHVuaW5nKFwiJHt0aGlzLmRlc2NyaXB0aW9ufVwiKWA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGZyZXQgdGFibGUgZm9yIGEgZ2l2ZW4gY2hvcmQgYXMgYW4gYXJyYXkgb2YgdGFibGUgcm93cy5cbiAgICAgKiBFYWNoIHJvdyBpcyBhbiBhcnJheSBvZiBjZWxscyBhbmQgcmVwcmVzZW50cyBhIHN0cmluZy5cbiAgICAgKiBUaGUgb3JkZXIgb2YgdGhlIHJvd3MgZm9sbG93cyB0aGUgc3RyaW5nIG9yZGVyIGluIHRoZSB0dW5pbmcgZGVzY3JpcHRpb24gKGJvdHRvbS10by10b3Agb24gdGhlIGRpYWdyYW0pLlxuICAgICAqIEEgY2VsbCByZXByZXNlbnRzIGEgZnJldC4gMHRoIGNlbGwgaW4gYSByb3cgcmVwcmVzZW50cyBvcGVuIHN0cmluZy5cbiAgICAgKiBFYWNoIGNlbGwgY29udGFpbnMgZWl0aGVyIGEgbm90ZSAoaWYgdGhlIG5vdGUgaXMgaW4gdGhlIGNob3JkKSBvciBgbnVsbGAgKG90aGVyd2lzZSkuXG4gICAgICogSWYgdGhlIGNob3JkIGlzIGB1bmRlZmluZWRgLCByZXR1cm5zIGEgdGFibGUgd2l0aCBhbGwgYG51bGxgc1xuICAgICAqL1xuICAgIGdldEZyZXRib2FyZChjaG9yZCwgZnJldENvdW50ID0gMTIpIHtcbiAgICAgICAgY29uc3QgYWxsb3dlZFBpdGNoZXMgPSBjaG9yZCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGNob3JkLm5vdGVzLm1hcChuID0+IG4ucGl0Y2hDbGFzcylcbiAgICAgICAgICAgIDogW107XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5TdHJpbmdzLm1hcChzID0+IGdldEZyZXRzKHMsIG5ldyBTZXQoYWxsb3dlZFBpdGNoZXMpLCBmcmV0Q291bnQpKTtcbiAgICB9XG59XG5leHBvcnRzLlR1bmluZyA9IFR1bmluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRHcm91cENvbG9yID0gdm9pZCAwO1xuY29uc3QgcGhpID0gKDEgKyBNYXRoLnNxcnQoNSkpIC8gMjtcbmNvbnN0IGdvbGRlbkFuZ2xlID0gMiAqIE1hdGguUEkgLyAocGhpICogcGhpKTtcbmNvbnN0IGxpZ2h0bmVzcyA9IDAuNTU7XG5jb25zdCBzYXR1cmF0aW9uID0gMC42NTtcbi8qKlxuICogR2VuZXJhdGVzIGFuIE9LbGFiIGNvbG9yIGZvciBhIGdpdmVuIGdyb3VwIGluZGV4XG4gKiBzbyB0aGF0IGFsbCBjb2xvcnMgaGF2ZSB0aGUgc2FtZSBsaWdodG5lc3MgYW5kIHNhdHVyYXRpb24sXG4gKiBhbGwgZ3JvdXBzIGhhdmUgZGlmZmVyZW50IGh1ZXMsXG4gKiBhbmQgaHVlcyBvZiBuZWlnaGJvciBncm91cHMgY29udHJhc3Qgd2VsbCB3aXRoIGVhY2ggb3RoZXJcbiAqL1xuZnVuY3Rpb24gZ2V0R3JvdXBDb2xvcihncm91cCkge1xuICAgIGNvbnN0IGh1ZSA9IGdvbGRlbkFuZ2xlICogZ3JvdXA7XG4gICAgY29uc3QgbCA9IGxpZ2h0bmVzcyAqIDEwMDtcbiAgICBjb25zdCBhID0gc2F0dXJhdGlvbiAqIE1hdGguY29zKGh1ZSkgKiAxMDA7XG4gICAgY29uc3QgYiA9IHNhdHVyYXRpb24gKiBNYXRoLnNpbihodWUpICogMTAwO1xuICAgIHJldHVybiBgb2tsYWIoJHtsLnRvRml4ZWQoMSl9JSAke2EudG9GaXhlZCgxKX0lICR7Yi50b0ZpeGVkKDEpfSUpYDtcbn1cbmV4cG9ydHMuZ2V0R3JvdXBDb2xvciA9IGdldEdyb3VwQ29sb3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGV4cG9ydHMuZ2V0QnlJZCA9IHZvaWQgMDtcbi8qKiBHZW5lcmljLXR5cGVkIHZlcnNpb24gb2YgYGdldEVsZW1lbnRCeUlkYCAqL1xuZnVuY3Rpb24gZ2V0QnlJZChpZCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHRocm93IEVycm9yKGBDYW5ub3QgZmluZCBlbGVtZW50IHdpdGggaWQgJyR7aWR9J2ApO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbmV4cG9ydHMuZ2V0QnlJZCA9IGdldEJ5SWQ7XG4vKiogQ3JlYXRlcyBhbiBIVE1MIGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gdGFnIG5hbWUsIHByb3BlcnRpZXMgYW5kIChvcHRpb25hbGx5KSBzdHlsZSAqL1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBwcm9wZXJ0aWVzLCBzdHlsZSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgIGlmIChwcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LCBwcm9wZXJ0aWVzKTtcbiAgICB9XG4gICAgaWYgKHN0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCBzdHlsZSk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xufVxuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRGcmV0Ym9hcmRFbGVtZW50ID0gdm9pZCAwO1xuY29uc3QgZG9tXzEgPSByZXF1aXJlKFwiLi9kb21cIik7XG5jb25zdCB0dW5pbmdfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvdHVuaW5nXCIpO1xuY29uc3QgdHlwb2dyYXBoeV8xID0gcmVxdWlyZShcIi4vdHlwb2dyYXBoeVwiKTtcbmNvbnN0IGNvbG9yc18xID0gcmVxdWlyZShcIi4vY29sb3JzXCIpO1xuZnVuY3Rpb24gZ2V0RnJldEhlYWRlckVsZW1lbnQoZnJldENvdW50KSB7XG4gICAgY29uc3QgZnJldEhlYWRlckVsZW1lbnQgPSAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3AnLCB7XG4gICAgICAgIGNsYXNzTmFtZTogJ2ZyZXRIZWFkZXInXG4gICAgfSk7XG4gICAgZm9yIChjb25zdCBmcmV0SW5kZXggb2YgQXJyYXkoZnJldENvdW50KS5rZXlzKCkpIHtcbiAgICAgICAgZnJldEhlYWRlckVsZW1lbnQuYXBwZW5kQ2hpbGQoKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdzcGFuJywge1xuICAgICAgICAgICAgaW5uZXJUZXh0OiBmcmV0SW5kZXgudG9TdHJpbmcoKVxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiBmcmV0SGVhZGVyRWxlbWVudDtcbn1cbmZ1bmN0aW9uIGdldEZyZXRFbGVtZW50KGZyZXROb3RlLCByb290Tm90ZSkge1xuICAgIGNvbnN0IGlubmVyVGV4dCA9IGZyZXROb3RlICE9PSBudWxsXG4gICAgICAgID8gKDAsIHR5cG9ncmFwaHlfMS50eXBlc2V0Tm90ZSkoZnJldE5vdGUudG9TdHJpbmcoKSlcbiAgICAgICAgOiAnwrcnO1xuICAgIGNvbnN0IGdyb3VwID0gcm9vdE5vdGUgIT09IHVuZGVmaW5lZCA/ICgwLCB0dW5pbmdfMS5nZXRHcm91cCkocm9vdE5vdGUsIGZyZXROb3RlKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBjb2xvciA9IGdyb3VwICE9PSB1bmRlZmluZWQgPyAoMCwgY29sb3JzXzEuZ2V0R3JvdXBDb2xvcikoZ3JvdXApIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3NwYW4nLCB7IGlubmVyVGV4dCB9LCB7IGNvbG9yIH0pO1xufVxuZnVuY3Rpb24gZ2V0RnJldHRlZFN0cmluZ0VsZW1lbnQoZnJldHRlZFN0cmluZywgcm9vdE5vdGUpIHtcbiAgICBjb25zdCBmcmV0dGVkU3RyaW5nRWxlbWVudCA9ICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcpO1xuICAgIGZvciAoY29uc3QgZnJldE5vdGUgb2YgZnJldHRlZFN0cmluZykge1xuICAgICAgICBmcmV0dGVkU3RyaW5nRWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0RWxlbWVudChmcmV0Tm90ZSwgcm9vdE5vdGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXR0ZWRTdHJpbmdFbGVtZW50O1xufVxuLyoqIEdldHMgdGhlIEhUTUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIGZyZXRib2FyZCBkaWFncmFtICovXG5mdW5jdGlvbiBnZXRGcmV0Ym9hcmRFbGVtZW50KGZyZXRib2FyZCwgcm9vdE5vdGUpIHtcbiAgICBjb25zdCBmcmV0Ym9hcmRFbGVtZW50ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdkaXYnLCB7IGlkOiAnZnJldGJvYXJkJyB9KTtcbiAgICAvLyBhZGQgZnJldCBudW1iZXJzXG4gICAgZnJldGJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0SGVhZGVyRWxlbWVudChmcmV0Ym9hcmRbMF0ubGVuZ3RoKSk7XG4gICAgLy8gYWRkIHN0cmluZ3MgYm90dG9tIHRvIHRvcFxuICAgIGZvciAoY29uc3QgZnJldHRlZFN0cmluZyBvZiBbLi4uZnJldGJvYXJkXS5yZXZlcnNlKCkpIHtcbiAgICAgICAgZnJldGJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0dGVkU3RyaW5nRWxlbWVudChmcmV0dGVkU3RyaW5nLCByb290Tm90ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldGJvYXJkRWxlbWVudDtcbn1cbmV4cG9ydHMuZ2V0RnJldGJvYXJkRWxlbWVudCA9IGdldEZyZXRib2FyZEVsZW1lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSGludHMgPSB2b2lkIDA7XG5jb25zdCBub3RlXzEgPSByZXF1aXJlKFwiLi4vdGhlb3J5L25vdGVcIik7XG5jb25zdCBjaG9yZF8xID0gcmVxdWlyZShcIi4uL3RoZW9yeS9jaG9yZFwiKTtcbmNvbnN0IGRvbV8xID0gcmVxdWlyZShcIi4vZG9tXCIpO1xuY29uc3QgdHlwb2dyYXBoeV8xID0gcmVxdWlyZShcIi4vdHlwb2dyYXBoeVwiKTtcbmNvbnN0IG5vdGVSZWdleCA9IG5ldyBSZWdFeHAoYF5cXFxccyooJHtub3RlXzEubm90ZU5hbWVQYXR0ZXJufSlgKTtcbmZ1bmN0aW9uIGdldEhpbnRzKGlucHV0VGV4dCkge1xuICAgIGNvbnN0IG1hdGNoID0gaW5wdXRUZXh0Lm1hdGNoKG5vdGVSZWdleCk7XG4gICAgaWYgKG1hdGNoICYmICEobWF0Y2hbMV0gaW4gbm90ZV8xLnVuc3VwcG9ydGVkKSkge1xuICAgICAgICByZXR1cm4gY2hvcmRfMS5zdWZmaXhlcy5tYXAoc3VmZml4ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNob3JkTmFtZSA9IG1hdGNoWzFdICsgc3VmZml4O1xuICAgICAgICAgICAgY29uc3QgY2hvcmQgPSBuZXcgY2hvcmRfMS5DaG9yZChjaG9yZE5hbWUpO1xuICAgICAgICAgICAgY29uc3Qgbm90ZXMgPSBjaG9yZC5ub3Rlcy5qb2luKCcgJyk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRleHQ6IGNob3JkTmFtZSxcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBg4p+oICR7bm90ZXN9IOKfqWBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5vdGVfMS5ub3RlTmFtZXMubWFwKG5hbWVzID0+ICh7XG4gICAgICAgICAgICB0ZXh0OiBuYW1lc1swXSxcbiAgICAgICAgICAgIHRvb2x0aXA6IG5hbWVzLmxlbmd0aCA+IDEgPyBgPSAke25hbWVzWzFdfWAgOiAnJ1xuICAgICAgICB9KSk7XG4gICAgfVxufVxuY2xhc3MgSGludHMge1xuICAgIGNvbnN0cnVjdG9yKGhpbnRzQ29udGFpbmVyLCBvbkNsaWNrKSB7XG4gICAgICAgIHRoaXMuaGludHNDb250YWluZXIgPSBoaW50c0NvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5vbkNsaWNrID0gb25DbGljaztcbiAgICB9XG4gICAgZ2V0SGludEVsZW1lbnQoaGludCkge1xuICAgICAgICBjb25zdCBidXR0b24gPSAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ2J1dHRvbicsIHtcbiAgICAgICAgICAgIGlubmVyVGV4dDogKDAsIHR5cG9ncmFwaHlfMS50eXBlc2V0Q2hvcmQpKGhpbnQudGV4dCksXG4gICAgICAgICAgICB0aXRsZTogKDAsIHR5cG9ncmFwaHlfMS50eXBlc2V0Q2hvcmQpKGhpbnQudG9vbHRpcCksXG4gICAgICAgIH0pO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IHRoaXMub25DbGljayhoaW50LnRleHQpOyB9KTtcbiAgICAgICAgcmV0dXJuIGJ1dHRvbjtcbiAgICB9XG4gICAgLyoqIFNob3dzIHRoZSBoaW50IGJ1dHRvbnMgKi9cbiAgICBzaG93KGlucHV0VGV4dCkge1xuICAgICAgICBjb25zdCBoaW50cyA9IGdldEhpbnRzKGlucHV0VGV4dCk7XG4gICAgICAgIGNvbnN0IGhpbnRFbGVtZW50cyA9IGhpbnRzLm1hcChoaW50ID0+IHRoaXMuZ2V0SGludEVsZW1lbnQoaGludCkpO1xuICAgICAgICB0aGlzLmhpbnRzQ29udGFpbmVyLnJlcGxhY2VDaGlsZHJlbiguLi5oaW50RWxlbWVudHMpO1xuICAgIH1cbn1cbmV4cG9ydHMuSGludHMgPSBIaW50cztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplID0gdm9pZCAwO1xuY29uc3QgY2hvcmRfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvY2hvcmRcIik7XG5jb25zdCB0dW5pbmdfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvdHVuaW5nXCIpO1xuY29uc3QgaW5zdHJ1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvaW5zdHJ1bWVudHNcIik7XG5jb25zdCBkb21fMSA9IHJlcXVpcmUoXCIuL2RvbVwiKTtcbmNvbnN0IHR5cG9ncmFwaHlfMSA9IHJlcXVpcmUoXCIuL3R5cG9ncmFwaHlcIik7XG5jb25zdCBmcmV0Ym9hcmRfMSA9IHJlcXVpcmUoXCIuL2ZyZXRib2FyZFwiKTtcbmNvbnN0IG1vZGVsXzEgPSByZXF1aXJlKFwiLi9tb2RlbFwiKTtcbmNvbnN0IHVybEhhc2hfMSA9IHJlcXVpcmUoXCIuL3VybEhhc2hcIik7XG5jb25zdCBoaW50c18xID0gcmVxdWlyZShcIi4vaGludHNcIik7XG4vLyBTdGF0aWMgcGFnZSBlbGVtZW50c1xuY29uc3QgaW5zdHJ1bWVudEVsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2luc3RydW1lbnQnKTtcbmNvbnN0IHR1bmluZ0VsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ3R1bmluZycpO1xuY29uc3QgZnJldENvdW50RWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnZnJldENvdW50Jyk7XG5jb25zdCBjaG9yZEVsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2Nob3JkJyk7XG5jb25zdCBjbGVhckNob3JkQnV0dG9uID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdjbGVhckNob3JkJyk7XG5jb25zdCBoaW50c0VsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2hpbnRzJyk7XG5jb25zdCBzdGF0dXNFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdzdGF0dXMnKTtcbmNvbnN0IG91dHB1dEVsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ291dHB1dCcpO1xuY29uc3QgaGludHMgPSBuZXcgaGludHNfMS5IaW50cyhoaW50c0VsZW1lbnQsIG9uSGludENsaWNrKTtcbi8qKiBQb3B1bGF0ZXMgdGhlIGluc3RydW1lbnQgZHJvcC1kb3duICovXG5mdW5jdGlvbiBwb3B1bGF0ZUluc3RydW1lbnRzKCkge1xuICAgIGZvciAoY29uc3QgaW5zdHJ1bWVudCBvZiBPYmplY3Qua2V5cyhpbnN0cnVtZW50c18xLmluc3RydW1lbnRzKSkge1xuICAgICAgICBpbnN0cnVtZW50RWxlbWVudC5hcHBlbmRDaGlsZCgoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ29wdGlvbicsIHtcbiAgICAgICAgICAgIHZhbHVlOiBpbnN0cnVtZW50LFxuICAgICAgICAgICAgaW5uZXJUZXh0OiBpbnN0cnVtZW50XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG4vKiogR2V0cyBIVE1MIGVsZW1lbnQgY29udGFpbmluZyB0aGUgbGlzdCBvZiBjaG9yZCdzIG5vdGVzICovXG5mdW5jdGlvbiBnZXRDaG9yZERlc2NyaXB0aW9uRWxlbWVudChjaG9yZCkge1xuICAgIGNvbnN0IG5vdGVzID0gKDAsIHR5cG9ncmFwaHlfMS50eXBlc2V0Tm90ZSkoY2hvcmQubm90ZXMuam9pbignICcpKTtcbiAgICByZXR1cm4gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJywge1xuICAgICAgICBpZDogJ2Nob3JkRGVzY3JpcHRpb24nLFxuICAgICAgICBpbm5lclRleHQ6IGDin6ggJHtub3Rlc30g4p+pYFxuICAgIH0pO1xufVxuLyoqIEdldHMgSFRNTCBlbGVtZW50IGNvbnRhaW5pbmcgYW4gZXJyb3IgbWVzc2FnZSAqL1xuZnVuY3Rpb24gZ2V0RXJyb3JFbGVtZW50KG1lc3NhZ2UpIHtcbiAgICByZXR1cm4gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJywge1xuICAgICAgICBpZDogJ2Vycm9yJyxcbiAgICAgICAgaW5uZXJUZXh0OiBtZXNzYWdlXG4gICAgfSk7XG59XG4vKiogQ3VycmVudCBzdGF0ZSBvZiB0aGUgcGFnZSAqL1xubGV0IG1vZGVsO1xuZnVuY3Rpb24gY2hhbmdlVXJsSGFzaCgpIHtcbiAgICByZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgb25IYXNoQ2hhbmdlKTtcbiAgICAoMCwgdXJsSGFzaF8xLnNldFVybEhhc2gpKG1vZGVsKTtcbiAgICAvLyB0aW1lb3V0IGZpeGVzIHJlY3Vyc2l2ZSBgb25IYXNoQ2hhbmdlYCBjYWxsc1xuICAgIC8vIFRPRE86IGZpbmQgdGhlIHJlYXNvbiBhbmQgYSBiZXR0ZXIgc29sdXRpb25cbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIG9uSGFzaENoYW5nZSk7IH0sIDEwMCk7XG59XG4vKipcbiAqIERpc3BsYXlzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBwYWdlLlxuICogVGhlIG1vZGVsIHNob3VsZCBiZSBjb25zaXN0ZW50ICh1c2UgYG1ha2VDb25zaXN0ZW50YCBiZWZvcmUgY2FsbGluZyB0aGlzKVxuICovXG5mdW5jdGlvbiBkaXNwbGF5UGFnZShtb2RlbCkge1xuICAgIGNvbnN0IHN0YXR1cyA9IFtdO1xuICAgIGNvbnN0IG91dHB1dCA9IFtdO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHR1bmluZyA9IG5ldyB0dW5pbmdfMS5UdW5pbmcoKDAsIHR5cG9ncmFwaHlfMS5yZW1vdmVUeXBvZ3JhcGh5KShtb2RlbC50dW5pbmdEZXNjcmlwdGlvbikpO1xuICAgICAgICAvLyB0dW5pbmcgaXMgdmFsaWRcbiAgICAgICAgY29uc3QgY2hvcmROYW1lID0gKDAsIHR5cG9ncmFwaHlfMS5yZW1vdmVUeXBvZ3JhcGh5KShtb2RlbC5jaG9yZE5hbWUpLnRyaW0oKTtcbiAgICAgICAgbGV0IGNob3JkID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoY2hvcmROYW1lICE9PSAnJykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjaG9yZCA9IG5ldyBjaG9yZF8xLkNob3JkKGNob3JkTmFtZSk7XG4gICAgICAgICAgICAgICAgLy8gY2hvcmQgaXMgdmFsaWRcbiAgICAgICAgICAgICAgICBzdGF0dXMucHVzaChnZXRDaG9yZERlc2NyaXB0aW9uRWxlbWVudChjaG9yZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgLy8gY2hvcmQgaXMgaW52YWxpZFxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGAke2Vycm9yfWA7XG4gICAgICAgICAgICAgICAgc3RhdHVzLnB1c2goZ2V0RXJyb3JFbGVtZW50KG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmcmV0Ym9hcmQgPSB0dW5pbmcuZ2V0RnJldGJvYXJkKGNob3JkLCBtb2RlbC5mcmV0Q291bnQpO1xuICAgICAgICBvdXRwdXQucHVzaCgoMCwgZnJldGJvYXJkXzEuZ2V0RnJldGJvYXJkRWxlbWVudCkoZnJldGJvYXJkLCBjaG9yZCA9PT0gbnVsbCB8fCBjaG9yZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2hvcmQubm90ZXNbMF0pKTtcbiAgICAgICAgaWYgKGNob3JkICE9PSB1bmRlZmluZWQgfHwgY2hvcmROYW1lID09PSAnJykge1xuICAgICAgICAgICAgLy8gY2hhbmdlIHVybCBoYXNoIG9ubHkgaWYgdGhlIHR1bmluZyBpcyB2YWxpZCBhbmQgdGhlIGNob3JkIGlzIHZhbGlkIG9yIGVtcHR5XG4gICAgICAgICAgICBjaGFuZ2VVcmxIYXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIHR1bmluZyBpcyBpbnZhbGlkXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGAke2Vycm9yfWA7XG4gICAgICAgIHN0YXR1cy5wdXNoKGdldEVycm9yRWxlbWVudChgSW52YWxpZCB0dW5pbmc6ICR7bWVzc2FnZX1gKSk7XG4gICAgfVxuICAgIC8vIHNldCB0aGUgaW5wdXQgZmllbGQgdmFsdWVzXG4gICAgaW5zdHJ1bWVudEVsZW1lbnQudmFsdWUgPSBtb2RlbC5pbnN0cnVtZW50O1xuICAgIHR1bmluZ0VsZW1lbnQudmFsdWUgPSBtb2RlbC50dW5pbmdEZXNjcmlwdGlvbjtcbiAgICBmcmV0Q291bnRFbGVtZW50LnZhbHVlID0gbW9kZWwuZnJldENvdW50LnRvU3RyaW5nKCk7XG4gICAgY2hvcmRFbGVtZW50LnZhbHVlID0gbW9kZWwuY2hvcmROYW1lO1xuICAgIGhpbnRzLnNob3coKDAsIHR5cG9ncmFwaHlfMS5yZW1vdmVUeXBvZ3JhcGh5KShtb2RlbC5jaG9yZE5hbWUpKTtcbiAgICAvLyBkaXNwbGF5IHRoZSBvdXRwdXRcbiAgICBzdGF0dXNFbGVtZW50LnJlcGxhY2VDaGlsZHJlbiguLi5zdGF0dXMpO1xuICAgIG91dHB1dEVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKC4uLm91dHB1dCk7XG59XG4vKiogQ2hhbmdlcyB0aGUgY3VycmVudCBwYWdlIHN0YXRlICovXG5mdW5jdGlvbiBjaGFuZ2VNb2RlbChjaGFuZ2UpIHtcbiAgICBtb2RlbCA9ICgwLCBtb2RlbF8xLm1ha2VDb25zaXN0ZW50KShPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgY2hhbmdlKSk7XG4gICAgZGlzcGxheVBhZ2UobW9kZWwpO1xufVxuLy8gSW5wdXQgYWN0aW9uczpcbmZ1bmN0aW9uIG9uSW5zdHJ1bWVudElucHV0KCkge1xuICAgIGNvbnN0IGluc3RydW1lbnQgPSBpbnN0cnVtZW50RWxlbWVudC52YWx1ZTtcbiAgICBjaGFuZ2VNb2RlbCh7IGluc3RydW1lbnQsIHR1bmluZ0Rlc2NyaXB0aW9uOiAnJyB9KTtcbn1cbmZ1bmN0aW9uIG9uVHVuaW5nSW5wdXQoKSB7XG4gICAgY29uc3QgdHVuaW5nRGVzY3JpcHRpb24gPSB0dW5pbmdFbGVtZW50LnZhbHVlO1xuICAgIGNoYW5nZU1vZGVsKHsgdHVuaW5nRGVzY3JpcHRpb24sIGluc3RydW1lbnQ6ICcnIH0pO1xufVxuZnVuY3Rpb24gb25GcmV0Q291bnRJbnB1dCgpIHtcbiAgICBjb25zdCBmcmV0Q291bnQgPSBwYXJzZUludChmcmV0Q291bnRFbGVtZW50LnZhbHVlKTtcbiAgICBjaGFuZ2VNb2RlbCh7IGZyZXRDb3VudCB9KTtcbn1cbmZ1bmN0aW9uIG9uQ2hvcmRJbnB1dCgpIHtcbiAgICBjb25zdCBjaG9yZE5hbWUgPSBjaG9yZEVsZW1lbnQudmFsdWU7XG4gICAgY2hhbmdlTW9kZWwoeyBjaG9yZE5hbWUgfSk7XG59XG5mdW5jdGlvbiBvbkhpbnRDbGljayhoaW50KSB7XG4gICAgY2hhbmdlTW9kZWwoeyBjaG9yZE5hbWU6IGhpbnQgfSk7XG59XG5mdW5jdGlvbiBvbkNob3JkQ2xlYXIoKSB7XG4gICAgY2hhbmdlTW9kZWwoeyBjaG9yZE5hbWU6ICcnIH0pO1xufVxuZnVuY3Rpb24gb25IYXNoQ2hhbmdlKCkge1xuICAgIGNoYW5nZU1vZGVsKCgwLCB1cmxIYXNoXzEuZ2V0VXJsSGFzaCkoKSk7XG59XG4vLyBFbnRyeSBwb2ludFxuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBwb3B1bGF0ZUluc3RydW1lbnRzKCk7XG4gICAgb25IYXNoQ2hhbmdlKCk7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIG9uSGFzaENoYW5nZSk7XG4gICAgaW5zdHJ1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkluc3RydW1lbnRJbnB1dCk7XG4gICAgdHVuaW5nRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uVHVuaW5nSW5wdXQpO1xuICAgIGZyZXRDb3VudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkZyZXRDb3VudElucHV0KTtcbiAgICBjaG9yZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkNob3JkSW5wdXQpO1xuICAgIGNsZWFyQ2hvcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNob3JkQ2xlYXIpO1xuICAgIGNob3JkRWxlbWVudC5mb2N1cygpO1xufVxuZXhwb3J0cy5pbml0aWFsaXplID0gaW5pdGlhbGl6ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tYWtlQ29uc2lzdGVudCA9IGV4cG9ydHMuZGVmYXVsdE1vZGVsID0gZXhwb3J0cy5tYXhGcmV0Q291bnQgPSB2b2lkIDA7XG5jb25zdCBpbnN0cnVtZW50c18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS9pbnN0cnVtZW50c1wiKTtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS90dW5pbmdcIik7XG5leHBvcnRzLm1heEZyZXRDb3VudCA9IDM2O1xuLyoqIFRoZSB2YWx1ZXMgdXNlZCB3aGVuIHRoZSBwYWdlIGlzIG9wZW5uZWQgd2l0aG91dCBhIFVSTCBoYXNoICovXG5leHBvcnRzLmRlZmF1bHRNb2RlbCA9IHtcbiAgICBpbnN0cnVtZW50OiAnVWt1bGVsZSAoaGlnaCBHKScsXG4gICAgdHVuaW5nRGVzY3JpcHRpb246ICdHNCBDNCBFNCBBNCcsXG4gICAgZnJldENvdW50OiAxMixcbiAgICBjaG9yZE5hbWU6ICcnLFxufTtcbi8qKlxuICogQ2hhbmdlcyB0aGUgbW9kZWwgc28gdGhhdCBpdHMgdmFsdWVzIGFyZSBjb25zaXN0ZW50IGFuZCByZXR1cm5zIHRoZSByZXN1bHQuXG4gKiBUaGUgdmFsdWVzIGRvbid0IGhhdmUgdG8gYmUgdmFsaWQgdGhvdWdoIChlLmcuIGludmFsaWQgdHVuaW5nIG9yIGNob3JkIGFyZSBPSyxcbiAqIGJ1dCBhIHZhbGlkIHR1bmluZyB3aXRoIGEgd3JvbmcgaW5zdHJ1bWVudCBpcyBub3QpLlxuICogU2hvdWxkIGJlIGNhbGxlZCBiZWZvcmUgZGlzcGxheWluZyB0aGUgcGFnZVxuICovXG5mdW5jdGlvbiBtYWtlQ29uc2lzdGVudChtb2RlbCkge1xuICAgIHZhciBfYTtcbiAgICAvLyBmcmV0Q291bnQgc2hvdWxkIGJlIGFuIGludGVnZXIgYmV0d2VlbiAwIGFuZCBtYXhGcmV0Q291bnRcbiAgICBjb25zdCBmcmV0Q291bnQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihleHBvcnRzLm1heEZyZXRDb3VudCwgTWF0aC5yb3VuZChtb2RlbC5mcmV0Q291bnQpKSk7XG4gICAgbW9kZWwgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBmcmV0Q291bnQgfSk7XG4gICAgY29uc3QgaW5zdHJ1bWVudFR1bmluZyA9IChfYSA9IGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudHNbbW9kZWwuaW5zdHJ1bWVudF0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kZXNjcmlwdGlvbjtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB0dW5pbmcgPSBuZXcgdHVuaW5nXzEuVHVuaW5nKG1vZGVsLnR1bmluZ0Rlc2NyaXB0aW9uKS5kZXNjcmlwdGlvbjtcbiAgICAgICAgaWYgKHR1bmluZyAhPT0gaW5zdHJ1bWVudFR1bmluZykge1xuICAgICAgICAgICAgLy8gaWYgdHVuaW5nIGlzIHZhbGlkIGFuZCBkaWZmZXJzIGZyb20gaW5zdHJ1bWVudCdzLCBjaGFuZ2UgdGhlIGluc3RydW1lbnRcbiAgICAgICAgICAgIGNvbnN0IGluc3RydW1lbnQgPSBpbnN0cnVtZW50c18xLmluc3RydW1lbnRCeVR1bmluZ1t0dW5pbmddIHx8ICcnO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGluc3RydW1lbnQgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKF9iKSB7IH1cbiAgICBpZiAoaW5zdHJ1bWVudFR1bmluZykge1xuICAgICAgICAvLyBJZiB0dW5pbmcgaXMgaW52YWxpZCBhbmQgaW5zdHJ1bWVudCBpcyB2YWxpZCwgY2hhbmdlIHRoZSB0dW5pbmdcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IHR1bmluZ0Rlc2NyaXB0aW9uOiBpbnN0cnVtZW50VHVuaW5nIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gSWYgaW5zdHJ1bWVudCBpcyBpbnZhbGlkLCBjaGFuZ2UgaXQgdG8gJydcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGluc3RydW1lbnQ6ICcnIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMubWFrZUNvbnNpc3RlbnQgPSBtYWtlQ29uc2lzdGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZW1vdmVUeXBvZ3JhcGh5ID0gZXhwb3J0cy50eXBlc2V0Q2hvcmQgPSBleHBvcnRzLnR5cGVzZXROb3RlID0gdm9pZCAwO1xuY29uc3QgYWNjaWRlbnRhbHMgPSB7XG4gICAgJyMnOiAn4pmvJyxcbiAgICAnYic6ICfima0nLFxufTtcbmNvbnN0IHN1YnNjcmlwdCA9IHtcbiAgICAnMCc6ICfigoAnLFxuICAgICcxJzogJ+KCgScsXG4gICAgJzInOiAn4oKCJyxcbiAgICAnMyc6ICfigoMnLFxuICAgICc0JzogJ+KChCcsXG4gICAgJzUnOiAn4oKFJyxcbiAgICAnNic6ICfigoYnLFxuICAgICc3JzogJ+KChycsXG4gICAgJzgnOiAn4oKIJyxcbiAgICAnOSc6ICfigoknLFxufTtcbmNvbnN0IGJhY2t3YXJkRGljdGlvbmFyeSA9IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhhY2NpZGVudGFscykuY29uY2F0KE9iamVjdC5lbnRyaWVzKHN1YnNjcmlwdCkpXG4gICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PiBbdmFsdWUsIGtleV0pKTtcbmNvbnN0IGJhY2t3YXJkUmVnZXggPSBuZXcgUmVnRXhwKGBbJHtPYmplY3QudmFsdWVzKGFjY2lkZW50YWxzKS5jb25jYXQoT2JqZWN0LnZhbHVlcyhzdWJzY3JpcHQpKX1dYCwgJ2cnKTtcbi8qKlxuICogUmVwbGFjZXMgZWFzeS10by10eXBlIEFTQ0lJIGNoYXJhY3RlcnNcbiAqIGZvciBhY2NpZGVudGFscyBhbmQgb2N0YXZlIG51bWJlcnNcbiAqIHdpdGggZ29vZC1sb29raW5nIFVuaWNvZGUgb25lc1xuICovXG5mdW5jdGlvbiB0eXBlc2V0Tm90ZSh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHRcbiAgICAgICAgLnJlcGxhY2UoL1sjYl0vZywgYyA9PiBhY2NpZGVudGFsc1tjXSlcbiAgICAgICAgLnJlcGxhY2UoL1xcZC9nLCBjID0+IHN1YnNjcmlwdFtjXSk7XG59XG5leHBvcnRzLnR5cGVzZXROb3RlID0gdHlwZXNldE5vdGU7XG4vKipcbiAqIFJlcGxhY2VzIGVhc3ktdG8tdHlwZSBBU0NJSSBjaGFyYWN0ZXJzXG4gKiBmb3IgYWNjaWRlbnRhbHMgYW5kIGNob3JkIHR5cGVzXG4gKiB3aXRoIGdvb2QtbG9va2luZyBVbmljb2RlIG9uZXNcbiAqL1xuZnVuY3Rpb24gdHlwZXNldENob3JkKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9bI2JdL2csIGMgPT4gYWNjaWRlbnRhbHNbY10pO1xufVxuZXhwb3J0cy50eXBlc2V0Q2hvcmQgPSB0eXBlc2V0Q2hvcmQ7XG4vKipcbiAqIFJlcGxhY2VzIHVuaWNvZGUgY2hhcmFjdGVycyB3aXRoIEFTQ0lJIG9uZXNcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlVHlwb2dyYXBoeSh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShiYWNrd2FyZFJlZ2V4LCBjID0+IGJhY2t3YXJkRGljdGlvbmFyeVtjXSk7XG59XG5leHBvcnRzLnJlbW92ZVR5cG9ncmFwaHkgPSByZW1vdmVUeXBvZ3JhcGh5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldFVybEhhc2ggPSBleHBvcnRzLnNldFVybEhhc2ggPSB2b2lkIDA7XG5jb25zdCBtb2RlbF8xID0gcmVxdWlyZShcIi4vbW9kZWxcIik7XG5jb25zdCB0eXBvZ3JhcGh5XzEgPSByZXF1aXJlKFwiLi90eXBvZ3JhcGh5XCIpO1xuLyoqXG4gKiBFbmNvZGVzIHRoZSBtb2RlbCBpbnRvIHRoZSBwYWdlJ3MgVVJMIGhhc2ggcGFydC5cbiAqIFRoaXMgYWxsb3dzIHRoZSB1c2VyIHRvIHNoYXJlIGxpbmtzIHRvIHNwZWNpZmljIHR1bmluZ3MgYW5kIGNob3Jkcy5cbiAqL1xuZnVuY3Rpb24gc2V0VXJsSGFzaChtb2RlbCkge1xuICAgIGNvbnN0IHR1bmluZ0Rlc2NyaXB0aW9uID0gKDAsIHR5cG9ncmFwaHlfMS5yZW1vdmVUeXBvZ3JhcGh5KShtb2RlbC50dW5pbmdEZXNjcmlwdGlvbikudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJy0nKTtcbiAgICBjb25zdCBjaG9yZE5hbWUgPSAoMCwgdHlwb2dyYXBoeV8xLnJlbW92ZVR5cG9ncmFwaHkpKG1vZGVsLmNob3JkTmFtZSkudHJpbSgpO1xuICAgIGNvbnN0IGhhc2ggPSBgJHttb2RlbC5pbnN0cnVtZW50fXwke3R1bmluZ0Rlc2NyaXB0aW9ufXwke21vZGVsLmZyZXRDb3VudH18JHtjaG9yZE5hbWV9YDtcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhhc2g7XG59XG5leHBvcnRzLnNldFVybEhhc2ggPSBzZXRVcmxIYXNoO1xuLyoqXG4gKiBSZWFkcyB0aGUgbW9kZWwgZnJvbSB0aGUgcGFnZSdzIFVSTCBoYXNoIHBhcnQuXG4gKiBOb3RlOiB0aGUgaW5zdHJ1bWVudCBpcyBub3Qgc2F2ZWQgaW4gdGhlIGhhc2ggKGZvciB0aGUgc2FrZSBvZiBicmV2aXR5KVxuICogc28gaXQgY2FuIGJlIGNob3NlbiBpbmNvcnJlY3RseSB3aGVuIG11bHRpcGxlIGluc3RydW1lbnRzIHNoYXJlIHRoZSBzYW1lIHR1bmluZ1xuICovXG5mdW5jdGlvbiBnZXRVcmxIYXNoKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBkZWNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgvIy8sICcnKSk7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gdGV4dC5zcGxpdCgnfCcpO1xuICAgICAgICBjb25zdCBpbnN0cnVtZW50ID0gcGFydHNbMF07XG4gICAgICAgIGNvbnN0IHR1bmluZ0Rlc2NyaXB0aW9uID0gcGFydHNbMV0ucmVwbGFjZSgvLS9nLCAnICcpO1xuICAgICAgICBjb25zdCBmcmV0Q291bnQgPSBwYXJzZUludChwYXJ0c1syXSk7XG4gICAgICAgIGNvbnN0IGNob3JkTmFtZSA9IHBhcnRzWzNdO1xuICAgICAgICByZXR1cm4geyBpbnN0cnVtZW50LCB0dW5pbmdEZXNjcmlwdGlvbiwgZnJldENvdW50LCBjaG9yZE5hbWUgfTtcbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7IH1cbiAgICByZXR1cm4gbW9kZWxfMS5kZWZhdWx0TW9kZWw7XG59XG5leHBvcnRzLmdldFVybEhhc2ggPSBnZXRVcmxIYXNoO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdWlfMSA9IHJlcXVpcmUoXCIuL3VpXCIpO1xuKDAsIHVpXzEuaW5pdGlhbGl6ZSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==