/**
 * Validates the provided purchase data.
 * 
 * @param {Object} data - The purchase data object.
 * @returns {string} - A validation message.
 */
export function validateData(data) {
  if (!data || !Object.keys(data).length) return "Empty payload";
  if (!validateRetailer(data.retailer)) return "Blank Retailer";
  if (!validateDate(data.purchaseDate)) return "Invalid Date";
  if (!validateTime(data.purchaseTime)) return "Invalid Time";
  if (!validateItems(data.items)) return "Empty Items";

  for (let item of data.items) {
    if (!validateItemDescription(item.shortDescription)) return "No short description"
    if (!validateItemPrice(item.price)) return "Invalid item price";
  }
  if (!validateTotal(data.total)) return "Invalid total values";
  if (!totalEqualItemsValuesSum(data.total, data.items)) return "Total not equal to sum of items value";
  return "Everything is Valid";
}

/**
 * Validates the retailer's value.
 * 
 * @param {string} retailer - The retailer's name.
 * @returns {boolean} - True if the retailer is valid, otherwise false.
 */
function validateRetailer(retailer) {
  if (!retailer || !retailer.trim()) {
    return false;
  }
  return true;
}

/**
 * Validates the purchase date format and its validity.
 * 
 * @param {string} purchaseDate - The purchase date in YYYY-MM-DD format.
 * @returns {boolean} - True if the date is valid, otherwise false.
 */
function validateDate(purchaseDate) {
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
  if (!dateRegex.test(purchaseDate)) return false;
  
  const [, year, month, day] = purchaseDate.match(dateRegex);

  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.getFullYear() === Number(year) &&
    date.getMonth() === Number(month) - 1 &&
    date.getDate() === Number(day);
}

/**
 * Validates the purchase time format and its validity.
 * 
 * @param {string} purchaseTime - The purchase time in HH:MM format.
 * @returns {boolean} - True if the time is valid, otherwise false.
 */
function validateTime(purchaseTime) {
  const timeRegex = /^(\d{2}):(\d{2})$/;
  if (!timeRegex.test(purchaseTime)) return false;

  const [, hour, minute] = purchaseTime.match(timeRegex);

  return Number(hour) >= 0 && Number(hour < 24) &&
  (Number(minute) >= 0 && Number(minute) < 60);
}

/**
 * Validates the items list.
 * 
 * @param {Array} items - List of items.
 * @returns {boolean} - True if there's at least one item, otherwise false.
 */
function validateItems(items) {
  if (!items || items.length === 0) return false;
  return true;
}

/**
 * Validates the item's description.
 * 
 * @param {string} shortDescription - The item's short description.
 * @returns {boolean} - True if the description is valid, otherwise false.
 */
function validateItemDescription(shortDescription) {
  if (!shortDescription || !shortDescription.trim()) return false;
  return true;
}

/**
 * Validates the item's price.
 * 
 * @param {string} price - The item's price as a string.
 * @returns {boolean} - True if the price is valid, otherwise false.
 */
function validateItemPrice(price) {
  if (!price) return false;
  return validateNumber(price);
}

/**
 * Validates the total amount.
 * 
 * @param {string} total - The total amount as a string.
 * @returns {boolean} - True if the total is valid, otherwise false.
 */
function validateTotal(total) {
  if (!total) return false;
  return validateNumber(total);
}

/**
 * Validates if a string represents a valid non-negative number.
 * 
 * @param {string} numberStr - The number as a string.
 * @returns {boolean} - True if the string represents a valid non-negative number, otherwise false.
 */
function validateNumber(numberStr) {
  const numberRegex = /^\d*(?:\.\d{0,52})?$/;
  return numberRegex.test(numberStr) && Number(numberStr) >= 0;
}

/**
 * Validates if the total amount matches the sum of item prices.
 * 
 * @param {string} total - The total amount.
 * @param {Array} items - List of items.
 * @returns {boolean} - True if total matches sum of item prices, otherwise false.
 */
function totalEqualItemsValuesSum(total, items) {
  let sum = 0;
  let epsilon = 0.001
  for (let item of items) {
    sum += Number(item.price);
  }
  return (Math.abs(total - sum) < epsilon);
}