const CashOutNaturalCommissionStrategy = require('../strategies/CashOutNaturalCommissionStrategy');

describe('CashOutNaturalCommissionStrategy', () => {
  let strategy;

  beforeEach(() => {
    const configurations = {
      cash_out_natural: {
        week_limit: {
          amount: 1000,
        },
        percents: 0.3,
      },
    };
    strategy = new CashOutNaturalCommissionStrategy(configurations);
  });

  it('calculates zero commission for amount within weekly limit', () => {
    const commission = strategy.calculate(500, 'user1', new Date('2022-01-01'));
    expect(commission).toBe(0);
  });

  it('calculates commission for amount exceeding weekly limit', () => {
    strategy.calculate(1000, 'user1', new Date('2022-01-01'));
    const commission = strategy.calculate(500, 'user1', new Date('2022-01-01'));
    expect(commission).toBe(1.5);
  });

  it('resets weekly total for new week', () => {
    strategy.calculate(1000, 'user1', new Date('2022-01-01'));
    const commission = strategy.calculate(500, 'user1', new Date('2022-01-08')); // new week
    expect(commission).toBe(0);
  });
});
