import { CircularList } from "./util/circular-list";
import { normalizeMode, ModeName } from "./scales";
import { NoteName } from "./notes";

export type ModeQuality = "M"|"m"|"d";
export type DegreeNumber = 1|2|3|4|5|6|7;
export type DegreeName = "Tonic"|"Supertonic"|"Mediant"|"Subdominant"|"Dominant"|"Submediant"|"Leading Tone";
export type FifthInfo = {
    note: NoteName,
    position: number, // position in the circle of fifths, e.g. F=-1, C=0, G=1, etc
    quality: ModeQuality,
    degreeNumber: DegreeNumber,
    degreeName: DegreeName,
    degreeRoman: string
}

export const tonicNoteNames: NoteName[] = ["C", "G", "D", "A", "E", "B", "F#", "C#", "Ab", "Eb", "Bb", "F"];
export const tonicNames = new CircularList<NoteName>(tonicNoteNames);
/** Mode names in circle of fisths order beginning with lydian */
export const circleModes: ModeName[] = ["lydian", "ionian", "mixolydian", "dorian", "aeolian", "phrygian", "locrian"];
/** Name for each note in a scale */
export const degreeNames: DegreeName[] = ["Tonic", "Supertonic", "Mediant", "Subdominant", "Dominant", "Submediant", "Leading Tone"];

const modeQualities = new CircularList<ModeQuality>(["M", "M", "M", "m", "m", "m", "d"]);
const degreeNumbers = new CircularList<DegreeNumber>([1, 5, 2, 6, 3, 7, 4]);
const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"];
//const modeIntervals = [2, 2, 2, 1, 2, 2, 1];

/** Normalizes a tonic to one of the standard names */
export function normalizeTonic(tonic: NoteName): NoteName {
    return tonic === "Db" ? "C#" :
           tonic === "D#" ? "Eb" :
           tonic === "Gb" ? "F#" :
           tonic === "G#" ? "Ab" :
           tonic === "A#" ? "Bb" :
           tonic;
}

/**
 * Gets the roman numeral representation of a degree and quality
 * @param degree Degree number where 1 is the tonic (1 to 7)
 * @param quality Major, minor or diminished
 */
export function getDegreeRomanNumeral(degree: DegreeNumber, quality: ModeQuality) {
    const roman = romanNumerals[degree - 1];
    return quality === "d" ? roman.toLowerCase() + "°" :
           quality === "m" ? roman.toLowerCase() :
           roman;
}

/** Gets all of the fifths for a tonic and mode in display order on the circle */
export function getFifths(tonic: NoteName, mode: ModeName): FifthInfo[] {
    const tonicNumber = getTonicNumber(tonic);
    const modeNumber = getModeNumber(mode);
    const start = -1 * modeNumber;

    const fifths: FifthInfo[] = [];
    for (let i = 0; i < 7; i++)
    {
        const noteNumber = tonicNumber + start + i;
        const degreeNumber = degreeNumbers.itemAt(start + i);
        const quality = modeQualities.itemAt(i);
        fifths.push(getFifthInfo(quality, noteNumber, degreeNumber));
    }

    return fifths;
}

function getFifthInfo(quality: ModeQuality, noteNumber: number, degreeNumber: DegreeNumber): FifthInfo {
    return {
        note: tonicNames.itemAt(noteNumber),
        position: noteNumber,
        quality: quality,
        degreeNumber: degreeNumber,
        degreeName: degreeNames[degreeNumber - 1],
        degreeRoman: getDegreeRomanNumeral(degreeNumber, quality)
    };
}

/** Gets the number of the tonic in the circle where C == 0, G == 1, etc */
export function getTonicNumber(tonic: NoteName) {
    return tonicNames.indexOf(normalizeTonic(tonic));
}

/**
 * Gets the number of the mode where lydian is 0, ionian is 1, etc.
 */
export function getModeNumber(mode: ModeName): number
{
    return circleModes.indexOf(normalizeMode(mode));
}

// /**
//  * Gets the note intervals for a mode.
//  * E.g. "major" = [2, 2, 1, 2, 2, 2, 1]
//  * @returns Array of 7 numbers where 2=whole step, 1=half step
//  */
// export function getModeIntervals(mode: Mode): number[]
// {
//     const ints = modeIntervals.slice();
//     const offset = -3 * modes.indexOf(normalizeMode(mode));
//     rotate(ints, offset);

//     return ints;
// }

// /**
//  * Gets the qualities for each note in the circle of fifths.
//  * Index 0 is the root, index 1 is the fifth of 0, etc.
//  * E.g. "major" = ["M", "M", "m", "m", "m", "d", "M"]
//  * @returns Array of 7 strings where "M"=major, "m"=minor, "d"=diminished
//  */
// export function getModeQualities(mode: Mode): string[]
// {
//     const q = modeQualities.getList();
//     rotate(q, modes.indexOf(normalizeMode(mode)));
//     return q;
// }

// /**
//  * Rotates the elements of an array in place. Use negative numbers to rotate left.
//  * @param arr Array to rotate
//  * @param count Number of places to rotate
//  * @returns The array
//  */
// function rotate(arr: any[], count: number): any[]
// {
//     count -= arr.length * Math.floor(count / arr.length);
//     arr.push.apply(arr, arr.splice(0, count));
//     return arr;
// }
