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

/***/ "./src/ui.ts":
/*!*******************!*\
  !*** ./src/ui.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.test = void 0;
const chord_1 = __webpack_require__(/*! ./chord */ "./src/chord.ts");
const tuning_1 = __webpack_require__(/*! ./tuning */ "./src/tuning.ts");
const typographyDict = {
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
const typographyRegex = new RegExp(`[${Object.keys(typographyDict)}]`, 'g');
function getById(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw Error(`Cannot find element with id '${id}'.`);
    }
    return element;
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
        ? fretNote.toString().replace(typographyRegex, c => typographyDict[c])
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
function test() {
    const tuning = new tuning_1.Tuning('G4 C4 E4 A4');
    const chord = new chord_1.Chord('Cm7');
    const fretboard = tuning.getFretboard(chord);
    const outputElement = getById('output');
    outputElement.replaceChildren(getFretboardElement(fretboard));
}
exports.test = test;


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
function initialize() {
    (0, ui_1.test)();
}
initialize();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxhQUFhLG1CQUFPLENBQUMseUJBQU07QUFDM0I7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL2Nob3JkLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvLi9zcmMvbm90ZS50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3R1bmluZy50cyIsIndlYnBhY2s6Ly9ncmlmZmJyZXR0Ly4vc3JjL3VpLnRzIiwid2VicGFjazovL2dyaWZmYnJldHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ3JpZmZicmV0dC8uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DaG9yZCA9IHZvaWQgMDtcbmNvbnN0IG5vdGVfMSA9IHJlcXVpcmUoXCIuL25vdGVcIik7XG4vLyBJbnRlcnZhbHMgaW4gc2VtaXRvbmVzOlxuY29uc3QgW1AxLCBtMiwgTTIsIG0zLCBNMywgUDQsIEE0LCBQNSwgbTYsIE02LCBtNywgTTddID0gQXJyYXkoMTIpLmtleXMoKTtcbmNvbnN0IHN1ZmZpeE1lYW5pbmdzID0ge1xuICAgICdtKG5vNSknOiBbUDEsIG0zXSxcbiAgICAnKG5vNSknOiBbUDEsIE0zXSxcbiAgICAnNSc6IFtQMSwgUDVdLFxuICAgICdkaW0nOiBbUDEsIG0zLCBBNF0sXG4gICAgJ3N1czInOiBbUDEsIE0yLCBQNV0sXG4gICAgJ20nOiBbUDEsIG0zLCBQNV0sXG4gICAgJyc6IFtQMSwgTTMsIFA1XSxcbiAgICAnc3VzNCc6IFtQMSwgUDQsIFA1XSxcbiAgICAnYXVnJzogW1AxLCBNMywgbTZdLFxuICAgICdtNic6IFtQMSwgbTMsIFA1LCBNNl0sXG4gICAgJzYnOiBbUDEsIE0zLCBQNSwgTTZdLFxuICAgICdtNyc6IFtQMSwgbTMsIFA1LCBtN10sXG4gICAgJ21NNyc6IFtQMSwgbTMsIFA1LCBNN10sXG4gICAgJzcnOiBbUDEsIE0zLCBQNSwgbTddLFxuICAgICdNNyc6IFtQMSwgTTMsIFA1LCBNN10sXG59O1xuY29uc3QgY2hvcmRSZWdleCA9IG5ldyBSZWdFeHAoYF4oJHtub3RlXzEubm90ZU5hbWVQYXR0ZXJufSkoLiopJGApO1xuY2xhc3MgQ2hvcmQge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBuYW1lLm1hdGNoKGNob3JkUmVnZXgpO1xuICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYENhbid0IHBhcnNlIGNob3JkICR7bmFtZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbXywgcm9vdE5hbWUsIHN1ZmZpeF0gPSBtYXRjaDtcbiAgICAgICAgY29uc3Qgcm9vdCA9IG5ldyBub3RlXzEuTm90ZShyb290TmFtZSk7XG4gICAgICAgIGlmICghKHN1ZmZpeCBpbiBzdWZmaXhNZWFuaW5ncykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgQ2FuJ3QgcGFyc2UgY2hvcmQgc3VmZml4ICR7c3VmZml4fWApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm90ZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBpbnRlcnZhbCBvZiBzdWZmaXhNZWFuaW5nc1tzdWZmaXhdKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGVzLnB1c2gocm9vdC5hZGRJbnRlcnZhbChpbnRlcnZhbCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSA9IDwke3RoaXMubm90ZXMuam9pbignICcpfT5gO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2hvcmQgPSBDaG9yZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Ob3RlID0gZXhwb3J0cy5ub3RlTmFtZVBhdHRlcm4gPSB2b2lkIDA7XG5jb25zdCBub3RlTmFtZXMgPSBbXG4gICAgWydDJ10sIFsnQyMnLCAnRGInXSxcbiAgICBbJ0QnXSwgWydEIycsICdFYiddLFxuICAgIFsnRSddLFxuICAgIFsnRiddLCBbJ0YjJywgJ0diJ10sXG4gICAgWydHJ10sIFsnRyMnLCAnQWInXSxcbiAgICBbJ0EnXSwgWydBIycsICdCYiddLFxuICAgIFsnQiddLFxuXTtcbmNvbnN0IHVuc3VwcG9ydGVkID0ge1xuICAgICdDYic6ICdCJyxcbiAgICAnQiMnOiAnQycsXG4gICAgJ0ZiJzogJ0UnLFxuICAgICdFIyc6ICdGJyxcbn07XG5jb25zdCBub3RlSW5kZXhCeU5hbWUgPSB7fTtcbmZvciAoY29uc3QgW2luZGV4LCBuYW1lc10gb2Ygbm90ZU5hbWVzLmVudHJpZXMoKSkge1xuICAgIGZvciAoY29uc3QgbmFtZSBvZiBuYW1lcykge1xuICAgICAgICBub3RlSW5kZXhCeU5hbWVbbmFtZV0gPSBpbmRleDtcbiAgICB9XG59XG5leHBvcnRzLm5vdGVOYW1lUGF0dGVybiA9ICdbQS1HXVsjYl0/JztcbmNvbnN0IG5vdGVSZWdleCA9IG5ldyBSZWdFeHAoYF4oJHtleHBvcnRzLm5vdGVOYW1lUGF0dGVybn0pKFxcXFxkKT8kYCk7XG5jbGFzcyBOb3RlIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gbmFtZS5tYXRjaChub3RlUmVnZXgpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGNvbnN0IFtfLCBub3RlTmFtZSwgb2N0YXZlTmFtZV0gPSBtYXRjaDtcbiAgICAgICAgICAgIGlmIChub3RlTmFtZSBpbiB1bnN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1Z2dlc3Rpb24gPSB1bnN1cHBvcnRlZFtub3RlTmFtZV07XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVc2UgJHtzdWdnZXN0aW9ufSBpbnN0ZWFkIG9mICR7bm90ZU5hbWV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBpdGNoQ2xhc3MgPSBub3RlSW5kZXhCeU5hbWVbbm90ZU5hbWVdO1xuICAgICAgICAgICAgdGhpcy5vY3RhdmUgPSBvY3RhdmVOYW1lICE9PSB1bmRlZmluZWQgPyBwYXJzZUludChvY3RhdmVOYW1lKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgQ2FuJ3QgcGFyc2Ugbm90ZSAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGZyb21QaXRjaENsYXNzQW5kT2N0YXZlKHBpdGNoQ2xhc3MsIG9jdGF2ZSkge1xuICAgICAgICBsZXQgbm90ZSA9IE9iamVjdC5jcmVhdGUoTm90ZS5wcm90b3R5cGUpO1xuICAgICAgICBub3RlLnBpdGNoQ2xhc3MgPSBwaXRjaENsYXNzO1xuICAgICAgICBub3RlLm9jdGF2ZSA9IG9jdGF2ZTtcbiAgICAgICAgcmV0dXJuIG5vdGU7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBjb25zdCBub3RlTmFtZSA9IG5vdGVOYW1lc1t0aGlzLnBpdGNoQ2xhc3NdWzBdO1xuICAgICAgICByZXR1cm4gdGhpcy5vY3RhdmUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBgJHtub3RlTmFtZX0ke3RoaXMub2N0YXZlfWBcbiAgICAgICAgICAgIDogbm90ZU5hbWU7XG4gICAgfVxuICAgIGFkZEludGVydmFsKGludGVydmFsKSB7XG4gICAgICAgIGNvbnN0IHBpdGNoID0gdGhpcy5waXRjaENsYXNzICsgaW50ZXJ2YWw7XG4gICAgICAgIGNvbnN0IG9jdGF2ZSA9IHRoaXMub2N0YXZlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gdGhpcy5vY3RhdmUgKyBNYXRoLmZsb29yKHBpdGNoIC8gMTIpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIE5vdGUuZnJvbVBpdGNoQ2xhc3NBbmRPY3RhdmUocGl0Y2ggJSAxMiwgb2N0YXZlKTsgLy8gaW5jb3JyZWN0IGZvciBuZWdhdGl2ZSBpbnRlcnZhbHNcbiAgICB9XG59XG5leHBvcnRzLk5vdGUgPSBOb3RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlR1bmluZyA9IGV4cG9ydHMuZ2V0R3JvdXAgPSB2b2lkIDA7XG5jb25zdCBub3RlXzEgPSByZXF1aXJlKFwiLi9ub3RlXCIpO1xuY29uc3Qgc3BsaXRSZWdleCA9IC9cXHMrfCg/PVtBLVpdKS87IC8vIHNwbGl0IGJ5IHdoaXRlc3BhY2Ugb3IgYmVmb3JlIHVwcGVyY2FzZSBsZXR0ZXJzXG5mdW5jdGlvbiBnZXRGcmV0cyhvcGVuU3RyaW5nLCBhbGxvd2VkUGl0Y2hlcywgZnJldENvdW50KSB7XG4gICAgY29uc3QgZnJldHMgPSBbXTtcbiAgICBmb3IgKGxldCBmcmV0SW5kZXggPSAwOyBmcmV0SW5kZXggPD0gZnJldENvdW50OyBmcmV0SW5kZXgrKykge1xuICAgICAgICBjb25zdCBub3RlID0gb3BlblN0cmluZy5hZGRJbnRlcnZhbChmcmV0SW5kZXgpO1xuICAgICAgICBmcmV0cy5wdXNoKGFsbG93ZWRQaXRjaGVzLmhhcyhub3RlLnBpdGNoQ2xhc3MpID8gbm90ZSA6IG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldHM7XG59XG5mdW5jdGlvbiBnZXRHcm91cChyb290Tm90ZSwgbm90ZSkge1xuICAgIGlmIChub3RlLm9jdGF2ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKChub3RlLm9jdGF2ZSAqIDEyICsgbm90ZS5waXRjaENsYXNzIC0gcm9vdE5vdGUucGl0Y2hDbGFzcykgLyAxMik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0R3JvdXAgPSBnZXRHcm91cDtcbmNsYXNzIFR1bmluZyB7XG4gICAgY29uc3RydWN0b3IoZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5vcGVuU3RyaW5ncyA9IGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAuc3BsaXQoc3BsaXRSZWdleClcbiAgICAgICAgICAgIC5maWx0ZXIobiA9PiBuICE9PSAnJylcbiAgICAgICAgICAgIC5tYXAobiA9PiBuZXcgbm90ZV8xLk5vdGUobikpO1xuICAgICAgICBpZiAodGhpcy5vcGVuU3RyaW5ncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXQgbGVhc3Qgb25lIG9wZW4gc3RyaW5nIHJlcXVpcmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMub3BlblN0cmluZ3Muam9pbignICcpO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGBUdW5pbmcoXCIke3RoaXMuZGVzY3JpcHRpb259XCIpYDtcbiAgICB9XG4gICAgZ2V0RnJldGJvYXJkKGNob3JkLCBmcmV0Q291bnQgPSAxMikge1xuICAgICAgICBjb25zdCBhbGxvd2VkUGl0Y2hlcyA9IG5ldyBTZXQoY2hvcmQubm90ZXMubWFwKG4gPT4gbi5waXRjaENsYXNzKSk7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5TdHJpbmdzLm1hcChzID0+IGdldEZyZXRzKHMsIGFsbG93ZWRQaXRjaGVzLCBmcmV0Q291bnQpKTtcbiAgICB9XG59XG5leHBvcnRzLlR1bmluZyA9IFR1bmluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50ZXN0ID0gdm9pZCAwO1xuY29uc3QgY2hvcmRfMSA9IHJlcXVpcmUoXCIuL2Nob3JkXCIpO1xuY29uc3QgdHVuaW5nXzEgPSByZXF1aXJlKFwiLi90dW5pbmdcIik7XG5jb25zdCB0eXBvZ3JhcGh5RGljdCA9IHtcbiAgICAnIyc6ICfima8nLFxuICAgICdiJzogJ+KZrScsXG4gICAgJzAnOiAn4oKAJyxcbiAgICAnMSc6ICfigoEnLFxuICAgICcyJzogJ+KCgicsXG4gICAgJzMnOiAn4oKDJyxcbiAgICAnNCc6ICfigoQnLFxuICAgICc1JzogJ+KChScsXG4gICAgJzYnOiAn4oKGJyxcbiAgICAnNyc6ICfigocnLFxuICAgICc4JzogJ+KCiCcsXG4gICAgJzknOiAn4oKJJyxcbn07XG5jb25zdCB0eXBvZ3JhcGh5UmVnZXggPSBuZXcgUmVnRXhwKGBbJHtPYmplY3Qua2V5cyh0eXBvZ3JhcGh5RGljdCl9XWAsICdnJyk7XG5mdW5jdGlvbiBnZXRCeUlkKGlkKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYENhbm5vdCBmaW5kIGVsZW1lbnQgd2l0aCBpZCAnJHtpZH0nLmApO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbmZ1bmN0aW9uIGdldEZyZXRIZWFkZXJFbGVtZW50KGZyZXRDb3VudCkge1xuICAgIGNvbnN0IGZyZXRIZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGZyZXRIZWFkZXJFbGVtZW50LmNsYXNzTmFtZSA9ICdmcmV0SGVhZGVyJztcbiAgICBmb3IgKGNvbnN0IGZyZXRJbmRleCBvZiBBcnJheShmcmV0Q291bnQpLmtleXMoKSkge1xuICAgICAgICBjb25zdCBmcmV0SW5kZXhFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBmcmV0SW5kZXhFbGVtZW50LmFwcGVuZChmcmV0SW5kZXgudG9TdHJpbmcoKSk7XG4gICAgICAgIGZyZXRIZWFkZXJFbGVtZW50LmFwcGVuZENoaWxkKGZyZXRJbmRleEVsZW1lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldEhlYWRlckVsZW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRGcmV0RWxlbWVudChmcmV0Tm90ZSkge1xuICAgIGNvbnN0IGZyZXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHRleHQgPSBmcmV0Tm90ZSAhPT0gbnVsbFxuICAgICAgICA/IGZyZXROb3RlLnRvU3RyaW5nKCkucmVwbGFjZSh0eXBvZ3JhcGh5UmVnZXgsIGMgPT4gdHlwb2dyYXBoeURpY3RbY10pXG4gICAgICAgIDogJ8K3JztcbiAgICBmcmV0RWxlbWVudC5hcHBlbmQodGV4dCk7XG4gICAgcmV0dXJuIGZyZXRFbGVtZW50O1xufVxuZnVuY3Rpb24gZ2V0RnJldHRlZFN0cmluZ0VsZW1lbnQoZnJldHRlZFN0cmluZykge1xuICAgIGNvbnN0IGZyZXR0ZWRTdHJpbmdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGZvciAoY29uc3QgZnJldE5vdGUgb2YgZnJldHRlZFN0cmluZykge1xuICAgICAgICBmcmV0dGVkU3RyaW5nRWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0RWxlbWVudChmcmV0Tm90ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJldHRlZFN0cmluZ0VsZW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRGcmV0Ym9hcmRFbGVtZW50KGZyZXRib2FyZCkge1xuICAgIGNvbnN0IGZyZXRib2FyZEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBmcmV0Ym9hcmRFbGVtZW50LmlkID0gJ2ZyZXRib2FyZCc7XG4gICAgZnJldGJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChnZXRGcmV0SGVhZGVyRWxlbWVudChmcmV0Ym9hcmRbMF0ubGVuZ3RoKSk7XG4gICAgZm9yIChjb25zdCBmcmV0dGVkU3RyaW5nIG9mIFsuLi5mcmV0Ym9hcmRdLnJldmVyc2UoKSkge1xuICAgICAgICBmcmV0Ym9hcmRFbGVtZW50LmFwcGVuZENoaWxkKGdldEZyZXR0ZWRTdHJpbmdFbGVtZW50KGZyZXR0ZWRTdHJpbmcpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyZXRib2FyZEVsZW1lbnQ7XG59XG5mdW5jdGlvbiB0ZXN0KCkge1xuICAgIGNvbnN0IHR1bmluZyA9IG5ldyB0dW5pbmdfMS5UdW5pbmcoJ0c0IEM0IEU0IEE0Jyk7XG4gICAgY29uc3QgY2hvcmQgPSBuZXcgY2hvcmRfMS5DaG9yZCgnQ203Jyk7XG4gICAgY29uc3QgZnJldGJvYXJkID0gdHVuaW5nLmdldEZyZXRib2FyZChjaG9yZCk7XG4gICAgY29uc3Qgb3V0cHV0RWxlbWVudCA9IGdldEJ5SWQoJ291dHB1dCcpO1xuICAgIG91dHB1dEVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKGdldEZyZXRib2FyZEVsZW1lbnQoZnJldGJvYXJkKSk7XG59XG5leHBvcnRzLnRlc3QgPSB0ZXN0O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdWlfMSA9IHJlcXVpcmUoXCIuL3VpXCIpO1xuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICAoMCwgdWlfMS50ZXN0KSgpO1xufVxuaW5pdGlhbGl6ZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9