import { NoteOrName } from "../chords";
import { MODE_NAMES } from "../circle-of-fifths";
import Note, { NoteName, getNote } from "../notes";
import { BluesMode, BluesScale } from "./blues-scale";
import { DiatonicMusicScale } from "./diatonic-scale";
import { ModeName, MusicScale, ScaleName } from "./music-scale";
import { PentatonicMode, PentatonicScale } from "./pentatonic-scale";

const scaleCache: { [key: string]: MusicScale } = {};

/**
 * Gets an instance of a diatonic scale
 * @param tonic Name of the tonic note
 * @param mode Mode for the scale (default is major)
 */
export function getScale(tonic: NoteName, mode?: ModeName): MusicScale;
/**
 * Gets an instance of a scale
 * @param tonic Name of the tonic note
 * @param scale Name of the scale (default is diatonic)
 * @param mode Mode for the scale (default is major)
 */
export function getScale(tonic: NoteName, scale?: ScaleName, mode?: ModeName): MusicScale;
/**
 * Gets an instance of a scale
 * @param tonic The tonic note
 * @param mode Mode for the scale (default is major)
 */
export function getScale(tonic: Note, scale?: ScaleName, mode?: ModeName): MusicScale;
export function getScale(tonic: NoteOrName, scaleOrMode: ScaleName|ModeName = "diatonic", mode: ModeName = "major"): MusicScale {
    if (typeof tonic === "string") {
        tonic = getNote(tonic);
    }

    if (isModeName(scaleOrMode)) {
        mode = scaleOrMode as ModeName;
        scaleOrMode = "diatonic";
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
        return getScale(re[1] as NoteName, undefined, re[2] === "m" ? "minor" : "major");
    }
    return undefined;
}

const ALL_MODE_NAMES = MODE_NAMES.concat("major", "minor");

function isModeName(n: string): boolean {
    return ALL_MODE_NAMES.indexOf(n as any) >= 0;
}

