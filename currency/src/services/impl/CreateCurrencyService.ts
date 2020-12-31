import Currency from '@domain/Currency';
import ICurrencyRepository from '@domain/ICurrencyRepository';
import AppError from '@errors/AppError';
import ICreateCurrencyService from '@services/ICreateCurrencyService';
import { injectable, inject } from 'tsyringe';

@injectable()
class CreateCurrencyService implements ICreateCurrencyService {
  constructor(
    @inject('CurrencyRepository')
    private currencyRepository: ICurrencyRepository,
  ) {}

  async execute(data: Currency): Promise<Currency> {
    const { name } = data;

    const existsCurrency = await this.currencyRepository.findByName(name);

    if (existsCurrency) {
      throw new AppError('Currency already exists');
    }

    const currency = await this.currencyRepository.create(data);

    return currency;
  }
}

export default CreateCurrencyService;
