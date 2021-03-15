import ICacheProvider from '../../../providers/CacheProvider/ICacheProvider';
import config from '@config/cache';
import redis from 'redis';

import { promisify } from 'util';

import AppError from '@errors/AppError';

class RedisCacheProvider implements ICacheProvider {
  private client: any;
  private getAsync: any;

  constructor() {
    this.client = redis.createClient(config.redis);
    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on('error', (error: any) => {
      throw new AppError(`Redis client error: ${error}`);
    });

    this.client.on('ready', () => {
      console.log('Redis is ready');
    });
  }

  isValid(date: Date): boolean {
    return (
      new Date().getTime() - new Date(date).getTime() <
      Number(config.resetTime) * 1000
    );
  }

  async set(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (err: Error) => {
        if (err) {
          reject('Cannot set');
        }

        resolve();
      });
    });
  }

  async get(key: string): Promise<any | undefined> {
    const value = await this.getAsync(key);

    return value;
  }
}

export default RedisCacheProvider;
