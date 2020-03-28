import Note, { NoteName, Accidental, getNote } from "./notes";
import { formatAccidentals } from "./util/format";
import { chords } from ".";

/** Supported chord qualities */
export type ChordQuality = "M"|"m"|"7"|"M7"|"m7"|"dim"|"dim7"|"sus4"|"sus2"|"aug"|"5"|"M6"|"m6"|"add2"|"9"|"M9"|"m9";
export type NoteOrName = Note|NoteName;

export const CHORD_INTERVALS = {
    "M": [0, 4, 7],
    "m": [0, 3, 7],
    "7": [0, 4, 7, 10],
    "M7": [0, 4, 7, 11],
    "m7": [0, 3, 7, 10],
    "dim": [0, 3, 6],
    "dim7": [0, 3, 6, 9],
    "sus4": [0, 5, 7],
    "sus2": [0, 2, 7],
    "aug": [0, 4, 8],
    "5": [0, 7],
    "M6": [0, 4, 7, 9],
    "m6": [0, 3, 7, 9],
    "add2": [0, 2, 4, 7],
    "9": [0, 4, 7, 10, 14],
    "M9": [0, 4, 7, 11, 14],
    "m9": [0, 3, 7, 10, 14],
};

export interface Chord
{
    /** Gets the root note of the chord */
    readonly root: Note;
    /** Gets the qualit of the chord */
    readonly quality: ChordQuality;
    /** Gets the bass note of the chord */
    readonly bass: Note;
    /** Gets the name of the chord, e.g. C#m/G# */
    readonly name: string;
    /** Gets the alias of the chord or "" is there is none, e.g C# is Db */
    readonly aliasChord: Chord;
    /** Gets name with accidentals formatted */
    readonly formattedName: string;
    /** Gets the notes in the chord */
    readonly notes: Note[];
    /** Gets the accidental of the chord, or empty string */
    readonly accidental: Accidental;
    /** Returns true if the chord has a flat or sharp accidental */
    readonly hasAccidental: boolean;
    /** Returns true if a chord has a sharp accidental */
    readonly isSharp: boolean;
    /** Returns true if a chord has a flat accidental */
    readonly isFlat: boolean;
    /** Gets the number of inversions of this chord */
    readonly inversionCount: number;
    /** Gets the intervals for this chord */
    readonly intervals: number[];
    /** Used to determine if the root is not the bass */
    readonly isInverted: boolean;

    /**
     * Gets the chord for the specified inversion,
     * e.g. C-0(CEG), C-1(EGC), C-2(GCE)
     * @param inversion Inversion number
     */
    getInversion(inversion: number): Chord;

    /**
     * Gets the chord that is the specified number of half steps from this one
     * @param steps 
     */
    transpose(steps: number): Chord;

    toString(): string;

    /**
     * Determines equality by checking if two chords have the same root, quality and bass
     * @param chord The chord to check
     */
    equals(chord: Chord): boolean;

    /**
     * Determines equality by checking if two chords have the same root and quality
     * @param chord The chord to check
     */
    equalsIgnoreBass(chord: Chord): boolean;

    /**
     * Determines if two chords are the same in regards to pitch.
     * E.g. C#M/G# and DbM/Ab are the same.
     * @param chord The chord to check
     */
    isSameAs(chord: Chord): boolean;
}

export class ChordImpl implements Chord
{
    readonly root: Note;
    readonly quality: ChordQuality;
    readonly bass: Note;
    readonly name: string;

    private _notes: Note[];

    get isInverted(): boolean {
        return !this.root.equalsIgnoreOctave(this.bass);
    }

