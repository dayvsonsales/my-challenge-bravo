import Currency from '@domain/Currency';

export default interface IUpdateCurrencyService {
  execute(id: string, data: Currency): Promise<Currency>;
}
