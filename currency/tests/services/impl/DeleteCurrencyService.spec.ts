import FakeCurrencyRepository from '../../repositories/fakes/FakeCurrencyRepository';
import DeleteCurrencyService from '@services/impl/DeleteCurrencyService';
import AppError from '@errors/AppError';

describe('Delete Currency Service', () => {
  it('shoud be able to delete a currency', async () => {
    const fakeCurrencyRepository = new FakeCurrencyRepository();
    const deleteCurrencyService = new DeleteCurrencyService(
      fakeCurrencyRepository,
    );

    const { id } = await fakeCurrencyRepository.create({ name: 'USD' });

    const result = await deleteCurrencyService.execute(id as string);

    expect(result).toEqual(id);
  });

  it("should not be able to delete a currency that doesn't exists", async () => {
    const fakeCurrencyRepository = new FakeCurrencyRepository();
    const deleteCurrencyService = new DeleteCurrencyService(
      fakeCurrencyRepository,
    );

    expect(deleteCurrencyService.execute('unknown')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
