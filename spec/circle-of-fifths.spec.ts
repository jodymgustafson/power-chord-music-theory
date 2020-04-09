import { FifthInfo, getCircleOfFifths } from "../circle-of-fifths";
import { getScale } from "../scales";

function validateFifth(fifth: FifthInfo, expected: any): void {
    expect(fifth.note.name).toBe(expected.note);
    expect(fifth.position).toBe(expected.position);
    expect(fifth.quality).toBe(expected.quality);
    expect(fifth.degreeName).toBe(expected.degreeName);
    expect(fifth.degreeNumber).toBe(expected.degreeNumber);
    expect(fifth.degreeRoman).toBe(expected.degreeRoman);
}

describe("When get fifths for CM", () => {
    const cof = getCircleOfFifths(getScale("C", "major"));
    const fifths = cof.fifths;
    it("should get notes in fifth order", () => {
        expect(fifths.map(f => f.note.name)).toEqual(["F", "C", "G", "D", "A", "E", "B"]);
    });
    it("should get notes in natural order", () => {
        expect(cof.orderedFifths.map(f => f.note.name)).toEqual(["C", "D", "E", "F", "G", "A", "B"]);
    });

    it("should get F", () => validateFifth(fifths[0], {
        note: "F", position: -1, quality: "M", degreeNumber: 4, degreeName: "Subdominant", degreeRoman: "IV"
    }));
    it("should get C", () => validateFifth(fifths[1], {
        note: "C", position: 0, quality: "M", degreeNumber: 1, degreeName: "Tonic", degreeRoman: "I"
    }));
    it("should get G", () => validateFifth(fifths[2], {
        note: "G", position: 1, quality: "M", degreeNumber: 5, degreeName: "Dominant", degreeRoman: "V"
    }));
    it("should get Dm", () => validateFifth(fifths[3], {
        note: "D", position: 2, quality: "m", degreeNumber: 2, degreeName: "Supertonic", degreeRoman: "ii"
    }));
    it("should get Am", () => validateFifth(fifths[4], {
        note: "A", position: 3, quality: "m", degreeNumber: 6, degreeName: "Submediant", degreeRoman: "vi"
    }));
    it("should get Em", () => validateFifth(fifths[5], {
        note: "E", position: 4, quality: "m", degreeNumber: 3, degreeName: "Mediant", degreeRoman: "iii"
    }));
    it("should get Bdim", () => validateFifth(fifths[6], {
        note: "B", position: 5, quality: "d", degreeNumber: 7, degreeName: "Leading Tone", degreeRoman: "vii°"
    }));
});

describe("When get fifths for Gm", () => {
    const cof = getCircleOfFifths(getScale("G", "minor"));
    const fifths = cof.fifths;
    it("should get notes in fifth order", () => {
        expect(fifths.map(f => f.note.name)).toEqual(["Eb", "Bb", "F", "C", "G", "D", "A"]);
    });
    it("should get notes in natural order", () => {
        expect(cof.orderedFifths.map(f => f.note.name)).toEqual(["G", "A", "Bb", "C", "D", "Eb", "F"]);
    });

    it("should get Eb", () => validateFifth(fifths[0], {
        note: "Eb", position: -3, quality: "M", degreeNumber: 6, degreeName: "Submediant", degreeRoman: "VI"
    }));
    it("should get Bb", () => validateFifth(fifths[1], {
        note: "Bb", position: -2, quality: "M", degreeNumber: 3, degreeName: "Mediant", degreeRoman: "III"
    }));
    it("should get F", () => validateFifth(fifths[2], {
        note: "F", position: -1, quality: "M", degreeNumber: 7, degreeName: "Subtonic", degreeRoman: "VII"
    }));
    it("should get Cm", () => validateFifth(fifths[3], {
        note: "C", position: 0, quality: "m", degreeNumber: 4, degreeName: "Subdominant", degreeRoman: "iv"
    }));
    it("should get Gm", () => validateFifth(fifths[4], {
        note: "G", position: 1, quality: "m", degreeNumber: 1, degreeName: "Tonic", degreeRoman: "i"
    }));
    it("should get Dm", () => validateFifth(fifths[5], {
        note: "D", position: 2, quality: "m", degreeNumber: 5, degreeName: "Dominant", degreeRoman: "v"
    }));
    it("should get Adim", () => validateFifth(fifths[6], {
        note: "A", position: 3, quality: "d", degreeNumber: 2, degreeName: "Supertonic", degreeRoman: "ii°"
    }));
});

describe("When get fifths for C#M", () => {
    const cof = getCircleOfFifths(getScale("C#", "major"));
    const fifths = cof.fifths;
    it("should get notes in fifth order", () => {
        expect(fifths.map(f => f.note.name)).toEqual(["F#", "C#", "G#", "D#", "A#", "E#", "B#"]);
    });
    it("should get notes in natural order", () => {
        expect(cof.orderedFifths.map(f => f.note.name)).toEqual(["C#", "D#", "E#", "F#", "G#", "A#", "B#"]);
    });

});
