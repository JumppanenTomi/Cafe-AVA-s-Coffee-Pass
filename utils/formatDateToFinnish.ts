/**
 * Formats a date string to Finnish date format.
 * 
 * @param dateString - The date string to format.
 * @returns The formatted date string in Finnish date format.
 */
export default function formatDateToFinnish(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('fi-FI', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).format(date);
}