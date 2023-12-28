import { NoteOrName } from "../chords";
import { MODE_NAMES } from "../circle-of-fifths";
import Note, { NoteName, getNote } from "../notes";
import { BluesMode, BluesScale } from "./blues-scale";
import { DiatonicMusicScale } from "./diatonic-scale";
import { ModeName, MusicScale, ScaleType } from "./music-scale";
import { PentatonicMode, PentatonicScale } from "./pentatonic-scale";

const scaleCache: { [key: string]: MusicScale } = {};

/**
 * Gets an instance of a diatonic major scale
 * @param tonic Name of the tonic note
 */
export function getScale(tonic: NoteOrName): MusicScale;
/**
 * Gets an instance of a diatonic scale
 * @param tonic Name of the tonic note
 * @param mode Mode for the scale
 */
export function getScale(tonic: NoteOrName, mode: ModeName): MusicScale;
/**
 * Gets an instance of a scale
 * @param tonic Name of the tonic note
 * @param mode Mode of the scale
 * @param scale Type of the scale
 */
export function getScale(tonic: NoteOrName, mode: ModeName, scale: "diatonic"): MusicScale;
export function getScale(tonic: NoteOrName, mode: BluesMode, scale: "blues"): MusicScale;
export function getScale(tonic: NoteOrName, mode: PentatonicMode, scale: "pentatonic"): MusicScale;
export function getScale(tonic: NoteOrName, mode: ModeName = "major", scaleOrMode: ScaleType = "diatonic"): MusicScale {
    if (typeof tonic === "string") {
        tonic = getNote(tonic);
    }

    const cacheKey = tonic.name + scaleOrMode + mode;
    let scale = scaleCache[cacheKey];
    if (!scale) {
        if (scaleOrMode === "diatonic") {
            scale = new DiatonicMusicScale(tonic, mode);
        }
        else if (scaleOrMode === "blues") {
            scale = new BluesScale(tonic, mode as BluesMode);
        }
        else if (scaleOrMode === "pentatonic") {
            scale = new PentatonicScale(tonic, mode as PentatonicMode);
        }
        else {
            throw new Error("Invalid scale name: " + scaleOrMode);
        }

        scaleCache[cacheKey] = scale;
    }

    return scale;
}

/**
 * Parses a diatonic major or minor scale into a MusicScale object, or undefined if invalid
 * @param scale Name of a scale, where m=minor, M=major, e.g. C#m or C#M or just C#
 */
export function parseScale(scale: string): MusicScale {
    const re = /([A-G]{1}[#|b]?)([m,M]?)/.exec(scale);
    if (re && re[1]) {
        return getScale(re[1] as NoteName, re[2] === "m" ? "minor" : "major");
    }
    return undefined;
}

const ALL_MODE_NAMES = MODE_NAMES.concat("major", "minor");

function isModeName(n: string): boolean {
    return ALL_MODE_NAMES.indexOf(n as any) >= 0;
}

