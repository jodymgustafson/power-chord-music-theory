import { Note, NoteName } from "../notes";
import { ChordQuality } from "../chords";

export type GuitarChordPositions = {[key: string]:number[][]};

// Note numbers of open strings in default tuning
const DEFAULT_OPEN_NOTES = [
    new Note("E", 4),
    new Note("B", 3),
    new Note("G", 3),
    new Note("D", 3),
    new Note("A", 2),
    new Note("E", 2)
];

/** Represents a guitar tab where the first number is the 6th string and the last is the first string */
export type GuitarTab = number[];

/**
 * Used to look up note names on a guitar fret
 */
export class GuitarLookupService
{
    /**
     * @param chordPositionsMap
     * @param openNotes Notes that the strings are tuned to (from top to bottom, high to low)
     */
    constructor(private readonly chordPositionsMap: GuitarChordPositions, private readonly openNotes = DEFAULT_OPEN_NOTES) { }

    /**
     * Gets the note at the specified position
     * @param str String number where 0 is the highest string
     * @param fret Fret number where 0 is open
     */
    getNote(str: number, fret: number): Note
    {
        return this.openNotes[str].transpose(fret);
    }

    /** 
     * Gets the finger positions for each variation that match the chord root and quality.
     * @param name Name of the chord (A-G#)
     * @param quality Quality of the chord (""=major, "m"=minor)
     * @return Array of tabs
     */
    getChordTabs(name: string, quality: string): GuitarTab[]
    {
        if (quality === "M") quality = "";
        return this.chordPositionsMap[name + quality];
    }

    /**
     * Gets the finger positions that match the chord root and quality and variation.
     * @param name Name of the chord (A-G#)
     * @param quality Quality of the chord ("M"=major, "m"=minor, etc)
     * @param variation Chord variation
     * @return Finger positions in guitar tab order, or undefined if not a valid chord
     */
    getChordTab(name: NoteName, quality: ChordQuality, variation: number): GuitarTab|undefined
    {
        if (quality === "M") quality = "";
        //console.log("guitar chord: " + name + quality + variation);
        var chords = this.chordPositionsMap[name + quality];
        return (chords && chords[variation] ? chords[variation].slice() : undefined);
    }

    /**
     * Gets the number of variations for a chord
     * @param name Name of the chord (A-G#)
     * @param quality Quality of the chord ("M"=major, "m"=minor, etc)
     * @returns The number of chord variations
     */
    getChordVariationCount(name: string, quality: string): number
    {
        var tabs = this.getChordTabs(name, quality);
        return tabs ? tabs.length : 0;
    }
}