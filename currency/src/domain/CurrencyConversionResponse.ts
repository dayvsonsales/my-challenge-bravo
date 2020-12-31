export default interface CurrencyConversionResponse {
  from: string;
  to: string;
  bid: number;
  amountFrom: number;
  resultTo: number;
  outdated?: boolean;
  retrieveDate: Date;
}
