import Currency from '@domain/Currency';

import ICurrencyRepository from '@domain/ICurrencyRepository';
import AppError from '@errors/AppError';
import IUpdateCurrencyService from '@services/IUpdateCurrencyService';
import { injectable, inject } from 'tsyringe';

@injectable()
class UpdateCurrencyService implements IUpdateCurrencyService {
  constructor(
    @inject('CurrencyRepository')
    private currencyRepository: ICurrencyRepository,
  ) {}

  async execute(
    id: string,
    { name, description }: Omit<Currency, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Currency> {
    const currentCurrency = await this.currencyRepository.findById(id);

    if (!currentCurrency) {
      throw new AppError('Invalid currency id');
    }

    const existsCurrency = await this.currencyRepository.findByName(name);

    if (existsCurrency && existsCurrency.name !== currentCurrency.name) {
      throw new AppError('Currency already exists');
    }

    const data = await this.currencyRepository.save({
      id,
      name,
      description,
    });

    return data;
  }
}

export default UpdateCurrencyService;
