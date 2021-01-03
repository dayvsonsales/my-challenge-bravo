import ICurrencyRepository from '@domain/ICurrencyRepository';
import AppError from '@errors/AppError';
import IListCurrencyService from '@services/IListCurrencyService';
import { injectable, inject } from 'tsyringe';

@injectable()
class ListCurrencyService implements IListCurrencyService {
  constructor(
    @inject('CurrencyRepository')
    private currencyRepository: ICurrencyRepository,
  ) {}

  async exists(
    currencyFrom: string,
    currencyTo: string,
  ): Promise<void | AppError> {
    const exists = await this.currencyRepository.findByName([
      currencyFrom.toUpperCase(),
      currencyTo.toUpperCase(),
    ]);

    if (currencyFrom === currencyTo) {
      if (exists?.length == 0) {
        throw new AppError("One or two currencies doesn't exist", 404);
      }
      return;
    }

    if (!exists || exists.length < 2) {
      throw new AppError("One or two currencies doesn't exist", 404);
    }
  }
}

export default ListCurrencyService;
