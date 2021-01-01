import Currency from '../../entities/Currency';
import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

export default class PopulateCurrencyTable implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    for (let i = 0; i < 5; i++) {
      await factory(Currency)(i).create();
    }
  }
}
