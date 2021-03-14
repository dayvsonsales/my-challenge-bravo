export default interface ICurrencyConverterProvider {
  updateCurrenciesValues(): Promise<void>;
}
