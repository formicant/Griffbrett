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
exports.knownNoteNames = Object.keys(noteIndexByName);
exports.knownNoteNames.sort();
exports.noteNamePattern = '[A-G][#b]?';
const noteRegex = new RegExp(`^(${exports.noteNamePattern})(\\d)?$`);
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
    toString() {
        const noteName = noteNames[this.pitchClass][0];
        return this.octave !== undefined
            ? `${noteName}${this.octave}`
            : noteName;
    }
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
function getFrets(openString, allowedPitches, fretCount) {
    const frets = [];
    for (let fretIndex = 0; fretIndex <= fretCount; fretIndex++) {
        const note = openString.addInterval(fretIndex);
        frets.push(allowedPitches.has(note.pitchClass) ? note : null);
    }
    return frets;
}
function getGroup(rootNote, note) {
    if (note !== null && note.octave !== undefined) {
        return Math.floor((note.octave * 12 + note.pitchClass - rootNote.pitchClass) / 12);
    }
    else {
        return undefined;
    }
}
exports.getGroup = getGroup;
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
    toString() {
        return `Tuning("${this.description}")`;
    }
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
function getById(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw Error(`Cannot find element with id '${id}'`);
    }
    return element;
}
exports.getById = getById;
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
// Html elements
const instrumentElement = (0, dom_1.getById)('instrument');
const tuningElement = (0, dom_1.getById)('tuning');
const fretCountElement = (0, dom_1.getById)('fretCount');
const chordElement = (0, dom_1.getById)('chord');
const chordsDataList = (0, dom_1.getById)('chords');
const statusElement = (0, dom_1.getById)('status');
const outputElement = (0, dom_1.getById)('output');
// Chords datalist options
const chordOptions = {};
for (const chord of chord_1.knownChordNames) {
    chordOptions[chord] = (0, dom_1.createElement)('option', { value: chord });
}
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
function populateInstruments() {
    for (const instrument of Object.keys(instruments_1.instruments)) {
        instrumentElement.appendChild((0, dom_1.createElement)('option', {
            value: instrument,
            innerText: instrument
        }));
    }
}
function getChordDescriptionElement(chord) {
    const notes = (0, typography_1.applyTypography)(chord.notes.join(' '));
    return (0, dom_1.createElement)('p', {
        id: 'chordDescription',
        innerText: `⟨ ${notes} ⟩`
    });
}
function getErrorElement(message) {
    return (0, dom_1.createElement)('p', {
        id: 'error',
        innerText: message
    });
}
let model;
function displayPage(model) {
    // assuming that the model is consistent
    removeEventListener('hashchange', onHashChange);
    const status = [];
    const output = [];
    try {
        const tuning = new tuning_1.Tuning(model.tuningDescription);
        const chordName = model.chordName.trim();
        let chord = undefined;
        if (chordName !== '') {
            try {
                chord = new chord_1.Chord(chordName);
                status.push(getChordDescriptionElement(chord));
            }
            catch (error) {
                const message = error instanceof Error ? error.message : `${error}`;
                status.push(getErrorElement(message));
            }
        }
        const fretboard = tuning.getFretboard(chord, model.fretCount);
        output.push((0, fretboard_1.getFretboardElement)(fretboard, chord === null || chord === void 0 ? void 0 : chord.notes[0]));
        if (chord !== undefined || chordName === '') {
            (0, urlHash_1.setUrlHash)(model);
        }
    }
    catch (error) {
        const message = error instanceof Error ? error.message : `${error}`;
        status.push(getErrorElement(`Invalid tuning: ${message}`));
    }
    instrumentElement.value = model.instrument;
    tuningElement.value = model.tuningDescription;
    fretCountElement.value = model.fretCount.toString();
    chordElement.value = model.chordName;
    statusElement.replaceChildren(...status);
    outputElement.replaceChildren(...output);
    // Timeout fixes recursive onHashChange calls
    // TODO: find a better solution
    setTimeout(() => { addEventListener('hashchange', onHashChange); }, 100);
}
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
exports.defaultModel = {
    instrument: 'Ukulele (high G)',
    tuningDescription: 'G4 C4 E4 A4',
    fretCount: 12,
    chordName: '',
};
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
exports.setUrlHash = exports.getUrlHash = void 0;
const model_1 = __webpack_require__(/*! ./model */ "./src/ui/model.ts");
const formatVersion = 0;
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
function setUrlHash(model) {
    const tuningDescription = model.tuningDescription.trim().replace(/\s+/g, '-');
    const chordName = model.chordName.trim();
    const hash = `${formatVersion}|${tuningDescription}|${model.fretCount}|${chordName}`;
    window.location.hash = hash;
}
exports.setUrlHash = setUrlHash;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QiIsInNvdXJjZXMiOlsid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L2Nob3JkLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L2luc3RydW1lbnRzLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L25vdGUudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy90aGVvcnkvdHVuaW5nLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvY29sb3JzLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvZG9tLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvZnJldGJvYXJkLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9tb2RlbC50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL3R5cG9ncmFwaHkudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS91cmxIYXNoLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2hvcmQgPSBleHBvcnRzLmtub3duQ2hvcmROYW1lcyA9IHZvaWQgMDtcbmNvbnN0IG5vdGVfMSA9IHJlcXVpcmUoXCIuL25vdGVcIik7XG4vLyBJbnRlcnZhbHMgaW4gc2VtaXRvbmVzOlxuY29uc3QgW1AxLCBtMiwgTTIsIG0zLCBNMywgUDQsIEE0LCBQNSwgbTYsIE02LCBtNywgTTddID0gQXJyYXkoMTIpLmtleXMoKTtcbmNvbnN0IHN1ZmZpeE1lYW5pbmdzID0ge1xuICAgICdtKG5vNSknOiBbUDEsIG0zXSxcbiAgICAnKG5vNSknOiBbUDEsIE0zXSxcbiAgICAnNSc6IFtQMSwgUDVdLFxuICAgICdkaW0nOiBbUDEsIG0zLCBBNF0sXG4gICAgJ3N1czInOiBbUDEsIE0yLCBQNV0sXG4gICAgJ20nOiBbUDEsIG0zLCBQNV0sXG4gICAgJyc6IFtQMSwgTTMsIFA1XSxcbiAgICAnc3VzNCc6IFtQMSwgUDQsIFA1XSxcbiAgICAnYXVnJzogW1AxLCBNMywgbTZdLFxuICAgICdtNic6IFtQMSwgbTMsIFA1LCBNNl0sXG4gICAgJzYnOiBbUDEsIE0zLCBQNSwgTTZdLFxuICAgICdtNyc6IFtQMSwgbTMsIFA1LCBtN10sXG4gICAgJ21NNyc6IFtQMSwgbTMsIFA1LCBNN10sXG4gICAgJzcnOiBbUDEsIE0zLCBQNSwgbTddLFxuICAgICdNNyc6IFtQMSwgTTMsIFA1LCBNN10sXG59O1xuY29uc3Qga25vd25TdWZmaXhlcyA9IE9iamVjdC5rZXlzKHN1ZmZpeE1lYW5pbmdzKTtcbmtub3duU3VmZml4ZXMuc29ydCgpO1xuZXhwb3J0cy5rbm93bkNob3JkTmFtZXMgPSBbXTtcbmZvciAoY29uc3Qgbm90ZSBvZiBub3RlXzEua25vd25Ob3RlTmFtZXMpIHtcbiAgICBmb3IgKGNvbnN0IHN1ZmZpeCBvZiBrbm93blN1ZmZpeGVzKSB7XG4gICAgICAgIGV4cG9ydHMua25vd25DaG9yZE5hbWVzLnB1c2gobm90ZSArIHN1ZmZpeCk7XG4gICAgfVxufVxuY29uc3QgY2hvcmRSZWdleCA9IG5ldyBSZWdFeHAoYF4oJHtub3RlXzEubm90ZU5hbWVQYXR0ZXJufSkoLiopJGApO1xuY2xhc3MgQ2hvcmQge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBuYW1lLm1hdGNoKGNob3JkUmVnZXgpO1xuICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYENhbid0IHBhcnNlIGNob3JkICR7bmFtZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbXywgcm9vdE5hbWUsIHN1ZmZpeF0gPSBtYXRjaDtcbiAgICAgICAgY29uc3Qgcm9vdCA9IG5ldyBub3RlXzEuTm90ZShyb290TmFtZSk7XG4gICAgICAgIGlmICghKHN1ZmZpeCBpbiBzdWZmaXhNZWFuaW5ncykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgQ2FuJ3QgcGFyc2UgY2hvcmQgc3VmZml4ICR7c3VmZml4fWApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm90ZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBpbnRlcnZhbCBvZiBzdWZmaXhNZWFuaW5nc1tzdWZmaXhdKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGVzLnB1c2gocm9vdC5hZGRJbnRlcnZhbChpbnRlcnZhbCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSA9IDwke3RoaXMubm90ZXMuam9pbignICcpfT5gO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2hvcmQgPSBDaG9yZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmcgPSBleHBvcnRzLmluc3RydW1lbnRzID0gdm9pZCAwO1xuY29uc3QgdHVuaW5nXzEgPSByZXF1aXJlKFwiLi90dW5pbmdcIik7XG5leHBvcnRzLmluc3RydW1lbnRzID0ge1xuICAgICdCYWxhbGFpa2EgKGFjYWRlbWljKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0U0IEU0IEE0JyksXG4gICAgJ0JhbGFsYWlrYSAoZm9sayknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDNCBFNCBHNCcpLFxuICAgICdCYW5qbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEQzIEczIEIzIEQ0JyksXG4gICAgJ0Jhc3MnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFMSBBMSBEMiBHMicpLFxuICAgICdCcmFndWluaGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBCNCBENScpLFxuICAgICdDaGFyYW5nbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEM1IEUgQTQgRTUnKSxcbiAgICAnQ2F2YXF1aW5obyAoUG9ydHVnYWwgR0dCRCknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBHNCBCNCBENScpLFxuICAgICdDYXZhcXVpbmhvIChQb3J0dWdhbCBEQUJFKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q1IEE0IEI0IEU1JyksXG4gICAgJ0NhdmFxdWluaG8gKEJyYXppbCBER0JEKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEI0IEQ1JyksXG4gICAgJ0NhdmFxdWluaG8gKEJyYXppbCBER0JFKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEI0IEU1JyksXG4gICAgJ0RhbGEgZmFlbmR5cic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0U0IEE0IEU1JyksXG4gICAgJ0RlY2hpZyBwb25kYXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDNCBENCBHNCcpLFxuICAgICdHdWl0YWxlbGUnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMiBEMyBHMyBDNCBFNCBBNCcpLFxuICAgICdHdWl0YXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFMiBBMiBEMyBHMyBCMyBFNCcpLFxuICAgICdHdWl0YXJyw7NuJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTEgRDIgRzIgQzMgRTMgQTInKSxcbiAgICAnSmFyYW5hIGphcm9jaGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBDNCBFIEEzIEczJyksXG4gICAgJ0phcmFuYSBodWFzdGVjYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEIzIEQ0IEYjNCBBNCcpLFxuICAgICdNYW5kb2xpbic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEQ0IEE0IEU1JyksXG4gICAgJ1JhamFvJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQzQgRTQgQTQnKSxcbiAgICAnUmVxdWludG8nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMiBEMyBHMyBDNCBFNCBBNCcpLFxuICAgICdTZW1pc3RydW5rYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0QyIEcyIEIyIEQzIEczIEIzIEQ0JyksXG4gICAgJ1Rlbm9yIGd1aXRhcic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0MzIEczIEQ0IEE0JyksXG4gICAgJ1RpbXBsZSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEM1IEU0IEE0IEQ1JyksXG4gICAgJ1VrdWxlbGUgKGhpZ2ggRyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBDNCBFNCBBNCcpLFxuICAgICdVa3VsZWxlIChsb3cgRyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBDNCBFNCBBNCcpLFxuICAgICdVa3VsZWxlIChiYXJpdG9uZSknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdEMyBHMyBCMyBFNCcpLFxuICAgICdWaWh1ZWxhJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTMgRDQgRzQgQjMgRTQnKSxcbiAgICAnVmlvbGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDMyBHMyBENCBBNCcpLFxuICAgICdWaW9saW4nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBENCBBNCBFNScpLFxufTtcbmV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nID0ge307XG5mb3IgKGNvbnN0IFtuYW1lLCB0dW5pbmddIG9mIE9iamVjdC5lbnRyaWVzKGV4cG9ydHMuaW5zdHJ1bWVudHMpKSB7XG4gICAgaWYgKCEodHVuaW5nLmRlc2NyaXB0aW9uIGluIGV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nKSkge1xuICAgICAgICBleHBvcnRzLmluc3RydW1lbnRCeVR1bmluZ1t0dW5pbmcuZGVzY3JpcHRpb25dID0gbmFtZTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTm90ZSA9IGV4cG9ydHMubm90ZU5hbWVQYXR0ZXJuID0gZXhwb3J0cy5rbm93bk5vdGVOYW1lcyA9IHZvaWQgMDtcbmNvbnN0IG5vdGVOYW1lcyA9IFtcbiAgICBbJ0MnXSwgWydDIycsICdEYiddLFxuICAgIFsnRCddLCBbJ0QjJywgJ0ViJ10sXG4gICAgWydFJ10sXG4gICAgWydGJ10sIFsnRiMnLCAnR2InXSxcbiAgICBbJ0cnXSwgWydHIycsICdBYiddLFxuICAgIFsnQSddLCBbJ0EjJywgJ0JiJ10sXG4gICAgWydCJ10sXG5dO1xuY29uc3QgdW5zdXBwb3J0ZWQgPSB7XG4gICAgJ0NiJzogJ0InLFxuICAgICdCIyc6ICdDJyxcbiAgICAnRmInOiAnRScsXG4gICAgJ0UjJzogJ0YnLFxufTtcbmNvbnN0IG5vdGVJbmRleEJ5TmFtZSA9IHt9O1xuZm9yIChjb25zdCBbaW5kZXgsIG5hbWVzXSBvZiBub3RlTmFtZXMuZW50cmllcygpKSB7XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIG5hbWVzKSB7XG4gICAgICAgIG5vdGVJbmRleEJ5TmFtZVtuYW1lXSA9IGluZGV4O1xuICAgIH1cbn1cbmV4cG9ydHMua25vd25Ob3RlTmFtZXMgPSBPYmplY3Qua2V5cyhub3RlSW5kZXhCeU5hbWUpO1xuZXhwb3J0cy5rbm93bk5vdGVOYW1lcy5zb3J0KCk7XG5leHBvcnRzLm5vdGVOYW1lUGF0dGVybiA9ICdbQS1HXVsjYl0/JztcbmNvbnN0IG5vdGVSZWdleCA9IG5ldyBSZWdFeHAoYF4oJHtleHBvcnRzLm5vdGVOYW1lUGF0dGVybn0pKFxcXFxkKT8kYCk7XG5jbGFzcyBOb3RlIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gbmFtZS5tYXRjaChub3RlUmVnZXgpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGNvbnN0IFtfLCBub3RlTmFtZSwgb2N0YXZlTmFtZV0gPSBtYXRjaDtcbiAgICAgICAgICAgIGlmIChub3RlTmFtZSBpbiB1bnN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1Z2dlc3Rpb24gPSB1bnN1cHBvcnRlZFtub3RlTmFtZV07XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVc2UgJHtzdWdnZXN0aW9ufSBpbnN0ZWFkIG9mICR7bm90ZU5hbWV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBpdGNoQ2xhc3MgPSBub3RlSW5kZXhCeU5hbWVbbm90ZU5hbWVdO1xuICAgICAgICAgICAgdGhpcy5vY3RhdmUgPSBvY3RhdmVOYW1lICE9PSB1bmRlZmluZWQgPyBwYXJzZUludChvY3RhdmVOYW1lKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgQ2FuJ3QgcGFyc2Ugbm90ZSAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGZyb21QaXRjaENsYXNzQW5kT2N0YXZlKHBpdGNoQ2xhc3MsIG9jdGF2ZSkge1xuICAgICAgICBsZXQgbm90ZSA9IE9iamVjdC5jcmVhdGUoTm90ZS5wcm90b3R5cGUpO1xuICAgICAgICBub3RlLnBpdGNoQ2xhc3MgPSBwaXRjaENsYXNzO1xuICAgICAgICBub3RlLm9jdGF2ZSA9IG9jdGF2ZTtcbiAgICAgICAgcmV0dXJuIG5vdGU7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBjb25zdCBub3RlTmFtZSA9IG5vdGVOYW1lc1t0aGlzLnBpdGNoQ2xhc3NdWzBdO1xuICAgICAgICByZXR1cm4gdGhpcy5vY3RhdmUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBgJHtub3RlTmFtZX0ke3RoaXMub2N0YXZlfWBcbiAgICAgICAgICAgIDogbm90ZU5hbWU7XG4gICAgfVxuICAgIGFkZEludGVydmFsKGludGVydmFsKSB7XG4gICAgICAgIGNvbnN0IHBpdGNoID0gdGhpcy5waXRjaENsYXNzICsgaW50ZXJ2YWw7XG4gICAgICAgIGNvbnN0IG9jdGF2ZSA9IHRoaXMub2N0YXZlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gdGhpcy5vY3RhdmUgKyBNYXRoLmZsb29yKHBpdGNoIC8gMTIpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIE5vdGUuZnJvbVBpdGNoQ2xhc3NBbmRPY3RhdmUocGl0Y2ggJSAxMiwgb2N0YXZlKTsgLy8gaW5jb3JyZWN0IGZvciBuZWdhdGl2ZSBpbnRlcnZhbHNcbiAgICB9XG59XG5leHBvcnRzLk5vdGUgPSBOb3RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlR1bmluZyA9IGV4cG9ydHMuZ2V0R3JvdXAgPSB2b2lkIDA7XG5jb25zdCBub3RlXzEgPSByZXF1aXJlKFwiLi9ub3RlXCIpO1xuY29uc3Qgc3BsaXRSZWdleCA9IC9cXHMrfCg/PVtBLVpdKS87IC8vIHNwbGl0IGJ5IHdoaXRlc3BhY2Ugb3IgYmVmb3JlIHVwcGVyY2FzZSBsZXR0ZXJzXG5mdW5jdGlvbiBnZXRGcmV0cyhvcGVuU3RyaW5nLCBhbGxvd2VkUGl0Y2hlcywgZnJldENvdW50KSB7XG4gICAgY29uc3QgZnJldHMgPSBbXTtcbiAgICBmb3IgKGxldCBmcmV0SW5kZXggPSAwOyBmcmV0SW5kZXggPD0gZnJldENvdW50OyBmcmV0SW5kZXgrKykge1xuICAgICAgICBjb25zdCBub3RlID0gb3BlblN0cmluZy5hZGRJbnRlcnZhbChmcmV0SW5kZXgpO1xuICAgICAgICBmcmV0cy5wdXNoKGFsbG93ZWRQaXRjaGVzLmhhcyhub3RlLnBpdGNoQ2xhc3MpID8gbm90ZSA6IG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldHM7XG59XG5mdW5jdGlvbiBnZXRHcm91cChyb290Tm90ZSwgbm90ZSkge1xuICAgIGlmIChub3RlICE9PSBudWxsICYmIG5vdGUub2N0YXZlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKG5vdGUub2N0YXZlICogMTIgKyBub3RlLnBpdGNoQ2xhc3MgLSByb290Tm90ZS5waXRjaENsYXNzKSAvIDEyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRHcm91cCA9IGdldEdyb3VwO1xuY2xhc3MgVHVuaW5nIHtcbiAgICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLm9wZW5TdHJpbmdzID0gZGVzY3JpcHRpb25cbiAgICAgICAgICAgIC5zcGxpdChzcGxpdFJlZ2V4KVxuICAgICAgICAgICAgLmZpbHRlcihuID0+IG4gIT09ICcnKVxuICAgICAgICAgICAgLm1hcChuID0+IG5ldyBub3RlXzEuTm90ZShuKSk7XG4gICAgICAgIGlmICh0aGlzLm9wZW5TdHJpbmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdCBsZWFzdCBvbmUgb3BlbiBzdHJpbmcgcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5vcGVuU3RyaW5ncy5qb2luKCcgJyk7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYFR1bmluZyhcIiR7dGhpcy5kZXNjcmlwdGlvbn1cIilgO1xuICAgIH1cbiAgICBnZXRGcmV0Ym9hcmQoY2hvcmQsIGZyZXRDb3VudCA9IDEyKSB7XG4gICAgICAgIGNvbnN0IGFsbG93ZWRQaXRjaGVzID0gY2hvcmQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBjaG9yZC5ub3Rlcy5tYXAobiA9PiBuLnBpdGNoQ2xhc3MpXG4gICAgICAgICAgICA6IFtdO1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuU3RyaW5ncy5tYXAocyA9PiBnZXRGcmV0cyhzLCBuZXcgU2V0KGFsbG93ZWRQaXRjaGVzKSwgZnJldENvdW50KSk7XG4gICAgfVxufVxuZXhwb3J0cy5UdW5pbmcgPSBUdW5pbmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0R3JvdXBDb2xvciA9IHZvaWQgMDtcbmNvbnN0IHBoaSA9ICgxICsgTWF0aC5zcXJ0KDUpKSAvIDI7XG5jb25zdCBnb2xkZW5BbmdsZSA9IDIgKiBNYXRoLlBJIC8gKHBoaSAqIHBoaSk7XG5jb25zdCBsaWdodG5lc3MgPSAwLjU1O1xuY29uc3Qgc2F0dXJhdGlvbiA9IDAuNjU7XG5mdW5jdGlvbiBnZXRHcm91cENvbG9yKGdyb3VwKSB7XG4gICAgY29uc3QgaHVlID0gZ29sZGVuQW5nbGUgKiBncm91cDtcbiAgICBjb25zdCBsID0gbGlnaHRuZXNzICogMTAwO1xuICAgIGNvbnN0IGEgPSBzYXR1cmF0aW9uICogTWF0aC5jb3MoaHVlKSAqIDEwMDtcbiAgICBjb25zdCBiID0gc2F0dXJhdGlvbiAqIE1hdGguc2luKGh1ZSkgKiAxMDA7XG4gICAgcmV0dXJuIGBva2xhYigke2wudG9GaXhlZCgxKX0lICR7YS50b0ZpeGVkKDEpfSUgJHtiLnRvRml4ZWQoMSl9JSlgO1xufVxuZXhwb3J0cy5nZXRHcm91cENvbG9yID0gZ2V0R3JvdXBDb2xvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gZXhwb3J0cy5nZXRCeUlkID0gdm9pZCAwO1xuZnVuY3Rpb24gZ2V0QnlJZChpZCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHRocm93IEVycm9yKGBDYW5ub3QgZmluZCBlbGVtZW50IHdpdGggaWQgJyR7aWR9J2ApO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbmV4cG9ydHMuZ2V0QnlJZCA9IGdldEJ5SWQ7XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZ05hbWUsIHByb3BlcnRpZXMsIHN0eWxlKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgaWYgKHByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQsIHByb3BlcnRpZXMpO1xuICAgIH1cbiAgICBpZiAoc3R5bGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIHN0eWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5leHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldEZyZXRib2FyZEVsZW1lbnQgPSB2b2lkIDA7XG5jb25zdCBkb21fMSA9IHJlcXVpcmUoXCIuL2RvbVwiKTtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS90dW5pbmdcIik7XG5jb25zdCB0eXBvZ3JhcGh5XzEgPSByZXF1aXJlKFwiLi90eXBvZ3JhcGh5XCIpO1xuY29uc3QgY29sb3JzXzEgPSByZXF1aXJlKFwiLi9jb2xvcnNcIik7XG5mdW5jdGlvbiBnZXRGcmV0SGVhZGVyRWxlbWVudChmcmV0Q291bnQpIHtcbiAgICBjb25zdCBmcmV0SGVhZGVyRWxlbWVudCA9ICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcsIHtcbiAgICAgICAgY2xhc3NOYW1lOiAnZnJldEhlYWRlcidcbiAgICB9KTtcbiAgICBmb3IgKGNvbnN0IGZyZXRJbmRleCBvZiBBcnJheShmcmV0Q291bnQpLmtleXMoKSkge1xuICAgICAgICBmcmV0SGVhZGVyRWxlbWVudC5hcHBlbmRDaGlsZCgoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3NwYW4nLCB7XG4gICAgICAgICAgICBpbm5lclRleHQ6IGZyZXRJbmRleC50b1N0cmluZygpXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXRIZWFkZXJFbGVtZW50O1xufVxuZnVuY3Rpb24gZ2V0RnJldEVsZW1lbnQoZnJldE5vdGUsIHJvb3ROb3RlKSB7XG4gICAgY29uc3QgaW5uZXJUZXh0ID0gZnJldE5vdGUgIT09IG51bGxcbiAgICAgICAgPyAoMCwgdHlwb2dyYXBoeV8xLmFwcGx5VHlwb2dyYXBoeSkoZnJldE5vdGUudG9TdHJpbmcoKSlcbiAgICAgICAgOiAnwrcnO1xuICAgIGNvbnN0IGdyb3VwID0gcm9vdE5vdGUgIT09IHVuZGVmaW5lZCA/ICgwLCB0dW5pbmdfMS5nZXRHcm91cCkocm9vdE5vdGUsIGZyZXROb3RlKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBjb2xvciA9IGdyb3VwICE9PSB1bmRlZmluZWQgPyAoMCwgY29sb3JzXzEuZ2V0R3JvdXBDb2xvcikoZ3JvdXApIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3NwYW4nLCB7IGlubmVyVGV4dCB9LCB7IGNvbG9yIH0pO1xufVxuZnVuY3Rpb24gZ2V0RnJldHRlZFN0cmluZ0VsZW1lbnQoZnJldHRlZFN0cmluZywgcm9vdE5vdGUpIHtcbiAgICBjb25zdCBmcmV0dGVkU3RyaW5nRWxlbWVudCA9ICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcpO1xuICAgIGZvciAoY29uc3QgZnJldE5vdGUgb2YgZnJldHRlZFN0cmluZykge1xuICAgICAgICBmcmV0dGVkU3RyaW5nRWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0RWxlbWVudChmcmV0Tm90ZSwgcm9vdE5vdGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXR0ZWRTdHJpbmdFbGVtZW50O1xufVxuZnVuY3Rpb24gZ2V0RnJldGJvYXJkRWxlbWVudChmcmV0Ym9hcmQsIHJvb3ROb3RlKSB7XG4gICAgY29uc3QgZnJldGJvYXJkRWxlbWVudCA9ICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnZGl2JywgeyBpZDogJ2ZyZXRib2FyZCcgfSk7XG4gICAgZnJldGJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0SGVhZGVyRWxlbWVudChmcmV0Ym9hcmRbMF0ubGVuZ3RoKSk7XG4gICAgZm9yIChjb25zdCBmcmV0dGVkU3RyaW5nIG9mIFsuLi5mcmV0Ym9hcmRdLnJldmVyc2UoKSkge1xuICAgICAgICBmcmV0Ym9hcmRFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXR0ZWRTdHJpbmdFbGVtZW50KGZyZXR0ZWRTdHJpbmcsIHJvb3ROb3RlKSk7XG4gICAgfVxuICAgIHJldHVybiBmcmV0Ym9hcmRFbGVtZW50O1xufVxuZXhwb3J0cy5nZXRGcmV0Ym9hcmRFbGVtZW50ID0gZ2V0RnJldGJvYXJkRWxlbWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplID0gdm9pZCAwO1xuY29uc3QgY2hvcmRfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvY2hvcmRcIik7XG5jb25zdCB0dW5pbmdfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvdHVuaW5nXCIpO1xuY29uc3QgaW5zdHJ1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvaW5zdHJ1bWVudHNcIik7XG5jb25zdCBkb21fMSA9IHJlcXVpcmUoXCIuL2RvbVwiKTtcbmNvbnN0IHR5cG9ncmFwaHlfMSA9IHJlcXVpcmUoXCIuL3R5cG9ncmFwaHlcIik7XG5jb25zdCBmcmV0Ym9hcmRfMSA9IHJlcXVpcmUoXCIuL2ZyZXRib2FyZFwiKTtcbmNvbnN0IG1vZGVsXzEgPSByZXF1aXJlKFwiLi9tb2RlbFwiKTtcbmNvbnN0IHVybEhhc2hfMSA9IHJlcXVpcmUoXCIuL3VybEhhc2hcIik7XG4vLyBIdG1sIGVsZW1lbnRzXG5jb25zdCBpbnN0cnVtZW50RWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnaW5zdHJ1bWVudCcpO1xuY29uc3QgdHVuaW5nRWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgndHVuaW5nJyk7XG5jb25zdCBmcmV0Q291bnRFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdmcmV0Q291bnQnKTtcbmNvbnN0IGNob3JkRWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnY2hvcmQnKTtcbmNvbnN0IGNob3Jkc0RhdGFMaXN0ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdjaG9yZHMnKTtcbmNvbnN0IHN0YXR1c0VsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ3N0YXR1cycpO1xuY29uc3Qgb3V0cHV0RWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnb3V0cHV0Jyk7XG4vLyBDaG9yZHMgZGF0YWxpc3Qgb3B0aW9uc1xuY29uc3QgY2hvcmRPcHRpb25zID0ge307XG5mb3IgKGNvbnN0IGNob3JkIG9mIGNob3JkXzEua25vd25DaG9yZE5hbWVzKSB7XG4gICAgY2hvcmRPcHRpb25zW2Nob3JkXSA9ICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnb3B0aW9uJywgeyB2YWx1ZTogY2hvcmQgfSk7XG59XG5mdW5jdGlvbiBwb3B1bGF0ZUNob3Jkc0RhdGFsaXN0KHRleHQgPSAnJykge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRUZXh0ID0gdGV4dC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBleGFjdE1hdGNoZXMgPSBjaG9yZF8xLmtub3duQ2hvcmROYW1lcy5maWx0ZXIoYyA9PiBjLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRUZXh0KTtcbiAgICBjb25zdCBiZWdpbm5pbmdNYXRjaGVzID0gY2hvcmRfMS5rbm93bkNob3JkTmFtZXMuZmlsdGVyKGMgPT4gYy50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgobm9ybWFsaXplZFRleHQpICYmXG4gICAgICAgICFleGFjdE1hdGNoZXMuaW5jbHVkZXMoYykpO1xuICAgIGNvbnN0IHN1YnN0cmluZ01hdGNoZXMgPSBjaG9yZF8xLmtub3duQ2hvcmROYW1lcy5maWx0ZXIoYyA9PiBjLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobm9ybWFsaXplZFRleHQpICYmXG4gICAgICAgICFleGFjdE1hdGNoZXMuaW5jbHVkZXMoYykgJiZcbiAgICAgICAgIWJlZ2lubmluZ01hdGNoZXMuaW5jbHVkZXMoYykpO1xuICAgIGNvbnN0IG1hdGNoZXMgPSBbLi4uZXhhY3RNYXRjaGVzLCAuLi5iZWdpbm5pbmdNYXRjaGVzLCAuLi5zdWJzdHJpbmdNYXRjaGVzXTtcbiAgICBjaG9yZHNEYXRhTGlzdC5yZXBsYWNlQ2hpbGRyZW4oLi4ubWF0Y2hlcy5tYXAoYyA9PiBjaG9yZE9wdGlvbnNbY10pKTtcbn1cbmZ1bmN0aW9uIHBvcHVsYXRlSW5zdHJ1bWVudHMoKSB7XG4gICAgZm9yIChjb25zdCBpbnN0cnVtZW50IG9mIE9iamVjdC5rZXlzKGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudHMpKSB7XG4gICAgICAgIGluc3RydW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKCgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnb3B0aW9uJywge1xuICAgICAgICAgICAgdmFsdWU6IGluc3RydW1lbnQsXG4gICAgICAgICAgICBpbm5lclRleHQ6IGluc3RydW1lbnRcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldENob3JkRGVzY3JpcHRpb25FbGVtZW50KGNob3JkKSB7XG4gICAgY29uc3Qgbm90ZXMgPSAoMCwgdHlwb2dyYXBoeV8xLmFwcGx5VHlwb2dyYXBoeSkoY2hvcmQubm90ZXMuam9pbignICcpKTtcbiAgICByZXR1cm4gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJywge1xuICAgICAgICBpZDogJ2Nob3JkRGVzY3JpcHRpb24nLFxuICAgICAgICBpbm5lclRleHQ6IGDin6ggJHtub3Rlc30g4p+pYFxuICAgIH0pO1xufVxuZnVuY3Rpb24gZ2V0RXJyb3JFbGVtZW50KG1lc3NhZ2UpIHtcbiAgICByZXR1cm4gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJywge1xuICAgICAgICBpZDogJ2Vycm9yJyxcbiAgICAgICAgaW5uZXJUZXh0OiBtZXNzYWdlXG4gICAgfSk7XG59XG5sZXQgbW9kZWw7XG5mdW5jdGlvbiBkaXNwbGF5UGFnZShtb2RlbCkge1xuICAgIC8vIGFzc3VtaW5nIHRoYXQgdGhlIG1vZGVsIGlzIGNvbnNpc3RlbnRcbiAgICByZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgb25IYXNoQ2hhbmdlKTtcbiAgICBjb25zdCBzdGF0dXMgPSBbXTtcbiAgICBjb25zdCBvdXRwdXQgPSBbXTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB0dW5pbmcgPSBuZXcgdHVuaW5nXzEuVHVuaW5nKG1vZGVsLnR1bmluZ0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgY29uc3QgY2hvcmROYW1lID0gbW9kZWwuY2hvcmROYW1lLnRyaW0oKTtcbiAgICAgICAgbGV0IGNob3JkID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoY2hvcmROYW1lICE9PSAnJykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjaG9yZCA9IG5ldyBjaG9yZF8xLkNob3JkKGNob3JkTmFtZSk7XG4gICAgICAgICAgICAgICAgc3RhdHVzLnB1c2goZ2V0Q2hvcmREZXNjcmlwdGlvbkVsZW1lbnQoY2hvcmQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGAke2Vycm9yfWA7XG4gICAgICAgICAgICAgICAgc3RhdHVzLnB1c2goZ2V0RXJyb3JFbGVtZW50KG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmcmV0Ym9hcmQgPSB0dW5pbmcuZ2V0RnJldGJvYXJkKGNob3JkLCBtb2RlbC5mcmV0Q291bnQpO1xuICAgICAgICBvdXRwdXQucHVzaCgoMCwgZnJldGJvYXJkXzEuZ2V0RnJldGJvYXJkRWxlbWVudCkoZnJldGJvYXJkLCBjaG9yZCA9PT0gbnVsbCB8fCBjaG9yZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2hvcmQubm90ZXNbMF0pKTtcbiAgICAgICAgaWYgKGNob3JkICE9PSB1bmRlZmluZWQgfHwgY2hvcmROYW1lID09PSAnJykge1xuICAgICAgICAgICAgKDAsIHVybEhhc2hfMS5zZXRVcmxIYXNoKShtb2RlbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGAke2Vycm9yfWA7XG4gICAgICAgIHN0YXR1cy5wdXNoKGdldEVycm9yRWxlbWVudChgSW52YWxpZCB0dW5pbmc6ICR7bWVzc2FnZX1gKSk7XG4gICAgfVxuICAgIGluc3RydW1lbnRFbGVtZW50LnZhbHVlID0gbW9kZWwuaW5zdHJ1bWVudDtcbiAgICB0dW5pbmdFbGVtZW50LnZhbHVlID0gbW9kZWwudHVuaW5nRGVzY3JpcHRpb247XG4gICAgZnJldENvdW50RWxlbWVudC52YWx1ZSA9IG1vZGVsLmZyZXRDb3VudC50b1N0cmluZygpO1xuICAgIGNob3JkRWxlbWVudC52YWx1ZSA9IG1vZGVsLmNob3JkTmFtZTtcbiAgICBzdGF0dXNFbGVtZW50LnJlcGxhY2VDaGlsZHJlbiguLi5zdGF0dXMpO1xuICAgIG91dHB1dEVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKC4uLm91dHB1dCk7XG4gICAgLy8gVGltZW91dCBmaXhlcyByZWN1cnNpdmUgb25IYXNoQ2hhbmdlIGNhbGxzXG4gICAgLy8gVE9ETzogZmluZCBhIGJldHRlciBzb2x1dGlvblxuICAgIHNldFRpbWVvdXQoKCkgPT4geyBhZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgb25IYXNoQ2hhbmdlKTsgfSwgMTAwKTtcbn1cbmZ1bmN0aW9uIGNoYW5nZU1vZGVsKG5ld01vZGVsKSB7XG4gICAgbW9kZWwgPSAoMCwgbW9kZWxfMS5tYWtlQ29uc2lzdGVudCkobmV3TW9kZWwpO1xuICAgIGRpc3BsYXlQYWdlKG1vZGVsKTtcbn1cbi8vIElucHV0IGFjdGlvbnM6XG5mdW5jdGlvbiBvbkluc3RydW1lbnRJbnB1dCgpIHtcbiAgICBjb25zdCBpbnN0cnVtZW50ID0gaW5zdHJ1bWVudEVsZW1lbnQudmFsdWU7XG4gICAgY2hhbmdlTW9kZWwoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgaW5zdHJ1bWVudCwgdHVuaW5nRGVzY3JpcHRpb246ICcnIH0pKTtcbn1cbmZ1bmN0aW9uIG9uVHVuaW5nSW5wdXQoKSB7XG4gICAgY29uc3QgdHVuaW5nRGVzY3JpcHRpb24gPSB0dW5pbmdFbGVtZW50LnZhbHVlO1xuICAgIGNoYW5nZU1vZGVsKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IHR1bmluZ0Rlc2NyaXB0aW9uLCBpbnN0cnVtZW50OiAnJyB9KSk7XG59XG5mdW5jdGlvbiBvbkZyZXRDb3VudElucHV0KCkge1xuICAgIGNvbnN0IGZyZXRDb3VudCA9IHBhcnNlSW50KGZyZXRDb3VudEVsZW1lbnQudmFsdWUpO1xuICAgIGNoYW5nZU1vZGVsKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGZyZXRDb3VudCB9KSk7XG59XG5mdW5jdGlvbiBvbkNob3JkSW5wdXQoZSkge1xuICAgIGNvbnN0IGNob3JkTmFtZSA9IGNob3JkRWxlbWVudC52YWx1ZTtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIElucHV0RXZlbnQgJiYgZS5pbnB1dFR5cGUgIT09ICdpbnNlcnRSZXBsYWNlbWVudFRleHQnKSB7XG4gICAgICAgIHBvcHVsYXRlQ2hvcmRzRGF0YWxpc3QoY2hvcmROYW1lKTtcbiAgICB9XG4gICAgY2hhbmdlTW9kZWwoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgY2hvcmROYW1lIH0pKTtcbn1cbmZ1bmN0aW9uIG9uSGFzaENoYW5nZSgpIHtcbiAgICBjaGFuZ2VNb2RlbCgoMCwgdXJsSGFzaF8xLmdldFVybEhhc2gpKCkpO1xuICAgIHBvcHVsYXRlQ2hvcmRzRGF0YWxpc3QobW9kZWwuY2hvcmROYW1lKTtcbn1cbi8vIEVudHJ5IHBvaW50XG5mdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIHBvcHVsYXRlSW5zdHJ1bWVudHMoKTtcbiAgICBvbkhhc2hDaGFuZ2UoKTtcbiAgICBhZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgb25IYXNoQ2hhbmdlKTtcbiAgICBpbnN0cnVtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uSW5zdHJ1bWVudElucHV0KTtcbiAgICB0dW5pbmdFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25UdW5pbmdJbnB1dCk7XG4gICAgZnJldENvdW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uRnJldENvdW50SW5wdXQpO1xuICAgIGNob3JkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uQ2hvcmRJbnB1dCk7XG4gICAgY2hvcmRFbGVtZW50LmZvY3VzKCk7XG59XG5leHBvcnRzLmluaXRpYWxpemUgPSBpbml0aWFsaXplO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1ha2VDb25zaXN0ZW50ID0gZXhwb3J0cy5kZWZhdWx0TW9kZWwgPSBleHBvcnRzLm1heEZyZXRDb3VudCA9IHZvaWQgMDtcbmNvbnN0IGluc3RydW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vdGhlb3J5L2luc3RydW1lbnRzXCIpO1xuY29uc3QgdHVuaW5nXzEgPSByZXF1aXJlKFwiLi4vdGhlb3J5L3R1bmluZ1wiKTtcbmV4cG9ydHMubWF4RnJldENvdW50ID0gMzY7XG5leHBvcnRzLmRlZmF1bHRNb2RlbCA9IHtcbiAgICBpbnN0cnVtZW50OiAnVWt1bGVsZSAoaGlnaCBHKScsXG4gICAgdHVuaW5nRGVzY3JpcHRpb246ICdHNCBDNCBFNCBBNCcsXG4gICAgZnJldENvdW50OiAxMixcbiAgICBjaG9yZE5hbWU6ICcnLFxufTtcbmZ1bmN0aW9uIG1ha2VDb25zaXN0ZW50KG1vZGVsKSB7XG4gICAgdmFyIF9hO1xuICAgIC8vIGZyZXRDb3VudCBzaG91bGQgYmUgYW4gaW50ZWdlciBiZXR3ZWVuIDAgYW5kIG1heEZyZXRDb3VudFxuICAgIGNvbnN0IGZyZXRDb3VudCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGV4cG9ydHMubWF4RnJldENvdW50LCBNYXRoLnJvdW5kKG1vZGVsLmZyZXRDb3VudCkpKTtcbiAgICBtb2RlbCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbW9kZWwpLCB7IGZyZXRDb3VudCB9KTtcbiAgICBjb25zdCBpbnN0cnVtZW50VHVuaW5nID0gKF9hID0gaW5zdHJ1bWVudHNfMS5pbnN0cnVtZW50c1ttb2RlbC5pbnN0cnVtZW50XSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRlc2NyaXB0aW9uO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHR1bmluZyA9IG5ldyB0dW5pbmdfMS5UdW5pbmcobW9kZWwudHVuaW5nRGVzY3JpcHRpb24pLmRlc2NyaXB0aW9uO1xuICAgICAgICBpZiAodHVuaW5nICE9PSBpbnN0cnVtZW50VHVuaW5nKSB7XG4gICAgICAgICAgICAvLyBpZiB0dW5pbmcgaXMgdmFsaWQgYW5kIGRpZmZlcnMgZnJvbSBpbnN0cnVtZW50J3MsIGNoYW5nZSB0aGUgaW5zdHJ1bWVudFxuICAgICAgICAgICAgY29uc3QgaW5zdHJ1bWVudCA9IGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudEJ5VHVuaW5nW3R1bmluZ10gfHwgJyc7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgaW5zdHJ1bWVudCB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoX2IpIHsgfVxuICAgIGlmIChpbnN0cnVtZW50VHVuaW5nKSB7XG4gICAgICAgIC8vIElmIHR1bmluZyBpcyBpbnZhbGlkIGFuZCBpbnN0cnVtZW50IGlzIHZhbGlkLCBjaGFuZ2UgdGhlIHR1bmluZ1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgdHVuaW5nRGVzY3JpcHRpb246IGluc3RydW1lbnRUdW5pbmcgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBJZiBpbnN0cnVtZW50IGlzIGludmFsaWQsIGNoYW5nZSBpdCB0byAnJ1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgaW5zdHJ1bWVudDogJycgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5tYWtlQ29uc2lzdGVudCA9IG1ha2VDb25zaXN0ZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFwcGx5VHlwb2dyYXBoeSA9IHZvaWQgMDtcbmNvbnN0IGNoYXJhY3RlckRpY3QgPSB7XG4gICAgJyMnOiAn4pmvJyxcbiAgICAnYic6ICfima0nLFxuICAgICcwJzogJ+KCgCcsXG4gICAgJzEnOiAn4oKBJyxcbiAgICAnMic6ICfigoInLFxuICAgICczJzogJ+KCgycsXG4gICAgJzQnOiAn4oKEJyxcbiAgICAnNSc6ICfigoUnLFxuICAgICc2JzogJ+KChicsXG4gICAgJzcnOiAn4oKHJyxcbiAgICAnOCc6ICfigognLFxuICAgICc5JzogJ+KCiScsXG59O1xuY29uc3QgcmVwbGFjZVJlZ2V4ID0gbmV3IFJlZ0V4cChgWyR7T2JqZWN0LmtleXMoY2hhcmFjdGVyRGljdCl9XWAsICdnJyk7XG5mdW5jdGlvbiBhcHBseVR5cG9ncmFwaHkodGV4dCkge1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UocmVwbGFjZVJlZ2V4LCBjID0+IGNoYXJhY3RlckRpY3RbY10pO1xufVxuZXhwb3J0cy5hcHBseVR5cG9ncmFwaHkgPSBhcHBseVR5cG9ncmFwaHk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2V0VXJsSGFzaCA9IGV4cG9ydHMuZ2V0VXJsSGFzaCA9IHZvaWQgMDtcbmNvbnN0IG1vZGVsXzEgPSByZXF1aXJlKFwiLi9tb2RlbFwiKTtcbmNvbnN0IGZvcm1hdFZlcnNpb24gPSAwO1xuZnVuY3Rpb24gZ2V0VXJsSGFzaCgpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB0ZXh0ID0gZGVjb2RlVVJJKHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoLyMvLCAnJykpO1xuICAgICAgICBjb25zdCBwYXJ0cyA9IHRleHQuc3BsaXQoJ3wnKTtcbiAgICAgICAgaWYgKHBhcnNlSW50KHBhcnRzWzBdKSA9PT0gZm9ybWF0VmVyc2lvbikge1xuICAgICAgICAgICAgY29uc3QgdHVuaW5nRGVzY3JpcHRpb24gPSBwYXJ0c1sxXS5yZXBsYWNlKC8tL2csICcgJyk7XG4gICAgICAgICAgICBjb25zdCBmcmV0Q291bnQgPSBwYXJzZUludChwYXJ0c1syXSk7XG4gICAgICAgICAgICBjb25zdCBjaG9yZE5hbWUgPSBwYXJ0c1szXTtcbiAgICAgICAgICAgIHJldHVybiB7IGluc3RydW1lbnQ6ICcnLCB0dW5pbmdEZXNjcmlwdGlvbiwgZnJldENvdW50LCBjaG9yZE5hbWUgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoX2EpIHsgfVxuICAgIHJldHVybiBtb2RlbF8xLmRlZmF1bHRNb2RlbDtcbn1cbmV4cG9ydHMuZ2V0VXJsSGFzaCA9IGdldFVybEhhc2g7XG5mdW5jdGlvbiBzZXRVcmxIYXNoKG1vZGVsKSB7XG4gICAgY29uc3QgdHVuaW5nRGVzY3JpcHRpb24gPSBtb2RlbC50dW5pbmdEZXNjcmlwdGlvbi50cmltKCkucmVwbGFjZSgvXFxzKy9nLCAnLScpO1xuICAgIGNvbnN0IGNob3JkTmFtZSA9IG1vZGVsLmNob3JkTmFtZS50cmltKCk7XG4gICAgY29uc3QgaGFzaCA9IGAke2Zvcm1hdFZlcnNpb259fCR7dHVuaW5nRGVzY3JpcHRpb259fCR7bW9kZWwuZnJldENvdW50fXwke2Nob3JkTmFtZX1gO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaDtcbn1cbmV4cG9ydHMuc2V0VXJsSGFzaCA9IHNldFVybEhhc2g7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1aV8xID0gcmVxdWlyZShcIi4vdWlcIik7XG4oMCwgdWlfMS5pbml0aWFsaXplKSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9