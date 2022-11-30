/**
 * Format a string from Camelcase to Kebab case.
 * 
 * @example
 * CamelToKebab('testThing') = 'test-thing';
 * @param str The Camelcase string to be converted into Kebab case.
 * @returns The string in Kebab case.
 */
export default function CamelToKebab(str: string): string {
    return str.split('').map((char, index) => {
        return char.toUpperCase() === char
            ? `${index !== 0 ? '-' : ''}${char.toLowerCase()}`
            : char;
    }).join('');
}