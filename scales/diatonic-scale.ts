import Chord, { ChordQuality, getChord } from "../chords";
import { MODE_NAMES, normalizeMode } from "../circle-of-fifths";
import Note, { NoteName } from "../notes";
import { AbstractMusicScale, KeySignature, ModeName, ScaleName } from "./music-scale";

/** Mode name offsets to get chords in a scale */
const OFFSETS_BY_MODE_NAME: { [key: string]: number } = {
    "ionian": 0,
    "dorian": 1,
    "phrygian": 2,
    "lydian": 3,
    "mixolydian": 4,
    "aeolian": 5,
    "locrian": 6
};

// qualities for each note of the major scale
const SCALE_QUALITIES: (ChordQuality | "")[] = ["", "m", "m", "", "", "m", "dim"];

// The notes without accidentals in circle of fifth order starting with F
const NON_ACCIDENTALS = ["F", "C", "G", "D", "A", "E", "B"];

export class DiatonicMusicScale extends AbstractMusicScale {
    constructor(tonic: Note, mode: ModeName = "major") {
        super(tonic, mode);
    }

    protected getModeAlias(): "" | ModeName {
        return (
            this.mode === "ionian" ? "major" :
            this.mode === "major" ? "ionian" :
            this.mode === "aeolian" ? "minor" :
            this.mode === "minor" ? "aeolian" :
            ""
        );
    }

    protected getName(): string {
        return this.tonic.name + (
            this.mode === "major" ? "M" :
            this.mode === "minor" ? "m" :
            `(${this.mode.slice(0, 3)})`);        
    }

    protected getNormalizedMode(): ModeName {
        return normalizeMode(this.mode);
    }

    /**
     * Gets all of the chords in a scale
     * @param scale The scale to get chords in
     * @implements Abstract method
     */
    protected getChordsInScale(): Chord[] {
        const offset = OFFSETS_BY_MODE_NAME[this.normalizedMode];

        const chordsInScale = this.notes.map((note, i) => {
            const quality = SCALE_QUALITIES[(i + offset) % 7] || "M";
            return getChord(note.name, quality);
        });

        return chordsInScale;
    }
    
    /**
     * Gets the key signature for a scale
     * @implements Abstract method
     */
    protected getSignature(): KeySignature {
        // A tonic with an accidental will have the inverse number of accidentals as
        // the same tonic without the accidental.
        // E.g. F has 1 flat, F# has 6 sharps, Fb has 6 flats; 7-6=1, 7-1=6
        let accidental = this.tonic.accidental;

        // Get the index of the tonic without the accidental
        const tonicIdx = NON_ACCIDENTALS.indexOf(this.tonic.name.charAt(0) as NoteName) - 1;
        const modeIdx = MODE_NAMES.indexOf(this.normalizedMode as ModeName);

        // This will be negative for flats, positive for sharps
        let accidentalCount = tonicIdx - modeIdx + 1;

        if (accidental) {
            // Get the inverse value
            accidentalCount = 7 - Math.abs(accidentalCount);
        }
        else {
            accidental = accidentalCount < 0 ? "b" : accidentalCount > 0 ? "#" : "";
        }

        return {
            count: Math.abs(accidentalCount),
            accidental: accidental
        };
    }
}
