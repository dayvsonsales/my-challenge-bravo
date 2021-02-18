import CurrencyConversionResponse from '@domain/CurrencyConversionResponse';
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
    let getFromCurrencyValue;
    let getToCurrencyValue;

    if (ballast === 'BRL') {
      getFromCurrencyValue = await this.getCurrencyValue(from);

      getToCurrencyValue = await this.getCurrencyValue(to);
    } else {
      getFromCurrencyValue = await this.getCurrencyValueInBallast(
        from,
        ballast,
      );

      getToCurrencyValue = await this.getCurrencyValueInBallast(to, ballast);
    }

    const fromToConversion = getFromCurrencyValue / getToCurrencyValue;

    const response = {
      from,
      to,
      bid: fromToConversion,
      ballast,
      amountFrom: amount,
      resultTo: Number((fromToConversion * amount).toPrecision(2)),
      retrieveDate: new Date(),
    } as CurrencyConversionResponse;

    return response;
  }

  private async getCurrencyValue(from: string): Promise<number> {
    if (from === 'BRL') {
      return 1;
    }

    const { data: fromToBRL } = await this.api.get(
      `${API_URL}${CURRENCIES_ENDPOINT}/${from}-BRL`,
    );

    const fromToBRLResponse = fromToBRL[from] as CurrenciesResponseAPI;

    return Number(fromToBRLResponse.bid);
  }

  private async getCurrencyValueInBallast(
    from: string,
    ballast: string,
  ): Promise<number> {
    const ballastToBRLResponse = await this.getCurrencyValue(ballast);
    const fromToBRLResponse = await this.getCurrencyValue(from);

    return Number(fromToBRLResponse) / Number(ballastToBRLResponse);
  }
}

export default AwesomeCurrencyConverterProvider;
