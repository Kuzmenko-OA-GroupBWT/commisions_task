/**
 * This is an abstract class that represents a commission strategy.
 * It provides a base structure for different types of commission strategies.
 * Each strategy should implement the `calculate` method.
 */
class CommissionStrategy {
  /**
   * This method should be implemented by subclasses to calculate the commission.
   * @throws {Error} If the method is not implemented by a subclass.
   */
  // eslint-disable-next-line class-methods-use-this
  calculate() {
    throw new Error('Method calculate() must be implemented');
  }
}

module.exports = CommissionStrategy;
