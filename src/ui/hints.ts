import { noteNames, noteNamePattern, unsupported } from '../theory/note';
import { Chord, suffixes } from '../theory/chord';
import { createElement } from './dom';
import { applyTypography } from './typography';

const noteRegex = new RegExp(`^\s*${noteNamePattern}`);


interface Hint {
  readonly text: string,
  readonly tooltip: string,
}


function getHints(inputText: string): Hint[] {
  const note = inputText.match(noteRegex);
  if (note && !(note[0] in unsupported)) {
    return suffixes.map(suffix => {
      const chordName = note + suffix;
      const chord = new Chord(chordName);
      return {
        text: chordName,
        tooltip: chord.notes.join(' ')
      };
    });
  } else {
    return noteNames.map(names => ({
      text: names[0],
      tooltip: names[1] || ''
    }));
  }
}


export class Hints {
  readonly hintsContainer: HTMLElement;
  readonly onClick: (hint: string) => void;
  
  constructor(hintsContainer: HTMLElement, onClick: (hint: string) => void) {
    this.hintsContainer = hintsContainer;
    this.onClick = onClick;
  }

  private getHintElement(hint: Hint) {
    const button = createElement('button', {
      innerText: applyTypography(hint.text),
      title: applyTypography(hint.tooltip),
    });
    button.addEventListener('click', () => { this.onClick(hint.text); });
    return button;
  }
  
  /** Shows the hint buttons */
  show(inputText: string) {
    const hints = getHints(inputText);
    const hintElements = hints.map(hint => this.getHintElement(hint));
    this.hintsContainer.replaceChildren(...hintElements);
  }
}
