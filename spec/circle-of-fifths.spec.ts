import { getDegreeRomanNumeral, getFifths } from "../circle-of-fifths"

describe("When get degree roman numeral", () => {
    it("should get degree for 1 major", () => expect(getDegreeRomanNumeral(1, "M")).toBe("I"));
    it("should get degree for 2 major", () => expect(getDegreeRomanNumeral(2, "M")).toBe("II"));
    it("should get degree for 3 major", () => expect(getDegreeRomanNumeral(3, "M")).toBe("III"));
    it("should get degree for 4 major", () => expect(getDegreeRomanNumeral(4, "M")).toBe("IV"));
    it("should get degree for 5 major", () => expect(getDegreeRomanNumeral(5, "M")).toBe("V"));
});

describe("When get fifths for CM", () => {
    const fifths = getFifths("C", "M");
    it("should get F", () => expect(fifths[0]).toEqual({
        note: "F",
        position: -1,
        quality: "M",
        degreeNumber: 4,
        degreeName: "Subdominant",
        degreeRoman: "IV"
    }));
    it("should get C", () => expect(fifths[1]).toEqual({
        note: "C",
        position: 0,
        quality: "M",
        degreeNumber: 1,
        degreeName: "Tonic",
        degreeRoman: "I"
    }));
    it("should get G", () => expect(fifths[2]).toEqual({
        note: "G",
        position: 1,
        quality: "M",
        degreeNumber: 5,
        degreeName: "Dominant",
        degreeRoman: "V"
    }));
    it("should get Dm", () => expect(fifths[3]).toEqual({
        note: "D",
        position: 2,
        quality: "m",
        degreeNumber: 2,
        degreeName: "Supertonic",
        degreeRoman: "ii"
    }));
    it("should get Am", () => expect(fifths[4]).toEqual({
        note: "A",
        position: 3,
        quality: "m",
        degreeNumber: 6,
        degreeName: "Submediant",
        degreeRoman: "vi"
    }));
    it("should get Em", () => expect(fifths[5]).toEqual({
        note: "E",
        position: 4,
        quality: "m",
        degreeNumber: 3,
        degreeName: "Mediant",
        degreeRoman: "iii"
    }));
    it("should get Bdim", () => expect(fifths[6]).toEqual({
        note: "B",
        position: 5,
        quality: "d",
        degreeNumber: 7,
        degreeName: "Leading Tone",
        degreeRoman: "vii°"
    }));
});

describe("When get fifths for Gm", () => {
    const fifths = getFifths("E", "minor");
    it("should get C", () => expect(fifths[0]).toEqual({
        note: "C",
        position: 0,
        quality: "M",
        degreeNumber: 6,
        degreeName: "Submediant",
        degreeRoman: "VI"
    }));
    it("should get G", () => expect(fifths[1]).toEqual({
        note: "G",
        position: 1,
        quality: "M",
        degreeNumber: 3,
        degreeName: "Mediant",
        degreeRoman: "III"
    }));
    it("should get D", () => expect(fifths[2]).toEqual({
        note: "D",
        position: 2,
        quality: "M",
        degreeNumber: 7,
        degreeName: "Leading Tone",
        degreeRoman: "VII"
    }));
    it("should get Am", () => expect(fifths[3]).toEqual({
        note: "A",
        position: 3,
        quality: "m",
        degreeNumber: 4,
        degreeName: "Subdominant",
        degreeRoman: "iv"
    }));
    it("should get Em", () => expect(fifths[4]).toEqual({
        note: "E",
        position: 4,
        quality: "m",
        degreeNumber: 1,
        degreeName: "Tonic",
        degreeRoman: "i"
    }));
    it("should get Bm", () => expect(fifths[5]).toEqual({
        note: "B",
        position: 5,
        quality: "m",
        degreeNumber: 5,
        degreeName: "Dominant",
        degreeRoman: "v"
    }));
    it("should get F#dim", () => expect(fifths[6]).toEqual({
        note: "F#",
        position: 6,
        quality: "d",
        degreeNumber: 2,
        degreeName: "Supertonic",
        degreeRoman: "ii°"
    }));
});
