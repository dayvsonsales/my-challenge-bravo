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

const API_URL = 'https://api.exchangeratesapi.io/latest?base=USD';

@injectable()
class ExchangeRateAPI implements ICurrencyConverterProvider {
  constructor(
    @inject('HTTPProvider')
    private api: IHTTPProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async updateCurrenciesValues(): Promise<void> {
    const { data: currencies } = await this.api.get(`${API_URL}`);

    for (let currency in currencies.rates) {
      this.cacheProvider.set(`USD-${currency}`, currencies.rates[currency]);
    }
  }
}

export default ExchangeRateAPI;
