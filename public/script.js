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
exports.defaultInstrument = exports.instrumentByTuning = exports.instruments = void 0;
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
exports.defaultInstrument = 'Ukulele (high G)';


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

/***/ "./src/ui/init.ts":
/*!************************!*\
  !*** ./src/ui/init.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initialize = void 0;
const chord_1 = __webpack_require__(/*! ../theory/chord */ "./src/theory/chord.ts");
const tuning_1 = __webpack_require__(/*! ../theory/tuning */ "./src/theory/tuning.ts");
const instruments_1 = __webpack_require__(/*! ../theory/instruments */ "./src/theory/instruments.ts");
const dom_1 = __webpack_require__(/*! ./dom */ "./src/ui/dom.ts");
const typography_1 = __webpack_require__(/*! ./typography */ "./src/ui/typography.ts");
const fretboard_1 = __webpack_require__(/*! ./fretboard */ "./src/ui/fretboard.ts");
function getChordDescription(chord) {
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
function initialize() {
    const instrumentElement = (0, dom_1.getById)('instrument');
    const tuningElement = (0, dom_1.getById)('tuning');
    const fretCountElement = (0, dom_1.getById)('fretCount');
    const chordElement = (0, dom_1.getById)('chord');
    const chordsDataList = (0, dom_1.getById)('chords');
    const statusElement = (0, dom_1.getById)('status');
    const outputElement = (0, dom_1.getById)('output');
    const chordOptions = {};
    for (const chord of chord_1.knownChordNames) {
        chordOptions[chord] = (0, dom_1.createElement)('option', { value: chord });
    }
    function populateChords(text = '') {
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
    function showFretboard() {
        const tuningDescription = tuningElement.value.trim();
        const chordName = chordElement.value.trim();
        const fretCount = parseInt(fretCountElement.value);
        statusElement.replaceChildren();
        outputElement.replaceChildren();
        try {
            const tuning = new tuning_1.Tuning(tuningDescription);
            let chord = undefined;
            if (chordName !== '') {
                try {
                    chord = new chord_1.Chord(chordName);
                    statusElement.appendChild(getChordDescription(chord));
                }
                catch (error) {
                    const message = error instanceof Error ? error.message : `${error}`;
                    statusElement.appendChild(getErrorElement(message));
                }
            }
            const fretboard = tuning.getFretboard(chord, fretCount);
            outputElement.appendChild((0, fretboard_1.getFretboardElement)(fretboard, chord === null || chord === void 0 ? void 0 : chord.notes[0]));
        }
        catch (error) {
            const message = error instanceof Error ? error.message : `${error}`;
            statusElement.appendChild(getErrorElement(`Invalid tuning: ${message}`));
        }
    }
    function onInstrumentInput() {
        const instrument = instrumentElement.value;
        if (instrument in instruments_1.instruments) {
            const tuning = instruments_1.instruments[instrument];
            tuningElement.value = tuning.description;
            showFretboard();
        }
    }
    function onTuningInput() {
        const tuningDescription = tuningElement.value;
        let instrument = '';
        try {
            const tuning = new tuning_1.Tuning(tuningDescription);
            if (tuning.description in instruments_1.instrumentByTuning) {
                instrument = instruments_1.instrumentByTuning[tuning.description];
            }
        }
        catch (_a) { }
        instrumentElement.value = instrument;
        showFretboard();
    }
    function onFretCountInput() {
        showFretboard();
    }
    function onChordInput(e) {
        if (e instanceof InputEvent && e.inputType !== 'insertReplacementText') {
            const text = chordElement.value.trim();
            populateChords(text);
        }
        showFretboard();
    }
    populateInstruments();
    instrumentElement.value = instruments_1.defaultInstrument;
    onInstrumentInput();
    populateChords();
    instrumentElement.addEventListener('input', onInstrumentInput);
    tuningElement.addEventListener('input', onTuningInput);
    fretCountElement.addEventListener('input', onFretCountInput);
    chordElement.addEventListener('input', onChordInput);
    chordElement.focus();
}
exports.initialize = initialize;


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
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const init_1 = __webpack_require__(/*! ./ui/init */ "./src/ui/init.ts");
(0, init_1.initialize)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGVBQWUsbUJBQU8sQ0FBQyxtQ0FBVztBQUNsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L2Nob3JkLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L2luc3RydW1lbnRzLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdGhlb3J5L25vdGUudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy90aGVvcnkvdHVuaW5nLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvY29sb3JzLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvZG9tLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvZnJldGJvYXJkLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkvaW5pdC50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL3R5cG9ncmFwaHkudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNob3JkID0gZXhwb3J0cy5rbm93bkNob3JkTmFtZXMgPSB2b2lkIDA7XG5jb25zdCBub3RlXzEgPSByZXF1aXJlKFwiLi9ub3RlXCIpO1xuLy8gSW50ZXJ2YWxzIGluIHNlbWl0b25lczpcbmNvbnN0IFtQMSwgbTIsIE0yLCBtMywgTTMsIFA0LCBBNCwgUDUsIG02LCBNNiwgbTcsIE03XSA9IEFycmF5KDEyKS5rZXlzKCk7XG5jb25zdCBzdWZmaXhNZWFuaW5ncyA9IHtcbiAgICAnbShubzUpJzogW1AxLCBtM10sXG4gICAgJyhubzUpJzogW1AxLCBNM10sXG4gICAgJzUnOiBbUDEsIFA1XSxcbiAgICAnZGltJzogW1AxLCBtMywgQTRdLFxuICAgICdzdXMyJzogW1AxLCBNMiwgUDVdLFxuICAgICdtJzogW1AxLCBtMywgUDVdLFxuICAgICcnOiBbUDEsIE0zLCBQNV0sXG4gICAgJ3N1czQnOiBbUDEsIFA0LCBQNV0sXG4gICAgJ2F1Zyc6IFtQMSwgTTMsIG02XSxcbiAgICAnbTYnOiBbUDEsIG0zLCBQNSwgTTZdLFxuICAgICc2JzogW1AxLCBNMywgUDUsIE02XSxcbiAgICAnbTcnOiBbUDEsIG0zLCBQNSwgbTddLFxuICAgICdtTTcnOiBbUDEsIG0zLCBQNSwgTTddLFxuICAgICc3JzogW1AxLCBNMywgUDUsIG03XSxcbiAgICAnTTcnOiBbUDEsIE0zLCBQNSwgTTddLFxufTtcbmNvbnN0IGtub3duU3VmZml4ZXMgPSBPYmplY3Qua2V5cyhzdWZmaXhNZWFuaW5ncyk7XG5rbm93blN1ZmZpeGVzLnNvcnQoKTtcbmV4cG9ydHMua25vd25DaG9yZE5hbWVzID0gW107XG5mb3IgKGNvbnN0IG5vdGUgb2Ygbm90ZV8xLmtub3duTm90ZU5hbWVzKSB7XG4gICAgZm9yIChjb25zdCBzdWZmaXggb2Yga25vd25TdWZmaXhlcykge1xuICAgICAgICBleHBvcnRzLmtub3duQ2hvcmROYW1lcy5wdXNoKG5vdGUgKyBzdWZmaXgpO1xuICAgIH1cbn1cbmNvbnN0IGNob3JkUmVnZXggPSBuZXcgUmVnRXhwKGBeKCR7bm90ZV8xLm5vdGVOYW1lUGF0dGVybn0pKC4qKSRgKTtcbmNsYXNzIENob3JkIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gbmFtZS5tYXRjaChjaG9yZFJlZ2V4KTtcbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBDYW4ndCBwYXJzZSBjaG9yZCAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgW18sIHJvb3ROYW1lLCBzdWZmaXhdID0gbWF0Y2g7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBuZXcgbm90ZV8xLk5vdGUocm9vdE5hbWUpO1xuICAgICAgICBpZiAoIShzdWZmaXggaW4gc3VmZml4TWVhbmluZ3MpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYENhbid0IHBhcnNlIGNob3JkIHN1ZmZpeCAke3N1ZmZpeH1gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vdGVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgaW50ZXJ2YWwgb2Ygc3VmZml4TWVhbmluZ3Nbc3VmZml4XSkge1xuICAgICAgICAgICAgdGhpcy5ub3Rlcy5wdXNoKHJvb3QuYWRkSW50ZXJ2YWwoaW50ZXJ2YWwpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0gPSA8JHt0aGlzLm5vdGVzLmpvaW4oJyAnKX0+YDtcbiAgICB9XG59XG5leHBvcnRzLkNob3JkID0gQ2hvcmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdEluc3RydW1lbnQgPSBleHBvcnRzLmluc3RydW1lbnRCeVR1bmluZyA9IGV4cG9ydHMuaW5zdHJ1bWVudHMgPSB2b2lkIDA7XG5jb25zdCB0dW5pbmdfMSA9IHJlcXVpcmUoXCIuL3R1bmluZ1wiKTtcbmV4cG9ydHMuaW5zdHJ1bWVudHMgPSB7XG4gICAgJ0JhbGFsYWlrYSAoYWNhZGVtaWMpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRTQgRTQgQTQnKSxcbiAgICAnQmFsYWxhaWthIChmb2xrKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0M0IEU0IEc0JyksXG4gICAgJ0JhbmpvJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgRDMgRzMgQjMgRDQnKSxcbiAgICAnQmFzcyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0UxIEExIEQyIEcyJyksXG4gICAgJ0JyYWd1aW5oYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEI0IEQ1JyksXG4gICAgJ0NoYXJhbmdvJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgQzUgRSBBNCBFNScpLFxuICAgICdDYXZhcXVpbmhvIChQb3J0dWdhbCBHR0JEKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEc0IEI0IEQ1JyksXG4gICAgJ0NhdmFxdWluaG8gKFBvcnR1Z2FsIERBQkUpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDUgQTQgQjQgRTUnKSxcbiAgICAnQ2F2YXF1aW5obyAoQnJhemlsIERHQkQpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQjQgRDUnKSxcbiAgICAnQ2F2YXF1aW5obyAoQnJhemlsIERHQkUpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQjQgRTUnKSxcbiAgICAnRGFsYSBmYWVuZHlyJzogbmV3IHR1bmluZ18xLlR1bmluZygnRTQgQTQgRTUnKSxcbiAgICAnRGVjaGlnIHBvbmRhcic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0M0IEQ0IEc0JyksXG4gICAgJ0d1aXRhbGVsZSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0EyIEQzIEczIEM0IEU0IEE0JyksXG4gICAgJ0d1aXRhcic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0UyIEEyIEQzIEczIEIzIEU0JyksXG4gICAgJ0d1aXRhcnLDs24nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMSBEMiBHMiBDMyBFMyBBMicpLFxuICAgICdKYXJhbmEgamFyb2NoYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEM0IEUgQTMgRzMnKSxcbiAgICAnSmFyYW5hIGh1YXN0ZWNhJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgQjMgRDQgRiM0IEE0JyksXG4gICAgJ01hbmRvbGluJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgRDQgQTQgRTUnKSxcbiAgICAnUmFqYW8nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBDNCBFNCBBNCcpLFxuICAgICdSZXF1aW50byc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0EyIEQzIEczIEM0IEU0IEE0JyksXG4gICAgJ1NlbWlzdHJ1bmthJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDIgRzIgQjIgRDMgRzMgQjMgRDQnKSxcbiAgICAnVGVub3IgZ3VpdGFyJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzMgRzMgRDQgQTQnKSxcbiAgICAnVGltcGxlJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgQzUgRTQgQTQgRDUnKSxcbiAgICAnVWt1bGVsZSAoaGlnaCBHKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEM0IEU0IEE0JyksXG4gICAgJ1VrdWxlbGUgKGxvdyBHKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEM0IEU0IEE0JyksXG4gICAgJ1VrdWxlbGUgKGJhcml0b25lKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0QzIEczIEIzIEU0JyksXG4gICAgJ1ZpaHVlbGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMyBENCBHNCBCMyBFNCcpLFxuICAgICdWaW9sYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0MzIEczIEQ0IEE0JyksXG4gICAgJ1Zpb2xpbic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEQ0IEE0IEU1JyksXG59O1xuZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmcgPSB7fTtcbmZvciAoY29uc3QgW25hbWUsIHR1bmluZ10gb2YgT2JqZWN0LmVudHJpZXMoZXhwb3J0cy5pbnN0cnVtZW50cykpIHtcbiAgICBleHBvcnRzLmluc3RydW1lbnRCeVR1bmluZ1t0dW5pbmcuZGVzY3JpcHRpb25dID0gbmFtZTtcbiAgICAvLyBOb3csIHRoZSBsYXN0IGluc3RydW1lbnQgd2l0aCB0aGUgZ2l2ZW4gdHVuaW5nIGlzIHVzZWQuXG4gICAgLy8gVE9ETzogQ2hhbmdlIHRoaXMgaWYgbmVlZGVkLlxufVxuZXhwb3J0cy5kZWZhdWx0SW5zdHJ1bWVudCA9ICdVa3VsZWxlIChoaWdoIEcpJztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Ob3RlID0gZXhwb3J0cy5ub3RlTmFtZVBhdHRlcm4gPSBleHBvcnRzLmtub3duTm90ZU5hbWVzID0gdm9pZCAwO1xuY29uc3Qgbm90ZU5hbWVzID0gW1xuICAgIFsnQyddLCBbJ0MjJywgJ0RiJ10sXG4gICAgWydEJ10sIFsnRCMnLCAnRWInXSxcbiAgICBbJ0UnXSxcbiAgICBbJ0YnXSwgWydGIycsICdHYiddLFxuICAgIFsnRyddLCBbJ0cjJywgJ0FiJ10sXG4gICAgWydBJ10sIFsnQSMnLCAnQmInXSxcbiAgICBbJ0InXSxcbl07XG5jb25zdCB1bnN1cHBvcnRlZCA9IHtcbiAgICAnQ2InOiAnQicsXG4gICAgJ0IjJzogJ0MnLFxuICAgICdGYic6ICdFJyxcbiAgICAnRSMnOiAnRicsXG59O1xuY29uc3Qgbm90ZUluZGV4QnlOYW1lID0ge307XG5mb3IgKGNvbnN0IFtpbmRleCwgbmFtZXNdIG9mIG5vdGVOYW1lcy5lbnRyaWVzKCkpIHtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgbmFtZXMpIHtcbiAgICAgICAgbm90ZUluZGV4QnlOYW1lW25hbWVdID0gaW5kZXg7XG4gICAgfVxufVxuZXhwb3J0cy5rbm93bk5vdGVOYW1lcyA9IE9iamVjdC5rZXlzKG5vdGVJbmRleEJ5TmFtZSk7XG5leHBvcnRzLmtub3duTm90ZU5hbWVzLnNvcnQoKTtcbmV4cG9ydHMubm90ZU5hbWVQYXR0ZXJuID0gJ1tBLUddWyNiXT8nO1xuY29uc3Qgbm90ZVJlZ2V4ID0gbmV3IFJlZ0V4cChgXigke2V4cG9ydHMubm90ZU5hbWVQYXR0ZXJufSkoXFxcXGQpPyRgKTtcbmNsYXNzIE5vdGUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBuYW1lLm1hdGNoKG5vdGVSZWdleCk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgY29uc3QgW18sIG5vdGVOYW1lLCBvY3RhdmVOYW1lXSA9IG1hdGNoO1xuICAgICAgICAgICAgaWYgKG5vdGVOYW1lIGluIHVuc3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbiA9IHVuc3VwcG9ydGVkW25vdGVOYW1lXTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVzZSAke3N1Z2dlc3Rpb259IGluc3RlYWQgb2YgJHtub3RlTmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGl0Y2hDbGFzcyA9IG5vdGVJbmRleEJ5TmFtZVtub3RlTmFtZV07XG4gICAgICAgICAgICB0aGlzLm9jdGF2ZSA9IG9jdGF2ZU5hbWUgIT09IHVuZGVmaW5lZCA/IHBhcnNlSW50KG9jdGF2ZU5hbWUpIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBDYW4ndCBwYXJzZSBub3RlICR7bmFtZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgZnJvbVBpdGNoQ2xhc3NBbmRPY3RhdmUocGl0Y2hDbGFzcywgb2N0YXZlKSB7XG4gICAgICAgIGxldCBub3RlID0gT2JqZWN0LmNyZWF0ZShOb3RlLnByb3RvdHlwZSk7XG4gICAgICAgIG5vdGUucGl0Y2hDbGFzcyA9IHBpdGNoQ2xhc3M7XG4gICAgICAgIG5vdGUub2N0YXZlID0gb2N0YXZlO1xuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIGNvbnN0IG5vdGVOYW1lID0gbm90ZU5hbWVzW3RoaXMucGl0Y2hDbGFzc11bMF07XG4gICAgICAgIHJldHVybiB0aGlzLm9jdGF2ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGAke25vdGVOYW1lfSR7dGhpcy5vY3RhdmV9YFxuICAgICAgICAgICAgOiBub3RlTmFtZTtcbiAgICB9XG4gICAgYWRkSW50ZXJ2YWwoaW50ZXJ2YWwpIHtcbiAgICAgICAgY29uc3QgcGl0Y2ggPSB0aGlzLnBpdGNoQ2xhc3MgKyBpbnRlcnZhbDtcbiAgICAgICAgY29uc3Qgb2N0YXZlID0gdGhpcy5vY3RhdmUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB0aGlzLm9jdGF2ZSArIE1hdGguZmxvb3IocGl0Y2ggLyAxMilcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gTm90ZS5mcm9tUGl0Y2hDbGFzc0FuZE9jdGF2ZShwaXRjaCAlIDEyLCBvY3RhdmUpOyAvLyBpbmNvcnJlY3QgZm9yIG5lZ2F0aXZlIGludGVydmFsc1xuICAgIH1cbn1cbmV4cG9ydHMuTm90ZSA9IE5vdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVHVuaW5nID0gZXhwb3J0cy5nZXRHcm91cCA9IHZvaWQgMDtcbmNvbnN0IG5vdGVfMSA9IHJlcXVpcmUoXCIuL25vdGVcIik7XG5jb25zdCBzcGxpdFJlZ2V4ID0gL1xccyt8KD89W0EtWl0pLzsgLy8gc3BsaXQgYnkgd2hpdGVzcGFjZSBvciBiZWZvcmUgdXBwZXJjYXNlIGxldHRlcnNcbmZ1bmN0aW9uIGdldEZyZXRzKG9wZW5TdHJpbmcsIGFsbG93ZWRQaXRjaGVzLCBmcmV0Q291bnQpIHtcbiAgICBjb25zdCBmcmV0cyA9IFtdO1xuICAgIGZvciAobGV0IGZyZXRJbmRleCA9IDA7IGZyZXRJbmRleCA8PSBmcmV0Q291bnQ7IGZyZXRJbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IG5vdGUgPSBvcGVuU3RyaW5nLmFkZEludGVydmFsKGZyZXRJbmRleCk7XG4gICAgICAgIGZyZXRzLnB1c2goYWxsb3dlZFBpdGNoZXMuaGFzKG5vdGUucGl0Y2hDbGFzcykgPyBub3RlIDogbnVsbCk7XG4gICAgfVxuICAgIHJldHVybiBmcmV0cztcbn1cbmZ1bmN0aW9uIGdldEdyb3VwKHJvb3ROb3RlLCBub3RlKSB7XG4gICAgaWYgKG5vdGUgIT09IG51bGwgJiYgbm90ZS5vY3RhdmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigobm90ZS5vY3RhdmUgKiAxMiArIG5vdGUucGl0Y2hDbGFzcyAtIHJvb3ROb3RlLnBpdGNoQ2xhc3MpIC8gMTIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnRzLmdldEdyb3VwID0gZ2V0R3JvdXA7XG5jbGFzcyBUdW5pbmcge1xuICAgIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMub3BlblN0cmluZ3MgPSBkZXNjcmlwdGlvblxuICAgICAgICAgICAgLnNwbGl0KHNwbGl0UmVnZXgpXG4gICAgICAgICAgICAuZmlsdGVyKG4gPT4gbiAhPT0gJycpXG4gICAgICAgICAgICAubWFwKG4gPT4gbmV3IG5vdGVfMS5Ob3RlKG4pKTtcbiAgICAgICAgaWYgKHRoaXMub3BlblN0cmluZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0IGxlYXN0IG9uZSBvcGVuIHN0cmluZyByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0aGlzLm9wZW5TdHJpbmdzLmpvaW4oJyAnKTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBgVHVuaW5nKFwiJHt0aGlzLmRlc2NyaXB0aW9ufVwiKWA7XG4gICAgfVxuICAgIGdldEZyZXRib2FyZChjaG9yZCwgZnJldENvdW50ID0gMTIpIHtcbiAgICAgICAgY29uc3QgYWxsb3dlZFBpdGNoZXMgPSBjaG9yZCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGNob3JkLm5vdGVzLm1hcChuID0+IG4ucGl0Y2hDbGFzcylcbiAgICAgICAgICAgIDogW107XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5TdHJpbmdzLm1hcChzID0+IGdldEZyZXRzKHMsIG5ldyBTZXQoYWxsb3dlZFBpdGNoZXMpLCBmcmV0Q291bnQpKTtcbiAgICB9XG59XG5leHBvcnRzLlR1bmluZyA9IFR1bmluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRHcm91cENvbG9yID0gdm9pZCAwO1xuY29uc3QgcGhpID0gKDEgKyBNYXRoLnNxcnQoNSkpIC8gMjtcbmNvbnN0IGdvbGRlbkFuZ2xlID0gMiAqIE1hdGguUEkgLyAocGhpICogcGhpKTtcbmNvbnN0IGxpZ2h0bmVzcyA9IDAuNTU7XG5jb25zdCBzYXR1cmF0aW9uID0gMC42NTtcbmZ1bmN0aW9uIGdldEdyb3VwQ29sb3IoZ3JvdXApIHtcbiAgICBjb25zdCBodWUgPSBnb2xkZW5BbmdsZSAqIGdyb3VwO1xuICAgIGNvbnN0IGwgPSBsaWdodG5lc3MgKiAxMDA7XG4gICAgY29uc3QgYSA9IHNhdHVyYXRpb24gKiBNYXRoLmNvcyhodWUpICogMTAwO1xuICAgIGNvbnN0IGIgPSBzYXR1cmF0aW9uICogTWF0aC5zaW4oaHVlKSAqIDEwMDtcbiAgICByZXR1cm4gYG9rbGFiKCR7bC50b0ZpeGVkKDEpfSUgJHthLnRvRml4ZWQoMSl9JSAke2IudG9GaXhlZCgxKX0lKWA7XG59XG5leHBvcnRzLmdldEdyb3VwQ29sb3IgPSBnZXRHcm91cENvbG9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSBleHBvcnRzLmdldEJ5SWQgPSB2b2lkIDA7XG5mdW5jdGlvbiBnZXRCeUlkKGlkKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYENhbm5vdCBmaW5kIGVsZW1lbnQgd2l0aCBpZCAnJHtpZH0nYCk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xufVxuZXhwb3J0cy5nZXRCeUlkID0gZ2V0QnlJZDtcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgcHJvcGVydGllcywgc3R5bGUpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICBpZiAocHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudCwgcHJvcGVydGllcyk7XG4gICAgfVxuICAgIGlmIChzdHlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudC5zdHlsZSwgc3R5bGUpO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0RnJldGJvYXJkRWxlbWVudCA9IHZvaWQgMDtcbmNvbnN0IGRvbV8xID0gcmVxdWlyZShcIi4vZG9tXCIpO1xuY29uc3QgdHVuaW5nXzEgPSByZXF1aXJlKFwiLi4vdGhlb3J5L3R1bmluZ1wiKTtcbmNvbnN0IHR5cG9ncmFwaHlfMSA9IHJlcXVpcmUoXCIuL3R5cG9ncmFwaHlcIik7XG5jb25zdCBjb2xvcnNfMSA9IHJlcXVpcmUoXCIuL2NvbG9yc1wiKTtcbmZ1bmN0aW9uIGdldEZyZXRIZWFkZXJFbGVtZW50KGZyZXRDb3VudCkge1xuICAgIGNvbnN0IGZyZXRIZWFkZXJFbGVtZW50ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJywge1xuICAgICAgICBjbGFzc05hbWU6ICdmcmV0SGVhZGVyJ1xuICAgIH0pO1xuICAgIGZvciAoY29uc3QgZnJldEluZGV4IG9mIEFycmF5KGZyZXRDb3VudCkua2V5cygpKSB7XG4gICAgICAgIGZyZXRIZWFkZXJFbGVtZW50LmFwcGVuZENoaWxkKCgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnc3BhbicsIHtcbiAgICAgICAgICAgIGlubmVyVGV4dDogZnJldEluZGV4LnRvU3RyaW5nKClcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldEhlYWRlckVsZW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRGcmV0RWxlbWVudChmcmV0Tm90ZSwgcm9vdE5vdGUpIHtcbiAgICBjb25zdCBpbm5lclRleHQgPSBmcmV0Tm90ZSAhPT0gbnVsbFxuICAgICAgICA/ICgwLCB0eXBvZ3JhcGh5XzEuYXBwbHlUeXBvZ3JhcGh5KShmcmV0Tm90ZS50b1N0cmluZygpKVxuICAgICAgICA6ICfCtyc7XG4gICAgY29uc3QgZ3JvdXAgPSByb290Tm90ZSAhPT0gdW5kZWZpbmVkID8gKDAsIHR1bmluZ18xLmdldEdyb3VwKShyb290Tm90ZSwgZnJldE5vdGUpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGNvbG9yID0gZ3JvdXAgIT09IHVuZGVmaW5lZCA/ICgwLCBjb2xvcnNfMS5nZXRHcm91cENvbG9yKShncm91cCkgOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnc3BhbicsIHsgaW5uZXJUZXh0IH0sIHsgY29sb3IgfSk7XG59XG5mdW5jdGlvbiBnZXRGcmV0dGVkU3RyaW5nRWxlbWVudChmcmV0dGVkU3RyaW5nLCByb290Tm90ZSkge1xuICAgIGNvbnN0IGZyZXR0ZWRTdHJpbmdFbGVtZW50ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJyk7XG4gICAgZm9yIChjb25zdCBmcmV0Tm90ZSBvZiBmcmV0dGVkU3RyaW5nKSB7XG4gICAgICAgIGZyZXR0ZWRTdHJpbmdFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXRFbGVtZW50KGZyZXROb3RlLCByb290Tm90ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldHRlZFN0cmluZ0VsZW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRGcmV0Ym9hcmRFbGVtZW50KGZyZXRib2FyZCwgcm9vdE5vdGUpIHtcbiAgICBjb25zdCBmcmV0Ym9hcmRFbGVtZW50ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdkaXYnLCB7IGlkOiAnZnJldGJvYXJkJyB9KTtcbiAgICBmcmV0Ym9hcmRFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXRIZWFkZXJFbGVtZW50KGZyZXRib2FyZFswXS5sZW5ndGgpKTtcbiAgICBmb3IgKGNvbnN0IGZyZXR0ZWRTdHJpbmcgb2YgWy4uLmZyZXRib2FyZF0ucmV2ZXJzZSgpKSB7XG4gICAgICAgIGZyZXRib2FyZEVsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0RnJldHRlZFN0cmluZ0VsZW1lbnQoZnJldHRlZFN0cmluZywgcm9vdE5vdGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXRib2FyZEVsZW1lbnQ7XG59XG5leHBvcnRzLmdldEZyZXRib2FyZEVsZW1lbnQgPSBnZXRGcmV0Ym9hcmRFbGVtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRpYWxpemUgPSB2b2lkIDA7XG5jb25zdCBjaG9yZF8xID0gcmVxdWlyZShcIi4uL3RoZW9yeS9jaG9yZFwiKTtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS90dW5pbmdcIik7XG5jb25zdCBpbnN0cnVtZW50c18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS9pbnN0cnVtZW50c1wiKTtcbmNvbnN0IGRvbV8xID0gcmVxdWlyZShcIi4vZG9tXCIpO1xuY29uc3QgdHlwb2dyYXBoeV8xID0gcmVxdWlyZShcIi4vdHlwb2dyYXBoeVwiKTtcbmNvbnN0IGZyZXRib2FyZF8xID0gcmVxdWlyZShcIi4vZnJldGJvYXJkXCIpO1xuZnVuY3Rpb24gZ2V0Q2hvcmREZXNjcmlwdGlvbihjaG9yZCkge1xuICAgIGNvbnN0IG5vdGVzID0gKDAsIHR5cG9ncmFwaHlfMS5hcHBseVR5cG9ncmFwaHkpKGNob3JkLm5vdGVzLmpvaW4oJyAnKSk7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcsIHtcbiAgICAgICAgaWQ6ICdjaG9yZERlc2NyaXB0aW9uJyxcbiAgICAgICAgaW5uZXJUZXh0OiBg4p+oICR7bm90ZXN9IOKfqWBcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGdldEVycm9yRWxlbWVudChtZXNzYWdlKSB7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcsIHtcbiAgICAgICAgaWQ6ICdlcnJvcicsXG4gICAgICAgIGlubmVyVGV4dDogbWVzc2FnZVxuICAgIH0pO1xufVxuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBjb25zdCBpbnN0cnVtZW50RWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnaW5zdHJ1bWVudCcpO1xuICAgIGNvbnN0IHR1bmluZ0VsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ3R1bmluZycpO1xuICAgIGNvbnN0IGZyZXRDb3VudEVsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2ZyZXRDb3VudCcpO1xuICAgIGNvbnN0IGNob3JkRWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnY2hvcmQnKTtcbiAgICBjb25zdCBjaG9yZHNEYXRhTGlzdCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnY2hvcmRzJyk7XG4gICAgY29uc3Qgc3RhdHVzRWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnc3RhdHVzJyk7XG4gICAgY29uc3Qgb3V0cHV0RWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnb3V0cHV0Jyk7XG4gICAgY29uc3QgY2hvcmRPcHRpb25zID0ge307XG4gICAgZm9yIChjb25zdCBjaG9yZCBvZiBjaG9yZF8xLmtub3duQ2hvcmROYW1lcykge1xuICAgICAgICBjaG9yZE9wdGlvbnNbY2hvcmRdID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdvcHRpb24nLCB7IHZhbHVlOiBjaG9yZCB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcG9wdWxhdGVDaG9yZHModGV4dCA9ICcnKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRUZXh0ID0gdGV4dC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgZXhhY3RNYXRjaGVzID0gY2hvcmRfMS5rbm93bkNob3JkTmFtZXMuZmlsdGVyKGMgPT4gYy50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkVGV4dCk7XG4gICAgICAgIGNvbnN0IGJlZ2lubmluZ01hdGNoZXMgPSBjaG9yZF8xLmtub3duQ2hvcmROYW1lcy5maWx0ZXIoYyA9PiBjLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChub3JtYWxpemVkVGV4dCkgJiZcbiAgICAgICAgICAgICFleGFjdE1hdGNoZXMuaW5jbHVkZXMoYykpO1xuICAgICAgICBjb25zdCBzdWJzdHJpbmdNYXRjaGVzID0gY2hvcmRfMS5rbm93bkNob3JkTmFtZXMuZmlsdGVyKGMgPT4gYy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKG5vcm1hbGl6ZWRUZXh0KSAmJlxuICAgICAgICAgICAgIWV4YWN0TWF0Y2hlcy5pbmNsdWRlcyhjKSAmJlxuICAgICAgICAgICAgIWJlZ2lubmluZ01hdGNoZXMuaW5jbHVkZXMoYykpO1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gWy4uLmV4YWN0TWF0Y2hlcywgLi4uYmVnaW5uaW5nTWF0Y2hlcywgLi4uc3Vic3RyaW5nTWF0Y2hlc107XG4gICAgICAgIGNob3Jkc0RhdGFMaXN0LnJlcGxhY2VDaGlsZHJlbiguLi5tYXRjaGVzLm1hcChjID0+IGNob3JkT3B0aW9uc1tjXSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZUluc3RydW1lbnRzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGluc3RydW1lbnQgb2YgT2JqZWN0LmtleXMoaW5zdHJ1bWVudHNfMS5pbnN0cnVtZW50cykpIHtcbiAgICAgICAgICAgIGluc3RydW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKCgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnb3B0aW9uJywge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBpbnN0cnVtZW50LFxuICAgICAgICAgICAgICAgIGlubmVyVGV4dDogaW5zdHJ1bWVudFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNob3dGcmV0Ym9hcmQoKSB7XG4gICAgICAgIGNvbnN0IHR1bmluZ0Rlc2NyaXB0aW9uID0gdHVuaW5nRWxlbWVudC52YWx1ZS50cmltKCk7XG4gICAgICAgIGNvbnN0IGNob3JkTmFtZSA9IGNob3JkRWxlbWVudC52YWx1ZS50cmltKCk7XG4gICAgICAgIGNvbnN0IGZyZXRDb3VudCA9IHBhcnNlSW50KGZyZXRDb3VudEVsZW1lbnQudmFsdWUpO1xuICAgICAgICBzdGF0dXNFbGVtZW50LnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICBvdXRwdXRFbGVtZW50LnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdHVuaW5nID0gbmV3IHR1bmluZ18xLlR1bmluZyh0dW5pbmdEZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBsZXQgY2hvcmQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoY2hvcmROYW1lICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNob3JkID0gbmV3IGNob3JkXzEuQ2hvcmQoY2hvcmROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzRWxlbWVudC5hcHBlbmRDaGlsZChnZXRDaG9yZERlc2NyaXB0aW9uKGNob3JkKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBgJHtlcnJvcn1gO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNFbGVtZW50LmFwcGVuZENoaWxkKGdldEVycm9yRWxlbWVudChtZXNzYWdlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZnJldGJvYXJkID0gdHVuaW5nLmdldEZyZXRib2FyZChjaG9yZCwgZnJldENvdW50KTtcbiAgICAgICAgICAgIG91dHB1dEVsZW1lbnQuYXBwZW5kQ2hpbGQoKDAsIGZyZXRib2FyZF8xLmdldEZyZXRib2FyZEVsZW1lbnQpKGZyZXRib2FyZCwgY2hvcmQgPT09IG51bGwgfHwgY2hvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNob3JkLm5vdGVzWzBdKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBgJHtlcnJvcn1gO1xuICAgICAgICAgICAgc3RhdHVzRWxlbWVudC5hcHBlbmRDaGlsZChnZXRFcnJvckVsZW1lbnQoYEludmFsaWQgdHVuaW5nOiAke21lc3NhZ2V9YCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uSW5zdHJ1bWVudElucHV0KCkge1xuICAgICAgICBjb25zdCBpbnN0cnVtZW50ID0gaW5zdHJ1bWVudEVsZW1lbnQudmFsdWU7XG4gICAgICAgIGlmIChpbnN0cnVtZW50IGluIGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHR1bmluZyA9IGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudHNbaW5zdHJ1bWVudF07XG4gICAgICAgICAgICB0dW5pbmdFbGVtZW50LnZhbHVlID0gdHVuaW5nLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgc2hvd0ZyZXRib2FyZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uVHVuaW5nSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IHR1bmluZ0Rlc2NyaXB0aW9uID0gdHVuaW5nRWxlbWVudC52YWx1ZTtcbiAgICAgICAgbGV0IGluc3RydW1lbnQgPSAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHR1bmluZyA9IG5ldyB0dW5pbmdfMS5UdW5pbmcodHVuaW5nRGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgaWYgKHR1bmluZy5kZXNjcmlwdGlvbiBpbiBpbnN0cnVtZW50c18xLmluc3RydW1lbnRCeVR1bmluZykge1xuICAgICAgICAgICAgICAgIGluc3RydW1lbnQgPSBpbnN0cnVtZW50c18xLmluc3RydW1lbnRCeVR1bmluZ1t0dW5pbmcuZGVzY3JpcHRpb25dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChfYSkgeyB9XG4gICAgICAgIGluc3RydW1lbnRFbGVtZW50LnZhbHVlID0gaW5zdHJ1bWVudDtcbiAgICAgICAgc2hvd0ZyZXRib2FyZCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbkZyZXRDb3VudElucHV0KCkge1xuICAgICAgICBzaG93RnJldGJvYXJkKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uQ2hvcmRJbnB1dChlKSB7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgSW5wdXRFdmVudCAmJiBlLmlucHV0VHlwZSAhPT0gJ2luc2VydFJlcGxhY2VtZW50VGV4dCcpIHtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBjaG9yZEVsZW1lbnQudmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgcG9wdWxhdGVDaG9yZHModGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgc2hvd0ZyZXRib2FyZCgpO1xuICAgIH1cbiAgICBwb3B1bGF0ZUluc3RydW1lbnRzKCk7XG4gICAgaW5zdHJ1bWVudEVsZW1lbnQudmFsdWUgPSBpbnN0cnVtZW50c18xLmRlZmF1bHRJbnN0cnVtZW50O1xuICAgIG9uSW5zdHJ1bWVudElucHV0KCk7XG4gICAgcG9wdWxhdGVDaG9yZHMoKTtcbiAgICBpbnN0cnVtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uSW5zdHJ1bWVudElucHV0KTtcbiAgICB0dW5pbmdFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25UdW5pbmdJbnB1dCk7XG4gICAgZnJldENvdW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uRnJldENvdW50SW5wdXQpO1xuICAgIGNob3JkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uQ2hvcmRJbnB1dCk7XG4gICAgY2hvcmRFbGVtZW50LmZvY3VzKCk7XG59XG5leHBvcnRzLmluaXRpYWxpemUgPSBpbml0aWFsaXplO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFwcGx5VHlwb2dyYXBoeSA9IHZvaWQgMDtcbmNvbnN0IGNoYXJhY3RlckRpY3QgPSB7XG4gICAgJyMnOiAn4pmvJyxcbiAgICAnYic6ICfima0nLFxuICAgICcwJzogJ+KCgCcsXG4gICAgJzEnOiAn4oKBJyxcbiAgICAnMic6ICfigoInLFxuICAgICczJzogJ+KCgycsXG4gICAgJzQnOiAn4oKEJyxcbiAgICAnNSc6ICfigoUnLFxuICAgICc2JzogJ+KChicsXG4gICAgJzcnOiAn4oKHJyxcbiAgICAnOCc6ICfigognLFxuICAgICc5JzogJ+KCiScsXG59O1xuY29uc3QgcmVwbGFjZVJlZ2V4ID0gbmV3IFJlZ0V4cChgWyR7T2JqZWN0LmtleXMoY2hhcmFjdGVyRGljdCl9XWAsICdnJyk7XG5mdW5jdGlvbiBhcHBseVR5cG9ncmFwaHkodGV4dCkge1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UocmVwbGFjZVJlZ2V4LCBjID0+IGNoYXJhY3RlckRpY3RbY10pO1xufVxuZXhwb3J0cy5hcHBseVR5cG9ncmFwaHkgPSBhcHBseVR5cG9ncmFwaHk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBpbml0XzEgPSByZXF1aXJlKFwiLi91aS9pbml0XCIpO1xuKDAsIGluaXRfMS5pbml0aWFsaXplKSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9