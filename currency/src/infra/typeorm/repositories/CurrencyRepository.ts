import ICurrencyRepository from '@domain/ICurrencyRepository';
import { getRepository, Repository } from 'typeorm';
import Currency from '@entities/Currency';
import AppError from '@errors/AppError';

class CurrencyRepository implements ICurrencyRepository {
  private ormRepository: Repository<Currency>;

  constructor() {
    this.ormRepository = getRepository(Currency);
  }

  async findById(id: string): Promise<Currency | undefined> {
    const currencies = await this.ormRepository.findOne(id);

    return currencies;
  }

  async findByName(name: string): Promise<Currency | undefined> {
    const currencies = await this.ormRepository.find({
      where: {
        name,
      },
    });

    return currencies[0];
  }

  async find(): Promise<Currency[]> {
    const currencies = await this.ormRepository.find();

    return currencies;
  }

  async create(
    data: Omit<Currency, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Currency> {
    const currency = await this.ormRepository.create(data);
    const response = await this.ormRepository.save(currency);

    return response;
  }

  async delete(id: string): Promise<string> {
    const currency = await this.ormRepository.findOne(id);

    if (!currency) {
      throw new AppError('Currency id not found', 404);
    }

    await this.ormRepository.remove(currency);

    return id;
  }

  async save(currency: Currency): Promise<Currency> {
    const data = await this.ormRepository.save(currency);

    return data;
  }
}

export default CurrencyRepository;
