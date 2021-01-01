import Currency from '../../entities/Currency';
import { define } from 'typeorm-seeding';

define(Currency, (_: object, option: number | undefined) => {
  const currencies = [
    { name: 'USD', description: 'North American Dollar' },
    { name: 'BRL', description: 'Brazilian Real' },
    { name: 'EUR', description: 'Union European money' },
    { name: 'ETH', description: 'Ethereum crypto' },
    { name: 'BTC', description: 'Bitcoin' },
  ];

  if (option) {
    const currency = new Currency();

    currency.name = currencies[option].name;
    currency.description = currencies[option].description;

    return currency;
  }
});
