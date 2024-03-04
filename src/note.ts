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

export const noteNamePattern = '[A-G][#b]?';

const noteRegex = new RegExp(`^(${noteNamePattern})(\\d)?$`);


export class Note {
  readonly pitchClass: number;
  readonly octave: number | undefined;
  
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
  
  private static fromPitchClassAndOctave(pitchClass: number, octave: number | undefined): Note {
    let note = Object.create(Note.prototype);
    note.pitchClass = pitchClass;
    note.octave = octave;
    return note;
  }
  
  toString(): string {
    const noteName = noteNames[this.pitchClass][0];
    return this.octave !== undefined
      ? `${noteName}${this.octave}`
      : noteName;
  }
  
  addInterval(interval: number): Note {
    const pitch = this.pitchClass + interval;
    const octave = this.octave !== undefined
      ? this.octave + Math.floor(pitch / 12)
      : undefined;
    return Note.fromPitchClassAndOctave(pitch % 12, octave); // incorrect for negative intervals
  }
}
