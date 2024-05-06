const CashOutJuridicalCommissionStrategy = require('../strategies/CashOutJuridicalCommissionStrategy');

describe('CashOutJuridicalCommissionStrategy', () => {
  let strategy;
  const configurations = {
    cash_out_juridical: {
      percents: 0.3,
      min: {
        amount: 0.5,
      },
    },
  };

  beforeEach(() => {
    strategy = new CashOutJuridicalCommissionStrategy(configurations);
  });

  it('calculates commission correctly when commission is more than minimum amount', () => {
    const amount = 200;
    const expectedCommission = (amount * configurations.cash_out_juridical.percents) / 100;
    expect(strategy.calculate(amount)).toBe(expectedCommission);
  });

  it('returns minimum commission when calculated commission is less than minimum amount', () => {
    const amount = 100;
    const expectedCommission = configurations.cash_out_juridical.min.amount;
    expect(strategy.calculate(amount)).toBe(expectedCommission);
  });

  it('returns zero commission when amount is zero', () => {
    const amount = 0;
    const expectedCommission = 0.5;
    expect(strategy.calculate(amount)).toBe(expectedCommission);
  });
});
