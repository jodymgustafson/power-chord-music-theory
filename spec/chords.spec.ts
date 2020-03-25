import { parseChord, Chord } from "../chords";
import { getNoteNames } from "../notes";

function validateParseChord(c: Chord, expected: any): void {
    expect(c.root).toBe(expected.root);
    expect(c.quality).toBe(expected.quality);
    expect(c.bass).toBe(expected.bass);
    expect(c.name).toBe(expected.name);
    expect(c.aliasChord.name).toBe(expected.alias);
    expect(c.inversionCount).toBe(expected.inversionCount);
    expect(c.intervals).toEqual(expected.intervals);
    expect(getNoteNames(c.notes)).toEqual(expected.notes);
}

describe("When parse chords", () => {
    it("should get chord C using new", () => {
        validateParseChord(new Chord("C"), { root: "C", quality: "M", name: "C", bass: "C", inversionCount: 3, intervals: [0, 4, 7], notes: ["C", "E", "G"], alias: "B#" });
    });
    it("should get chord C", () => {
        validateParseChord(parseChord("C"), { root: "C", quality: "M", name: "C", bass: "C", inversionCount: 3, intervals: [0, 4, 7], notes: ["C", "E", "G"], alias: "B#" });
    });
    it("should get chord CM", () => {
        validateParseChord(parseChord("CM"), { root: "C", quality: "M", name: "C", bass: "C", inversionCount: 3, intervals: [0, 4, 7], notes: ["C", "E", "G"], alias: "B#" });
    });
    it("should get chord Cb", () => {
        validateParseChord(parseChord("Cb"), { root: "Cb", quality: "M", name: "Cb", bass: "Cb", inversionCount: 3, intervals: [0, 4, 7], notes: ["Cb", "Eb", "Gb"], alias: "B" });
    });
    it("should get chord C7", () => {
        validateParseChord(parseChord("C7"), { root: "C", quality: "7", name: "C7", bass: "C", inversionCount: 4, intervals: [0, 4, 7, 10], notes: ["C", "E", "G", "Bb"], alias: "B#7" });
    });
    it("should get chord Dm", () => {
        validateParseChord(parseChord("Dm"), { root: "D", quality: "m", name: "Dm", bass: "D", inversionCount: 3, intervals: [0, 3, 7], notes: ["D", "F", "A"], alias: "Dm" });
    });
    it("should get chord Em7", () => {
        validateParseChord(parseChord("Em7"), { root: "E", quality: "m7", name: "Em7", bass: "E", inversionCount: 4, intervals: [0, 3, 7, 10], notes: ["E", "G", "B", "D"], alias: "Fbm7" });
    });
    it("should get chord EbM7", () => {
        validateParseChord(parseChord("EbM7"), { root: "Eb", quality: "M7", name: "EbM7", bass: "Eb", inversionCount: 4, intervals: [0, 4, 7, 11], notes: ["Eb", "G", "Bb", "D"], alias: "D#M7" });
    });
    it("should get chord B#sus2", () => {
        validateParseChord(parseChord("B#sus2"), { root: "B#", quality: "sus2", name: "B#sus2", bass: "B#", inversionCount: 3, intervals: [0, 2, 7], notes: ["B#", "D", "G"], alias: "Csus2" });
    });

    it("should get chord C/G", () => {
        validateParseChord(parseChord("C/G"), { root: "C", quality: "M", name: "C/G", bass: "G", inversionCount: 3, intervals: [0, 4, 7], notes: ["G", "C", "E"], alias: "B#/G" });
    });
    it("should get chord CM/G", () => {
        validateParseChord(parseChord("CM/G"), { root: "C", quality: "M", name: "C/G", bass: "G", inversionCount: 3, intervals: [0, 4, 7], notes: ["G", "C", "E"], alias: "B#/G" });
    });
    it("should get chord Ddim/A", () => {
        validateParseChord(parseChord("Ddim/Ab"), { root: "D", quality: "dim", name: "Ddim/Ab", bass: "Ab", inversionCount: 3, intervals: [0, 3, 6], notes: ["Ab", "D", "F"], alias: "Ddim/Ab" });
    });
    it("should get chord F#sus4/C#", () => {
        validateParseChord(parseChord("F#sus4/C#"), { root: "F#", quality: "sus4", name: "F#sus4/C#", bass: "C#", inversionCount: 3, intervals: [0, 5, 7], notes: ["C#", "F#", "B"], alias: "Gbsus4/Db" });
    });
    it("should get chord B5/F#", () => {
        validateParseChord(parseChord("B5/F#"), { root: "B", quality: "5", name: "B5/F#", bass: "F#", inversionCount: 2, intervals: [0, 7], notes: ["F#", "B"], alias: "Cb5/Gb" });
    });

    it("should get undefined when invalid", () => {
        expect(parseChord("5")).toBeUndefined();
    });
});

describe("When get chord notes", () => {
    const c = parseChord("C");
    it("should get C", () => {
        expect(c.notes.map(n => n.name)).toEqual(["C", "E", "G"]);
    });
    it("should get C/C", () => {
        expect(c.notes.map(n => n.name)).toEqual(["C", "E", "G"]);
    });
    it("should get C/E", () => {
        expect(c.getInversion(1).map(n => n.name)).toEqual(["E", "G", "C"]);
    });
    it("should get C/G", () => {
        expect(c.getInversion(2).map(n => n.name)).toEqual(["G", "C", "E"]);
    });
    it("should get F#sus4", () => {
        expect(parseChord("F#sus4").notes.map(n => n.name)).toEqual(["F#", "B", "C#"]);
    });
});

describe("When get a chord with an invalid bass note", () => {
    it("should throw an error", () => {
        expect(() => parseChord("C/Fb")).toThrowError("Bass note 'Fb' is not a member of this chord");
        expect(() => parseChord("Ddim/A")).toThrowError("Bass note 'A' is not a member of this chord");
        expect(() => parseChord("C#dim/F")).toThrowError("Bass note 'F' is not a member of this chord");
    })
})