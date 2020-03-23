import { formatAccidentals } from "./util/format";

export type NoteName = "C"|"C#"|"Db"|"D"|"D#"|"Eb"|"E"|"E#"|"Fb"|"F"|"F#"|"Gb"|"G"|"G#"|"Ab"|"A"|"A#"|"Bb"|"B"|"B#"|"Cb";
export type Accidental = "#"|"b"|"";

// Integer notation                              0    1     2    3     4    5    6     7    8     9    10    11
export const STANDARD_NOTE_NAMES: NoteName[] = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

type NoteInfo = {
    name: NoteName;
    alias: NoteName|"";
    number: number;
}

const notesByName: {[key: string]: NoteInfo} = {
    "B#": { name: "B#", alias: "C", number: 0 },
    "C": { name: "C", alias: "B#", number: 0 },
    "C#": { name: "C#", alias: "Db", number: 1 },
    "Db": { name: "Db", alias: "C#", number: 1 },
    "D": { name: "D", alias: "", number: 2 },
    "D#": { name: "D#", alias: "Eb", number: 3 },
    "Eb": { name: "Eb", alias: "D#", number: 3 },
    "E": { name: "E", alias: "Fb", number: 4 },
    "Fb": { name: "Fb", alias: "E", number: 4 },
    "E#": { name: "E#", alias: "F", number: 5 },
    "F": { name: "F", alias: "E#", number: 5 },
    "F#": { name: "F#", alias: "Gb", number: 6 },
    "Gb": { name: "Gb", alias: "F#", number: 6 },
    "G": { name: "G", alias: "", number: 7 },
    "G#": { name: "G#", alias: "Ab", number: 8 },
    "Ab": { name: "Ab", alias: "G#", number: 8 },
    "A": { name: "A", alias: "", number: 9 },
    "A#": { name: "A#", alias: "Bb", number: 10 },
    "Bb": { name: "Bb", alias: "A#", number: 10 },
    "B": { name: "B", alias: "Cb", number: 11 },
    "Cb": { name: "Cb", alias: "B", number: 11 },
};

// computed below
const notesByNumber: NoteInfo[] = [];

// Static initializer
(() => {
    // Compute notesByNumber
    for (const name of STANDARD_NOTE_NAMES) {
        notesByNumber.push(notesByName[name as string]);
    }
    notesByNumber.sort((a, b) => a.number - b.number);
})();

export class Note
{
    /** Name of the note */
    readonly name: NoteName;
    /** Another name for the note, e.g C# is Db */
    readonly alias: NoteName|"";
    /** Number of the note in integer notation where C=0 and B=11 */
    readonly number: number;
    /** Octave of the note */
    readonly octave: number;

    /**
     * Creates a note using integer notation
     * @param number Note number where 0=C. Numbers over 11 and negative numbers will affect the octave
     * @param octave Optional octave, default is 4
     */
    constructor(number: number, octave?: number);
    /**
     * Creates a note by name
     * @param name Name of a note
     * @param octave Optional octave, default is 4
     */
    constructor(name: NoteName, octave?: number);
    constructor(nameOrNumber: NoteName|number, octave = 4) {
        let noteInfo: NoteInfo;
        if (typeof nameOrNumber === "string") {
            noteInfo = notesByName[nameOrNumber];
            if (!noteInfo) {
                throw new Error(nameOrNumber + " is not a valid note name");
            }
            this.octave = octave;
        }
        else if (typeof nameOrNumber === "number"){
            const num = nameOrNumber < 0 ? 12 + (nameOrNumber % 12) : nameOrNumber;
            noteInfo = notesByNumber[Math.abs(num % 12)];
            this.octave =  octave + Math.floor(nameOrNumber / 12);
        }
        else {
            throw new Error("Value must be a string or number");
        }

        this.name = noteInfo.name;
        this.number = noteInfo.number;
        this.alias = noteInfo.alias as NoteName;
    }

    get aliasNote(): Note {
        return this.alias ? new Note(this.alias) : this;
    }

    /**
     * Returns name with accidentals formatted
     */
    get formattedName(): string {
        return formatAccidentals(this.name);
    }

    /**
     * Gets the accidental of the note, or empty string
     */
    get accidental(): Accidental {
        return this.name.charAt(1) as Accidental;
    }

    /**
     * Returns true if the note has a flat or sharp accidental
     */
    get hasAccidental(): boolean {
        return this.accidental.length > 0;
    }

    /**
     * Returns true if a note has a sharp accidental
     */
    get isSharp(): boolean {
        return this.accidental === "#";
    }

    /**
     * Returns true if a note has a flat accidental
     */
    get isFlat(): boolean {
        return this.accidental === "b";
    }

    /** Gets a new note that is this note transposed by the specified amount */
    transpose(steps: number): Note {
        return new Note(this.number + steps, this.octave);
    }
}

/**
 * Parses a note name into a Note object, or undefined if invalid
 * @param note Note name with optional number for octave, e.g. C#6
 */
export function parseNote(note: string): Note {
    const re = /([A-G][#,b]?)(\d?)/.exec(note);
    if (re && re[1]) {
        const octave = re[2] ? parseInt(re[2], 10) : undefined;
        return new Note(re[1] as NoteName, octave);
    }
    return undefined;
}

/**
 * Gets one or more notes using integer notation
 * @param number Note number where 0=C. Numbers over 11 and negative numbers will affect the octave.
 */
export function getNotes(...number: number[]): Note[];
/**
 * Gets one or more notes by name. See parseNote().
 * @param name Note name with optional number for octave, e.g. C#6
 */
export function getNotes(...name: NoteName[]): Note[];
export function getNotes(...nameOrNumber: (NoteName|number)[]): Note[] {
    if (nameOrNumber.length === 0) {
        return [];
    }

    if (typeof nameOrNumber[0] === "string") {
        return (nameOrNumber as NoteName[]).map(n => parseNote(n));
    }
    else if (typeof nameOrNumber[0] === "number") {
        return (nameOrNumber as number[]).map(n => new Note(n));
    }
    else {
        throw new Error("Value must be a string or number");
    }
}

/**
* Sorts a set of notes into natural order on the musical scale starting with the root note
* @param notes An array of notes
* @param rootNote (optional) The root note, if not defined uses the first note in the notes array
*/
export function sortNotes(notes: Note[], root = notes[0]): Note[]
{
    return notes.sort((a, b) => {
        const an = (a.number < root.number ? a.number + 12 : a.number);
        const bn = (b.number < root.number ? b.number + 12 : b.number);
        return an - bn;
    });
}

/**
 * Extracts an array of names from an array of notes
 */
export function getNoteNames(notes: Note[]): string[] {
    return notes.map(n => n.name);
}

/**
 * Extracts an array of numbers from an array of notes
 */
export function getNoteNumbers(notes: Note[]): number[] {
    return notes.map(n => n.number);
}
