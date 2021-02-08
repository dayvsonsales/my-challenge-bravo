import { inject, injectable, singleton } from 'tsyringe';

import CircuitBreaker from 'opossum';
import Cache from '@domain/CurrencyCache';
import AppError from '@errors/AppError';

import ICurrencyConversionService from '../ICurrencyConversionService';
import ICacheProvider from '@providers/CacheProvider/ICacheProvider';

import CurrencyConversionResponse from '@domain/CurrencyConversionResponse';

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
    this.circuitBreaker.fallback((from, to, amount, err) => {
      return this.handleFallback(from, to, amount, err);
    });
  }

  async convert(
    from: string,
    to: string,
    amount: number,
  ): Promise<CurrencyConversionResponse> {
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
    err: Error | AppError,
  ): Promise<CurrencyConversionResponse | AppError> {
    if (err && err instanceof AppError && err.statusCode === 404) {
      this.circuitBreaker.close();

      throw new AppError(err.message, err.statusCode);
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

      cachedData.conversion.resultTo = cachedData.conversion.bid * amount;

      if (outdated) {
        cachedData.conversion.outdated = true;
      }

      return cachedData.conversion;
    }

    return null;
  }
}

export default CurrencyConversionServiceProxy;
