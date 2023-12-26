import { NoteOrName } from "../chords";
import Note, { NoteName, getNote } from "../notes";
import { BluesScale } from "./blues-scale";
import { DiatonicMusicScale } from "./diatonic-scale";
import { MusicScale, ModeName, ScaleName } from "./music-scale";
import { PentatonicScale } from "./pentatonic-scale";

/**
 * Gets an instance of a scale
 * @param tonic Name of the tonic note
 * @param mode Mode for the scale
 */
export function getScale(tonic: NoteName, mode?: ScaleName): MusicScale;
/**
 * Gets an instance of a scale
 * @param tonic The tonic note
 * @param mode Mode for the scale
 */
export function getScale(tonic: Note, mode?: ScaleName): MusicScale;
export function getScale(tonic: NoteOrName, mode: ScaleName = "major"): MusicScale {
    if (typeof tonic === "string") {
        tonic = getNote(tonic);
    }

    if (mode.indexOf("blues") === 0)
        return new BluesScale(tonic, mode === "blues_M" ? "major" : "minor");
    else if (mode.indexOf("pent") === 0)
        return new PentatonicScale(tonic, mode === "pent_m" ? "minor" : "major");

    return new DiatonicMusicScale(tonic, mode as ModeName);
}

/**
 * Parses a major or minor scale into a MusicScale object, or undefined if invalid
 * @param scale Name of a scale, m=minor, M=major, e.g. C#m or C#M or just C#
 */
export function parseScale(scale: string): MusicScale {
    const re = /([A-G]{1}[#|b]?)([m,M]?)/.exec(scale);
    if (re && re[1]) {
        return getScale(re[1] as NoteName, re[2] === "m" ? "minor" : "major");
    }
    return undefined;
}

