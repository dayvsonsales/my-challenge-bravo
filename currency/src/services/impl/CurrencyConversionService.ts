import { inject, injectable } from 'tsyringe';

import ICurrencyConversionService from '../ICurrencyConversionService';

import ICacheProvider from '@providers/CacheProvider/ICacheProvider';
import ICurrencyConverterProvider from '@providers/CurrencyConverterProvider/ICurrencyConverterProvider';
import CurrencyConversionResponse from '@domain/CurrencyConversionResponse';
import IListCurrencyService from '@services/IListCurrencyService';

@injectable()
class CurrencyConversionService implements ICurrencyConversionService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('CurrencyConverterProvider')
    private currencyConverterProvider: ICurrencyConverterProvider,

    @inject('ListCurrencyService')
    private listCurrencyService: IListCurrencyService,
  ) {}

  async convert(
    from: string,
    to: string,
    amount: number,
  ): Promise<CurrencyConversionResponse> {
    await this.listCurrencyService.exists(from, to);

    const conversionResponse = await this.currencyConverterProvider.convert(
      from,
      to,
      amount,
    );

    await this.cacheProvider.set(`${from}-${to}`, {
      conversion: conversionResponse,
      date: new Date(),
    });

    return conversionResponse;
  }
}

export default CurrencyConversionService;
