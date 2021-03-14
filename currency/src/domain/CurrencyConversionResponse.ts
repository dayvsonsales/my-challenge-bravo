export default interface CurrencyConversionResponse {
  from: string;
  to: string;
  bid: number;
  ballast: string;
  amountFrom: number;
  resultTo: number;
  outdated?: boolean;
  retrieveDate: Date;
}
