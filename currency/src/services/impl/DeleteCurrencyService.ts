import ICurrencyRepository from '@domain/ICurrencyRepository';
import IDeleteCurrencyService from '@services/IDeleteCurrencyService';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteCurrencyService implements IDeleteCurrencyService {
  constructor(
    @inject('CurrencyRepository')
    private currencyRepository: ICurrencyRepository,
  ) {}

  async execute(id: string): Promise<string> {
    const data = await this.currencyRepository.delete(id);

    return data;
  }
}

export default DeleteCurrencyService;
