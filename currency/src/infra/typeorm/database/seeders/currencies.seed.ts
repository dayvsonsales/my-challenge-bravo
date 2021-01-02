import Currency from '../../entities/Currency';
import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

export default class PopulateCurrencyTable implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Currency)
      .values([
        { name: 'USD', description: 'North American Dollar' },
        { name: 'BRL', description: 'Brazilian Real' },
        { name: 'EUR', description: 'Union European money' },
        { name: 'ETH', description: 'Ethereum crypto' },
        { name: 'BTC', description: 'Bitcoin' },
      ])
      .execute();
  }
}
