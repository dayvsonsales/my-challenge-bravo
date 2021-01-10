import ICacheProvider from '../../../providers/CacheProvider/ICacheProvider';
import config from '@config/cache';
import asyncRedis from 'async-redis';

import AppError from '@errors/AppError';

class RedisCacheProvider implements ICacheProvider {
  private client: any;

  constructor() {
    this.client = asyncRedis.createClient(config.redis);

    this.client.on('error', (error: any) => {
      throw new AppError(`Redis client error: ${error}`);
    });
  }

  isValid(date: Date): boolean {
    return (
      new Date().getTime() - new Date(date).getTime() <
      Number(config.resetTime) * 1000
    );
  }

  async set(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  async get(key: string): Promise<any | undefined> {
    const value = await this.client.get(key);

    return JSON.parse(value);
  }
}

export default RedisCacheProvider;
