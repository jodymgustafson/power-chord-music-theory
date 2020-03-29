import { CircularList } from "./util/circular-list";
import MusicScale, { normalizeMode, ModeName } from "./scales";
import Note, { getNotes } from "./notes";

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

/** Tonic names in circle of fifths order beginning with C */
export const COF_NOTES = new CircularList<Note>(getNotes("C", "G", "D", "A", "E", "B", "F#", "C#", "Ab", "Eb", "Bb", "F"));
/** Mode names in circle of fifths order beginning with lydian */
export const MODE_NAMES: ModeName[] = ["lydian", "ionian", "mixolydian", "dorian", "aeolian", "phrygian", "locrian"];

/** Name for each note in a scale */
const DEGREE_NAMES: DegreeName[] = ["Tonic", "Supertonic", "Mediant", "Subdominant", "Dominant", "Submediant", "Leading Tone"];
const MODE_QUALITIES = new CircularList<ModeQuality>(["M", "M", "M", "m", "m", "m", "d"]);
const DEGREE_NUMBERS = new CircularList<DegreeNumber>([1, 5, 2, 6, 3, 7, 4]);
const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII"];

export default interface CircleOfFifths
{
    /** Gets the scale of this instance */
    readonly scale: MusicScale;

    /** Gets the fifths in circle of fifths order, e.g. CM = F, C, G, D, A, E, B */
    readonly fifths: FifthInfo[];

    /** Gets fifths in note natural order starting with the tonic, e.g. CM = C, D, E, F, G, A, B */
    readonly orderedFifths: FifthInfo[];
}

class CircleOfFifthsImpl implements CircleOfFifths
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

/**
 * Gets circle of fifths info for a music scale
 * @param scale A music scale
 */
export function getCircleOfFifths(scale: MusicScale): CircleOfFifths {
    return new CircleOfFifthsImpl(scale);
}

/**
 * Sorts fifths into natural order by note
 * @param fifths 
 */
function sortFifths(fifths: FifthInfo[]): FifthInfo[] {
    return fifths.sort((a, b) => a.degreeNumber - b.degreeNumber);
}

/** Gets all of the fifths for a tonic and mode in display order on the circle */
function getFifths(scale: MusicScale): FifthInfo[] {
    const tonicIndex = getTonicIndex(scale.tonic);
    const modeNumber = getModeNumber(scale.mode);
    const start = -1 * modeNumber;

    const fifths: FifthInfo[] = [];
    for (let i = 0; i < 7; i++) {
        fifths.push(getFifthInfo(i, tonicIndex, start, scale));
    }

    return fifths;
}

function getFifthInfo(index: number, tonicNumber: number, start: number, scale: MusicScale): FifthInfo {
    const position = tonicNumber + start + index;
    const degreeNumber = DEGREE_NUMBERS.itemAt(start + index);
    const quality = MODE_QUALITIES.itemAt(index);

    const info = {
        note: scale.getNoteInScale(COF_NOTES.itemAt(position)),
        position: position,
        quality: quality,
        degreeNumber: degreeNumber,
        degreeName: DEGREE_NAMES[degreeNumber - 1],
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
    const roman = ROMAN_NUMERALS[degree - 1];
    return quality === "d" ? roman.toLowerCase() + "°" :
           quality === "m" ? roman.toLowerCase() :
           roman;
}

/** Gets the index of the tonic in the circle where C == 0, G == 1, etc */
function getTonicIndex(tonic: Note): number {
    return COF_NOTES.findIndex(n => n.number === tonic.number);
}

/**
 * Gets the number of the mode where lydian is 0, ionian is 1, etc.
 */
function getModeNumber(mode: ModeName): number {
    return MODE_NAMES.indexOf(normalizeMode(mode));
}
