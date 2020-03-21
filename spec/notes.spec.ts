import { sortNotes, getNoteNames, getNotes, Note } from "../notes";

function validateNote(note: Note, expected: any): void {
    expect(note.name).toBe(expected.name);
    expect(note.alias).toBe(expected.alias);
    expect(note.number).toBe(expected.number);
    expect(note.octave).toBe(expected.octave);

}

describe("When get note by name", () => {
    it("should get note for C", () => validateNote(new Note("C"), { name: "C", alias: "B#", number: 0, octave: 4 }));
    it("should get note for C#", () => validateNote(new Note("C#"), { name: "C#", alias: "Db", number: 1, octave: 4 }));
    it("should get note for Db", () => validateNote(new Note("Db"), { name: "Db", alias: "C#", number: 1, octave: 4 }));
    it("should get note for D", () => validateNote(new Note("D"), { name: "D", alias: "", number: 2, octave: 4 }));
    it("should get note for E, octave 8", () => validateNote(new Note("E", 8), { name: "E", alias: "Fb", number: 4, octave: 8 }));
    it("should get note for Fb", () => validateNote(new Note("Fb"), { name: "Fb", alias: "E", number: 4, octave: 4 }));
});

describe("When get note by number", () => {
    it("should get note for 0", () => expect(new Note(0)).toEqual(new Note("C")));
    it("should get note for 1", () => expect(new Note(1)).toEqual(new Note("C#")));
    it("should get note for 2", () => expect(new Note(2)).toEqual(new Note("D")));
    it("should get note for 3", () => expect(new Note(3)).toEqual(new Note("Eb")));
    it("should get note for 4", () => expect(new Note(4)).toEqual(new Note("E")));
    it("should get note for 5", () => expect(new Note(5)).toEqual(new Note("F")));
    it("should get note for 6", () => expect(new Note(6)).toEqual(new Note("F#")));
    it("should get note for 7", () => expect(new Note(7)).toEqual(new Note("G")));
    it("should get note for 8", () => expect(new Note(8)).toEqual(new Note("Ab")));
    it("should get note for 9", () => expect(new Note(9)).toEqual(new Note("A")));
    it("should get note for 10", () => expect(new Note(10)).toEqual(new Note("Bb")));
    it("should get note for 11", () => expect(new Note(11)).toEqual(new Note("B")));

    it("should get note for 12", () => expect(new Note(12)).toEqual(new Note("C", 5)));
    it("should get note for 20", () => expect(new Note(20)).toEqual(new Note("Ab", 5)));
    it("should get note for 25", () => expect(new Note(25)).toEqual(new Note("C#", 6)));
    it("should get note for -1", () => expect(new Note(-1)).toEqual(new Note("B", 3)));
    it("should get note for -7", () => expect(new Note(-7)).toEqual(new Note("F", 3)));
    it("should get note for -12", () => expect(new Note(-12)).toEqual(new Note("C", 3)));
    it("should get note for -13", () => expect(new Note(-13)).toEqual(new Note("B", 2)));
    it("should get note for -15", () => expect(new Note(-15)).toEqual(new Note("A", 2)));
});

describe("When transpose note", () => {
    it("should get note for C + 3", () => expect(new Note(0).transpose(3)).toEqual(new Note("Eb")));
    it("should get note for C + 13", () => expect(new Note(0).transpose(13)).toEqual(new Note("C#", 5)));
    it("should get note for C + 25", () => expect(new Note(0).transpose(25)).toEqual(new Note("C#", 6)));
    it("should get note for C - 7", () => expect(new Note(0).transpose(-7)).toEqual(new Note("F", 3)));
    it("should get note for C - 12", () => expect(new Note(0).transpose(-12)).toEqual(new Note("C", 3)));
    it("should get note for C - 13", () => expect(new Note(0).transpose(-13)).toEqual(new Note("B", 2)));
    it("should get note for G5 + 3", () => expect(new Note("G", 5).transpose(3)).toEqual(new Note("Bb", 5)));
    it("should get note for G5 + 12", () => expect(new Note("G", 5).transpose(12)).toEqual(new Note("G", 6)));
});

describe("When sort notes", () => {
    const notes = getNotes("G", "E", "C", "A#", "Db");
    it("should sort with no root", () => expect(getNoteNames(sortNotes(notes.slice()))).toEqual(["G", "A#", "C", "Db", "E"]));
    it("should sort with root of A#", () => expect(getNoteNames(sortNotes(notes.slice(), new Note("A#")))).toEqual(["A#", "C", "Db", "E", "G"]));
    it("should sort with root of C", () => expect(getNoteNames(sortNotes(notes.slice(), new Note("C")))).toEqual(["C", "Db", "E", "G", "A#"]));
    it("should sort with root of Db", () => expect(getNoteNames(sortNotes(notes.slice(), new Note("Db")))).toEqual(["Db", "E", "G", "A#", "C"]));
    it("should sort with root of E", () => expect(getNoteNames(sortNotes(notes.slice(), new Note("E")))).toEqual(["E", "G", "A#", "C", "Db"]));
});
