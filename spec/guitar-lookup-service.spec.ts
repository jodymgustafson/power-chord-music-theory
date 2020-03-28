import { getDefaultTuningGuitarLookup } from "../guitar/default-tuning";

const lookup = getDefaultTuningGuitarLookup();

describe("When get note number", () => {
    it("string 5, fret 0", () => expect(lookup.getNote(5, 0).number).toBe(4));
    it("string 4, fret 0", () => expect(lookup.getNote(4, 0).number).toBe(9));
    it("string 3, fret 0", () => expect(lookup.getNote(3, 0).number).toBe(2));
    it("string 2, fret 0", () => expect(lookup.getNote(2, 0).number).toBe(7));
    it("string 1, fret 0", () => expect(lookup.getNote(1, 0).number).toBe(11));
    it("string 0, fret 0", () => expect(lookup.getNote(0, 0).number).toBe(4));

    it("string 5, fret 5", () => expect(lookup.getNote(5, 5).number).toBe(9));
    it("string 4, fret 5", () => expect(lookup.getNote(4, 5).number).toBe(2));
    it("string 3, fret 5", () => expect(lookup.getNote(3, 5).number).toBe(7));
    it("string 2, fret 5", () => expect(lookup.getNote(2, 5).number).toBe(0));
    it("string 1, fret 5", () => expect(lookup.getNote(1, 5).number).toBe(4));
    it("string 0, fret 5", () => expect(lookup.getNote(0, 5).number).toBe(9));
});

describe("When getChordTab", () => {
    it("should get tab for C", () => expect(lookup.getChordTab("C", "M", 0)).toEqual([-1, 3, 2, 0, 1, 0]));
    it("should get tab for C-1", () => expect(lookup.getChordTab("C", "M", 1)).toEqual([-1, 3, 5, 5, 5, 3]));
    it("should get tab for C-2", () => expect(lookup.getChordTab("C", "M", 2)).toEqual([8, 10, 10, 9, 8, 8]));
    //it("should get tab for C-3", () => expect(lookup.getChordTab("C", "", 3)).toEqual([-1, -1, 10, 9, 8, 8]));
    it("should get tab for C#m", () => expect(lookup.getChordTab("C#", "m", 0)).toEqual([-1, 4, 2, 1, 2, -1]));
    it("should get tab for D7", () => expect(lookup.getChordTab("D", "7", 0)).toEqual([-1, -1, 0, 2, 1, 2]));
    it("should get tab for EbM7", () => expect(lookup.getChordTab("Eb", "M7", 0)).toEqual([-1, 6, 5, 3, 3, 3]));
    it("should get tab for Ebm", () => expect(lookup.getChordTab("Eb", "m", 0)).toEqual([-1, -1, 1, 3, 4, 2]));
    it("should get undefined when invalid", () => expect(lookup.getChordTab("C", "M", 23)).toBeUndefined());
});

describe("When getChordTabs", () => {
    let tabs = lookup.getChordTabs("C", "");
    it("should get tab for C", () => expect(tabs[0]).toEqual([-1, 3, 2, 0, 1, 0]));
    it("should get tab for C-1", () => expect(tabs[1]).toEqual([-1, 3, 5, 5, 5, 3]));
    it("should get tab for C-2", () => expect(tabs[2]).toEqual([8, 10, 10, 9, 8, 8]));
    //it("should get tab for C-2", () => expect(tabs[2]).toEqual([-1, -1, 10, 9, 8, 8]));

    it("should get tab for C#dim", () => expect(lookup.getChordTabs("C#", "dim")[0]).toEqual([-1, 4, 5, 6, 5, -1]));
    it("should get tab for Ebsus4", () => expect(lookup.getChordTabs("Eb", "sus4")[0]).toEqual([-1, 6, 6, 3, 4, -1]));
});

describe("When getChordVariationCount", () => {
    it("should get count for C major", () => expect(lookup.getChordVariationCount("C", "M")).toBe(3));
    it("should get count for C minor", () => expect(lookup.getChordVariationCount("C", "m")).toBe(3));
    it("should get count for C 7th", () => expect(lookup.getChordVariationCount("C", "7")).toBe(4));
    it("should get count for C M7", () => expect(lookup.getChordVariationCount("C", "M7")).toBe(3));
    it("should get count for C m7", () => expect(lookup.getChordVariationCount("C", "m7")).toBe(3));
    it("should get count for C dim", () => expect(lookup.getChordVariationCount("C", "dim")).toBe(1));
    it("should get count for C sus4", () => expect(lookup.getChordVariationCount("C", "sus4")).toBe(1));
    it("should get 0 for invalid", () => expect(lookup.getChordVariationCount("A", "aug")).toBe(0));
});
