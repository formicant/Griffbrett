import { Note } from '../src/note';
import { Chord } from '../src/chord';
import { Tuning, getGroup } from '../src/tuning';

describe('Tuning class', () => {
  
  test.each([
    '', '\n \t'
  ])('empty', description => {
    const expectedError = Error('At least one open string required');
    expect(() => new Tuning(description)).toThrow(expectedError);
  });
  
  test.each([
    ['CE',     ['C', 'E']],
    ['C# F',   ['C#', 'F']],
    ['D4F#4',  ['D4', 'F#4']],
    ['D#4 G4', ['D#4', 'G4']],
    ['E G#4',  ['E', 'G#4']],
    ['FA4',    ['F', 'A4']],
    ['Bb2',    ['A#2']],
  ])('openStrings', (description, expectedOpenStrings) => {
    expect(new Tuning(description).openStrings).toEqual(expectedOpenStrings.map(n => new Note(n)));
  });
  
  test.each([
    ['CE',     'Tuning("C E")'],
    ['C# F',   'Tuning("C# F")'],
    ['D4F#4',  'Tuning("D4 F#4")'],
    ['D#4 G4', 'Tuning("D#4 G4")'],
    ['E G#4',  'Tuning("E G#4")'],
    ['FA4',    'Tuning("F A4")'],
    ['Bb2',    'Tuning("A#2")'],
  ])('toString', (description, expectedString) => {
    expect(new Tuning(description).toString()).toBe(expectedString);
  });
  
  test.each([
    '?', 'O', 'A-B'
  ])('invalid', description => {
    expect(() => new Tuning(description)).toThrow(SyntaxError);
  });
  
  test.each([
    {
      description: 'A B C',
      chordName: undefined,
      fretCount: 3,
      fretboard: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ]
    },
    {
      description: 'C4',
      chordName: 'C',
      fretCount: 0,
      fretboard: [['C4']]
    },
    {
      description: 'A1 D2',
      chordName: 'F#6',
      fretCount: 9,
      fretboard: [
        [null, 'A#1', null, null, 'C#2', null, 'D#2', null, null,  'F#2'],
        [null, 'D#2', null, null, 'F#2', null, null,  null, 'A#2', null ],
      ]
    },
    {
      description: 'G C E A',
      chordName: 'Cm7',
      fretCount: 6,
      fretboard: [
        ['G',  null, null, 'A#', null, 'C',  null],
        ['C',  null, null, 'D#', null, null, null],
        [null, null, null, 'G',  null, null, 'A#'],
        [null, 'A#', null, 'C',  null, null, 'D#'],
      ]
    },
    {
      description: 'D#3',
      chordName: 'Edim',
      fretCount: 13,
      fretboard: [
        [null, 'E3', null, null, 'G3', null, null, 'A#3', null, null, null, null, null, 'E4'],
      ]
    },
    {
      description: 'C5 D',
      chordName: 'A',
      fretCount: undefined,
      fretboard: [
        [null, 'C#5', null, null, 'E5', null, null, null, null, 'A5', null, null, null],
        [null, null,  'E',  null, null, null, null, 'A',  null, null, null, "C#", null],
      ]
    },
  ])('getFretboard', ({ description, chordName, fretCount, fretboard }) => {
    const tuning = new Tuning(description);
    const chord = chordName !== undefined ? new Chord(chordName) : undefined;
    const expectedFretboard = fretboard.map(s => s.map(n => n !== null ? new Note(n) : null));
    const actualFretboard = tuning.getFretboard(chord, fretCount);
    expect(actualFretboard).toEqual(expectedFretboard);
  });
  
  test.each([
    ['C',  'C'],
    ['C4', 'C'],
  ])('getGroup: undefined group', (root, note) => {
    const group = getGroup(new Note(root), new Note(note));
    expect(group).toBeUndefined();
  });
  
  test.each([
    ['C4',  'C4', 'C#4'],
    ['E0',  'E8', 'Eb9'],
    ['C4',  'A5', 'B5'],
    ['A4',  'C5', 'B4'],
    ['G#3', 'G4', 'G#3'],
  ])('getGroup: same group', (root, note1, note2) => {
    const rootNote = new Note(root);
    const group1 = getGroup(rootNote, new Note(note1));
    const group2 = getGroup(rootNote, new Note(note2));
    expect(group1).toBeDefined();
    expect(group1).toEqual(group2);
  });
  
  test.each([
    ['C4',  'C4', 'C5'],
    ['E0',  'E9', 'Eb9'],
    ['C4',  'A3', 'B5'],
    ['A4',  'C5', 'B5'],
    ['G#3', 'G3', 'G#3'],
  ])('getGroup: different groups', (root, note1, note2) => {
    const rootNote = new Note(root);
    const group1 = getGroup(rootNote, new Note(note1));
    const group2 = getGroup(rootNote, new Note(note2));
    expect(group1).toBeDefined();
    expect(group2).toBeDefined();
    expect(group1).not.toEqual(group2);
  });

});
