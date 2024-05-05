/**
 * The CommissionCalculator module.
 * @module CommissionCalculator
 */

const CommissionCalculator = require('../CommissionCalculator');
const getWeekNumber = require('../helpers/getWeekNumber');

// Mocking the getWeekNumber helper function
jest.mock('../helpers/getWeekNumber');

/**
 * Test suite for the CommissionCalculator class.
 */
describe('CommissionCalculator', () => {
  let calculator;
  const configurations = {
    cash_in: {
      percents: 0.03,
      max: {
        amount: 5.00,
      },
    },
    cash_out_natural: {
      percents: 0.3,
      week_limit: {
        amount: 1000.00,
      },
    },
    cash_out_juridical: {
      percents: 0.3,
      min: {
        amount: 0.50,
      },
    },
  };

  // Setup for each test case
  beforeEach(() => {
    calculator = new CommissionCalculator(configurations);
  });

  /**
     * Test suite for the calculateCashInCommission method.
     */
  describe('calculateCashInCommission', () => {
    /**
         * Test case: when the amount is below the max amount.
         */
    it('calculates commission correctly when below max amount', () => {
      expect(calculator.calculateCashInCommission(100)).toBe(0.03);
    });

    /**
         * Test case: when the amount exceeds the max amount.
         */
    it('does not exceed max commission amount', () => {
      expect(calculator.calculateCashInCommission(20000)).toBe(5.00);
    });
  });

  /**
     * Test suite for the calculateCashOutCommission method.
     */
  describe('calculateCashOutCommission', () => {
    /**
         * Test case: when the user type is 'natural' and the amount is within the week limit.
         */
    it('calculates commission correctly for natural user type within week limit', () => {
      getWeekNumber.mockReturnValue(1);
      expect(calculator.calculateCashOutCommission(500, 'natural', 1, '2024-01-01')).toBe(0);
    });

    /**
         * Test case: when the user type is 'natural' and the amount exceeds the week limit.
         */
    it('calculates commission correctly for natural user type exceeding week limit', () => {
      getWeekNumber.mockReturnValue(1);
      expect(calculator.calculateCashOutCommission(1500, 'natural', 1, '2024-01-01')).toBe(1.5);
    });

    /**
         * Test case: when the user type is 'juridical'.
         */
    it('calculates commission correctly for juridical user type', () => {
      expect(calculator.calculateCashOutCommission(200, 'juridical', 1, '2024-01-01')).toBe(0.6);
    });

    /**
         * Test case: when the user type is 'juridical' and the amount is below the min amount.
         */
    it('does not go below min commission amount for juridical user type', () => {
      expect(calculator.calculateCashOutCommission(100, 'juridical', 1, '2024-01-01')).toBe(0.5);
    });
  });
});
