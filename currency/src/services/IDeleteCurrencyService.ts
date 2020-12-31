export default interface IDeleteCurrencyService {
  execute(id: string): Promise<string>;
}
