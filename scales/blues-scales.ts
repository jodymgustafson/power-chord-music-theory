import Chord from "../chords";
import Note from "../notes";
import { AbstractMusicScale, KeySignature, ModeName, ScaleName } from "./music-scale";

type BluesMode = "major" | "minor";
// type BluesSignature = {
//     [key: BluesMode]: {
//         [note: NoteName]: KeySignature
//     }
// }
const BLUES_SIGNATURES = {
    "major": {
        "C": { accidental: "b", count: 1 },
        "C#": { accidental: "#", count: 5 },
        "D": { accidental: "#", count: 1 },
        "Eb": { accidental: "b", count: 4 },
        "E": { accidental: "#", count: 3 },
        "F": { accidental: "b", count: 1 },
        "F#": { accidental: "#", count: 6 },
        "G": { accidental: "b", count: 1 },
        "Ab": { accidental: "b", count: 4 },
        "A": { accidental: "#", count: 2 },
        "Bb": { accidental: "b", count: 3 },
        "B": { accidental: "#", count: 4 },
    },
    "minor": {
        "C": { accidental: "b", count: 3 },
        "C#": { accidental: "#", count: 4 },
        "D": { accidental: "b", count: 1 },
        "Eb": { accidental: "b", count: 6 },
        "E": { accidental: "b", count: 1 },
        "F": { accidental: "b", count: 3 },
        "F#": { accidental: "#", count: 3 },
        "G": { accidental: "b", count: 2 },
        "Ab": { accidental: "b", count: 5 },
        "A": { accidental: "b", count: 1 },
        "Bb": { accidental: "b", count: 5 },
        "B": { accidental: "#", count: 1 },
    },
};

export class BluesScale extends AbstractMusicScale {
    constructor(tonic: Note, mode: BluesMode = "minor") {
        super(tonic, mode);
    }

    protected getName(): string {
        return this.tonic.name + (this.mode === "major" ? "M" : "m") + " Blues";
    }

    protected getNormalizeMode(): ScaleName {
        return (this.mode === "major" ? "blues_M" : "blues_m")
    }

    protected getModeAlias(): "" | ModeName {
        return "";
    }
    protected getChordsInScale(): Chord[] {
        return [];
    }

    /** @override */
    protected getSignature(): KeySignature {
        return BLUES_SIGNATURES[this.mode][this.tonic.name];
    }
}
