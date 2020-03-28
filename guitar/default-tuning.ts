import { NoteName, getNote } from "../notes";
import { ChordQuality, Chord, getChord } from "../chords";
import { GuitarLookupService, GuitarChordPositions, GuitarLookupServiceImpl } from "./guitar-lookup-service";

// Note numbers of open strings in default tuning
export const DEFAULT_OPEN_NOTES = [
    getNote("E", 4),
    getNote("B", 3),
    getNote("G", 3),
    getNote("D", 3),
    getNote("A", 2),
    getNote("E", 2)
];

/**
 * Gets a chord lookup service for 6-string guitar with default EADGBE tuning
 */
export function getDefaultTuningGuitarLookup(): GuitarLookupService {
    return defaultTuningGuitarLookup;
}

/** All barre positions by name and quality in tab order */
const barrePositions = {
    "E": {
        //"": [-1, -1, 2, 1, 0, 0],
        "M": [0, 2, 2, 1, 0, 0],
        "m": [0, 2, 2, 0, 0, 0],
        "7": [0, 2, 0, 1, 0, 0],
        "M7": [0, 2, 1, 1, 0, 0],
        "m7": [0, 2, 0, 0, 0, 0],
        "9": [0, 2, 0, 1, 0, 2],
        "m9": [0, 2, 0, 0, 0, 2]
    },
    "A": {
        "M": [-1, 0, 2, 2, 2, 0],
        "m": [-1, 0, 2, 2, 1, 0],
        "7": [-1, 0, 2, 0, 2, 0],
        "M6": [-1, 0, 2, 2, 2, 2],
        "M7": [-1, 0, 2, 1, 2, 0],
        "m7": [-1, 0, 2, 0, 1, 0],
        "M9": [-1, 0, 2, 1, 0, 0],
        "dim": [-1, 0, 1, 2, 1, -1]
    },
    "C": {
        "M": [-1, 3, 2, 0, 1, 0],
        "m": [-1, 3, 1, 0, 1, -1],
        "7": [-1, 3, 2, 3, 1, -1],
        "M7": [-1, 3, 2, 0, 0, 0],
        "m7": [-1, 3, 1, 3, 1, 3],
        "M9": [-1, 3, 0, 0, 0, 0],
        "m9": [-1, 2, 0, 2, 2, 2],
        "sus4": [-1, 3, 3, 0, 1, -1]
    },
    "D": {
        "M6": [-1, -1, 0, 2, 0, 2],
    }
};

/** Open chords in tab order */
const openChords: GuitarChordPositions = {
    "D": [[-1, -1, 0, 2, 3, 2]],
    "G": [[3, 2, 0, 0, 0, 3]],

    "Bm": [[-1, -1, 0, 4, 3, 2]],
    "Dm": [[-1, -1, 0, 2, 3, 1]],
    "Ebm": [[-1, -1, 1, 3, 4, 2]],

    "C7": [[-1, 3, 2, 3, 1, 0]],
    "B7": [[-1, 2, 1, 2, 0, 2]],
    "D7": [[-1, -1, 0, 2, 1, 2]],
    "DM7": [[-1, -1, 0, 2, 2, 2]],
    "Dm7": [[-1, -1, 0, 2, 1, 1]],
    "Eb7": [[-1, -1, 1, 3, 2, 3]],
    "F#7": [[-1, -1, 4, 3, 2, 0]],
    "F#m7": [[-1, -1, 4, 3, 2, 1]],
    "G7": [[3, 2, 0, 0, 0, 1]],

    "Asus4": [[-1, 0, 0, 2, 3, 0]],
    "Dsus4": [[-1, -1, 0, 2, 3, 3]]
};

///////////////////////////////////////////////////////////////////////
// Internal functions
///////////////////////////////////////////////////////////////////////

function buildGuitarChords(): GuitarChordPositions {
    // First copy all of the open chords
    const allPositions: {[key: string]:number[][]} = Object.assign({}, openChords);

    // Then build and add all of the barre chords
    for (const rootName in barrePositions) {
        const qualities = barrePositions[rootName];
        for (const quality in qualities) {
            const positions = qualities[quality];
            const barreChord = getChord(rootName as NoteName, quality as ChordQuality);
            addBarreChordPositions(allPositions, barreChord, positions);
        }
    }

    sortGuitarChords(allPositions);
    //console.log("Guitar chords: ", allPositions);

    return allPositions;
}

/**
 * Takes a barre chord and finds all the 
 * @param rootNote 
 * @param quality 
 * @param positions 
 */
function addBarreChordPositions(guitarChords: GuitarChordPositions, barreChord: Chord, positions: number[]): void
{
    for (let fret = 0; fret < 12; fret++) {
        // Get next chord down
        const chord = barreChord.transpose(fret);
        let chords: number[][] = guitarChords[chord.name];
        if (!chords) {
            // The chord family doesn't exist yet so add it
            chords = guitarChords[chord.name] = [];
        }
        const newPositions = moveBarreChord(positions, fret);
        chords.push(newPositions);
    }
}

function moveBarreChord(positions: number[], amount: number): number[]
{
    const result: number[] = [];
    for (let i = 0; i < positions.length; i++) {
        const pos = positions[i];
        result.push(pos >= 0 ? (pos + amount) : -1);
    }
    return result;
}

function sortGuitarChords(guitarChords: GuitarChordPositions): void
{
    for (const name in guitarChords) {
        const chords: number[][] = guitarChords[name];
        // sort the chords from the top of the neck to the bottom
        chords.sort((a: number[], b: number[]) => {
            return getMinFret(a) - getMinFret(b);
        });
    }
}

function getMinFret(chord: number[]): number
{
    let min = Number.MAX_VALUE;
    for (let i = 0; i < chord.length; i++) {
        if (chord[i] === 0) return 0;
        if (chord[i] > 0) {
            min = Math.min(chord[i], min);
        }
    }
    return min;
}

// This contains a list of every chord mapped to finger positions
const chordPositions = buildGuitarChords();

const defaultTuningGuitarLookup = new GuitarLookupServiceImpl(chordPositions, DEFAULT_OPEN_NOTES); 
