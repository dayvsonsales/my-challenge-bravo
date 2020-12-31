import CurrencyConversionResponse from '@domain/CurrencyConversionResponse';

export default interface ICurrencyConverterProvider {
  convert(
    from: string,
    to: string,
    amount: number,
  ): Promise<CurrencyConversionResponse>;
}
