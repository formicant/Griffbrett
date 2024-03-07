import { Note } from './note';
import { Chord } from './chord';

const splitRegex = /\s+|(?=[A-Z])/; // split by whitespace or before uppercase letters

/** Returns a row of the fret table (see `getFretboard`) */
function getFrets(openString: Note, allowedPitches: Set<number>, fretCount: number): Array<Note | null> {
  const frets = [];
  for (let fretIndex = 0; fretIndex <= fretCount; fretIndex++) {
    const note = openString.addInterval(fretIndex);
    frets.push(allowedPitches.has(note.pitchClass) ? note : null);
  }
  return frets;
}

/**
 * Assigns a group index to a given note based on the chord's root note
 * so that notes inside a single group form a non-inverted chord
 */
export function getGroup(rootNote: Note, note: Note | null): number | undefined {
  if (note !== null && note.octave !== undefined) {
    return Math.floor((note.octave * 12 + note.pitchClass - rootNote.pitchClass) / 12);
  } else {
    return undefined;
  }
}


/**
 * Represents the tuning of an instrument.
 * Can contain both absolute-pitched and octave-invariant strings.
 * (Octave-invariant strings are a workaround for octave-doubled strings for now)
 * The order of the strings is top-to-bottom in the instrument's playing position
 * (on the diagram, however, it's bottom-to-top)
 */
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
  
  /** Normalized tuning description: flats aren't used, the notes are separated by spaces */
  toString(): string {
    return `Tuning("${this.description}")`;
  }
  
  /**
   * Returns the fret table for a given chord as an array of table rows.
   * Each row is an array of cells and represents a string.
   * The order of the rows follows the string order in the tuning description (bottom-to-top on the diagram).
   * A cell represents a fret. 0th cell in a row represents open string.
   * Each cell contains either a note (if the note is in the chord) or `null` (otherwise)
   */
  getFretboard(chord?: Chord, fretCount: number = 12): Array<Note | null>[] {
    const allowedPitches = chord !== undefined
      ? chord.notes.map(n => n.pitchClass)
      : [];
    return this.openStrings.map(s => getFrets(s, new Set(allowedPitches), fretCount));
  }
}
