/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/chord.ts":
/*!**********************!*\
  !*** ./src/chord.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Chord = exports.knownChordNames = void 0;
const note_1 = __webpack_require__(/*! ./note */ "./src/note.ts");
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
exports.knownChordNames = [];
for (const notes of note_1.noteNames) {
    for (const note of notes) {
        for (const suffix of Object.keys(suffixMeanings)) {
            exports.knownChordNames.push(note + suffix);
        }
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

/***/ "./src/colors.ts":
/*!***********************!*\
  !*** ./src/colors.ts ***!
  \***********************/
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

/***/ "./src/dom.ts":
/*!********************!*\
  !*** ./src/dom.ts ***!
  \********************/
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

/***/ "./src/instruments.ts":
/*!****************************!*\
  !*** ./src/instruments.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultInstrument = exports.instrumentByTuning = exports.instruments = void 0;
const tuning_1 = __webpack_require__(/*! ./tuning */ "./src/tuning.ts");
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

/***/ "./src/note.ts":
/*!*********************!*\
  !*** ./src/note.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Note = exports.noteNamePattern = exports.noteNames = void 0;
exports.noteNames = [
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
for (const [index, names] of exports.noteNames.entries()) {
    for (const name of names) {
        noteIndexByName[name] = index;
    }
}
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
        const noteName = exports.noteNames[this.pitchClass][0];
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

/***/ "./src/tuning.ts":
/*!***********************!*\
  !*** ./src/tuning.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tuning = exports.getGroup = void 0;
const note_1 = __webpack_require__(/*! ./note */ "./src/note.ts");
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

/***/ "./src/typography.ts":
/*!***************************!*\
  !*** ./src/typography.ts ***!
  \***************************/
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

