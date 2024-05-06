const CashInCommissionStrategy = require('./strategies/CashInCommissionStrategy');
const CashOutNaturalCommissionStrategy = require('./strategies/CashOutNaturalCommissionStrategy');
const CashOutJuridicalCommissionStrategy = require('./strategies/CashOutJuridicalCommissionStrategy');

/**
 * CommissionCalculator class is used to calculate commissions based on different strategies.
 */
class CommissionCalculator {
  /**
   * Constructs a new instance of CommissionCalculator.
   * @param {Object} configurations - The configurations for the commission strategies.
   */
  constructor(configurations) {
    /**
     * An object that holds instances of different commission strategies.
     */
    this.strategies = {
      cash_in: new CashInCommissionStrategy(configurations),
      cash_out_natural: new CashOutNaturalCommissionStrategy(configurations),
      cash_out_juridical: new CashOutJuridicalCommissionStrategy(configurations),
    };
  }

  /**
   * Calculates the commission based on the operation type and user type.
   * @param {Object} operation - The operation details.
   * @returns {string} The calculated commission,
   * rounded up to the nearest cent and formatted as a string with two decimal places.
   */
  calculateCommission(operation) {
    const strategy = this.strategies[`${operation.type}_${operation.user_type}`]
        || this.strategies[operation.type];
    const commission = strategy.calculate(
      operation.operation.amount,
      operation.user_id,
      operation.date,
    );
    return (Math.ceil(commission * 100) / 100).toFixed(2);
  }
}

/**
 * Exports the CommissionCalculator class.
 */
module.exports = CommissionCalculator;
