import { NoteName } from "..";
import Note, { sortNotes, getNoteNames, getNotes, getNote, deserializeNote } from "../notes";

describe("When get note by name", () => {
    it("should get note for C", () => validateNote(getNote("C"), { name: "C", alias: "B#", number: 0, octave: 4 }));
    it("should get note for C#", () => validateNote(getNote("C#"), { name: "C#", alias: "Db", number: 1, octave: 4 }));
    it("should get note for Db", () => validateNote(getNote("Db"), { name: "Db", alias: "C#", number: 1, octave: 4 }));
    it("should get note for D", () => validateNote(getNote("D"), { name: "D", alias: "", number: 2, octave: 4 }));
    it("should get note for E, octave 8", () => validateNote(getNote("E", 8), { name: "E", alias: "Fb", number: 4, octave: 8 }));
    it("should get note for Fb", () => validateNote(getNote("Fb"), { name: "Fb", alias: "E", number: 4, octave: 4 }));
});

describe("When get note by number", () => {
    it("should get note for 0", () => expect(getNote(0)).toEqual(getNote("C")));
    it("should get note for 1", () => expect(getNote(1)).toEqual(getNote("C#")));
    it("should get note for 2", () => expect(getNote(2)).toEqual(getNote("D")));
    it("should get note for 3", () => expect(getNote(3)).toEqual(getNote("Eb")));
    it("should get note for 4", () => expect(getNote(4)).toEqual(getNote("E")));
    it("should get note for 5", () => expect(getNote(5)).toEqual(getNote("F")));
    it("should get note for 6", () => expect(getNote(6)).toEqual(getNote("F#")));
    it("should get note for 7", () => expect(getNote(7)).toEqual(getNote("G")));
    it("should get note for 8", () => expect(getNote(8)).toEqual(getNote("Ab")));
    it("should get note for 9", () => expect(getNote(9)).toEqual(getNote("A")));
    it("should get note for 10", () => expect(getNote(10)).toEqual(getNote("Bb")));
    it("should get note for 11", () => expect(getNote(11)).toEqual(getNote("B")));

    it("should get note for 12", () => expect(getNote(12)).toEqual(getNote("C", 5)));
    it("should get note for 20", () => expect(getNote(20)).toEqual(getNote("Ab", 5)));
    it("should get note for 25", () => expect(getNote(25)).toEqual(getNote("C#", 6)));
    it("should get note for -1", () => expect(getNote(-1)).toEqual(getNote("B", 3)));
    it("should get note for -7", () => expect(getNote(-7)).toEqual(getNote("F", 3)));
    it("should get note for -12", () => expect(getNote(-12)).toEqual(getNote("C", 3)));
    it("should get note for -13", () => expect(getNote(-13)).toEqual(getNote("B", 2)));
    it("should get note for -15", () => expect(getNote(-15)).toEqual(getNote("A", 2)));
});

describe("When transpose note", () => {
    it("should get note for C + 3", () => expect(getNote(0).transpose(3)).toEqual(getNote("Eb")));
    it("should get note for C + 13", () => expect(getNote(0).transpose(13)).toEqual(getNote("C#", 5)));
    it("should get note for C + 25", () => expect(getNote(0).transpose(25)).toEqual(getNote("C#", 6)));
    it("should get note for C - 7", () => expect(getNote(0).transpose(-7)).toEqual(getNote("F", 3)));
    it("should get note for C - 12", () => expect(getNote(0).transpose(-12)).toEqual(getNote("C", 3)));
    it("should get note for C - 13", () => expect(getNote(0).transpose(-13)).toEqual(getNote("B", 2)));
    it("should get note for G5 + 3", () => expect(getNote("G", 5).transpose(3)).toEqual(getNote("Bb", 5)));
    it("should get note for G5 + 12", () => expect(getNote("G", 5).transpose(12)).toEqual(getNote("G", 6)));
});

describe("When sort notes", () => {
    const notes = getNotes("G", "E", "C", "A#", "Db");
    it("should sort with no root", () => expect(getNoteNames(sortNotes(notes.slice()))).toEqual(["G", "A#", "C", "Db", "E"]));
    it("should sort with root of A#", () => expect(getNoteNames(sortNotes(notes.slice(), getNote("A#")))).toEqual(["A#", "C", "Db", "E", "G"]));
    it("should sort with root of C", () => expect(getNoteNames(sortNotes(notes.slice(), getNote("C")))).toEqual(["C", "Db", "E", "G", "A#"]));
    it("should sort with root of Db", () => expect(getNoteNames(sortNotes(notes.slice(), getNote("Db")))).toEqual(["Db", "E", "G", "A#", "C"]));
    it("should sort with root of E", () => expect(getNoteNames(sortNotes(notes.slice(), getNote("E")))).toEqual(["E", "G", "A#", "C", "Db"]));
});

describe("When get computed note values", () => {
    it("should get values for A0", () => validateComputedValues("A", 0, 21, 1, ""));
    it("should get values for C1", () => validateComputedValues("C", 1, 24, 4, ""));
    it("should get values for D#2", () => validateComputedValues("D#", 2, 39, 19, "#"));
    it("should get values for Eb3", () => validateComputedValues("Eb", 3, 51, 31, "b"));
    it("should get values for A4", () => validateComputedValues("A", 4, 69, 49, ""));
});

describe("When deserizlize a note", () => {
    const note = deserializeNote(JSON.stringify(getNote("D#", 5)));
    it("should deserialize to D#5", () => {
        validateNote(note, { name: "D#", alias: "Eb", number: 3, octave: 5 });
        expect(note.midiNumber).toBe(75);
        expect(note.keyNumber).toBe(55);
        expect(note.accidental).toEqual("#");
        expect(note.hasAccidental).toEqual(true);
    });
});

function validateNote(note: Note, expected: any): void {
    expect(note.name).toBe(expected.name);
    expect(note.alias ? note.alias.name : "").toBe(expected.alias);
    expect(note.number).toBe(expected.number);
    expect(note.octave).toBe(expected.octave);
}

function validateComputedValues(name: NoteName, octave: number, midi: number, key: number, accidental: string): void {
    const note = getNote(name, octave);
    expect(note.midiNumber).toBe(midi);
    expect(note.keyNumber).toBe(key);
    expect(note.accidental).toEqual(accidental);
    expect(note.hasAccidental).toEqual(accidental !== "");
}