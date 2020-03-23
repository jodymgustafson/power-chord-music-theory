import { MusicScale, parseKey } from "../scales";

function validateScale(scale: MusicScale, expected: any): void {
    expect(scale.tonic).toBe(expected.tonic);
    expect(scale.mode).toBe(expected.mode);
    expect(scale.name).toBe(expected.name);
    expect(scale.signature).toEqual(expected.signature, "signature");
    expect(scale.chords.map(c => c.name)).toEqual(expected.chords, "chords");
    expect(scale.notes.map(c => c.name)).toEqual(expected.notes, "notes");
}

describe("When get scale", () => {
    it("should get scale of C", () => validateScale(new MusicScale("C"), {
        tonic: "C", mode: "ionian", name: "CM",
        notes: ["C", "D", "E", "F", "G", "A", "B"],
        chords: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
        signature: { accidental: "", count: 0 }}));

    it("should get scale of G", () => validateScale(new MusicScale("G"), {
        tonic: "G", mode: "ionian", name: "GM",
        notes: ["G", "A", "B", "C", "D", "E", "F#"],
        chords: ["G", "Am", "Bm", "C", "D", "Em", "F#dim"],
        signature: { accidental: "#", count: 1 }}));

    it("should get scale of DM", () => validateScale(new MusicScale("D", "major"), {
        tonic: "D", mode: "ionian", name: "DM",
        notes: ["D", "E", "F#", "G", "A", "B", "C#"],
        chords: ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
        signature: { accidental: "#", count: 2 }}));

    it("should get scale of Ebm", () => validateScale(new MusicScale("Eb", "minor"), {
        tonic: "Eb", mode: "aeolian", name: "Ebm",
        notes: ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db"],
        chords: ["Ebm", "Fdim", "Gb", "Abm", "Bbm", "Cb", "Db"],
        signature: { accidental: "b", count: 6 }}));

    it("should get scale of F lydian", () => validateScale(new MusicScale("F", "lydian"), {
        tonic: "F", mode: "lydian", name: "F(lyd)",
        notes: ["F", "G", "A", "B", "C", "D", "E"],
        chords: ["F", "G", "Am", "Bdim", "C", "Dm", "Em"],
        signature: { accidental: "", count: 0 }}));

    it("should get scale of F# dorian", () => validateScale(new MusicScale("F#", "dorian"), {
        tonic: "F#", mode: "dorian", name: "F#(dor)",
        notes: ["F#", "G#", "A", "B", "C#", "D#", "E"],
        chords: ["F#m", "G#m", "A", "B", "C#m", "D#dim", "E"],
        signature: { accidental: "#", count: 4 }}));

    it("should get scale of C# lydian", () => validateScale(new MusicScale("C#", "lydian"), {
        tonic: "C#", mode: "lydian", name: "C#(lyd)",
        notes: ["C#", "D#", "E#", "G", "G#", "A#", "B#"],
        chords: ["C#", "D#", "E#m", "Gdim", "G#", "A#m", "B#m"],
        signature: { accidental: "#", count: 6 }}));

    it("should get scale of C# locrian", () => validateScale(new MusicScale("C#", "locrian"), {
        tonic: "C#", mode: "locrian", name: "C#(loc)",
        notes: ["C#", "D", "E", "F#", "G", "A", "B"],
        chords: ["C#dim", "D", "Em", "F#m", "G", "A", "Bm"],
        signature: { accidental: "#", count: 2 }}));

    it("should get scale of Cb lydian", () => validateScale(new MusicScale("Cb", "lydian"), {
        tonic: "Cb", mode: "lydian", name: "Cb(lyd)",
        notes: ["Cb", "Db", "Eb", "F", "Gb", "Ab", "Bb"],
        chords: ["Cb", "Db", "Ebm", "Fdim", "Gb", "Abm", "Bbm"],
        signature: { accidental: "b", count: 6 }}));

    it("should get scale of E# ionian", () => validateScale(new MusicScale("E#", "ionian"), {
        tonic: "E#", mode: "ionian", name: "E#M",
        notes: ["E#", "G", "A", "A#", "B#", "D", "E"],
        chords: ["E#", "Gm", "Am", "A#", "B#", "Dm", "Edim"],
        signature: { accidental: "#", count: 3 }}));
                        
});

describe("When using parseKey", () => {
    it("should parse C", () => validateScale(parseKey("C"), {
        tonic: "C", mode: "ionian", name: "CM",
        chords: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
        notes: ["C", "D", "E", "F", "G", "A", "B"],
        signature: { accidental: "", count: 0 }}));

    it("should parse DM", () => validateScale(parseKey("DM"), {
        tonic: "D", mode: "ionian", name: "DM",
        chords: ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
        notes: ["D", "E", "F#", "G", "A", "B", "C#"],
        signature: { accidental: "#", count: 2 }}));

    it("should parse Ebm", () => validateScale(parseKey("Ebm"), {
        tonic: "Eb", mode: "aeolian", name: "Ebm",
        notes: ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db"],
        chords: ["Ebm", "Fdim", "Gb", "Abm", "Bbm", "Cb", "Db"],
        signature: { accidental: "b", count: 6 }}));
});
