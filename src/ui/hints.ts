import { noteNames, noteNamePattern, unsupported } from '../theory/note';
import { Chord, suffixes } from '../theory/chord';
import { createElement } from './dom';
import { typesetChord } from './typography';

const noteRegex = new RegExp(`^\\s*(${noteNamePattern})`);


interface Hint {
  readonly text: string,
  readonly tooltip: string,
}


function getHints(inputText: string): Hint[] {
  const match = inputText.match(noteRegex);
  if (match && !(match[1] in unsupported)) {
    return suffixes.map(suffix => {
      const chordName = match[1] + suffix;
      const chord = new Chord(chordName);
      const notes = chord.notes.join(' ');
      return {
        text: chordName,
        tooltip: `⟨ ${notes} ⟩`
      };
    });
  } else {
    return noteNames.map(names => ({
      text: names[0],
      tooltip: names.length > 1 ? `= ${names[1]}` : ''
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

  private getHintElement(hint: Hint): HTMLButtonElement {
    const button = createElement('button', {
      innerText: typesetChord(hint.text),
      title: typesetChord(hint.tooltip),
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
