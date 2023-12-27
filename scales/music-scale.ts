import { formatAccidentals } from "..";
import Chord, { NoteOrName } from "../chords";
import Note, { Accidental, NoteName, getNote } from "../notes";

export type ScaleName = 
    "diatonic" |
    "pentatonic" |
    "blues";

export type ModeName = "lydian" |
    "major" | "ionian" |
    "mixolydian" |
    "dorian" |
    "minor" | "aeolian" |
    "phrygian" |
    "locrian";

export type KeySignature = {
    accidental: Accidental;
    count: number;
};

export interface MusicScale {
    /** The tonic note of the scale */
    readonly tonic: Note;
    /** The mode of the scale */
    readonly mode: ModeName;
    /** The normalized mode of the scale (major => ionian, minor => aeolian) */
    readonly normalizedMode: ModeName;
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
    /** @inheritdoc */
    readonly name: string;
    /** @inheritdoc */
    readonly modeAlias: "" | ModeName;
    /** @inheritdoc */
    readonly tonic: Note;
    /** @inheritdoc */
    readonly mode: ModeName;
    /** @inheritdoc */
    readonly normalizedMode: ModeName;
    
    protected _notes: Note[];
    protected _chords: Chord[];
    protected _signature: KeySignature;

    constructor(tonic: Note, mode: ModeName = "major") {
        this.tonic = tonic;
        this.mode = mode;
        this.normalizedMode = this.getNormalizedMode();
        this.name = this.getName();
        this.modeAlias = this.getModeAlias();
    }

    protected abstract getName(): string;
    protected abstract getModeAlias(): "" | ModeName;
    protected abstract getChordsInScale(): Chord[];
    protected abstract getSignature(): KeySignature;
    protected abstract getIntervals(): number[];

    protected getNormalizedMode(): ModeName {
        return this.mode;
    }

    /** @inheritdoc */
    get formattedName(): string {
        return formatAccidentals(this.name);
    }

    /** @inheritdoc */
    get signature(): KeySignature {
        return this._signature || (this._signature = this.getSignature());
    }

    /** @inheritdoc */
    get notes(): Note[] {
        return this._notes || (this._notes = this.getNotesInScale());
    }

    /** @inheritdoc */
    get chords(): Chord[] {
        return this._chords || (this._chords = this.getChordsInScale());
    }

    /** Gets the accidental used by this key */
    protected get accidental(): Accidental {
        return this.tonic.accidental;
    }

    /** @inheritdoc */
    getNoteInScale(note: Note): Note;
    getNoteInScale(noteName: NoteName): Note;
    getNoteInScale(note: NoteOrName): Note {
        if (typeof note === "string") {
            note = getNote(note);
        }

        if (note.alias && note.accidental !== this.tonic.accidental && note.alias.accidental === this.accidental) {
            note = note.alias;
        }
        return note;
    }

    /** @inheritdoc */
    getChordInScale(chord: Chord): Chord {
        const note = this.getNoteInScale(chord.root);
        if (chord.accidental !== note.accidental) {
            return chord.aliasChord;
        }
        return chord;
    }

    /** @override */
    toString(): string {
        return this.name;
    }

    /** @inheritdoc */
    equals(scale: MusicScale): boolean {
        return this.name === scale.name;
    }

    /** @inheritdoc */
    isSameAs(scale: MusicScale): boolean {
        return this.tonic.number === scale.tonic.number
            && (this.mode === scale.mode || this.modeAlias === scale.mode);
    }

    /**
     * Gets all of the notes in a scale with the specified root
     * @param scale The scale to get notes for
     */
    private getNotesInScale(): Note[] {
        const intervals = this.getIntervals();
        if (!intervals) {
            throw new Error("Invalid scale: " + this.name);
        }
        const tonicNote = this.tonic;

        const notes = intervals.map(i => {
            // Compute the next note from the tonic and interval
            const note = tonicNote.transpose(i);
            // What should we call it in this scale?
            return this.getNoteInScale(note);
        });

        return notes;
    }
}
