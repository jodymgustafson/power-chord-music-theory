import { getDefaultTuningUkuleleLookup } from "../guitar/ukulele-default-tuning";

describe("When use ukulele lookup", () => {
    const lookup = getDefaultTuningUkuleleLookup();

    describe("When get note number", () => {
        it("string 3, fret 0", () => expect(lookup.getNote(3, 0).name).toBe("G"));
        it("string 2, fret 0", () => expect(lookup.getNote(2, 0).name).toBe("C"));
        it("string 1, fret 0", () => expect(lookup.getNote(1, 0).name).toBe("E"));
        it("string 0, fret 0", () => expect(lookup.getNote(0, 0).name).toBe("A"));

        it("string 3, fret 5", () => expect(lookup.getNote(3, 5).name).toBe("C"));
        it("string 2, fret 5", () => expect(lookup.getNote(2, 5).name).toBe("F"));
        it("string 1, fret 5", () => expect(lookup.getNote(1, 5).name).toBe("A"));
        it("string 0, fret 5", () => expect(lookup.getNote(0, 5).name).toBe("D"));
    });

    describe("When getChordTab", () => {
        it("should get tab for C", () => expect(lookup.getChordTab("C", "M", 0)).toEqual([0, 0, 0, 3]));
        it("should get tab for C-1", () => expect(lookup.getChordTab("C", "M", 1)).toEqual([5, 4, 3, 3]));
        it("should get tab for C-2", () => expect(lookup.getChordTab("C", "M", 2)).toEqual([5, 7, 8, 7]));
        it("should get tab for C-3", () => expect(lookup.getChordTab("C", "", 3)).toEqual([9, 7, 8, 7]));
        it("should get tab for C#m", () => expect(lookup.getChordTab("C#", "m", 0)).toEqual([1, 4, 4, 4]));
        it("should get tab for D7", () => expect(lookup.getChordTab("D", "7", 0)).toEqual([2, 2, 2, 3]));
        it("should get tab for EbM7", () => expect(lookup.getChordTab("Eb", "M7", 0)).toEqual([3, 3, 3, 5]));
        it("should get tab for Ebm", () => expect(lookup.getChordTab("Eb", "m", 0)).toEqual([3, 3, 2, 1]));
        it("should get undefined when invalid", () => expect(lookup.getChordTab("C", "M", 23)).toBeUndefined());
    });

    describe("When getChordTabs", () => {
        const tabs = lookup.getChordTabs("C", "");
        it("should get tab for C", () => expect(tabs[0]).toEqual([0, 0, 0, 3]));
        it("should get tab for C-1", () => expect(tabs[1]).toEqual([5, 4, 3, 3]));
        it("should get tab for C-2", () => expect(tabs[2]).toEqual([5, 7, 8, 7]));

        it("should get tab for C#dim", () => expect(lookup.getChordTabs("C#", "dim")[0]).toEqual([9, 7, 9, 7]));
        it("should get tab for Ebsus4", () => expect(lookup.getChordTabs("Eb", "sus4")[0]).toEqual([8, 10, 11, 11]));
    });

    describe("When getChordVariationCount", () => {
        it("should get count for C major", () => expect(lookup.getChordVariationCount("C", "M")).toBe(5));
        it("should get count for C minor", () => expect(lookup.getChordVariationCount("C", "m")).toBe(6));
        it("should get count for C 7th", () => expect(lookup.getChordVariationCount("C", "7")).toBe(4));
        it("should get count for C M7", () => expect(lookup.getChordVariationCount("C", "M7")).toBe(4));
        it("should get count for C m7", () => expect(lookup.getChordVariationCount("C", "m7")).toBe(4));
        it("should get count for C dim", () => expect(lookup.getChordVariationCount("C", "dim")).toBe(1));
        it("should get count for C sus4", () => expect(lookup.getChordVariationCount("C", "sus4")).toBe(1));
        it("should get 0 for invalid", () => expect(lookup.getChordVariationCount("A", "aug")).toBe(0));
    });

    describe("When get notes from tab", () => {
        it("should get C chord", () => {
            const notes = lookup.getNotes(lookup.getChordTab("C", "M", 0)).map(n => n?.toString());
            expect(notes).toEqual(["G4", "C4", "E4", "C5"]);
        });
        it("should get D7 chord", () => {
            const notes = lookup.getNotes(lookup.getChordTab("D", "7", 0)).map(n => n?.toString());
            expect(notes).toEqual(["A4", "D4", "F#4", "C5"]);
        });
        it("should get Em chord", () => {
            const notes = lookup.getNotes(lookup.getChordTab("E", "m", 0)).map(n => n?.toString());
            expect(notes).toEqual(["G4", "E4", "G4", "B4"]);
        });
    });

    describe("When get chord from tab", () => {
        it("should get C chord", () => expect(lookup.getChordFromTab([0, 0, 0, 3]).name).toEqual("C/G"));
        it("should get Dm chord", () => expect(lookup.getChordFromTab([2, 2, 1, 0]).name).toEqual("Dm/A"));
        it("should get E7 chord", () => expect(lookup.getChordFromTab([4, 4, 4, 5]).name).toEqual("E7/B"));
    });
});
