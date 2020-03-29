import Note, { NoteName, Accidental, getNote } from "./notes";
import { formatAccidentals } from ".";
import Chord, { ChordQuality, getChord, NoteOrName } from "./chords";
import * as cof from "./circle-of-fifths";

export type ModeName = "lydian"|"M"|"major"|"ionian"|"mixolydian"|"dorian"|"m"|"minor"|"aeolian"|"phrygian"|"locrian";

export type KeySignature = {
    accidental: Accidental;
    count: number;
}

/** Scale intervals by mode name */
const SCALE_INTERVALS: {[key: string]: number[]} = {
    lydian:     [ 0, 2, 4, 6, 7, 9, 11 ], // [2, 2, 2, 1, 2, 2, 1]
    ionian:     [ 0, 2, 4, 5, 7, 9, 11 ], // [2, 2, 1, 2, 2, 2, 1]
    mixolydian: [ 0, 2, 4, 5, 7, 9, 10 ], // [2, 1, 2, 2, 2, 1, 2]
    dorian:     [ 0, 2, 3, 5, 7, 9, 10 ], // [1, 2, 2, 2, 1, 2, 2]
    aeolian:    [ 0, 2, 3, 5, 7, 8, 10 ], // [2, 2, 2, 1, 2, 2, 1]
    phrygian:   [ 0, 1, 3, 5, 7, 8, 10 ], // [2, 2, 1, 2, 2, 1, 2]
    locrian:    [ 0, 1, 3, 5, 6, 8, 10 ]  // [2, 1, 2, 2, 1, 2, 2]
};

/** Mode name offsets to get chords in a scale */
const OFFSETS_BY_MODE_NAME: {[key: string]: number} = {
    "ionian": 0,
    "dorian": 1,
    "phrygian": 2,
    "lydian": 3,
    "mixolydian": 4,
    "aeolian": 5,
    "locrian": 6
};

export default interface MusicScale
{
    /** The tonic note of the scale */
    readonly tonic: Note;
    /** The mode of the scale */
    readonly mode: ModeName;
    /** Gets the name of the scale */
    readonly name: string;
    /** Gets name with accidentals formatted */
    readonly formattedName: string;
    /** Gets another name for the mode, of "" if there is none (e.g. ionian => major, aeolian => minor) */
    readonly modeAlias: ModeName|"";
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


class MusicScaleImpl implements MusicScale
{
    readonly tonic: Note;
    readonly mode: ModeName;
    readonly name: string;
    readonly modeAlias: ModeName|"";
    private _notes: Note[];
    private _chords: Chord[];
    private _signature: KeySignature;

    constructor(tonic: Note, mode: ModeName = "major") {
        this.tonic = tonic;
        this.mode = normalizeMode(mode);
        this.name = tonic.name + (this.mode === "ionian" ? "M" : this.mode === "aeolian" ? "m" : `(${this.mode.slice(0,3)})`);
        this.modeAlias = this.mode === "ionian" ? "major" : this.mode === "aeolian" ? "minor" : "";
    }

    /**
     * Returns name with accidentals formatted
     */
    get formattedName(): string {
        return formatAccidentals(this.name);
    }

    get signature(): KeySignature {
        return this._signature || (this._signature = getSignature(this.tonic, this.mode));
    }

    get notes(): Note[] {
        return this._notes || (this._notes = getNotesInScale(this))
    }

    get chords(): Chord[] {
        return this._chords || (this._chords = getChordsInScale(this));
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
        return this.tonic.isSharp
    }

