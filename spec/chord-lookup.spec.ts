import { getChordFromNotes } from "../chord-lookup"
import { getNotes } from "../notes"

describe("When get chord from notes", () => {
    it("should get C", () => {
        expect(getChordFromNotes(...getNotes("C", "E", "G")).name).toBe("C");
    });
    it("should get C/G", () => {
        expect(getChordFromNotes(...getNotes("G", "C", "E")).name).toBe("C/G");
    });
    it("should get C/E", () => {
        expect(getChordFromNotes(...getNotes("E", "C","G")).name).toBe("C/E");
    });

    it("should get Am", () => {
        expect(getChordFromNotes(...getNotes("A", "C", "E")).name).toBe("Am");
    });
    it("should get Am/E", () => {
        expect(getChordFromNotes(...getNotes("E", "A", "C")).name).toBe("Am/E");
    });

    it("should get Bm7", () => {
        expect(getChordFromNotes("B", "D", "F#", "A").name).toBe("Bm7");
    });
    it("should get Bm7/A", () => {
        expect(getChordFromNotes("A", "F#", "D", "B").name).toBe("Bm7/A");
    });

    it("should get G7", () => {
        expect(getChordFromNotes("G", "B", "D", "F").name).toBe("G7");
    });

    it("should get GM7", () => {
        expect(getChordFromNotes("G", "B", "D", "F#").name).toBe("GM7");
    });

    it("should get Ebdim", () => {
        expect(getChordFromNotes("Eb", "F#", "A").name).toBe("Ebdim");
    });

    it("should get Ebdim7", () => {
        expect(getChordFromNotes("Eb", "F#", "A", "C").name).toBe("Ebdim7");
    });

    it("should get Adim7", () => {
        expect(getChordFromNotes("A", "Eb", "F#", "C").name).toBe("Adim7");
    });

    it("should get F#sus4", () => {
        expect(getChordFromNotes("F#", "B", "C#").name).toBe("F#sus4");
    });

    it("should get F#sus2", () => {
        expect(getChordFromNotes("F#", "Ab", "C#").name).toBe("F#sus2");
    });

    it("should get Ab5", () => {
        expect(getChordFromNotes("Ab", "Eb").name).toBe("Ab5");
    });

    it("should get undefined for invalid chord", () => {
        expect(getChordFromNotes("A", "Ab")).toBeUndefined();
    });

    it("should get undefined for empty array", () => {
        expect(getChordFromNotes()).toBeUndefined();
    });
});
