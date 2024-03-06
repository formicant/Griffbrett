import { Note } from '../src/theory/note';
import { Chord } from '../src/theory/chord';

describe('Chord class', () => {
  
  test.each([
    ['C',    ['C', 'E', 'G']],
    ['Cm',   ['C', 'Eb', 'G']],
    ['CmM7', ['C', 'Eb', 'G', 'B']],
    ['A',    ['A', 'C#', 'E']],
    ['Am',   ['A', 'C', 'E']],
    ['Am7',  ['A', 'C', 'E', 'G']],
  ])('valid', (chordName, expectedNotes) => {
    expect(new Chord(chordName).notes).toEqual(expectedNotes.map(n => new Note(n)));
  });
  
  test.each([
    '', '5', 'H5'
  ])('invalid root', chordName => {
    const expectedError = SyntaxError(`Can't parse chord ${chordName}`)
    expect(() => new Chord(chordName)).toThrow(expectedError);
  });
  
  test.each([
    ['C4',  '4'],
    ['Cm5', 'm5'],
    ['CC',  'C'],
  ])('invalid suffix', (chordName, suffix) => {
    const expectedError = SyntaxError(`Can't parse chord suffix ${suffix}`)
    expect(() => new Chord(chordName)).toThrow(expectedError);
  });
  
  test.each([
    ['C(no5)', 'C(no5) = <C E>'],
    ['C',      'C = <C E G>'],
    ['Bb5',    'Bb5 = <A# F>'],
    ['C6',     'C6 = <C E G A>'],
  ])('toString', (chordName, expectedString) => {
    expect(new Chord(chordName).toString()).toBe(expectedString);
  });

});
