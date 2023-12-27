import { getScale } from "../scales";

function validateScale(testData: any): void {
    const scale = getScale(testData.tonic, testData.mode);
    expect(scale.tonic.name).withContext("tonic").toBe(testData.tonic);
    expect(scale.mode).withContext("mode").toBe(testData.mode);
    expect(scale.modeAlias).withContext("modeAlias").toBe(testData.modeAlias);
    expect(scale.name).withContext("name").toBe(testData.name);
    expect(scale.signature).withContext("signature").toEqual(testData.signature);
    expect(scale.chords.map(c => c.name)).withContext("chords").toEqual(testData.chords);
    expect(scale.notes.map(c => c.name)).withContext("notes").toEqual(testData.notes);
}

const TEST_DATA = [
    // MAJOR
    {
        tonic: "C", scale: "diatonic", mode: "major", name: "CM", modeAlias: "ionian",
        notes: ["C", "D", "E", "F", "G", "A", "B"],
        chords: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
        signature: { accidental: "", count: 0 }
    }, {
        tonic: "C#", scale: "diatonic", mode: "major", name: "C#M", modeAlias: "ionian",
        notes: ["C#", "D#", "E#", "F#", "G#", "A#", "B#"],
        chords: ["C#", "D#m", "E#m", "F#", "G#", "A#m", "B#dim"],
        signature: { accidental: "#", count: 7 }
    }, {
        tonic: "Db", scale: "diatonic", mode: "major", name: "DbM", modeAlias: "ionian",
        notes: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
        chords: ["Db", "Ebm", "Fm", "Gb", "Ab", "Bbm", "Cdim"],
        signature: { accidental: "b", count: 5 }
    }, {
        tonic: "D", scale: "diatonic", mode: "major", name: "DM", modeAlias: "ionian",
        notes: ["D", "E", "F#", "G", "A", "B", "C#"],
        chords: ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
        signature: { accidental: "#", count: 2 }
    }, {
        tonic: "D#", scale: "diatonic", mode: "major", name: "D#M", modeAlias: "ionian",
        notes: ["D#", "E#", "G", "G#", "A#", "B#", "D"],
        chords: ["D#", "E#m", "Gm", "G#", "A#", "B#m", "Ddim"],
        signature: { accidental: "#", count: 5 }
    }, {
        tonic: "Eb", scale: "diatonic", mode: "major", name: "EbM", modeAlias: "ionian",
        notes: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
        chords: ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "Ddim"],
        signature: { accidental: "b", count: 3 }
    }, {
        tonic: "E", scale: "diatonic", mode: "major", name: "EM", modeAlias: "ionian",
        notes: ["E", "F#", "G#", "A", "B", "C#", "D#"],
        chords: ["E", "F#m", "G#m", "A", "B", "C#m", "D#dim"],
        signature: { accidental: "#", count: 4 }
    }, {
        tonic: "F", scale: "diatonic", mode: "major", name: "FM", modeAlias: "ionian",
        notes: ["F", "G", "A", "Bb", "C", "D", "E"],
        chords: ["F", "Gm", "Am", "Bb", "C", "Dm", "Edim"],
        signature: { accidental: "b", count: 1 }
    }, {
        tonic: "F#", scale: "diatonic", mode: "major", name: "F#M", modeAlias: "ionian",
        notes: ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
        chords: ["F#", "G#m", "A#m", "B", "C#", "D#m", "E#dim"],
        signature: { accidental: "#", count: 6 }
    }, {
        tonic: "Gb", scale: "diatonic", mode: "major", name: "GbM", modeAlias: "ionian",
        notes: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
        chords: ["Gb", "Abm", "Bbm", "Cb", "Db", "Ebm", "Fdim"],
        signature: { accidental: "b", count: 6 }
    }, {
        tonic: "G", scale: "diatonic", mode: "major", name: "GM", modeAlias: "ionian",
        notes: ["G", "A", "B", "C", "D", "E", "F#"],
        chords: ["G", "Am", "Bm", "C", "D", "Em", "F#dim"],
        signature: { accidental: "#", count: 1 }
    }, {
        tonic: "G#", scale: "diatonic", mode: "major", name: "G#M", modeAlias: "ionian",
        notes: ["G#", "A#", "B#", "C#", "D#", "E#", "G"],
        chords: ["G#", "A#m", "B#m", "C#", "D#", "E#m", "Gdim"],
        signature: { accidental: "#", count: 6 }
    }, {
        tonic: "Ab", scale: "diatonic", mode: "major", name: "AbM", modeAlias: "ionian",
        notes: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
        chords: ["Ab", "Bbm", "Cm", "Db", "Eb", "Fm", "Gdim"],
        signature: { accidental: "b", count: 4 }
    }, {
        tonic: "A", scale: "diatonic", mode: "major", name: "AM", modeAlias: "ionian",
        notes: ["A", "B", "C#", "D", "E", "F#", "G#"],
        chords: ["A", "Bm", "C#m", "D", "E", "F#m", "G#dim"],
        signature: { accidental: "#", count: 3 }
    }, {
        tonic: "A#", scale: "diatonic", mode: "major", name: "A#M", modeAlias: "ionian",
        notes: ["A#", "B#", "D", "D#", "E#", "G", "A"],
        chords: ["A#", "B#m", "Dm", "D#", "E#", "Gm", "Adim"],
        signature: { accidental: "#", count: 4 }
    }, {
        tonic: "Bb", scale: "diatonic", mode: "major", name: "BbM", modeAlias: "ionian",
        notes: ["Bb", "C", "D", "Eb", "F", "G", "A"],
        chords: ["Bb", "Cm", "Dm", "Eb", "F", "Gm", "Adim"],
        signature: { accidental: "b", count: 2 }
    }, {
        tonic: "B", scale: "diatonic", mode: "major", name: "BM", modeAlias: "ionian",
        notes: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
        chords: ["B", "C#m", "D#m", "E", "F#", "G#m", "A#dim"],
        signature: { accidental: "#", count: 5 }
    },
    // MINOR
    {
        tonic: "C", mode: "minor", name: "Cm", modeAlias: "aeolian",
        notes: ["C", "D", "Eb", "F", "G", "Ab", "Bb"],
        chords: ["Cm", "Ddim", "Eb", "Fm", "Gm", "Ab", "Bb"],
        signature: { accidental: "b", count: 3 }
    }, {
        tonic: "C#", mode: "minor", name: "C#m", modeAlias: "aeolian",
        notes: ["C#", "D#", "E", "F#", "G#", "A", "B"],
        chords: ["C#m", "D#dim", "E", "F#m", "G#m", "A", "B"],
        signature: { accidental: "#", count: 4 }
    }, {
        tonic: "Db", mode: "minor", name: "Dbm", modeAlias: "aeolian",
        notes: ["Db", "Eb", "Fb", "Gb", "Ab", "A", "Cb", ],
        chords: ["Dbm", "Ebdim", "Fb", "Gbm", "Abm", "A", "Cb", ],
        signature: { accidental: "b", count: 6 }
    }, {
        tonic: "D", mode: "minor", name: "Dm", modeAlias: "aeolian",
        notes: ["D", "E", "F", "G", "A", "Bb", "C"],
        chords: ["Dm", "Edim", "F", "Gm", "Am", "Bb", "C"],
        signature: { accidental: "b", count: 1 }
    }, {
        tonic: "D#", mode: "minor", name: "D#m", modeAlias: "aeolian",
        notes: ["D#", "E#", "F#", "G#", "A#", "B", "C#"],
        chords: ["D#m", "E#dim", "F#", "G#m", "A#m", "B", "C#"],
        signature: { accidental: "#", count: 6 }
    }, {
        tonic: "Eb", mode: "minor", name: "Ebm", modeAlias: "aeolian",
        notes: ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db"],
        chords: ["Ebm", "Fdim", "Gb", "Abm", "Bbm", "Cb", "Db"],
        signature: { accidental: "b", count: 6 }
    }, {
        tonic: "E", mode: "minor", name: "Em", modeAlias: "aeolian",
        notes: ["E", "F#", "G", "A", "B", "C", "D"],
        chords: ["Em", "F#dim", "G", "Am", "Bm", "C", "D"],
        signature: { accidental: "#", count: 1 }
    }, {
        tonic: "F", mode: "minor", name: "Fm", modeAlias: "aeolian",
        notes: ["F", "G", "Ab", "Bb", "C", "Db", "Eb"],
        chords: ["Fm", "Gdim", "Ab", "Bbm", "Cm", "Db", "Eb"],
        signature: { accidental: "b", count: 4 }
    }, {
        tonic: "F#", mode: "minor", name: "F#m", modeAlias: "aeolian",
        notes: ["F#", "G#", "A", "B", "C#", "D", "E"],
        chords: ["F#m", "G#dim", "A", "Bm", "C#m", "D", "E"],
        signature: { accidental: "#", count: 3 }
    }, {
        tonic: "Gb", mode: "minor", name: "Gbm", modeAlias: "aeolian",
        notes: ["Gb", "Ab", "A", "Cb", "Db", "D", "Fb"],
        chords: ["Gbm", "Abdim", "A", "Cbm", "Dbm", "D", "Fb"],
        signature: { accidental: "b", count: 5 }
    }, {
        tonic: "G", mode: "minor", name: "Gm", modeAlias: "aeolian",
        notes: ["G", "A", "Bb", "C", "D", "Eb", "F"],
        chords: ["Gm", "Adim", "Bb", "Cm", "Dm", "Eb", "F"],
        signature: { accidental: "b", count: 2 }
    }, {
        tonic: "G#", mode: "minor", name: "G#m", modeAlias: "aeolian",
        notes: ["G#", "A#", "B", "C#", "D#", "E", "F#"],
        chords: ["G#m", "A#dim", "B", "C#m", "D#m", "E", "F#"],
        signature: { accidental: "#", count: 5 }
    }, {
        tonic: "Ab", mode: "minor", name: "Abm", modeAlias: "aeolian",
        notes: ["Ab", "Bb", "Cb", "Db", "Eb", "Fb", "Gb"],
        chords: ["Abm", "Bbdim", "Cb", "Dbm", "Ebm", "Fb", "Gb"],
        signature: { accidental: "b", count: 7 }
    }, {
        tonic: "A", mode: "minor", name: "Am", modeAlias: "aeolian",
        notes: ["A", "B", "C", "D", "E", "F", "G"],
        chords: ["Am", "Bdim", "C", "Dm", "Em", "F", "G"],
        signature: { accidental: "", count: 0 }
    }, {
        tonic: "A#", mode: "minor", name: "A#m", modeAlias: "aeolian",
        notes: ["A#", "B#", "C#", "D#", "E#", "F#", "G#"],
        chords: ["A#m", "B#dim", "C#", "D#m", "E#m", "F#", "G#"],
        signature: { accidental: "#", count: 7 }
    }, {
        tonic: "Bb", mode: "minor", name: "Bbm", modeAlias: "aeolian",
        notes: ["Bb", "C", "Db", "Eb", "F", "Gb", "Ab"],
        chords: ["Bbm", "Cdim", "Db", "Ebm", "Fm", "Gb", "Ab"],
        signature: { accidental: "b", count: 5 }
    }, {
        tonic: "B", mode: "minor", name: "Bm", modeAlias: "aeolian",
        notes: ["B", "C#", "D", "E", "F#", "G", "A"],
        chords: ["Bm", "C#dim", "D", "Em", "F#m", "G", "A"],
        signature: { accidental: "#", count: 2 }
    },
    // OTHERS
    {
        tonic: "C", mode: "lydian", name: "C(lyd)", modeAlias: "",
        notes: ["C", "D", "E", "F#", "G", "A", "B"],
        chords: ["C", "D", "Em", "F#dim", "G", "Am", "Bm"],
        signature: { accidental: "#", count: 1 }
    }, {
        tonic: "C#", mode: "ionian", name: "C#(ion)", modeAlias: "major",
        notes: ["C#", "D#", "E#", "F#", "G#", "A#", "B#"],
        chords: ["C#", "D#m", "E#m", "F#", "G#", "A#m", "B#dim"],
        signature: { accidental: "#", count: 7 },
    }, {
        tonic: "D", mode: "mixolydian", name: "D(mix)", modeAlias: "",
        notes: ["D", "E", "F#", "G", "A", "B", "C"],
        chords: ["D", "Em", "F#dim", "G", "Am", "Bm", "C"],
        signature: { accidental: "#", count: 1 }
    }, {
        tonic: "Eb", mode: "dorian", name: "Eb(dor)", modeAlias: "",
        notes: ["Eb", "F", "Gb", "Ab", "Bb", "C", "Db"],
        chords: ["Ebm", "Fm", "Gb", "Ab", "Bbm", "Cdim", "Db"],
        signature: { accidental: "b", count: 5 } 
    }, {
        tonic: "E", mode: "aeolian", name: "E(aeo)", modeAlias: "minor",
        notes: ["E", "F#", "G", "A", "B", "C", "D"],
        chords: ["Em", "F#dim", "G", "Am", "Bm", "C", "D"],
        signature: { accidental: "#", count: 1 } 
    }, {
        tonic: "F", mode: "phrygian", name: "F(phr)", modeAlias: "",
        notes: ["F", "Gb", "Ab", "Bb", "C", "Db", "Eb"],
        chords: ["Fm", "Gb", "Ab", "Bbm", "Cdim", "Db", "Ebm"],
        signature: { accidental: "b", count: 5 } 
    }, {
        tonic: "F#", mode: "locrian", name: "F#(loc)", modeAlias: "",
        notes: ["F#", "G", "A", "B", "B#", "D", "E"],
        chords: ["F#dim", "G", "Am", "Bm", "B#", "D", "Em"],
        signature: { accidental: "#", count: 1 } 
    }, {
        tonic: "G", mode: "lydian", name: "G(lyd)", modeAlias: "",
        notes: ["G", "A", "B", "C#", "D", "E", "F#"],
        chords: ["G", "A", "Bm", "C#dim", "D", "Em", "F#m"],
        signature: { accidental: "#", count: 2 } 
    }, {
        tonic: "Ab", mode: "ionian", name: "Ab(ion)", modeAlias: "major",
        notes: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
        chords: ["Ab", "Bbm", "Cm", "Db", "Eb", "Fm", "Gdim"],
        signature: { accidental: "b", count: 4 } 
    }, {
        tonic: "A", mode: "mixolydian", name: "A(mix)", modeAlias: "",
        notes: ["A", "B", "C#", "D", "E", "F#", "G"],
        chords: ["A", "Bm", "C#dim", "D", "Em", "F#m", "G"],
        signature: { accidental: "#", count: 2 } 
    }, {
        tonic: "Bb", mode: "dorian", name: "Bb(dor)", modeAlias: "",
        notes: ["Bb", "C", "Db", "Eb", "F", "G", "Ab"],
        chords: ["Bbm", "Cm", "Db", "Eb", "Fm", "Gdim", "Ab"],
        signature: { accidental: "b", count: 4 } 
    }, {
        tonic: "B", mode: "aeolian", name: "B(aeo)", modeAlias: "minor",
        notes: ["B", "C#", "D", "E", "F#", "G", "A"],
        chords: ["Bm", "C#dim", "D", "Em", "F#m", "G", "A"],
        signature: { accidental: "#", count: 2 } 
    },
];

describe("When get a diatonic scale", () => {
    for (const data of TEST_DATA) {
        it(`should get scale of ${data.tonic} ${data.mode} Diatonic`, () => validateScale(data));
    }
});
