import Note, { NoteName } from "../notes";
import Chord, { ChordQuality, getChord } from "../chords";
import { GuitarChordPositions } from "../util/build-guitar-chords";
import { getChordFromNotes } from "../chord-lookup";

/** Represents a guitar tab where the first number is the 6th string and the last is the first string */
export type GuitarTab = number[];

/**
 * Used to look up note names on a guitar fret and get finger positions for chords
 */
export default interface GuitarLookupService {
    /**
     * Gets the note at the specified position
     * @param str String number where 0 is the highest string
     * @param fret Fret number where 0 is open
     */
    getNote(str: number, fret: number): Note;

    /**
     * Gets the finger positions for each variation that match the chord root and quality.
     * @param name Name of the chord (A-G#)
     * @param quality Quality of the chord (e.g. ""=major, "m"=minor)
     * @return Array of tabs
     */
    getChordTabs(name: NoteName, quality: ChordQuality|""): GuitarTab[];

    /**
     * Gets the finger positions that match the chord root and quality and variation.
     * @param name Name of the chord (A-G#)
     * @param quality Quality of the chord (e.g. "M"=major, "m"=minor, etc)
     * @param variation Chord variation
     * @return Finger positions in guitar tab order, or undefined if not a valid chord
     */
    getChordTab(name: NoteName, quality: ChordQuality|"", variation: number): GuitarTab | undefined;

    /**
     * Gets the number of variations for a chord
     * @param name Name of the chord (A-G#)
     * @param quality Quality of the chord (e.g. "M"=major, "m"=minor, etc)
     * @returns The number of chord variations
     */
    getChordVariationCount(name: NoteName, quality: ChordQuality|""): number;

    /**
     * Reverse lookup to get a chord from tab positions
     * @param tab Fret positions in tab order
     */
    getChordFromTab(tab: GuitarTab): Chord | undefined;
}

/**
 * Used to look up note names on a guitar fret and get finger positions for chords
 */
export class GuitarLookupServiceImpl implements GuitarLookupService
{
    readonly openNotes: Note[];

    /**
     * @param chordPositionsMap Map of chord positions by chord name and quality
     * @param openNotes Notes that the strings are tuned to (from top to bottom, high to low)
     */
    constructor(private readonly chordPositionsMap: GuitarChordPositions, openNotes: Note[]) {
        this.openNotes = openNotes;
    }

    /**
     * Gets the note at the specified position
     * @param str String number where 0 is the highest string
     * @param fret Fret number where 0 is open
     */
    getNote(str: number, fret: number): Note {
        return this.openNotes[str].transpose(fret);
    }

    /**
     * Gets the finger positions for each variation that match the chord root and quality.
     * @param name Name of the chord (A-G#)
     * @param quality Quality of the chord (e.g. ""=major, "m"=minor)
     * @return Array of tabs
     */
    getChordTabs(name: NoteName, quality: ChordQuality|""): GuitarTab[] {
        if (quality === "M") quality = "";
        return this.chordPositionsMap[name + quality];
    }

    /**
     * Gets the finger positions that match the chord root and quality and variation.
     * @param name Name of the chord (A-G#)
     * @param quality Quality of the chord (e.g. "M"=major, "m"=minor, etc)
     * @param variation Chord variation
     * @return Finger positions in guitar tab order, or undefined if not a valid chord
     */
    getChordTab(name: NoteName, quality: ChordQuality|"", variation: number): GuitarTab | undefined {
        //console.log("guitar chord: " + name + quality + variation);
        const chords = this.chordPositionsMap[name + ((quality === "M") ? "" : quality)];
        return (chords && chords[variation] ? chords[variation].slice() : undefined);
    }

    /**
     * Gets the number of variations for a chord
     * @param name Name of the chord (A-G#)
     * @param quality Quality of the chord (e.g. "M"=major, "m"=minor, etc)
     * @returns The number of chord variations
     */
    getChordVariationCount(name: NoteName, quality: ChordQuality|""): number {
        const tabs = this.getChordTabs(name, quality);
        return tabs ? tabs.length : 0;
    }

    /**
     * Reverse lookup to get a chord from a tab
     * @param tab Fret positions in tab order
     */
     getChordFromTab(tab: GuitarTab): Chord | undefined {
         const notes = tab.map((fret, i) => this.getNote(i, fret));
         return getChordFromNotes(...notes);
     }
}