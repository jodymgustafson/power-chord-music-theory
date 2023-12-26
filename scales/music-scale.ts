import { formatAccidentals } from "..";
import Chord, { NoteOrName } from "../chords";
import Note, { Accidental, NoteName, getNote } from "../notes";

export type ModeName = "lydian" |
    "major" | "ionian" |
    "mixolydian" |
    "dorian" |
    "minor" | "aeolian" |
    "phrygian" |
    "locrian";

export type ScaleName = ModeName |
    "pentatonic" |
    "blues" | "blues_M" |
    "blues_m";

export type KeySignature = {
    accidental: Accidental;
    count: number;
};

/** Scale intervals by mode name */
const SCALE_INTERVALS: { [key: string]: number[] } = {
    lydian:     [0, 2, 4, 6, 7, 9, 11], // [2, 2, 2, 1, 2, 2, 1]
    ionian:     [0, 2, 4, 5, 7, 9, 11], // [2, 2, 1, 2, 2, 2, 1]
    mixolydian: [0, 2, 4, 5, 7, 9, 10], // [2, 1, 2, 2, 2, 1, 2]
    dorian:     [0, 2, 3, 5, 7, 9, 10], // [1, 2, 2, 2, 1, 2, 2]
    aeolian:    [0, 2, 3, 5, 7, 8, 10], // [2, 2, 2, 1, 2, 2, 1]
    phrygian:   [0, 1, 3, 5, 7, 8, 10], // [2, 2, 1, 2, 2, 1, 2]
    locrian:    [0, 1, 3, 5, 6, 8, 10], // [2, 1, 2, 2, 1, 2, 2]
    blues_M:    [0, 2, 3, 4, 7, 9],     // [2, 1, 1, 3, 2, 3]
    blues_m:    [0, 3, 5, 6, 7, 10],    // [3, 2, 1, 1, 1, 3]
    pentatonic: [0, 2, 4, 7, 9],        // [2, 2, 3, 2, 3]
};

export interface MusicScale {
    /** The tonic note of the scale */
    readonly tonic: Note;
    /** The mode of the scale */
    readonly mode: ModeName;
    /** The normalized mode of the scale (major => ionian, minor => aeolian) */
    readonly normalizedMode: ScaleName;
    /** Gets the name of the scale */
    readonly name: string;
    /** Gets name with accidentals formatted */
    readonly formattedName: string;
    /** Gets another name for the mode, of "" if there is none (e.g. ionian => major, aeolian => minor) */
    readonly modeAlias: ModeName | "";
    /** Gets signature information */
    readonly signature: KeySignature;
    /** Gets the notes in the scale */
    readonly notes: Note[];
    /** Gets the list of chords in the scale */
    readonly chords: Chord[];
    /** Returns true if the note has a flat or sharp accidental */
    readonly hasAccidental: boolean;
    /** Returns true if a note has a sharp accidental */
    readonly isSharp: boolean;
    /** Returns true if a note has a flat accidental */
    readonly isFlat: boolean;

    /**
     * Gets the note adjusted to the scale.
     * For example, in the key of C# the Ab note will be adjusted to G#.
     * @param note A note
     */
    getNoteInScale(note: Note): Note;

    /**
     * Gets the note adjusted to the scale.
     * For example, in the key of C# the Ab note will be adjusted to G#.
     * @param noteName A note name
     */
    getNoteInScale(noteName: NoteName): Note;

    /**
     * Gets the chord adjusted to the scale.
     * For example, in the key of C# the Ab chord will be adjusted to G#.
     * @param chord The chord to adjust
     */
    getChordInScale(chord: Chord): Chord;

    /**
     * Checks if two scales are equal
     * @param scale Scale to check
     */
    equals(scale: MusicScale): boolean;

    /**
     * Determines if two scales are the same in regards to pitch.
     * E.g. C#M and DbM are the same
     * @param scale Scale to check
     */
    isSameAs(scale: MusicScale): boolean;

    toString(): string;
}

