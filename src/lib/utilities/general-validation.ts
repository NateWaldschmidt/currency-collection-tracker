/** This class is for general validation of commonly used fields. */
export default class GeneralValidation {

    /**
     * Validates the first and last names for users.
     * 
     * @param name The name that is to be validated.
     * @returns Whether this is a valid name.
     */
     public static validateName(name?: string): boolean {
        if (!name) throw `The name cannot be empty`

        /** The minimum length of a name. */
        const minNameLength = 1;
        /** The maximum length of a name. */
        const maxNameLength = 24;

        // Length validation.
        if (name.length < minNameLength) throw `The name is too short. Names must be at least ${minNameLength} characters.`;
        if (name.length > maxNameLength) throw `The name is too long. Names must be at ${maxNameLength} or less.`;

        // Checks for numbers.
        if (/\d/.test(name)) throw `Names cannot contain numbers.`
        // Checks for whitespace.
        if (name !== name.trim()) throw `There cannot be leading or trailing whitespace in a name.`

        return true;
    }

    /**
     * Checks that the phone number is a valid phone number format.
     * 
     * @param phoneNumber 
     * @returns 
     */
    public static validatePhoneNumber(phoneNumber: string): boolean {
        // TODO Validate that the phone number is formatted properly.
        return true;
    }

    /**
     * Checks that the email passed in is formatted properly as an email.
     * 
     * @param email The email to be validated.
     * @returns 
     */
    public static validateEmail(email?: string): boolean {
        // Empty check.
        if (!email) throw 'The email cannot be empty.';

        // TODO Check that the email is lowercase letters.
        // TODO Check that the email is unique.
        // TODO Check that the email is a valid format.
        return true;
    }
}