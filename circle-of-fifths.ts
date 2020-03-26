import { CircularList } from "./util/circular-list";
import { normalizeMode, ModeName, MusicScale } from "./scales";
import { NoteName, Note } from "./notes";

export type ModeQuality = "M"|"m"|"d";
export type DegreeNumber = 1|2|3|4|5|6|7;
export type DegreeName = "Tonic"|"Supertonic"|"Mediant"|"Subdominant"|"Dominant"|"Submediant"|"Leading Tone"|"Subtonic";
export type FifthInfo = {
    note: Note,
    /** position in the circle of fifths, e.g. F=-1, C=0, G=1, etc */
    position: number,
    quality: ModeQuality,
    degreeNumber: DegreeNumber,
    degreeName: DegreeName,
    degreeRoman: string
}

/** Tonic names in circle of fisths order beginning with lydian */
export const tonicNames = new CircularList<NoteName>(["C", "G", "D", "A", "E", "B", "F#", "C#", "Ab", "Eb", "Bb", "F"]);
/** Mode names in circle of fisths order beginning with lydian */
export const circleModes: ModeName[] = ["lydian", "ionian", "mixolydian", "dorian", "aeolian", "phrygian", "locrian"];
/** Name for each note in a scale */
export const degreeNames: DegreeName[] = ["Tonic", "Supertonic", "Mediant", "Subdominant", "Dominant", "Submediant", "Leading Tone"];

const modeQualities = new CircularList<ModeQuality>(["M", "M", "M", "m", "m", "m", "d"]);
const degreeNumbers = new CircularList<DegreeNumber>([1, 5, 2, 6, 3, 7, 4]);
const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"];

/** Normalizes a tonic to one of the standard names */
export function normalizeTonic(tonic: NoteName): NoteName {
    return tonic === "Db" ? "C#" :
           tonic === "D#" ? "Eb" :
           tonic === "Gb" ? "F#" :
           tonic === "G#" ? "Ab" :
           tonic === "A#" ? "Bb" :
           tonic;
}

export class CircleOfFifths
{
    private _fifths: FifthInfo[];
    private _orderedFifths: FifthInfo[];

    constructor(readonly scale: MusicScale) {}

    /**
     * Gets the fifths in circle of fifths order, e.g. CM = F, C, G, D, A, E, B
     */
    get fifths(): FifthInfo[] {
        return this._fifths || (this._fifths = getFifths(this.scale));
    }

    /**
     * Gets fifths in note natural order starting with the tonic, e.g. CM = C, D, E, F, G, A, B
     */
    get orderedFifths(): FifthInfo[] {
        return this._orderedFifths || (this._orderedFifths = sortFifths(this.fifths.slice()));

    }
}

function sortFifths(fifths: FifthInfo[]): FifthInfo[] {
    return fifths.sort((a, b) => a.degreeNumber - b.degreeNumber);
}

/** Gets all of the fifths for a tonic and mode in display order on the circle */
function getFifths(scale: MusicScale): FifthInfo[] {
    const tonicNumber = getTonicNumber(scale.tonic);
    const modeNumber = getModeNumber(scale.mode);
    const start = -1 * modeNumber;

    const fifths: FifthInfo[] = [];
    for (let i = 0; i < 7; i++) {
        fifths.push(getFifthInfo(i, tonicNumber, start, scale));
    }

    return fifths;
}

function getFifthInfo(index: number, tonicNumber: number, start: number, scale: MusicScale): FifthInfo {
    const position = tonicNumber + start + index;
    const degreeNumber = degreeNumbers.itemAt(start + index);
    const quality = modeQualities.itemAt(index);

    const info = {
        note: scale.getNoteInScale(tonicNames.itemAt(position)),
        position: position,
        quality: quality,
        degreeNumber: degreeNumber,
        degreeName: degreeNames[degreeNumber - 1],
        degreeRoman: getDegreeRomanNumeral(degreeNumber, quality)
    };

    // When the seventh is a whole step below the tonic it is called Subtonic
    if (info.degreeNumber === 7 && info.quality === "M") {
        info.degreeName = "Subtonic";
    }

    return info;
}

/**
 * Gets the roman numeral representation of a degree and quality
 * @param degree Degree number where 1 is the tonic (1 to 7)
 * @param quality Major, minor or diminished
 */
function getDegreeRomanNumeral(degree: DegreeNumber, quality: ModeQuality): string {
    const roman = romanNumerals[degree - 1];
    return quality === "d" ? roman.toLowerCase() + "°" :
           quality === "m" ? roman.toLowerCase() :
           roman;
}

/** Gets the number of the tonic in the circle where C == 0, G == 1, etc */
function getTonicNumber(tonic: NoteName) {
    return tonicNames.indexOf(normalizeTonic(tonic));
}

/**
 * Gets the number of the mode where lydian is 0, ionian is 1, etc.
 */
function getModeNumber(mode: ModeName): number {
    return circleModes.indexOf(normalizeMode(mode));
}
