import Chord from "../chords";
import Note from "../notes";
import { AbstractMusicScale, KeySignature, ModeName, ScaleName } from "./music-scale";

type PentatonicMode = "major" | "minor";

export class PentatonicScale extends AbstractMusicScale {
    constructor(tonic: Note, mode: PentatonicMode = "major") {
        super(tonic, mode);
    }

    protected getName(): string {
        return this.tonic.name + (this.mode === "major" ? "M" : "m") + " Pentatonic";
    }

    protected getNormalizeMode(): ScaleName {
        return (this.mode === "minor" ? "pent_m" : "pent_M")
    }

    protected getModeAlias(): "" | ModeName {
        return "";
    }
    protected getChordsInScale(): Chord[] {
        return [];
    }

    /** @override */
    protected getSignature(): KeySignature {
        // return BLUES_SIGNATURES[this.mode][this.tonic.name];
        return { accidental: this.tonic.accidental, count: 0 };
    }
}