export abstract class AbstractMusicScale implements MusicScale {
    readonly name: string;
    readonly modeAlias: "" | ModeName;
    readonly tonic: Note;
    readonly mode: ModeName;
    readonly normalizedMode: ScaleName;
    
    protected _notes: Note[];
    protected _chords: Chord[];
    protected _signature: KeySignature;

    constructor(tonic: Note, mode: ModeName = "major") {
        this.tonic = tonic;
        this.mode = mode;
        this.normalizedMode = this.getNormalizeMode();
        this.name = this.getName();
        this.modeAlias = this.getModeAlias();
    }

    protected abstract getName(): string;
    protected abstract getModeAlias(): "" | ModeName;
    protected abstract getNormalizeMode(): ScaleName;
    protected abstract getChordsInScale(): Chord[];
    protected abstract getSignature(): KeySignature;

    /**
     * Returns name with accidentals formatted
     */
    get formattedName(): string {
        return formatAccidentals(this.name);
    }

    get signature(): KeySignature {
        return this._signature || (this._signature = this.getSignature());
    }

    get notes(): Note[] {
        return this._notes || (this._notes = getNotesInScale(this));
    }

    get chords(): Chord[] {
        return this._chords || (this._chords = this.getChordsInScale());
    }

    /**
     * Returns true if the note has a flat or sharp accidental
     */
    get hasAccidental(): boolean {
        return this.tonic.hasAccidental;
    }

    /**
     * Returns true if a note has a sharp accidental
     */
    get isSharp(): boolean {
        return this.tonic.isSharp;
    }

    get isFlat(): boolean {
        return this.tonic.isFlat;
    }

    getNoteInScale(note: Note): Note;
    getNoteInScale(noteName: NoteName): Note;
    getNoteInScale(note: NoteOrName): Note {
        if (typeof note === "string") {
            note = getNote(note);
        }
        return getNoteInScale(note, this.tonic, this.signature);
    }

    /**
     * Gets the chord adjusted to the scale.
     * For example, in the key of C# the Ab chord will be adjusted to G#.
     * @param chord The chord to adjust
     */
    getChordInScale(chord: Chord): Chord {
        return getChordInScale(chord, this);
    }

    toString(): string {
        return this.name;
    }

    equals(scale: MusicScale): boolean {
        return this.name === scale.name;
    }

    isSameAs(scale: MusicScale): boolean {
        return this.tonic.number === scale.tonic.number
            && (this.mode === scale.mode || this.modeAlias === scale.mode);
    }
}

/**
 * Normalizes a scale name.
 * E.g. major => ionian, minor => aeolian, blues => blues_M
 */
// export function normalizeScale(mode: ScaleName | ""): ScaleName {
//     switch (mode) {
//         case "blues_M":
//             return "blues";
//         case "blues":
//         case "blues_m":
//         case "pentatonic":
//             return mode;
//         default:
//             return normalizeMode(mode as ModeName);
//     }
// }

/**
 * Gets all of the notes in a scale with the specified root
 * @param scale The scale to get notes for
 */
function getNotesInScale(scale: MusicScale): Note[] {
    const intervals = SCALE_INTERVALS[scale.normalizedMode];
    const tonicNote = scale.tonic;

    const notes = intervals.map(i => {
        // Compute the next note from the tonic and interval
        const note = tonicNote.transpose(i);
        // What should we call it in this scale?
        return getNoteInScale(note, tonicNote, scale.signature);
    });

    return notes;
}

/**
 * Gets the note with the correct name for the scale
 * @param note The note to get
 * @param scale The scale to get the note for
 */
function getNoteInScale(note: Note, tonicNote: Note, signature: KeySignature): Note {
    if (note.alias && note.accidental !== tonicNote.accidental && note.alias.accidental === signature.accidental) {
        note = note.alias;
    }
    return note;
}

function getChordInScale(chord: Chord, scale: MusicScale): Chord {
    const note = getNoteInScale(chord.root, scale.tonic, scale.signature);
    if (chord.accidental !== note.accidental) {
        return chord.aliasChord;
    }
    return chord;
}
