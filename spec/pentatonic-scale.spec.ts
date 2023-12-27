import { getScale } from "../scales";

function validateScale(testData: any): void {
    const scale = getScale(testData.tonic, "pentatonic", testData.mode);
    expect(scale.tonic.name).withContext("tonic").toBe(testData.tonic);
    expect(scale.mode).withContext("mode").toBe(testData.mode);
    expect(scale.modeAlias).withContext("modeAlias").toBe(testData.modeAlias);
    expect(scale.name).withContext("name").toBe(testData.name);
    expect(scale.signature).withContext("signature").toEqual(testData.signature);
    // expect(scale.chords.map(c => c.name)).withContext("chords").toEqual(testData.chords);
    expect(scale.notes.map(c => c.name)).withContext("notes").toEqual(testData.notes);
}

const TEST_DATA = [
    // MAJOR
    {
        tonic: "C", mode: "major", name: "CM Pentatonic", modeAlias: "",
        notes: ["C", "D", "E", "G", "A"],
        signature: { accidental: "", count: 0 }
    }, {
        tonic: "C#", mode: "major", name: "C#M Pentatonic", modeAlias: "",
        notes: ["C#", "D#", "E#", "G#", "A#"],
        signature: { accidental: "#", count: 5 }
    }, {
        tonic: "Db", mode: "major", name: "DbM Pentatonic", modeAlias: "",
        notes: ["Db", "Eb", "F", "Ab", "Bb"],
        signature: { accidental: "b", count: 4 }
    }, {
        tonic: "D", mode: "major", name: "DM Pentatonic", modeAlias: "",
        notes: ["D", "E", "F#", "A", "B"],
        signature: { accidental: "#", count: 1 }
    }, {
        tonic: "D#", mode: "major", name: "D#M Pentatonic", modeAlias: "",
        notes: ["D#", "E#", "G", "A#", "B#"],
        signature: { accidental: "#", count: 4 }
    }, {
        tonic: "Eb", mode: "major", name: "EbM Pentatonic", modeAlias: "",
        notes: ["Eb", "F", "G", "Bb", "C"],
        signature: { accidental: "b", count: 2 }
    }, {
        tonic: "E", mode: "major", name: "EM Pentatonic", modeAlias: "",
        notes: ["E", "F#", "G#", "B", "C#"],
        signature: { accidental: "#", count: 3 }
    }, {
        tonic: "F", mode: "major", name: "FM Pentatonic", modeAlias: "",
        notes: ["F", "G", "A", "C", "D"],
        signature: { accidental: "b", count: 0 }
    }, {
        tonic: "F#", mode: "major", name: "F#M Pentatonic", modeAlias: "",
        notes: ["F#", "G#", "A#", "C#", "D#"],
        signature: { accidental: "#", count: 5 }
    }, {
        tonic: "Gb", mode: "major", name: "GbM Pentatonic", modeAlias: "",
        notes: ["Gb", "Ab", "Bb", "Db", "Eb"],
        signature: { accidental: "b", count: 5 }
    }, {
        tonic: "G", mode: "major", name: "GM Pentatonic", modeAlias: "",
        notes: ["G", "A", "B", "D", "E"],
        signature: { accidental: "#", count: 0 }
    }, {
        tonic: "G#", mode: "major", name: "G#M Pentatonic", modeAlias: "",
        notes: ["G#", "A#", "B#", "D#", "E#"],
        signature: { accidental: "#", count: 5 }
    }, {
        tonic: "Ab", mode: "major", name: "AbM Pentatonic", modeAlias: "",
        notes: ["Ab", "Bb", "C", "Eb", "F"],
        signature: { accidental: "b", count: 3 }
    }, {
        tonic: "A", mode: "major", name: "AM Pentatonic", modeAlias: "",
        notes: ["A", "B", "C#", "E", "F#"],
        signature: { accidental: "#", count: 2 }
    }, {
        tonic: "A#", mode: "major", name: "A#M Pentatonic", modeAlias: "",
        notes: ["A#", "B#", "D", "E#", "G"],
        signature: { accidental: "#", count: 3 }
    }, {
        tonic: "Bb", mode: "major", name: "BbM Pentatonic", modeAlias: "",
        notes: ["Bb", "C", "D", "F", "G"],
        signature: { accidental: "b", count: 1 }
    }, {
        tonic: "B", mode: "major", name: "BM Pentatonic", modeAlias: "",
        notes: ["B", "C#", "D#", "F#", "G#"],
        signature: { accidental: "#", count: 4 }
    },
    // MINOR
    {
        tonic: "C", mode: "minor", name: "Cm Pentatonic", modeAlias: "",
        notes: ["C", "Eb", "F", "G", "Bb"],
        signature: { accidental: "b", count: 2 }
    }, {
        tonic: "C#", mode: "minor", name: "C#m Pentatonic", modeAlias: "",
        notes: ["C#", "E", "F#", "G#", "B"],
        signature: { accidental: "#", count: 3 }
    }, {
        tonic: "Db", mode: "minor", name: "Dbm Pentatonic", modeAlias: "",
        notes: ["Db", "Fb", "Gb", "Ab", "Cb"],
        signature: { accidental: "b", count: 5 }
    }, {
        tonic: "D", mode: "minor", name: "Dm Pentatonic", modeAlias: "",
        notes: ["D", "F", "G", "A", "C"],
        signature: { accidental: "b", count: 0 }
    }, {
        tonic: "D#", mode: "minor", name: "D#m Pentatonic", modeAlias: "",
        notes: ["D#", "F#", "G#", "A#", "C#"],
        signature: { accidental: "#", count: 5 }
    }, {
        tonic: "Eb", mode: "minor", name: "Ebm Pentatonic", modeAlias: "",
        notes: ["Eb", "Gb", "Ab", "Bb", "Db"],
        signature: { accidental: "b", count: 5 }
    }, {
        tonic: "E", mode: "minor", name: "Em Pentatonic", modeAlias: "",
        notes: ["E", "G", "A", "B", "D"],
        signature: { accidental: "#", count: 0 }
    }, {
        tonic: "F", mode: "minor", name: "Fm Pentatonic", modeAlias: "",
        notes: ["F", "Ab", "Bb", "C", "Eb"],
        signature: { accidental: "b", count: 3 }
    }, {
        tonic: "F#", mode: "minor", name: "F#m Pentatonic", modeAlias: "",
        notes: ["F#", "A", "B", "C#", "E"],
        signature: { accidental: "#", count: 2 }
    }, {
        tonic: "Gb", mode: "minor", name: "Gbm Pentatonic", modeAlias: "",
        notes: ["Gb", "A", "Cb", "Db", "Fb"],
        signature: { accidental: "b", count: 4 }
    }, {
        tonic: "G", mode: "minor", name: "Gm Pentatonic", modeAlias: "",
        notes: ["G", "Bb", "C", "D", "F"],
        signature: { accidental: "b", count: 1 }
    }, {
        tonic: "G#", mode: "minor", name: "G#m Pentatonic", modeAlias: "",
        notes: ["G#", "B", "C#", "D#", "F#"],
        signature: { accidental: "#", count: 4 }
    }, {
        tonic: "Ab", mode: "minor", name: "Abm Pentatonic", modeAlias: "",
        notes: ["Ab", "Cb", "Db", "Eb", "Gb"],
        signature: { accidental: "b", count: 5 }
    }, {
        tonic: "A", mode: "minor", name: "Am Pentatonic", modeAlias: "",
        notes: ["A", "C", "D", "E", "G"],
        signature: { accidental: "", count: 0 }
    }, {
        tonic: "A#", mode: "minor", name: "A#m Pentatonic", modeAlias: "",
        notes: ["A#", "C#", "D#", "E#", "G#"],
        signature: { accidental: "#", count: 5 }
    }, {
        tonic: "Bb", mode: "minor", name: "Bbm Pentatonic", modeAlias: "",
        notes: ["Bb", "Db", "Eb", "F", "Ab"],
        signature: { accidental: "b", count: 4 }
    }, {
        tonic: "B", mode: "minor", name: "Bm Pentatonic", modeAlias: "",
        notes: ["B", "D", "E", "F#", "A"],
        signature: { accidental: "#", count: 1 }
    },
];

describe("When get a pentatonic scale", () => {
    for (const data of TEST_DATA) {
        it(`should get scale of ${data.tonic} ${data.mode} Pentatonic`, () => validateScale(data));
    }
});
