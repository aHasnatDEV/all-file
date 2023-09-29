/**
 * This function is used to generate number for order or request.
 * @returns returns the unique number.
 */

export default function generateNumber() {
  var number = '';
  var possible = '1234567';
  for (var i = 0; i < 7; i++) {
    number += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return number.toUpperCase();
}