import Chord from "../chords";
import Note from "../notes";
import { AbstractMusicScale, KeySignature, ModeName } from "./music-scale";

export type BluesMode = "major" | "minor";

/** Scale intervals by mode name */
const SCALE_INTERVALS: { [key: string]: number[] } = {
    major:    [0, 2, 3, 4, 7, 9],     // [2, 1, 1, 3, 2, 3]
    minor:    [0, 3, 5, 6, 7, 10],    // [3, 2, 1, 1, 1, 3]
};

const BLUES_SIGNATURES: { [key in BluesMode]: KeySignature[] } = {
    "major": [
        { accidental: "b", count: 1 }, // C
        { accidental: "#", count: 4 }, // C#
        { accidental: "#", count: 1 }, // D
        { accidental: "b", count: 3 }, // Eb
        { accidental: "#", count: 3 }, // E
        { accidental: "b", count: 1 }, // F
        { accidental: "#", count: 5 }, // F#
        { accidental: "b", count: 1 }, // G
        { accidental: "b", count: 3 }, // Ab
        { accidental: "#", count: 2 }, // A
        { accidental: "b", count: 2 }, // Bb
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

export class BluesScale extends AbstractMusicScale {
    constructor(tonic: Note, mode: BluesMode = "minor") {
        super(tonic, mode);

        if (!SCALE_INTERVALS[mode]) {
            throw new Error("Invalid mode for blues scale: " + mode);
        }
    }

    protected getName(): string {
        return this.tonic.name + (this.mode === "major" ? "M" : "m") + " Blues";
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

    /** @override */
    protected getSignature(): KeySignature {
        const ks: KeySignature = Object.assign({}, BLUES_SIGNATURES[this.mode][this.tonic.number]);
        if (this.tonic.hasAccidental && this.tonic.accidental !== ks.accidental) {
            ks.accidental = this.tonic.accidental;
        }
        return ks;
    }
}
