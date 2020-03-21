import { Key, parseKey } from "../keys";
import { Note } from "../notes";

function validateKey(key: Key, expected: any): void {
    expect(key.tonic).toBe(expected.tonic);
    expect(key.mode).toBe(expected.mode);
    expect(key.name).toBe(expected.name);
    expect(key.chords.map(c => c.name)).toEqual(expected.chords, "chords");
    expect(key.notes.map(c => c.name)).toEqual(expected.notes, "notes");
    expect(key.signature).toEqual(expected.signature, "signature");
}

describe("When get key using new", () => {
    it("should get key of C", () => validateKey(new Key("C"), {
        tonic: "C", mode: "major", name: "CM",
        chords: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
        notes: ["C", "D", "E", "F", "G", "A", "B"],
        signature: { accidental: "#", count: 0 }}));

    it("should get key of DM", () => validateKey(new Key("D", "major"), {
        tonic: "D", mode: "major", name: "DM",
        chords: ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
        notes: ["D", "E", "F#", "G", "A", "B", "C#"],
        signature: { accidental: "#", count: 2 }}));

    it("should get key of Ebm using new", () => validateKey(new Key("Eb", "minor"), {
        tonic: "Eb", mode: "minor", name: "Ebm",
        chords: ["Ebm", "Fdim", "Gb", "Abm", "Bbm", "B", "Db"],
        notes: ["Eb", "F", "Gb", "Ab", "Bb", "B", "Db"],
        signature: { accidental: "b", count: 6 }}));
});

describe("When get key using parseKey", () => {
    it("should get key of C", () => validateKey(parseKey("C"), {
        tonic: "C", mode: "major", name: "CM",
        chords: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
        notes: ["C", "D", "E", "F", "G", "A", "B"],
        signature: { accidental: "#", count: 0 }}));

    it("should get key of DM", () => validateKey(parseKey("DM"), {
        tonic: "D", mode: "major", name: "DM",
        chords: ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
        notes: ["D", "E", "F#", "G", "A", "B", "C#"],
        signature: { accidental: "#", count: 2 }}));

    it("should get key of Ebm using parse", () => validateKey(parseKey("Ebm"), {
        tonic: "Eb", mode: "minor", name: "Ebm",
        chords: ["Ebm", "Fdim", "Gb", "Abm", "Bbm", "B", "Db"],
        notes: ["Eb", "F", "Gb", "Ab", "Bb", "B", "Db"],
        signature: { accidental: "b", count: 6 }}));
});

describe("When get note in key", () => {
    it("should get D in C", () => expect(new Key("C").getNoteInKey("D")).toEqual(new Note("D")));
    it("should get Eb in C minor", () => expect(parseKey("Cm").getNoteInKey("D#")).toEqual(new Note("Eb")));
});

describe("When get chords in key", () => {
    it("should get chords in C", () => {
        const chords = new Key("C").chords;
        expect(chords.length).toBe(7);
        expect(chords.map(c => c.name)).toEqual(["C", "Dm", "Em", "F", "G", "Am", "Bdim"]);
    });
    it("should get chords in Am", () => {
        const chords = parseKey("Am").chords;
        expect(chords.length).toBe(7);
        expect(chords.map(c => c.name)).toEqual(["Am", "Bdim", "C", "Dm", "Em", "F", "G"]);
    });
    it("should get chords in C# minor", () => {
        const chords = parseKey("C#m").chords;
        expect(chords.length).toBe(7);
        expect(chords.map(c => c.name)).toEqual(["C#m", "D#dim", "E", "F#m", "G#m", "A", "B"]);
    });
    it("should get chords in Ab major", () => {
        const chords = parseKey("AbM").chords;
        expect(chords.length).toBe(7);
        expect(chords.map(c => c.name)).toEqual(["Ab", "Bbm", "Cm", "Db", "Eb", "Fm", "Gdim"]);
    });
});
