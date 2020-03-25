import { NoteName, Note, Accidental } from "./notes";
import { formatAccidentals } from "./util/format";

/** Supported chord qualities */
export type ChordQuality = "M"|"m"|"7"|"M7"|"m7"|"dim"|"dim7"|"sus4"|"sus2"|"aug"|"5"|"M6"|"m6"|"add2"|"9"|"M9"|"m9";

export const chordIntervals = {
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

export class Chord
{
    readonly root: NoteName;
    readonly quality: ChordQuality;
    readonly bass: NoteName;
    readonly name: string;

    private _notes: Note[];

    constructor(root: NoteName, quality: ChordQuality = "M", bass: NoteName = root) {
        this.root = root;
        this.quality = quality || "M";
        this.bass = bass;

        if (!this.bassNote) {
            throw new Error(`Bass note '${bass}' is not a member of this chord`);
        }

        this.name = root + (quality === "M" ? "" : quality) + (bass !== root ? ("/" + bass) : "")
    }

    /**
     * Gets the alias of the chord, e.g C# is Db
     */
    get aliasChord(): Chord {
        if (this.rootNote.alias) {
            const bass = this.root === this.bass ? this.rootNote.alias : (this.bassNote.alias ? this.bassNote.alias : this.bass);
            return new Chord(this.rootNote.alias, this.quality, bass);
        }
        return this;
    }

    /**
     * Gets name with accidentals formatted
     */
    get formattedName(): string {
        return formatAccidentals(this.name);
    }

    /**
     * Gets the notes in the chord
     */
    get notes(): Note[] {
        return this._notes || (this._notes = getChordNotes(this));
    }

    get rootNote(): Note {
        return this.notes.find(n => n.name === this.root);
    }

    get bassNote(): Note {
        return this.notes.find(n => n.name == this.bass);
    }

    /**
     * Gets the accidental of the chord, or empty string
     */
    get accidental(): Accidental {
        return this.root.charAt(1) as Accidental;
    }

    /**
     * Returns true if the chord has a flat or sharp accidental
     */
    get hasAccidental(): boolean {
        return this.accidental.length > 0;
    }

    /**
     * Returns true if a chord has a sharp accidental
     */
    get isSharp(): boolean {
        return this.accidental === "#";
    }

    /**
     * Returns true if a chord has a flat accidental
     */
    get isFlat(): boolean {
        return this.accidental === "b";
    }

    /**
     * Gets the number of inversions of this chord
     */
    get inversionCount(): number {
        return this.notes.length;
    }

    get intervals(): number[] {
        return getChordIntervals(this.quality);
    }

    /**
     * Gets the notes for the specified inversion,
     * e.g. C-0(CEG), C-1(EGC), C-2(GCE)
     * @param inversion Inversion number
     */
    getInversion(inversion: number): Note[] {
        // Make a copy
        const notes = this.notes.slice();
        
        // Shift the notes for the number of variation
        for (let i = 0; i < inversion; i++) {
            notes.push(notes.shift());
        }

        return notes;
    }

    /**
     * Gets the chord that is the specified number of steps from this one
     * @param steps 
     */
    transpose(steps: number): Chord {
        return new Chord(this.rootNote.transpose(steps).name, this.quality, this.bassNote.transpose(steps).name);
    }

    toString(): string {
        return this.name;
    }
}

/**
 * Parses a chord name into a Chord object,or undefined if not valid
 */
export function parseChord(chord: string): Chord {
    const parts = /([A-G][#,b]?)([a-zA-Z]*\d?)?(\/[A-G][#,b]?)?/.exec(chord);
    if (parts && parts[1]) {
        const root = parts[1] as NoteName;
        // Default quality is Major
        const quality = (parts[2] || "M") as ChordQuality;
        // Slice to remove the slash
        const bass = (parts[3] ? parts[3].slice(1) : root) as NoteName;
        return new Chord(root, quality, bass);
    }
    return undefined;
}

/**
 * Gets the chord intervals for the specified chord quality
 */
export function getChordIntervals(quality: ChordQuality): number[] {
    const ints = chordIntervals[quality];
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
    const root = new Note(chord.root);
    const intervals = getChordIntervals(chord.quality);
    
    const notes = [root];
    for (let i = 1; i < intervals.length; i++) {
        let note = new Note((root.number + intervals[i]) % 12);
        if (note.alias && note.accidental !== chord.accidental && note.aliasNote.accidental === chord.accidental) {
            note = note.aliasNote;
        }
        notes.push(note);
    }

    if (chord.bass !== chord.root) {
        // Adjust notes to the inversion specified by the bass note
        const inversion = notes.findIndex(n => n.name === chord.bass);
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