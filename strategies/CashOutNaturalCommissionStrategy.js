const moment = require('moment');
const CommissionStrategy = require('./CommissionStrategy');

/**
 * CashOutNaturalCommissionStrategy is a class that extends CommissionStrategy.
 * It calculates the commission for cash-out operations for natural persons.
 */
class CashOutNaturalCommissionStrategy extends CommissionStrategy {
  /**
   * Constructor for CashOutNaturalCommissionStrategy.
   * @param {Object} configurations - The configurations for the commission calculation.
   */
  constructor(configurations) {
    super();
    this.configurations = configurations;
    this.userWeekCashOutTotal = {};
  }

  /**
   * Calculates the commission based on the amount, user ID and date.
   * @param {number} amount - The amount of money to calculate the commission for.
   * @param {string} userId - The ID of the user.
   * @param {string} date - The date of the operation.
   * @returns {number} The calculated commission.
   */
  calculate(amount, userId, date) {
    const weekLimitAmount = this.configurations.cash_out_natural.week_limit.amount;
    const weekNumber = moment(date).isoWeek();
    const userWeekKey = `${userId}-${weekNumber}`;
    this.userWeekCashOutTotal[userWeekKey] = (this.userWeekCashOutTotal[userWeekKey] || 0)
            + amount;

    let commission;
    if (this.userWeekCashOutTotal[userWeekKey] > weekLimitAmount) {
      const exceededAmount = this.userWeekCashOutTotal[userWeekKey] - weekLimitAmount;
      commission = (exceededAmount * this.configurations.cash_out_natural.percents) / 100;
      this.userWeekCashOutTotal[userWeekKey] = weekLimitAmount;
    } else {
      commission = 0;
    }
    return commission;
  }
}

module.exports = CashOutNaturalCommissionStrategy;
