import { Model, defaultModel } from './model';

const formatVersion = 0;

/**
 * Encodes the model into the page's URL hash part.
 * This allows the user to share links to specific tunings and chords.
 */
export function setUrlHash(model: Model) {
  const tuningDescription = model.tuningDescription.trim().replace(/\s+/g, '-');
  const chordName = model.chordName.trim();
  const hash = `${formatVersion}|${tuningDescription}|${model.fretCount}|${chordName}`;
  window.location.hash = hash;
}

/**
 * Reads the model from the page's URL hash part.
 * Note: the instrument is not saved in the hash (for the sake of brevity)
 * so it can be chosen incorrectly when multiple instruments share the same tuning
 */
export function getUrlHash(): Model {
  try {
    const text = decodeURI(window.location.hash.replace(/#/, ''));
    const parts = text.split('|');
    if (parseInt(parts[0]) === formatVersion) {
      const tuningDescription = parts[1].replace(/-/g, ' ');
      const fretCount = parseInt(parts[2]);
      const chordName = parts[3];
      return { instrument: '', tuningDescription, fretCount, chordName };
    }
  } catch { }
  return defaultModel;
}
