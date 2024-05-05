const getWeekNumber = require('./helpers/getWeekNumber');

/**
 * CommissionCalculator class is used to calculate commissions for cash in and cash out operations.
 * It uses a configuration object to determine the commission rates and limits.
 */
class CommissionCalculator {
  /**
   * Constructs a new CommissionCalculator.
   * @param {Object} configurations - The configuration object containing commission rates
   * and limits.
   */
  constructor(configurations) {
    this.configurations = configurations;
  }

  /**
   * Calculates the commission for cash in operation.
   * @param {number} amount - The amount of cash in operation.
   * @returns {number} The calculated commission.
   */
  calculateCashInCommission(amount) {
    let commission = (amount * this.configurations.cash_in.percents) / 100;
    commission = commission > this.configurations.cash_in.max.amount
      ? this.configurations.cash_in.max.amount
      : commission;
    return commission;
  }

  /**
   * Calculates the commission for a cash-out operation.
   * @param {number} amount - The amount of cash-out operation.
   * @param {string} userType - The type of user (natural or juridical).
   * @param {number} userId - The id of the user.
   * @param {string} date - The date of the operation.
   * @returns {number} The calculated commission.
   */
  calculateCashOutCommission(amount, userType, userId, date) {
    let commission;
    if (userType === 'natural') {
      const weekLimitAmount = this.configurations.cash_out_natural.week_limit.amount;

      const weekNumber = getWeekNumber(new Date(date));
      const userWeekKey = `${userId}-${weekNumber}`;
      this.userWeekCashOutTotal = this.userWeekCashOutTotal || {};
      this.userWeekCashOutTotal[userWeekKey] = (this.userWeekCashOutTotal[userWeekKey] || 0)
          + amount;

      if (this.userWeekCashOutTotal[userWeekKey] > weekLimitAmount) {
        const exceededAmount = this.userWeekCashOutTotal[userWeekKey] - weekLimitAmount;
        commission = (exceededAmount * this.configurations.cash_out_natural.percents) / 100;
        this.userWeekCashOutTotal[userWeekKey] = weekLimitAmount;
      } else {
        commission = 0;
      }
    } else if (userType === 'juridical') {
      commission = (amount * this.configurations.cash_out_juridical.percents) / 100;
      commission = commission < this.configurations.cash_out_juridical.min.amount
        ? this.configurations.cash_out_juridical.min.amount
        : commission;
    }
    return commission;
  }

  /**
   * Calculates the commission for a given operation.
   * @param {Object} operation - The operation object containing the type of operation, amount,
   * and user type.
   * @returns {number} The calculated commission.
   */
  calculateCommission(operation) {
    let commission;
    if (operation.type === 'cash_in') {
      commission = this.calculateCashInCommission(operation.operation.amount);
    } else if (operation.type === 'cash_out') {
      commission = this.calculateCashOutCommission(
        operation.operation.amount,
        operation.user_type,
        operation.user_id,
        operation.date,
      );
    }
    return (Math.ceil(commission * 100) / 100);
  }
}

module.exports = CommissionCalculator;
