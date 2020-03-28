import { getChordProgressionCalculator } from "../chord-progression-calculator";
import { parseChord, getChord } from "../chords";
import { parseScale } from "../scales";

describe("When get chord progressions in GM", () => {
    const calc = getChordProgressionCalculator(parseScale("G"));
    it("should get root chords in GM", () => {
        expect(calc.rootChord().name).toBe("G");
    });
    it("should get chords in GM", () => {
        expect(calc.getChordAt(0).name).toBe("G");
        expect(calc.getChordAt(1).name).toBe("Am");
        expect(calc.getChordAt(2).name).toBe("Bm");
        expect(calc.getChordAt(3).name).toBe("C");
        expect(calc.getChordAt(4).name).toBe("D");
        expect(calc.getChordAt(5).name).toBe("Em");
        expect(calc.getChordAt(6).name).toBe("F#dim");
    });
    it("should get chords after G", () => {
        expect(calc.getNextChords(getChord("G")).map(c => c.name)).toEqual(["G", "Am", "Bm", "C", "D", "Em", "F#dim"]);
    });
    it("should get chords after Am", () => {
        expect(calc.getNextChords(parseChord("Am")).map(c => c.name)).toEqual(["G", "Am", "D", "F#dim"]);
    });
    it("should get chords after Bm", () => {
        expect(calc.getNextChords(parseChord("Bm")).map(c => c.name)).toEqual(["G", "Bm", "C", "Em"]);
    });
    it("should get chords after C", () => {
        expect(calc.getNextChords(parseChord("C")).map(c => c.name)).toEqual(["G", "Am", "C", "D", "F#dim"]);
    });
    it("should get chords after D", () => {
        expect(calc.getNextChords(parseChord("D")).map(c => c.name)).toEqual(["G", "D", "Em"]);
    });
    it("should get chords after Em", () => {
        expect(calc.getNextChords(parseChord("Em")).map(c => c.name)).toEqual(["G", "Am", "Bm", "C", "D", "Em"]);
    });
    it("should get chords after F#dim", () => {
        expect(calc.getNextChords(parseChord("F#dim")).map(c => c.name)).toEqual(["G", "F#dim"]);
    });
});

// describe("When get chord progressions in Dm", () => {
//     const calc = new ChordProgressionCalculator(getKey("Dm"));
//     it("should get root chords in GM", () => {
//         expect(calc.rootChord().name).toBe("G");
//     });
//     it("should get chords in GM", () => {
//         expect(calc.getChordAt(0).name).toBe("G");
//         expect(calc.getChordAt(1).name).toBe("Am");
//         expect(calc.getChordAt(2).name).toBe("Bm");
//         expect(calc.getChordAt(3).name).toBe("C");
//         expect(calc.getChordAt(4).name).toBe("D");
//         expect(calc.getChordAt(5).name).toBe("Em");
//         expect(calc.getChordAt(6).name).toBe("F#dim");
//     });
//     it("should get chords after G", () => {
//         expect(calc.getNextChords(calc.getChordAt(0)).map(c => c.name)).toEqual(["G", "Am", "Bm", "C", "D", "Em", "F#dim"]);
//     });
//     it("should get chords after Am", () => {
//         expect(calc.getNextChords(calc.getChordAt(1)).map(c => c.name)).toEqual(["G", "Am", "D", "F#dim"]);
//     });
//     it("should get chords after Bm", () => {
//         expect(calc.getNextChords(calc.getChordAt(2)).map(c => c.name)).toEqual(["G", "Bm", "C", "Em"]);
//     });
//     it("should get chords after C", () => {
//         expect(calc.getNextChords(calc.getChordAt(3)).map(c => c.name)).toEqual(["G", "Am", "C", "D", "F#dim"]);
//     });
//     it("should get chords after D", () => {
//         expect(calc.getNextChords(calc.getChordAt(4)).map(c => c.name)).toEqual(["G", "D", "Em"]);
//     });
//     it("should get chords after Em", () => {
//         expect(calc.getNextChords(calc.getChordAt(5)).map(c => c.name)).toEqual(["G", "Am", "Bm", "C", "D", "Em"]);
//     });
//     it("should get chords after F#dim", () => {
//         expect(calc.getNextChords(calc.getChordAt(6)).map(c => c.name)).toEqual(["G", "F#dim"]);
//     });
// });