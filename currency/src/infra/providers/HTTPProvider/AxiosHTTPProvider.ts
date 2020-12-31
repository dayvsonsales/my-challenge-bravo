import IHTTPProvider from '@providers/HTTPProvider/IHTTPProvider';
import axios, { AxiosInstance } from 'axios';

class AxiosHTTPProvider implements IHTTPProvider {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.URL || 'http://localhost:3000',
    });
  }

  async get(url: string, options?: object): Promise<any> {
    const data = await this.api.get(url, options);

    return data;
  }

  async post(
    url: string,
    postData: object | string,
    options?: object,
  ): Promise<any> {
    const data = await this.api.post(url, postData, options);

    return data;
  }
}

export default AxiosHTTPProvider;
