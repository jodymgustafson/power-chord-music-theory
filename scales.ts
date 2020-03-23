import { Note, NoteName, Accidental } from "./notes";
import { formatAccidentals } from ".";
import { Chord, ChordQuality } from "./chords";
import * as cof from "./circle-of-fifths";

export type ModeName = "lydian"|"M"|"major"|"ionian"|"mixolydian"|"dorian"|"m"|"minor"|"aeolian"|"phrygian"|"locrian";
/** Mode names starting with ionian (major) */
export const modes: ModeName[] = ["ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"];
const modeIntervals = [2, 2, 1, 2, 2, 2, 1];

export type KeySignature = {
    accidental: Accidental;
    //signature: string[];
    count: number;
}
                        
// Scale intervals (computed below)
// e.g. CM = Am = [0, 2, 4, 5, 7, 9, 11]
const scaleIntervals: {[key: string]: number[]} = {};

// static intializer
(() => {
    let intervals = modeIntervals.slice();
    for (let i = 0; i < modeIntervals.length; i++) {
        scaleIntervals[modes[i]] = computeIntervals(intervals);
        // Rotate to next interval
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

export class MusicScale
{
    readonly tonic: NoteName;
    readonly mode: ModeName;
    readonly name: string;
    private _notes: Note[];
    private _chords: Chord[];
    private _signature: KeySignature;

    constructor(tonic: NoteName, mode: ModeName = "major") {
        this.tonic = tonic;
        this.mode = normalizeMode(mode);
        this.name = tonic + (this.mode === "ionian" ? "M" : this.mode === "aeolian" ? "m" : `(${this.mode.slice(0,3)})`);
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

    get tonicNote(): Note {
        return this.notes[0];
    }

    get chords(): Chord[] {
        return this._chords || (this._chords = getChordsInScale(this));
    }

    /**
     * Returns true if the note has a flat or sharp accidental
     */
    get hasAccidental(): boolean {
        return this.tonic.length > 1;
    }

    /**
     * Returns true if a note has a sharp accidental
     */
    get isSharp(): boolean {
        return this.tonicNote.isSharp
    }

    /**
     * Returns true if a note has a flat accidental
     */
    get isFlat(): boolean {
        return this.tonicNote.isFlat
    }
    
    /**
     * Gets the note name for the note and adjusts the note to the key.
     * For example, in the key of C# the Ab note will be adjusted to G#.
     * @param note A note name
     */
    getNoteInScale(noteNumber: number, octave?: number): Note;
    /**
     * Gets the note name for the note and adjusts the note to the key.
     * For example, in the key of C# the Ab note will be adjusted to G#.
     * @param note A note in integer notation
     */
    getNoteInScale(noteName: NoteName, octave?: number): Note;
    getNoteInScale(nameOrNumber: NoteName|number, octave?: number): Note {
        return getNoteInScale(new Note(nameOrNumber as any, octave), this);
    }

    getChordInScale(chord: Chord): Chord {
        return getChordInScale(chord, this);
    }

    toString() {
        return this.name;
    }
}

/**
 * Parses a major or minor key into a MusicScale object, or undefined if invalid
 * @param key Name of a key, m=minor, M=major, e.g. C#m or C#M or just C#
 */
export function parseKey(key: string): MusicScale {
    const re = /([A-G]{1}[#|b]?)([m,M]?)/.exec(key);
    if (re && re[1]) {
        return new MusicScale(re[1] as NoteName, re[2] === "m" ? "minor" : "major")
    }
    return undefined;
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

/**
 * Gets all of the notes in a scale with the specified root
 * @param tonic Root note
 * @param mode Optional scale mode, default is major
 */
function getNotesInScale(scale: MusicScale): Note[] {
    const ints = scaleIntervals[scale.mode];
    const tonicNote = new Note(scale.tonic); // don't use scale.tonicNote or it will cause a loop
    const notes = [tonicNote];
    const scaleAccidental = scale.signature.accidental;
    
    for (let i = 1; i < 7; i++) {
        let note = tonicNote.transpose(ints[i]);
        // What should we call it in this scale?
        if (note.alias && note.aliasNote.accidental === scaleAccidental) {
            note = note.aliasNote;
        }
        notes.push(note);
    }

    return notes;
}

function getNoteInScale(note: Note, scale: MusicScale): Note {
    if (note.accidental && note.accidental !== scale.signature.accidental) {
        return note.aliasNote;
    }
    return note;
}

// qualities for each note of the major scale
const scaleQualities: (ChordQuality|"")[] = ["", "m", "m", "", "", "m", "dim"];

/** 
 * Gets all of the chords in a key with the specified root
 * @param root  Root note number
 * @param minor (optional) Set to true for minor key
 */
function getChordsInScale(scale: MusicScale): Chord[]
{
    let chordsInScale: Chord[] = [];
    let offset = modes.indexOf(scale.mode);
    let notesInScale = scale.notes.map(n => getNoteInScale(n, scale));
    for (var i = 0; i < notesInScale.length; i++)
    {
        chordsInScale.push(new Chord(notesInScale[i].name, scaleQualities[(i + offset) % 7] || "M"));
    }

    return chordsInScale;
}

function getChordInScale(chord: Chord, scale: MusicScale): Chord {
    if (chord.accidental !== scale.tonicNote.accidental) {
        return new Chord(chord.rootNote.alias as NoteName, chord.quality, chord.bass);
    }
    return chord;
}

// The notes without accidentals in circle of fifth order starting with F
const NON_ACCIDENTALS = ["F", "C", "G", "D", "A", "E", "B"];

/**
 * Gets the key signature for a scale
 */
function getSignature(tonic: NoteName, mode: ModeName): KeySignature {
    // A tonic with an accidental will have the inverse number of accidentals as
    // the same tonic without the accidental.
    // E.g. F has 1 flat, F# has 6 sharps, Fb has 6 flats; 7-6=1, 7-1=6
    let accidental = tonic.slice(1) as Accidental;

    // Get the index of the tonic without the accidental
    let tonicIdx = NON_ACCIDENTALS.indexOf(tonic.charAt(0) as NoteName) - 1;
    const modeIdx = cof.circleModes.indexOf(mode);

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
// {
//     "C": { // 0
//         "lydian":       ["", "", "", "", "", "", "#"],   [0, 1]
//         "ionian":       ["", "", "", "", "", "", ""],    [0, 0]
//         "mixolydian":   ["b", "", "", "", "", "", ""],   [1, 0]
//         "dorian":       ["b", "b", "", "", "", "", ""],  [2, 0]
//         "aeolian":      ["b", "b", "b", "", "", "", ""], [3, 0]
//         "phrygian":     ["b", "b", "b", "b", "", "", ""],[4, 0]
//         "locrian":      ["b", "b", "b", "b", "b", "", ""],[5, 0]
//     },
//     "G": { // 1
//         "lydian":       ["", "", "", "", "", "#", "#"],  [0, 2]
//         "ionian":       ["", "", "", "", "", "", "#"],   [0, 1]
//         "mixolydian":   ["", "", "", "", "", "", ""],    [0, 0]
//         "dorian":       ["b", "", "", "", "", "", ""],   [1, 0]
//         "aeolian":      ["b", "b", "", "", "", "", ""],  [2, 0]
//         "phrygian":     ["b", "b", "b", "", "", "", ""], [3, 0]
//         "locrian":      ["b", "b", "b", "b", "", "", ""],[4, 0]
//     },
// };
