import { container } from 'tsyringe';
import '@container/providers';

import CurrencyConversionService from '@services/impl/CurrencyConversionService';

container.registerSingleton(
  'CurrencyConversionService',
  CurrencyConversionService,
);
