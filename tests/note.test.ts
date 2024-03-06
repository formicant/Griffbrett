import { Note } from '../src/theory/note';

describe('Note class', () => {
  
  test.each([
    ['A0', 0],
    ['A4', 4],
    ['A9', 9],
  ])('octave', (noteName, expectedOctave) => {
    expect(new Note(noteName).octave).toBe(expectedOctave);
  });
  
  test.each([
    ['C',   0], ['C4',   0],
    ['C#',  1], ['C#4',  1],
    ['Bb', 10], ['Bb4', 10],
    ['B',  11], ['B4',  11],
  ])('pitchClass', (noteName, expectedPitchClass) => {
    expect(new Note(noteName).pitchClass).toBe(expectedPitchClass);
  });
  
  test.each([
    ['B#', 'C'],
    ['Cb', 'B'],
    ['E#', 'F'],
    ['Fb', 'E'],
  ])('unsupported', (noteName, suggestion) => {
    const expectedError = SyntaxError(`Use ${suggestion} instead of ${noteName}`)
    expect(() => new Note(noteName)).toThrow(expectedError);
  });
  
  test.each([
    'C10', 'D-1', 'E4#'
  ])('invalid octave', noteName => {
    const expectedError = SyntaxError(`Can't parse note ${noteName}`)
    expect(() => new Note(noteName)).toThrow(expectedError);
  });
  
  test.each([
    '', '4', ' C', 'c', 'C##', 'H'
  ])('invalid note', noteName => {
    const expectedError = SyntaxError(`Can't parse note ${noteName}`)
    expect(() => new Note(noteName)).toThrow(expectedError);
  });
  
  test.each([
    ['G5', 'G5'],
    ['F',  'F'],
    ['Ab', 'G#'],
  ])('toString', (noteName, expectedString) => {
    expect(new Note(noteName).toString()).toBe(expectedString);
  });
  
  test.each([
    ['B',  'B'],
    ['B4', 'B4'],
    ['Bb', 'A#'],
  ])('equality', (noteName1, noteName2) => {
    expect(new Note(noteName1)).toEqual(new Note(noteName2));
  });
  
  test.each([
    ['B',  'C'],
    ['B4', 'B'],
    ['B4', 'B5'],
  ])('inequality', (noteName1, noteName2) => {
    expect(new Note(noteName1)).not.toEqual(new Note(noteName2));
  });
  
  test.each([
    ['G3', 1, 'G#3'],
    ['F3', 7, 'C4'],
    ['B',  1, 'C'],
    ['C3', 0, 'C3'],
    //['C3', -1, 'B2'], fails
  ])('addInterval', (noteName, interval, expectedResult) => {
    expect(new Note(noteName).addInterval(interval)).toEqual(new Note(expectedResult));
  });
  
});
