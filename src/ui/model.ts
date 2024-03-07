import { instruments, instrumentByTuning } from '../theory/instruments';
import { Tuning } from '../theory/tuning';

/**
 * Represents the values of the page's input fields.
 * The values don't have to be valid or consistent.
 */
export interface Model {
  readonly instrument: string; // '' means custom
  readonly tuningDescription: string;
  readonly fretCount: number;
  readonly chordName: string;
}

export const maxFretCount = 36;

/** The values used when the page is open without a URL hash */
export const defaultModel: Model = {
  instrument: 'Ukulele (high G)',
  tuningDescription: 'G4 C4 E4 A4',
  fretCount: 12,
  chordName: '',
};

/**
 * Changes the model so that its values are consistent and returns the result.
 * The values don't have to be valid though (e.g. invalid tuning or chord are OK,
 * but a valid tuning with a wrong instrument is not)
 */
export function makeConsistent(model: Model): Model {
  // fretCount should be an integer between 0 and maxFretCount
  const fretCount = Math.max(0, Math.min(maxFretCount, Math.round(model.fretCount)));
  model = { ...model, fretCount };
  
  const instrumentTuning = instruments[model.instrument]?.description;
  try {
    const tuning = new Tuning(model.tuningDescription).description;
    if (tuning !== instrumentTuning) {
      // if tuning is valid and differs from instrument's, change the instrument
      const instrument = instrumentByTuning[tuning] || '';
      return { ...model, instrument };
    }
  } catch { }
  
  if (instrumentTuning) {
    // If tuning is invalid and instrument is valid, change the tuning
    return { ...model, tuningDescription: instrumentTuning };
  } else {
    // If instrument is invalid, change it to ''
    return { ...model, instrument: '' };
  }
}
