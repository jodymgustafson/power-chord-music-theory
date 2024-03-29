import { parseScale, getScale } from "../scales";
import { parseChord, getChord } from "../chords";
import { getNote } from "../notes";

export function validateScale(expected: any): void {
    const scale = parseScale(expected.name)
    expect(scale.tonic.name).withContext("tonic").toBe(expected.tonic);
    expect(scale.mode).withContext("mode").toBe(expected.mode);
    expect(scale.modeAlias).withContext("modeAlias").toBe(expected.modeAlias);
    expect(scale.name).withContext("name").toBe(expected.name);
    expect(scale.signature).withContext("signature").toEqual(expected.signature);
    expect(scale.chords.map(c => c.name)).withContext("chords").toEqual(expected.chords);
    expect(scale.notes.map(c => c.name)).withContext("notes").toEqual(expected.notes);
}

describe("When get a scale", () => {
    it("should get a major diatonic scale when only tonic parameter", () => {
        const scale = getScale("A");
        expect(scale.name).toBe("AM");
        expect(scale.mode).toBe("major");
        expect(scale.scaleType).toBe("diatonic");
    });
    it("should get a diatonic scale when no scale type", () => {
        const scale = getScale(getNote("A"), "minor");
        expect(scale.name).toBe("Am");
        expect(scale.mode).toBe("minor");
        expect(scale.scaleType).toBe("diatonic");
    });
    it("should get a specific blues scale", () => {
        const scale = getScale("A", "minor", "blues");
        expect(scale.name).toBe("Am Blues");
        expect(scale.mode).toBe("minor");
        expect(scale.scaleType).toBe("blues");
    });
    it("should get a specific pentatonic scale", () => {
        const scale = getScale(getNote("A"), "major", "pentatonic");
        expect(scale.name).toBe("AM Pentatonic");
        expect(scale.mode).toBe("major");
        expect(scale.scaleType).toBe("pentatonic");
    });
    it("should get an error when invalid pentatonic mode", () => {
        expect(() => getScale("A", "ionian" as any, "pentatonic")).toThrowError("Invalid mode for pentatonic scale: ionian");
    });
    it("should get an error when invalid blues mode", () => {
        expect(() => getScale("A", "ionian" as any, "blues")).toThrowError("Invalid mode for blues scale: ionian");
    });
});

describe("When parse a scale", () => {
    it("should parse C", () => validateScale({
        tonic: "C", mode: "major", name: "CM", modeAlias: "ionian",
        chords: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
        notes: ["C", "D", "E", "F", "G", "A", "B"],
        signature: { accidental: "", count: 0 } }));

    it("should parse DM", () => validateScale({
        tonic: "D", mode: "major", name: "DM", modeAlias: "ionian",
        chords: ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
        notes: ["D", "E", "F#", "G", "A", "B", "C#"],
        signature: { accidental: "#", count: 2 } }));

    it("should parse Ebm", () => validateScale({
        tonic: "Eb", mode: "minor", name: "Ebm", modeAlias: "aeolian",
        notes: ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db"],
        chords: ["Ebm", "Fdim", "Gb", "Abm", "Bbm", "Cb", "Db"],
        signature: { accidental: "b", count: 6 } }));
});

describe("When get note in scale", () => {
    it("should get notes in C#", () => {
        const scale = getScale("C#");
        expect(scale.getNoteInScale("C#").name).toBe("C#");
        expect(scale.getNoteInScale("Db").name).toBe("C#");
        expect(scale.getNoteInScale("Eb").name).toBe("D#");
    });
});

describe("When get chord in scale", () => {
    it("should get chords in C#", () => {
        const scale = getScale("C#");
        expect(scale.getChordInScale(getChord("C#")).name).toBe("C#");
        expect(scale.getChordInScale(getChord("Db")).name).toBe("C#");
        expect(scale.getChordInScale(parseChord("Eb/Bb")).name).toBe("D#/A#");
        // These aren't in the scale, so shouldn't change
        expect(scale.getChordInScale(parseChord("Am/E")).name).toBe("Am/E");
        expect(scale.getChordInScale(getChord("B")).name).toBe("B");
    });
});

describe("When test equality", () => {
    it ("C should be equal to C", () => {
        expect(getScale("C").equals(getScale("C"))).toBeTrue();
    });
    it ("C should not equal G", () => {
        expect(getScale("C").equals(getScale("G"))).toBeFalse();
    });
    it ("C# should be same as Db", () => {
        expect(getScale("C#").isSameAs(getScale("Db"))).toBeTrue();
    });
    it ("C# should not be same as Gb", () => {
        expect(getScale("C#").isSameAs(getScale("Gb"))).toBeFalse();
    });
});