export default function formatDateToFinnish(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('fi-FI', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).format(date);
}