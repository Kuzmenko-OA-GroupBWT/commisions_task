const CommissionCalculator = require('../CommissionCalculator');

/**
 * Test suite for the CommissionCalculator class.
 */
describe('CommissionCalculator', () => {
  let calculator;
  /**
   * Configurations for the commission calculations.
   * @type {Object}
   */
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

  /**
   * Setup for each test case. Initializes a new CommissionCalculator instance.
   */
  beforeEach(() => {
    calculator = new CommissionCalculator(configurations);
  });

  /**
   * Test suite for the calculateCashInCommission method.
   */
  describe('calculateCashInCommission', () => {
    /**
     * Test case for standard cash in operation.
     */
    it('returns correct commission for cash in operation', () => {
      expect(calculator.calculateCashInCommission(100)).toBe(0.03);
    });

    /**
     * Test case for cash in operation where the calculated commission exceeds the maximum limit.
     */
    it('returns max commission if calculated commission is more than max', () => {
      expect(calculator.calculateCashInCommission(200000)).toBe(5.00);
    });
  });

  /**
   * Test suite for the calculateCashOutCommission method.
   */
  describe('calculateCashOutCommission', () => {
    /**
     * Test case for a cash-out operation for a natural user type.
     */
    it('returns correct commission for natural user type', () => {
      expect(calculator.calculateCashOutCommission(1000, 'natural')).toBe(3.00);
    });

    /**
     * Test case for a cash-out operation for a juridical user type.
     */
    it('returns correct commission for juridical user type', () => {
      expect(calculator.calculateCashOutCommission(1000, 'juridical')).toBe(3.00);
    });

    /**
     * Test case for a cash-out operation for a juridical user type where the calculated commission
     * is below the minimum limit.
     */
    it('returns min commission if calculated commission is less than min for juridical user type', () => {
      expect(calculator.calculateCashOutCommission(100, 'juridical')).toBe(0.50);
    });
  });

  /**
   * Test suite for the calculateCommission method.
   */
  describe('calculateCommission', () => {
    /**
     * Test case for cash in operation.
     */
    it('returns correct commission for cash in operation', () => {
      const operation = {
        type: 'cash_in',
        operation: {
          amount: 100,
        },
      };
      expect(calculator.calculateCommission(operation)).toBe(0.03);
    });

    /**
     * Test case for a cash-out operation for a natural user type.
     */
    it('returns correct commission for cash out operation for natural user type', () => {
      const operation = {
        type: 'cash_out',
        operation: {
          amount: 1000,
        },
        user_type: 'natural',
      };
      expect(calculator.calculateCommission(operation)).toBe(3.00);
    });

    /**
     * Test case for a cash-out operation for a juridical user type.
     */
    it('returns correct commission for cash out operation for juridical user type', () => {
      const operation = {
        type: 'cash_out',
        operation: {
          amount: 1000,
        },
        user_type: 'juridical',
      };
      expect(calculator.calculateCommission(operation)).toBe(3.00);
    });
  });
});
