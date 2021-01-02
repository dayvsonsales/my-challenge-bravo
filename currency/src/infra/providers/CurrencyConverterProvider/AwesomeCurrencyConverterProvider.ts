import CurrencyConversionResponse from '@domain/CurrencyConversionResponse';
import AppError from '@errors/AppError';
import ICurrencyConverterProvider from '@providers/CurrencyConverterProvider/ICurrencyConverterProvider';
import IHTTPProvider from '@providers/HTTPProvider/IHTTPProvider';
import { injectable, inject } from 'tsyringe';

interface CurrenciesResponseAPI {
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
  ) {}

  async convert(
    from: string,
    to: string,
    amount: number,
    ballast: string = 'USD',
  ): Promise<CurrencyConversionResponse> {
    const getFromCurrencyValue = await this.getCurrencyValueInBallast(
      from,
      ballast,
    );

    const getToCurrencyValue = await this.getCurrencyValueInBallast(
      to,
      ballast,
    );

    const fromToConversion = getFromCurrencyValue / getToCurrencyValue;

    const response = {
      from,
      to,
      bid: fromToConversion,
      ballast,
      amountFrom: amount,
      resultTo: fromToConversion * amount,
      retrieveDate: new Date(),
    } as CurrencyConversionResponse;

    return response;
  }

  private async getCurrencyValueInBallast(
    from: string,
    ballast: string,
  ): Promise<number> {
    const { data: usdToBRL } = await this.api.get(
      `${API_URL}${CURRENCIES_ENDPOINT}/${ballast}-BRL`,
    );

    const usdToBRLResponse = usdToBRL[ballast] as CurrenciesResponseAPI;

    if (from === 'BRL') {
      return 1 / Number(usdToBRLResponse.bid);
    }

    const { data: fromToBRL } = await this.api.get(
      `${API_URL}${CURRENCIES_ENDPOINT}/${from}-BRL`,
    );

    const fromToBRLResponse = fromToBRL[from] as CurrenciesResponseAPI;

    if (!Number(fromToBRLResponse.bid)) {
      throw new AppError(`Can't convert`, 500);
    }

    return Number(fromToBRLResponse.bid) / Number(usdToBRLResponse.bid);
  }
}

export default AwesomeCurrencyConverterProvider;
