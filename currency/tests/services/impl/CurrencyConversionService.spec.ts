import AppError from '@errors/AppError';
import CurrencyConversionService from '@services/impl/CurrencyConversionService';
import FakeCacheProvider from '../../providers/fakes/FakeCacheProvider';
import FakeCurrencyConverterProvider from '../../providers/fakes/FakeCurrencyConverterProvider';
import FakeListCurrencyService from '../fakes/FakeListCurrencyService';

describe('Convert currency', () => {
  it('should be able to convert with valid currencies', async () => {
    const fakeCacheProvider = new FakeCacheProvider();
    const fakeCurrencyProvider = new FakeCurrencyConverterProvider();
    const fakeListCurrencyService = new FakeListCurrencyService();

    const currencyConversionService = new CurrencyConversionService(
      fakeCacheProvider,
      fakeCurrencyProvider,
      fakeListCurrencyService,
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
    const fakeListCurrencyService = new FakeListCurrencyService();

    const currencyConversionService = new CurrencyConversionService(
      fakeCacheProvider,
      fakeCurrencyProvider,
      fakeListCurrencyService,
    );

    expect(
      currencyConversionService.convert('Unknown', 'BRL', 3),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to return cached conversion', async () => {
    const fakeCacheProvider = new FakeCacheProvider();
    const fakeCurrencyProvider = new FakeCurrencyConverterProvider();
    const fakeListCurrencyService = new FakeListCurrencyService();

    const currencyConversionService = new CurrencyConversionService(
      fakeCacheProvider,
      fakeCurrencyProvider,
      fakeListCurrencyService,
    );

    const from = 'USD';
    const to = 'BRL';

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
