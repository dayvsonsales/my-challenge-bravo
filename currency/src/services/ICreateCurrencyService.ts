import Currency from '@domain/Currency';

export default interface ICreateCurrencyService {
  execute(
    data: Omit<Currency, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Currency>;
}
