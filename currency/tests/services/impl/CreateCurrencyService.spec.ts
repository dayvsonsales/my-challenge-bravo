import FakeCurrencyRepository from '../../repositories/fakes/FakeCurrencyRepository';
import CreateCurrencyService from '@services/impl/CreateCurrencyService';
import AppError from '@errors/AppError';

describe('Create Currency Service', () => {
  it('shoud be able to create a currency', async () => {
    const fakeCurrencyRepository = new FakeCurrencyRepository();
    const createCurrencyService = new CreateCurrencyService(
      fakeCurrencyRepository,
    );

    const currency = await createCurrencyService.execute({
      name: 'USD',
      description: 'Dolar',
    });

    const currency2 = await createCurrencyService.execute({
      name: 'EUR',
    });

    expect(currency).toEqual(
      expect.objectContaining({
        name: 'USD',
        description: 'Dolar',
      }),
    );

    expect(currency2).toEqual(
      expect.objectContaining({
        name: 'EUR',
      }),
    );
  });

  it('should not be able to create a currency that already exists', async () => {
    const fakeCurrencyRepository = new FakeCurrencyRepository();
    const createCurrencyService = new CreateCurrencyService(
      fakeCurrencyRepository,
    );

    const currency = await createCurrencyService.execute({
      name: 'USD',
      description: 'Dolar',
    });

    expect(currency).toEqual(
      expect.objectContaining({
        name: 'USD',
        description: 'Dolar',
      }),
    );

    expect(
      createCurrencyService.execute({
        name: 'USD',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
