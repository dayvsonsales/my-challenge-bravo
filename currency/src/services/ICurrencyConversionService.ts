import CurrencyConversionResponse from '@domain/CurrencyConversionResponse';

export default interface ICurrencyConversionService {
  convert(
    from: string,
    to: string,
    amount: number,
  ): Promise<CurrencyConversionResponse>;
}
