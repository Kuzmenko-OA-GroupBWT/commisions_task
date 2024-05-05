/**
 * Gets the ISO week number of a date.
 * @param {Date} date - The date to get the week number for.
 * @returns {number} The ISO week number.
 */
function getWeekNumber(date) {
  const tempDate = new Date(date.valueOf());
  const dayNumber = (date.getUTCDay() + 6) % 7;
  tempDate.setUTCDate(tempDate.getUTCDate() - dayNumber + 3);
  const firstThursday = tempDate.valueOf();
  tempDate.setUTCMonth(0, 1);
  if (tempDate.getUTCDay() !== 4) {
    tempDate.setUTCMonth(0, 1 + (((4 - tempDate.getUTCDay()) + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - tempDate) / (7 * 24 * 3600 * 1000));
}

module.exports = getWeekNumber;
