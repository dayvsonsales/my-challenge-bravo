import FakeCurrencyRepository from '../../repositories/fakes/FakeCurrencyRepository';
import ListCurrencyService from '@services/impl/ListCurrencyService';
import AppError from '@errors/AppError';

describe('List Currency Service', () => {
  it('should be able to return all currencies', async () => {
    const fakeCurrencyRepository = new FakeCurrencyRepository();
    const listCurrencyService = new ListCurrencyService(fakeCurrencyRepository);

    await fakeCurrencyRepository.create({
      name: 'BRL',
    });

    const exists = await listCurrencyService.findAll();

    expect(exists).toEqual([
      expect.objectContaining({
        name: 'BRL',
      }),
    ]);
  });

  test('validate when from is equal to to', async () => {
    const fakeCurrencyRepository = new FakeCurrencyRepository();
    const listCurrencyService = new ListCurrencyService(fakeCurrencyRepository);

    await fakeCurrencyRepository.create({
      name: 'BRL',
    });

    const exists = await listCurrencyService.exists('BRL', 'BRL');

    expect(exists).resolves;
  });

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
    expect(listCurrencyService.exists('AAA', 'AAA')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
