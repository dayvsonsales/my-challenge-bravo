import AppError from '@errors/AppError';
import IListCurrencyService from '@services/IListCurrencyService';

export default class FakeListCurrencyService implements IListCurrencyService {
  async exists(
    currencyFrom: string,
    currencyTo: string,
  ): Promise<void | AppError> {
    if (currencyFrom !== 'USD' && currencyTo !== 'BRL') {
      throw new AppError('Not exists');
    }
  }
}
