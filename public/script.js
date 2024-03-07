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
    exports.instrumentByTuning[tuning.description] = name;
    // Now, the last instrument with the given tuning is used.
    // TODO: Change this if needed.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QiIsInNvdXJjZXMiOlsid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L2Nob3JkLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L2luc3RydW1lbnRzLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L25vdGUudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy90aGVvcnkvdHVuaW5nLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvY29sb3JzLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvZG9tLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvZnJldGJvYXJkLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9tb2RlbC50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL3R5cG9ncmFwaHkudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS91cmxIYXNoLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2hvcmQgPSBleHBvcnRzLmtub3duQ2hvcmROYW1lcyA9IHZvaWQgMDtcbmNvbnN0IG5vdGVfMSA9IHJlcXVpcmUoXCIuL25vdGVcIik7XG4vLyBJbnRlcnZhbHMgaW4gc2VtaXRvbmVzOlxuY29uc3QgW1AxLCBtMiwgTTIsIG0zLCBNMywgUDQsIEE0LCBQNSwgbTYsIE02LCBtNywgTTddID0gQXJyYXkoMTIpLmtleXMoKTtcbmNvbnN0IHN1ZmZpeE1lYW5pbmdzID0ge1xuICAgICdtKG5vNSknOiBbUDEsIG0zXSxcbiAgICAnKG5vNSknOiBbUDEsIE0zXSxcbiAgICAnNSc6IFtQMSwgUDVdLFxuICAgICdkaW0nOiBbUDEsIG0zLCBBNF0sXG4gICAgJ3N1czInOiBbUDEsIE0yLCBQNV0sXG4gICAgJ20nOiBbUDEsIG0zLCBQNV0sXG4gICAgJyc6IFtQMSwgTTMsIFA1XSxcbiAgICAnc3VzNCc6IFtQMSwgUDQsIFA1XSxcbiAgICAnYXVnJzogW1AxLCBNMywgbTZdLFxuICAgICdtNic6IFtQMSwgbTMsIFA1LCBNNl0sXG4gICAgJzYnOiBbUDEsIE0zLCBQNSwgTTZdLFxuICAgICdtNyc6IFtQMSwgbTMsIFA1LCBtN10sXG4gICAgJ21NNyc6IFtQMSwgbTMsIFA1LCBNN10sXG4gICAgJzcnOiBbUDEsIE0zLCBQNSwgbTddLFxuICAgICdNNyc6IFtQMSwgTTMsIFA1LCBNN10sXG59O1xuY29uc3Qga25vd25TdWZmaXhlcyA9IE9iamVjdC5rZXlzKHN1ZmZpeE1lYW5pbmdzKTtcbmtub3duU3VmZml4ZXMuc29ydCgpO1xuZXhwb3J0cy5rbm93bkNob3JkTmFtZXMgPSBbXTtcbmZvciAoY29uc3Qgbm90ZSBvZiBub3RlXzEua25vd25Ob3RlTmFtZXMpIHtcbiAgICBmb3IgKGNvbnN0IHN1ZmZpeCBvZiBrbm93blN1ZmZpeGVzKSB7XG4gICAgICAgIGV4cG9ydHMua25vd25DaG9yZE5hbWVzLnB1c2gobm90ZSArIHN1ZmZpeCk7XG4gICAgfVxufVxuY29uc3QgY2hvcmRSZWdleCA9IG5ldyBSZWdFeHAoYF4oJHtub3RlXzEubm90ZU5hbWVQYXR0ZXJufSkoLiopJGApO1xuY2xhc3MgQ2hvcmQge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBuYW1lLm1hdGNoKGNob3JkUmVnZXgpO1xuICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYENhbid0IHBhcnNlIGNob3JkICR7bmFtZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbXywgcm9vdE5hbWUsIHN1ZmZpeF0gPSBtYXRjaDtcbiAgICAgICAgY29uc3Qgcm9vdCA9IG5ldyBub3RlXzEuTm90ZShyb290TmFtZSk7XG4gICAgICAgIGlmICghKHN1ZmZpeCBpbiBzdWZmaXhNZWFuaW5ncykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgQ2FuJ3QgcGFyc2UgY2hvcmQgc3VmZml4ICR7c3VmZml4fWApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm90ZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBpbnRlcnZhbCBvZiBzdWZmaXhNZWFuaW5nc1tzdWZmaXhdKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGVzLnB1c2gocm9vdC5hZGRJbnRlcnZhbChpbnRlcnZhbCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSA9IDwke3RoaXMubm90ZXMuam9pbignICcpfT5gO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2hvcmQgPSBDaG9yZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmcgPSBleHBvcnRzLmluc3RydW1lbnRzID0gdm9pZCAwO1xuY29uc3QgdHVuaW5nXzEgPSByZXF1aXJlKFwiLi90dW5pbmdcIik7XG5leHBvcnRzLmluc3RydW1lbnRzID0ge1xuICAgICdCYWxhbGFpa2EgKGFjYWRlbWljKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0U0IEU0IEE0JyksXG4gICAgJ0JhbGFsYWlrYSAoZm9sayknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDNCBFNCBHNCcpLFxuICAgICdCYW5qbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEQzIEczIEIzIEQ0JyksXG4gICAgJ0Jhc3MnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFMSBBMSBEMiBHMicpLFxuICAgICdCcmFndWluaGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBCNCBENScpLFxuICAgICdDaGFyYW5nbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEM1IEUgQTQgRTUnKSxcbiAgICAnQ2F2YXF1aW5obyAoUG9ydHVnYWwgR0dCRCknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBHNCBCNCBENScpLFxuICAgICdDYXZhcXVpbmhvIChQb3J0dWdhbCBEQUJFKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q1IEE0IEI0IEU1JyksXG4gICAgJ0NhdmFxdWluaG8gKEJyYXppbCBER0JEKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEI0IEQ1JyksXG4gICAgJ0NhdmFxdWluaG8gKEJyYXppbCBER0JFKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEI0IEU1JyksXG4gICAgJ0RhbGEgZmFlbmR5cic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0U0IEE0IEU1JyksXG4gICAgJ0RlY2hpZyBwb25kYXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDNCBENCBHNCcpLFxuICAgICdHdWl0YWxlbGUnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMiBEMyBHMyBDNCBFNCBBNCcpLFxuICAgICdHdWl0YXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFMiBBMiBEMyBHMyBCMyBFNCcpLFxuICAgICdHdWl0YXJyw7NuJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTEgRDIgRzIgQzMgRTMgQTInKSxcbiAgICAnSmFyYW5hIGphcm9jaGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBDNCBFIEEzIEczJyksXG4gICAgJ0phcmFuYSBodWFzdGVjYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEIzIEQ0IEYjNCBBNCcpLFxuICAgICdNYW5kb2xpbic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEQ0IEE0IEU1JyksXG4gICAgJ1JhamFvJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQzQgRTQgQTQnKSxcbiAgICAnUmVxdWludG8nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMiBEMyBHMyBDNCBFNCBBNCcpLFxuICAgICdTZW1pc3RydW5rYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0QyIEcyIEIyIEQzIEczIEIzIEQ0JyksXG4gICAgJ1Rlbm9yIGd1aXRhcic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0MzIEczIEQ0IEE0JyksXG4gICAgJ1RpbXBsZSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEM1IEU0IEE0IEQ1JyksXG4gICAgJ1VrdWxlbGUgKGhpZ2ggRyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBDNCBFNCBBNCcpLFxuICAgICdVa3VsZWxlIChsb3cgRyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBDNCBFNCBBNCcpLFxuICAgICdVa3VsZWxlIChiYXJpdG9uZSknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdEMyBHMyBCMyBFNCcpLFxuICAgICdWaWh1ZWxhJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTMgRDQgRzQgQjMgRTQnKSxcbiAgICAnVmlvbGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDMyBHMyBENCBBNCcpLFxuICAgICdWaW9saW4nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBENCBBNCBFNScpLFxufTtcbmV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nID0ge307XG5mb3IgKGNvbnN0IFtuYW1lLCB0dW5pbmddIG9mIE9iamVjdC5lbnRyaWVzKGV4cG9ydHMuaW5zdHJ1bWVudHMpKSB7XG4gICAgZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmdbdHVuaW5nLmRlc2NyaXB0aW9uXSA9IG5hbWU7XG4gICAgLy8gTm93LCB0aGUgbGFzdCBpbnN0cnVtZW50IHdpdGggdGhlIGdpdmVuIHR1bmluZyBpcyB1c2VkLlxuICAgIC8vIFRPRE86IENoYW5nZSB0aGlzIGlmIG5lZWRlZC5cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Ob3RlID0gZXhwb3J0cy5ub3RlTmFtZVBhdHRlcm4gPSBleHBvcnRzLmtub3duTm90ZU5hbWVzID0gdm9pZCAwO1xuY29uc3Qgbm90ZU5hbWVzID0gW1xuICAgIFsnQyddLCBbJ0MjJywgJ0RiJ10sXG4gICAgWydEJ10sIFsnRCMnLCAnRWInXSxcbiAgICBbJ0UnXSxcbiAgICBbJ0YnXSwgWydGIycsICdHYiddLFxuICAgIFsnRyddLCBbJ0cjJywgJ0FiJ10sXG4gICAgWydBJ10sIFsnQSMnLCAnQmInXSxcbiAgICBbJ0InXSxcbl07XG5jb25zdCB1bnN1cHBvcnRlZCA9IHtcbiAgICAnQ2InOiAnQicsXG4gICAgJ0IjJzogJ0MnLFxuICAgICdGYic6ICdFJyxcbiAgICAnRSMnOiAnRicsXG59O1xuY29uc3Qgbm90ZUluZGV4QnlOYW1lID0ge307XG5mb3IgKGNvbnN0IFtpbmRleCwgbmFtZXNdIG9mIG5vdGVOYW1lcy5lbnRyaWVzKCkpIHtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgbmFtZXMpIHtcbiAgICAgICAgbm90ZUluZGV4QnlOYW1lW25hbWVdID0gaW5kZXg7XG4gICAgfVxufVxuZXhwb3J0cy5rbm93bk5vdGVOYW1lcyA9IE9iamVjdC5rZXlzKG5vdGVJbmRleEJ5TmFtZSk7XG5leHBvcnRzLmtub3duTm90ZU5hbWVzLnNvcnQoKTtcbmV4cG9ydHMubm90ZU5hbWVQYXR0ZXJuID0gJ1tBLUddWyNiXT8nO1xuY29uc3Qgbm90ZVJlZ2V4ID0gbmV3IFJlZ0V4cChgXigke2V4cG9ydHMubm90ZU5hbWVQYXR0ZXJufSkoXFxcXGQpPyRgKTtcbmNsYXNzIE5vdGUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBuYW1lLm1hdGNoKG5vdGVSZWdleCk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgY29uc3QgW18sIG5vdGVOYW1lLCBvY3RhdmVOYW1lXSA9IG1hdGNoO1xuICAgICAgICAgICAgaWYgKG5vdGVOYW1lIGluIHVuc3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbiA9IHVuc3VwcG9ydGVkW25vdGVOYW1lXTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVzZSAke3N1Z2dlc3Rpb259IGluc3RlYWQgb2YgJHtub3RlTmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGl0Y2hDbGFzcyA9IG5vdGVJbmRleEJ5TmFtZVtub3RlTmFtZV07XG4gICAgICAgICAgICB0aGlzLm9jdGF2ZSA9IG9jdGF2ZU5hbWUgIT09IHVuZGVmaW5lZCA/IHBhcnNlSW50KG9jdGF2ZU5hbWUpIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBDYW4ndCBwYXJzZSBub3RlICR7bmFtZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgZnJvbVBpdGNoQ2xhc3NBbmRPY3RhdmUocGl0Y2hDbGFzcywgb2N0YXZlKSB7XG4gICAgICAgIGxldCBub3RlID0gT2JqZWN0LmNyZWF0ZShOb3RlLnByb3RvdHlwZSk7XG4gICAgICAgIG5vdGUucGl0Y2hDbGFzcyA9IHBpdGNoQ2xhc3M7XG4gICAgICAgIG5vdGUub2N0YXZlID0gb2N0YXZlO1xuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIGNvbnN0IG5vdGVOYW1lID0gbm90ZU5hbWVzW3RoaXMucGl0Y2hDbGFzc11bMF07XG4gICAgICAgIHJldHVybiB0aGlzLm9jdGF2ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGAke25vdGVOYW1lfSR7dGhpcy5vY3RhdmV9YFxuICAgICAgICAgICAgOiBub3RlTmFtZTtcbiAgICB9XG4gICAgYWRkSW50ZXJ2YWwoaW50ZXJ2YWwpIHtcbiAgICAgICAgY29uc3QgcGl0Y2ggPSB0aGlzLnBpdGNoQ2xhc3MgKyBpbnRlcnZhbDtcbiAgICAgICAgY29uc3Qgb2N0YXZlID0gdGhpcy5vY3RhdmUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB0aGlzLm9jdGF2ZSArIE1hdGguZmxvb3IocGl0Y2ggLyAxMilcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gTm90ZS5mcm9tUGl0Y2hDbGFzc0FuZE9jdGF2ZShwaXRjaCAlIDEyLCBvY3RhdmUpOyAvLyBpbmNvcnJlY3QgZm9yIG5lZ2F0aXZlIGludGVydmFsc1xuICAgIH1cbn1cbmV4cG9ydHMuTm90ZSA9IE5vdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVHVuaW5nID0gZXhwb3J0cy5nZXRHcm91cCA9IHZvaWQgMDtcbmNvbnN0IG5vdGVfMSA9IHJlcXVpcmUoXCIuL25vdGVcIik7XG5jb25zdCBzcGxpdFJlZ2V4ID0gL1xccyt8KD89W0EtWl0pLzsgLy8gc3BsaXQgYnkgd2hpdGVzcGFjZSBvciBiZWZvcmUgdXBwZXJjYXNlIGxldHRlcnNcbmZ1bmN0aW9uIGdldEZyZXRzKG9wZW5TdHJpbmcsIGFsbG93ZWRQaXRjaGVzLCBmcmV0Q291bnQpIHtcbiAgICBjb25zdCBmcmV0cyA9IFtdO1xuICAgIGZvciAobGV0IGZyZXRJbmRleCA9IDA7IGZyZXRJbmRleCA8PSBmcmV0Q291bnQ7IGZyZXRJbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IG5vdGUgPSBvcGVuU3RyaW5nLmFkZEludGVydmFsKGZyZXRJbmRleCk7XG4gICAgICAgIGZyZXRzLnB1c2goYWxsb3dlZFBpdGNoZXMuaGFzKG5vdGUucGl0Y2hDbGFzcykgPyBub3RlIDogbnVsbCk7XG4gICAgfVxuICAgIHJldHVybiBmcmV0cztcbn1cbmZ1bmN0aW9uIGdldEdyb3VwKHJvb3ROb3RlLCBub3RlKSB7XG4gICAgaWYgKG5vdGUgIT09IG51bGwgJiYgbm90ZS5vY3RhdmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigobm90ZS5vY3RhdmUgKiAxMiArIG5vdGUucGl0Y2hDbGFzcyAtIHJvb3ROb3RlLnBpdGNoQ2xhc3MpIC8gMTIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnRzLmdldEdyb3VwID0gZ2V0R3JvdXA7XG5jbGFzcyBUdW5pbmcge1xuICAgIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMub3BlblN0cmluZ3MgPSBkZXNjcmlwdGlvblxuICAgICAgICAgICAgLnNwbGl0KHNwbGl0UmVnZXgpXG4gICAgICAgICAgICAuZmlsdGVyKG4gPT4gbiAhPT0gJycpXG4gICAgICAgICAgICAubWFwKG4gPT4gbmV3IG5vdGVfMS5Ob3RlKG4pKTtcbiAgICAgICAgaWYgKHRoaXMub3BlblN0cmluZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0IGxlYXN0IG9uZSBvcGVuIHN0cmluZyByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0aGlzLm9wZW5TdHJpbmdzLmpvaW4oJyAnKTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBgVHVuaW5nKFwiJHt0aGlzLmRlc2NyaXB0aW9ufVwiKWA7XG4gICAgfVxuICAgIGdldEZyZXRib2FyZChjaG9yZCwgZnJldENvdW50ID0gMTIpIHtcbiAgICAgICAgY29uc3QgYWxsb3dlZFBpdGNoZXMgPSBjaG9yZCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGNob3JkLm5vdGVzLm1hcChuID0+IG4ucGl0Y2hDbGFzcylcbiAgICAgICAgICAgIDogW107XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5TdHJpbmdzLm1hcChzID0+IGdldEZyZXRzKHMsIG5ldyBTZXQoYWxsb3dlZFBpdGNoZXMpLCBmcmV0Q291bnQpKTtcbiAgICB9XG59XG5leHBvcnRzLlR1bmluZyA9IFR1bmluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRHcm91cENvbG9yID0gdm9pZCAwO1xuY29uc3QgcGhpID0gKDEgKyBNYXRoLnNxcnQoNSkpIC8gMjtcbmNvbnN0IGdvbGRlbkFuZ2xlID0gMiAqIE1hdGguUEkgLyAocGhpICogcGhpKTtcbmNvbnN0IGxpZ2h0bmVzcyA9IDAuNTU7XG5jb25zdCBzYXR1cmF0aW9uID0gMC42NTtcbmZ1bmN0aW9uIGdldEdyb3VwQ29sb3IoZ3JvdXApIHtcbiAgICBjb25zdCBodWUgPSBnb2xkZW5BbmdsZSAqIGdyb3VwO1xuICAgIGNvbnN0IGwgPSBsaWdodG5lc3MgKiAxMDA7XG4gICAgY29uc3QgYSA9IHNhdHVyYXRpb24gKiBNYXRoLmNvcyhodWUpICogMTAwO1xuICAgIGNvbnN0IGIgPSBzYXR1cmF0aW9uICogTWF0aC5zaW4oaHVlKSAqIDEwMDtcbiAgICByZXR1cm4gYG9rbGFiKCR7bC50b0ZpeGVkKDEpfSUgJHthLnRvRml4ZWQoMSl9JSAke2IudG9GaXhlZCgxKX0lKWA7XG59XG5leHBvcnRzLmdldEdyb3VwQ29sb3IgPSBnZXRHcm91cENvbG9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSBleHBvcnRzLmdldEJ5SWQgPSB2b2lkIDA7XG5mdW5jdGlvbiBnZXRCeUlkKGlkKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYENhbm5vdCBmaW5kIGVsZW1lbnQgd2l0aCBpZCAnJHtpZH0nYCk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xufVxuZXhwb3J0cy5nZXRCeUlkID0gZ2V0QnlJZDtcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgcHJvcGVydGllcywgc3R5bGUpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICBpZiAocHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudCwgcHJvcGVydGllcyk7XG4gICAgfVxuICAgIGlmIChzdHlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudC5zdHlsZSwgc3R5bGUpO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0RnJldGJvYXJkRWxlbWVudCA9IHZvaWQgMDtcbmNvbnN0IGRvbV8xID0gcmVxdWlyZShcIi4vZG9tXCIpO1xuY29uc3QgdHVuaW5nXzEgPSByZXF1aXJlKFwiLi4vdGhlb3J5L3R1bmluZ1wiKTtcbmNvbnN0IHR5cG9ncmFwaHlfMSA9IHJlcXVpcmUoXCIuL3R5cG9ncmFwaHlcIik7XG5jb25zdCBjb2xvcnNfMSA9IHJlcXVpcmUoXCIuL2NvbG9yc1wiKTtcbmZ1bmN0aW9uIGdldEZyZXRIZWFkZXJFbGVtZW50KGZyZXRDb3VudCkge1xuICAgIGNvbnN0IGZyZXRIZWFkZXJFbGVtZW50ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJywge1xuICAgICAgICBjbGFzc05hbWU6ICdmcmV0SGVhZGVyJ1xuICAgIH0pO1xuICAgIGZvciAoY29uc3QgZnJldEluZGV4IG9mIEFycmF5KGZyZXRDb3VudCkua2V5cygpKSB7XG4gICAgICAgIGZyZXRIZWFkZXJFbGVtZW50LmFwcGVuZENoaWxkKCgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnc3BhbicsIHtcbiAgICAgICAgICAgIGlubmVyVGV4dDogZnJldEluZGV4LnRvU3RyaW5nKClcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldEhlYWRlckVsZW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRGcmV0RWxlbWVudChmcmV0Tm90ZSwgcm9vdE5vdGUpIHtcbiAgICBjb25zdCBpbm5lclRleHQgPSBmcmV0Tm90ZSAhPT0gbnVsbFxuICAgICAgICA/ICgwLCB0eXBvZ3JhcGh5XzEuYXBwbHlUeXBvZ3JhcGh5KShmcmV0Tm90ZS50b1N0cmluZygpKVxuICAgICAgICA6ICfCtyc7XG4gICAgY29uc3QgZ3JvdXAgPSByb290Tm90ZSAhPT0gdW5kZWZpbmVkID8gKDAsIHR1bmluZ18xLmdldEdyb3VwKShyb290Tm90ZSwgZnJldE5vdGUpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGNvbG9yID0gZ3JvdXAgIT09IHVuZGVmaW5lZCA/ICgwLCBjb2xvcnNfMS5nZXRHcm91cENvbG9yKShncm91cCkgOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnc3BhbicsIHsgaW5uZXJUZXh0IH0sIHsgY29sb3IgfSk7XG59XG5mdW5jdGlvbiBnZXRGcmV0dGVkU3RyaW5nRWxlbWVudChmcmV0dGVkU3RyaW5nLCByb290Tm90ZSkge1xuICAgIGNvbnN0IGZyZXR0ZWRTdHJpbmdFbGVtZW50ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJyk7XG4gICAgZm9yIChjb25zdCBmcmV0Tm90ZSBvZiBmcmV0dGVkU3RyaW5nKSB7XG4gICAgICAgIGZyZXR0ZWRTdHJpbmdFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXRFbGVtZW50KGZyZXROb3RlLCByb290Tm90ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldHRlZFN0cmluZ0VsZW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRGcmV0Ym9hcmRFbGVtZW50KGZyZXRib2FyZCwgcm9vdE5vdGUpIHtcbiAgICBjb25zdCBmcmV0Ym9hcmRFbGVtZW50ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdkaXYnLCB7IGlkOiAnZnJldGJvYXJkJyB9KTtcbiAgICBmcmV0Ym9hcmRFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXRIZWFkZXJFbGVtZW50KGZyZXRib2FyZFswXS5sZW5ndGgpKTtcbiAgICBmb3IgKGNvbnN0IGZyZXR0ZWRTdHJpbmcgb2YgWy4uLmZyZXRib2FyZF0ucmV2ZXJzZSgpKSB7XG4gICAgICAgIGZyZXRib2FyZEVsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0RnJldHRlZFN0cmluZ0VsZW1lbnQoZnJldHRlZFN0cmluZywgcm9vdE5vdGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXRib2FyZEVsZW1lbnQ7XG59XG5leHBvcnRzLmdldEZyZXRib2FyZEVsZW1lbnQgPSBnZXRGcmV0Ym9hcmRFbGVtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemUgPSB2b2lkIDA7XG5jb25zdCBjaG9yZF8xID0gcmVxdWlyZShcIi4uL3RoZW9yeS9jaG9yZFwiKTtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS90dW5pbmdcIik7XG5jb25zdCBpbnN0cnVtZW50c18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS9pbnN0cnVtZW50c1wiKTtcbmNvbnN0IGRvbV8xID0gcmVxdWlyZShcIi4vZG9tXCIpO1xuY29uc3QgdHlwb2dyYXBoeV8xID0gcmVxdWlyZShcIi4vdHlwb2dyYXBoeVwiKTtcbmNvbnN0IGZyZXRib2FyZF8xID0gcmVxdWlyZShcIi4vZnJldGJvYXJkXCIpO1xuY29uc3QgbW9kZWxfMSA9IHJlcXVpcmUoXCIuL21vZGVsXCIpO1xuY29uc3QgdXJsSGFzaF8xID0gcmVxdWlyZShcIi4vdXJsSGFzaFwiKTtcbi8vIEh0bWwgZWxlbWVudHNcbmNvbnN0IGluc3RydW1lbnRFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdpbnN0cnVtZW50Jyk7XG5jb25zdCB0dW5pbmdFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCd0dW5pbmcnKTtcbmNvbnN0IGZyZXRDb3VudEVsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2ZyZXRDb3VudCcpO1xuY29uc3QgY2hvcmRFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdjaG9yZCcpO1xuY29uc3QgY2hvcmRzRGF0YUxpc3QgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2Nob3JkcycpO1xuY29uc3Qgc3RhdHVzRWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnc3RhdHVzJyk7XG5jb25zdCBvdXRwdXRFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdvdXRwdXQnKTtcbi8vIENob3JkcyBkYXRhbGlzdCBvcHRpb25zXG5jb25zdCBjaG9yZE9wdGlvbnMgPSB7fTtcbmZvciAoY29uc3QgY2hvcmQgb2YgY2hvcmRfMS5rbm93bkNob3JkTmFtZXMpIHtcbiAgICBjaG9yZE9wdGlvbnNbY2hvcmRdID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdvcHRpb24nLCB7IHZhbHVlOiBjaG9yZCB9KTtcbn1cbmZ1bmN0aW9uIHBvcHVsYXRlQ2hvcmRzRGF0YWxpc3QodGV4dCA9ICcnKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZFRleHQgPSB0ZXh0LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGV4YWN0TWF0Y2hlcyA9IGNob3JkXzEua25vd25DaG9yZE5hbWVzLmZpbHRlcihjID0+IGMudG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZFRleHQpO1xuICAgIGNvbnN0IGJlZ2lubmluZ01hdGNoZXMgPSBjaG9yZF8xLmtub3duQ2hvcmROYW1lcy5maWx0ZXIoYyA9PiBjLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChub3JtYWxpemVkVGV4dCkgJiZcbiAgICAgICAgIWV4YWN0TWF0Y2hlcy5pbmNsdWRlcyhjKSk7XG4gICAgY29uc3Qgc3Vic3RyaW5nTWF0Y2hlcyA9IGNob3JkXzEua25vd25DaG9yZE5hbWVzLmZpbHRlcihjID0+IGMudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhub3JtYWxpemVkVGV4dCkgJiZcbiAgICAgICAgIWV4YWN0TWF0Y2hlcy5pbmNsdWRlcyhjKSAmJlxuICAgICAgICAhYmVnaW5uaW5nTWF0Y2hlcy5pbmNsdWRlcyhjKSk7XG4gICAgY29uc3QgbWF0Y2hlcyA9IFsuLi5leGFjdE1hdGNoZXMsIC4uLmJlZ2lubmluZ01hdGNoZXMsIC4uLnN1YnN0cmluZ01hdGNoZXNdO1xuICAgIGNob3Jkc0RhdGFMaXN0LnJlcGxhY2VDaGlsZHJlbiguLi5tYXRjaGVzLm1hcChjID0+IGNob3JkT3B0aW9uc1tjXSkpO1xufVxuZnVuY3Rpb24gcG9wdWxhdGVJbnN0cnVtZW50cygpIHtcbiAgICBmb3IgKGNvbnN0IGluc3RydW1lbnQgb2YgT2JqZWN0LmtleXMoaW5zdHJ1bWVudHNfMS5pbnN0cnVtZW50cykpIHtcbiAgICAgICAgaW5zdHJ1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdvcHRpb24nLCB7XG4gICAgICAgICAgICB2YWx1ZTogaW5zdHJ1bWVudCxcbiAgICAgICAgICAgIGlubmVyVGV4dDogaW5zdHJ1bWVudFxuICAgICAgICB9KSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0Q2hvcmREZXNjcmlwdGlvbkVsZW1lbnQoY2hvcmQpIHtcbiAgICBjb25zdCBub3RlcyA9ICgwLCB0eXBvZ3JhcGh5XzEuYXBwbHlUeXBvZ3JhcGh5KShjaG9yZC5ub3Rlcy5qb2luKCcgJykpO1xuICAgIHJldHVybiAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3AnLCB7XG4gICAgICAgIGlkOiAnY2hvcmREZXNjcmlwdGlvbicsXG4gICAgICAgIGlubmVyVGV4dDogYOKfqCAke25vdGVzfSDin6lgXG4gICAgfSk7XG59XG5mdW5jdGlvbiBnZXRFcnJvckVsZW1lbnQobWVzc2FnZSkge1xuICAgIHJldHVybiAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3AnLCB7XG4gICAgICAgIGlkOiAnZXJyb3InLFxuICAgICAgICBpbm5lclRleHQ6IG1lc3NhZ2VcbiAgICB9KTtcbn1cbmxldCBtb2RlbDtcbmZ1bmN0aW9uIGRpc3BsYXlQYWdlKG1vZGVsKSB7XG4gICAgLy8gYXNzdW1pbmcgdGhhdCB0aGUgbW9kZWwgaXMgY29uc2lzdGVudFxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBvbkhhc2hDaGFuZ2UpO1xuICAgIGNvbnN0IHN0YXR1cyA9IFtdO1xuICAgIGNvbnN0IG91dHB1dCA9IFtdO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHR1bmluZyA9IG5ldyB0dW5pbmdfMS5UdW5pbmcobW9kZWwudHVuaW5nRGVzY3JpcHRpb24pO1xuICAgICAgICBjb25zdCBjaG9yZE5hbWUgPSBtb2RlbC5jaG9yZE5hbWUudHJpbSgpO1xuICAgICAgICBsZXQgY2hvcmQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChjaG9yZE5hbWUgIT09ICcnKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNob3JkID0gbmV3IGNob3JkXzEuQ2hvcmQoY2hvcmROYW1lKTtcbiAgICAgICAgICAgICAgICBzdGF0dXMucHVzaChnZXRDaG9yZERlc2NyaXB0aW9uRWxlbWVudChjaG9yZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogYCR7ZXJyb3J9YDtcbiAgICAgICAgICAgICAgICBzdGF0dXMucHVzaChnZXRFcnJvckVsZW1lbnQobWVzc2FnZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZyZXRib2FyZCA9IHR1bmluZy5nZXRGcmV0Ym9hcmQoY2hvcmQsIG1vZGVsLmZyZXRDb3VudCk7XG4gICAgICAgIG91dHB1dC5wdXNoKCgwLCBmcmV0Ym9hcmRfMS5nZXRGcmV0Ym9hcmRFbGVtZW50KShmcmV0Ym9hcmQsIGNob3JkID09PSBudWxsIHx8IGNob3JkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjaG9yZC5ub3Rlc1swXSkpO1xuICAgICAgICBpZiAoY2hvcmQgIT09IHVuZGVmaW5lZCB8fCBjaG9yZE5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICAoMCwgdXJsSGFzaF8xLnNldFVybEhhc2gpKG1vZGVsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogYCR7ZXJyb3J9YDtcbiAgICAgICAgc3RhdHVzLnB1c2goZ2V0RXJyb3JFbGVtZW50KGBJbnZhbGlkIHR1bmluZzogJHttZXNzYWdlfWApKTtcbiAgICB9XG4gICAgaW5zdHJ1bWVudEVsZW1lbnQudmFsdWUgPSBtb2RlbC5pbnN0cnVtZW50O1xuICAgIHR1bmluZ0VsZW1lbnQudmFsdWUgPSBtb2RlbC50dW5pbmdEZXNjcmlwdGlvbjtcbiAgICBmcmV0Q291bnRFbGVtZW50LnZhbHVlID0gbW9kZWwuZnJldENvdW50LnRvU3RyaW5nKCk7XG4gICAgY2hvcmRFbGVtZW50LnZhbHVlID0gbW9kZWwuY2hvcmROYW1lO1xuICAgIHN0YXR1c0VsZW1lbnQucmVwbGFjZUNoaWxkcmVuKC4uLnN0YXR1cyk7XG4gICAgb3V0cHV0RWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4oLi4ub3V0cHV0KTtcbiAgICAvLyBUaW1lb3V0IGZpeGVzIHJlY3Vyc2l2ZSBvbkhhc2hDaGFuZ2UgY2FsbHNcbiAgICAvLyBUT0RPOiBmaW5kIGEgYmV0dGVyIHNvbHV0aW9uXG4gICAgc2V0VGltZW91dCgoKSA9PiB7IGFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBvbkhhc2hDaGFuZ2UpOyB9LCAxMDApO1xufVxuZnVuY3Rpb24gY2hhbmdlTW9kZWwobmV3TW9kZWwpIHtcbiAgICBtb2RlbCA9ICgwLCBtb2RlbF8xLm1ha2VDb25zaXN0ZW50KShuZXdNb2RlbCk7XG4gICAgZGlzcGxheVBhZ2UobW9kZWwpO1xufVxuLy8gSW5wdXQgYWN0aW9uczpcbmZ1bmN0aW9uIG9uSW5zdHJ1bWVudElucHV0KCkge1xuICAgIGNvbnN0IGluc3RydW1lbnQgPSBpbnN0cnVtZW50RWxlbWVudC52YWx1ZTtcbiAgICBjaGFuZ2VNb2RlbChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBpbnN0cnVtZW50LCB0dW5pbmdEZXNjcmlwdGlvbjogJycgfSkpO1xufVxuZnVuY3Rpb24gb25UdW5pbmdJbnB1dCgpIHtcbiAgICBjb25zdCB0dW5pbmdEZXNjcmlwdGlvbiA9IHR1bmluZ0VsZW1lbnQudmFsdWU7XG4gICAgY2hhbmdlTW9kZWwoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgdHVuaW5nRGVzY3JpcHRpb24sIGluc3RydW1lbnQ6ICcnIH0pKTtcbn1cbmZ1bmN0aW9uIG9uRnJldENvdW50SW5wdXQoKSB7XG4gICAgY29uc3QgZnJldENvdW50ID0gcGFyc2VJbnQoZnJldENvdW50RWxlbWVudC52YWx1ZSk7XG4gICAgY2hhbmdlTW9kZWwoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgZnJldENvdW50IH0pKTtcbn1cbmZ1bmN0aW9uIG9uQ2hvcmRJbnB1dChlKSB7XG4gICAgY29uc3QgY2hvcmROYW1lID0gY2hvcmRFbGVtZW50LnZhbHVlO1xuICAgIGlmIChlIGluc3RhbmNlb2YgSW5wdXRFdmVudCAmJiBlLmlucHV0VHlwZSAhPT0gJ2luc2VydFJlcGxhY2VtZW50VGV4dCcpIHtcbiAgICAgICAgcG9wdWxhdGVDaG9yZHNEYXRhbGlzdChjaG9yZE5hbWUpO1xuICAgIH1cbiAgICBjaGFuZ2VNb2RlbChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBjaG9yZE5hbWUgfSkpO1xufVxuZnVuY3Rpb24gb25IYXNoQ2hhbmdlKCkge1xuICAgIGNoYW5nZU1vZGVsKCgwLCB1cmxIYXNoXzEuZ2V0VXJsSGFzaCkoKSk7XG4gICAgcG9wdWxhdGVDaG9yZHNEYXRhbGlzdChtb2RlbC5jaG9yZE5hbWUpO1xufVxuLy8gRW50cnkgcG9pbnRcbmZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgcG9wdWxhdGVJbnN0cnVtZW50cygpO1xuICAgIG9uSGFzaENoYW5nZSgpO1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBvbkhhc2hDaGFuZ2UpO1xuICAgIGluc3RydW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25JbnN0cnVtZW50SW5wdXQpO1xuICAgIHR1bmluZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvblR1bmluZ0lucHV0KTtcbiAgICBmcmV0Q291bnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25GcmV0Q291bnRJbnB1dCk7XG4gICAgY2hvcmRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25DaG9yZElucHV0KTtcbiAgICBjaG9yZEVsZW1lbnQuZm9jdXMoKTtcbn1cbmV4cG9ydHMuaW5pdGlhbGl6ZSA9IGluaXRpYWxpemU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWFrZUNvbnNpc3RlbnQgPSBleHBvcnRzLmRlZmF1bHRNb2RlbCA9IGV4cG9ydHMubWF4RnJldENvdW50ID0gdm9pZCAwO1xuY29uc3QgaW5zdHJ1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvaW5zdHJ1bWVudHNcIik7XG5jb25zdCB0dW5pbmdfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvdHVuaW5nXCIpO1xuZXhwb3J0cy5tYXhGcmV0Q291bnQgPSAzNjtcbmV4cG9ydHMuZGVmYXVsdE1vZGVsID0ge1xuICAgIGluc3RydW1lbnQ6ICdVa3VsZWxlIChoaWdoIEcpJyxcbiAgICB0dW5pbmdEZXNjcmlwdGlvbjogJ0c0IEM0IEU0IEE0JyxcbiAgICBmcmV0Q291bnQ6IDEyLFxuICAgIGNob3JkTmFtZTogJycsXG59O1xuZnVuY3Rpb24gbWFrZUNvbnNpc3RlbnQobW9kZWwpIHtcbiAgICB2YXIgX2E7XG4gICAgLy8gZnJldENvdW50IHNob3VsZCBiZSBhbiBpbnRlZ2VyIGJldHdlZW4gMCBhbmQgbWF4RnJldENvdW50XG4gICAgY29uc3QgZnJldENvdW50ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZXhwb3J0cy5tYXhGcmV0Q291bnQsIE1hdGgucm91bmQobW9kZWwuZnJldENvdW50KSkpO1xuICAgIG1vZGVsID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtb2RlbCksIHsgZnJldENvdW50IH0pO1xuICAgIGNvbnN0IGluc3RydW1lbnRUdW5pbmcgPSAoX2EgPSBpbnN0cnVtZW50c18xLmluc3RydW1lbnRzW21vZGVsLmluc3RydW1lbnRdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGVzY3JpcHRpb247XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdHVuaW5nID0gbmV3IHR1bmluZ18xLlR1bmluZyhtb2RlbC50dW5pbmdEZXNjcmlwdGlvbikuZGVzY3JpcHRpb247XG4gICAgICAgIGlmICh0dW5pbmcgIT09IGluc3RydW1lbnRUdW5pbmcpIHtcbiAgICAgICAgICAgIC8vIGlmIHR1bmluZyBpcyB2YWxpZCBhbmQgZGlmZmVycyBmcm9tIGluc3RydW1lbnQncywgY2hhbmdlIHRoZSBpbnN0cnVtZW50XG4gICAgICAgICAgICBjb25zdCBpbnN0cnVtZW50ID0gaW5zdHJ1bWVudHNfMS5pbnN0cnVtZW50QnlUdW5pbmdbdHVuaW5nXSB8fCAnJztcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBpbnN0cnVtZW50IH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChfYikgeyB9XG4gICAgaWYgKGluc3RydW1lbnRUdW5pbmcpIHtcbiAgICAgICAgLy8gSWYgdHVuaW5nIGlzIGludmFsaWQgYW5kIGluc3RydW1lbnQgaXMgdmFsaWQsIGNoYW5nZSB0aGUgdHVuaW5nXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyB0dW5pbmdEZXNjcmlwdGlvbjogaW5zdHJ1bWVudFR1bmluZyB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIElmIGluc3RydW1lbnQgaXMgaW52YWxpZCwgY2hhbmdlIGl0IHRvICcnXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vZGVsKSwgeyBpbnN0cnVtZW50OiAnJyB9KTtcbiAgICB9XG59XG5leHBvcnRzLm1ha2VDb25zaXN0ZW50ID0gbWFrZUNvbnNpc3RlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYXBwbHlUeXBvZ3JhcGh5ID0gdm9pZCAwO1xuY29uc3QgY2hhcmFjdGVyRGljdCA9IHtcbiAgICAnIyc6ICfima8nLFxuICAgICdiJzogJ+KZrScsXG4gICAgJzAnOiAn4oKAJyxcbiAgICAnMSc6ICfigoEnLFxuICAgICcyJzogJ+KCgicsXG4gICAgJzMnOiAn4oKDJyxcbiAgICAnNCc6ICfigoQnLFxuICAgICc1JzogJ+KChScsXG4gICAgJzYnOiAn4oKGJyxcbiAgICAnNyc6ICfigocnLFxuICAgICc4JzogJ+KCiCcsXG4gICAgJzknOiAn4oKJJyxcbn07XG5jb25zdCByZXBsYWNlUmVnZXggPSBuZXcgUmVnRXhwKGBbJHtPYmplY3Qua2V5cyhjaGFyYWN0ZXJEaWN0KX1dYCwgJ2cnKTtcbmZ1bmN0aW9uIGFwcGx5VHlwb2dyYXBoeSh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShyZXBsYWNlUmVnZXgsIGMgPT4gY2hhcmFjdGVyRGljdFtjXSk7XG59XG5leHBvcnRzLmFwcGx5VHlwb2dyYXBoeSA9IGFwcGx5VHlwb2dyYXBoeTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZXRVcmxIYXNoID0gZXhwb3J0cy5nZXRVcmxIYXNoID0gdm9pZCAwO1xuY29uc3QgbW9kZWxfMSA9IHJlcXVpcmUoXCIuL21vZGVsXCIpO1xuY29uc3QgZm9ybWF0VmVyc2lvbiA9IDA7XG5mdW5jdGlvbiBnZXRVcmxIYXNoKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBkZWNvZGVVUkkod2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgvIy8sICcnKSk7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gdGV4dC5zcGxpdCgnfCcpO1xuICAgICAgICBpZiAocGFyc2VJbnQocGFydHNbMF0pID09PSBmb3JtYXRWZXJzaW9uKSB7XG4gICAgICAgICAgICBjb25zdCB0dW5pbmdEZXNjcmlwdGlvbiA9IHBhcnRzWzFdLnJlcGxhY2UoLy0vZywgJyAnKTtcbiAgICAgICAgICAgIGNvbnN0IGZyZXRDb3VudCA9IHBhcnNlSW50KHBhcnRzWzJdKTtcbiAgICAgICAgICAgIGNvbnN0IGNob3JkTmFtZSA9IHBhcnRzWzNdO1xuICAgICAgICAgICAgcmV0dXJuIHsgaW5zdHJ1bWVudDogJycsIHR1bmluZ0Rlc2NyaXB0aW9uLCBmcmV0Q291bnQsIGNob3JkTmFtZSB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChfYSkgeyB9XG4gICAgcmV0dXJuIG1vZGVsXzEuZGVmYXVsdE1vZGVsO1xufVxuZXhwb3J0cy5nZXRVcmxIYXNoID0gZ2V0VXJsSGFzaDtcbmZ1bmN0aW9uIHNldFVybEhhc2gobW9kZWwpIHtcbiAgICBjb25zdCB0dW5pbmdEZXNjcmlwdGlvbiA9IG1vZGVsLnR1bmluZ0Rlc2NyaXB0aW9uLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICctJyk7XG4gICAgY29uc3QgY2hvcmROYW1lID0gbW9kZWwuY2hvcmROYW1lLnRyaW0oKTtcbiAgICBjb25zdCBoYXNoID0gYCR7Zm9ybWF0VmVyc2lvbn18JHt0dW5pbmdEZXNjcmlwdGlvbn18JHttb2RlbC5mcmV0Q291bnR9fCR7Y2hvcmROYW1lfWA7XG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoO1xufVxuZXhwb3J0cy5zZXRVcmxIYXNoID0gc2V0VXJsSGFzaDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHVpXzEgPSByZXF1aXJlKFwiLi91aVwiKTtcbigwLCB1aV8xLmluaXRpYWxpemUpKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=