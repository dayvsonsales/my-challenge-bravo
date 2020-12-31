import Currency from './Currency';

export default interface ICurrencyRepository {
  find(): Promise<Currency[]>;
  findById(id: string): Promise<Currency | undefined>;
  findByName(name: string): Promise<Currency | undefined>;
  create(data: Currency): Promise<Currency>;
  delete(id: string): Promise<string>;
  save(currency: Currency): Promise<Currency>;
}
