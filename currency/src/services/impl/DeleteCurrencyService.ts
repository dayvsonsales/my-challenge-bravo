import ICurrencyRepository from '@domain/ICurrencyRepository';
import AppError from '@errors/AppError';
import IDeleteCurrencyService from '@services/IDeleteCurrencyService';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteCurrencyService implements IDeleteCurrencyService {
  constructor(
    @inject('CurrencyRepository')
    private currencyRepository: ICurrencyRepository,
  ) {}

  async execute(id: string): Promise<string> {
    try {
      await this.currencyRepository.findById(id);
      await this.currencyRepository.delete(id);

      return id;
    } catch (e) {
      throw new AppError('The currency was not deleted', 500);
    }
  }
}

export default DeleteCurrencyService;
