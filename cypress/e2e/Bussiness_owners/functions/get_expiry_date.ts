export class BussinessOwnerFunction {
    static getExpiryDate(): Date {
        // Get today's date
        const today = new Date();
        // Set the date to next year
        const nextYear = today.getFullYear() + 1;
        // Create a new Date object with the same month and day but in the next year
        const sameDateNextYear = new Date(nextYear, today.getMonth(), today.getDate());
        return sameDateNextYear;
    }
}
