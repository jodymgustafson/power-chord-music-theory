import { Note } from "./notes";
import { Key } from "./keys";

export type ModeName = "lydian"|"M"|"major"|"ionian"|"mixolydian"|"dorian"|"m"|"minor"|"aeolian"|"phrygian"|"locrian";
/** Mode names starting with ionian (major) */
export const modes: ModeName[] = ["ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"];
const modeIntervals = [2, 2, 1, 2, 2, 2, 1];

// Scale intervals (computed below)
const scaleIntervals = {};

// static intializer
(() => {
    let intervals = modeIntervals.slice();
    for (let i = 0; i < modeIntervals.length; i++) {
        //console.log(intervals);
        scaleIntervals[modes[i]] = computeIntervals(intervals);
        intervals = rotate(intervals);
    }

    function computeIntervals(intervals: number[]): number[] {
        const result = [0];
        for (let i = 1; i < intervals.length; i++) {
            result.push(result[i - 1] + intervals[i - 1]);
        }
        return result;
    }

    function rotate(intervals: number[]): number[] {
        intervals.push(intervals.shift());
        return intervals;
    }
})();

/**
 * Gets all of the notes in a scale with the specified root
 * @param tonic Root note
 * @param mode Optional scale mode, default is major
 */
export function getScale(tonic: Note, mode: ModeName = "major"): Note[] {
    mode = normalizeMode(mode);
    const key = new Key(tonic.name, mode === "aeolian" ? "minor" : "major");

    const ints = scaleIntervals[mode];
    const scale = [tonic];
    
    for (let i = 1; i < 7; i++) {
        let noteNum = tonic.number + ints[i];
        scale.push(key.getNoteInKey(noteNum));
    }

    return scale;
}

/**
 * Normalizes a mode name to one of the seven modes 
 */
export function normalizeMode(mode: ModeName): ModeName
{
    switch (mode) {
        case "major":
        case "M":
            return "ionian";
        case "minor":
        case "m":
            return "aeolian";
        default:
            return mode;
    }
}
