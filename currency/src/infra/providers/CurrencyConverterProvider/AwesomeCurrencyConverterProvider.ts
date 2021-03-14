import ICacheProvider from '@providers/CacheProvider/ICacheProvider';
import ICurrencyConverterProvider from '@providers/CurrencyConverterProvider/ICurrencyConverterProvider';
import IHTTPProvider from '@providers/HTTPProvider/IHTTPProvider';
import { injectable, inject } from 'tsyringe';

export interface CurrenciesResponseAPI {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: Date;
}

const API_URL = 'https://economia.awesomeapi.com.br/json';
const CURRENCIES_ENDPOINT = '/all';

@injectable()
class AwesomeCurrencyConverterProvider implements ICurrencyConverterProvider {
  constructor(
    @inject('HTTPProvider')
    private api: IHTTPProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async updateCurrenciesValues(): Promise<void> {
    const { data: currencies } = await this.api.get(
      `${API_URL}${CURRENCIES_ENDPOINT}`,
    );

    for (let currency in currencies) {
      this.cacheProvider.set(`${currency}-BRL`, currencies[currency].bid);
    }
  }
}

export default AwesomeCurrencyConverterProvider;
