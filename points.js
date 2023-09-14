/**
 * Calculates points based on the provided purchase data.
 * 
 * @param {Object} data - The purchase data object.
 * @returns {number} - The calculated points.
 */
export function calculatePoints(data) {
  let points = 0;
  points +=
    retailerName(data.retailer) +
    50 * totalPriceRounded(data.total) +
    25 * totalPriceMultiple(data.total) +
    5 * numberOfPairs(data.items) +
    itemDescriptionLen(data.items) +
    6 * purchaseDateOdd(data.purchaseDate) +
    10 * afterTwoBeforeFour(data.purchaseTime);
  return points;
}

/**
 * Computes points based on the alphanumeric character count in the retailer's name.
 * 
 * @param {string} name - The retailer's name.
 * @returns {number} - Number of alphanumeric characters in the name.
 */
function retailerName(name) {
  const count = name.match(/[a-zA-Z0-9]/g);
  return count ? count.length : 0;
}

/**
 * Checks if a string represents a round number.
 * 
 * @param {string} numStr - The number as a string.
 * @returns {boolean} - True if the number is rounded, otherwise false.
 */
function totalPriceRounded(numStr) {
  const number = parseFloat(numStr);
  return Math.floor(number) === number;
}

/**
 * Checks if a string represents a number that is a multiple of 4.
 * 
 * @param {string} numStr - The number as a string.
 * @returns {boolean} - True if the number is a multiple of 4, otherwise false.
 */
function totalPriceMultiple(numStr) {
  const number = parseFloat(numStr);
  return Math.floor(number * 4) === number * 4;
}

/**
 * Calculates points based on the number of pairs in the items list.
 * 
 * @param {Array} items - List of items.
 * @returns {number} - Half of the item count.
 */
function numberOfPairs(items) {
  return Math.floor(items.length / 2);
}

/**
 * Calculates points based on item descriptions of specific lengths and their price.
 * 
 * @param {Array} items - List of items.
 * @returns {number} - The calculated points based on description lengths.
 */
function itemDescriptionLen(items) {
  let points = 0;
  for (let item of items) {
    const len = item.shortDescription.trim().length;
    if (len % 3 === 0) {
      points += Math.ceil(item.price * 0.2);
    }
  }
  return points;
}

/**
 * Checks if the last digit of the purchase date is odd.
 * 
 * @param {string} purchaseDate - The purchase date.
 * @returns {boolean} - True if the last digit of the date is odd, otherwise false.
 */
function purchaseDateOdd(purchaseDate) {
  if (purchaseDate[9] % 2 === 1) return true;
  return false;
}

/**
 * Checks if the purchase time falls between 2 PM and 4 PM.
 * 
 * @param {string} purchaseTime - The purchase time in HH:MM format.
 * @returns {boolean} - True if time is between 2 PM and 4 PM, otherwise false.
 */
function afterTwoBeforeFour(purchaseTime) {
  const [hours, minutes] = purchaseTime.split(':').map(Number);
  if (hours >= 16 || hours <= 13 || (hours === 14 && minutes === 0)) return false;
  if (hours >= 14) return true;
  return false;
}