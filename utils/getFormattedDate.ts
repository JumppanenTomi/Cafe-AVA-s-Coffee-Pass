/**
 * Formats a given date into a string in the format "YYYY-MM-DD".
 *
 * @param date - The date to be formatted.
 * @returns The formatted date string.
 */
export const getFormattedDate = (date: Date): string => {
	return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
};