    get isFlat(): boolean {
        return this.tonic.isFlat
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

    toString() {
        return this.name;
    }

    equals(scale: MusicScale): boolean {
        return this.name === scale.name;
    }

    isSameAs(scale: MusicScale): boolean {
        return this.tonic.number === scale.tonic.number
            && this.mode === scale.mode;
    }
}

/**
 * Gets an instance of a scale
 * @param tonic Name of the tonic note
 * @param mode Mode for the scale
 */
export function getScale(tonic: NoteName, mode?: ModeName): MusicScale;
/**
 * Gets an instance of a scale
 * @param tonic The tonic note
 * @param mode Mode for the scale
 */
export function getScale(tonic: Note, mode?: ModeName): MusicScale;
export function getScale(tonic: NoteOrName, mode: ModeName = "major"): MusicScale {
    if (typeof tonic === "string") {
        tonic = getNote(tonic);
    }

    return new MusicScaleImpl(tonic, mode);
}

/**
 * Parses a major or minor scale into a MusicScale object, or undefined if invalid
 * @param scale Name of a scale, m=minor, M=major, e.g. C#m or C#M or just C#
 */
export function parseScale(scale: string): MusicScale {
    const re = /([A-G]{1}[#|b]?)([m,M]?)/.exec(scale);
    if (re && re[1]) {
        return getScale(re[1] as NoteName, re[2] === "m" ? "minor" : "major")
    }
    return undefined;
}

/**
 * Normalizes a mode name to one of the seven default mode names.
 * E.g. major => ionian, minor => aeolian
 */
export function normalizeMode(mode: ModeName|""): ModeName {
    switch (mode) {
        case "":
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

/**
 * Gets all of the notes in a scale with the specified root
 * @param scale The scale to get notes for
 */
function getNotesInScale(scale: MusicScale): Note[] {
    const intervals = SCALE_INTERVALS[scale.mode];
    const tonicNote = scale.tonic;

    const notes = intervals.map(i => {
        // Comnpute the next note from the tonic and interval
        let note = tonicNote.transpose(i);
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

// qualities for each note of the major scale
const scaleQualities: (ChordQuality|"")[] = ["", "m", "m", "", "", "m", "dim"];

/**
 * Gets all of the chords in a scale
 * @param scale The scale to get chords in
 */
function getChordsInScale(scale: MusicScale): Chord[] {
    const offset = OFFSETS_BY_MODE_NAME[scale.mode];

    const chordsInScale = scale.notes.map((note, i) => {
        const quality = scaleQualities[(i + offset) % 7] || "M";
        return getChord(note.name, quality)
    });

    return chordsInScale;
}

function getChordInScale(chord: Chord, scale: MusicScale): Chord {
    const note = getNoteInScale(chord.root, scale.tonic, scale.signature);
    if (chord.accidental !== note.accidental) {
        return chord.aliasChord;
    }
    return chord;
}

// The notes without accidentals in circle of fifth order starting with F
const NON_ACCIDENTALS = ["F", "C", "G", "D", "A", "E", "B"];

/**
 * Gets the key signature for a scale
 */
function getSignature(tonic: Note, mode: ModeName): KeySignature {
    // A tonic with an accidental will have the inverse number of accidentals as
    // the same tonic without the accidental.
    // E.g. F has 1 flat, F# has 6 sharps, Fb has 6 flats; 7-6=1, 7-1=6
    let accidental = tonic.accidental

    // Get the index of the tonic without the accidental
    const tonicIdx = NON_ACCIDENTALS.indexOf(tonic.name.charAt(0) as NoteName) - 1;
    const modeIdx = cof.MODE_NAMES.indexOf(mode);

    // This will be negative for flats, positive for sharps
    let accidentalCount = tonicIdx - modeIdx + 1;

    if (accidental) {
        // Get the inverse value
        accidentalCount = 7 - Math.abs(accidentalCount);
    }
    else {
        accidental = accidentalCount < 0 ? "b" : accidentalCount > 0 ? "#" : "";
    }

    return {
        count: Math.abs(accidentalCount),
        accidental: accidental
    };
}

//const signatures = ["b", "b", "b", "b", "b", "b", "b", "", "", "", "", "", "", "", "#", "#", "#", "#", "#", "#", "#", "", "", "", "", "", "", ""];
//const signatures = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, ];
// {
//     "C": { // 0
//         "lydian":       ["", "", "", "", "", "", "#"],   //1
//         "ionian":       ["", "", "", "", "", "", ""],    //0
//         "mixolydian":   ["b", "", "", "", "", "", ""],   //-1
//         "dorian":       ["b", "b", "", "", "", "", ""],  //-2
//         "aeolian":      ["b", "b", "b", "", "", "", ""], //-3
//         "phrygian":     ["b", "b", "b", "b", "", "", ""],//-4
//         "locrian":      ["b", "b", "b", "b", "b", "", ""],//-5
//     },
//     "G": { // 1
//         "lydian":       ["", "", "", "", "", "#", "#"],  //2
//         "ionian":       ["", "", "", "", "", "", "#"],   //1
//         "mixolydian":   ["", "", "", "", "", "", ""],    //0
//         "dorian":       ["b", "", "", "", "", "", ""],   //-1
//         "aeolian":      ["b", "b", "", "", "", "", ""],  //-2
//         "phrygian":     ["b", "b", "b", "", "", "", ""], //-3
//         "locrian":      ["b", "b", "b", "b", "", "", ""],//-4
//     },
// };
