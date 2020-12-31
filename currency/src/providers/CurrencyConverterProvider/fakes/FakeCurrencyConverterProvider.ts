import CurrencyConversionResponse from '@domain/CurrencyConversionResponse';
import AppError from '@errors/AppError';
import ICurrencyConverterProvider from '@providers/CurrencyConverterProvider/ICurrencyConverterProvider';

class FakeCurrencyConverterProvider implements ICurrencyConverterProvider {
  async convert(
    from: string,
    to: string,
    amount: number,
  ): Promise<CurrencyConversionResponse> {
    if (from === 'Unknown' || to === 'Unknown') {
      throw new AppError("Can't convert. Invalid currency");
    }

    return {
      from,
      to,
      bid: 5.14,
      amountFrom: amount,
      resultTo: 5.14 * amount,
      retrieveDate: new Date('2020-12-20'),
    };
  }
}

export default FakeCurrencyConverterProvider;
