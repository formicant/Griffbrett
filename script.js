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
const notes = note_1.noteNames.flat();
notes.sort();
const suffixes = Object.keys(suffixMeanings);
suffixes.sort();
for (const note of notes) {
    for (const suffix of suffixes) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLGNBQWM7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0ZBQWdGLE1BQU07QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0UsTUFBTTtBQUM5RSx5RUFBeUUsUUFBUTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjs7Ozs7OztVQzNKbEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxhQUFhLG1CQUFPLENBQUMseUJBQU07QUFDM0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL2Nob3JkLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvY29sb3JzLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvZG9tLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvaW5zdHJ1bWVudHMudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy9ub3RlLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdHVuaW5nLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdHlwb2dyYXBoeS50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DaG9yZCA9IGV4cG9ydHMua25vd25DaG9yZE5hbWVzID0gdm9pZCAwO1xuY29uc3Qgbm90ZV8xID0gcmVxdWlyZShcIi4vbm90ZVwiKTtcbi8vIEludGVydmFscyBpbiBzZW1pdG9uZXM6XG5jb25zdCBbUDEsIG0yLCBNMiwgbTMsIE0zLCBQNCwgQTQsIFA1LCBtNiwgTTYsIG03LCBNN10gPSBBcnJheSgxMikua2V5cygpO1xuY29uc3Qgc3VmZml4TWVhbmluZ3MgPSB7XG4gICAgJ20obm81KSc6IFtQMSwgbTNdLFxuICAgICcobm81KSc6IFtQMSwgTTNdLFxuICAgICc1JzogW1AxLCBQNV0sXG4gICAgJ2RpbSc6IFtQMSwgbTMsIEE0XSxcbiAgICAnc3VzMic6IFtQMSwgTTIsIFA1XSxcbiAgICAnbSc6IFtQMSwgbTMsIFA1XSxcbiAgICAnJzogW1AxLCBNMywgUDVdLFxuICAgICdzdXM0JzogW1AxLCBQNCwgUDVdLFxuICAgICdhdWcnOiBbUDEsIE0zLCBtNl0sXG4gICAgJ202JzogW1AxLCBtMywgUDUsIE02XSxcbiAgICAnNic6IFtQMSwgTTMsIFA1LCBNNl0sXG4gICAgJ203JzogW1AxLCBtMywgUDUsIG03XSxcbiAgICAnbU03JzogW1AxLCBtMywgUDUsIE03XSxcbiAgICAnNyc6IFtQMSwgTTMsIFA1LCBtN10sXG4gICAgJ003JzogW1AxLCBNMywgUDUsIE03XSxcbn07XG5leHBvcnRzLmtub3duQ2hvcmROYW1lcyA9IFtdO1xuY29uc3Qgbm90ZXMgPSBub3RlXzEubm90ZU5hbWVzLmZsYXQoKTtcbm5vdGVzLnNvcnQoKTtcbmNvbnN0IHN1ZmZpeGVzID0gT2JqZWN0LmtleXMoc3VmZml4TWVhbmluZ3MpO1xuc3VmZml4ZXMuc29ydCgpO1xuZm9yIChjb25zdCBub3RlIG9mIG5vdGVzKSB7XG4gICAgZm9yIChjb25zdCBzdWZmaXggb2Ygc3VmZml4ZXMpIHtcbiAgICAgICAgZXhwb3J0cy5rbm93bkNob3JkTmFtZXMucHVzaChub3RlICsgc3VmZml4KTtcbiAgICB9XG59XG5jb25zdCBjaG9yZFJlZ2V4ID0gbmV3IFJlZ0V4cChgXigke25vdGVfMS5ub3RlTmFtZVBhdHRlcm59KSguKikkYCk7XG5jbGFzcyBDaG9yZCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBjb25zdCBtYXRjaCA9IG5hbWUubWF0Y2goY2hvcmRSZWdleCk7XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgQ2FuJ3QgcGFyc2UgY2hvcmQgJHtuYW1lfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IFtfLCByb290TmFtZSwgc3VmZml4XSA9IG1hdGNoO1xuICAgICAgICBjb25zdCByb290ID0gbmV3IG5vdGVfMS5Ob3RlKHJvb3ROYW1lKTtcbiAgICAgICAgaWYgKCEoc3VmZml4IGluIHN1ZmZpeE1lYW5pbmdzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBDYW4ndCBwYXJzZSBjaG9yZCBzdWZmaXggJHtzdWZmaXh9YCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub3RlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGludGVydmFsIG9mIHN1ZmZpeE1lYW5pbmdzW3N1ZmZpeF0pIHtcbiAgICAgICAgICAgIHRoaXMubm90ZXMucHVzaChyb290LmFkZEludGVydmFsKGludGVydmFsKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9ID0gPCR7dGhpcy5ub3Rlcy5qb2luKCcgJyl9PmA7XG4gICAgfVxufVxuZXhwb3J0cy5DaG9yZCA9IENob3JkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldEdyb3VwQ29sb3IgPSB2b2lkIDA7XG5jb25zdCBwaGkgPSAoMSArIE1hdGguc3FydCg1KSkgLyAyO1xuY29uc3QgZ29sZGVuQW5nbGUgPSAyICogTWF0aC5QSSAvIChwaGkgKiBwaGkpO1xuY29uc3QgbGlnaHRuZXNzID0gMC41NTtcbmNvbnN0IHNhdHVyYXRpb24gPSAwLjY1O1xuZnVuY3Rpb24gZ2V0R3JvdXBDb2xvcihncm91cCkge1xuICAgIGNvbnN0IGh1ZSA9IGdvbGRlbkFuZ2xlICogZ3JvdXA7XG4gICAgY29uc3QgbCA9IGxpZ2h0bmVzcyAqIDEwMDtcbiAgICBjb25zdCBhID0gc2F0dXJhdGlvbiAqIE1hdGguY29zKGh1ZSkgKiAxMDA7XG4gICAgY29uc3QgYiA9IHNhdHVyYXRpb24gKiBNYXRoLnNpbihodWUpICogMTAwO1xuICAgIHJldHVybiBgb2tsYWIoJHtsLnRvRml4ZWQoMSl9JSAke2EudG9GaXhlZCgxKX0lICR7Yi50b0ZpeGVkKDEpfSUpYDtcbn1cbmV4cG9ydHMuZ2V0R3JvdXBDb2xvciA9IGdldEdyb3VwQ29sb3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGV4cG9ydHMuZ2V0QnlJZCA9IHZvaWQgMDtcbmZ1bmN0aW9uIGdldEJ5SWQoaWQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICB0aHJvdyBFcnJvcihgQ2Fubm90IGZpbmQgZWxlbWVudCB3aXRoIGlkICcke2lkfSdgKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5leHBvcnRzLmdldEJ5SWQgPSBnZXRCeUlkO1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBwcm9wZXJ0aWVzLCBzdHlsZSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgIGlmIChwcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LCBwcm9wZXJ0aWVzKTtcbiAgICB9XG4gICAgaWYgKHN0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCBzdHlsZSk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xufVxuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0SW5zdHJ1bWVudCA9IGV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nID0gZXhwb3J0cy5pbnN0cnVtZW50cyA9IHZvaWQgMDtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4vdHVuaW5nXCIpO1xuZXhwb3J0cy5pbnN0cnVtZW50cyA9IHtcbiAgICAnQmFsYWxhaWthIChhY2FkZW1pYyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFNCBFNCBBNCcpLFxuICAgICdCYWxhbGFpa2EgKGZvbGspJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzQgRTQgRzQnKSxcbiAgICAnQmFuam8nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBEMyBHMyBCMyBENCcpLFxuICAgICdCYXNzJzogbmV3IHR1bmluZ18xLlR1bmluZygnRTEgQTEgRDIgRzInKSxcbiAgICAnQnJhZ3VpbmhhJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQjQgRDUnKSxcbiAgICAnQ2hhcmFuZ28nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBDNSBFIEE0IEU1JyksXG4gICAgJ0NhdmFxdWluaG8gKFBvcnR1Z2FsIEdHQkQpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgRzQgQjQgRDUnKSxcbiAgICAnQ2F2YXF1aW5obyAoUG9ydHVnYWwgREFCRSknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENSBBNCBCNCBFNScpLFxuICAgICdDYXZhcXVpbmhvIChCcmF6aWwgREdCRCknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBCNCBENScpLFxuICAgICdDYXZhcXVpbmhvIChCcmF6aWwgREdCRSknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBCNCBFNScpLFxuICAgICdEYWxhIGZhZW5keXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFNCBBNCBFNScpLFxuICAgICdEZWNoaWcgcG9uZGFyJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzQgRDQgRzQnKSxcbiAgICAnR3VpdGFsZWxlJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTIgRDMgRzMgQzQgRTQgQTQnKSxcbiAgICAnR3VpdGFyJzogbmV3IHR1bmluZ18xLlR1bmluZygnRTIgQTIgRDMgRzMgQjMgRTQnKSxcbiAgICAnR3VpdGFycsOzbic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0ExIEQyIEcyIEMzIEUzIEEyJyksXG4gICAgJ0phcmFuYSBqYXJvY2hhJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgQzQgRSBBMyBHMycpLFxuICAgICdKYXJhbmEgaHVhc3RlY2EnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBCMyBENCBGIzQgQTQnKSxcbiAgICAnTWFuZG9saW4nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBENCBBNCBFNScpLFxuICAgICdSYWphbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEM0IEU0IEE0JyksXG4gICAgJ1JlcXVpbnRvJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTIgRDMgRzMgQzQgRTQgQTQnKSxcbiAgICAnU2VtaXN0cnVua2EnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdEMiBHMiBCMiBEMyBHMyBCMyBENCcpLFxuICAgICdUZW5vciBndWl0YXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDMyBHMyBENCBBNCcpLFxuICAgICdUaW1wbGUnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBDNSBFNCBBNCBENScpLFxuICAgICdVa3VsZWxlIChoaWdoIEcpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgQzQgRTQgQTQnKSxcbiAgICAnVWt1bGVsZSAobG93IEcpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgQzQgRTQgQTQnKSxcbiAgICAnVWt1bGVsZSAoYmFyaXRvbmUpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDMgRzMgQjMgRTQnKSxcbiAgICAnVmlodWVsYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0EzIEQ0IEc0IEIzIEU0JyksXG4gICAgJ1Zpb2xhJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzMgRzMgRDQgQTQnKSxcbiAgICAnVmlvbGluJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgRDQgQTQgRTUnKSxcbn07XG5leHBvcnRzLmluc3RydW1lbnRCeVR1bmluZyA9IHt9O1xuZm9yIChjb25zdCBbbmFtZSwgdHVuaW5nXSBvZiBPYmplY3QuZW50cmllcyhleHBvcnRzLmluc3RydW1lbnRzKSkge1xuICAgIGV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nW3R1bmluZy5kZXNjcmlwdGlvbl0gPSBuYW1lO1xuICAgIC8vIE5vdywgdGhlIGxhc3QgaW5zdHJ1bWVudCB3aXRoIHRoZSBnaXZlbiB0dW5pbmcgaXMgdXNlZC5cbiAgICAvLyBUT0RPOiBDaGFuZ2UgdGhpcyBpZiBuZWVkZWQuXG59XG5leHBvcnRzLmRlZmF1bHRJbnN0cnVtZW50ID0gJ1VrdWxlbGUgKGhpZ2ggRyknO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk5vdGUgPSBleHBvcnRzLm5vdGVOYW1lUGF0dGVybiA9IGV4cG9ydHMubm90ZU5hbWVzID0gdm9pZCAwO1xuZXhwb3J0cy5ub3RlTmFtZXMgPSBbXG4gICAgWydDJ10sIFsnQyMnLCAnRGInXSxcbiAgICBbJ0QnXSwgWydEIycsICdFYiddLFxuICAgIFsnRSddLFxuICAgIFsnRiddLCBbJ0YjJywgJ0diJ10sXG4gICAgWydHJ10sIFsnRyMnLCAnQWInXSxcbiAgICBbJ0EnXSwgWydBIycsICdCYiddLFxuICAgIFsnQiddLFxuXTtcbmNvbnN0IHVuc3VwcG9ydGVkID0ge1xuICAgICdDYic6ICdCJyxcbiAgICAnQiMnOiAnQycsXG4gICAgJ0ZiJzogJ0UnLFxuICAgICdFIyc6ICdGJyxcbn07XG5jb25zdCBub3RlSW5kZXhCeU5hbWUgPSB7fTtcbmZvciAoY29uc3QgW2luZGV4LCBuYW1lc10gb2YgZXhwb3J0cy5ub3RlTmFtZXMuZW50cmllcygpKSB7XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIG5hbWVzKSB7XG4gICAgICAgIG5vdGVJbmRleEJ5TmFtZVtuYW1lXSA9IGluZGV4O1xuICAgIH1cbn1cbmV4cG9ydHMubm90ZU5hbWVQYXR0ZXJuID0gJ1tBLUddWyNiXT8nO1xuY29uc3Qgbm90ZVJlZ2V4ID0gbmV3IFJlZ0V4cChgXigke2V4cG9ydHMubm90ZU5hbWVQYXR0ZXJufSkoXFxcXGQpPyRgKTtcbmNsYXNzIE5vdGUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBuYW1lLm1hdGNoKG5vdGVSZWdleCk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgY29uc3QgW18sIG5vdGVOYW1lLCBvY3RhdmVOYW1lXSA9IG1hdGNoO1xuICAgICAgICAgICAgaWYgKG5vdGVOYW1lIGluIHVuc3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbiA9IHVuc3VwcG9ydGVkW25vdGVOYW1lXTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVzZSAke3N1Z2dlc3Rpb259IGluc3RlYWQgb2YgJHtub3RlTmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGl0Y2hDbGFzcyA9IG5vdGVJbmRleEJ5TmFtZVtub3RlTmFtZV07XG4gICAgICAgICAgICB0aGlzLm9jdGF2ZSA9IG9jdGF2ZU5hbWUgIT09IHVuZGVmaW5lZCA/IHBhcnNlSW50KG9jdGF2ZU5hbWUpIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBDYW4ndCBwYXJzZSBub3RlICR7bmFtZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgZnJvbVBpdGNoQ2xhc3NBbmRPY3RhdmUocGl0Y2hDbGFzcywgb2N0YXZlKSB7XG4gICAgICAgIGxldCBub3RlID0gT2JqZWN0LmNyZWF0ZShOb3RlLnByb3RvdHlwZSk7XG4gICAgICAgIG5vdGUucGl0Y2hDbGFzcyA9IHBpdGNoQ2xhc3M7XG4gICAgICAgIG5vdGUub2N0YXZlID0gb2N0YXZlO1xuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIGNvbnN0IG5vdGVOYW1lID0gZXhwb3J0cy5ub3RlTmFtZXNbdGhpcy5waXRjaENsYXNzXVswXTtcbiAgICAgICAgcmV0dXJuIHRoaXMub2N0YXZlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gYCR7bm90ZU5hbWV9JHt0aGlzLm9jdGF2ZX1gXG4gICAgICAgICAgICA6IG5vdGVOYW1lO1xuICAgIH1cbiAgICBhZGRJbnRlcnZhbChpbnRlcnZhbCkge1xuICAgICAgICBjb25zdCBwaXRjaCA9IHRoaXMucGl0Y2hDbGFzcyArIGludGVydmFsO1xuICAgICAgICBjb25zdCBvY3RhdmUgPSB0aGlzLm9jdGF2ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHRoaXMub2N0YXZlICsgTWF0aC5mbG9vcihwaXRjaCAvIDEyKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBOb3RlLmZyb21QaXRjaENsYXNzQW5kT2N0YXZlKHBpdGNoICUgMTIsIG9jdGF2ZSk7IC8vIGluY29ycmVjdCBmb3IgbmVnYXRpdmUgaW50ZXJ2YWxzXG4gICAgfVxufVxuZXhwb3J0cy5Ob3RlID0gTm90ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UdW5pbmcgPSBleHBvcnRzLmdldEdyb3VwID0gdm9pZCAwO1xuY29uc3Qgbm90ZV8xID0gcmVxdWlyZShcIi4vbm90ZVwiKTtcbmNvbnN0IHNwbGl0UmVnZXggPSAvXFxzK3woPz1bQS1aXSkvOyAvLyBzcGxpdCBieSB3aGl0ZXNwYWNlIG9yIGJlZm9yZSB1cHBlcmNhc2UgbGV0dGVyc1xuZnVuY3Rpb24gZ2V0RnJldHMob3BlblN0cmluZywgYWxsb3dlZFBpdGNoZXMsIGZyZXRDb3VudCkge1xuICAgIGNvbnN0IGZyZXRzID0gW107XG4gICAgZm9yIChsZXQgZnJldEluZGV4ID0gMDsgZnJldEluZGV4IDw9IGZyZXRDb3VudDsgZnJldEluZGV4KyspIHtcbiAgICAgICAgY29uc3Qgbm90ZSA9IG9wZW5TdHJpbmcuYWRkSW50ZXJ2YWwoZnJldEluZGV4KTtcbiAgICAgICAgZnJldHMucHVzaChhbGxvd2VkUGl0Y2hlcy5oYXMobm90ZS5waXRjaENsYXNzKSA/IG5vdGUgOiBudWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXRzO1xufVxuZnVuY3Rpb24gZ2V0R3JvdXAocm9vdE5vdGUsIG5vdGUpIHtcbiAgICBpZiAobm90ZSAhPT0gbnVsbCAmJiBub3RlLm9jdGF2ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKChub3RlLm9jdGF2ZSAqIDEyICsgbm90ZS5waXRjaENsYXNzIC0gcm9vdE5vdGUucGl0Y2hDbGFzcykgLyAxMik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0R3JvdXAgPSBnZXRHcm91cDtcbmNsYXNzIFR1bmluZyB7XG4gICAgY29uc3RydWN0b3IoZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5vcGVuU3RyaW5ncyA9IGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAuc3BsaXQoc3BsaXRSZWdleClcbiAgICAgICAgICAgIC5maWx0ZXIobiA9PiBuICE9PSAnJylcbiAgICAgICAgICAgIC5tYXAobiA9PiBuZXcgbm90ZV8xLk5vdGUobikpO1xuICAgICAgICBpZiAodGhpcy5vcGVuU3RyaW5ncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXQgbGVhc3Qgb25lIG9wZW4gc3RyaW5nIHJlcXVpcmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMub3BlblN0cmluZ3Muam9pbignICcpO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGBUdW5pbmcoXCIke3RoaXMuZGVzY3JpcHRpb259XCIpYDtcbiAgICB9XG4gICAgZ2V0RnJldGJvYXJkKGNob3JkLCBmcmV0Q291bnQgPSAxMikge1xuICAgICAgICBjb25zdCBhbGxvd2VkUGl0Y2hlcyA9IGNob3JkICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gY2hvcmQubm90ZXMubWFwKG4gPT4gbi5waXRjaENsYXNzKVxuICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXMub3BlblN0cmluZ3MubWFwKHMgPT4gZ2V0RnJldHMocywgbmV3IFNldChhbGxvd2VkUGl0Y2hlcyksIGZyZXRDb3VudCkpO1xuICAgIH1cbn1cbmV4cG9ydHMuVHVuaW5nID0gVHVuaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFwcGx5VHlwb2dyYXBoeSA9IHZvaWQgMDtcbmNvbnN0IGNoYXJhY3RlckRpY3QgPSB7XG4gICAgJyMnOiAn4pmvJyxcbiAgICAnYic6ICfima0nLFxuICAgICcwJzogJ+KCgCcsXG4gICAgJzEnOiAn4oKBJyxcbiAgICAnMic6ICfigoInLFxuICAgICczJzogJ+KCgycsXG4gICAgJzQnOiAn4oKEJyxcbiAgICAnNSc6ICfigoUnLFxuICAgICc2JzogJ+KChicsXG4gICAgJzcnOiAn4oKHJyxcbiAgICAnOCc6ICfigognLFxuICAgICc5JzogJ+KCiScsXG59O1xuY29uc3QgcmVwbGFjZVJlZ2V4ID0gbmV3IFJlZ0V4cChgWyR7T2JqZWN0LmtleXMoY2hhcmFjdGVyRGljdCl9XWAsICdnJyk7XG5mdW5jdGlvbiBhcHBseVR5cG9ncmFwaHkodGV4dCkge1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UocmVwbGFjZVJlZ2V4LCBjID0+IGNoYXJhY3RlckRpY3RbY10pO1xufVxuZXhwb3J0cy5hcHBseVR5cG9ncmFwaHkgPSBhcHBseVR5cG9ncmFwaHk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZSA9IHZvaWQgMDtcbmNvbnN0IGNob3JkXzEgPSByZXF1aXJlKFwiLi9jaG9yZFwiKTtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4vdHVuaW5nXCIpO1xuY29uc3QgaW5zdHJ1bWVudHNfMSA9IHJlcXVpcmUoXCIuL2luc3RydW1lbnRzXCIpO1xuY29uc3QgZG9tXzEgPSByZXF1aXJlKFwiLi9kb21cIik7XG5jb25zdCB0eXBvZ3JhcGh5XzEgPSByZXF1aXJlKFwiLi90eXBvZ3JhcGh5XCIpO1xuY29uc3QgY29sb3JzXzEgPSByZXF1aXJlKFwiLi9jb2xvcnNcIik7XG5mdW5jdGlvbiBnZXRDaG9yZERlc2NyaXB0aW9uKGNob3JkKSB7XG4gICAgY29uc3Qgbm90ZXMgPSAoMCwgdHlwb2dyYXBoeV8xLmFwcGx5VHlwb2dyYXBoeSkoY2hvcmQubm90ZXMuam9pbignICcpKTtcbiAgICByZXR1cm4gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdwJywge1xuICAgICAgICBpZDogJ2Nob3JkRGVzY3JpcHRpb24nLFxuICAgICAgICBpbm5lclRleHQ6IGDin6ggJHtub3Rlc30g4p+pYFxuICAgIH0pO1xufVxuZnVuY3Rpb24gZ2V0RnJldEhlYWRlckVsZW1lbnQoZnJldENvdW50KSB7XG4gICAgY29uc3QgZnJldEhlYWRlckVsZW1lbnQgPSAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3AnLCB7XG4gICAgICAgIGNsYXNzTmFtZTogJ2ZyZXRIZWFkZXInXG4gICAgfSk7XG4gICAgZm9yIChjb25zdCBmcmV0SW5kZXggb2YgQXJyYXkoZnJldENvdW50KS5rZXlzKCkpIHtcbiAgICAgICAgZnJldEhlYWRlckVsZW1lbnQuYXBwZW5kQ2hpbGQoKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdzcGFuJywge1xuICAgICAgICAgICAgaW5uZXJUZXh0OiBmcmV0SW5kZXgudG9TdHJpbmcoKVxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiBmcmV0SGVhZGVyRWxlbWVudDtcbn1cbmZ1bmN0aW9uIGdldEZyZXRFbGVtZW50KGZyZXROb3RlLCByb290Tm90ZSkge1xuICAgIGNvbnN0IGlubmVyVGV4dCA9IGZyZXROb3RlICE9PSBudWxsXG4gICAgICAgID8gKDAsIHR5cG9ncmFwaHlfMS5hcHBseVR5cG9ncmFwaHkpKGZyZXROb3RlLnRvU3RyaW5nKCkpXG4gICAgICAgIDogJ8K3JztcbiAgICBjb25zdCBncm91cCA9IHJvb3ROb3RlICE9PSB1bmRlZmluZWQgPyAoMCwgdHVuaW5nXzEuZ2V0R3JvdXApKHJvb3ROb3RlLCBmcmV0Tm90ZSkgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgY29sb3IgPSBncm91cCAhPT0gdW5kZWZpbmVkID8gKDAsIGNvbG9yc18xLmdldEdyb3VwQ29sb3IpKGdyb3VwKSA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdzcGFuJywgeyBpbm5lclRleHQgfSwgeyBjb2xvciB9KTtcbn1cbmZ1bmN0aW9uIGdldEZyZXR0ZWRTdHJpbmdFbGVtZW50KGZyZXR0ZWRTdHJpbmcsIHJvb3ROb3RlKSB7XG4gICAgY29uc3QgZnJldHRlZFN0cmluZ0VsZW1lbnQgPSAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3AnKTtcbiAgICBmb3IgKGNvbnN0IGZyZXROb3RlIG9mIGZyZXR0ZWRTdHJpbmcpIHtcbiAgICAgICAgZnJldHRlZFN0cmluZ0VsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0RnJldEVsZW1lbnQoZnJldE5vdGUsIHJvb3ROb3RlKSk7XG4gICAgfVxuICAgIHJldHVybiBmcmV0dGVkU3RyaW5nRWxlbWVudDtcbn1cbmZ1bmN0aW9uIGdldEZyZXRib2FyZEVsZW1lbnQoZnJldGJvYXJkLCByb290Tm90ZSkge1xuICAgIGNvbnN0IGZyZXRib2FyZEVsZW1lbnQgPSAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ2RpdicsIHsgaWQ6ICdmcmV0Ym9hcmQnIH0pO1xuICAgIGZyZXRib2FyZEVsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0RnJldEhlYWRlckVsZW1lbnQoZnJldGJvYXJkWzBdLmxlbmd0aCkpO1xuICAgIGZvciAoY29uc3QgZnJldHRlZFN0cmluZyBvZiBbLi4uZnJldGJvYXJkXS5yZXZlcnNlKCkpIHtcbiAgICAgICAgZnJldGJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0dGVkU3RyaW5nRWxlbWVudChmcmV0dGVkU3RyaW5nLCByb290Tm90ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldGJvYXJkRWxlbWVudDtcbn1cbmZ1bmN0aW9uIGdldEVycm9yRWxlbWVudChtZXNzYWdlKSB7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcsIHtcbiAgICAgICAgaWQ6ICdlcnJvcicsXG4gICAgICAgIGlubmVyVGV4dDogbWVzc2FnZVxuICAgIH0pO1xufVxuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBjb25zdCBpbnN0cnVtZW50RWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnaW5zdHJ1bWVudCcpO1xuICAgIGNvbnN0IHR1bmluZ0VsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ3R1bmluZycpO1xuICAgIGNvbnN0IGZyZXRDb3VudEVsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2ZyZXRDb3VudCcpO1xuICAgIGNvbnN0IGNob3JkRWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnY2hvcmQnKTtcbiAgICBjb25zdCBjaG9yZHNEYXRhTGlzdCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnY2hvcmRzJyk7XG4gICAgY29uc3Qgc3RhdHVzRWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnc3RhdHVzJyk7XG4gICAgY29uc3Qgb3V0cHV0RWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnb3V0cHV0Jyk7XG4gICAgY29uc3QgY2hvcmRPcHRpb25zID0ge307XG4gICAgZm9yIChjb25zdCBjaG9yZCBvZiBjaG9yZF8xLmtub3duQ2hvcmROYW1lcykge1xuICAgICAgICBjaG9yZE9wdGlvbnNbY2hvcmRdID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdvcHRpb24nLCB7IHZhbHVlOiBjaG9yZCB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcG9wdWxhdGVDaG9yZHModGV4dCA9ICcnKSB7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRUZXh0ID0gdGV4dC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgZXhhY3RNYXRjaGVzID0gY2hvcmRfMS5rbm93bkNob3JkTmFtZXMuZmlsdGVyKGMgPT4gYy50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkVGV4dCk7XG4gICAgICAgIGNvbnN0IGJlZ2lubmluZ01hdGNoZXMgPSBjaG9yZF8xLmtub3duQ2hvcmROYW1lcy5maWx0ZXIoYyA9PiBjLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChub3JtYWxpemVkVGV4dCkgJiZcbiAgICAgICAgICAgICFleGFjdE1hdGNoZXMuaW5jbHVkZXMoYykpO1xuICAgICAgICBjb25zdCBzdWJzdHJpbmdNYXRjaGVzID0gY2hvcmRfMS5rbm93bkNob3JkTmFtZXMuZmlsdGVyKGMgPT4gYy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKG5vcm1hbGl6ZWRUZXh0KSAmJlxuICAgICAgICAgICAgIWV4YWN0TWF0Y2hlcy5pbmNsdWRlcyhjKSAmJlxuICAgICAgICAgICAgIWJlZ2lubmluZ01hdGNoZXMuaW5jbHVkZXMoYykpO1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gWy4uLmV4YWN0TWF0Y2hlcywgLi4uYmVnaW5uaW5nTWF0Y2hlcywgLi4uc3Vic3RyaW5nTWF0Y2hlc107XG4gICAgICAgIGNob3Jkc0RhdGFMaXN0LnJlcGxhY2VDaGlsZHJlbiguLi5tYXRjaGVzLm1hcChjID0+IGNob3JkT3B0aW9uc1tjXSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZUluc3RydW1lbnRzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGluc3RydW1lbnQgb2YgT2JqZWN0LmtleXMoaW5zdHJ1bWVudHNfMS5pbnN0cnVtZW50cykpIHtcbiAgICAgICAgICAgIGluc3RydW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKCgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnb3B0aW9uJywge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBpbnN0cnVtZW50LFxuICAgICAgICAgICAgICAgIGlubmVyVGV4dDogaW5zdHJ1bWVudFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNob3dGcmV0Ym9hcmQoKSB7XG4gICAgICAgIGNvbnN0IHR1bmluZ0Rlc2NyaXB0aW9uID0gdHVuaW5nRWxlbWVudC52YWx1ZS50cmltKCk7XG4gICAgICAgIGNvbnN0IGNob3JkTmFtZSA9IGNob3JkRWxlbWVudC52YWx1ZS50cmltKCk7XG4gICAgICAgIGNvbnN0IGZyZXRDb3VudCA9IHBhcnNlSW50KGZyZXRDb3VudEVsZW1lbnQudmFsdWUpO1xuICAgICAgICBzdGF0dXNFbGVtZW50LnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICBvdXRwdXRFbGVtZW50LnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdHVuaW5nID0gbmV3IHR1bmluZ18xLlR1bmluZyh0dW5pbmdEZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBsZXQgY2hvcmQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoY2hvcmROYW1lICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNob3JkID0gbmV3IGNob3JkXzEuQ2hvcmQoY2hvcmROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzRWxlbWVudC5hcHBlbmRDaGlsZChnZXRDaG9yZERlc2NyaXB0aW9uKGNob3JkKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBgJHtlcnJvcn1gO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNFbGVtZW50LmFwcGVuZENoaWxkKGdldEVycm9yRWxlbWVudChtZXNzYWdlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZnJldGJvYXJkID0gdHVuaW5nLmdldEZyZXRib2FyZChjaG9yZCwgZnJldENvdW50KTtcbiAgICAgICAgICAgIG91dHB1dEVsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0RnJldGJvYXJkRWxlbWVudChmcmV0Ym9hcmQsIGNob3JkID09PSBudWxsIHx8IGNob3JkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjaG9yZC5ub3Rlc1swXSkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogYCR7ZXJyb3J9YDtcbiAgICAgICAgICAgIHN0YXR1c0VsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0RXJyb3JFbGVtZW50KGBJbnZhbGlkIHR1bmluZzogJHttZXNzYWdlfWApKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvbkluc3RydW1lbnRJbnB1dCgpIHtcbiAgICAgICAgY29uc3QgaW5zdHJ1bWVudCA9IGluc3RydW1lbnRFbGVtZW50LnZhbHVlO1xuICAgICAgICBpZiAoaW5zdHJ1bWVudCBpbiBpbnN0cnVtZW50c18xLmluc3RydW1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCB0dW5pbmcgPSBpbnN0cnVtZW50c18xLmluc3RydW1lbnRzW2luc3RydW1lbnRdO1xuICAgICAgICAgICAgdHVuaW5nRWxlbWVudC52YWx1ZSA9IHR1bmluZy5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIHNob3dGcmV0Ym9hcmQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvblR1bmluZ0lucHV0KCkge1xuICAgICAgICBjb25zdCB0dW5pbmdEZXNjcmlwdGlvbiA9IHR1bmluZ0VsZW1lbnQudmFsdWU7XG4gICAgICAgIGxldCBpbnN0cnVtZW50ID0gJyc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0dW5pbmcgPSBuZXcgdHVuaW5nXzEuVHVuaW5nKHR1bmluZ0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGlmICh0dW5pbmcuZGVzY3JpcHRpb24gaW4gaW5zdHJ1bWVudHNfMS5pbnN0cnVtZW50QnlUdW5pbmcpIHtcbiAgICAgICAgICAgICAgICBpbnN0cnVtZW50ID0gaW5zdHJ1bWVudHNfMS5pbnN0cnVtZW50QnlUdW5pbmdbdHVuaW5nLmRlc2NyaXB0aW9uXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoX2EpIHsgfVxuICAgICAgICBpbnN0cnVtZW50RWxlbWVudC52YWx1ZSA9IGluc3RydW1lbnQ7XG4gICAgICAgIHNob3dGcmV0Ym9hcmQoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25GcmV0Q291bnRJbnB1dCgpIHtcbiAgICAgICAgc2hvd0ZyZXRib2FyZCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbkNob3JkSW5wdXQoZSkge1xuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIElucHV0RXZlbnQgJiYgZS5pbnB1dFR5cGUgIT09ICdpbnNlcnRSZXBsYWNlbWVudFRleHQnKSB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gY2hvcmRFbGVtZW50LnZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIHBvcHVsYXRlQ2hvcmRzKHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHNob3dGcmV0Ym9hcmQoKTtcbiAgICB9XG4gICAgcG9wdWxhdGVJbnN0cnVtZW50cygpO1xuICAgIGluc3RydW1lbnRFbGVtZW50LnZhbHVlID0gaW5zdHJ1bWVudHNfMS5kZWZhdWx0SW5zdHJ1bWVudDtcbiAgICBvbkluc3RydW1lbnRJbnB1dCgpO1xuICAgIHBvcHVsYXRlQ2hvcmRzKCk7XG4gICAgaW5zdHJ1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkluc3RydW1lbnRJbnB1dCk7XG4gICAgdHVuaW5nRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uVHVuaW5nSW5wdXQpO1xuICAgIGZyZXRDb3VudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkZyZXRDb3VudElucHV0KTtcbiAgICBjaG9yZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkNob3JkSW5wdXQpO1xuICAgIGNob3JkRWxlbWVudC5mb2N1cygpO1xufVxuZXhwb3J0cy5pbml0aWFsaXplID0gaW5pdGlhbGl6ZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHVpXzEgPSByZXF1aXJlKFwiLi91aVwiKTtcbigwLCB1aV8xLmluaXRpYWxpemUpKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=