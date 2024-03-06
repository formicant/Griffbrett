import { Model, defaultModel } from './model';

const version = 0;

export function getUrlHash(): Model {
  try {
    const text = decodeURI(window.location.hash.replace(/#/, ''));
    const parts = text.split('|');
    if (parts[0] === version.toString()) {
      const tuningDescription = parts[1].replace(/-/g, ' ');
      const fretCount = parseInt(parts[2]);
      const chordName = parts[3];
      return { instrument: '', tuningDescription, fretCount, chordName };
    }
  } catch { }
  return defaultModel;
}

export function setUrlHash(model: Model) {
  const tuning = model.tuningDescription.replace(/\s+/g, '-');
  const hash = `${version}|${tuning}|${model.fretCount}|${model.chordName}`;
  window.location.hash = hash;
}
