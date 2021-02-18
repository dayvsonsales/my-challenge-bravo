import { inject, injectable, singleton } from 'tsyringe';

import CircuitBreaker from 'opossum';
import Cache from '@domain/CurrencyCache';
import AppError from '@errors/AppError';

import ICurrencyConversionService from '../ICurrencyConversionService';
import ICacheProvider from '@providers/CacheProvider/ICacheProvider';

import CurrencyConversionResponse from '@domain/CurrencyConversionResponse';
import IListCurrencyService from '@services/IListCurrencyService';

const circuitBreakerOptions = {
  errorThresholdPercentage: 50,
  timeout: 10000,
  resetTimeout: 5000,
};

@injectable()
@singleton()
class CurrencyConversionServiceProxy {
  private circuitBreaker: CircuitBreaker;

  constructor(
    @inject('CurrencyConversionService')
    private currencyConversionService: ICurrencyConversionService,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('ListCurrencyService')
    private listCurrencyService: IListCurrencyService,
  ) {
    this.setupCircuits();
  }

  private setupCircuits(): void {
    this.circuitBreaker = new CircuitBreaker(
      (from: string, to: string, amount: number) =>
        this.currencyConversionService.convert(from, to, amount),
      circuitBreakerOptions,
    );

    this.circuitBreaker.on('open', () => console.log('Circuit is open now'));
    this.circuitBreaker.on('halfOpen', () =>
      console.log('Circuit is half open now'),
    );
    this.circuitBreaker.on('close', () => console.log('Circuit is closed'));
    this.circuitBreaker.fallback((from, to, amount, err) => {
      return this.handleFallback(from, to, amount, err);
    });
  }

  async convert(
    from: string,
    to: string,
    amount: number,
  ): Promise<CurrencyConversionResponse> {
    await this.listCurrencyService.exists(from, to);

    const conversionCache = await this.getConversionInCache(
      `${from}-${to}`,
      amount,
    );

    if (conversionCache) {
      return conversionCache;
    }

    const conversion = (await this.circuitBreaker.fire(
      from,
      to,
      amount,
    )) as CurrencyConversionResponse;

    return conversion;
  }

  private async handleFallback(
    from: string,
    to: string,
    amount: number,
    err: any,
  ): Promise<CurrencyConversionResponse | AppError> {
    if (err && err instanceof AppError && err.statusCode === 404) {
      this.circuitBreaker.close();

      throw new AppError(err.message, err.statusCode);
    }

    if (err && err.response?.status === 404) {
      this.circuitBreaker.close();

      throw new AppError(
        `Cannot convert ${from} to ${to}`,
        err.response.status,
      );
    }

    const cached = await this.getConversionInCache(
      `${from}-${to}`,
      amount,
      true,
    );

    if (!cached) {
      throw new AppError(
        'The internal service API is down. Try again later.',
        500,
      );
    }

    return cached;
  }

  private async getConversionInCache(
    key: string,
    amount: number,
    outdated: boolean = false,
  ): Promise<CurrencyConversionResponse | null> {
    const cachedData = (await this.cacheProvider.get(key)) as Cache;

    if (cachedData) {
      if (
        amount === cachedData.conversion.amountFrom &&
        this.cacheProvider.isValid(cachedData.date)
      ) {
        return cachedData.conversion;
      }

      if (this.cacheProvider.isValid(cachedData.date)) {
        cachedData.conversion.resultTo = cachedData.conversion.bid * amount;

        return cachedData.conversion;
      }

      if (!outdated) {
        return null;
      }

      cachedData.conversion.outdated = true;
      cachedData.conversion.resultTo = cachedData.conversion.bid * amount;

      return cachedData.conversion;
    }

    return null;
  }
}

export default CurrencyConversionServiceProxy;
