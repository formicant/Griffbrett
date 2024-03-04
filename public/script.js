/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/chord.ts":
/*!**********************!*\
  !*** ./src/chord.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Chord = void 0;
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
exports.Note = exports.noteNamePattern = void 0;
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
    if (note.octave !== undefined) {
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
        const allowedPitches = new Set(chord.notes.map(n => n.pitchClass));
        return this.openStrings.map(s => getFrets(s, allowedPitches, fretCount));
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
const typography_1 = __webpack_require__(/*! ./typography */ "./src/typography.ts");
function getById(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw Error(`Cannot find element with id '${id}'`);
    }
    return element;
}
function populateInstruments(instrumentsElement) {
    for (const instrument of Object.keys(instruments_1.instruments)) {
        const optionElement = document.createElement('option');
        optionElement.value = instrument;
        optionElement.innerText = instrument;
        instrumentsElement.appendChild(optionElement);
    }
}
function getChordDescription(chord) {
    const chordDescriptionElement = document.createElement('p');
    chordDescriptionElement.id = 'chordDescription';
    const notes = (0, typography_1.applyTypography)(chord.notes.join(' '));
    chordDescriptionElement.append(`⟨ ${notes} ⟩`);
    return chordDescriptionElement;
}
function getFretHeaderElement(fretCount) {
    const fretHeaderElement = document.createElement('p');
    fretHeaderElement.className = 'fretHeader';
    for (const fretIndex of Array(fretCount).keys()) {
        const fretIndexElement = document.createElement('span');
        fretIndexElement.append(fretIndex.toString());
        fretHeaderElement.appendChild(fretIndexElement);
    }
    return fretHeaderElement;
}
function getFretElement(fretNote) {
    const fretElement = document.createElement('span');
    const text = fretNote !== null
        ? (0, typography_1.applyTypography)(fretNote.toString())
        : '·';
    fretElement.append(text);
    return fretElement;
}
function getFrettedStringElement(frettedString) {
    const frettedStringElement = document.createElement('p');
    for (const fretNote of frettedString) {
        frettedStringElement.appendChild(getFretElement(fretNote));
    }
    return frettedStringElement;
}
function getFretboardElement(fretboard) {
    const fretboardElement = document.createElement('div');
    fretboardElement.id = 'fretboard';
    fretboardElement.appendChild(getFretHeaderElement(fretboard[0].length));
    for (const frettedString of [...fretboard].reverse()) {
        fretboardElement.appendChild(getFrettedStringElement(frettedString));
    }
    return fretboardElement;
}
function getErrorElement(message) {
    const errorElement = document.createElement('p');
    errorElement.id = 'error';
    errorElement.append(message);
    return errorElement;
}
function initialize() {
    const instrumentElement = getById('instrument');
    const tuningElement = getById('tuning');
    const fretCountElement = getById('fretCount');
    const chordElement = getById('chord');
    const outputElement = getById('output');
    function showFretboard() {
        try {
            const tuningDescription = tuningElement.value.trim();
            const chordName = chordElement.value.trim();
            const fretCount = parseInt(fretCountElement.value);
            if (!tuningDescription || !chordName) {
                outputElement.replaceChildren();
                return;
            }
            const tuning = new tuning_1.Tuning(tuningDescription);
            const chord = new chord_1.Chord(chordName);
            const fretboard = tuning.getFretboard(chord, fretCount);
            outputElement.replaceChildren(getChordDescription(chord), getFretboardElement(fretboard));
        }
        catch (error) {
            const message = error instanceof Error ? error.message : `${error}`;
            outputElement.replaceChildren(getErrorElement(message));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxhQUFhO0FBQ2IsZUFBZSxtQkFBTyxDQUFDLDZCQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHVCQUF1QjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELEtBQUs7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsT0FBTztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixXQUFXLEtBQUsscUJBQXFCO0FBQ3ZEO0FBQ0E7QUFDQSxhQUFhOzs7Ozs7Ozs7OztBQzdDQTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx5QkFBeUIsR0FBRywwQkFBMEIsR0FBRyxtQkFBbUI7QUFDNUUsaUJBQWlCLG1CQUFPLENBQUMsaUNBQVU7QUFDbkMsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCOzs7Ozs7Ozs7OztBQ3pDWjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxZQUFZLEdBQUcsdUJBQXVCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QixrQ0FBa0Msd0JBQXdCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFlBQVksYUFBYSxTQUFTO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsS0FBSztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVMsRUFBRSxZQUFZO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQSxZQUFZOzs7Ozs7Ozs7OztBQzlEQztBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxjQUFjLEdBQUcsZ0JBQWdCO0FBQ2pDLGVBQWUsbUJBQU8sQ0FBQyw2QkFBUTtBQUMvQixvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBLDRCQUE0Qix3QkFBd0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGlCQUFpQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOzs7Ozs7Ozs7OztBQ3pDRDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQywyQkFBMkI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCOzs7Ozs7Ozs7OztBQ3JCVjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEIsZ0JBQWdCLG1CQUFPLENBQUMsK0JBQVM7QUFDakMsaUJBQWlCLG1CQUFPLENBQUMsaUNBQVU7QUFDbkMsc0JBQXNCLG1CQUFPLENBQUMsMkNBQWU7QUFDN0MscUJBQXFCLG1CQUFPLENBQUMseUNBQWM7QUFDM0M7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELEdBQUc7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLE9BQU87QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFLE1BQU07QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7O1VDbElsQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGFBQWEsbUJBQU8sQ0FBQyx5QkFBTTtBQUMzQiIsInNvdXJjZXMiOlsid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvY2hvcmQudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy9pbnN0cnVtZW50cy50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL25vdGUudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy90dW5pbmcudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy90eXBvZ3JhcGh5LnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvdWkudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNob3JkID0gdm9pZCAwO1xuY29uc3Qgbm90ZV8xID0gcmVxdWlyZShcIi4vbm90ZVwiKTtcbi8vIEludGVydmFscyBpbiBzZW1pdG9uZXM6XG5jb25zdCBbUDEsIG0yLCBNMiwgbTMsIE0zLCBQNCwgQTQsIFA1LCBtNiwgTTYsIG03LCBNN10gPSBBcnJheSgxMikua2V5cygpO1xuY29uc3Qgc3VmZml4TWVhbmluZ3MgPSB7XG4gICAgJ20obm81KSc6IFtQMSwgbTNdLFxuICAgICcobm81KSc6IFtQMSwgTTNdLFxuICAgICc1JzogW1AxLCBQNV0sXG4gICAgJ2RpbSc6IFtQMSwgbTMsIEE0XSxcbiAgICAnc3VzMic6IFtQMSwgTTIsIFA1XSxcbiAgICAnbSc6IFtQMSwgbTMsIFA1XSxcbiAgICAnJzogW1AxLCBNMywgUDVdLFxuICAgICdzdXM0JzogW1AxLCBQNCwgUDVdLFxuICAgICdhdWcnOiBbUDEsIE0zLCBtNl0sXG4gICAgJ202JzogW1AxLCBtMywgUDUsIE02XSxcbiAgICAnNic6IFtQMSwgTTMsIFA1LCBNNl0sXG4gICAgJ203JzogW1AxLCBtMywgUDUsIG03XSxcbiAgICAnbU03JzogW1AxLCBtMywgUDUsIE03XSxcbiAgICAnNyc6IFtQMSwgTTMsIFA1LCBtN10sXG4gICAgJ003JzogW1AxLCBNMywgUDUsIE03XSxcbn07XG5jb25zdCBjaG9yZFJlZ2V4ID0gbmV3IFJlZ0V4cChgXigke25vdGVfMS5ub3RlTmFtZVBhdHRlcm59KSguKikkYCk7XG5jbGFzcyBDaG9yZCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBjb25zdCBtYXRjaCA9IG5hbWUubWF0Y2goY2hvcmRSZWdleCk7XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgQ2FuJ3QgcGFyc2UgY2hvcmQgJHtuYW1lfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IFtfLCByb290TmFtZSwgc3VmZml4XSA9IG1hdGNoO1xuICAgICAgICBjb25zdCByb290ID0gbmV3IG5vdGVfMS5Ob3RlKHJvb3ROYW1lKTtcbiAgICAgICAgaWYgKCEoc3VmZml4IGluIHN1ZmZpeE1lYW5pbmdzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBDYW4ndCBwYXJzZSBjaG9yZCBzdWZmaXggJHtzdWZmaXh9YCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub3RlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGludGVydmFsIG9mIHN1ZmZpeE1lYW5pbmdzW3N1ZmZpeF0pIHtcbiAgICAgICAgICAgIHRoaXMubm90ZXMucHVzaChyb290LmFkZEludGVydmFsKGludGVydmFsKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9ID0gPCR7dGhpcy5ub3Rlcy5qb2luKCcgJyl9PmA7XG4gICAgfVxufVxuZXhwb3J0cy5DaG9yZCA9IENob3JkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHRJbnN0cnVtZW50ID0gZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmcgPSBleHBvcnRzLmluc3RydW1lbnRzID0gdm9pZCAwO1xuY29uc3QgdHVuaW5nXzEgPSByZXF1aXJlKFwiLi90dW5pbmdcIik7XG5leHBvcnRzLmluc3RydW1lbnRzID0ge1xuICAgICdCYWxhbGFpa2EgKGFjYWRlbWljKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0U0IEU0IEE0JyksXG4gICAgJ0JhbGFsYWlrYSAoZm9sayknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDNCBFNCBHNCcpLFxuICAgICdCYW5qbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEQzIEczIEIzIEQ0JyksXG4gICAgJ0Jhc3MnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFMSBBMSBEMiBHMicpLFxuICAgICdCcmFndWluaGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBCNCBENScpLFxuICAgICdDaGFyYW5nbyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEM1IEUgQTQgRTUnKSxcbiAgICAnQ2F2YXF1aW5obyAoUG9ydHVnYWwgR0dCRCknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBHNCBCNCBENScpLFxuICAgICdDYXZhcXVpbmhvIChQb3J0dWdhbCBEQUJFKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q1IEE0IEI0IEU1JyksXG4gICAgJ0NhdmFxdWluaG8gKEJyYXppbCBER0JEKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEI0IEQ1JyksXG4gICAgJ0NhdmFxdWluaG8gKEJyYXppbCBER0JFKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEI0IEU1JyksXG4gICAgJ0RhbGEgZmFlbmR5cic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0U0IEE0IEU1JyksXG4gICAgJ0RlY2hpZyBwb25kYXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDNCBENCBHNCcpLFxuICAgICdHdWl0YWxlbGUnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMiBEMyBHMyBDNCBFNCBBNCcpLFxuICAgICdHdWl0YXInOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdFMiBBMiBEMyBHMyBCMyBFNCcpLFxuICAgICdHdWl0YXJyw7NuJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTEgRDIgRzIgQzMgRTMgQTInKSxcbiAgICAnSmFyYW5hIGphcm9jaGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBDNCBFIEEzIEczJyksXG4gICAgJ0phcmFuYSBodWFzdGVjYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEIzIEQ0IEYjNCBBNCcpLFxuICAgICdNYW5kb2xpbic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEQ0IEE0IEU1JyksXG4gICAgJ1JhamFvJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQzQgRTQgQTQnKSxcbiAgICAnUmVxdWludG8nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMiBEMyBHMyBDNCBFNCBBNCcpLFxuICAgICdTZW1pc3RydW5rYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0QyIEcyIEIyIEQzIEczIEIzIEQ0JyksXG4gICAgJ1Rlbm9yIGd1aXRhcic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0MzIEczIEQ0IEE0JyksXG4gICAgJ1RpbXBsZSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEM1IEU0IEE0IEQ1JyksXG4gICAgJ1VrdWxlbGUgKGhpZ2ggRyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHNCBDNCBFNCBBNCcpLFxuICAgICdVa3VsZWxlIChsb3cgRyknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBDNCBFNCBBNCcpLFxuICAgICdVa3VsZWxlIChiYXJpdG9uZSknOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdEMyBHMyBCMyBFNCcpLFxuICAgICdWaWh1ZWxhJzogbmV3IHR1bmluZ18xLlR1bmluZygnQTMgRDQgRzQgQjMgRTQnKSxcbiAgICAnVmlvbGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdDMyBHMyBENCBBNCcpLFxuICAgICdWaW9saW4nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdHMyBENCBBNCBFNScpLFxufTtcbmV4cG9ydHMuaW5zdHJ1bWVudEJ5VHVuaW5nID0ge307XG5mb3IgKGNvbnN0IFtuYW1lLCB0dW5pbmddIG9mIE9iamVjdC5lbnRyaWVzKGV4cG9ydHMuaW5zdHJ1bWVudHMpKSB7XG4gICAgZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmdbdHVuaW5nLmRlc2NyaXB0aW9uXSA9IG5hbWU7XG4gICAgLy8gTm93LCB0aGUgbGFzdCBpbnN0cnVtZW50IHdpdGggdGhlIGdpdmVuIHR1bmluZyBpcyB1c2VkLlxuICAgIC8vIFRPRE86IENoYW5nZSB0aGlzIGlmIG5lZWRlZC5cbn1cbmV4cG9ydHMuZGVmYXVsdEluc3RydW1lbnQgPSAnVWt1bGVsZSAoaGlnaCBHKSc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTm90ZSA9IGV4cG9ydHMubm90ZU5hbWVQYXR0ZXJuID0gdm9pZCAwO1xuY29uc3Qgbm90ZU5hbWVzID0gW1xuICAgIFsnQyddLCBbJ0MjJywgJ0RiJ10sXG4gICAgWydEJ10sIFsnRCMnLCAnRWInXSxcbiAgICBbJ0UnXSxcbiAgICBbJ0YnXSwgWydGIycsICdHYiddLFxuICAgIFsnRyddLCBbJ0cjJywgJ0FiJ10sXG4gICAgWydBJ10sIFsnQSMnLCAnQmInXSxcbiAgICBbJ0InXSxcbl07XG5jb25zdCB1bnN1cHBvcnRlZCA9IHtcbiAgICAnQ2InOiAnQicsXG4gICAgJ0IjJzogJ0MnLFxuICAgICdGYic6ICdFJyxcbiAgICAnRSMnOiAnRicsXG59O1xuY29uc3Qgbm90ZUluZGV4QnlOYW1lID0ge307XG5mb3IgKGNvbnN0IFtpbmRleCwgbmFtZXNdIG9mIG5vdGVOYW1lcy5lbnRyaWVzKCkpIHtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgbmFtZXMpIHtcbiAgICAgICAgbm90ZUluZGV4QnlOYW1lW25hbWVdID0gaW5kZXg7XG4gICAgfVxufVxuZXhwb3J0cy5ub3RlTmFtZVBhdHRlcm4gPSAnW0EtR11bI2JdPyc7XG5jb25zdCBub3RlUmVnZXggPSBuZXcgUmVnRXhwKGBeKCR7ZXhwb3J0cy5ub3RlTmFtZVBhdHRlcm59KShcXFxcZCk/JGApO1xuY2xhc3MgTm90ZSB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICBjb25zdCBtYXRjaCA9IG5hbWUubWF0Y2gobm90ZVJlZ2V4KTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBjb25zdCBbXywgbm90ZU5hbWUsIG9jdGF2ZU5hbWVdID0gbWF0Y2g7XG4gICAgICAgICAgICBpZiAobm90ZU5hbWUgaW4gdW5zdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWdnZXN0aW9uID0gdW5zdXBwb3J0ZWRbbm90ZU5hbWVdO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVXNlICR7c3VnZ2VzdGlvbn0gaW5zdGVhZCBvZiAke25vdGVOYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5waXRjaENsYXNzID0gbm90ZUluZGV4QnlOYW1lW25vdGVOYW1lXTtcbiAgICAgICAgICAgIHRoaXMub2N0YXZlID0gb2N0YXZlTmFtZSAhPT0gdW5kZWZpbmVkID8gcGFyc2VJbnQob2N0YXZlTmFtZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYENhbid0IHBhcnNlIG5vdGUgJHtuYW1lfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tUGl0Y2hDbGFzc0FuZE9jdGF2ZShwaXRjaENsYXNzLCBvY3RhdmUpIHtcbiAgICAgICAgbGV0IG5vdGUgPSBPYmplY3QuY3JlYXRlKE5vdGUucHJvdG90eXBlKTtcbiAgICAgICAgbm90ZS5waXRjaENsYXNzID0gcGl0Y2hDbGFzcztcbiAgICAgICAgbm90ZS5vY3RhdmUgPSBvY3RhdmU7XG4gICAgICAgIHJldHVybiBub3RlO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgY29uc3Qgbm90ZU5hbWUgPSBub3RlTmFtZXNbdGhpcy5waXRjaENsYXNzXVswXTtcbiAgICAgICAgcmV0dXJuIHRoaXMub2N0YXZlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gYCR7bm90ZU5hbWV9JHt0aGlzLm9jdGF2ZX1gXG4gICAgICAgICAgICA6IG5vdGVOYW1lO1xuICAgIH1cbiAgICBhZGRJbnRlcnZhbChpbnRlcnZhbCkge1xuICAgICAgICBjb25zdCBwaXRjaCA9IHRoaXMucGl0Y2hDbGFzcyArIGludGVydmFsO1xuICAgICAgICBjb25zdCBvY3RhdmUgPSB0aGlzLm9jdGF2ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHRoaXMub2N0YXZlICsgTWF0aC5mbG9vcihwaXRjaCAvIDEyKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBOb3RlLmZyb21QaXRjaENsYXNzQW5kT2N0YXZlKHBpdGNoICUgMTIsIG9jdGF2ZSk7IC8vIGluY29ycmVjdCBmb3IgbmVnYXRpdmUgaW50ZXJ2YWxzXG4gICAgfVxufVxuZXhwb3J0cy5Ob3RlID0gTm90ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UdW5pbmcgPSBleHBvcnRzLmdldEdyb3VwID0gdm9pZCAwO1xuY29uc3Qgbm90ZV8xID0gcmVxdWlyZShcIi4vbm90ZVwiKTtcbmNvbnN0IHNwbGl0UmVnZXggPSAvXFxzK3woPz1bQS1aXSkvOyAvLyBzcGxpdCBieSB3aGl0ZXNwYWNlIG9yIGJlZm9yZSB1cHBlcmNhc2UgbGV0dGVyc1xuZnVuY3Rpb24gZ2V0RnJldHMob3BlblN0cmluZywgYWxsb3dlZFBpdGNoZXMsIGZyZXRDb3VudCkge1xuICAgIGNvbnN0IGZyZXRzID0gW107XG4gICAgZm9yIChsZXQgZnJldEluZGV4ID0gMDsgZnJldEluZGV4IDw9IGZyZXRDb3VudDsgZnJldEluZGV4KyspIHtcbiAgICAgICAgY29uc3Qgbm90ZSA9IG9wZW5TdHJpbmcuYWRkSW50ZXJ2YWwoZnJldEluZGV4KTtcbiAgICAgICAgZnJldHMucHVzaChhbGxvd2VkUGl0Y2hlcy5oYXMobm90ZS5waXRjaENsYXNzKSA/IG5vdGUgOiBudWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXRzO1xufVxuZnVuY3Rpb24gZ2V0R3JvdXAocm9vdE5vdGUsIG5vdGUpIHtcbiAgICBpZiAobm90ZS5vY3RhdmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigobm90ZS5vY3RhdmUgKiAxMiArIG5vdGUucGl0Y2hDbGFzcyAtIHJvb3ROb3RlLnBpdGNoQ2xhc3MpIC8gMTIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnRzLmdldEdyb3VwID0gZ2V0R3JvdXA7XG5jbGFzcyBUdW5pbmcge1xuICAgIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMub3BlblN0cmluZ3MgPSBkZXNjcmlwdGlvblxuICAgICAgICAgICAgLnNwbGl0KHNwbGl0UmVnZXgpXG4gICAgICAgICAgICAuZmlsdGVyKG4gPT4gbiAhPT0gJycpXG4gICAgICAgICAgICAubWFwKG4gPT4gbmV3IG5vdGVfMS5Ob3RlKG4pKTtcbiAgICAgICAgaWYgKHRoaXMub3BlblN0cmluZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0IGxlYXN0IG9uZSBvcGVuIHN0cmluZyByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0aGlzLm9wZW5TdHJpbmdzLmpvaW4oJyAnKTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBgVHVuaW5nKFwiJHt0aGlzLmRlc2NyaXB0aW9ufVwiKWA7XG4gICAgfVxuICAgIGdldEZyZXRib2FyZChjaG9yZCwgZnJldENvdW50ID0gMTIpIHtcbiAgICAgICAgY29uc3QgYWxsb3dlZFBpdGNoZXMgPSBuZXcgU2V0KGNob3JkLm5vdGVzLm1hcChuID0+IG4ucGl0Y2hDbGFzcykpO1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuU3RyaW5ncy5tYXAocyA9PiBnZXRGcmV0cyhzLCBhbGxvd2VkUGl0Y2hlcywgZnJldENvdW50KSk7XG4gICAgfVxufVxuZXhwb3J0cy5UdW5pbmcgPSBUdW5pbmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYXBwbHlUeXBvZ3JhcGh5ID0gdm9pZCAwO1xuY29uc3QgY2hhcmFjdGVyRGljdCA9IHtcbiAgICAnIyc6ICfima8nLFxuICAgICdiJzogJ+KZrScsXG4gICAgJzAnOiAn4oKAJyxcbiAgICAnMSc6ICfigoEnLFxuICAgICcyJzogJ+KCgicsXG4gICAgJzMnOiAn4oKDJyxcbiAgICAnNCc6ICfigoQnLFxuICAgICc1JzogJ+KChScsXG4gICAgJzYnOiAn4oKGJyxcbiAgICAnNyc6ICfigocnLFxuICAgICc4JzogJ+KCiCcsXG4gICAgJzknOiAn4oKJJyxcbn07XG5jb25zdCByZXBsYWNlUmVnZXggPSBuZXcgUmVnRXhwKGBbJHtPYmplY3Qua2V5cyhjaGFyYWN0ZXJEaWN0KX1dYCwgJ2cnKTtcbmZ1bmN0aW9uIGFwcGx5VHlwb2dyYXBoeSh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShyZXBsYWNlUmVnZXgsIGMgPT4gY2hhcmFjdGVyRGljdFtjXSk7XG59XG5leHBvcnRzLmFwcGx5VHlwb2dyYXBoeSA9IGFwcGx5VHlwb2dyYXBoeTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0aWFsaXplID0gdm9pZCAwO1xuY29uc3QgY2hvcmRfMSA9IHJlcXVpcmUoXCIuL2Nob3JkXCIpO1xuY29uc3QgdHVuaW5nXzEgPSByZXF1aXJlKFwiLi90dW5pbmdcIik7XG5jb25zdCBpbnN0cnVtZW50c18xID0gcmVxdWlyZShcIi4vaW5zdHJ1bWVudHNcIik7XG5jb25zdCB0eXBvZ3JhcGh5XzEgPSByZXF1aXJlKFwiLi90eXBvZ3JhcGh5XCIpO1xuZnVuY3Rpb24gZ2V0QnlJZChpZCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHRocm93IEVycm9yKGBDYW5ub3QgZmluZCBlbGVtZW50IHdpdGggaWQgJyR7aWR9J2ApO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbmZ1bmN0aW9uIHBvcHVsYXRlSW5zdHJ1bWVudHMoaW5zdHJ1bWVudHNFbGVtZW50KSB7XG4gICAgZm9yIChjb25zdCBpbnN0cnVtZW50IG9mIE9iamVjdC5rZXlzKGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudHMpKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgb3B0aW9uRWxlbWVudC52YWx1ZSA9IGluc3RydW1lbnQ7XG4gICAgICAgIG9wdGlvbkVsZW1lbnQuaW5uZXJUZXh0ID0gaW5zdHJ1bWVudDtcbiAgICAgICAgaW5zdHJ1bWVudHNFbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbkVsZW1lbnQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldENob3JkRGVzY3JpcHRpb24oY2hvcmQpIHtcbiAgICBjb25zdCBjaG9yZERlc2NyaXB0aW9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBjaG9yZERlc2NyaXB0aW9uRWxlbWVudC5pZCA9ICdjaG9yZERlc2NyaXB0aW9uJztcbiAgICBjb25zdCBub3RlcyA9ICgwLCB0eXBvZ3JhcGh5XzEuYXBwbHlUeXBvZ3JhcGh5KShjaG9yZC5ub3Rlcy5qb2luKCcgJykpO1xuICAgIGNob3JkRGVzY3JpcHRpb25FbGVtZW50LmFwcGVuZChg4p+oICR7bm90ZXN9IOKfqWApO1xuICAgIHJldHVybiBjaG9yZERlc2NyaXB0aW9uRWxlbWVudDtcbn1cbmZ1bmN0aW9uIGdldEZyZXRIZWFkZXJFbGVtZW50KGZyZXRDb3VudCkge1xuICAgIGNvbnN0IGZyZXRIZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGZyZXRIZWFkZXJFbGVtZW50LmNsYXNzTmFtZSA9ICdmcmV0SGVhZGVyJztcbiAgICBmb3IgKGNvbnN0IGZyZXRJbmRleCBvZiBBcnJheShmcmV0Q291bnQpLmtleXMoKSkge1xuICAgICAgICBjb25zdCBmcmV0SW5kZXhFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBmcmV0SW5kZXhFbGVtZW50LmFwcGVuZChmcmV0SW5kZXgudG9TdHJpbmcoKSk7XG4gICAgICAgIGZyZXRIZWFkZXJFbGVtZW50LmFwcGVuZENoaWxkKGZyZXRJbmRleEVsZW1lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldEhlYWRlckVsZW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRGcmV0RWxlbWVudChmcmV0Tm90ZSkge1xuICAgIGNvbnN0IGZyZXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHRleHQgPSBmcmV0Tm90ZSAhPT0gbnVsbFxuICAgICAgICA/ICgwLCB0eXBvZ3JhcGh5XzEuYXBwbHlUeXBvZ3JhcGh5KShmcmV0Tm90ZS50b1N0cmluZygpKVxuICAgICAgICA6ICfCtyc7XG4gICAgZnJldEVsZW1lbnQuYXBwZW5kKHRleHQpO1xuICAgIHJldHVybiBmcmV0RWxlbWVudDtcbn1cbmZ1bmN0aW9uIGdldEZyZXR0ZWRTdHJpbmdFbGVtZW50KGZyZXR0ZWRTdHJpbmcpIHtcbiAgICBjb25zdCBmcmV0dGVkU3RyaW5nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBmb3IgKGNvbnN0IGZyZXROb3RlIG9mIGZyZXR0ZWRTdHJpbmcpIHtcbiAgICAgICAgZnJldHRlZFN0cmluZ0VsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0RnJldEVsZW1lbnQoZnJldE5vdGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXR0ZWRTdHJpbmdFbGVtZW50O1xufVxuZnVuY3Rpb24gZ2V0RnJldGJvYXJkRWxlbWVudChmcmV0Ym9hcmQpIHtcbiAgICBjb25zdCBmcmV0Ym9hcmRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZnJldGJvYXJkRWxlbWVudC5pZCA9ICdmcmV0Ym9hcmQnO1xuICAgIGZyZXRib2FyZEVsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0RnJldEhlYWRlckVsZW1lbnQoZnJldGJvYXJkWzBdLmxlbmd0aCkpO1xuICAgIGZvciAoY29uc3QgZnJldHRlZFN0cmluZyBvZiBbLi4uZnJldGJvYXJkXS5yZXZlcnNlKCkpIHtcbiAgICAgICAgZnJldGJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0dGVkU3RyaW5nRWxlbWVudChmcmV0dGVkU3RyaW5nKSk7XG4gICAgfVxuICAgIHJldHVybiBmcmV0Ym9hcmRFbGVtZW50O1xufVxuZnVuY3Rpb24gZ2V0RXJyb3JFbGVtZW50KG1lc3NhZ2UpIHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgZXJyb3JFbGVtZW50LmlkID0gJ2Vycm9yJztcbiAgICBlcnJvckVsZW1lbnQuYXBwZW5kKG1lc3NhZ2UpO1xuICAgIHJldHVybiBlcnJvckVsZW1lbnQ7XG59XG5mdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIGNvbnN0IGluc3RydW1lbnRFbGVtZW50ID0gZ2V0QnlJZCgnaW5zdHJ1bWVudCcpO1xuICAgIGNvbnN0IHR1bmluZ0VsZW1lbnQgPSBnZXRCeUlkKCd0dW5pbmcnKTtcbiAgICBjb25zdCBmcmV0Q291bnRFbGVtZW50ID0gZ2V0QnlJZCgnZnJldENvdW50Jyk7XG4gICAgY29uc3QgY2hvcmRFbGVtZW50ID0gZ2V0QnlJZCgnY2hvcmQnKTtcbiAgICBjb25zdCBvdXRwdXRFbGVtZW50ID0gZ2V0QnlJZCgnb3V0cHV0Jyk7XG4gICAgZnVuY3Rpb24gc2hvd0ZyZXRib2FyZCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHR1bmluZ0Rlc2NyaXB0aW9uID0gdHVuaW5nRWxlbWVudC52YWx1ZS50cmltKCk7XG4gICAgICAgICAgICBjb25zdCBjaG9yZE5hbWUgPSBjaG9yZEVsZW1lbnQudmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgY29uc3QgZnJldENvdW50ID0gcGFyc2VJbnQoZnJldENvdW50RWxlbWVudC52YWx1ZSk7XG4gICAgICAgICAgICBpZiAoIXR1bmluZ0Rlc2NyaXB0aW9uIHx8ICFjaG9yZE5hbWUpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXRFbGVtZW50LnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHR1bmluZyA9IG5ldyB0dW5pbmdfMS5UdW5pbmcodHVuaW5nRGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgY29uc3QgY2hvcmQgPSBuZXcgY2hvcmRfMS5DaG9yZChjaG9yZE5hbWUpO1xuICAgICAgICAgICAgY29uc3QgZnJldGJvYXJkID0gdHVuaW5nLmdldEZyZXRib2FyZChjaG9yZCwgZnJldENvdW50KTtcbiAgICAgICAgICAgIG91dHB1dEVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKGdldENob3JkRGVzY3JpcHRpb24oY2hvcmQpLCBnZXRGcmV0Ym9hcmRFbGVtZW50KGZyZXRib2FyZCkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogYCR7ZXJyb3J9YDtcbiAgICAgICAgICAgIG91dHB1dEVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKGdldEVycm9yRWxlbWVudChtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25JbnN0cnVtZW50SW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IGluc3RydW1lbnQgPSBpbnN0cnVtZW50RWxlbWVudC52YWx1ZTtcbiAgICAgICAgaWYgKGluc3RydW1lbnQgaW4gaW5zdHJ1bWVudHNfMS5pbnN0cnVtZW50cykge1xuICAgICAgICAgICAgY29uc3QgdHVuaW5nID0gaW5zdHJ1bWVudHNfMS5pbnN0cnVtZW50c1tpbnN0cnVtZW50XTtcbiAgICAgICAgICAgIHR1bmluZ0VsZW1lbnQudmFsdWUgPSB0dW5pbmcuZGVzY3JpcHRpb247XG4gICAgICAgICAgICBzaG93RnJldGJvYXJkKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25UdW5pbmdJbnB1dCgpIHtcbiAgICAgICAgY29uc3QgdHVuaW5nRGVzY3JpcHRpb24gPSB0dW5pbmdFbGVtZW50LnZhbHVlO1xuICAgICAgICBsZXQgaW5zdHJ1bWVudCA9ICcnO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdHVuaW5nID0gbmV3IHR1bmluZ18xLlR1bmluZyh0dW5pbmdEZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBpZiAodHVuaW5nLmRlc2NyaXB0aW9uIGluIGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudEJ5VHVuaW5nKSB7XG4gICAgICAgICAgICAgICAgaW5zdHJ1bWVudCA9IGluc3RydW1lbnRzXzEuaW5zdHJ1bWVudEJ5VHVuaW5nW3R1bmluZy5kZXNjcmlwdGlvbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKF9hKSB7IH1cbiAgICAgICAgaW5zdHJ1bWVudEVsZW1lbnQudmFsdWUgPSBpbnN0cnVtZW50O1xuICAgICAgICBzaG93RnJldGJvYXJkKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uRnJldENvdW50SW5wdXQoKSB7XG4gICAgICAgIHNob3dGcmV0Ym9hcmQoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25DaG9yZElucHV0KCkge1xuICAgICAgICBzaG93RnJldGJvYXJkKCk7XG4gICAgfVxuICAgIHBvcHVsYXRlSW5zdHJ1bWVudHMoaW5zdHJ1bWVudEVsZW1lbnQpO1xuICAgIGluc3RydW1lbnRFbGVtZW50LnZhbHVlID0gaW5zdHJ1bWVudHNfMS5kZWZhdWx0SW5zdHJ1bWVudDtcbiAgICBvbkluc3RydW1lbnRJbnB1dCgpO1xuICAgIGluc3RydW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25JbnN0cnVtZW50SW5wdXQpO1xuICAgIHR1bmluZ0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvblR1bmluZ0lucHV0KTtcbiAgICBmcmV0Q291bnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25GcmV0Q291bnRJbnB1dCk7XG4gICAgY2hvcmRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25DaG9yZElucHV0KTtcbiAgICBjaG9yZEVsZW1lbnQuZm9jdXMoKTtcbn1cbmV4cG9ydHMuaW5pdGlhbGl6ZSA9IGluaXRpYWxpemU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1aV8xID0gcmVxdWlyZShcIi4vdWlcIik7XG4oMCwgdWlfMS5pbml0aWFsaXplKSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9