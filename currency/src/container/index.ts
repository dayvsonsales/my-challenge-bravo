import { container } from 'tsyringe';
import '@container/providers';

import CurrencyConversionService from '@services/impl/CurrencyConversionService';
import CreateCurrencyService from '@services/impl/CreateCurrencyService';
import CurrencyRepository from '@infra/typeorm/repositories/CurrencyRepository';
import ICurrencyConversionService from '@services/ICurrencyConversionService';
import ICreateCurrencyService from '@services/ICreateCurrencyService';
import ICurrencyRepository from '@domain/ICurrencyRepository';

container.registerSingleton<ICurrencyConversionService>(
  'CurrencyConversionService',
  CurrencyConversionService,
);

container.registerSingleton<ICreateCurrencyService>(
  'CreateCurrencyService',
  CreateCurrencyService,
);

container.registerSingleton<ICurrencyRepository>(
  'CurrencyRepository',
  CurrencyRepository,
);
