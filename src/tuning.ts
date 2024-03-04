import { Note } from './note';
import { Chord } from './chord';

const splitRegex = /\s+|(?=[A-Z])/; // split by whitespace or before uppercase letters


function getFrets(openString: Note, allowedPitches: Set<number>, fretCount: number): Array<Note | null> {
  const frets = [];
  for (let fretIndex = 0; fretIndex <= fretCount; fretIndex++) {
    const note = openString.addInterval(fretIndex);
    frets.push(allowedPitches.has(note.pitchClass) ? note : null);
  }
  return frets;
}


export function getGroup(rootNote: Note, note: Note | null): number | undefined {
  if (note !== null && note.octave !== undefined) {
    return Math.floor((note.octave * 12 + note.pitchClass - rootNote.pitchClass) / 12);
  } else {
    return undefined;
  }
}


export class Tuning {
  readonly description: string;
  readonly openStrings: Note[];
  
  constructor(description: string) {
    this.openStrings = description
      .split(splitRegex)
      .filter(n => n !== '')
      .map(n => new Note(n));
    if (this.openStrings.length === 0) {
      throw new Error('At least one open string required');
    }
    this.description = this.openStrings.join(' ');
  }
  
  toString(): string {
    return `Tuning("${this.description}")`;
  }
  
  getFretboard(chord: Chord, fretCount: number = 12): Array<Note | null>[] {
    const allowedPitches = new Set(chord.notes.map(n => n.pitchClass));
    return this.openStrings.map(s => getFrets(s, allowedPitches, fretCount));
  }
}