    constructor(root: Note, quality: ChordQuality = "M", bass: Note = root) {
        this.root = root;
        this.quality = quality || "M";
        this.bass = bass;

        if (this.isInverted && this.notes.indexOf(bass) < 0) {
            throw new Error(`Bass note '${bass.name}' is not a member of this chord`);
        }

        this.name = root.name + (quality === "M" ? "" : quality) + (this.isInverted ? ("/" + bass.name) : "")
    }
    get aliasChord(): Chord {
        if (this.root.alias) {
            const bass = this.isInverted ? (this.bass.alias ? this.bass.alias : this.bass) : this.root.alias;
            return getChord(this.root.alias, this.quality, bass);
        }
        return this;
    }
    get formattedName(): string {
        return formatAccidentals(this.name);
    }
    get notes(): Note[] {
        return this._notes || (this._notes = getChordNotes(this));
    }
    get accidental(): Accidental {
        return this.root.accidental;
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
    get inversionCount(): number {
        return this.notes.length;
    }

    get intervals(): number[] {
        return getChordIntervals(this.quality);
    }

    getInversion(inversion: number): Chord {
        return getChord(this.root, this.quality, this.notes[inversion]);
    }

    transpose(steps: number): Chord {
        return getChord(this.root.transpose(steps), this.quality, this.bass.transpose(steps));
    }

    toString(): string {
        return this.name;
    }

    equals(chord: Chord): boolean {
        return this.name === chord.name;
    }

    equalsIgnoreBass(chord: Chord): boolean {
        return this.root.number === chord.root.number
            && this.quality === chord.quality;
    }

    isSameAs(chord: Chord): boolean {
        return this.root.number === chord.root.number
            && this.quality === chord.quality
            && this.bass.number === chord.bass.number;
    }
}

/**
 * Gets an instance of a chord
 * @param root Name of the root note
 * @param quality Chord quality
 * @param bass An optional bass note to create an inverted chord
 */
export function getChord(root: NoteName, quality?: ChordQuality, bass?: NoteOrName): Chord;
/**
 * Gets an instance of a chord
 * @param root Root note
 * @param quality Chord quality
 * @param bass An optional bass note to create an inverted chord
 */
export function getChord(root: Note, quality?: ChordQuality, bass?:NoteOrName): Chord;
export function getChord(root: NoteOrName, quality: ChordQuality = "M", bass?: NoteOrName): Chord {
    if (typeof root === "string") {
        root = getNote(root);
    }
    if (typeof bass === "string") {
        bass = getNote(bass);
    }

    return new ChordImpl(root, quality, bass);
}

/**
 * Parses a chord name into a Chord object, or undefined if not valid.
 * E.g. C#sus4/G#
 * @param chord Chord name which contains a root note and optionally a quality and bass note
 */
export function parseChord(chord: string): Chord {
    const parts = /([A-G][#,b]?)([a-zA-Z]*\d?)?(\/[A-G][#,b]?)?/.exec(chord);
    if (parts && parts[1]) {
        const root = parts[1] as NoteName;
        
        // Default quality is Major
        const quality = (parts[2] || "M") as ChordQuality;
        
        // Slice to remove the slash
        const bass = (parts[3] ? parts[3].slice(1) : root) as NoteName;

        return getChord(root, quality, bass);
    }
    return undefined;
}

/**
 * Gets the chord intervals for the specified chord quality
 */
export function getChordIntervals(quality: ChordQuality): number[] {
    const ints = CHORD_INTERVALS[quality];
    if (ints === undefined) {
        throw new Error("Unknown quality " + quality);
    }

    return ints;
}

/** 
 * Gets the notes for the chord
 * @param name A chord
 * @param inversion Inversion of the chord
 * @return Set of notes that make up the chord
 */
function getChordNotes(chord: Chord): Note[] {
    const root = chord.root;
    const intervals = getChordIntervals(chord.quality);
    
    const notes = [root];
    for (let i = 1; i < intervals.length; i++) {
        let note = getNote((root.number + intervals[i]) % 12);
        if (note.alias && note.accidental !== chord.accidental && note.aliasNote.accidental === chord.accidental) {
            note = note.aliasNote;
        }
        notes.push(note);
    }

    if (chord.bass !== chord.root) {
        // Adjust notes to the inversion specified by the bass note
        const inversion = notes.findIndex(n => n.equalsIgnoreOctave(chord.bass));
        invertNotes(notes, inversion);
    }

    return notes;
}

function invertNotes(notes: Note[], inversion: number): Note[] {
    // Shift the notes for the number of variation
    for (let i = 0; i < inversion; i++) {
        notes.push(notes.shift());
    }

    return notes;
}