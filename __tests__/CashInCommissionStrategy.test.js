const CashInCommissionStrategy = require('../strategies/CashInCommissionStrategy');

describe('CashInCommissionStrategy', () => {
  describe('calculate', () => {
    it('calculates commission correctly when below max amount', () => {
      const configurations = {
        cash_in: {
          percents: 0.03,
          max: {
            amount: 5.00,
          },
        },
      };
      const cashInCommissionStrategy = new CashInCommissionStrategy(configurations);
      const commission = cashInCommissionStrategy.calculate(100);
      expect(commission).toBe(0.03);
    });

    it('limits commission to max amount when calculated commission is above max', () => {
      const configurations = {
        cash_in: {
          percents: 0.03,
          max: {
            amount: 5.00,
          },
        },
      };
      const cashInCommissionStrategy = new CashInCommissionStrategy(configurations);
      const commission = cashInCommissionStrategy.calculate(200);
      expect(commission).toBe(0.06);
    });
  });
});
