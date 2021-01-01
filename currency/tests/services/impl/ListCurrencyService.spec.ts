import FakeCurrencyRepository from '../../repositories/fakes/FakeCurrencyRepository';
import ListCurrencyService from '@services/impl/ListCurrencyService';
import AppError from '@errors/AppError';

describe('List Currency Service', () => {
  test('validate that currencies exists in repository', async () => {
    const fakeCurrencyRepository = new FakeCurrencyRepository();
    const listCurrencyService = new ListCurrencyService(fakeCurrencyRepository);

    await fakeCurrencyRepository.create({
      name: 'USD',
    });

    await fakeCurrencyRepository.create({
      name: 'BRL',
    });

    const exists = await listCurrencyService.exists('USD', 'BRL');

    expect(exists).resolves;
  });

  test('validate that currencies do not exists in repository', async () => {
    const fakeCurrencyRepository = new FakeCurrencyRepository();
    const listCurrencyService = new ListCurrencyService(fakeCurrencyRepository);

    await fakeCurrencyRepository.create({
      name: 'USD',
    });

    expect(listCurrencyService.exists('USD', 'BRL')).rejects.toBeInstanceOf(
      AppError,
    );
    expect(listCurrencyService.exists('BRL', 'USD')).rejects.toBeInstanceOf(
      AppError,
    );
    expect(listCurrencyService.exists('ETH', 'BTC')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
