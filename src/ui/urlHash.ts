import { Model, defaultModel } from './model';

export function getUrlHash(): Model {
  const text = decodeURI(window.location.hash.replace(/#/, ''));
  try {
    const model = JSON.parse(text);
    if (typeof model.instrument === 'string' &&
        typeof model.tuningDescription === 'string' &&
        typeof model.fretCount === 'number' &&
        typeof model.chordName === 'string') {
      return model;
    }
  } catch { }
  return defaultModel;
}

export function setUrlHash(model: Model) {
  window.location.hash = JSON.stringify(model);
}
