import AppError from '@errors/AppError';

export default interface IListCurrencyService {
  exists(currencyFrom: string, currencyTo: string): Promise<void | AppError>;
}
