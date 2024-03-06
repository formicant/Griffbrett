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
// Input actions:
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
        populateChordsDatalist(text);
    }
    showFretboard();
}
// Entry function
function initialize() {
    populateChordsDatalist();
    populateInstruments();
    instrumentElement.value = instruments_1.defaultInstrument;
    onInstrumentInput();
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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const ui_1 = __webpack_require__(/*! ./ui */ "./src/ui/index.ts");
(0, ui_1.initialize)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRSxhQUFhLEVBQUM7QUFDN0QsYUFBYSxtQkFBTyxDQUFDLCtCQUFNO0FBQzNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy90aGVvcnkvY2hvcmQudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy90aGVvcnkvaW5zdHJ1bWVudHMudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy90aGVvcnkvbm90ZS50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3RoZW9yeS90dW5pbmcudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9jb2xvcnMudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9kb20udHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9mcmV0Ym9hcmQudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS9pbmRleC50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpL3R5cG9ncmFwaHkudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DaG9yZCA9IGV4cG9ydHMua25vd25DaG9yZE5hbWVzID0gdm9pZCAwO1xuY29uc3Qgbm90ZV8xID0gcmVxdWlyZShcIi4vbm90ZVwiKTtcbi8vIEludGVydmFscyBpbiBzZW1pdG9uZXM6XG5jb25zdCBbUDEsIG0yLCBNMiwgbTMsIE0zLCBQNCwgQTQsIFA1LCBtNiwgTTYsIG03LCBNN10gPSBBcnJheSgxMikua2V5cygpO1xuY29uc3Qgc3VmZml4TWVhbmluZ3MgPSB7XG4gICAgJ20obm81KSc6IFtQMSwgbTNdLFxuICAgICcobm81KSc6IFtQMSwgTTNdLFxuICAgICc1JzogW1AxLCBQNV0sXG4gICAgJ2RpbSc6IFtQMSwgbTMsIEE0XSxcbiAgICAnc3VzMic6IFtQMSwgTTIsIFA1XSxcbiAgICAnbSc6IFtQMSwgbTMsIFA1XSxcbiAgICAnJzogW1AxLCBNMywgUDVdLFxuICAgICdzdXM0JzogW1AxLCBQNCwgUDVdLFxuICAgICdhdWcnOiBbUDEsIE0zLCBtNl0sXG4gICAgJ202JzogW1AxLCBtMywgUDUsIE02XSxcbiAgICAnNic6IFtQMSwgTTMsIFA1LCBNNl0sXG4gICAgJ203JzogW1AxLCBtMywgUDUsIG03XSxcbiAgICAnbU03JzogW1AxLCBtMywgUDUsIE03XSxcbiAgICAnNyc6IFtQMSwgTTMsIFA1LCBtN10sXG4gICAgJ003JzogW1AxLCBNMywgUDUsIE03XSxcbn07XG5jb25zdCBrbm93blN1ZmZpeGVzID0gT2JqZWN0LmtleXMoc3VmZml4TWVhbmluZ3MpO1xua25vd25TdWZmaXhlcy5zb3J0KCk7XG5leHBvcnRzLmtub3duQ2hvcmROYW1lcyA9IFtdO1xuZm9yIChjb25zdCBub3RlIG9mIG5vdGVfMS5rbm93bk5vdGVOYW1lcykge1xuICAgIGZvciAoY29uc3Qgc3VmZml4IG9mIGtub3duU3VmZml4ZXMpIHtcbiAgICAgICAgZXhwb3J0cy5rbm93bkNob3JkTmFtZXMucHVzaChub3RlICsgc3VmZml4KTtcbiAgICB9XG59XG5jb25zdCBjaG9yZFJlZ2V4ID0gbmV3IFJlZ0V4cChgXigke25vdGVfMS5ub3RlTmFtZVBhdHRlcm59KSguKikkYCk7XG5jbGFzcyBDaG9yZCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBjb25zdCBtYXRjaCA9IG5hbWUubWF0Y2goY2hvcmRSZWdleCk7XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgQ2FuJ3QgcGFyc2UgY2hvcmQgJHtuYW1lfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IFtfLCByb290TmFtZSwgc3VmZml4XSA9IG1hdGNoO1xuICAgICAgICBjb25zdCByb290ID0gbmV3IG5vdGVfMS5Ob3RlKHJvb3ROYW1lKTtcbiAgICAgICAgaWYgKCEoc3VmZml4IGluIHN1ZmZpeE1lYW5pbmdzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBDYW4ndCBwYXJzZSBjaG9yZCBzdWZmaXggJHtzdWZmaXh9YCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub3RlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGludGVydmFsIG9mIHN1ZmZpeE1lYW5pbmdzW3N1ZmZpeF0pIHtcbiAgICAgICAgICAgIHRoaXMubm90ZXMucHVzaChyb290LmFkZEludGVydmFsKGludGVydmFsKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9ID0gPCR7dGhpcy5ub3Rlcy5qb2luKCcgJyl9PmA7XG4gICAgfVxufVxuZXhwb3J0cy5DaG9yZCA9IENob3JkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHRJbnN0cnVtZW50ID0gZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmcgPSBleHBvcnRzLmluc3RydW1lbnRzID0gdm9pZCAwO1xuY29uc3QgdHVuaW5nXzEgPSByZXF1aXJlKFwiLi90dW5pbmdcIik7XG5leHBvcnRzLmluc3RydW1lbnRzID0ge1xuICAgICdCYWxhbGFpa2EgKGFjYWRlbWljKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0U0IEU0IEE0JyksXG4gICAgJ0JhbGFsYWlrYSAoZm9sayknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDNCBFNCBHNCcpLFxuICAgICdCYW5qbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEQzIEczIEIzIEQ0JyksXG4gICAgJ0Jhc3MnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFMSBBMSBEMiBHMicpLFxuICAgICdCcmFndWluaGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBCNCBENScpLFxuICAgICdDaGFyYW5nbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEM1IEUgQTQgRTUnKSxcbiAgICAnQ2F2YXF1aW5obyAoUG9ydHVnYWwgR0dCRCknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBHNCBCNCBENScpLFxuICAgICdDYXZhcXVpbmhvIChQb3J0dWdhbCBEQUJFKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q1IEE0IEI0IEU1JyksXG4gICAgJ0NhdmFxdWluaG8gKEJyYXppbCBER0JEKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEI0IEQ1JyksXG4gICAgJ0NhdmFxdWluaG8gKEJyYXppbCBER0JFKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEI0IEU1JyksXG4gICAgJ0RhbGEgZmFlbmR5cic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0U0IEE0IEU1JyksXG4gICAgJ0RlY2hpZyBwb25kYXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDNCBENCBHNCcpLFxuICAgICdHdWl0YWxlbGUnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMiBEMyBHMyBDNCBFNCBBNCcpLFxuICAgICdHdWl0YXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFMiBBMiBEMyBHMyBCMyBFNCcpLFxuICAgICdHdWl0YXJyw7NuJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTEgRDIgRzIgQzMgRTMgQTInKSxcbiAgICAnSmFyYW5hIGphcm9jaGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBDNCBFIEEzIEczJyksXG4gICAgJ0phcmFuYSBodWFzdGVjYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEIzIEQ0IEYjNCBBNCcpLFxuICAgICdNYW5kb2xpbic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEQ0IEE0IEU1JyksXG4gICAgJ1JhamFvJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQzQgRTQgQTQnKSxcbiAgICAnUmVxdWludG8nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMiBEMyBHMyBDNCBFNCBBNCcpLFxuICAgICdTZW1pc3RydW5rYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0QyIEcyIEIyIEQzIEczIEIzIEQ0JyksXG4gICAgJ1Rlbm9yIGd1aXRhcic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0MzIEczIEQ0IEE0JyksXG4gICAgJ1RpbXBsZSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEM1IEU0IEE0IEQ1JyksXG4gICAgJ1VrdWxlbGUgKGhpZ2ggRyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBDNCBFNCBBNCcpLFxuICAgICdVa3VsZWxlIChsb3cgRyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBDNCBFNCBBNCcpLFxuICAgICdVa3VsZWxlIChiYXJpdG9uZSknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdEMyBHMyBCMyBFNCcpLFxuICAgICdWaWh1ZWxhJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTMgRDQgRzQgQjMgRTQnKSxcbiAgICAnVmlvbGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDMyBHMyBENCBBNCcpLFxuICAgICdWaW9saW4nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBENCBBNCBFNScpLFxufTtcbmV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nID0ge307XG5mb3IgKGNvbnN0IFtuYW1lLCB0dW5pbmddIG9mIE9iamVjdC5lbnRyaWVzKGV4cG9ydHMuaW5zdHJ1bWVudHMpKSB7XG4gICAgZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmdbdHVuaW5nLmRlc2NyaXB0aW9uXSA9IG5hbWU7XG4gICAgLy8gTm93LCB0aGUgbGFzdCBpbnN0cnVtZW50IHdpdGggdGhlIGdpdmVuIHR1bmluZyBpcyB1c2VkLlxuICAgIC8vIFRPRE86IENoYW5nZSB0aGlzIGlmIG5lZWRlZC5cbn1cbmV4cG9ydHMuZGVmYXVsdEluc3RydW1lbnQgPSAnVWt1bGVsZSAoaGlnaCBHKSc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTm90ZSA9IGV4cG9ydHMubm90ZU5hbWVQYXR0ZXJuID0gZXhwb3J0cy5rbm93bk5vdGVOYW1lcyA9IHZvaWQgMDtcbmNvbnN0IG5vdGVOYW1lcyA9IFtcbiAgICBbJ0MnXSwgWydDIycsICdEYiddLFxuICAgIFsnRCddLCBbJ0QjJywgJ0ViJ10sXG4gICAgWydFJ10sXG4gICAgWydGJ10sIFsnRiMnLCAnR2InXSxcbiAgICBbJ0cnXSwgWydHIycsICdBYiddLFxuICAgIFsnQSddLCBbJ0EjJywgJ0JiJ10sXG4gICAgWydCJ10sXG5dO1xuY29uc3QgdW5zdXBwb3J0ZWQgPSB7XG4gICAgJ0NiJzogJ0InLFxuICAgICdCIyc6ICdDJyxcbiAgICAnRmInOiAnRScsXG4gICAgJ0UjJzogJ0YnLFxufTtcbmNvbnN0IG5vdGVJbmRleEJ5TmFtZSA9IHt9O1xuZm9yIChjb25zdCBbaW5kZXgsIG5hbWVzXSBvZiBub3RlTmFtZXMuZW50cmllcygpKSB7XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIG5hbWVzKSB7XG4gICAgICAgIG5vdGVJbmRleEJ5TmFtZVtuYW1lXSA9IGluZGV4O1xuICAgIH1cbn1cbmV4cG9ydHMua25vd25Ob3RlTmFtZXMgPSBPYmplY3Qua2V5cyhub3RlSW5kZXhCeU5hbWUpO1xuZXhwb3J0cy5rbm93bk5vdGVOYW1lcy5zb3J0KCk7XG5leHBvcnRzLm5vdGVOYW1lUGF0dGVybiA9ICdbQS1HXVsjYl0/JztcbmNvbnN0IG5vdGVSZWdleCA9IG5ldyBSZWdFeHAoYF4oJHtleHBvcnRzLm5vdGVOYW1lUGF0dGVybn0pKFxcXFxkKT8kYCk7XG5jbGFzcyBOb3RlIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gbmFtZS5tYXRjaChub3RlUmVnZXgpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGNvbnN0IFtfLCBub3RlTmFtZSwgb2N0YXZlTmFtZV0gPSBtYXRjaDtcbiAgICAgICAgICAgIGlmIChub3RlTmFtZSBpbiB1bnN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1Z2dlc3Rpb24gPSB1bnN1cHBvcnRlZFtub3RlTmFtZV07XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVc2UgJHtzdWdnZXN0aW9ufSBpbnN0ZWFkIG9mICR7bm90ZU5hbWV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBpdGNoQ2xhc3MgPSBub3RlSW5kZXhCeU5hbWVbbm90ZU5hbWVdO1xuICAgICAgICAgICAgdGhpcy5vY3RhdmUgPSBvY3RhdmVOYW1lICE9PSB1bmRlZmluZWQgPyBwYXJzZUludChvY3RhdmVOYW1lKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgQ2FuJ3QgcGFyc2Ugbm90ZSAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGZyb21QaXRjaENsYXNzQW5kT2N0YXZlKHBpdGNoQ2xhc3MsIG9jdGF2ZSkge1xuICAgICAgICBsZXQgbm90ZSA9IE9iamVjdC5jcmVhdGUoTm90ZS5wcm90b3R5cGUpO1xuICAgICAgICBub3RlLnBpdGNoQ2xhc3MgPSBwaXRjaENsYXNzO1xuICAgICAgICBub3RlLm9jdGF2ZSA9IG9jdGF2ZTtcbiAgICAgICAgcmV0dXJuIG5vdGU7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBjb25zdCBub3RlTmFtZSA9IG5vdGVOYW1lc1t0aGlzLnBpdGNoQ2xhc3NdWzBdO1xuICAgICAgICByZXR1cm4gdGhpcy5vY3RhdmUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBgJHtub3RlTmFtZX0ke3RoaXMub2N0YXZlfWBcbiAgICAgICAgICAgIDogbm90ZU5hbWU7XG4gICAgfVxuICAgIGFkZEludGVydmFsKGludGVydmFsKSB7XG4gICAgICAgIGNvbnN0IHBpdGNoID0gdGhpcy5waXRjaENsYXNzICsgaW50ZXJ2YWw7XG4gICAgICAgIGNvbnN0IG9jdGF2ZSA9IHRoaXMub2N0YXZlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gdGhpcy5vY3RhdmUgKyBNYXRoLmZsb29yKHBpdGNoIC8gMTIpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIE5vdGUuZnJvbVBpdGNoQ2xhc3NBbmRPY3RhdmUocGl0Y2ggJSAxMiwgb2N0YXZlKTsgLy8gaW5jb3JyZWN0IGZvciBuZWdhdGl2ZSBpbnRlcnZhbHNcbiAgICB9XG59XG5leHBvcnRzLk5vdGUgPSBOb3RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlR1bmluZyA9IGV4cG9ydHMuZ2V0R3JvdXAgPSB2b2lkIDA7XG5jb25zdCBub3RlXzEgPSByZXF1aXJlKFwiLi9ub3RlXCIpO1xuY29uc3Qgc3BsaXRSZWdleCA9IC9cXHMrfCg/PVtBLVpdKS87IC8vIHNwbGl0IGJ5IHdoaXRlc3BhY2Ugb3IgYmVmb3JlIHVwcGVyY2FzZSBsZXR0ZXJzXG5mdW5jdGlvbiBnZXRGcmV0cyhvcGVuU3RyaW5nLCBhbGxvd2VkUGl0Y2hlcywgZnJldENvdW50KSB7XG4gICAgY29uc3QgZnJldHMgPSBbXTtcbiAgICBmb3IgKGxldCBmcmV0SW5kZXggPSAwOyBmcmV0SW5kZXggPD0gZnJldENvdW50OyBmcmV0SW5kZXgrKykge1xuICAgICAgICBjb25zdCBub3RlID0gb3BlblN0cmluZy5hZGRJbnRlcnZhbChmcmV0SW5kZXgpO1xuICAgICAgICBmcmV0cy5wdXNoKGFsbG93ZWRQaXRjaGVzLmhhcyhub3RlLnBpdGNoQ2xhc3MpID8gbm90ZSA6IG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldHM7XG59XG5mdW5jdGlvbiBnZXRHcm91cChyb290Tm90ZSwgbm90ZSkge1xuICAgIGlmIChub3RlICE9PSBudWxsICYmIG5vdGUub2N0YXZlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKG5vdGUub2N0YXZlICogMTIgKyBub3RlLnBpdGNoQ2xhc3MgLSByb290Tm90ZS5waXRjaENsYXNzKSAvIDEyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRHcm91cCA9IGdldEdyb3VwO1xuY2xhc3MgVHVuaW5nIHtcbiAgICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLm9wZW5TdHJpbmdzID0gZGVzY3JpcHRpb25cbiAgICAgICAgICAgIC5zcGxpdChzcGxpdFJlZ2V4KVxuICAgICAgICAgICAgLmZpbHRlcihuID0+IG4gIT09ICcnKVxuICAgICAgICAgICAgLm1hcChuID0+IG5ldyBub3RlXzEuTm90ZShuKSk7XG4gICAgICAgIGlmICh0aGlzLm9wZW5TdHJpbmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdCBsZWFzdCBvbmUgb3BlbiBzdHJpbmcgcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5vcGVuU3RyaW5ncy5qb2luKCcgJyk7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYFR1bmluZyhcIiR7dGhpcy5kZXNjcmlwdGlvbn1cIilgO1xuICAgIH1cbiAgICBnZXRGcmV0Ym9hcmQoY2hvcmQsIGZyZXRDb3VudCA9IDEyKSB7XG4gICAgICAgIGNvbnN0IGFsbG93ZWRQaXRjaGVzID0gY2hvcmQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBjaG9yZC5ub3Rlcy5tYXAobiA9PiBuLnBpdGNoQ2xhc3MpXG4gICAgICAgICAgICA6IFtdO1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuU3RyaW5ncy5tYXAocyA9PiBnZXRGcmV0cyhzLCBuZXcgU2V0KGFsbG93ZWRQaXRjaGVzKSwgZnJldENvdW50KSk7XG4gICAgfVxufVxuZXhwb3J0cy5UdW5pbmcgPSBUdW5pbmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0R3JvdXBDb2xvciA9IHZvaWQgMDtcbmNvbnN0IHBoaSA9ICgxICsgTWF0aC5zcXJ0KDUpKSAvIDI7XG5jb25zdCBnb2xkZW5BbmdsZSA9IDIgKiBNYXRoLlBJIC8gKHBoaSAqIHBoaSk7XG5jb25zdCBsaWdodG5lc3MgPSAwLjU1O1xuY29uc3Qgc2F0dXJhdGlvbiA9IDAuNjU7XG5mdW5jdGlvbiBnZXRHcm91cENvbG9yKGdyb3VwKSB7XG4gICAgY29uc3QgaHVlID0gZ29sZGVuQW5nbGUgKiBncm91cDtcbiAgICBjb25zdCBsID0gbGlnaHRuZXNzICogMTAwO1xuICAgIGNvbnN0IGEgPSBzYXR1cmF0aW9uICogTWF0aC5jb3MoaHVlKSAqIDEwMDtcbiAgICBjb25zdCBiID0gc2F0dXJhdGlvbiAqIE1hdGguc2luKGh1ZSkgKiAxMDA7XG4gICAgcmV0dXJuIGBva2xhYigke2wudG9GaXhlZCgxKX0lICR7YS50b0ZpeGVkKDEpfSUgJHtiLnRvRml4ZWQoMSl9JSlgO1xufVxuZXhwb3J0cy5nZXRHcm91cENvbG9yID0gZ2V0R3JvdXBDb2xvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gZXhwb3J0cy5nZXRCeUlkID0gdm9pZCAwO1xuZnVuY3Rpb24gZ2V0QnlJZChpZCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHRocm93IEVycm9yKGBDYW5ub3QgZmluZCBlbGVtZW50IHdpdGggaWQgJyR7aWR9J2ApO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbmV4cG9ydHMuZ2V0QnlJZCA9IGdldEJ5SWQ7XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZ05hbWUsIHByb3BlcnRpZXMsIHN0eWxlKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgaWYgKHByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQsIHByb3BlcnRpZXMpO1xuICAgIH1cbiAgICBpZiAoc3R5bGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIHN0eWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5leHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldEZyZXRib2FyZEVsZW1lbnQgPSB2b2lkIDA7XG5jb25zdCBkb21fMSA9IHJlcXVpcmUoXCIuL2RvbVwiKTtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4uL3RoZW9yeS90dW5pbmdcIik7XG5jb25zdCB0eXBvZ3JhcGh5XzEgPSByZXF1aXJlKFwiLi90eXBvZ3JhcGh5XCIpO1xuY29uc3QgY29sb3JzXzEgPSByZXF1aXJlKFwiLi9jb2xvcnNcIik7XG5mdW5jdGlvbiBnZXRGcmV0SGVhZGVyRWxlbWVudChmcmV0Q291bnQpIHtcbiAgICBjb25zdCBmcmV0SGVhZGVyRWxlbWVudCA9ICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcsIHtcbiAgICAgICAgY2xhc3NOYW1lOiAnZnJldEhlYWRlcidcbiAgICB9KTtcbiAgICBmb3IgKGNvbnN0IGZyZXRJbmRleCBvZiBBcnJheShmcmV0Q291bnQpLmtleXMoKSkge1xuICAgICAgICBmcmV0SGVhZGVyRWxlbWVudC5hcHBlbmRDaGlsZCgoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3NwYW4nLCB7XG4gICAgICAgICAgICBpbm5lclRleHQ6IGZyZXRJbmRleC50b1N0cmluZygpXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXRIZWFkZXJFbGVtZW50O1xufVxuZnVuY3Rpb24gZ2V0RnJldEVsZW1lbnQoZnJldE5vdGUsIHJvb3ROb3RlKSB7XG4gICAgY29uc3QgaW5uZXJUZXh0ID0gZnJldE5vdGUgIT09IG51bGxcbiAgICAgICAgPyAoMCwgdHlwb2dyYXBoeV8xLmFwcGx5VHlwb2dyYXBoeSkoZnJldE5vdGUudG9TdHJpbmcoKSlcbiAgICAgICAgOiAnwrcnO1xuICAgIGNvbnN0IGdyb3VwID0gcm9vdE5vdGUgIT09IHVuZGVmaW5lZCA/ICgwLCB0dW5pbmdfMS5nZXRHcm91cCkocm9vdE5vdGUsIGZyZXROb3RlKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBjb2xvciA9IGdyb3VwICE9PSB1bmRlZmluZWQgPyAoMCwgY29sb3JzXzEuZ2V0R3JvdXBDb2xvcikoZ3JvdXApIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiAoMCwgZG9tXzEuY3JlYXRlRWxlbWVudCkoJ3NwYW4nLCB7IGlubmVyVGV4dCB9LCB7IGNvbG9yIH0pO1xufVxuZnVuY3Rpb24gZ2V0RnJldHRlZFN0cmluZ0VsZW1lbnQoZnJldHRlZFN0cmluZywgcm9vdE5vdGUpIHtcbiAgICBjb25zdCBmcmV0dGVkU3RyaW5nRWxlbWVudCA9ICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcpO1xuICAgIGZvciAoY29uc3QgZnJldE5vdGUgb2YgZnJldHRlZFN0cmluZykge1xuICAgICAgICBmcmV0dGVkU3RyaW5nRWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0RWxlbWVudChmcmV0Tm90ZSwgcm9vdE5vdGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXR0ZWRTdHJpbmdFbGVtZW50O1xufVxuZnVuY3Rpb24gZ2V0RnJldGJvYXJkRWxlbWVudChmcmV0Ym9hcmQsIHJvb3ROb3RlKSB7XG4gICAgY29uc3QgZnJldGJvYXJkRWxlbWVudCA9ICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgnZGl2JywgeyBpZDogJ2ZyZXRib2FyZCcgfSk7XG4gICAgZnJldGJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0SGVhZGVyRWxlbWVudChmcmV0Ym9hcmRbMF0ubGVuZ3RoKSk7XG4gICAgZm9yIChjb25zdCBmcmV0dGVkU3RyaW5nIG9mIFsuLi5mcmV0Ym9hcmRdLnJldmVyc2UoKSkge1xuICAgICAgICBmcmV0Ym9hcmRFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXR0ZWRTdHJpbmdFbGVtZW50KGZyZXR0ZWRTdHJpbmcsIHJvb3ROb3RlKSk7XG4gICAgfVxuICAgIHJldHVybiBmcmV0Ym9hcmRFbGVtZW50O1xufVxuZXhwb3J0cy5nZXRGcmV0Ym9hcmRFbGVtZW50ID0gZ2V0RnJldGJvYXJkRWxlbWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplID0gdm9pZCAwO1xuY29uc3QgY2hvcmRfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvY2hvcmRcIik7XG5jb25zdCB0dW5pbmdfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvdHVuaW5nXCIpO1xuY29uc3QgaW5zdHJ1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi90aGVvcnkvaW5zdHJ1bWVudHNcIik7XG5jb25zdCBkb21fMSA9IHJlcXVpcmUoXCIuL2RvbVwiKTtcbmNvbnN0IHR5cG9ncmFwaHlfMSA9IHJlcXVpcmUoXCIuL3R5cG9ncmFwaHlcIik7XG5jb25zdCBmcmV0Ym9hcmRfMSA9IHJlcXVpcmUoXCIuL2ZyZXRib2FyZFwiKTtcbi8vIEh0bWwgZWxlbWVudHNcbmNvbnN0IGluc3RydW1lbnRFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdpbnN0cnVtZW50Jyk7XG5jb25zdCB0dW5pbmdFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCd0dW5pbmcnKTtcbmNvbnN0IGZyZXRDb3VudEVsZW1lbnQgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2ZyZXRDb3VudCcpO1xuY29uc3QgY2hvcmRFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdjaG9yZCcpO1xuY29uc3QgY2hvcmRzRGF0YUxpc3QgPSAoMCwgZG9tXzEuZ2V0QnlJZCkoJ2Nob3JkcycpO1xuY29uc3Qgc3RhdHVzRWxlbWVudCA9ICgwLCBkb21fMS5nZXRCeUlkKSgnc3RhdHVzJyk7XG5jb25zdCBvdXRwdXRFbGVtZW50ID0gKDAsIGRvbV8xLmdldEJ5SWQpKCdvdXRwdXQnKTtcbi8vIENob3JkcyBkYXRhbGlzdCBvcHRpb25zXG5jb25zdCBjaG9yZE9wdGlvbnMgPSB7fTtcbmZvciAoY29uc3QgY2hvcmQgb2YgY2hvcmRfMS5rbm93bkNob3JkTmFtZXMpIHtcbiAgICBjaG9yZE9wdGlvbnNbY2hvcmRdID0gKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdvcHRpb24nLCB7IHZhbHVlOiBjaG9yZCB9KTtcbn1cbmZ1bmN0aW9uIHBvcHVsYXRlQ2hvcmRzRGF0YWxpc3QodGV4dCA9ICcnKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZFRleHQgPSB0ZXh0LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGV4YWN0TWF0Y2hlcyA9IGNob3JkXzEua25vd25DaG9yZE5hbWVzLmZpbHRlcihjID0+IGMudG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZFRleHQpO1xuICAgIGNvbnN0IGJlZ2lubmluZ01hdGNoZXMgPSBjaG9yZF8xLmtub3duQ2hvcmROYW1lcy5maWx0ZXIoYyA9PiBjLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChub3JtYWxpemVkVGV4dCkgJiZcbiAgICAgICAgIWV4YWN0TWF0Y2hlcy5pbmNsdWRlcyhjKSk7XG4gICAgY29uc3Qgc3Vic3RyaW5nTWF0Y2hlcyA9IGNob3JkXzEua25vd25DaG9yZE5hbWVzLmZpbHRlcihjID0+IGMudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhub3JtYWxpemVkVGV4dCkgJiZcbiAgICAgICAgIWV4YWN0TWF0Y2hlcy5pbmNsdWRlcyhjKSAmJlxuICAgICAgICAhYmVnaW5uaW5nTWF0Y2hlcy5pbmNsdWRlcyhjKSk7XG4gICAgY29uc3QgbWF0Y2hlcyA9IFsuLi5leGFjdE1hdGNoZXMsIC4uLmJlZ2lubmluZ01hdGNoZXMsIC4uLnN1YnN0cmluZ01hdGNoZXNdO1xuICAgIGNob3Jkc0RhdGFMaXN0LnJlcGxhY2VDaGlsZHJlbiguLi5tYXRjaGVzLm1hcChjID0+IGNob3JkT3B0aW9uc1tjXSkpO1xufVxuZnVuY3Rpb24gcG9wdWxhdGVJbnN0cnVtZW50cygpIHtcbiAgICBmb3IgKGNvbnN0IGluc3RydW1lbnQgb2YgT2JqZWN0LmtleXMoaW5zdHJ1bWVudHNfMS5pbnN0cnVtZW50cykpIHtcbiAgICAgICAgaW5zdHJ1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoKDAsIGRvbV8xLmNyZWF0ZUVsZW1lbnQpKCdvcHRpb24nLCB7XG4gICAgICAgICAgICB2YWx1ZTogaW5zdHJ1bWVudCxcbiAgICAgICAgICAgIGlubmVyVGV4dDogaW5zdHJ1bWVudFxuICAgICAgICB9KSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0Q2hvcmREZXNjcmlwdGlvbihjaG9yZCkge1xuICAgIGNvbnN0IG5vdGVzID0gKDAsIHR5cG9ncmFwaHlfMS5hcHBseVR5cG9ncmFwaHkpKGNob3JkLm5vdGVzLmpvaW4oJyAnKSk7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcsIHtcbiAgICAgICAgaWQ6ICdjaG9yZERlc2NyaXB0aW9uJyxcbiAgICAgICAgaW5uZXJUZXh0OiBg4p+oICR7bm90ZXN9IOKfqWBcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGdldEVycm9yRWxlbWVudChtZXNzYWdlKSB7XG4gICAgcmV0dXJuICgwLCBkb21fMS5jcmVhdGVFbGVtZW50KSgncCcsIHtcbiAgICAgICAgaWQ6ICdlcnJvcicsXG4gICAgICAgIGlubmVyVGV4dDogbWVzc2FnZVxuICAgIH0pO1xufVxuZnVuY3Rpb24gc2hvd0ZyZXRib2FyZCgpIHtcbiAgICBjb25zdCB0dW5pbmdEZXNjcmlwdGlvbiA9IHR1bmluZ0VsZW1lbnQudmFsdWUudHJpbSgpO1xuICAgIGNvbnN0IGNob3JkTmFtZSA9IGNob3JkRWxlbWVudC52YWx1ZS50cmltKCk7XG4gICAgY29uc3QgZnJldENvdW50ID0gcGFyc2VJbnQoZnJldENvdW50RWxlbWVudC52YWx1ZSk7XG4gICAgc3RhdHVzRWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICBvdXRwdXRFbGVtZW50LnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHR1bmluZyA9IG5ldyB0dW5pbmdfMS5UdW5pbmcodHVuaW5nRGVzY3JpcHRpb24pO1xuICAgICAgICBsZXQgY2hvcmQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChjaG9yZE5hbWUgIT09ICcnKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNob3JkID0gbmV3IGNob3JkXzEuQ2hvcmQoY2hvcmROYW1lKTtcbiAgICAgICAgICAgICAgICBzdGF0dXNFbGVtZW50LmFwcGVuZENoaWxkKGdldENob3JkRGVzY3JpcHRpb24oY2hvcmQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGAke2Vycm9yfWA7XG4gICAgICAgICAgICAgICAgc3RhdHVzRWxlbWVudC5hcHBlbmRDaGlsZChnZXRFcnJvckVsZW1lbnQobWVzc2FnZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZyZXRib2FyZCA9IHR1bmluZy5nZXRGcmV0Ym9hcmQoY2hvcmQsIGZyZXRDb3VudCk7XG4gICAgICAgIG91dHB1dEVsZW1lbnQuYXBwZW5kQ2hpbGQoKDAsIGZyZXRib2FyZF8xLmdldEZyZXRib2FyZEVsZW1lbnQpKGZyZXRib2FyZCwgY2hvcmQgPT09IG51bGwgfHwgY2hvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNob3JkLm5vdGVzWzBdKSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBgJHtlcnJvcn1gO1xuICAgICAgICBzdGF0dXNFbGVtZW50LmFwcGVuZENoaWxkKGdldEVycm9yRWxlbWVudChgSW52YWxpZCB0dW5pbmc6ICR7bWVzc2FnZX1gKSk7XG4gICAgfVxufVxuLy8gSW5wdXQgYWN0aW9uczpcbmZ1bmN0aW9uIG9uSW5zdHJ1bWVudElucHV0KCkge1xuICAgIGNvbnN0IGluc3RydW1lbnQgPSBpbnN0cnVtZW50RWxlbWVudC52YWx1ZTtcbiAgICBpZiAoaW5zdHJ1bWVudCBpbiBpbnN0cnVtZW50c18xLmluc3RydW1lbnRzKSB7XG4gICAgICAgIGNvbnN0IHR1bmluZyA9IGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudHNbaW5zdHJ1bWVudF07XG4gICAgICAgIHR1bmluZ0VsZW1lbnQudmFsdWUgPSB0dW5pbmcuZGVzY3JpcHRpb247XG4gICAgICAgIHNob3dGcmV0Ym9hcmQoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBvblR1bmluZ0lucHV0KCkge1xuICAgIGNvbnN0IHR1bmluZ0Rlc2NyaXB0aW9uID0gdHVuaW5nRWxlbWVudC52YWx1ZTtcbiAgICBsZXQgaW5zdHJ1bWVudCA9ICcnO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHR1bmluZyA9IG5ldyB0dW5pbmdfMS5UdW5pbmcodHVuaW5nRGVzY3JpcHRpb24pO1xuICAgICAgICBpZiAodHVuaW5nLmRlc2NyaXB0aW9uIGluIGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudEJ5VHVuaW5nKSB7XG4gICAgICAgICAgICBpbnN0cnVtZW50ID0gaW5zdHJ1bWVudHNfMS5pbnN0cnVtZW50QnlUdW5pbmdbdHVuaW5nLmRlc2NyaXB0aW9uXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoX2EpIHsgfVxuICAgIGluc3RydW1lbnRFbGVtZW50LnZhbHVlID0gaW5zdHJ1bWVudDtcbiAgICBzaG93RnJldGJvYXJkKCk7XG59XG5mdW5jdGlvbiBvbkZyZXRDb3VudElucHV0KCkge1xuICAgIHNob3dGcmV0Ym9hcmQoKTtcbn1cbmZ1bmN0aW9uIG9uQ2hvcmRJbnB1dChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBJbnB1dEV2ZW50ICYmIGUuaW5wdXRUeXBlICE9PSAnaW5zZXJ0UmVwbGFjZW1lbnRUZXh0Jykge1xuICAgICAgICBjb25zdCB0ZXh0ID0gY2hvcmRFbGVtZW50LnZhbHVlLnRyaW0oKTtcbiAgICAgICAgcG9wdWxhdGVDaG9yZHNEYXRhbGlzdCh0ZXh0KTtcbiAgICB9XG4gICAgc2hvd0ZyZXRib2FyZCgpO1xufVxuLy8gRW50cnkgZnVuY3Rpb25cbmZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgcG9wdWxhdGVDaG9yZHNEYXRhbGlzdCgpO1xuICAgIHBvcHVsYXRlSW5zdHJ1bWVudHMoKTtcbiAgICBpbnN0cnVtZW50RWxlbWVudC52YWx1ZSA9IGluc3RydW1lbnRzXzEuZGVmYXVsdEluc3RydW1lbnQ7XG4gICAgb25JbnN0cnVtZW50SW5wdXQoKTtcbiAgICBpbnN0cnVtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uSW5zdHJ1bWVudElucHV0KTtcbiAgICB0dW5pbmdFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25UdW5pbmdJbnB1dCk7XG4gICAgZnJldENvdW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uRnJldENvdW50SW5wdXQpO1xuICAgIGNob3JkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uQ2hvcmRJbnB1dCk7XG4gICAgY2hvcmRFbGVtZW50LmZvY3VzKCk7XG59XG5leHBvcnRzLmluaXRpYWxpemUgPSBpbml0aWFsaXplO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFwcGx5VHlwb2dyYXBoeSA9IHZvaWQgMDtcbmNvbnN0IGNoYXJhY3RlckRpY3QgPSB7XG4gICAgJyMnOiAn4pmvJyxcbiAgICAnYic6ICfima0nLFxuICAgICcwJzogJ+KCgCcsXG4gICAgJzEnOiAn4oKBJyxcbiAgICAnMic6ICfigoInLFxuICAgICczJzogJ+KCgycsXG4gICAgJzQnOiAn4oKEJyxcbiAgICAnNSc6ICfigoUnLFxuICAgICc2JzogJ+KChicsXG4gICAgJzcnOiAn4oKHJyxcbiAgICAnOCc6ICfigognLFxuICAgICc5JzogJ+KCiScsXG59O1xuY29uc3QgcmVwbGFjZVJlZ2V4ID0gbmV3IFJlZ0V4cChgWyR7T2JqZWN0LmtleXMoY2hhcmFjdGVyRGljdCl9XWAsICdnJyk7XG5mdW5jdGlvbiBhcHBseVR5cG9ncmFwaHkodGV4dCkge1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UocmVwbGFjZVJlZ2V4LCBjID0+IGNoYXJhY3RlckRpY3RbY10pO1xufVxuZXhwb3J0cy5hcHBseVR5cG9ncmFwaHkgPSBhcHBseVR5cG9ncmFwaHk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1aV8xID0gcmVxdWlyZShcIi4vdWlcIik7XG4oMCwgdWlfMS5pbml0aWFsaXplKSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9