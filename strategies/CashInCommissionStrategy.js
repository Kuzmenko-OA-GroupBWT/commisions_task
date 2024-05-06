/**
 * Module dependencies.
 * @private
 */
const CommissionStrategy = require('./CommissionStrategy');

/**
 * CashInCommissionStrategy class.
 * This class extends the CommissionStrategy class and provides
 * a method to calculate the commission for cash in operations.
 * @extends CommissionStrategy
 */
class CashInCommissionStrategy extends CommissionStrategy {
  /**
   * Create a CashInCommissionStrategy.
   * @param {Object} configurations - The configurations for cash in operations.
   */
  constructor(configurations) {
    super();
    this.configurations = configurations;
  }

  /**
   * Calculate the commission for cash in operation.
   * The commission is calculated as a percentage of the amount.
   * If the calculated commission exceeds the maximum allowed commission,
   * the maximum commission is returned.
   * @param {number} amount - The amount for which to calculate the commission.
   * @return {number} The calculated commission.
   */
  calculate(amount) {
    let commission = (amount * this.configurations.cash_in.percents) / 100;
    commission = commission > this.configurations.cash_in.max.amount
      ? this.configurations.cash_in.max.amount
      : commission;
    return commission;
  }
}

module.exports = CashInCommissionStrategy;
