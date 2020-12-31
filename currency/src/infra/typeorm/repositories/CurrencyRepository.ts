import ICurrencyRepository from '@domain/ICurrencyRepository';
import { getRepository, Repository } from 'typeorm';
import Currency from '@entities/Currency';

class CurrencyRepository implements ICurrencyRepository {
  private ormRepository: Repository<Currency>;

  constructor() {
    this.ormRepository = getRepository(Currency);
  }

  find(): Promise<Currency[]> {
    throw new Error('Method not implemented.');
  }
  create(data: Currency): Promise<Currency> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  save(currency: Currency): Promise<Currency> {
    throw new Error('Method not implemented.');
  }
}

export default CurrencyRepository;
