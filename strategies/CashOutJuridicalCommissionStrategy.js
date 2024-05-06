/**
 * The `CommissionStrategy` module is required to provide the base
 * class for the `CashOutJuridicalCommissionStrategy`.
 */
const CommissionStrategy = require('./CommissionStrategy');

/**
 * `CashOutJuridicalCommissionStrategy` is a class that extends `CommissionStrategy`.
 * It provides a method to calculate the commission for cash-out operations for juridical entities.
 */
class CashOutJuridicalCommissionStrategy extends CommissionStrategy {
  /**
   * Constructs a new `CashOutJuridicalCommissionStrategy` instance.
   * @param {Object} configurations - The configurations for the commission calculation.
   */
  constructor(configurations) {
    super();
    this.configurations = configurations;
  }

  /**
   * Calculates the commission for a given amount.
   * The commission is calculated as a percentage of the amount, as specified in the configurations.
   * If the calculated commission is less than the minimum amount specified in the configurations,
   * the minimum amount is returned instead.
   * @param {number} amount - The amount for which to calculate the commission.
   * @return {number} The calculated commission.
   */
  calculate(amount) {
    let commission = (amount * this.configurations.cash_out_juridical.percents) / 100;
    commission = commission < this.configurations.cash_out_juridical.min.amount
      ? this.configurations.cash_out_juridical.min.amount
      : commission;
    return commission;
  }
}

/**
 * Exports the `CashOutJuridicalCommissionStrategy` class.
 */
module.exports = CashOutJuridicalCommissionStrategy;
