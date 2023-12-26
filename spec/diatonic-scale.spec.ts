import { getScale } from "../scales";

function validateScale(testData: any): void {
    const scale = getScale(testData.tonic, testData.mode);
    expect(scale.tonic.name).withContext("tonic").toBe(testData.tonic);
    expect(scale.mode).withContext("mode").toBe(testData.mode);
    expect(scale.modeAlias).withContext("modeAlias").toBe(testData.modeAlias);
    expect(scale.name).withContext("name").toBe(testData.name);
    expect(scale.signature).withContext("signature").toEqual(testData.signature);
    // expect(scale.chords.map(c => c.name)).withContext("chords").toEqual(testData.chords);
    expect(scale.notes.map(c => c.name)).withContext("notes").toEqual(testData.notes);
}

const test_data = [{
        tonic: "C", scale: "diatonic", mode: "major", name: "CM", modeAlias: "ionian",
        notes: ["C", "D", "E", "F", "G", "A", "B"],
        signature: { accidental: "", count: 0 }
    }, {
        tonic: "C#", scale: "diatonic", mode: "major", name: "C#M", modeAlias: "ionian",
        notes: ["C#", "D#", "E#", "F#", "G#", "A#", "B#"],
        signature: { accidental: "#", count: 7 }
    }, {
        tonic: "Db", scale: "diatonic", mode: "major", name: "DbM", modeAlias: "ionian",
        notes: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
        signature: { accidental: "b", count: 5 }
    }, {
        tonic: "D", scale: "diatonic", mode: "major", name: "DM", modeAlias: "ionian",
        notes: ["D", "E", "F#", "G", "A", "B", "C#"],
        signature: { accidental: "#", count: 2 }
    }, {
        tonic: "D#", scale: "diatonic", mode: "major", name: "D#M", modeAlias: "ionian",
        notes: ["D#", "E#", "G", "G#", "A#", "B#", "D"],
        signature: { accidental: "#", count: 5 }
    }, {
        tonic: "Eb", scale: "diatonic", mode: "major", name: "EbM", modeAlias: "ionian",
        notes: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
        signature: { accidental: "b", count: 3 }
    }, {
        tonic: "E", scale: "diatonic", mode: "major", name: "EM", modeAlias: "ionian",
        notes: ["E", "F#", "G#", "A", "B", "C#", "D#"],
        signature: { accidental: "#", count: 4 }
    }, {
        tonic: "F", scale: "diatonic", mode: "major", name: "FM", modeAlias: "ionian",
        notes: ["F", "G", "A", "Bb", "C", "D", "E"],
        signature: { accidental: "b", count: 1 }
    }, {
        tonic: "F#", scale: "diatonic", mode: "major", name: "F#M", modeAlias: "ionian",
        notes: ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
        signature: { accidental: "#", count: 6 }
    }, {
        tonic: "Gb", scale: "diatonic", mode: "major", name: "GbM", modeAlias: "ionian",
        notes: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
        signature: { accidental: "b", count: 6 }
    }, {
        tonic: "G", scale: "diatonic", mode: "major", name: "GM", modeAlias: "ionian",
        notes: ["G", "A", "B", "C", "D", "E", "F#"],
        signature: { accidental: "#", count: 1 }
    }, {
        tonic: "G#", scale: "diatonic", mode: "major", name: "G#M", modeAlias: "ionian",
        notes: ["G#", "A#", "B#", "C#", "D#", "E#", "G"],
        signature: { accidental: "#", count: 6 }
    }, {
        tonic: "Ab", scale: "diatonic", mode: "major", name: "AbM", modeAlias: "ionian",
        notes: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
        signature: { accidental: "b", count: 4 }
    }, {
        tonic: "A", scale: "diatonic", mode: "major", name: "AM", modeAlias: "ionian",
        notes: ["A", "B", "C#", "D", "E", "F#", "G#"],
        signature: { accidental: "#", count: 3 }
    }, {
        tonic: "A#", scale: "diatonic", mode: "major", name: "A#M", modeAlias: "ionian",
        notes: ["A#", "B#", "D", "D#", "E#", "G", "A"],
        signature: { accidental: "#", count: 4 }
    }, {
        tonic: "Bb", scale: "diatonic", mode: "major", name: "BbM", modeAlias: "ionian",
        notes: ["Bb", "C", "D", "Eb", "F", "G", "A"],
        signature: { accidental: "b", count: 2 }
    }, {
        tonic: "B", scale: "diatonic", mode: "major", name: "BM", modeAlias: "ionian",
        notes: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
        signature: { accidental: "#", count: 5 }
    },
];

describe("When get a diatonic scale", () => {
    for (const data of test_data) {
        it(`should get scale of ${data.tonic} ${data.mode} Diatonic`, () => validateScale(data));
    }
});
