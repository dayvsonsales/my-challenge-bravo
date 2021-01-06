import Currency from '@domain/Currency';
import ICurrencyRepository from '@domain/ICurrencyRepository';
import AppError from '@errors/AppError';
import IListCurrencyService from '@services/IListCurrencyService';

export default class FakeListCurrencyService implements IListCurrencyService {
  constructor(private currencyRepository: ICurrencyRepository) {}

  async findAll(): Promise<Currency[]> {
    const currencies = await this.currencyRepository.find();

    return currencies;
  }

  async exists(
    currencyFrom: string,
    currencyTo: string,
  ): Promise<void | AppError> {
    if (currencyFrom !== 'USD' && currencyTo !== 'BRL') {
      throw new AppError('Not exists');
    }
  }
}
