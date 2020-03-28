# Power Chord Music Theory

This is a npm package of music theory utilities created for the Power Chord app.

## Notes
- Notes are immutable objects that represent a note
- Get an instance by calling the `getNote()` function.
- Notes are sigletons by name and octave.
Therefore to check if two notes have the same name and octave simply use the equality operator 
    - `getNote("A#", 4) === getNote("A#", 4)` => true.
- If you want to check equality without regard to note name use the `equals()` method. For example, A#4 is the same as Bb4 even though they have different names.
    - `getNote("A#", 4).equals(getNote("Bb", 4))` => true
- If you want to check equality without regard to note name or octave use the equalsIgnoreOctave() method.
    - `getNote("A#", 5).equalsIgnoreCase(getNote("Bb", 4))` => true
- Other note methods
    - `transpose()` Gets the note that is this note transposed a number of steps up or down
- Other functions available:
    - `getNotes()` Gets one or more notes at one time
    - `parseNote()` Parse a note by name and octave (e.g. "C#4")
    - `sortNotes()` Sorts an array of notes into natural order on the musical scale
    - `getNoteNames()` Maps an array of notes to an array of note names
    - `getNoteNumbers()` Maps an array of notes to an array of note numbers


## Chords
- Chords are immutable objects that are a collection of two or more notes
- Get an instance by calling the `getChord()` function
- Chords are not singletons so using the equality operator will not work correctly. To check equality use the `equals()` method.
- If you want to check equality without regards to the bass note use `equalsIgnoreBass()`
    - `getChord("C/G").equalsIgnoreBass(getChord("C/E"))` => true
- If you want to check equality without regards to the root or bass note names use `isSameAs()`
    - `getChord("C#M/G#").isSameAs(getChord("DbM/Ab"))` => true
- Other chord methods
    - `getInversion()` Gets the chord that is an inversion of this one
    - `transpose()` Gets the chord that is this chord transposed a number of steps up or down
- Other functions available:
    - `parseChord()` Parses a chord by name, quality and bass (e.g. "Csus4/G")
    - `getChordIntervals()` Gets the chord intervals for a chord quality

## Scales
- Scales are immutable objects that are a collection of notes ordered by pitch.
- Seven scales modes are supported: major/ionian, minor/aeolian, dorian, phrygian, lydian, mixolydian, locrian

## Build Process
Follow these steps to build the package.

### Initialize
This package has no runtime dependencies, but it does have dev dependencies. Run `npm init` to install them.

### Build
This library is written in TypeScript.
Run `tsc` to compile.

### Unit Tests
Run `jasmine` or `npm test` from the command line.

### Package
Run `npm pack` or `npm run package` from the command line.
