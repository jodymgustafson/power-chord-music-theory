import { NoteName, Note } from "./notes";
import { Chord, parseChord } from "./chords";
import { getScale } from "./scales";

const circleOfFifths = ["C",  "G",  "D",  "A",  "E",  "B", "F#",
                        "C#", "G#", "D#", "A#", "E#", "B#",
                        "Cb", "Gb", "Db", "Ab", "Eb", "Bb", "F"];
const keySignatures =  [0, 1, 2, 3, 4, 5, 6, 
                        7, 6, 5, 4, 3, 2,
                        7, 6, 5, 4, 3, 2, 1];

export type KeyMode = "major"|"minor";

export type KeySignature = {
    accidental: string;
    count: number;
}

export class Key
{
    readonly tonic: NoteName;
    readonly mode: KeyMode;
    readonly name: string;
    private _notes: Note[];
    private _chords: Chord[];
    private _signature: KeySignature;

    constructor(tonic: NoteName, mode: KeyMode = "major") {
        this.tonic = tonic;
        this.mode = mode;
        this.name = tonic + (mode === "major" ? "M" : "m")
    }

    get signature(): KeySignature {
        return this._signature || (this._signature = getKeySignature(this));
    }

    get notes(): Note[] {
        return this._notes || (this._notes = getNotesInKey(this))
    }

    get chords(): Chord[] {
        return this._chords || (this._chords = getChordsInKey(this));
    }

    /**
     * Gets the note name for the note and adjusts the note to the key.
     * For example, in the key of C# the Ab note will be adjusted to G#.
     * @param note A note name
     * @param key: Key to adjust the name to using integer notation
     * @param minor Set to true for minor key
     */
    getNoteInKey(noteNumber: number, octave?: number): Note;
    /**
     * Gets the note name for the note and adjusts the note to the key.
     * For example, in the key of C# the Ab note will be adjusted to G#.
     * @param note A note in integer notation
     * @param key: Key to adjust the name to using integer notation
     * @param minor Set to true for minor key
     */
    getNoteInKey(noteName: NoteName, octave?: number): Note;
    getNoteInKey(nameOrNumber: NoteName|number, octave?: number): Note {
        return getNoteInKey(nameOrNumber, this, octave);
    }

    toString() {
        return this.name;
    }
}

export function parseKey(key: string): Key {
    const re = /([A-G]{1}[#|b]?)([m,M]?)/.exec(key);
    if (re && re[1])
    return new Key(re[1] as NoteName, re[2] === "m" ? "minor" : "major")
}

/**
 * Gets the key signature for a key
 */
function getKeySignature(key: Key): KeySignature {
    let idx = circleOfFifths.findIndex(i => i === key.tonic);
    if (key.mode === "minor") {
        // This will move the index back 3 because Am - 3 == CM
        idx = (idx + circleOfFifths.length - 3) % circleOfFifths.length;
    }
    return {
        count: keySignatures[idx],
        accidental: circleOfFifths[idx].charAt(1) || "#"
    };
}

function getNotesInKey(key: Key): Note[] {
    return getScale(new Note(key.tonic), key.mode);
}

function getNoteInKey(nameOrNumber: NoteName|number, key: Key, octave?: number): Note
{
    let note = new Note(nameOrNumber as any, octave);
    const noteName = note.name;
    if (noteName.length > 1) {
        // If it has an accidental then we need to check the key signature
        const noteIsFlat = noteName.charAt(1) === "b";
        const keyIsFlat = getKeySignature(key).accidental === "b";
        if (noteIsFlat !== keyIsFlat) {
            note = new Note(note.alias as NoteName, note.octave);
        }
    }

    return note;
}

const scaleQualities = ["m", "dim", "", "m", "m", "", ""];

/** 
 * Gets all of the chords in a key with the specified root
 * @param root  Root note number
 * @param minor (optional) Set to true for minor key
 */
function getChordsInKey(key: Key): Chord[]
{
    let chordsInScale: Chord[] = [];
    // Major and minor scales are offset by 2 places
    let offset = (key.mode === "minor" ? 0 : 2);
    let scale = getScale(new Note(key.tonic), key.mode);
    let notesInScale = scale.map(n => getNoteInKey(n.number, key));

    for (var i = 0; i < 7; i++)
    {
        const name = notesInScale[i].name + scaleQualities[(i + offset) % 7];
        chordsInScale.push(parseChord(name));
    }

    return chordsInScale;
}
