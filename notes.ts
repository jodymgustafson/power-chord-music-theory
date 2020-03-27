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

/**
 * Defines a musical note.
 * Notes can be retrieved by calling getNote().
 * Notes are immutable and sigletons by name and octave.
 * To check equality simply use the equality operator.
 * If you want to check equality without regard to name use the equals() method.
 */
export default interface Note
{
    /** Name of the note */
    readonly name: NoteName;
    /** Another name for the note or "" is there is none; e.g C# is Db */
    readonly alias: NoteName|"";
    /** Number of the note in integer notation where C=0 and B=11 */
    readonly number: number;
    /** Octave of the note */
    readonly octave: number;
    /** Note of the alias */
    readonly aliasNote: Note;
    /** Returns name with accidentals formatted */
    readonly formattedName: string;
    /** Gets the accidental of the note, or empty string */
    readonly accidental: Accidental;
    /** Returns true if the note has a flat or sharp accidental */
    readonly hasAccidental: boolean;
    /** Returns true if a note has a sharp accidental */
    readonly isSharp: boolean;
    /** Returns true if a note has a flat accidental */
    readonly isFlat: boolean;

    /** 
     * Gets the note that is this note transposed by the specified amount
     * @param steps Number of half steps, can be positive or negative
     */
    transpose(steps: number): Note;

    /**
     * Determines if this note is equal to another note.
     * Equality is determined by the note number and octave.
     * E.g. A#4 === Bb4
     * @param note The note to test
     */
    equals(note: Note): boolean;

    /**
     * Determines if this note is equal to another note without regard to octave.
     * Equality is determined by the note number.
     * E.g. A#5 === Bb4
     * @param note The note to test
     */
    equalsIgnoreOctave(note: Note): boolean;
}

/**
 * The implementation of a Note
 */
class NoteImpl implements Note
{
    readonly name: NoteName;
    readonly alias: NoteName|"";
    readonly number: number;
    readonly octave: number;

    constructor(name: NoteName, octave = 4) {
        let noteInfo = notesByName[name];
        if (!noteInfo) {
            throw new Error(name + " is not a valid note name");
        }
        this.octave = octave;
        this.name = noteInfo.name;
        this.number = noteInfo.number;
        this.alias = noteInfo.alias as NoteName;
    }

    get aliasNote(): Note {
        return this.alias ? getNote(this.alias, this.octave) : this;
    }

    get formattedName(): string {
        return formatAccidentals(this.name);
    }

    get accidental(): Accidental {
        return this.name.charAt(1) as Accidental;
    }

    get hasAccidental(): boolean {
        return this.accidental.length > 0;
    }

    get isSharp(): boolean {
        return this.accidental === "#";
    }

    get isFlat(): boolean {
        return this.accidental === "b";
    }

    transpose(steps: number): Note {
        return getNote(this.number + steps, this.octave);
    }

    equals(note: Note): boolean {
        return this.number === note.number && this.octave === note.octave;
    }

    equalsIgnoreOctave(note: Note): boolean {
        return this.number === note.number;
    }
}

/** Pool of immutable note instances */
const notePool: {[key: string]: Note}= {};

/**
 * Gets a note using integer notation
 * @param number Note number using integer notation where 0=C. Numbers over 11 and negative numbers will roll over and affect the octave.
 * @param octave The octave, default is 4
 */
export function getNote(number: number, octave?: number): Note;
/**
 * Gets a note by name
 * @param name Note name
 * @param octave The octave, default is 4
 */
export function getNote(name: NoteName, octave?: number): Note;
export function getNote(nameOrNumber: (NoteName|number), octave = 4): Note {
    let noteName: NoteName;
    if (typeof nameOrNumber === "string") {
        noteName = nameOrNumber;
    }
    else if (typeof nameOrNumber === "number") {
        const num = Math.abs((nameOrNumber < 0 ? 12 + (nameOrNumber % 12) : nameOrNumber) % 12);
        octave = octave + Math.floor(nameOrNumber / 12);
        noteName = STANDARD_NOTE_NAMES[num];
    }
    else {
        throw new Error("First parameter must be a note name or number");
    }

    const key = noteName + octave;
    let note = notePool[key];
    if (!note) {
        notePool[key] = note = new NoteImpl(noteName, octave)
    }
    return note;
}

/**
 * Parses a note name into a Note object, or undefined if invalid
 * @param note Note name with optional number for octave, e.g. C#6
 */
export function parseNote(note: string): Note {
    const re = /([A-G][#,b]?)(\d?)/.exec(note);
    if (re && re[1]) {
        const octave = re[2] ? parseInt(re[2], 10) : undefined;
        return getNote(re[1] as NoteName, octave);
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
export function getNotes(...name: string[]): Note[];
export function getNotes(...nameOrNumber: (string|number)[]): Note[] {
    return nameOrNumber.map(n => {
        if (typeof n === "string") {
            return parseNote(n);
        }
        else if (typeof n === "number") {
            return getNote(n);
        }
        else {
            throw new Error("Value must be a string or number");
        }
    });
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
