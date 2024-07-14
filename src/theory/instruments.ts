import { Tuning } from './tuning';

export const instruments: { [name: string]: Tuning } = {
  'Balalaika (academic)':       new Tuning('E4 E4 A4'),
  'Balalaika (folk)':           new Tuning('C4 E4 G4'),
  'Banjo':                      new Tuning('G4 D3 G3 B3 D4'),
  'Bass':                       new Tuning('E1 A1 D2 G2'),
  'Braguinha':                  new Tuning('D4 G4 B4 D5'),
  'Charango':                   new Tuning('G4 C5 E A4 E5'),
  'Cavaquinho (Portugal GGBD)': new Tuning('G4 G4 B4 D5'),
  'Cavaquinho (Portugal DABE)': new Tuning('D5 A4 B4 E5'),
  'Cavaquinho (Brazil DGBD)':   new Tuning('D4 G4 B4 D5'),
  'Cavaquinho (Brazil DGBE)':   new Tuning('D4 G4 B4 E5'),
  'Dala faendyr':               new Tuning('E4 A4 E5'),
  'Dechig pondar':              new Tuning('C4 D4 G4'),
  'Guitalele':                  new Tuning('A2 D3 G3 C4 E4 A4'),
  'Guitar':                     new Tuning('E2 A2 D3 G3 B3 E4'),
  'Guitarrón':                  new Tuning('A1 D2 G2 C3 E3 A2'),
  'Jarana jarocha':             new Tuning('G3 C4 E A3 G3'),
  'Jarana huasteca':            new Tuning('G3 B3 D4 F#4 A4'),
  'Mandolin':                   new Tuning('G3 D4 A4 E5'),
  'Rajao':                      new Tuning('D4 G4 C4 E4 A4'),
  'Requinto':                   new Tuning('A2 D3 G3 C4 E4 A4'),
  'Semistrunka':                new Tuning('D2 G2 B2 D3 G3 B3 D4'),
  'Tenor guitar':               new Tuning('C3 G3 D4 A4'),
  'Timple':                     new Tuning('G4 C5 E4 A4 D5'),
  'Ukulele (high G)':           new Tuning('G4 C4 E4 A4'),
  'Ukulele (low G)':            new Tuning('G3 C4 E4 A4'),
  'Ukulele (D6)':               new Tuning('A4 D4 F#4 B4'),
  'Ukulele (baritone)':         new Tuning('D3 G3 B3 E4'),
  'Vihuela':                    new Tuning('A3 D4 G4 B3 E4'),
  'Viola':                      new Tuning('C3 G3 D4 A4'),
  'Violin':                     new Tuning('G3 D4 A4 E5'),
};

/** Gets the first instrument with the given tuning */
export const instrumentByTuning: { [tuning: string]: string } = { };
for (const [name, tuning] of Object.entries(instruments)) {
  if (!(tuning.description in instrumentByTuning)) {
    instrumentByTuning[tuning.description] = name;
  }
}
