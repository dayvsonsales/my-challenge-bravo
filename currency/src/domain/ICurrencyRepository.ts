import Currency from './Currency';

export default interface ICurrencyRepository {
  find(): Promise<Currency[]>;
  create(data: Currency): Promise<Currency>;
  delete(id: string): Promise<string>;
  save(currency: Currency): Promise<Currency>;
}
