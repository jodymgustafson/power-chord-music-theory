import Chord from "../chords";
import Note, { Accidental } from "../notes";
import { DiatonicMusicScale } from "./diatonic-scale";
import { KeySignature, ModeName } from "./music-scale";

export type PentatonicMode = "major" | "minor";

/** Scale intervals by mode name */
const SCALE_INTERVALS: { [key: string]: number[] } = {
    major:     [0, 2, 4, 7, 9],        // [2, 2, 3, 2, 3]
    minor:     [0, 3, 5, 7, 10],       // [3, 2, 2, 3, 2]
};

const SIGNATURES: { [key in PentatonicMode]: KeySignature[] } = {
    "major": [
        { accidental: "", count: 0 }, // C
        { accidental: "#", count: 5 }, // C#
        { accidental: "#", count: 1 }, // D
        { accidental: "b", count: 2 }, // Eb
        { accidental: "#", count: 3 }, // E
        { accidental: "", count: 0 }, // F
        { accidental: "#", count: 5 }, // F#
        { accidental: "", count: 0 }, // G
        { accidental: "b", count: 3 }, // Ab
        { accidental: "#", count: 2 }, // A
        { accidental: "b", count: 1 }, // Bb
        { accidental: "#", count: 4 }, //B
    ],
    "minor": [
        { accidental: "b", count: 3 }, // C
        { accidental: "#", count: 3 }, // C#
        { accidental: "b", count: 1 }, // D
        { accidental: "b", count: 5 }, // Eb
        { accidental: "b", count: 1 }, // E
        { accidental: "b", count: 3 }, // F
        { accidental: "#", count: 2 }, // F#
        { accidental: "b", count: 2 }, // G
        { accidental: "b", count: 4 }, // Ab
        { accidental: "b", count: 1 }, // A
        { accidental: "b", count: 5 }, // Bb
        { accidental: "#", count: 1 }, // B
    ],
};

const ACCIDENTALS = {
    major: { C: "", D: "#", E: "#", F: "b", G: "#", A: "#", B: "#" },
    minor: { C: "b", D: "b", E: "#", F: "b", G: "b", A: "", B: "#" },
};

/**
 * Implements a pentatonic scale.
 * This scale is the same as diatonic except
 * - it's missing the 4th and 7th notes in major mode
 * - it's missing the 2nd and 6th notes in minor mode
 */
export class PentatonicScale extends DiatonicMusicScale {
    constructor(tonic: Note, mode: PentatonicMode = "major") {
        super(tonic, mode, "pentatonic");

        if (!SCALE_INTERVALS[mode]) {
            throw new Error("Invalid mode for pentatonic scale: " + mode);
        }
    }

    protected getName(): string {
        return this.tonic.name + (this.mode === "major" ? "M" : "m") + " Pentatonic";
    }

    protected getModeAlias(): "" | ModeName {
        return "";
    }
    protected getChordsInScale(): Chord[] {
        return [];
    }

    protected getIntervals(): number[] {
        return SCALE_INTERVALS[this.mode];
    }

    protected get accidental(): Accidental {
        return this.tonic.accidental || ACCIDENTALS[this.mode][this.tonic.name];
    }

    /** @override */
    protected getSignature(): KeySignature {
        return {
            accidental: this.accidental,
            count: this.notes.reduce((cnt, n) => n.hasAccidental ? cnt + 1 : cnt, 0)
        };
    }
}
