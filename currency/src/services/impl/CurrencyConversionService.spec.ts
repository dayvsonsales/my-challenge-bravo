import AppError from '@errors/AppError';
import FakeCacheProvider from '@providers/CacheProvider/fakes/FakeCacheProvider';
import FakeCurrencyConverterProvider from '@providers/CurrencyConverterProvider/fakes/FakeCurrencyConverterProvider';
import CurrencyConversionService from './CurrencyConversionService';

describe('Convert currency', () => {
  it('should be able to convert with valid currencies', async () => {
    const fakeCacheProvider = new FakeCacheProvider();
    const fakeCurrencyProvider = new FakeCurrencyConverterProvider();
    const currencyConversionService = new CurrencyConversionService(
      fakeCacheProvider,
      fakeCurrencyProvider,
    );

    const response = await currencyConversionService.convert('USD', 'BRL', 3);

    expect(response).toEqual({
      bid: 5.14,
      from: 'USD',
      to: 'BRL',
      amountFrom: 3,
      resultTo: 5.14 * 3,
      retrieveDate: new Date('2020-12-20'),
    });
  });

  it('should not be able to convert with invalid currency', async () => {
    const fakeCacheProvider = new FakeCacheProvider();
    const fakeCurrencyProvider = new FakeCurrencyConverterProvider();
    const currencyConversionService = new CurrencyConversionService(
      fakeCacheProvider,
      fakeCurrencyProvider,
    );

    expect(
      currencyConversionService.convert('Unknown', 'BRL', 3),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to return cached conversion', async () => {
    const fakeCacheProvider = new FakeCacheProvider();
    const fakeCurrencyProvider = new FakeCurrencyConverterProvider();
    const currencyConversionService = new CurrencyConversionService(
      fakeCacheProvider,
      fakeCurrencyProvider,
    );

    const from = 'USD';
    const to = 'BR';

    const expectedResponse = {
      bid: 5.14,
      from,
      to,
      amountFrom: 3,
      resultTo: 5.14 * 3,
      retrieveDate: new Date('2020-12-20'),
    };

    await fakeCacheProvider.set(`${from}-${to}`, {
      conversion: expectedResponse,
      date: new Date(),
    });

    const response = await currencyConversionService.convert(from, to, 3);

    expect(response).toEqual(expectedResponse);
  });
});