/***/ "./src/ui.ts":
/*!*******************!*\
  !*** ./src/ui.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initialize = void 0;
const chord_1 = __webpack_require__(/*! ./chord */ "./src/chord.ts");
const tuning_1 = __webpack_require__(/*! ./tuning */ "./src/tuning.ts");
const instruments_1 = __webpack_require__(/*! ./instruments */ "./src/instruments.ts");
const dom_1 = __webpack_require__(/*! ./dom */ "./src/dom.ts");
const typography_1 = __webpack_require__(/*! ./typography */ "./src/typography.ts");
const colors_1 = __webpack_require__(/*! ./colors */ "./src/colors.ts");
function populateInstruments(instrumentsElement) {
    for (const instrument of Object.keys(instruments_1.instruments)) {
        instrumentsElement.appendChild((0, dom_1.createElement)('option', {
            value: instrument,
            innerText: instrument
        }));
    }
}
function populateChords(chordsDataList) {
    for (const chordName of chord_1.knownChordNames) {
        chordsDataList.appendChild((0, dom_1.createElement)('option', { value: chordName }));
    }
}
function getChordDescription(chord) {
    const notes = (0, typography_1.applyTypography)(chord.notes.join(' '));
    return (0, dom_1.createElement)('p', {
        id: 'chordDescription',
        innerText: `⟨ ${notes} ⟩`
    });
}
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
    const statusElement = (0, dom_1.getById)('status');
    const outputElement = (0, dom_1.getById)('output');
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
            outputElement.appendChild(getFretboardElement(fretboard, chord === null || chord === void 0 ? void 0 : chord.notes[0]));
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
    function onChordInput() {
        showFretboard();
    }
    populateInstruments(instrumentElement);
    instrumentElement.value = instruments_1.defaultInstrument;
    onInstrumentInput();
    populateChords((0, dom_1.getById)('chords'));
    instrumentElement.addEventListener('input', onInstrumentInput);
    tuningElement.addEventListener('input', onTuningInput);
    fretCountElement.addEventListener('input', onFretCountInput);
    chordElement.addEventListener('input', onChordInput);
    chordElement.focus();
}
exports.initialize = initialize;


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
const ui_1 = __webpack_require__(/*! ./ui */ "./src/ui.ts");
(0, ui_1.initialize)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0ZBQWdGLE1BQU07QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0UsTUFBTTtBQUM5RSx5RUFBeUUsUUFBUTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7Ozs7Ozs7VUM1SWxCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsYUFBYSxtQkFBTyxDQUFDLHlCQUFNO0FBQzNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy9jaG9yZC50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL2NvbG9ycy50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL2RvbS50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL2luc3RydW1lbnRzLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvbm90ZS50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3R1bmluZy50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3R5cG9ncmFwaHkudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2hvcmQgPSBleHBvcnRzLmtub3duQ2hvcmROYW1lcyA9IHZvaWQgMDtcbmNvbnN0IG5vdGVfMSA9IHJlcXVpcmUoXCIuL25vdGVcIik7XG4vLyBJbnRlcnZhbHMgaW4gc2VtaXRvbmVzOlxuY29uc3QgW1AxLCBtMiwgTTIsIG0zLCBNMywgUDQsIEE0LCBQNSwgbTYsIE02LCBtNywgTTddID0gQXJyYXkoMTIpLmtleXMoKTtcbmNvbnN0IHN1ZmZpeE1lYW5pbmdzID0ge1xuICAgICdtKG5vNSknOiBbUDEsIG0zXSxcbiAgICAnKG5vNSknOiBbUDEsIE0zXSxcbiAgICAnNSc6IFtQMSwgUDVdLFxuICAgICdkaW0nOiBbUDEsIG0zLCBBNF0sXG4gICAgJ3N1czInOiBbUDEsIE0yLCBQNV0sXG4gICAgJ20nOiBbUDEsIG0zLCBQNV0sXG4gICAgJyc6IFtQMSwgTTMsIFA1XSxcbiAgICAnc3VzNCc6IFtQMSwgUDQsIFA1XSxcbiAgICAnYXVnJzogW1AxLCBNMywgbTZdLFxuICAgICdtNic6IFtQMSwgbTMsIFA1LCBNNl0sXG4gICAgJzYnOiBbUDEsIE0zLCBQNSwgTTZdLFxuICAgICdtNyc6IFtQMSwgbTMsIFA1LCBtN10sXG4gICAgJ21NNyc6IFtQMSwgbTMsIFA1LCBNN10sXG4gICAgJzcnOiBbUDEsIE0zLCBQNSwgbTddLFxuICAgICdNNyc6IFtQMSwgTTMsIFA1LCBNN10sXG59O1xuZXhwb3J0cy5rbm93bkNob3JkTmFtZXMgPSBbXTtcbmZvciAoY29uc3Qgbm90ZXMgb2Ygbm90ZV8xLm5vdGVOYW1lcykge1xuICAgIGZvciAoY29uc3Qgbm90ZSBvZiBub3Rlcykge1xuICAgICAgICBmb3IgKGNvbnN0IHN1ZmZpeCBvZiBPYmplY3Qua2V5cyhzdWZmaXhNZWFuaW5ncykpIHtcbiAgICAgICAgICAgIGV4cG9ydHMua25vd25DaG9yZE5hbWVzLnB1c2gobm90ZSArIHN1ZmZpeCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5jb25zdCBjaG9yZFJlZ2V4ID0gbmV3IFJlZ0V4cChgXigke25vdGVfMS5ub3RlTmFtZVBhdHRlcm59KSguKikkYCk7XG5jbGFzcyBDaG9yZCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBjb25zdCBtYXRjaCA9IG5hbWUubWF0Y2goY2hvcmRSZWdleCk7XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgQ2FuJ3QgcGFyc2UgY2hvcmQgJHtuYW1lfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IFtfLCByb290TmFtZSwgc3VmZml4XSA9IG1hdGNoO1xuICAgICAgICBjb25zdCByb290ID0gbmV3IG5vdGVfMS5Ob3RlKHJvb3ROYW1lKTtcbiAgICAgICAgaWYgKCEoc3VmZml4IGluIHN1ZmZpeE1lYW5pbmdzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBDYW4ndCBwYXJzZSBjaG9yZCBzdWZmaXggJHtzdWZmaXh9YCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub3RlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGludGVydmFsIG9mIHN1ZmZpeE1lYW5pbmdzW3N1ZmZpeF0pIHtcbiAgICAgICAgICAgIHRoaXMubm90ZXMucHVzaChyb290LmFkZEludGVydmFsKGludGVydmFsKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9ID0gPCR7dGhpcy5ub3Rlcy5qb2luKCcgJyl9PmA7XG4gICAgfVxufVxuZXhwb3J0cy5DaG9yZCA9IENob3JkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldEdyb3VwQ29sb3IgPSB2b2lkIDA7XG5jb25zdCBwaGkgPSAoMSArIE1hdGguc3FydCg1KSkgLyAyO1xuY29uc3QgZ29sZGVuQW5nbGUgPSAyICogTWF0aC5QSSAvIChwaGkgKiBwaGkpO1xuY29uc3QgbGlnaHRuZXNzID0gMC41NTtcbmNvbnN0IHNhdHVyYXRpb24gPSAwLjY1O1xuZnVuY3Rpb24gZ2V0R3JvdXBDb2xvcihncm91cCkge1xuICAgIGNvbnN0IGh1ZSA9IGdvbGRlbkFuZ2xlICogZ3JvdXA7XG4gICAgY29uc3QgbCA9IGxpZ2h0bmVzcyAqIDEwMDtcbiAgICBjb25zdCBhID0gc2F0dXJhdGlvbiAqIE1hdGguY29zKGh1ZSkgKiAxMDA7XG4gICAgY29uc3QgYiA9IHNhdHVyYXRpb24gKiBNYXRoLnNpbihodWUpICogMTAwO1xuICAgIHJldHVybiBgb2tsYWIoJHtsLnRvRml4ZWQoMSl9JSAke2EudG9GaXhlZCgxKX0lICR7Yi50b0ZpeGVkKDEpfSUpYDtcbn1cbmV4cG9ydHMuZ2V0R3JvdXBDb2xvciA9IGdldEdyb3VwQ29sb3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGV4cG9ydHMuZ2V0QnlJZCA9IHZvaWQgMDtcbmZ1bmN0aW9uIGdldEJ5SWQoaWQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICB0aHJvdyBFcnJvcihgQ2Fubm90IGZpbmQgZWxlbWVudCB3aXRoIGlkICcke2lkfSdgKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5leHBvcnRzLmdldEJ5SWQgPSBnZXRCeUlkO1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBwcm9wZXJ0aWVzLCBzdHlsZSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgIGlmIChwcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LCBwcm9wZXJ0aWVzKTtcbiAgICB9XG4gICAgaWYgKHN0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCBzdHlsZSk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xufVxuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0SW5zdHJ1bWVudCA9IGV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nID0gZXhwb3J0cy5pbnN0cnVtZW50cyA9IHZvaWQgMDtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4vdHVuaW5nXCIpO1xuZXhwb3J0cy5pbnN0cnVtZW50cyA9IHtcbiAgICAnQmFsYWxhaWthIChhY2FkZW1pYyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFNCBFNCBBNCcpLFxuICAgICdCYWxhbGFpa2EgKGZvbGspJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzQgRTQgRzQnKSxcbiAgICAnQmFuam8nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBEMyBHMyBCMyBENCcpLFxuICAgICdCYXNzJzogbmV3IHR1bmluZ18xLlR1bmluZygnRTEgQTEgRDIgRzInKSxcbiAgICAnQnJhZ3VpbmhhJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQjQgRDUnKSxcbiAgICAnQ2hhcmFuZ28nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBDNSBFIEE0IEU1JyksXG4gICAgJ0NhdmFxdWluaG8gKFBvcnR1Z2FsIEdHQkQpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgRzQgQjQgRDUnKSxcbiAgICAnQ2F2YXF1aW5obyAoUG9ydHVnYWwgREFCRSknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENSBBNCBCNCBFNScpLFxuICAgICdDYXZhcXVpbmhvIChCcmF6aWwgREdCRCknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBCNCBENScpLFxuICAgICdDYXZhcXVpbmhvIChCcmF6aWwgREdCRSknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBCNCBFNScpLFxuICAgICdEYWxhIGZhZW5keXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFNCBBNCBFNScpLFxuICAgICdEZWNoaWcgcG9uZGFyJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzQgRDQgRzQnKSxcbiAgICAnR3VpdGFsZWxlJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTIgRDMgRzMgQzQgRTQgQTQnKSxcbiAgICAnR3VpdGFyJzogbmV3IHR1bmluZ18xLlR1bmluZygnRTIgQTIgRDMgRzMgQjMgRTQnKSxcbiAgICAnR3VpdGFycsOzbic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0ExIEQyIEcyIEMzIEUzIEEyJyksXG4gICAgJ0phcmFuYSBqYXJvY2hhJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgQzQgRSBBMyBHMycpLFxuICAgICdKYXJhbmEgaHVhc3RlY2EnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBCMyBENCBGIzQgQTQnKSxcbiAgICAnTWFuZG9saW4nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBENCBBNCBFNScpLFxuICAgICdSYWphbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEM0IEU0IEE0JyksXG4gICAgJ1JlcXVpbnRvJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTIgRDMgRzMgQzQgRTQgQTQnKSxcbiAgICAnU2VtaXN0cnVua2EnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdEMiBHMiBCMiBEMyBHMyBCMyBENCcpLFxuICAgICdUZW5vciBndWl0YXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDMyBHMyBENCBBNCcpLFxuICAgICdUaW1wbGUnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBDNSBFNCBBNCBENScpLFxuICAgICdVa3VsZWxlIChoaWdoIEcpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgQzQgRTQgQTQnKSxcbiAgICAnVWt1bGVsZSAobG93IEcpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgQzQgRTQgQTQnKSxcbiAgICAnVWt1bGVsZSAoYmFyaXRvbmUpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDMgRzMgQjMgRTQnKSxcbiAgICAnVmlodWVsYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0EzIEQ0IEc0IEIzIEU0JyksXG4gICAgJ1Zpb2xhJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzMgRzMgRDQgQTQnKSxcbiAgICAnVmlvbGluJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgRDQgQTQgRTUnKSxcbn07XG5leHBvcnRzLmluc3RydW1lbnRCeVR1bmluZyA9IHt9O1xuZm9yIChjb25zdCBbbmFtZSwgdHVuaW5nXSBvZiBPYmplY3QuZW50cmllcyhleHBvcnRzLmluc3RydW1lbnRzKSkge1xuICAgIGV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nW3R1bmluZy5kZXNjcmlwdGlvbl0gPSBuYW1lO1xuICAgIC8vIE5vdywgdGhlIGxhc3QgaW5zdHJ1bWVudCB3aXRoIHRoZSBnaXZlbiB0dW5pbmcgaXMgdXNlZC5cbiAgICAvLyBUT0RPOiBDaGFuZ2UgdGhpcyBpZiBuZWVkZWQuXG59XG5leHBvcnRzLmRlZmF1bHRJbnN0cnVtZW50ID0gJ1VrdWxlbGUgKGhpZ2ggRyknO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk5vdGUgPSBleHBvcnRzLm5vdGVOYW1lUGF0dGVybiA9IGV4cG9ydHMubm90ZU5hbWVzID0gdm9pZCAwO1xuZXhwb3J0cy5ub3RlTmFtZXMgPSBbXG4gICAgWydDJ10sIFsnQyMnLCAnRGInXSxcbiAgICBbJ0QnXSwgWydEIycsICdFYiddLFxuICAgIFsnRSddLFxuICAgIFsnRiddLCBbJ0YjJywgJ0diJ10sXG4gICAgWydHJ10sIFsnRyMnLCAnQWInXSxcbiAgICBbJ0EnXSwgWydBIycsICdCYiddLFxuICAgIFsnQiddLFxuXTtcbmNvbnN0IHVuc3VwcG9ydGVkID0ge1xuICAgICdDYic6ICdCJyxcbiAgICAnQiMnOiAnQycsXG4gICAgJ0ZiJzogJ0UnLFxuICAgICdFIyc6ICdGJyxcbn07XG5jb25zdCBub3RlSW5kZXhCeU5hbWUgPSB7fTtcbmZvciAoY29uc3QgW2luZGV4LCBuYW1lc10gb2YgZXhwb3J0cy5ub3RlTmFtZXMuZW50cmllcygpKSB7XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIG5hbWVzKSB7XG4gICAgICAgIG5vdGVJbmRleEJ5TmFtZVtuYW1lXSA9IGluZGV4O1xuICAgIH1cbn1cbmV4cG9ydHMubm90ZU5hbWVQYXR0ZXJuID0gJ1tBLUddWyNiXT8nO1xuY29uc3Qgbm90ZVJlZ2V4ID0gbmV3IFJlZ0V4cChgXigke2V4cG9ydHMubm90ZU5hbWVQYXR0ZXJufSkoXFxcXGQpPyRgKTtcbmNsYXNzIE5vdGUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBuYW1lLm1hdGNoKG5vdGVSZWdleCk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgY29uc3QgW18sIG5vdGVOYW1lLCBvY3RhdmVOYW1lXSA9IG1hdGNoO1xuICAgICAgICAgICAgaWYgKG5vdGVOYW1lIGluIHVuc3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbiA9IHVuc3VwcG9ydGVkW25vdGVOYW1lXTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVzZSAke3N1Z2dlc3Rpb259IGluc3RlYWQgb2YgJHtub3RlTmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGl0Y2hDbGFzcyA9IG5vdGVJbmRleEJ5TmFtZVtub3RlTmFtZV07XG4gICAgICAgICAgICB0aGlzLm9jdGF2ZSA9IG9jdGF2ZU5hbWUgIT09IHVuZGVmaW5lZCA/IHBhcnNlSW50KG9jdGF2ZU5hbWUpIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBDYW4ndCBwYXJzZSBub3RlICR7bmFtZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgZnJvbVBpdGNoQ2xhc3NBbmRPY3RhdmUocGl0Y2hDbGFzcywgb2N0YXZlKSB7XG4gICAgICAgIGxldCBub3RlID0gT2JqZWN0LmNyZWF0ZShOb3RlLnByb3RvdHlwZSk7XG4gICAgICAgIG5vdGUucGl0Y2hDbGFzcyA9IHBpdGNoQ2xhc3M7XG4gICAgICAgIG5vdGUub2N0YXZlID0gb2N0YXZlO1xuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIGNvbnN0IG5vdGVOYW1lID0gZXhwb3J0cy5ub3RlTmFtZXNbdGhpcy5waXRjaENsYXNzXVswXTtcbiAgICAgICAgcmV0dXJuIHRoaXMub2N0YXZlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gYCR7bm90ZU5hbWV9JHt0aGlzLm9jdGF2ZX1gXG4gICAgICAgICAgICA6IG5vdGVOYW1lO1xuICAgIH1cbiAgICBhZGRJbnRlcnZhbChpbnRlcnZhbCkge1xuICAgICAgICBjb25zdCBwaXRjaCA9IHRoaXMucGl0Y2hDbGFzcyArIGludGVydmFsO1xuICAgICAgICBjb25zdCBvY3RhdmUgPSB0aGlzLm9jdGF2ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHRoaXMub2N0YXZlICsgTWF0aC5mbG9vcihwaXRjaCAvIDEyKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBOb3RlLmZyb21QaXRjaENsYXNzQW5kT2N0YXZlKHBpdGNoICUgMTIsIG9jdGF2ZSk7IC8vIGluY29ycmVjdCBmb3IgbmVnYXRpdmUgaW50ZXJ2YWxzXG4gICAgfVxufVxuZXhwb3J0cy5Ob3RlID0gTm90ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UdW5pbmcgPSBleHBvcnRzLmdldEdyb3VwID0gdm9pZCAwO1xuY29uc3Qgbm90ZV8xID0gcmVxdWlyZShcIi4vbm90ZVwiKTtcbmNvbnN0IHNwbGl0UmVnZXggPSAvXFxzK3woPz1bQS1aXSkvOyAvLyBzcGxpdCBieSB3aGl0ZXNwYWNlIG9yIGJlZm9yZSB1cHBlcmNhc2UgbGV0dGVyc1xuZnVuY3Rpb24gZ2V0RnJldHMob3BlblN0cmluZywgYWxsb3dlZFBpdGNoZXMsIGZyZXRDb3VudCkge1xuICAgIGNvbnN0IGZyZXRzID0gW107XG4gICAgZm9yIChsZXQgZnJldEluZGV4ID0gMDsgZnJldEluZGV4IDw9IGZyZXRDb3VudDsgZnJldEluZGV4KyspIHtcbiAgICAgICAgY29uc3Qgbm90ZSA9IG9wZW5TdHJpbmcuYWRkSW50ZXJ2YWwoZnJldEluZGV4KTtcbiAgICAgICAgZnJldHMucHVzaChhbGxvd2VkUGl0Y2hlcy5oYXMobm90ZS5waXRjaENsYXNzKSA/IG5vdGUgOiBudWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXRzO1xufVxuZnVuY3Rpb24gZ2V0R3JvdXAocm9vdE5vdGUsIG5vdGUpIHtcbiAgICBpZiAobm90ZSAhPT0gbnVsbCAmJiBub3RlLm9jdGF2ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKChub3RlLm9jdGF2ZSAqIDEyICsgbm90ZS5waXRjaENsYXNzIC0gcm9vdE5vdGUucGl0Y2hDbGFzcykgLyAxMik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0R3JvdXAgPSBnZXRHcm91cDtcbmNsYXNzIFR1bmluZyB7XG4gICAgY29uc3RydWN0b3IoZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5vcGVuU3RyaW5ncyA9IGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAuc3BsaXQoc3BsaXRSZWdleClcbiAgICAgICAgICAgIC5maWx0ZXIobiA9PiBuICE9PSAnJylcbiAgICAgICAgICAgIC5tYXAobiA9PiBuZXcgbm90ZV8xLk5vdGUobikpO1xuICAgICAgICBpZiAodGhpcy5vcGVuU3RyaW5ncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXQgbGVhc3Qgb25lIG9wZW4gc3RyaW5nIHJlcXVpcmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMub3BlblN0cmluZ3Muam9pbignICcpO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGBUdW5pbmcoXCIke3RoaXMuZGVzY3JpcHRpb259XCIpYDtcbiAgICB9XG4gICAgZ2V0RnJldGJvYXJkKGNob3JkLCBmcmV0Q291bnQgPSAxMikge1xuICAgICAgICBjb25zdCBhbGxvd2VkUGl0Y2hlcyA9IGNob3JkICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gY2hvcmQubm90ZXMubWFwKG4gPT4gbi5waXRjaENsYXNzKVxuICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXMub3BlblN0cmluZ3MubWFwKHMgPT4gZ2V0RnJldHMocywgbmV3IFNldChhbGxvd2VkUGl0Y2hlcyksIGZyZXRDb3VudCkpO1xuICAgIH1cbn1cbmV4cG9ydHMuVHVuaW5nID0gVHVuaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFwcGx5VHlwb2dyYXBoeSA9IHZvaWQgMDtcbmNvbnN0IGNoYXJhY3RlckRpY3QgPSB7XG4gICAgJyMnOiAn4pmvJyxcbiAgICAnYic6ICfima0nLFxuICAgICcwJzogJ+KCgCcsXG4gICAgJzEnOiAn4oKBJyxcbiAgICAnMic6ICfigoInLFxuICAgICczJzogJ+KCgycsXG4gICAgJzQnOiAn4oKEJyxcbiAgICAnNSc6ICfigoUnLFxuICAgICc2JzogJ+KChicsXG4gICAgJzcnOiAn4oKHJyxcbiAgICAnOCc6ICfigognLFxuICAgICc5JzogJ+KCiScsXG59O1xuY29uc3QgcmVwbGFjZVJlZ2V4ID0gbmV3IFJlZ0V4cChgWyR7T2JqZWN0LmtleXMoY2hhcmFjdGVyRGljdCl9XWAsICdnJyk7XG5mdW5jdGlvbiBhcHBseVR5cG9ncmFwaHkodGV4dCkge1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UocmVwbGFjZVJlZ2V4LCBjID0+IGNoYXJhY3RlckRpY3RbY10pO1xufVxuZXhwb3J0cy5hcHBseVR5cG9ncmFwaHkgPSBhcHBseVR5cG9ncmFwaHk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZSA9IHZvaWQgMDtcbmNvbnN0IGNob3JkXzEgPSByZXF1aXJlKFwiLi9jaG9yZFwiKTtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4vdHVuaW5nXCIpO1xuY29uc3QgaW5zdHJ1bWVudHNfMSA9IHJlcXVpcmUoXCIuL2luc3RydW1lbnRzXCIpO1xuY29uc3QgZG9tXzEgPSByZXF1aXJlKFwiLi9kb21cIik7XG5jb25zdCB0eXBvZ3JhcGh5XzEgPSByZXF1aXJlKFwiLi90eXBvZ3JhcGh5XCIpO1xuY29uc3QgY29sb3JzXzEgPSByZXF1aXJlKFwiLi9jb2xvcnNcIik7XG5mdW5jdGlvbiBwb3B1bGF0ZUluc3RydW1lbnRzKGluc3RydW1lbnRzRWxlbWVudCkge1xuICAgIGZvciAoY29uc3QgaW5zdHJ1bWVudCBvZiBPYmplY3Qua2V5cyhpbnN0cnVtZW50c18xLmluc3RydW1lbnRzKSkge1xuICAgICAgICBpbnN0cnVtZW50c0VsZW1lbnQuYXBwZW5kQ2hpbGQoKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdvcHRpb24nLCB7XG4gICAgICAgICAgICB2YWx1ZTogaW5zdHJ1bWVudCxcbiAgICAgICAgICAgIGlubmVyVGV4dDogaW5zdHJ1bWVudFxuICAgICAgICB9KSk7XG4gICAgfVxufVxuZnVuY3Rpb24gcG9wdWxhdGVDaG9yZHMoY2hvcmRzRGF0YUxpc3QpIHtcbiAgICBmb3IgKGNvbnN0IGNob3JkTmFtZSBvZiBjaG9yZF8xLmtub3duQ2hvcmROYW1lcykge1xuICAgICAgICBjaG9yZHNEYXRhTGlzdC5hcHBlbmRDaGlsZCgoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ29wdGlvbicsIHsgdmFsdWU6IGNob3JkTmFtZSB9KSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0Q2hvcmREZXNjcmlwdGlvbihjaG9yZCkge1xuICAgIGNvbnN0IG5vdGVzID0gKDAsIHR5cG9ncmFwaHlfMS5hcHBseVR5cG9ncmFwaHkpKGNob3JkLm5vdGVzLmpvaW4oJyAnKSk7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcsIHtcbiAgICAgICAgaWQ6ICdjaG9yZERlc2NyaXB0aW9uJyxcbiAgICAgICAgaW5uZXJUZXh0OiBg4p+oICR7bm90ZXN9IOKfqWBcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGdldEZyZXRIZWFkZXJFbGVtZW50KGZyZXRDb3VudCkge1xuICAgIGNvbnN0IGZyZXRIZWFkZXJFbGVtZW50ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJywge1xuICAgICAgICBjbGFzc05hbWU6ICdmcmV0SGVhZGVyJ1xuICAgIH0pO1xuICAgIGZvciAoY29uc3QgZnJldEluZGV4IG9mIEFycmF5KGZyZXRDb3VudCkua2V5cygpKSB7XG4gICAgICAgIGZyZXRIZWFkZXJFbGVtZW50LmFwcGVuZENoaWxkKCgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnc3BhbicsIHtcbiAgICAgICAgICAgIGlubmVyVGV4dDogZnJldEluZGV4LnRvU3RyaW5nKClcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldEhlYWRlckVsZW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRGcmV0RWxlbWVudChmcmV0Tm90ZSwgcm9vdE5vdGUpIHtcbiAgICBjb25zdCBpbm5lclRleHQgPSBmcmV0Tm90ZSAhPT0gbnVsbFxuICAgICAgICA/ICgwLCB0eXBvZ3JhcGh5XzEuYXBwbHlUeXBvZ3JhcGh5KShmcmV0Tm90ZS50b1N0cmluZygpKVxuICAgICAgICA6ICfCtyc7XG4gICAgY29uc3QgZ3JvdXAgPSByb290Tm90ZSAhPT0gdW5kZWZpbmVkID8gKDAsIHR1bmluZ18xLmdldEdyb3VwKShyb290Tm90ZSwgZnJldE5vdGUpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGNvbG9yID0gZ3JvdXAgIT09IHVuZGVmaW5lZCA/ICgwLCBjb2xvcnNfMS5nZXRHcm91cENvbG9yKShncm91cCkgOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnc3BhbicsIHsgaW5uZXJUZXh0IH0sIHsgY29sb3IgfSk7XG59XG5mdW5jdGlvbiBnZXRGcmV0dGVkU3RyaW5nRWxlbWVudChmcmV0dGVkU3RyaW5nLCByb290Tm90ZSkge1xuICAgIGNvbnN0IGZyZXR0ZWRTdHJpbmdFbGVtZW50ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJyk7XG4gICAgZm9yIChjb25zdCBmcmV0Tm90ZSBvZiBmcmV0dGVkU3RyaW5nKSB7XG4gICAgICAgIGZyZXR0ZWRTdHJpbmdFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXRFbGVtZW50KGZyZXROb3RlLCByb290Tm90ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldHRlZFN0cmluZ0VsZW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRGcmV0Ym9hcmRFbGVtZW50KGZyZXRib2FyZCwgcm9vdE5vdGUpIHtcbiAgICBjb25zdCBmcmV0Ym9hcmRFbGVtZW50ID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdkaXYnLCB7IGlkOiAnZnJldGJvYXJkJyB9KTtcbiAgICBmcmV0Ym9hcmRFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXRIZWFkZXJFbGVtZW50KGZyZXRib2FyZFswXS5sZW5ndGgpKTtcbiAgICBmb3IgKGNvbnN0IGZyZXR0ZWRTdHJpbmcgb2YgWy4uLmZyZXRib2FyZF0ucmV2ZXJzZSgpKSB7XG4gICAgICAgIGZyZXRib2FyZEVsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0RnJldHRlZFN0cmluZ0VsZW1lbnQoZnJldHRlZFN0cmluZywgcm9vdE5vdGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXRib2FyZEVsZW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRFcnJvckVsZW1lbnQobWVzc2FnZSkge1xuICAgIHJldHVybiAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3AnLCB7XG4gICAgICAgIGlkOiAnZXJyb3InLFxuICAgICAgICBpbm5lclRleHQ6IG1lc3NhZ2VcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgY29uc3QgaW5zdHJ1bWVudEVsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2luc3RydW1lbnQnKTtcbiAgICBjb25zdCB0dW5pbmdFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCd0dW5pbmcnKTtcbiAgICBjb25zdCBmcmV0Q291bnRFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdmcmV0Q291bnQnKTtcbiAgICBjb25zdCBjaG9yZEVsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2Nob3JkJyk7XG4gICAgY29uc3Qgc3RhdHVzRWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnc3RhdHVzJyk7XG4gICAgY29uc3Qgb3V0cHV0RWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnb3V0cHV0Jyk7XG4gICAgZnVuY3Rpb24gc2hvd0ZyZXRib2FyZCgpIHtcbiAgICAgICAgY29uc3QgdHVuaW5nRGVzY3JpcHRpb24gPSB0dW5pbmdFbGVtZW50LnZhbHVlLnRyaW0oKTtcbiAgICAgICAgY29uc3QgY2hvcmROYW1lID0gY2hvcmRFbGVtZW50LnZhbHVlLnRyaW0oKTtcbiAgICAgICAgY29uc3QgZnJldENvdW50ID0gcGFyc2VJbnQoZnJldENvdW50RWxlbWVudC52YWx1ZSk7XG4gICAgICAgIHN0YXR1c0VsZW1lbnQucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgIG91dHB1dEVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0dW5pbmcgPSBuZXcgdHVuaW5nXzEuVHVuaW5nKHR1bmluZ0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGxldCBjaG9yZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChjaG9yZE5hbWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY2hvcmQgPSBuZXcgY2hvcmRfMS5DaG9yZChjaG9yZE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNFbGVtZW50LmFwcGVuZENoaWxkKGdldENob3JkRGVzY3JpcHRpb24oY2hvcmQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGAke2Vycm9yfWA7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0VsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0RXJyb3JFbGVtZW50KG1lc3NhZ2UpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmcmV0Ym9hcmQgPSB0dW5pbmcuZ2V0RnJldGJvYXJkKGNob3JkLCBmcmV0Q291bnQpO1xuICAgICAgICAgICAgb3V0cHV0RWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0Ym9hcmRFbGVtZW50KGZyZXRib2FyZCwgY2hvcmQgPT09IG51bGwgfHwgY2hvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNob3JkLm5vdGVzWzBdKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBgJHtlcnJvcn1gO1xuICAgICAgICAgICAgc3RhdHVzRWxlbWVudC5hcHBlbmRDaGlsZChnZXRFcnJvckVsZW1lbnQoYEludmFsaWQgdHVuaW5nOiAke21lc3NhZ2V9YCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uSW5zdHJ1bWVudElucHV0KCkge1xuICAgICAgICBjb25zdCBpbnN0cnVtZW50ID0gaW5zdHJ1bWVudEVsZW1lbnQudmFsdWU7XG4gICAgICAgIGlmIChpbnN0cnVtZW50IGluIGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHR1bmluZyA9IGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudHNbaW5zdHJ1bWVudF07XG4gICAgICAgICAgICB0dW5pbmdFbGVtZW50LnZhbHVlID0gdHVuaW5nLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgc2hvd0ZyZXRib2FyZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uVHVuaW5nSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IHR1bmluZ0Rlc2NyaXB0aW9uID0gdHVuaW5nRWxlbWVudC52YWx1ZTtcbiAgICAgICAgbGV0IGluc3RydW1lbnQgPSAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHR1bmluZyA9IG5ldyB0dW5pbmdfMS5UdW5pbmcodHVuaW5nRGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgaWYgKHR1bmluZy5kZXNjcmlwdGlvbiBpbiBpbnN0cnVtZW50c18xLmluc3RydW1lbnRCeVR1bmluZykge1xuICAgICAgICAgICAgICAgIGluc3RydW1lbnQgPSBpbnN0cnVtZW50c18xLmluc3RydW1lbnRCeVR1bmluZ1t0dW5pbmcuZGVzY3JpcHRpb25dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChfYSkgeyB9XG4gICAgICAgIGluc3RydW1lbnRFbGVtZW50LnZhbHVlID0gaW5zdHJ1bWVudDtcbiAgICAgICAgc2hvd0ZyZXRib2FyZCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbkZyZXRDb3VudElucHV0KCkge1xuICAgICAgICBzaG93RnJldGJvYXJkKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uQ2hvcmRJbnB1dCgpIHtcbiAgICAgICAgc2hvd0ZyZXRib2FyZCgpO1xuICAgIH1cbiAgICBwb3B1bGF0ZUluc3RydW1lbnRzKGluc3RydW1lbnRFbGVtZW50KTtcbiAgICBpbnN0cnVtZW50RWxlbWVudC52YWx1ZSA9IGluc3RydW1lbnRzXzEuZGVmYXVsdEluc3RydW1lbnQ7XG4gICAgb25JbnN0cnVtZW50SW5wdXQoKTtcbiAgICBwb3B1bGF0ZUNob3JkcygoMCwgZG9tXzEuZ2V0QnlJZCkoJ2Nob3JkcycpKTtcbiAgICBpbnN0cnVtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uSW5zdHJ1bWVudElucHV0KTtcbiAgICB0dW5pbmdFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25UdW5pbmdJbnB1dCk7XG4gICAgZnJldENvdW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uRnJldENvdW50SW5wdXQpO1xuICAgIGNob3JkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uQ2hvcmRJbnB1dCk7XG4gICAgY2hvcmRFbGVtZW50LmZvY3VzKCk7XG59XG5leHBvcnRzLmluaXRpYWxpemUgPSBpbml0aWFsaXplO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdWlfMSA9IHJlcXVpcmUoXCIuL3VpXCIpO1xuKDAsIHVpXzEuaW5pdGlhbGl6ZSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==