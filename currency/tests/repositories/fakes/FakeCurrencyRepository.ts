import Currency from '@domain/Currency';
import ICurrencyRepository from '@domain/ICurrencyRepository';
import AppError from '@errors/AppError';

export default class FakeCurrencyRepository implements ICurrencyRepository {
  private currencies: Currency[];

  constructor() {
    this.currencies = [];
  }

  async find(): Promise<Currency[]> {
    return this.currencies;
  }

  async findById(id: string): Promise<Currency | undefined> {
    const currencies = this.currencies.find(v => v.id === id);

    return currencies;
  }

  async findByName(names: string[]): Promise<Currency[]> {
    return this.currencies.filter(v => names.includes(v.name));
  }

  async create(data: Currency): Promise<Currency> {
    data.id = `id-${Math.random()}`;

    this.currencies.push(data);

    return data;
  }

  async delete(id: string): Promise<string> {
    const index = this.currencies.findIndex(v => v.id === id);

    if (index === -1) {
      throw new AppError('Not found');
    }

    this.currencies.slice(index, 1);

    return id;
  }

  async save(currency: Currency): Promise<Currency> {
    const index = this.currencies.findIndex(v => v.id === currency.id);

    this.currencies[index] = currency;

    return this.currencies[index];
  }
}
