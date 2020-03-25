import { sortNotes, Note, NoteName } from "./notes";
import { ChordQuality, Chord, getChordIntervals, chordIntervals } from "./chords";

/** Gets the chord with the specified notes, or undefined if not found */
export function getChordFromNotes(...notes: NoteName[]): Chord | undefined;
/** Gets the chord with the specified notes, or undefined if not found */
export function getChordFromNotes(...notes: Note[]): Chord | undefined;
export function getChordFromNotes(...notesOrNames: NoteName[] | Note[]): Chord | undefined {
    let notes: Note[];
    if (typeof notesOrNames[0] === "string") {
        notes = (notesOrNames as NoteName[]).map(n => new Note(n));
    }
    else {
        notes = (notesOrNames as Note[]).slice();
    }

    // Remember the bass note before sorting
    const bass = notes[0].name;
    // Put into natural order
    notes = sortNotes(notes);

    for (let i = 0; i < notes.length; i++) {
        // First get the intervals
        const ints = getIntervals(notes);
        const quality = lookupQualityByIntervals(ints);
        if (quality !== undefined) {
            // found it
            return new Chord(notes[0].name, quality, bass);
        }
        else {
            // try next
            notes = getNextPermutation(notes);
        }
    }

    // Not found
    return undefined;
}

function getNextPermutation(notes: Note[]): Note[] {
    notes.push(notes.shift());
    return notes;
}

function lookupQualityByIntervals(intervals: number[]): ChordQuality | undefined {
    for (const i in chordIntervals) {
        const quality = i as ChordQuality;
        const chordInts = getChordIntervals(quality);
        if (compareIntervals(chordInts, intervals)) {
            return quality;
        }
    }
    return undefined;
}

/** Gets the intervals for the notes */
function getIntervals(notes: Note[]): number[] {
    const ints: number[] = [];
    ints.push(0);
    const base = notes[0].number;
    for (let i = 1; i < notes.length; i++) {
        let num = notes[i].number;
        if (num < base) num += 12;
        ints.push(num - base);
    }
    return ints;
}

/* Checks to see if two sets of note intervals are the same */
function compareIntervals(ints1: number[], ints2: number[]): boolean {
    if (ints1.length === ints2.length) {
        for (let i = 0; i < ints1.length; i++) {
            if (ints1[i] !== ints2[i]) {
                return false;
            }
        }
        return true;
    }
    return false;
}
