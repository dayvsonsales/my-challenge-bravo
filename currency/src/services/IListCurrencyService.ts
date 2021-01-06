import Currency from '@domain/Currency';
import AppError from '@errors/AppError';

export default interface IListCurrencyService {
  findAll(): Promise<Currency[]>;
  exists(currencyFrom: string, currencyTo: string): Promise<void | AppError>;
}
