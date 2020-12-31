export default interface ICacheProvider {
  set(key: string, value: any): Promise<void>;
  get(key: string): Promise<any | undefined>;
}
