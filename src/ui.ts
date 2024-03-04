import { Note } from './note';

function getById<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw Error(`Cannot find element with id '${id}'.`);
  }
  return element as T;
}

export function test() {
  const queryInput = getById<HTMLInputElement>('input');
  const resultElement = getById('result');
  
  function onInput() {
    resultElement.innerHTML = queryInput.value;
  }
  
  queryInput.addEventListener('input', onInput);
  
  queryInput.focus();
  
  const note = new Note('D#5');
}
