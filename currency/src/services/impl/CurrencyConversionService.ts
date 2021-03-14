import { inject, injectable } from 'tsyringe';

import ICurrencyConversionService from '../ICurrencyConversionService';

import ICacheProvider from '@providers/CacheProvider/ICacheProvider';
import CurrencyConversionResponse from '@domain/CurrencyConversionResponse';
import AppError from '@errors/AppError';
import IListCurrencyService from '@services/IListCurrencyService';

@injectable()
class CurrencyConversionService implements ICurrencyConversionService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('ListCurrencyService')
    private listCurrencyService: IListCurrencyService,
  ) {}

  async convert(
    from: string,
    to: string,
    amount: number,
    ballast: string = 'USD',
  ): Promise<CurrencyConversionResponse> {
    const cached = await this.cacheProvider.get(`${from}-${to}`);

    if (cached) {
      return {
        from,
        to,
        bid: Number(cached),
        ballast,
        amountFrom: amount,
        resultTo: Number((Number(cached) * amount).toPrecision(2)),
        retrieveDate: new Date(),
      };
    }

    await this.listCurrencyService.exists(from, to);

    const getFromCurrencyValue = await this.cacheProvider.get(`USD-${from}`);

    if (!getFromCurrencyValue) {
      throw new AppError('Cannot convert');
    }

    const getToCurrencyValue = await this.cacheProvider.get(`USD-${to}`);

    if (!getToCurrencyValue) {
      throw new AppError('Cannot convert');
    }

    const fromToConversion = getFromCurrencyValue / getToCurrencyValue;

    const response = {
      from,
      to,
      bid: fromToConversion,
      ballast,
      amountFrom: amount,
      resultTo: Number((fromToConversion * amount).toPrecision(2)),
      retrieveDate: new Date(),
    } as CurrencyConversionResponse;

    this.cacheProvider.set(`${from}-${to}`, fromToConversion);

    return response;
  }
}

export default CurrencyConversionService;
