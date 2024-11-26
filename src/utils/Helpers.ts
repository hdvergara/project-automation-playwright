class Helpers {

    /**
 * Generates a random phone number with a specific prefix.
 *
 * @param {string} prefix - The prefix of the phone number.
 * @returns {string} A random phone number in the format `prefix + 7 random digits`.
 *
 * @example
 * const phoneNumber = Helpers.generatePhoneNumber('310');
 * console.log(phoneNumber); // Output: 3101234567 (example)
 */
    static generatePhoneNumber(prefix: string): string {
        const randomPart = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
        return prefix + randomPart;
    }

}

export default Helpers;