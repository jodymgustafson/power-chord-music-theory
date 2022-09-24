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
    - `getNote("A#", 5).equalsIgnoreOctave(getNote("Bb", 4))` => true
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
- Scales are immutable objects that are a collection of notes and chords ordered by pitch.
- Seven scales modes are supported: major/ionian, minor/aeolian, dorian, phrygian, lydian, mixolydian, locrian
- Get an instance by calling the `getScale()` function
- To check for equality use the `equals()` method
- If you want to check equality without regards to the tonic name use `isSameAs()`
    - `getScale("C#M").isSameAs(getScale("DbM"))` => true
- Other scale methods
    - `getNoteInScale()` Gets a note with the name adjusted to the scale
    - `getChordInScale()` Gets a chord with the name adjusted to the scale
- Other functions available:
    - `parseScale()` Parses a scale by name and mode (e.g. C#m)

## Chord Lookup
- You can lookup chords from a set of notes using the `getChordFromNotes()` function.
- For example, the notes ["C", "E", "G"] returns a C chord.

## Circle of Fifths
- A CircleOfFifths is an immutable object that provides info about a scale
- Get an instance by calling the `getCircleOfFifths()` function with a scale
- The `fifths` property is an array of fifth information
- The `orderedFifths` property is the same except sorted in natural order starting with the tonic

## Chord Progression Calculator
- The Chord Progression Calculator gives you the list of chords that best follow another chord in a key
- Get an instance by calling the get` getChordProgressionCalculator()` function
- Methods
    - `rootChord` Gets the root chord for the progression
    - `getChordAt()` Gets the chord at the specified position in the scale
    - `getNextChords()` Gets the list of suggested chords that could follow a chord
    - `getChordNumber()` Gets the chord number in the current key where the tonic is 0

## Guitar Lookup Service
- The guitar lookup service is used to look up notes on a guitar and get finger positions for chords
- There is one implementation for standard tuning of E-A-D-G-B-E, which you can get by calling the `getDefaultTuningGuitarLookup()` function
- Methods
    - `getNote()` Gets the note at a fret and string position
    - `getChordTabs()` Gets the finger positions for each variation that match the chord root and quality
    - `getChordTab()` Gets the finger positions that match the chord root and quality and variation
    - `getChordVariationCount()` Gets the number of variations for a chord

## Ukulele Lookup Service
- The ukulele lookup service is used to look up notes on a uke and get finger positions for chords
- There is one implementation for standard tuning of G-C-E-A, which you can get by calling the `getDefaultTuningUkuleleLookup()` function
- Methods
    - `getNote()` Gets the note at a fret and string position
    - `getChordTabs()` Gets the finger positions for each variation that match the chord root and quality
    - `getChordTab()` Gets the finger positions that match the chord root and quality and variation
    - `getChordVariationCount()` Gets the number of variations for a chord

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
