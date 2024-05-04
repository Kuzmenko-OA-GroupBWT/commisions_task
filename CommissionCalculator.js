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
    return Number(commission.toFixed(2));
  }

  /**
   * Calculates the commission for a cash-out operation.
   * @param {number} amount - The amount of cash-out operation.
   * @param {string} userType - The type of user (natural or juridical).
   * @returns {number} The calculated commission.
   */
  calculateCashOutCommission(amount, userType) {
    let commission;
    if (userType === 'natural') {
      commission = (amount * this.configurations.cash_out_natural.percents) / 100;
      commission = commission > this.configurations.cash_out_natural.week_limit.amount
        ? this.configurations.cash_out_natural.week_limit.amount
        : commission;
    } else if (userType === 'juridical') {
      commission = (amount * this.configurations.cash_out_juridical.percents) / 100;
      commission = commission < this.configurations.cash_out_juridical.min.amount
        ? this.configurations.cash_out_juridical.min.amount
        : commission;
    }
    return Number(commission.toFixed(2));
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
      commission = this.calculateCashOutCommission(operation.operation.amount, operation.user_type);
    }
    return Number(commission.toFixed(2));
  }
}

module.exports = CommissionCalculator;
