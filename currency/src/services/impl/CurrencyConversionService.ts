import { container, inject, injectable } from 'tsyringe';

import ICurrencyConversionService from '../ICurrencyConversionService';

import cacheConfig from '@config/cache';
import ICacheProvider from '@providers/CacheProvider/ICacheProvider';
import CurrencyCache from '@domain/CurrencyCache';
import ICurrencyConverterProvider from '@providers/CurrencyConverterProvider/ICurrencyConverterProvider';
import CurrencyConversionResponse from '@domain/CurrencyConversionResponse';
import ListCurrencyService from './ListCurrencyService';

@injectable()
class CurrencyConversionService implements ICurrencyConversionService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('CurrencyConverterProvider')
    private currencyConverterProvider: ICurrencyConverterProvider,
  ) {}

  async convert(
    from: string,
    to: string,
    amount: number,
  ): Promise<CurrencyConversionResponse> {
    const listCurrencyService = container.resolve(ListCurrencyService);

    await listCurrencyService.exists(from, to);

    const conversionCache = await this.getConversionsInCache(
      `${from}-${to}`,
      amount,
    );

    if (conversionCache) {
      return conversionCache;
    }

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

  private async getConversionsInCache(
    key: string,
    amount: number,
  ): Promise<CurrencyConversionResponse | null> {
    const cache = (await this.cacheProvider.get(key)) as CurrencyCache;

    if (
      cache &&
      amount === cache.conversion.amountFrom &&
      new Date().getTime() - new Date(cache.date).getTime() <
        Number(cacheConfig.resetTime) * 1000
    ) {
      return cache.conversion;
    }

    return null;
  }
}

export default CurrencyConversionService;
