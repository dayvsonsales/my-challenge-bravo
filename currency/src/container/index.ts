import { container } from 'tsyringe';
import '@container/providers';

import CurrencyConversionService from '@services/impl/CurrencyConversionService';
import CreateCurrencyService from '@services/impl/CreateCurrencyService';
import CurrencyRepository from '@infra/typeorm/repositories/CurrencyRepository';
import ICurrencyConversionService from '@services/ICurrencyConversionService';
import ICreateCurrencyService from '@services/ICreateCurrencyService';
import ICurrencyRepository from '@domain/ICurrencyRepository';
import IListCurrencyService from '@services/IListCurrencyService';
import ListCurrencyService from '@services/impl/ListCurrencyService';

container.register<ICurrencyConversionService>(
  'CurrencyConversionService',
  CurrencyConversionService,
);

container.register<ICreateCurrencyService>(
  'CreateCurrencyService',
  CreateCurrencyService,
);

container.register<IListCurrencyService>(
  'ListCurrencyService',
  ListCurrencyService,
);

container.register<ICurrencyRepository>(
  'CurrencyRepository',
  CurrencyRepository,
);
