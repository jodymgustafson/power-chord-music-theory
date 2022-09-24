import { NoteName } from "../notes";
import Chord, { ChordQuality, getChord } from "../chords";

export type GuitarChordPositions = { [key: string]: number[][] };
export type BarreChordPositions = { [key: string]: { [quality: string]: number[] } };

/**
 * Builds a set of guitar chord positions from open and barre positions
 * @param openPositions Set of all open positions
 * @param barrePositions Set of all barre positions
 * @returns All guitar chord positions
 */
export function buildGuitarChords(openPositions: GuitarChordPositions, barrePositions: BarreChordPositions): GuitarChordPositions {
    // First copy all of the open chords
    const allPositions: GuitarChordPositions = Object.assign({}, openPositions);

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

function addBarreChordPositions(guitarChords: GuitarChordPositions, barreChord: Chord, positions: number[]): void {
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

function moveBarreChord(positions: number[], amount: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < positions.length; i++) {
        const pos = positions[i];
        result.push(pos >= 0 ? (pos + amount) : -1);
    }
    return result;
}

function sortGuitarChords(guitarChords: GuitarChordPositions): void {
    for (const name in guitarChords) {
        const chords: number[][] = guitarChords[name];
        // sort the chords from the top of the neck to the bottom
        chords.sort((a: number[], b: number[]) => {
            return getMinFret(a) - getMinFret(b);
        });
    }
}

function getMinFret(chord: number[]): number {
    let min = Number.MAX_VALUE;
    for (let i = 0; i < chord.length; i++) {
        if (chord[i] === 0) return 0;
        if (chord[i] > 0) {
            min = Math.min(chord[i], min);
        }
    }
    return min;
}
