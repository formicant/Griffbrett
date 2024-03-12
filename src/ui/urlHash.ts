import { Model, defaultModel } from './model';
import { removeTypography } from './typography';

/**
 * Encodes the model into the page's URL hash part.
 * This allows the user to share links to specific tunings and chords.
 */
export function setUrlHash(model: Model) {
  const tuningDescription = removeTypography(model.tuningDescription).trim().replace(/\s+/g, '-');
  const chordName = removeTypography(model.chordName).trim();
  const hash = `${model.instrument}|${tuningDescription}|${model.fretCount}|${chordName}`;
  window.location.hash = hash;
}

/**
 * Reads the model from the page's URL hash part.
 * Note: the instrument is not saved in the hash (for the sake of brevity)
 * so it can be chosen incorrectly when multiple instruments share the same tuning
 */
export function getUrlHash(): Model {
  try {
    const text = decodeURIComponent(window.location.hash.replace(/#/, ''));
    const parts = text.split('|');
    const instrument = parts[0];
    const tuningDescription = parts[1].replace(/-/g, ' ');
    const fretCount = parseInt(parts[2]);
    const chordName = parts[3];
    return { instrument, tuningDescription, fretCount, chordName };
  } catch { }
  return defaultModel;
}
