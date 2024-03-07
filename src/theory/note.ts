/** 12edo notes. A note can have one or two names */
const noteNames = [
  ['C'], ['C#', 'Db'],
  ['D'], ['D#', 'Eb'],
  ['E'],
  ['F'], ['F#', 'Gb'],
  ['G'], ['G#', 'Ab'],
  ['A'], ['A#', 'Bb'],
  ['B'],
];

const unsupported: { [name: string]: string } = {
  'Cb': 'B',
  'B#': 'C',
  'Fb': 'E',
  'E#': 'F',
}

const noteIndexByName: { [name: string]: number } = { };
for (const [index, names] of noteNames.entries()) {
  for (const name of names) {
    noteIndexByName[name] = index;
  }
}

/**
 * List of all valid note names in alphabetical order
 * ['A', 'A#', 'Ab', 'B', ..., 'Gb']
 * Used in the chord popup
 */
export const knownNoteNames = Object.keys(noteIndexByName);
knownNoteNames.sort();

export const noteNamePattern = '[A-G][#b]?'; // used by chord.ts

const noteRegex = new RegExp(`^(${noteNamePattern})(\\d)?$`);


/** Represents either an absolute-pitched note or an octave-invariant note */
export class Note {
  /** Index of the note inside an octave (C = 0, C# = 1, ..., B = 11) */
  readonly pitchClass: number;
  
  /** Octave number (0 to 9) for an absolute note or `undefined` for an octave-invariant note */
  readonly octave?: number;
  
  constructor(name: string) {
    const match = name.match(noteRegex);
    if (match) {
      const [_, noteName, octaveName] = match;
      if (noteName in unsupported) {
        const suggestion = unsupported[noteName];
        throw new SyntaxError(`Use ${suggestion} instead of ${noteName}`);
      }
      this.pitchClass = noteIndexByName[noteName];
      this.octave = octaveName !== undefined ? parseInt(octaveName) : undefined;
    } else {
      throw new SyntaxError(`Can't parse note ${name}`);
    }
  }
  
  private static fromPitchClassAndOctave(pitchClass: number, octave?: number): Note {
    let note = Object.create(Note.prototype);
    note.pitchClass = pitchClass;
    note.octave = octave;
    return note;
  }
  
  /** Canonical name of the note. Flats aren't used (e.g. Bb becomes A#) */
  toString(): string {
    const noteName = noteNames[this.pitchClass][0];
    return this.octave !== undefined
      ? `${noteName}${this.octave}`
      : noteName;
  }
  
  /** Adds a non-negative interval in semitones and returns the result */
  addInterval(interval: number): Note {
    const pitch = this.pitchClass + interval;
    const octave = this.octave !== undefined
      ? this.octave + Math.floor(pitch / 12)
      : undefined;
    return Note.fromPitchClassAndOctave(pitch % 12, octave); // incorrect for negative intervals
  }
}
