import { parseChord, Chord } from "../chords";

function validateParseChord(chord: string, expected: any): void {
    const c = parseChord(chord);
    expect(c.root).toBe(expected.root);
    expect(c.quality).toBe(expected.quality);
    expect(c.bass).toBe(expected.bass);
    expect(c.name).toBe(expected.name);
    expect(c.inversionCount).toBe(expected.inversionCount);
    expect(c.intervals).toEqual(expected.intervals);
}

describe("When parse chords", () => {
    it("should get chord C", () => {
        validateParseChord("C", { root: "C", quality: "M", name: "C", bass: "C", inversionCount: 3, intervals: [0, 4, 7] });
    });
    it("should get chord CM", () => {
        validateParseChord("CM", { root: "C", quality: "M", name: "C", bass: "C", inversionCount: 3, intervals: [0, 4, 7] });
    });
    it("should get chord C7", () => {
        validateParseChord("C7", { root: "C", quality: "7", name: "C7", bass: "C", inversionCount: 4, intervals: [0, 4, 7, 10] });
    });
    it("should get chord Dm", () => {
        validateParseChord("Dm", { root: "D", quality: "m", name: "Dm", bass: "D", inversionCount: 3, intervals: [0, 3, 7] });
    });
    it("should get chord Em7", () => {
        validateParseChord("Em7", { root: "E", quality: "m7", name: "Em7", bass: "E", inversionCount: 4, intervals: [0, 3, 7, 10] });
    });
    it("should get chord EbM7", () => {
        validateParseChord("EbM7", { root: "Eb", quality: "M7", name: "EbM7", bass: "Eb", inversionCount: 4, intervals: [0, 4, 7, 11] });
    });
    it("should get chord B#sus2", () => {
        validateParseChord("B#sus2", { root: "B#", quality: "sus2", name: "B#sus2", bass: "B#", inversionCount: 1, intervals: [0, 2, 7] });
    });

    it("should get chord C/G", () => {
        validateParseChord("C/G", { root: "C", quality: "M", name: "C/G", bass: "G", inversionCount: 3, intervals: [0, 4, 7] });
    });
    it("should get chord CM/G", () => {
        validateParseChord("CM/G", { root: "C", quality: "M", name: "C/G", bass: "G", inversionCount: 3, intervals: [0, 4, 7] });
    });
    it("should get chord Ddim/A", () => {
        validateParseChord("Ddim/A", { root: "D", quality: "dim", name: "Ddim/A", bass: "A", inversionCount: 3, intervals: [0, 3, 6] });
    });
    it("should get chord F#sus4/C#", () => {
        validateParseChord("F#sus4/C#", { root: "F#", quality: "sus4", name: "F#sus4/C#", bass: "C#", inversionCount: 2, intervals: [0, 5, 7] });
    });
    it("should get chord B5/F#", () => {
        validateParseChord("B5/F#", { root: "B", quality: "5", name: "B5/F#", bass: "F#", inversionCount: 1, intervals: [0, 7] });
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