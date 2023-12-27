import { parseScale, getScale } from "../scales";
import { parseChord, getChord } from "../chords";
import { MusicScale } from "../scales/music-scale";

export function validateScale(scale: MusicScale, expected: any): void {
    expect(scale.tonic.name).withContext("tonic").toBe(expected.tonic);
    expect(scale.mode).withContext("mode").toBe(expected.mode);
    expect(scale.modeAlias).withContext("modeAlias").toBe(expected.modeAlias);
    expect(scale.name).withContext("name").toBe(expected.name);
    expect(scale.signature).withContext("signature").toEqual(expected.signature);
    expect(scale.chords.map(c => c.name)).withContext("chords").toEqual(expected.chords);
    expect(scale.notes.map(c => c.name)).withContext("notes").toEqual(expected.notes);
}

describe("When get a diatonic scale", () => {
    it("should get scale of C", () => validateScale(getScale("C"), {
        tonic: "C", mode: "major", name: "CM", modeAlias: "ionian",
        notes: ["C", "D", "E", "F", "G", "A", "B"],
        chords: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
        signature: { accidental: "", count: 0 } }));

    it("should get scale of G", () => validateScale(getScale("G"), {
        tonic: "G", mode: "major", name: "GM", modeAlias: "ionian",
        notes: ["G", "A", "B", "C", "D", "E", "F#"],
        chords: ["G", "Am", "Bm", "C", "D", "Em", "F#dim"],
        signature: { accidental: "#", count: 1 } }));

    it("should get scale of DM", () => validateScale(getScale("D", "major"), {
        tonic: "D", mode: "major", name: "DM", modeAlias: "ionian",
        notes: ["D", "E", "F#", "G", "A", "B", "C#"],
        chords: ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
        signature: { accidental: "#", count: 2 } }));

    it("should get scale of Ebm", () => validateScale(getScale("Eb", "minor"), {
        tonic: "Eb", mode: "minor", name: "Ebm", modeAlias: "aeolian",
        notes: ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db"],
        chords: ["Ebm", "Fdim", "Gb", "Abm", "Bbm", "Cb", "Db"],
        signature: { accidental: "b", count: 6 } }));

    it("should get scale of F major", () => validateScale(getScale("F", "major"), {
        tonic: "F", mode: "major", name: "FM", modeAlias: "ionian",
        notes: ["F", "G", "A", "Bb", "C", "D", "E"],
        chords: ["F", "Gm", "Am", "Bb", "C", "Dm", "Edim"],
        signature: { accidental: "b", count: 1 } }));

    it("should get scale of F lydian", () => validateScale(getScale("F", "lydian"), {
        tonic: "F", mode: "lydian", name: "F(lyd)", modeAlias: "",
        notes: ["F", "G", "A", "B", "C", "D", "E"],
        chords: ["F", "G", "Am", "Bdim", "C", "Dm", "Em"],
        signature: { accidental: "", count: 0 } }));

    it("should get scale of F# dorian", () => validateScale(getScale("F#", "dorian"), {
        tonic: "F#", mode: "dorian", name: "F#(dor)", modeAlias: "",
        notes: ["F#", "G#", "A", "B", "C#", "D#", "E"],
        chords: ["F#m", "G#m", "A", "B", "C#m", "D#dim", "E"],
        signature: { accidental: "#", count: 4 } }));

    it("should get scale of C# lydian", () => validateScale(getScale("C#", "lydian"), {
        tonic: "C#", mode: "lydian", name: "C#(lyd)", modeAlias: "",
        notes: ["C#", "D#", "E#", "G", "G#", "A#", "B#"],
        chords: ["C#", "D#", "E#m", "Gdim", "G#", "A#m", "B#m"],
        signature: { accidental: "#", count: 6 } }));

    it("should get scale of C# locrian", () => validateScale(getScale("C#", "locrian"), {
        tonic: "C#", mode: "locrian", name: "C#(loc)", modeAlias: "",
        notes: ["C#", "D", "E", "F#", "G", "A", "B"],
        chords: ["C#dim", "D", "Em", "F#m", "G", "A", "Bm"],
        signature: { accidental: "#", count: 2 } }));

    it("should get scale of Cb lydian", () => validateScale(getScale("Cb", "lydian"), {
        tonic: "Cb", mode: "lydian", name: "Cb(lyd)", modeAlias: "",
        notes: ["Cb", "Db", "Eb", "F", "Gb", "Ab", "Bb"],
        chords: ["Cb", "Db", "Ebm", "Fdim", "Gb", "Abm", "Bbm"],
        signature: { accidental: "b", count: 6 } }));

    it("should get scale of E# ionian", () => validateScale(getScale("E#", "ionian"), {
        tonic: "E#", mode: "ionian", name: "E#(ion)", modeAlias: "major",
        notes: ["E#", "G", "A", "A#", "B#", "D", "E"],
        chords: ["E#", "Gm", "Am", "A#", "B#", "Dm", "Edim"],
        signature: { accidental: "#", count: 3 } }));
});

describe("When using parseKey", () => {
    it("should parse C", () => validateScale(parseScale("C"), {
        tonic: "C", mode: "major", name: "CM", modeAlias: "ionian",
        chords: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
        notes: ["C", "D", "E", "F", "G", "A", "B"],
        signature: { accidental: "", count: 0 } }));

    it("should parse DM", () => validateScale(parseScale("DM"), {
        tonic: "D", mode: "major", name: "DM", modeAlias: "ionian",
        chords: ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
        notes: ["D", "E", "F#", "G", "A", "B", "C#"],
        signature: { accidental: "#", count: 2 } }));

    it("should parse Ebm", () => validateScale(parseScale("Ebm"), {
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