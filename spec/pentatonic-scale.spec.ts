import { getScale } from "../scales";

function validateScale(testData: any): void {
    const scale = getScale(testData.tonic, testData.scale);
    expect(scale.tonic.name).withContext("tonic").toBe(testData.tonic);
    expect(scale.mode).withContext("mode").toBe(testData.mode);
    expect(scale.modeAlias).withContext("modeAlias").toBe(testData.modeAlias);
    expect(scale.name).withContext("name").toBe(testData.name);
    expect(scale.signature).withContext("signature").toEqual(testData.signature);
    // expect(scale.chords.map(c => c.name)).withContext("chords").toEqual(testData.chords);
    expect(scale.notes.map(c => c.name)).withContext("notes").toEqual(testData.notes);
}

const test_data = [{
        tonic: "C", scale: "pent_M", mode: "major", name: "CM Pentatonic", modeAlias: "",
        notes: ["C", "D", "E", "G", "A"],
        signature: { accidental: "", count: 0 }
    }, {
        tonic: "C#", scale: "pent_M", mode: "major", name: "C#M Pentatonic", modeAlias: "",
        notes: ["C#", "D#", "E#", "G#", "A#"],
        signature: { accidental: "#", count: 0 }
    }, {
        tonic: "Db", scale: "pent_M", mode: "major", name: "DbM Pentatonic", modeAlias: "",
        notes: ["Db", "Eb", "F", "Ab", "Bb"],
        signature: { accidental: "b", count: 0 }
    }, {
        tonic: "D", scale: "pent_M", mode: "major", name: "DM Pentatonic", modeAlias: "",
        notes: ["D", "E", "F#", "A", "B"],
        signature: { accidental: "", count: 0 }
    }, {
        tonic: "D#", scale: "pent_M", mode: "major", name: "D#M Pentatonic", modeAlias: "",
        notes: ["D#", "E#", "G", "A#", "B#"],
        signature: { accidental: "#", count: 0 }
    }, {
        tonic: "Eb", scale: "pent_M", mode: "major", name: "EbM Pentatonic", modeAlias: "",
        notes: ["Eb", "F", "G", "Bb", "C"],
        signature: { accidental: "b", count: 0 }
    }, {
        tonic: "E", scale: "pent_M", mode: "major", name: "EM Pentatonic", modeAlias: "",
        notes: ["E", "F#", "G#", "B", "C#"],
        signature: { accidental: "", count: 0 }
    }, {
        tonic: "F", scale: "pent_M", mode: "major", name: "FM Pentatonic", modeAlias: "",
        notes: ["F", "G", "A", "C", "D"],
        signature: { accidental: "", count: 0 }
    }, {
        tonic: "F#", scale: "pent_M", mode: "major", name: "F#M Pentatonic", modeAlias: "",
        notes: ["F#", "G#", "A#", "C#", "D#"],
        signature: { accidental: "#", count: 0 }
    }, {
        tonic: "Gb", scale: "pent_M", mode: "major", name: "GbM Pentatonic", modeAlias: "",
        notes: ["Gb", "Ab", "Bb", "Db", "Eb"],
        signature: { accidental: "b", count: 0 }
    }, {
        tonic: "G", scale: "pent_M", mode: "major", name: "GM Pentatonic", modeAlias: "",
        notes: ["G", "A", "B", "D", "E"],
        signature: { accidental: "", count: 0 }
    }, {
        tonic: "G#", scale: "pent_M", mode: "major", name: "G#M Pentatonic", modeAlias: "",
        notes: ["G#", "A#", "B#", "D#", "E#"],
        signature: { accidental: "#", count: 0 }
    }, {
        tonic: "Ab", scale: "pent_M", mode: "major", name: "AbM Pentatonic", modeAlias: "",
        notes: ["Ab", "Bb", "C", "Eb", "F"],
        signature: { accidental: "b", count: 0 }
    }, {
        tonic: "A", scale: "pent_M", mode: "major", name: "AM Pentatonic", modeAlias: "",
        notes: ["A", "B", "C#", "E", "F#"],
        signature: { accidental: "", count: 0 }
    }, {
        tonic: "A#", scale: "pent_M", mode: "major", name: "A#M Pentatonic", modeAlias: "",
        notes: ["A#", "B#", "D", "E#", "G"],
        signature: { accidental: "#", count: 0 }
    }, {
        tonic: "Bb", scale: "pent_M", mode: "major", name: "BbM Pentatonic", modeAlias: "",
        notes: ["Bb", "C", "D", "F", "G"],
        signature: { accidental: "b", count: 0 }
    }, {
        tonic: "B", scale: "pent_M", mode: "major", name: "BM Pentatonic", modeAlias: "",
        notes: ["B", "C#", "D#", "F#", "G#"],
        signature: { accidental: "", count: 0 }
    },
];

describe("When get a pentatonic scale", () => {
    for (const data of test_data) {
        it(`should get scale of ${data.tonic} ${data.mode} Pentatonic`, () => validateScale(data));
    }
});
