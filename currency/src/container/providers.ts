import { container } from 'tsyringe';

import ICacheProvider from '@providers/CacheProvider/ICacheProvider';
import RedisCacheProvider from '@infra/providers/CacheProvider/RedisCacheProvider';
import IHTTPProvider from '@providers/HTTPProvider/IHTTPProvider';
import AxiosHTTPProvider from '@infra/providers/HTTPProvider/AxiosHTTPProvider';
import ICurrencyConverterProvider from '@providers/CurrencyConverterProvider/ICurrencyConverterProvider';
import AwesomeCurrencyConverterProvider from '@infra/providers/CurrencyConverterProvider/AwesomeCurrencyConverterProvider';
import ILockProvider from '@providers/LockProvider/ILockProvider';
import RedisLockProvider from '@infra/providers/LockProvider/RedisLockProvider';

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  RedisCacheProvider,
);

container.registerSingleton<IHTTPProvider>('HTTPProvider', AxiosHTTPProvider);

container.registerSingleton<ICurrencyConverterProvider>(
  'CurrencyConverterProvider',
  AwesomeCurrencyConverterProvider,
);

container.registerSingleton<ILockProvider>('LockProvider', RedisLockProvider);
