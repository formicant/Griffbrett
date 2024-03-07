import { Note, noteNamePattern, knownNoteNames } from './note';

// Intervals in semitones:
const [P1, m2, M2, m3, M3, P4, A4, P5, m6, M6, m7, M7] = Array(12).keys();

const suffixMeanings: { [suffix: string]: number[] } = {
  'm(no5)': [P1, m3],
  '(no5)':  [P1, M3],
  '5':      [P1, P5],
  'dim':    [P1, m3, A4],
  'sus2':   [P1, M2, P5],
  'm':      [P1, m3, P5],
  '':       [P1, M3, P5],
  'sus4':   [P1, P4, P5],
  'aug':    [P1, M3, m6],
  'm6':     [P1, m3, P5, M6],
  '6':      [P1, M3, P5, M6],
  'm7':     [P1, m3, P5, m7],
  'mM7':    [P1, m3, P5, M7],
  '7':      [P1, M3, P5, m7],
  'M7':     [P1, M3, P5, M7],
};

const knownSuffixes = Object.keys(suffixMeanings);
knownSuffixes.sort();

/** List of all valid chord names, used in the chord popup */
export const knownChordNames: string[] = [];
for (const note of knownNoteNames) {
  for (const suffix of knownSuffixes) {
    knownChordNames.push(note + suffix);
  }
}

const chordRegex = new RegExp(`^(${noteNamePattern})(.*)$`);


export class Chord {
  readonly name: string;
  readonly notes: Note[];
  
  constructor(name: string) {
    this.name = name;
    const match = name.match(chordRegex);
    
    if (!match) {
      throw new SyntaxError(`Can't parse chord ${name}`);
    }
    const [_, rootName, suffix] = match;
    const root = new Note(rootName);
    if (!(suffix in suffixMeanings)) {
      throw new SyntaxError(`Can't parse chord suffix ${suffix}`);
    }
    this.notes = [];
    for (const interval of suffixMeanings[suffix]) {
      this.notes.push(root.addInterval(interval));
    }
  }
  
  toString(): string {
    return `${this.name} = <${this.notes.join(' ')}>`;
  }
}
