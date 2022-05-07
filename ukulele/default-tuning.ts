import GuitarLookupService, { GuitarLookupServiceImpl } from "../guitar/guitar-lookup-service";
import { getNote } from "../notes";
import { BarreChordPositions, buildGuitarChords, GuitarChordPositions } from "../util/build-guitar-chords";

// Note numbers of open strings in default tuning
export const DEFAULT_OPEN_NOTES = [
    getNote("G", 4),
    getNote("C", 4),
    getNote("E", 4),
    getNote("A", 4),
];

/**
 * Gets a chord lookup service for 4-string ukulele with default GCEA tuning
 */
export function getDefaultTuningUkuleleLookup(): GuitarLookupService {
    return defaultTuningUkuleleLookup;
}

/** All barre positions by name and quality in tab order */
const BARRE_POSITIONS: BarreChordPositions = {
    "C": {
        "M": [0, 0, 0, 3],
        "m": [0, 3, 3, 3],
        "7": [0, 0, 0, 1],
        "M7": [0, 0, 0, 2],
        "m7": [3, 3, 3, 3],
    },
    "D": {
        "M": [2, 2, 2, 0],
        "m": [2, 2, 1, 0],
        "7": [2, 0, 2, 0],
        "M7": [2, 2, 2, 4],
        "m7": [2, 2, 1, 3],
    },
    "E": {
        "m": [0, 4, 3, 2],
        "m7": [0, 2, 0, 2],
    },
    "F": {
        "M": [2, 0, 1, 0],
        "m": [1, 0, 1, 3],
        "7": [2, 3, 1, 0],
    },
    "G": {
        "M": [0, 2, 3, 2],
        "m": [0, 2, 3, 1],
        "7": [0, 2, 1, 2],
        "M7": [0, 2, 2, 2],
        "m7": [0, 2, 1, 1],
        "sus4": [0, 2, 3, 3],
    },
    "A": {
        "M": [2, 1, 0, 0],
        "m": [2, 0, 0, 0],
        "7": [0, 1, 0, 0],
        "M7": [1, 1, 0, 0],
    },
};

/** Open chords in tab order */
const OPEN_POSITIONS: GuitarChordPositions = {
    "EM7": [[1, 3, 0, 2]],
    "FM7": [[2, 4, 1, 3]],
    "Fm7": [[1, 3, 1, 3]],
    "Am7": [[0, 4, 3, 3]],
};

// This contains a list of every chord mapped to finger positions
const chordPositions = buildGuitarChords(OPEN_POSITIONS, BARRE_POSITIONS);

const defaultTuningUkuleleLookup = new GuitarLookupServiceImpl(chordPositions, DEFAULT_OPEN_NOTES);
