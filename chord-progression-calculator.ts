import { Key } from "./keys";
import { Chord } from "./chords";

var majorProgressions = [
    [0, 1, 2, 3, 4, 5, 6],  // I => any
    [0, 1, 4, 6],           // ii => V, vii*
    [0, 2, 3, 5],           // iii => IV, vi
    [0, 1, 3, 4, 6],        // IV => ii, V, vii*
    [0, 4, 5],              // V => vi
    [0, 1, 2, 3, 4, 5],     // vi => ii, iii, IV, V
    [0, 6],                 // vii* => I
];
var minorProgressions = [
    [0, 1, 2, 3, 4, 5, 6],  // i => any
    [0, 1, 4, 6],           // ii* => V, vii*
    [0, 2, 3, 5, 6],        // III => iv, VI, vii*
    [0, 3, 4, 6],           // iv => V, vii*
    [0, 4, 5],              // V => VI
    [0, 2, 3, 4, 5, 6],     // VI => III, iv, V, vii*
    [0, 6],                 // vii* => i
];

/**
 * Calculates chord progressions. This class is immutable.
 */
export class ChordProgressionCalculator
{
    private chords: Chord[];
    private progressions: number[][];

    /** Set the chords and quality used to find the chord progressions */
    constructor(key: Key)
    {
        this.chords = key.chords;
        this.progressions = (key.mode === "minor" ? minorProgressions : majorProgressions);
    }

    /** Gets the chord at the specified position in the scale (from the chords set in setChords()) */
    public getChordAt(num: number): Chord
    {
        return this.chords[num];
    }

    /** Gets the root chord for the progression */
    public rootChord(): Chord
    {
        return this.getChordAt(0);
    }

    /** Gets the list of possible chords that could follow a chord */
    public getNextChords(chord: Chord): Chord[]
    {
        let num = this.getChordNumber(chord);
        // If it's not a valid chord set to root
        if (num < 0) {
            num = 0;
        }

        const progs = this.progressions[num];

        // Build list of chords
        let nextChords: Chord[] = [];
        for (var i = 0; i < progs.length; i++)
        {
            nextChords.push(this.chords[progs[i]]);
        }

        return nextChords;
    }

    /** 
     * Gets the number of the chord in the current key where the tonic is 0.
     * If the chord doesn't exist in the key -1 is returned.
     */
    public getChordNumber(chord: Chord): number
    {
        return this.chords.findIndex(c => c === chord);
    }
}
