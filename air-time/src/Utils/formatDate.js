/**
 * Format a date string to the "YYYY-MM-DD HH:mm:ss" format.
 *
 * @param {string} inputDateString - The input date string to format.
 * @returns {string} The formatted date string.
 */
export default function formatDate(inputDateString) {
  // Create a Date object from the input date string
  const inputDate = new Date(inputDateString);

  // Get the year, month, day, hours, and minutes from the Date object
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-based
  const day = String(inputDate.getDate()).padStart(2, '0');
  const hours = String(inputDate.getHours()).padStart(2, '0');
  const minutes = String(inputDate.getMinutes()).padStart(2, '0');

  // Create the formatted date string
  const formattedDateString = `${year}-${month}-${day} ${hours}:${minutes}:00`;

  return formattedDateString;
}
