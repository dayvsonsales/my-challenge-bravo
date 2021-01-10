import ILockProvider from '../../../providers/LockProvider/ILockProvider';
import config from '@config/cache';

import redis from 'redis';

import { promisify } from 'util';

import redisLock from 'redis-lock';

import AppError from '@errors/AppError';

class RedisLockProvider implements ILockProvider {
  private client: any;

  constructor() {
    this.client = redis.createClient(config.redis);

    this.client.on('error', (error: any) => {
      throw new AppError(`Redis client error: ${error}`);
    });
  }
  lock() {
    throw new Error('Method not implemented.');
  }

  getLockInstance(): any {
    const lock = promisify(redisLock(this.client));

    return lock;
  }
}

export default RedisLockProvider;
