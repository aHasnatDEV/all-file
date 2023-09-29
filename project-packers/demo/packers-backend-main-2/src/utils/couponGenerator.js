/**
 * This function is used to generate coupon code if not given.
 * @param {String} amount the amount/percentage to add at the last of the coupon
 * @returns returns the coupon code.
 */

export default function couponGenerator(amount) {
  var coupon = '';
  var possible = 'abcdefghijklmnopqrstuvwxyz';
  for (var i = 0; i < 5; i++) {
    coupon += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return coupon.toUpperCase() + amount;
}