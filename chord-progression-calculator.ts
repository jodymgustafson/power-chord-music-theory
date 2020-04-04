import Chord from "./chords";
import MusicScale from "./scales";

const majorProgressions = [
    [0, 1, 2, 3, 4, 5, 6],  // I => any
    [0, 1, 4, 6],           // ii => V, vii*
    [0, 2, 3, 5],           // iii => IV, vi
    [0, 1, 3, 4, 6],        // IV => ii, V, vii*
    [0, 4, 5],              // V => vi
    [0, 1, 2, 3, 4, 5],     // vi => ii, iii, IV, V
    [0, 6],                 // vii* => I
];
const minorProgressions = [
    [0, 1, 2, 3, 4, 5, 6],  // i => any
    [0, 1, 4, 6],           // ii* => V, vii*
    [0, 2, 3, 5, 6],        // III => iv, VI, vii*
    [0, 3, 4, 6],           // iv => V, vii*
    [0, 4, 5],              // V => VI
    [0, 2, 3, 4, 5, 6],     // VI => III, iv, V, vii*
    [0, 6],                 // vii* => i
];

export default interface ChordProgressionCalculator
{
    /** Gets the root chord for the progression */
    readonly rootChord: Chord;

    /** Gets the chord at the specified position in the scale */
    getChordAt(num: number): Chord;

    /**
     * Gets the list of suggested chords that could follow a chord.
     * If it's not a valid chord in the scale then only the root note is returned.
     */
    getNextChords(chord: Chord): Chord[];

    /** 
     * Gets the chord number in the current key where the tonic is 0.
     * If the chord doesn't exist in the key -1 is returned.
     */
    getChordNumber(chord: Chord): number;
}

/**
 * Calculates chord progressions. This class is immutable.
 */
class ChordProgressionCalculatorImpl implements ChordProgressionCalculator
{
    readonly key: MusicScale;
    private progressions: number[][];

    constructor(key: MusicScale) {
        this.key = key;
        this.progressions = (key.modeAlias === "minor" ? minorProgressions : majorProgressions);
    }

    get rootChord(): Chord {
        return this.getChordAt(0);
    }

    getChordAt(num: number): Chord {
        return this.key.chords[num];
    }

    getNextChords(chord: Chord): Chord[] {
        let num = this.getChordNumber(chord);
        // If it's not a valid chord set to root
        if (num < 0) {
            num = 0;
        }

        const progs = this.progressions[num];

        // Build list of chords
        let nextChords: Chord[] = [];
        for (let i = 0; i < progs.length; i++) {
            nextChords.push(this.key.chords[progs[i]]);
        }

        return nextChords;
    }

    getChordNumber(chord: Chord): number {
        return this.key.chords.findIndex(c => c.name === chord.name);
    }
}

/**
 * Gets an instance of a chord progrerssion calculator
 * @param scale The scale to use, must be either major or minor
 */
export function getChordProgressionCalculator(scale: MusicScale): ChordProgressionCalculator {
    if (scale.normalizedMode !== "ionian" && scale.normalizedMode !== "aeolian") {
        throw new Error("Only major and minor scales are supported");
    }

    return new ChordProgressionCalculatorImpl(scale);
}