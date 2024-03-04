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
function getFretElement(fretNote, rootNote) {
    const fretElement = document.createElement('span');
    const text = fretNote !== null
        ? (0, typography_1.applyTypography)(fretNote.toString())
        : '·';
    const group = (0, tuning_1.getGroup)(rootNote, fretNote);
    if (group !== undefined) {
        fretElement.className = `group${(group + 60) % 6}`;
    }
    fretElement.append(text);
    return fretElement;
}
function getFrettedStringElement(frettedString, rootNote) {
    const frettedStringElement = document.createElement('p');
    for (const fretNote of frettedString) {
        frettedStringElement.appendChild(getFretElement(fretNote, rootNote));
    }
    return frettedStringElement;
}
function getFretboardElement(fretboard, rootNote) {
    const fretboardElement = document.createElement('div');
    fretboardElement.id = 'fretboard';
    fretboardElement.appendChild(getFretHeaderElement(fretboard[0].length));
    for (const frettedString of [...fretboard].reverse()) {
        fretboardElement.appendChild(getFrettedStringElement(frettedString, rootNote));
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
            outputElement.replaceChildren(getChordDescription(chord), getFretboardElement(fretboard, chord.notes[0]));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsYUFBYSxtQkFBTyxDQUFDLHlCQUFNO0FBQzNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy9jaG9yZC50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL2luc3RydW1lbnRzLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvbm90ZS50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3R1bmluZy50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3R5cG9ncmFwaHkudHMiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy91aS50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2hvcmQgPSB2b2lkIDA7XG5jb25zdCBub3RlXzEgPSByZXF1aXJlKFwiLi9ub3RlXCIpO1xuLy8gSW50ZXJ2YWxzIGluIHNlbWl0b25lczpcbmNvbnN0IFtQMSwgbTIsIE0yLCBtMywgTTMsIFA0LCBBNCwgUDUsIG02LCBNNiwgbTcsIE03XSA9IEFycmF5KDEyKS5rZXlzKCk7XG5jb25zdCBzdWZmaXhNZWFuaW5ncyA9IHtcbiAgICAnbShubzUpJzogW1AxLCBtM10sXG4gICAgJyhubzUpJzogW1AxLCBNM10sXG4gICAgJzUnOiBbUDEsIFA1XSxcbiAgICAnZGltJzogW1AxLCBtMywgQTRdLFxuICAgICdzdXMyJzogW1AxLCBNMiwgUDVdLFxuICAgICdtJzogW1AxLCBtMywgUDVdLFxuICAgICcnOiBbUDEsIE0zLCBQNV0sXG4gICAgJ3N1czQnOiBbUDEsIFA0LCBQNV0sXG4gICAgJ2F1Zyc6IFtQMSwgTTMsIG02XSxcbiAgICAnbTYnOiBbUDEsIG0zLCBQNSwgTTZdLFxuICAgICc2JzogW1AxLCBNMywgUDUsIE02XSxcbiAgICAnbTcnOiBbUDEsIG0zLCBQNSwgbTddLFxuICAgICdtTTcnOiBbUDEsIG0zLCBQNSwgTTddLFxuICAgICc3JzogW1AxLCBNMywgUDUsIG03XSxcbiAgICAnTTcnOiBbUDEsIE0zLCBQNSwgTTddLFxufTtcbmNvbnN0IGNob3JkUmVnZXggPSBuZXcgUmVnRXhwKGBeKCR7bm90ZV8xLm5vdGVOYW1lUGF0dGVybn0pKC4qKSRgKTtcbmNsYXNzIENob3JkIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gbmFtZS5tYXRjaChjaG9yZFJlZ2V4KTtcbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBDYW4ndCBwYXJzZSBjaG9yZCAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgW18sIHJvb3ROYW1lLCBzdWZmaXhdID0gbWF0Y2g7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBuZXcgbm90ZV8xLk5vdGUocm9vdE5hbWUpO1xuICAgICAgICBpZiAoIShzdWZmaXggaW4gc3VmZml4TWVhbmluZ3MpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYENhbid0IHBhcnNlIGNob3JkIHN1ZmZpeCAke3N1ZmZpeH1gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vdGVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgaW50ZXJ2YWwgb2Ygc3VmZml4TWVhbmluZ3Nbc3VmZml4XSkge1xuICAgICAgICAgICAgdGhpcy5ub3Rlcy5wdXNoKHJvb3QuYWRkSW50ZXJ2YWwoaW50ZXJ2YWwpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0gPSA8JHt0aGlzLm5vdGVzLmpvaW4oJyAnKX0+YDtcbiAgICB9XG59XG5leHBvcnRzLkNob3JkID0gQ2hvcmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdEluc3RydW1lbnQgPSBleHBvcnRzLmluc3RydW1lbnRCeVR1bmluZyA9IGV4cG9ydHMuaW5zdHJ1bWVudHMgPSB2b2lkIDA7XG5jb25zdCB0dW5pbmdfMSA9IHJlcXVpcmUoXCIuL3R1bmluZ1wiKTtcbmV4cG9ydHMuaW5zdHJ1bWVudHMgPSB7XG4gICAgJ0JhbGFsYWlrYSAoYWNhZGVtaWMpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRTQgRTQgQTQnKSxcbiAgICAnQmFsYWxhaWthIChmb2xrKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0M0IEU0IEc0JyksXG4gICAgJ0JhbmpvJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgRDMgRzMgQjMgRDQnKSxcbiAgICAnQmFzcyc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0UxIEExIEQyIEcyJyksXG4gICAgJ0JyYWd1aW5oYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0Q0IEc0IEI0IEQ1JyksXG4gICAgJ0NoYXJhbmdvJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgQzUgRSBBNCBFNScpLFxuICAgICdDYXZhcXVpbmhvIChQb3J0dWdhbCBHR0JEKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEc0IEI0IEQ1JyksXG4gICAgJ0NhdmFxdWluaG8gKFBvcnR1Z2FsIERBQkUpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDUgQTQgQjQgRTUnKSxcbiAgICAnQ2F2YXF1aW5obyAoQnJhemlsIERHQkQpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQjQgRDUnKSxcbiAgICAnQ2F2YXF1aW5obyAoQnJhemlsIERHQkUpJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDQgRzQgQjQgRTUnKSxcbiAgICAnRGFsYSBmYWVuZHlyJzogbmV3IHR1bmluZ18xLlR1bmluZygnRTQgQTQgRTUnKSxcbiAgICAnRGVjaGlnIHBvbmRhcic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0M0IEQ0IEc0JyksXG4gICAgJ0d1aXRhbGVsZSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0EyIEQzIEczIEM0IEU0IEE0JyksXG4gICAgJ0d1aXRhcic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0UyIEEyIEQzIEczIEIzIEU0JyksXG4gICAgJ0d1aXRhcnLDs24nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMSBEMiBHMiBDMyBFMyBBMicpLFxuICAgICdKYXJhbmEgamFyb2NoYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEM0IEUgQTMgRzMnKSxcbiAgICAnSmFyYW5hIGh1YXN0ZWNhJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgQjMgRDQgRiM0IEE0JyksXG4gICAgJ01hbmRvbGluJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzMgRDQgQTQgRTUnKSxcbiAgICAnUmFqYW8nOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdENCBHNCBDNCBFNCBBNCcpLFxuICAgICdSZXF1aW50byc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0EyIEQzIEczIEM0IEU0IEE0JyksXG4gICAgJ1NlbWlzdHJ1bmthJzogbmV3IHR1bmluZ18xLlR1bmluZygnRDIgRzIgQjIgRDMgRzMgQjMgRDQnKSxcbiAgICAnVGVub3IgZ3VpdGFyJzogbmV3IHR1bmluZ18xLlR1bmluZygnQzMgRzMgRDQgQTQnKSxcbiAgICAnVGltcGxlJzogbmV3IHR1bmluZ18xLlR1bmluZygnRzQgQzUgRTQgQTQgRDUnKSxcbiAgICAnVWt1bGVsZSAoaGlnaCBHKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEM0IEU0IEE0JyksXG4gICAgJ1VrdWxlbGUgKGxvdyBHKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEM0IEU0IEE0JyksXG4gICAgJ1VrdWxlbGUgKGJhcml0b25lKSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0QzIEczIEIzIEU0JyksXG4gICAgJ1ZpaHVlbGEnOiBuZXcgdHVuaW5nXzEuVHVuaW5nKCdBMyBENCBHNCBCMyBFNCcpLFxuICAgICdWaW9sYSc6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0MzIEczIEQ0IEE0JyksXG4gICAgJ1Zpb2xpbic6IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0czIEQ0IEE0IEU1JyksXG59O1xuZXhwb3J0cy5pbnN0cnVtZW50QnlUdW5pbmcgPSB7fTtcbmZvciAoY29uc3QgW25hbWUsIHR1bmluZ10gb2YgT2JqZWN0LmVudHJpZXMoZXhwb3J0cy5pbnN0cnVtZW50cykpIHtcbiAgICBleHBvcnRzLmluc3RydW1lbnRCeVR1bmluZ1t0dW5pbmcuZGVzY3JpcHRpb25dID0gbmFtZTtcbiAgICAvLyBOb3csIHRoZSBsYXN0IGluc3RydW1lbnQgd2l0aCB0aGUgZ2l2ZW4gdHVuaW5nIGlzIHVzZWQuXG4gICAgLy8gVE9ETzogQ2hhbmdlIHRoaXMgaWYgbmVlZGVkLlxufVxuZXhwb3J0cy5kZWZhdWx0SW5zdHJ1bWVudCA9ICdVa3VsZWxlIChoaWdoIEcpJztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Ob3RlID0gZXhwb3J0cy5ub3RlTmFtZVBhdHRlcm4gPSB2b2lkIDA7XG5jb25zdCBub3RlTmFtZXMgPSBbXG4gICAgWydDJ10sIFsnQyMnLCAnRGInXSxcbiAgICBbJ0QnXSwgWydEIycsICdFYiddLFxuICAgIFsnRSddLFxuICAgIFsnRiddLCBbJ0YjJywgJ0diJ10sXG4gICAgWydHJ10sIFsnRyMnLCAnQWInXSxcbiAgICBbJ0EnXSwgWydBIycsICdCYiddLFxuICAgIFsnQiddLFxuXTtcbmNvbnN0IHVuc3VwcG9ydGVkID0ge1xuICAgICdDYic6ICdCJyxcbiAgICAnQiMnOiAnQycsXG4gICAgJ0ZiJzogJ0UnLFxuICAgICdFIyc6ICdGJyxcbn07XG5jb25zdCBub3RlSW5kZXhCeU5hbWUgPSB7fTtcbmZvciAoY29uc3QgW2luZGV4LCBuYW1lc10gb2Ygbm90ZU5hbWVzLmVudHJpZXMoKSkge1xuICAgIGZvciAoY29uc3QgbmFtZSBvZiBuYW1lcykge1xuICAgICAgICBub3RlSW5kZXhCeU5hbWVbbmFtZV0gPSBpbmRleDtcbiAgICB9XG59XG5leHBvcnRzLm5vdGVOYW1lUGF0dGVybiA9ICdbQS1HXVsjYl0/JztcbmNvbnN0IG5vdGVSZWdleCA9IG5ldyBSZWdFeHAoYF4oJHtleHBvcnRzLm5vdGVOYW1lUGF0dGVybn0pKFxcXFxkKT8kYCk7XG5jbGFzcyBOb3RlIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gbmFtZS5tYXRjaChub3RlUmVnZXgpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGNvbnN0IFtfLCBub3RlTmFtZSwgb2N0YXZlTmFtZV0gPSBtYXRjaDtcbiAgICAgICAgICAgIGlmIChub3RlTmFtZSBpbiB1bnN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1Z2dlc3Rpb24gPSB1bnN1cHBvcnRlZFtub3RlTmFtZV07XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVc2UgJHtzdWdnZXN0aW9ufSBpbnN0ZWFkIG9mICR7bm90ZU5hbWV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBpdGNoQ2xhc3MgPSBub3RlSW5kZXhCeU5hbWVbbm90ZU5hbWVdO1xuICAgICAgICAgICAgdGhpcy5vY3RhdmUgPSBvY3RhdmVOYW1lICE9PSB1bmRlZmluZWQgPyBwYXJzZUludChvY3RhdmVOYW1lKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgQ2FuJ3QgcGFyc2Ugbm90ZSAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGZyb21QaXRjaENsYXNzQW5kT2N0YXZlKHBpdGNoQ2xhc3MsIG9jdGF2ZSkge1xuICAgICAgICBsZXQgbm90ZSA9IE9iamVjdC5jcmVhdGUoTm90ZS5wcm90b3R5cGUpO1xuICAgICAgICBub3RlLnBpdGNoQ2xhc3MgPSBwaXRjaENsYXNzO1xuICAgICAgICBub3RlLm9jdGF2ZSA9IG9jdGF2ZTtcbiAgICAgICAgcmV0dXJuIG5vdGU7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBjb25zdCBub3RlTmFtZSA9IG5vdGVOYW1lc1t0aGlzLnBpdGNoQ2xhc3NdWzBdO1xuICAgICAgICByZXR1cm4gdGhpcy5vY3RhdmUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBgJHtub3RlTmFtZX0ke3RoaXMub2N0YXZlfWBcbiAgICAgICAgICAgIDogbm90ZU5hbWU7XG4gICAgfVxuICAgIGFkZEludGVydmFsKGludGVydmFsKSB7XG4gICAgICAgIGNvbnN0IHBpdGNoID0gdGhpcy5waXRjaENsYXNzICsgaW50ZXJ2YWw7XG4gICAgICAgIGNvbnN0IG9jdGF2ZSA9IHRoaXMub2N0YXZlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gdGhpcy5vY3RhdmUgKyBNYXRoLmZsb29yKHBpdGNoIC8gMTIpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIE5vdGUuZnJvbVBpdGNoQ2xhc3NBbmRPY3RhdmUocGl0Y2ggJSAxMiwgb2N0YXZlKTsgLy8gaW5jb3JyZWN0IGZvciBuZWdhdGl2ZSBpbnRlcnZhbHNcbiAgICB9XG59XG5leHBvcnRzLk5vdGUgPSBOb3RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlR1bmluZyA9IGV4cG9ydHMuZ2V0R3JvdXAgPSB2b2lkIDA7XG5jb25zdCBub3RlXzEgPSByZXF1aXJlKFwiLi9ub3RlXCIpO1xuY29uc3Qgc3BsaXRSZWdleCA9IC9cXHMrfCg/PVtBLVpdKS87IC8vIHNwbGl0IGJ5IHdoaXRlc3BhY2Ugb3IgYmVmb3JlIHVwcGVyY2FzZSBsZXR0ZXJzXG5mdW5jdGlvbiBnZXRGcmV0cyhvcGVuU3RyaW5nLCBhbGxvd2VkUGl0Y2hlcywgZnJldENvdW50KSB7XG4gICAgY29uc3QgZnJldHMgPSBbXTtcbiAgICBmb3IgKGxldCBmcmV0SW5kZXggPSAwOyBmcmV0SW5kZXggPD0gZnJldENvdW50OyBmcmV0SW5kZXgrKykge1xuICAgICAgICBjb25zdCBub3RlID0gb3BlblN0cmluZy5hZGRJbnRlcnZhbChmcmV0SW5kZXgpO1xuICAgICAgICBmcmV0cy5wdXNoKGFsbG93ZWRQaXRjaGVzLmhhcyhub3RlLnBpdGNoQ2xhc3MpID8gbm90ZSA6IG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldHM7XG59XG5mdW5jdGlvbiBnZXRHcm91cChyb290Tm90ZSwgbm90ZSkge1xuICAgIGlmIChub3RlICE9PSBudWxsICYmIG5vdGUub2N0YXZlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKG5vdGUub2N0YXZlICogMTIgKyBub3RlLnBpdGNoQ2xhc3MgLSByb290Tm90ZS5waXRjaENsYXNzKSAvIDEyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRHcm91cCA9IGdldEdyb3VwO1xuY2xhc3MgVHVuaW5nIHtcbiAgICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLm9wZW5TdHJpbmdzID0gZGVzY3JpcHRpb25cbiAgICAgICAgICAgIC5zcGxpdChzcGxpdFJlZ2V4KVxuICAgICAgICAgICAgLmZpbHRlcihuID0+IG4gIT09ICcnKVxuICAgICAgICAgICAgLm1hcChuID0+IG5ldyBub3RlXzEuTm90ZShuKSk7XG4gICAgICAgIGlmICh0aGlzLm9wZW5TdHJpbmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdCBsZWFzdCBvbmUgb3BlbiBzdHJpbmcgcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5vcGVuU3RyaW5ncy5qb2luKCcgJyk7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYFR1bmluZyhcIiR7dGhpcy5kZXNjcmlwdGlvbn1cIilgO1xuICAgIH1cbiAgICBnZXRGcmV0Ym9hcmQoY2hvcmQsIGZyZXRDb3VudCA9IDEyKSB7XG4gICAgICAgIGNvbnN0IGFsbG93ZWRQaXRjaGVzID0gbmV3IFNldChjaG9yZC5ub3Rlcy5tYXAobiA9PiBuLnBpdGNoQ2xhc3MpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMub3BlblN0cmluZ3MubWFwKHMgPT4gZ2V0RnJldHMocywgYWxsb3dlZFBpdGNoZXMsIGZyZXRDb3VudCkpO1xuICAgIH1cbn1cbmV4cG9ydHMuVHVuaW5nID0gVHVuaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFwcGx5VHlwb2dyYXBoeSA9IHZvaWQgMDtcbmNvbnN0IGNoYXJhY3RlckRpY3QgPSB7XG4gICAgJyMnOiAn4pmvJyxcbiAgICAnYic6ICfima0nLFxuICAgICcwJzogJ+KCgCcsXG4gICAgJzEnOiAn4oKBJyxcbiAgICAnMic6ICfigoInLFxuICAgICczJzogJ+KCgycsXG4gICAgJzQnOiAn4oKEJyxcbiAgICAnNSc6ICfigoUnLFxuICAgICc2JzogJ+KChicsXG4gICAgJzcnOiAn4oKHJyxcbiAgICAnOCc6ICfigognLFxuICAgICc5JzogJ+KCiScsXG59O1xuY29uc3QgcmVwbGFjZVJlZ2V4ID0gbmV3IFJlZ0V4cChgWyR7T2JqZWN0LmtleXMoY2hhcmFjdGVyRGljdCl9XWAsICdnJyk7XG5mdW5jdGlvbiBhcHBseVR5cG9ncmFwaHkodGV4dCkge1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UocmVwbGFjZVJlZ2V4LCBjID0+IGNoYXJhY3RlckRpY3RbY10pO1xufVxuZXhwb3J0cy5hcHBseVR5cG9ncmFwaHkgPSBhcHBseVR5cG9ncmFwaHk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGlhbGl6ZSA9IHZvaWQgMDtcbmNvbnN0IGNob3JkXzEgPSByZXF1aXJlKFwiLi9jaG9yZFwiKTtcbmNvbnN0IHR1bmluZ18xID0gcmVxdWlyZShcIi4vdHVuaW5nXCIpO1xuY29uc3QgaW5zdHJ1bWVudHNfMSA9IHJlcXVpcmUoXCIuL2luc3RydW1lbnRzXCIpO1xuY29uc3QgdHlwb2dyYXBoeV8xID0gcmVxdWlyZShcIi4vdHlwb2dyYXBoeVwiKTtcbmZ1bmN0aW9uIGdldEJ5SWQoaWQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICB0aHJvdyBFcnJvcihgQ2Fubm90IGZpbmQgZWxlbWVudCB3aXRoIGlkICcke2lkfSdgKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5mdW5jdGlvbiBwb3B1bGF0ZUluc3RydW1lbnRzKGluc3RydW1lbnRzRWxlbWVudCkge1xuICAgIGZvciAoY29uc3QgaW5zdHJ1bWVudCBvZiBPYmplY3Qua2V5cyhpbnN0cnVtZW50c18xLmluc3RydW1lbnRzKSkge1xuICAgICAgICBjb25zdCBvcHRpb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgIG9wdGlvbkVsZW1lbnQudmFsdWUgPSBpbnN0cnVtZW50O1xuICAgICAgICBvcHRpb25FbGVtZW50LmlubmVyVGV4dCA9IGluc3RydW1lbnQ7XG4gICAgICAgIGluc3RydW1lbnRzRWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb25FbGVtZW50KTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRDaG9yZERlc2NyaXB0aW9uKGNob3JkKSB7XG4gICAgY29uc3QgY2hvcmREZXNjcmlwdGlvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgY2hvcmREZXNjcmlwdGlvbkVsZW1lbnQuaWQgPSAnY2hvcmREZXNjcmlwdGlvbic7XG4gICAgY29uc3Qgbm90ZXMgPSAoMCwgdHlwb2dyYXBoeV8xLmFwcGx5VHlwb2dyYXBoeSkoY2hvcmQubm90ZXMuam9pbignICcpKTtcbiAgICBjaG9yZERlc2NyaXB0aW9uRWxlbWVudC5hcHBlbmQoYOKfqCAke25vdGVzfSDin6lgKTtcbiAgICByZXR1cm4gY2hvcmREZXNjcmlwdGlvbkVsZW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRGcmV0SGVhZGVyRWxlbWVudChmcmV0Q291bnQpIHtcbiAgICBjb25zdCBmcmV0SGVhZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBmcmV0SGVhZGVyRWxlbWVudC5jbGFzc05hbWUgPSAnZnJldEhlYWRlcic7XG4gICAgZm9yIChjb25zdCBmcmV0SW5kZXggb2YgQXJyYXkoZnJldENvdW50KS5rZXlzKCkpIHtcbiAgICAgICAgY29uc3QgZnJldEluZGV4RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgZnJldEluZGV4RWxlbWVudC5hcHBlbmQoZnJldEluZGV4LnRvU3RyaW5nKCkpO1xuICAgICAgICBmcmV0SGVhZGVyRWxlbWVudC5hcHBlbmRDaGlsZChmcmV0SW5kZXhFbGVtZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXRIZWFkZXJFbGVtZW50O1xufVxuZnVuY3Rpb24gZ2V0RnJldEVsZW1lbnQoZnJldE5vdGUsIHJvb3ROb3RlKSB7XG4gICAgY29uc3QgZnJldEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgdGV4dCA9IGZyZXROb3RlICE9PSBudWxsXG4gICAgICAgID8gKDAsIHR5cG9ncmFwaHlfMS5hcHBseVR5cG9ncmFwaHkpKGZyZXROb3RlLnRvU3RyaW5nKCkpXG4gICAgICAgIDogJ8K3JztcbiAgICBjb25zdCBncm91cCA9ICgwLCB0dW5pbmdfMS5nZXRHcm91cCkocm9vdE5vdGUsIGZyZXROb3RlKTtcbiAgICBpZiAoZ3JvdXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmcmV0RWxlbWVudC5jbGFzc05hbWUgPSBgZ3JvdXAkeyhncm91cCArIDYwKSAlIDZ9YDtcbiAgICB9XG4gICAgZnJldEVsZW1lbnQuYXBwZW5kKHRleHQpO1xuICAgIHJldHVybiBmcmV0RWxlbWVudDtcbn1cbmZ1bmN0aW9uIGdldEZyZXR0ZWRTdHJpbmdFbGVtZW50KGZyZXR0ZWRTdHJpbmcsIHJvb3ROb3RlKSB7XG4gICAgY29uc3QgZnJldHRlZFN0cmluZ0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgZm9yIChjb25zdCBmcmV0Tm90ZSBvZiBmcmV0dGVkU3RyaW5nKSB7XG4gICAgICAgIGZyZXR0ZWRTdHJpbmdFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXRFbGVtZW50KGZyZXROb3RlLCByb290Tm90ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldHRlZFN0cmluZ0VsZW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRGcmV0Ym9hcmRFbGVtZW50KGZyZXRib2FyZCwgcm9vdE5vdGUpIHtcbiAgICBjb25zdCBmcmV0Ym9hcmRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZnJldGJvYXJkRWxlbWVudC5pZCA9ICdmcmV0Ym9hcmQnO1xuICAgIGZyZXRib2FyZEVsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0RnJldEhlYWRlckVsZW1lbnQoZnJldGJvYXJkWzBdLmxlbmd0aCkpO1xuICAgIGZvciAoY29uc3QgZnJldHRlZFN0cmluZyBvZiBbLi4uZnJldGJvYXJkXS5yZXZlcnNlKCkpIHtcbiAgICAgICAgZnJldGJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0dGVkU3RyaW5nRWxlbWVudChmcmV0dGVkU3RyaW5nLCByb290Tm90ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldGJvYXJkRWxlbWVudDtcbn1cbmZ1bmN0aW9uIGdldEVycm9yRWxlbWVudChtZXNzYWdlKSB7XG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGVycm9yRWxlbWVudC5pZCA9ICdlcnJvcic7XG4gICAgZXJyb3JFbGVtZW50LmFwcGVuZChtZXNzYWdlKTtcbiAgICByZXR1cm4gZXJyb3JFbGVtZW50O1xufVxuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBjb25zdCBpbnN0cnVtZW50RWxlbWVudCA9IGdldEJ5SWQoJ2luc3RydW1lbnQnKTtcbiAgICBjb25zdCB0dW5pbmdFbGVtZW50ID0gZ2V0QnlJZCgndHVuaW5nJyk7XG4gICAgY29uc3QgZnJldENvdW50RWxlbWVudCA9IGdldEJ5SWQoJ2ZyZXRDb3VudCcpO1xuICAgIGNvbnN0IGNob3JkRWxlbWVudCA9IGdldEJ5SWQoJ2Nob3JkJyk7XG4gICAgY29uc3Qgb3V0cHV0RWxlbWVudCA9IGdldEJ5SWQoJ291dHB1dCcpO1xuICAgIGZ1bmN0aW9uIHNob3dGcmV0Ym9hcmQoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0dW5pbmdEZXNjcmlwdGlvbiA9IHR1bmluZ0VsZW1lbnQudmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgY29uc3QgY2hvcmROYW1lID0gY2hvcmRFbGVtZW50LnZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGNvbnN0IGZyZXRDb3VudCA9IHBhcnNlSW50KGZyZXRDb3VudEVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgaWYgKCF0dW5pbmdEZXNjcmlwdGlvbiB8fCAhY2hvcmROYW1lKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0RWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0dW5pbmcgPSBuZXcgdHVuaW5nXzEuVHVuaW5nKHR1bmluZ0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IGNob3JkID0gbmV3IGNob3JkXzEuQ2hvcmQoY2hvcmROYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IGZyZXRib2FyZCA9IHR1bmluZy5nZXRGcmV0Ym9hcmQoY2hvcmQsIGZyZXRDb3VudCk7XG4gICAgICAgICAgICBvdXRwdXRFbGVtZW50LnJlcGxhY2VDaGlsZHJlbihnZXRDaG9yZERlc2NyaXB0aW9uKGNob3JkKSwgZ2V0RnJldGJvYXJkRWxlbWVudChmcmV0Ym9hcmQsIGNob3JkLm5vdGVzWzBdKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBgJHtlcnJvcn1gO1xuICAgICAgICAgICAgb3V0cHV0RWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4oZ2V0RXJyb3JFbGVtZW50KG1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvbkluc3RydW1lbnRJbnB1dCgpIHtcbiAgICAgICAgY29uc3QgaW5zdHJ1bWVudCA9IGluc3RydW1lbnRFbGVtZW50LnZhbHVlO1xuICAgICAgICBpZiAoaW5zdHJ1bWVudCBpbiBpbnN0cnVtZW50c18xLmluc3RydW1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCB0dW5pbmcgPSBpbnN0cnVtZW50c18xLmluc3RydW1lbnRzW2luc3RydW1lbnRdO1xuICAgICAgICAgICAgdHVuaW5nRWxlbWVudC52YWx1ZSA9IHR1bmluZy5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIHNob3dGcmV0Ym9hcmQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvblR1bmluZ0lucHV0KCkge1xuICAgICAgICBjb25zdCB0dW5pbmdEZXNjcmlwdGlvbiA9IHR1bmluZ0VsZW1lbnQudmFsdWU7XG4gICAgICAgIGxldCBpbnN0cnVtZW50ID0gJyc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0dW5pbmcgPSBuZXcgdHVuaW5nXzEuVHVuaW5nKHR1bmluZ0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGlmICh0dW5pbmcuZGVzY3JpcHRpb24gaW4gaW5zdHJ1bWVudHNfMS5pbnN0cnVtZW50QnlUdW5pbmcpIHtcbiAgICAgICAgICAgICAgICBpbnN0cnVtZW50ID0gaW5zdHJ1bWVudHNfMS5pbnN0cnVtZW50QnlUdW5pbmdbdHVuaW5nLmRlc2NyaXB0aW9uXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoX2EpIHsgfVxuICAgICAgICBpbnN0cnVtZW50RWxlbWVudC52YWx1ZSA9IGluc3RydW1lbnQ7XG4gICAgICAgIHNob3dGcmV0Ym9hcmQoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25GcmV0Q291bnRJbnB1dCgpIHtcbiAgICAgICAgc2hvd0ZyZXRib2FyZCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbkNob3JkSW5wdXQoKSB7XG4gICAgICAgIHNob3dGcmV0Ym9hcmQoKTtcbiAgICB9XG4gICAgcG9wdWxhdGVJbnN0cnVtZW50cyhpbnN0cnVtZW50RWxlbWVudCk7XG4gICAgaW5zdHJ1bWVudEVsZW1lbnQudmFsdWUgPSBpbnN0cnVtZW50c18xLmRlZmF1bHRJbnN0cnVtZW50O1xuICAgIG9uSW5zdHJ1bWVudElucHV0KCk7XG4gICAgaW5zdHJ1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkluc3RydW1lbnRJbnB1dCk7XG4gICAgdHVuaW5nRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uVHVuaW5nSW5wdXQpO1xuICAgIGZyZXRDb3VudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkZyZXRDb3VudElucHV0KTtcbiAgICBjaG9yZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbkNob3JkSW5wdXQpO1xuICAgIGNob3JkRWxlbWVudC5mb2N1cygpO1xufVxuZXhwb3J0cy5pbml0aWFsaXplID0gaW5pdGlhbGl6ZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHVpXzEgPSByZXF1aXJlKFwiLi91aVwiKTtcbigwLCB1aV8xLmluaXRpYWxpemUpKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=