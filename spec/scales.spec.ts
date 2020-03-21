import { getNoteNames, Note } from "../notes";
import { getScale } from "../scales";

describe("When get scale", () => {
    it("should get scale for C", () => expect(getNoteNames(getScale(new Note("C")))).toEqual(["C", "D", "E", "F", "G", "A", "B"]));
    it("should get scale for G major", () => expect(getNoteNames(getScale(new Note("G"), "major"))).toEqual(["G", "A", "B", "C", "D", "E", "F#"]));
    it("should get scale for A minor", () => expect(getNoteNames(getScale(new Note("A"), "minor"))).toEqual(["A", "B", "C", "D", "E", "F", "G"]));
    it("should get scale for C minor", () => expect(getNoteNames(getScale(new Note("C"), "minor"))).toEqual(["C", "D", "Eb", "F", "G", "Ab", "Bb"]));
});