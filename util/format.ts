/**
 * Converts accidentals in a string from ASCII (#|b) to extended (♭|♯)
 * @param text 
 */
export function formatAccidentals(text: string): string
{
    return text.replace(/[b]/g, "♭").replace(/[#]/g, "♯");
}

/**
 * Converts accidentals in a string from extended (♭|♯) to ASCII (#|b)
 * @param text 
 */
export function unformatAccidentals(text: string): string
{
    return text.replace(/[♭]/g, "b").replace(/[♯]/g, "#");
}
