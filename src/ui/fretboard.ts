import { Note } from '../theory/note';
import { createElement } from './dom';
import { getGroup } from '../theory/tuning';
import { applyTypography } from './typography';
import { getGroupColor } from './colors';

function getFretHeaderElement(fretCount: number): HTMLParagraphElement {
  const fretHeaderElement = createElement('p', {
    className: 'fretHeader'
  });
  for (const fretIndex of Array(fretCount).keys()) {
    fretHeaderElement.appendChild(createElement('span', {
      innerText: fretIndex.toString()
    }));
  }
  return fretHeaderElement;
}

function getFretElement(fretNote: Note | null, rootNote?: Note): HTMLSpanElement {
  const innerText = fretNote !== null
    ? applyTypography(fretNote.toString())
    : '·';
  const group = rootNote !== undefined ? getGroup(rootNote, fretNote) : undefined;
  const color = group !== undefined ? getGroupColor(group) : undefined;
  return createElement('span', { innerText }, { color });
}

function getFrettedStringElement(frettedString: Array<Note | null>, rootNote?: Note): HTMLParagraphElement {
  const frettedStringElement = createElement('p');
  for (const fretNote of frettedString) {
    frettedStringElement.appendChild(getFretElement(fretNote, rootNote));
  }
  return frettedStringElement;
}

export function getFretboardElement(fretboard: Array<Note | null>[], rootNote?: Note): HTMLDivElement {
  const fretboardElement = createElement('div', { id: 'fretboard' });
  fretboardElement.appendChild(getFretHeaderElement(fretboard[0].length));
  for (const frettedString of [...fretboard].reverse()) {
    fretboardElement.appendChild(getFrettedStringElement(frettedString, rootNote));
  }
  return fretboardElement;
}
