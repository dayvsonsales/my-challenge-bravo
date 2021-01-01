import AppError from '@errors/AppError';
import UpdateCurrencyService from '@services/impl/UpdateCurrencyService';
import FakeCurrencyRepository from '../../repositories/fakes/FakeCurrencyRepository';

describe('Update Currency Service', () => {
  it('should be able to update an existing currency', async () => {
    const fakeCurrencyRepository = new FakeCurrencyRepository();

    const updateCurrencyService = new UpdateCurrencyService(
      fakeCurrencyRepository,
    );

    const data = await fakeCurrencyRepository.create({
      name: 'USD',
      description: 'Brazilian',
    });

    const updatedCurrency = await updateCurrencyService.execute(
      data.id as string,
      {
        name: 'USD',
        description: 'Dolar',
      },
    );

    expect(updatedCurrency).toEqual(
      expect.objectContaining({
        name: 'USD',
        description: 'Dolar',
      }),
    );
  });

  it('should not be able to update a non existing currency', async () => {
    const fakeCurrencyRepository = new FakeCurrencyRepository();

    const updateCurrencyService = new UpdateCurrencyService(
      fakeCurrencyRepository,
    );

    expect(
      updateCurrencyService.execute('unknown', {
        name: 'USD',
        description: 'Dolar',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update with an existing currency name', async () => {
    const fakeCurrencyRepository = new FakeCurrencyRepository();

    const updateCurrencyService = new UpdateCurrencyService(
      fakeCurrencyRepository,
    );

    await fakeCurrencyRepository.create({
      name: 'USD',
      description: 'Dolar',
    });

    const data2 = await fakeCurrencyRepository.create({
      name: 'ETH',
      description: 'Brazilian',
    });

    expect(
      updateCurrencyService.execute(data2.id as string, {
        name: 'USD',
        description: 'Dolar',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
