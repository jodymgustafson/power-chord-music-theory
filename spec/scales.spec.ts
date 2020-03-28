import { MusicScale, parseScale } from "../scales";
import { Chord, parseChord, getChord } from "../chords";

function validateScale(scale: MusicScale, expected: any): void {
    expect(scale.tonic).toBe(expected.tonic);
    expect(scale.mode).toBe(expected.mode);
    expect(scale.modeAlias).toBe(expected.modeAlias);
    expect(scale.name).toBe(expected.name);
    expect(scale.signature).toEqual(expected.signature, "signature");
    expect(scale.chords.map(c => c.name)).toEqual(expected.chords, "chords");
    expect(scale.notes.map(c => c.name)).toEqual(expected.notes, "notes");
}

describe("When get scale", () => {
    it("should get scale of C", () => validateScale(new MusicScale("C"), {
        tonic: "C", mode: "ionian", name: "CM", modeAlias: "major",
        notes: ["C", "D", "E", "F", "G", "A", "B"],
        chords: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
        signature: { accidental: "", count: 0 }}));

    it("should get scale of G", () => validateScale(new MusicScale("G"), {
        tonic: "G", mode: "ionian", name: "GM", modeAlias: "major",
        notes: ["G", "A", "B", "C", "D", "E", "F#"],
        chords: ["G", "Am", "Bm", "C", "D", "Em", "F#dim"],
        signature: { accidental: "#", count: 1 }}));

    it("should get scale of DM", () => validateScale(new MusicScale("D", "major"), {
        tonic: "D", mode: "ionian", name: "DM", modeAlias: "major",
        notes: ["D", "E", "F#", "G", "A", "B", "C#"],
        chords: ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
        signature: { accidental: "#", count: 2 }}));

    it("should get scale of Ebm", () => validateScale(new MusicScale("Eb", "minor"), {
        tonic: "Eb", mode: "aeolian", name: "Ebm", modeAlias: "minor",
        notes: ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db"],
        chords: ["Ebm", "Fdim", "Gb", "Abm", "Bbm", "Cb", "Db"],
        signature: { accidental: "b", count: 6 }}));

    it("should get scale of F major", () => validateScale(new MusicScale("F", "major"), {
        tonic: "F", mode: "ionian", name: "FM", modeAlias: "major",
        notes: ["F", "G", "A", "Bb", "C", "D", "E"],
        chords: ["F", "Gm", "Am", "Bb", "C", "Dm", "Edim"],
        signature: { accidental: "b", count: 1 }}));

    it("should get scale of F lydian", () => validateScale(new MusicScale("F", "lydian"), {
        tonic: "F", mode: "lydian", name: "F(lyd)", modeAlias: "",
        notes: ["F", "G", "A", "B", "C", "D", "E"],
        chords: ["F", "G", "Am", "Bdim", "C", "Dm", "Em"],
        signature: { accidental: "", count: 0 }}));

    it("should get scale of F# dorian", () => validateScale(new MusicScale("F#", "dorian"), {
        tonic: "F#", mode: "dorian", name: "F#(dor)", modeAlias: "",
        notes: ["F#", "G#", "A", "B", "C#", "D#", "E"],
        chords: ["F#m", "G#m", "A", "B", "C#m", "D#dim", "E"],
        signature: { accidental: "#", count: 4 }}));

    it("should get scale of C# lydian", () => validateScale(new MusicScale("C#", "lydian"), {
        tonic: "C#", mode: "lydian", name: "C#(lyd)", modeAlias: "",
        notes: ["C#", "D#", "E#", "G", "G#", "A#", "B#"],
        chords: ["C#", "D#", "E#m", "Gdim", "G#", "A#m", "B#m"],
        signature: { accidental: "#", count: 6 }}));

    it("should get scale of C# locrian", () => validateScale(new MusicScale("C#", "locrian"), {
        tonic: "C#", mode: "locrian", name: "C#(loc)", modeAlias: "",
        notes: ["C#", "D", "E", "F#", "G", "A", "B"],
        chords: ["C#dim", "D", "Em", "F#m", "G", "A", "Bm"],
        signature: { accidental: "#", count: 2 }}));

    it("should get scale of Cb lydian", () => validateScale(new MusicScale("Cb", "lydian"), {
        tonic: "Cb", mode: "lydian", name: "Cb(lyd)", modeAlias: "",
        notes: ["Cb", "Db", "Eb", "F", "Gb", "Ab", "Bb"],
        chords: ["Cb", "Db", "Ebm", "Fdim", "Gb", "Abm", "Bbm"],
        signature: { accidental: "b", count: 6 }}));

    it("should get scale of E# ionian", () => validateScale(new MusicScale("E#", "ionian"), {
        tonic: "E#", mode: "ionian", name: "E#M", modeAlias: "major",
        notes: ["E#", "G", "A", "A#", "B#", "D", "E"],
        chords: ["E#", "Gm", "Am", "A#", "B#", "Dm", "Edim"],
        signature: { accidental: "#", count: 3 }}));
                        
});

describe("When using parseKey", () => {
    it("should parse C", () => validateScale(parseScale("C"), {
        tonic: "C", mode: "ionian", name: "CM", modeAlias: "major",
        chords: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
        notes: ["C", "D", "E", "F", "G", "A", "B"],
        signature: { accidental: "", count: 0 }}));

    it("should parse DM", () => validateScale(parseScale("DM"), {
        tonic: "D", mode: "ionian", name: "DM", modeAlias: "major",
        chords: ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
        notes: ["D", "E", "F#", "G", "A", "B", "C#"],
        signature: { accidental: "#", count: 2 }}));

    it("should parse Ebm", () => validateScale(parseScale("Ebm"), {
        tonic: "Eb", mode: "aeolian", name: "Ebm", modeAlias: "minor",
        notes: ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db"],
        chords: ["Ebm", "Fdim", "Gb", "Abm", "Bbm", "Cb", "Db"],
        signature: { accidental: "b", count: 6 }}));
});

describe("When get note in scale", () => {
    it("should get notes in C#", () => {
        const scale = new MusicScale("C#");
        expect(scale.getNoteInScale("C#").name).toBe("C#");
        expect(scale.getNoteInScale("Db").name).toBe("C#");
        expect(scale.getNoteInScale("Eb").name).toBe("D#");
    });
});

describe("When get chord in scale", () => {
    it("should get chords in C#", () => {
        const scale = new MusicScale("C#");
        expect(scale.getChordInScale(getChord("C#")).name).toBe("C#");
        expect(scale.getChordInScale(getChord("Db")).name).toBe("C#");
        expect(scale.getChordInScale(parseChord("Eb/Bb")).name).toBe("D#/A#");
        // These aren't in the scale, so shouldn't change
        expect(scale.getChordInScale(parseChord("Am/E")).name).toBe("Am/E");
        expect(scale.getChordInScale(getChord("B")).name).toBe("B");
    });
});