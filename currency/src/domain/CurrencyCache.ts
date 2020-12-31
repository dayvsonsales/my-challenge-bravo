import CurrencyConversionResponse from './CurrencyConversionResponse';

export default interface CurrencyCache {
  conversion: CurrencyConversionResponse;
  date: Date;
}
